import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../services/group.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PathService } from '../services/path.service';
import { ToasterService } from '../services/toaster.service';

export interface Group {
  groupId: number;
  groupName: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit{
  groups: Group[] = [];
  addGroup: FormGroup;
  add = false;
  submitted = false;
  arePagesAvailable!: boolean;
  firstPage!: boolean;
  totalPages!: number;
  currentPage = 1;

  constructor(private service: GroupService, private router: Router, private fb: FormBuilder, private path: PathService, private toaster: ToasterService){
    this.addGroup = this.fb.group({
      groupName: new FormControl('', (Validators.required, Validators.minLength(3), Validators.maxLength(20))),
    })
  }

  ngOnInit(): void {
    this.loadPage(this.currentPage);
    this.firstPage = true;
  }

  fetchGroups(pageNumber: number) {
    this.service.getGroups(pageNumber, 3).subscribe(
      (response) => {
        this.groups = response.page;
        this.currentPage = pageNumber;
        this.arePagesAvailable = response.arePagesAvailable;
        this.totalPages = response.totalPages;
        // console.log(response);
      }
    );
  }

  loadPage(pageNumber: number){
    this.firstPage = pageNumber <= 1;
    this.fetchGroups(pageNumber);
  }

  gotoProjects(groupId: number){
    this.router.navigate([`/groups/${groupId}/projects`]);
  }

  addField(){
    this.add = true;
  }

  closeModal(){
    this.add = false;
  }

  addGroups(form: FormGroup){
    this.service.addGroup(form.value.groupName).subscribe(
      () => 
      {
        this.toaster.toasterSuccess('Group added!');
        this.service.getGroups(this.totalPages, 3).subscribe(
          (updatedGroups) => {
            this.groups = updatedGroups.page;
          }
        );
      }
    );
    this.submitted = true;
    this.add = false;
  }
}
