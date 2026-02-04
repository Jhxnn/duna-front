import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../../tokens';
import { Observable } from 'rxjs';
import { DuneResponseDto } from '../../models/dune';

@Injectable({
  providedIn: 'root',
})
export class DuneService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  getSummary(): Observable<DuneResponseDto> {
    return this.http.get<DuneResponseDto>(`${this.baseUrl}/dunes`);
  }
}
