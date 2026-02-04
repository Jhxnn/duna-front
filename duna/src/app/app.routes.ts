import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login) },
  { path: 'register', loadComponent: () => import('./pages/register/register').then(m => m.Register) },
  { path: 'duna', canActivate: [authGuard], loadComponent: () => import('./pages/duna/duna').then(m => m.Duna) },
  { path: 'projects', canActivate: [authGuard], loadComponent: () => import('./pages/projects/projects').then(m => m.Projects) },
  { path: 'projects/:id', canActivate: [authGuard], loadComponent: () => import('./pages/project-detail/project-detail').then(m => m.ProjectDetail) },
  { path: 'project-create', canActivate: [authGuard], loadComponent: () => import('./pages/project-create/project-create').then(m => m.ProjectCreate) },
  { path: 'task-create', canActivate: [authGuard], loadComponent: () => import('./pages/task-create/task-create').then(m => m.TaskCreate) },
  { path: '**', redirectTo: 'projects' }
];
