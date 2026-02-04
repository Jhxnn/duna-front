import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageKey = 'duna_user';

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.storageKey);
  }

  login(username: string): void {
    localStorage.setItem(this.storageKey, JSON.stringify({ username }));
  }

  register(username: string): void {
    // No backend provided; simulate registration
    localStorage.setItem(this.storageKey, JSON.stringify({ username }));
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }

  getUsername(): string | null {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw)?.username ?? null;
    } catch {
      return null;
    }
  }
}
