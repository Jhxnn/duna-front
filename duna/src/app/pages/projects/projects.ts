import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';

type ProjectItem = {
  id: string;
  name: string;
  description: string;
};

@Component({
  selector: 'app-projects',
  imports: [NgForOf, RouterLink],
  template: `
    <div class="page">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
        <h2 style="margin:0;">Projetos</h2>
        <span class="spacer" style="flex:1"></span>
        <a routerLink="/project-create">
          <button>Criar Projeto</button>
        </a>
      </div>
      <div class="grid-projects">
        <a class="project-card card" *ngFor="let p of projects" [routerLink]="['/projects', p.id]">
          <h3 style="margin:0 0 6px 0;">{{ p.name }}</h3>
          <p class="muted" style="margin:0;">{{ p.description }}</p>
        </a>
      </div>
    </div>
  `,
  styles: `
    .grid-projects {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 16px;
    }
    .project-card {
      display: block;
      padding: 18px;
      min-height: 140px;
      transition: transform .06s ease, box-shadow .2s ease;
    }
    .project-card:hover {
      transform: translateY(-1px);
      box-shadow:
        0 14px 24px rgba(0,0,0,0.06),
        0 3px 8px rgba(0,0,0,0.05);
    }
    .project-card h3 {
      font-size: 1.15rem;
    }
    .project-card p {
      font-size: .95rem;
      line-height: 1.3;
    }
  `,
})
export class Projects {
  projects: ProjectItem[] = [
    { id: '11111111-1111-1111-1111-111111111111', name: 'Arrakis', description: 'Operações de especiaria e logística.' },
    { id: '22222222-2222-2222-2222-222222222222', name: 'Caladan', description: 'Migração e governança de dados.' },
    { id: '33333333-3333-3333-3333-333333333333', name: 'Salusa Secundus', description: 'Pipeline de segurança e SRE.' },
  ];
}

