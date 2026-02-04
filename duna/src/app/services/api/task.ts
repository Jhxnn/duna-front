import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../../tokens';
import { Observable } from 'rxjs';
import { TaskDto, TaskResponseDto, TaskUpdateDto, TaskPriority, TaskStatus } from '../../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  create(dto: TaskDto): Observable<{ status: string }> {
    return this.http.post<{ status: string }>(`${this.baseUrl}/tasks`, dto);
  }

  update(dto: TaskUpdateDto): Observable<{ status: string }> {
    return this.http.put<{ status: string }>(`${this.baseUrl}/tasks`, dto);
  }

  updateStatus(id: string, status: TaskStatus): Observable<TaskResponseDto> {
    return this.http.put<TaskResponseDto>(`${this.baseUrl}/tasks/${id}/status`, status);
  }

  updatePriority(id: string, priority: TaskPriority): Observable<TaskResponseDto> {
    return this.http.put<TaskResponseDto>(`${this.baseUrl}/tasks/${id}/priority`, priority);
  }
}
