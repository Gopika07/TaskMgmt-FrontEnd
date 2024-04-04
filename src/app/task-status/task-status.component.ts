import { Component, OnInit } from '@angular/core';
import { TaskStatus, TaskStatusService } from '../services/task-status.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.scss']
})
export class TaskStatusComponent implements OnInit{
  taskStatus: FormGroup;
  groupId!: number;
  projectId!: number;
  taskStat: TaskStatus[] = [];

  constructor(private fb: FormBuilder, private service: TaskStatusService, private route: ActivatedRoute){
    this.taskStatus = this.fb.group({
      statusText: new FormControl('', (Validators.required)),
      statusColor: new FormControl('', (Validators.required)),
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.groupId = Number(params.get('groupId'));
        this.projectId = Number(params.get('projectId'));
        this.service.getProjectTaskStatus(this.projectId, this.groupId).subscribe(
          (response)=>{
            this.taskStat = response;
          }
        )
      }
    )
  }

  addTaskStatus(form: FormGroup){
    const statusColor = (form.value.statusColor).toUpperCase();
    this.service.addProjectTaskStatus(this.groupId, this.projectId, form.value.statusText, statusColor).subscribe(
    
      (response)=>{
        this.service.getProjectTaskStatus(this.projectId, this.groupId).subscribe(
          (res) => {
            console.log(res);
            this.taskStat = res;
          }
        )
      }
    )
  }

}
