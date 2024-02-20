import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';

export interface Project{
  projectId: number,
  projectName: string,
  projectDescription: string
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit{
  projects: Project[] = [];

  constructor(private service: ProjectService, private route: ActivatedRoute){}

  
ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const id = params.get('groupId');
    const groupId = parseInt(id ?? "", 10);
    this.service.getProjects(groupId).subscribe(
      (response) => {
        this.projects = response;
        console.log(response);
      }
    );
    
  });
}
}
