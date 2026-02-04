import { Component, signal, computed, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from './services/auth';
import { FeatureFlagsService } from './services/feature-flags';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('duna');
  private readonly auth = inject(AuthService);
  private readonly flags = inject(FeatureFlagsService);

  isLoggedIn() {
    return this.auth.isAuthenticated() || this.flags.isPreviewEnabled();
  }

  username(): string | null {
    return this.auth.getUsername();
  }

  logout(): void {
    this.auth.logout();
    this.flags.disablePreview();
    // Soft redirect handled by guard on protected routes
  }
}
