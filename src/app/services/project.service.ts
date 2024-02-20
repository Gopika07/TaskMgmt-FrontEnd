import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../project/project.component';

const groupApi = 'https://localhost:7197/api/groups';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) { }

  getProjects(groupId: number){
    const projectApi = `https://localhost:7197/api/groups/${groupId}/projects`
      return this.httpClient.get(projectApi) as Observable<Project[]>;
  }
}
