import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TaskStatus{
  projectTaskStatusId: number;
  statusColor: string;
  statusText: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskStatusService {

  constructor(private httpClient: HttpClient) { }

  getProjectTaskStatus(projectId: number, groupId: number){
    const projectTaskStatusApi = `https://localhost:7197/api/groups/${groupId}/projects/${projectId}/statuses`;
    return this.httpClient.get(projectTaskStatusApi) as Observable<TaskStatus[]>;
  }

  addProjectTaskStatus(groupId: number, projectId: number, statusText: string, statusColor: string){
    const createStatusApi = `https://localhost:7197/api/groups/${groupId}/projects/${projectId}/statuses`;
    const body ={
      statusText: statusText,
      statusColor: statusColor
    };
    return this.httpClient.post(createStatusApi, body);
  }
}
