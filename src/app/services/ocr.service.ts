import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../assets/environment';

@Injectable({
  providedIn: 'root',
})
export class OcrService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    // Endpoint-ul complet e, de ex: https://.../api/ocr
    return this.http.post<any>(`${this.baseUrl}/api/ocr`, formData);
  }
}
