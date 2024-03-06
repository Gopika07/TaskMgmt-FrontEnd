import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../project/project.component';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  groupId!: number;

  constructor(private httpClient: HttpClient) { }

  getProjects(groupId: number){
    this.groupId = groupId
    const projectApi = `https://localhost:7197/api/groups/${groupId}/projects`
      return this.httpClient.get(projectApi) as Observable<Project[]>;
  }

  addProjects(projectName: string, projectDescription: string){
    const addProjectApi = `https://localhost:7197/api/groups/${this.groupId}/projects`
    const body = {
      projectName: projectName,
      projectDescription: projectDescription
    };
    return this.httpClient.post(addProjectApi, body);
  }

  inviteUser(email: string){
    const inviteUserApi = `https://localhost:7197/api/groups/${this.groupId}/invitations`
    const body = {
      email: email
    };
    return this.httpClient.post(inviteUserApi, body);
  }

  enrollUserToGroup(groupName: string, referralCode: string){
    const enrollUserToGroupApi = `https://localhost:7197/api/groups/enrollments`
    const body = {
      groupName: groupName,
      referralCode: referralCode
    }
    return this.httpClient.post(enrollUserToGroupApi, body);
  }
}
