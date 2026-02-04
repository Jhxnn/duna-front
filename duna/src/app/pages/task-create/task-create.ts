import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { TaskPriority, TaskStatus } from '../../models/task';
import { TaskService } from '../../services/api/task';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-create',
  imports: [ReactiveFormsModule, NgForOf, NgIf],
  template: `
    <h2>Criar Task</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()" style="display:flex;flex-direction:column;gap:8px;max-width:520px;">
      <label>Título</label>
      <input formControlName="title" placeholder="Título" />

      <label>Detalhes</label>
      <textarea formControlName="details" placeholder="Detalhes da task"></textarea>

      <label>Project ID (UUID)</label>
      <input formControlName="projectId" placeholder="UUID do projeto" />
      <small>Obs: a API não retorna IDs na listagem de projetos, então informe o UUID do projeto manualmente.</small>

      <label>Status</label>
      <select formControlName="status">
        <option [value]=\"null\">(padrão do backend)</option>
        <option *ngFor=\"let s of statuses\" [value]=\"s\">{{ s }}</option>
      </select>

      <label>Prioridade</label>
      <select formControlName="priority">
        <option [value]=\"null\">(padrão do backend)</option>
        <option *ngFor=\"let p of priorities\" [value]=\"p\">{{ p }}</option>
      </select>

      <button type="submit" [disabled]="form.invalid || loading">Criar</button>
      <span *ngIf=\"success\" style=\"color:green;\">Task enviada para criação!</span>
      <span *ngIf=\"error\" style=\"color:red;\">{{ error }}</span>
    </form>
  `,
  styles: ``,
})
export class TaskCreate {
  private readonly fb = inject(FormBuilder);
  private readonly taskService = inject(TaskService);
  private readonly route = inject(ActivatedRoute);

  priorities = Object.values(TaskPriority);
  statuses = Object.values(TaskStatus);

  form = this.fb.nonNullable.group({
    title: ['', [Validators.required]],
    details: ['', [Validators.required]],
    projectId: ['', [Validators.required]],
    status: [''],
    priority: ['']
  });

  loading = false;
  success = false;
  error: string | null = null;

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.success = false;
    this.error = null;
    const value = this.form.getRawValue();
    const payload: any = { ...value };
    // Remove optional empty fields so backend can apply defaults
    if (!payload.status) delete payload.status;
    if (!payload.priority) delete payload.priority;
    this.taskService.create(payload)
      .subscribe({
        next: () => {
          this.success = true;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Erro ao criar task';
          console.error(err);
          this.loading = false;
        }
      });
  }

  constructor() {
    const projectId = this.route.snapshot.queryParamMap.get('projectId');
    if (projectId) {
      this.form.patchValue({ projectId });
    }
  }
}
