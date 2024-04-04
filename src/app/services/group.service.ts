import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../groups/groups.component';

const addGroup = 'https://localhost:7197/api/groups';

export interface GroupResponse{
  page: Group[];
  arePagesAvailable: boolean;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient: HttpClient) { }

  getGroups(pageIndex: number, pageSize: number):Observable<GroupResponse>{
    const getAll = `https://localhost:7197/api/groups?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this.httpClient.get<GroupResponse>(getAll);
  }

  addGroup(groupName: string){
    const body = {
      groupName: groupName,
    };
    return this.httpClient.post(addGroup, body);
  }
}
