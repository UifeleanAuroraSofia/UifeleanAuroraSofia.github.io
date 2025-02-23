import { Component } from '@angular/core';
import { OcrService } from 'src/app/services/ocr.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {
  selectedFile: File | null = null;
  unhealthyList: any[] = [];
  allText: string = '';
  errorMessage = '';

  constructor(private ocrService: OcrService) { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.allText = '';
      this.unhealthyList = [];
      this.errorMessage = '';
    }
  }

  upload() {
    if (!this.selectedFile) {
      this.errorMessage = 'Nu ai selectat niciun fișier.';
      return;
    }
    this.errorMessage = '';

    this.ocrService.uploadImage(this.selectedFile).subscribe({
      next: (response) => {
        this.unhealthyList = response.unhealthy_substances_found || [];
        this.allText = response.text_extras || '';
      },
      error: (err) => {
        this.errorMessage = 'A apărut o eroare la trimiterea imaginii.';
        console.error(err);
      },
    });
  }

  get isValidUnhealthyList() {
    return this.unhealthyList?.length > 0;
  }
}
