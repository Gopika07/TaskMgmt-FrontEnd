import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../services/group.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export interface Group {
  groupId: number;
  groupName: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  groups: Group[] = [];
  addGroup: FormGroup;
  add = false;
  submitted = false;

  constructor(private service: GroupService, private router: Router, private fb: FormBuilder){
    this.addGroup = this.fb.group({
      groupName: new FormControl('', (Validators.required, Validators.minLength(3), Validators.maxLength(20))),
    })
  }

  ngOnInit(): void {
    this.service.getGroups().subscribe(
      (response) => {
        this.groups = response
      }
    );
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
      response => console.log(response)
    );
    this.submitted = true;
    this.add = false;
    window.onload;
  }
}
