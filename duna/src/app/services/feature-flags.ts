import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagsService {
  private readonly previewKey = 'duna_preview';

  isPreviewEnabled(): boolean {
    return localStorage.getItem(this.previewKey) === '1';
  }

  enablePreview(): void {
    localStorage.setItem(this.previewKey, '1');
  }

  disablePreview(): void {
    localStorage.removeItem(this.previewKey);
  }
}


