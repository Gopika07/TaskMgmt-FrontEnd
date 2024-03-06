import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { ActivatedRoute } from '@angular/router';

export interface Task{
  taskId: number;
  description: string;
  dueDate: Date;
  assignee: string;
  currentStatus: number;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  addTask: FormGroup;
  tasks: Task[] = [];
  groupId!: number;
  projectId!: number;
  add= false;
  submitted = false;  

  constructor(private fb: FormBuilder, private service: TaskService, private route: ActivatedRoute){
    this.addTask = this.fb.group({
      description: new FormControl('', (Validators.required)),
      dueDate: new FormControl('', (Validators.required)),
      assigneeMail: new FormControl(''),
      currentStatusId: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.groupId = Number(params.get('groupId'));
      this.projectId = Number(params.get('projectId'));
      this.service.getTasks(this.groupId, this.projectId).subscribe(
        (response) =>
        {
          console.log(response);
          this.tasks = response;
        }
      );
    })
  }

  addTasks(form: FormGroup){
    this.service.addTasks(form.value.description, form.value.dueDate, form.value.assigneeMail, form.value.currentStatusId).subscribe(
      (response) => {
      this.service.getTasks(this.groupId, this.projectId).subscribe(
        (updatedTasks) => {
          console.log(updatedTasks)
          this.tasks = updatedTasks;
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

}
