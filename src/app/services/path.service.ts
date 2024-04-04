import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PathService {
  public inGroup!: boolean;
  public inProject!: boolean;
  public inTask!: boolean;

  constructor(public router: Router, public route: ActivatedRoute) { }

  groupPath(){
    return this.router.url.startsWith('/groups/');
  }

  get projectPath() {
    return ['/groups', this.groupId, 'projects'];
   }

  get taskPath(){
    return ['/groups', this.groupId, 'projects', this.projectId]
  }

  get groupId(){
    return this.route.snapshot.params['groupId'];
  }

  get projectId(){
    return this.route.snapshot.params['projectId'];
  }
}
