import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PathService } from '../services/path.service';
import { ToasterService } from '../services/toaster.service';

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
  searchText: string = '';
  addProject: FormGroup;
  add= false;
  submitted = false;
  groupId!: number;
  projectId!: number;
  currentPage = 1;
  firstPage!: boolean;
  totalPages!: number;
  arePagesAvailable!: boolean;
  display!: boolean;
  noProjectToDisplay!: string;
  edit = false;
  // searchComp!: string;


  constructor(private service: ProjectService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router,
     private path: PathService, private toaster: ToasterService){
    this.addProject = this.fb.group({
      projectName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      projectDescription: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.getProject(this.currentPage);
    this.firstPage = true;
    this.totalPages = 1;
  }
  
getProject(pageIndex: number) {
  this.route.paramMap.subscribe(params => {
    const id = params.get('groupId');
    this.groupId = parseInt(id ?? "", 10);
    this.service.getProjects(this.groupId, pageIndex, 10).subscribe(
      (response) => {
        if(response.page.length === 0){
          this.display = true;
          this.noProjectToDisplay = 'No projects to display';
        }
        else{
          this.projects = response.page;
          this.currentPage = pageIndex;
          this.arePagesAvailable = response.arePagesAvailable;
          this.totalPages = response.totalPages;
          this.display = false;
        }
      }
    );
  });
}

loadPage(pageIndex: number){
  this.firstPage = pageIndex <= 1;
  this.getProject(pageIndex)
}

addProjects(form: FormGroup){
  this.service.addProjects(form.value.projectName, form.value.projectDescription).subscribe(
    () => {
    this.updateProjectAfterOperation();
    this.toaster.toasterSuccess('Project added!');
    },
    (error) => {
      console.error('Error adding project:', error);
      alert('Failed to add project. Please try again later.');
    }
  );
  // form.reset();
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

deleteProject(projectId: number){
  this.service.deleteProject(projectId).subscribe(
    () => {
      this.toaster.toasterSuccess('Project deleted!');
      this.updateProjectAfterOperation();
    },
    (error) => {
      console.error('Error deleting project:', error);
      alert('Failed to delete project. Please try again later.');
    }
  );
}

getEditProject(form: FormGroup){
  this.service.editProject(this.projectId, form.value.projectName, form.value.projectDescription).subscribe(
    () => {
      this.toaster.toasterSuccess('Project edited!');
      this.updateProjectAfterOperation();
      },
      (error) => {
        console.error('Error editing project:', error);
        alert('Failed to edit project. Please try again later.');
      }
  )
  this.submitted = true;
  this.add = false;
  this.edit = false;
}

updateProjectAfterOperation(){
  this.service.getProjects(this.groupId, this.totalPages, 10).subscribe(
    (response) => {
      this.projects = response.page;
    }
  );
}

editProject(projectId: number){
  this.projectId = projectId;
  this.edit = true;
  this.addField();
}

cloneProject(projectId: number){
  this.service.cloneProject(projectId).subscribe(
    () => {
      this.toaster.toasterSuccess('Project cloned!');
      this.service.getProjects(this.groupId, this.totalPages, 10).subscribe(
        (updatedProjects) => {
          this.projects = updatedProjects.page;
        }
      );
    }
  )
}

}
