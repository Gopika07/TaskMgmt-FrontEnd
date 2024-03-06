import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../groups/groups.component';

const getAll = 'https://localhost:7197/api/groups';
const addGroup = 'https://localhost:7197/api/groups';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient: HttpClient) { }

  getGroups(){
    return this.httpClient.get(getAll) as Observable<Group[]>;
  }

  addGroup(groupName: string){
    const body = {
      groupName: groupName,
    };
    return this.httpClient.post(addGroup, body);
  }
}
