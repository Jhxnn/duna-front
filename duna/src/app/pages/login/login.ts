import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FeatureFlagsService } from '../../services/feature-flags';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  template: `
    <div class="page-center">
      <div class="auth-card card">
        <div class="auth-header">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M2 17c3-2 6-3 10-3s7 1 10 3c-3 3-6 5-10 5s-7-2-10-5Z" fill="currentColor" opacity=".15"></path>
            <path d="M7 8c0-2.761 2.239-5 5-5s5 2.239 5 5-2.239 5-5 5-5-2.239-5-5Z" stroke="currentColor" stroke-width="1.5"></path>
          </svg>
          <h1 class="auth-title">Entrar no Duna</h1>
        </div>
        <p class="auth-subtitle">Gerencie suas tarefas no seu universo.</p>
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-grid" novalidate>
          <div>
            <label>Usuário</label>
            <input class="w-100" formControlName="username" placeholder="Seu usuário" />
            <small class="muted" *ngIf="form.controls.username.touched && form.controls.username.invalid">Campo obrigatório</small>
          </div>
          <div>
            <label>Senha</label>
            <input class="w-100" type="password" formControlName="password" placeholder="Senha" />
            <small class="muted" *ngIf="form.controls.password.touched && form.controls.password.invalid">Campo obrigatório</small>
          </div>
          <button class="w-100" type="submit" [disabled]="form.invalid">Entrar</button>
          <button class="w-100" type="button" (click)="enterPreview()">Visualizar sem login</button>
          <div class="text-right">
            <a routerLink="/register">Não tem conta? Registrar</a>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: ``,
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly flags = inject(FeatureFlagsService);

  form = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    const { username } = this.form.getRawValue();
    this.auth.login(username);
    this.router.navigateByUrl('/duna');
  }

  enterPreview(): void {
    this.flags.enablePreview();
    this.router.navigateByUrl('/duna');
  }
}
