import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  addProject: FormGroup;
  add= false;
  submitted = false;
  groupId!: number;


  constructor(private service: ProjectService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router){
    this.addProject = this.fb.group({
      projectName: new FormControl('', (Validators.required, Validators.minLength(3), Validators.maxLength(20))),
      projectDescription: new FormControl('', (Validators.required))
    })
  }

  
ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const id = params.get('groupId');
    this.groupId = parseInt(id ?? "", 10);
    this.service.getProjects(this.groupId).subscribe(
      (response) => {
        console.log(response)
        if(response.length === 0){
          alert('No projects to display')
        }
        else{
          this.projects = response;
        }
      }
    );
    
  });
}
addProjects(form: FormGroup){
  this.service.addProjects(form.value.projectName, form.value.projectDescription).subscribe(
    response => {
    this.service.getProjects(this.groupId).subscribe(
      (updatedProjects) => {
        this.projects = updatedProjects;
      }
    );
    }
  );
  this.submitted = true;
  this.add = false;
}
addField() {
  this.add = true;
  }
  closeModal() {
this.add = false;  }

GoToTasks(projectId: number){
  this.router.navigate([`/groups/${this.groupId}/projects/${projectId}/tasks`]);
}
}
