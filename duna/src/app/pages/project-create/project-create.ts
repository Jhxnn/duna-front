import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../services/api/project';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-project-create',
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <h2>Criar Projeto</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()" style="display:flex;flex-direction:column;gap:8px;max-width:480px;">
      <label>Nome</label>
      <input formControlName="name" placeholder="Nome do projeto" />

      <label>Descrição</label>
      <textarea formControlName="description" placeholder="Descrição do projeto"></textarea>

      <button type="submit" [disabled]="form.invalid || loading">Criar</button>
      <span *ngIf=\"success\" style=\"color:green;\">Projeto criado!</span>
      <span *ngIf=\"error\" style=\"color:red;\">{{ error }}</span>
    </form>
  `,
  styles: ``,
})
export class ProjectCreate {
  private readonly fb = inject(FormBuilder);
  private readonly projectService = inject(ProjectService);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });

  loading = false;
  success = false;
  error: string | null = null;

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.success = false;
    this.error = null;
    this.projectService.createProject(this.form.getRawValue())
      .subscribe({
        next: () => {
          this.success = true;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Erro ao criar projeto';
          console.error(err);
          this.loading = false;
        }
      });
  }
}
