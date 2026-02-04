import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../../tokens';
import { Observable } from 'rxjs';
import { ProjectDto, ProjectResponseDto } from '../../models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  createProject(dto: ProjectDto): Observable<ProjectResponseDto> {
    return this.http.post<ProjectResponseDto>(`${this.baseUrl}/projects`, dto);
  }

  getAll(): Observable<ProjectResponseDto[]> {
    return this.http.get<ProjectResponseDto[]>(`${this.baseUrl}/projects`);
  }
}
