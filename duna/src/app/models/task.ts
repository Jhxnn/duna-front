export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export interface TaskDto {
  title: string;
  details: string;
  projectId: string; // UUID
  status?: TaskStatus;
  priority?: TaskPriority;
}

export interface TaskUpdateDto {
  taskId: string; // UUID
  title?: string;
  details?: string;
  projectId?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
}

export interface TaskResponseDto {
  taskId: string;
  title: string;
  details: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectName: string;
}


