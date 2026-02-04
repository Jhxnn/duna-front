import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <h2>Registrar</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()" style="display:flex;flex-direction:column;gap:8px;max-width:320px;">
      <label>Usuário</label>
      <input formControlName="username" placeholder="Escolha um usuário" />

      <label>Senha</label>
      <input type="password" formControlName="password" placeholder="Senha" />

      <button type="submit" [disabled]="form.invalid">Registrar</button>
      <a routerLink="/login">Já tem conta? Entrar</a>
    </form>
  `,
  styles: ``,
})
export class Register {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  form = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    const { username } = this.form.getRawValue();
    this.auth.register(username);
    this.router.navigateByUrl('/duna');
  }
}
