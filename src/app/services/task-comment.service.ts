import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskComment } from '../task-comment/task-comment.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskCommentService {

  constructor(private httpClient: HttpClient) { }

  addComment(taskId: number, groupId: number, projectId: number, commentText: string){
    const commentApi = `https://localhost:7197/api/groups/${groupId}/projects/${projectId}/tasks/${taskId}/comments`;
    const body = {
      commentText: commentText
    }
    return this.httpClient.post(commentApi, body);
  }

  getAllComments(taskId: number, groupId: number, projectId: number){
    const getAllCommentsApi = `https://localhost:7197/api/groups/${groupId}/projects/${projectId}/tasks/${taskId}/comments`;
    return this.httpClient.get(getAllCommentsApi) as Observable<TaskComment[]>;
  }
}
