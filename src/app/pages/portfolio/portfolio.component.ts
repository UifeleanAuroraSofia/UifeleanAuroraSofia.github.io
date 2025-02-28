import { Component } from '@angular/core';
import { catchError, from, timeout } from 'rxjs';
import { OcrService } from 'src/app/services/ocr.service';
import { OcrInternalService } from 'src/app/services/orc-internal.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent {
  selectedFile: File | null = null;
  unhealthyList: any[] = [];
  allText: string = '';
  errorMessage = '';

  constructor(
    private ocrService: OcrService,
    private ocrInternalService: OcrInternalService
  ) {}

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

    this.ocrService
      .uploadImage(this.selectedFile)
      .pipe(
        timeout(2000),
        catchError((err) => {
          console.warn(
            'Serviciul extern a întârziat sau a produs eroare, se folosește procesarea internă.',
            err
          );
          return from(
            this.ocrInternalService.processLocally(this.selectedFile!)
          );
        })
      )
      .subscribe({
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

  getFileName(): string | undefined {
    return this.selectedFile?.name;
  }

  get isFileSelected() {
    return this.selectedFile?.name !== undefined ? true : false;
  }
}
