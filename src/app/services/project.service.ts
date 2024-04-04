import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../project/project.component';

export interface ProjectResponse{
  page: Project[];
  arePagesAvailable: boolean;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  groupId!: number;

  constructor(private httpClient: HttpClient) { }

  getProjects(groupId: number, pageIndex: number, pageSize: number):Observable<ProjectResponse>{
    this.groupId = groupId
    const projectApi = `https://localhost:7197/api/groups/${groupId}/projects?pageIndex=${pageIndex}&pageSize=${pageSize}`
      return this.httpClient.get<ProjectResponse>(projectApi);
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

  deleteProject(projectId: number){
    const deleteProjectApi = `https://localhost:7197/api/groups/${this.groupId}/projects/${projectId}`
    return this.httpClient.delete(deleteProjectApi, { responseType: 'text'});
  }

  editProject(projectId: number, projectName: string, projectDescription: string){
    const editProjectApi = `https://localhost:7197/api/groups/${this.groupId}/projects/${projectId}`;
    const body = {
      projectName: projectName,
      projectDescription: projectDescription
    };
    return this.httpClient.put(editProjectApi, body, { responseType: 'text'});
  }

  cloneProject(projectId: number){
    const cloneProjectApi = `https://localhost:7197/api/groups/${this.groupId}/projects/${projectId}`;
    return this.httpClient.post(cloneProjectApi, null, { responseType: 'text'});
  }

  searchProject(projectId: number):Observable<Project>{
    const searchApi = `https://localhost:7197/api/groups/${this.groupId}/projects/${projectId}`;
    return this.httpClient.get<Project>(searchApi);
  }
}
