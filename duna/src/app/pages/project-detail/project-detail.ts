import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { TaskStatus } from '../../models/task';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink, NgIf, NgForOf],
  template: `
    <div class="page">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
        <h2 style="margin:0;">Projeto</h2>
        <span style="flex:1"></span>
        <a [routerLink]="['/task-create']" [queryParams]="{ projectId: projectId }">
          <button>Criar Task</button>
        </a>
      </div>

      <div #fieldRef class="task-field" *ngIf="sortedTasks.length">
        <div class="bubble"
             *ngFor="let t of sortedTasks; let i = index"
             [style.width.px]="bubbleSize(t.size)"
             [style.height.px]="bubbleSize(t.size)"
             [style.left.px]="positions[i]?.left"
             [style.top.px]="positions[i]?.top"
             [style.background]="t.color"
             [title]="t.title + ' (size ' + t.size + ')'"
             [attr.aria-label]="t.title"></div>
      </div>
    </div>
  `,
  styles: `
    .task-field {
      position: relative;
      min-height: 60vh;
      width: 100%;
      overflow: hidden;
    }
    .bubble {
      border-radius: 999px;
      border: 1px solid var(--dune-border);
      box-shadow: 0 6px 14px rgba(0,0,0,.08), inset 0 2px 6px rgba(255,255,255,.35);
      position: absolute;
      animation: drift 8s ease-in-out infinite alternate;
    }
    @keyframes drift {
      from { transform: translateY(0px); }
      to   { transform: translateY(-6px); }
    }
  `,
})
export class ProjectDetail {
  @ViewChild('fieldRef', { static: false }) fieldRef?: ElementRef<HTMLDivElement>;
  projectId: string | null = null;
  tasks: { id: string; title: string; size: number; status: TaskStatus; color: string }[] = [
    { id: 't1', title: 'Setup repo', size: 1, status: TaskStatus.TODO, color: '' },
    { id: 't2', title: 'Autenticação', size: 2, status: TaskStatus.IN_PROGRESS, color: '' },
    { id: 't3', title: 'CRUD Project', size: 3, status: TaskStatus.TODO, color: '' },
    { id: 't4', title: 'Board Duna', size: 5, status: TaskStatus.IN_PROGRESS, color: '' },
    { id: 't5', title: 'WebSockets', size: 8, status: TaskStatus.DONE, color: '' },
  ];
  sortedTasks: { id: string; title: string; size: number; status: TaskStatus; color: string }[] = [];
  positions: { left: number; top: number }[] = [];

  constructor(private readonly route: ActivatedRoute) {
    this.projectId = this.route.snapshot.paramMap.get('id');
    // atribuir cores aleatórias e ordenar por status
    const statusOrder: Record<TaskStatus, number> = {
      [TaskStatus.TODO]: 1,
      [TaskStatus.IN_PROGRESS]: 2,
      [TaskStatus.DONE]: 3,
    };
    this.tasks = this.tasks.map(t => ({ ...t, color: this.randomColor() }));
    this.sortedTasks = [...this.tasks].sort((a, b) => {
      const so = statusOrder[a.status] - statusOrder[b.status];
      return so !== 0 ? so : a.title.localeCompare(b.title);
    });
    // posições iniciais (serão recalculadas quando a view estiver pronta)
  }

  bubbleSize(s: number): number {
    const base = 24; // px
    const factor = 10; // px per unit
    return base + s * factor;
  }

  @HostListener('window:resize')
  onResize(): void {
    this.layoutBubbles();
  }

  ngAfterViewInit(): void {
    // aguarda próximo tick para ter dimensões corretas
    setTimeout(() => this.layoutBubbles());
  }

  private layoutBubbles(): void {
    const host = this.fieldRef?.nativeElement;
    if (!host) return;
    const rect = host.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    this.positions = this.sortedTasks.map((t) => {
      const d = this.bubbleSize(t.size);
      const left = Math.max(0, Math.min(width - d, Math.random() * (width - d)));
      const top = Math.max(0, Math.min(height - d, Math.random() * (height - d)));
      return { left, top };
    });
  }

  private randomColor(): string {
    const h = Math.floor(Math.random() * 360);
    const s = 65; // saturation
    const l = 65; // lightness
    return `hsl(${h} ${s}% ${l}%)`;
  }
}

