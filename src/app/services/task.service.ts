import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../task/task.component';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  groupId!: number;
  projectId!: number;

  constructor(private httpClient: HttpClient) { }

  getTasks(groupId: number, projectId: number){
    this.groupId = groupId;
    this.projectId = projectId;
    const getTaskApi = `https://localhost:7197/api/groups/${groupId}/projects/${projectId}/tasks`;
    return this.httpClient.get(getTaskApi) as Observable<Task[]>;
  }

  addTasks(description: string, dueDate: string, assigneeMail: string, currentStatusId: number){
    const addTasksApi = `https://localhost:7197/api/groups/${this.groupId}/projects/${this.projectId}/tasks`;
    const body = {
      description: description,
      dueDate: dueDate,
      assigneeMail: assigneeMail,
      currentStatusId: currentStatusId
    };
    return this.httpClient.post(addTasksApi, body);
  }
}
