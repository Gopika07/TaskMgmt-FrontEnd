import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PathService } from '../services/path.service';
import { TaskStatus, TaskStatusService } from '../services/task-status.service';
import { TaskCommentService } from '../services/task-comment.service';
import { ToasterService } from '../services/toaster.service';

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
  taskStatus: TaskStatus[] = [];
  groupId!: number;
  taskId!: number;
  projectId!: number;
  add= false;
  submitted = false;  
  empty!: boolean;
  comment = false;

  constructor(private fb: FormBuilder, private service: TaskService, private commentService: TaskCommentService, 
    private route: ActivatedRoute, private path: PathService, private status: TaskStatusService, private router: Router,
    private toaster: ToasterService){
    this.addTask = this.fb.group({
      description: new FormControl('', (Validators.required)),
      dueDate: new FormControl('', (Validators.required)),
      assigneeMail: new FormControl(''),
      currentStatusId: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.path.inTask = true;
    this.route.paramMap.subscribe(params => {
      this.groupId = Number(params.get('groupId'));
      this.projectId = Number(params.get('projectId'));
      this.service.getTasks(this.groupId, this.projectId).subscribe(
        (response) =>
        {
          // console.log(response);
          if(response.length === 0){
            this.empty = true;
          }
          this.tasks = response;
        }
      );
    })

    this.status.getProjectTaskStatus(this.projectId, this.groupId).subscribe(
      (response) => {
        // console.log(response);
        this.taskStatus = response;
      }
    )
  }

  addTasks(form: FormGroup){
    const formattedDate = this.service.formatDate(form.value.dueDate);
    this.service.addTasks(form.value.description, formattedDate, form.value.assigneeMail, form.value.currentStatusId).subscribe(
      () => {
        this.toaster.toasterSuccess('Task added!');
        this.service.getTasks(this.groupId, this.projectId).subscribe(
          (updatedTasks) => {
            this.empty = false;
            this.tasks = updatedTasks;
          }
      );
      },
      (error) => {
        this.toaster.toasterFailure('Task not added');
      }
    );
    this.submitted = true;
    this.add = false;
  }

  addField() 
  {
    this.add = true;
  }
    
  closeModal() 
  {
    this.add = false;  
    this.comment = false;
  }

  createStatus(){
    this.router.navigate([`/groups/${this.groupId}/projects/${this.projectId}/statuses`]);
  }

  Comment(taskId: number){
    this.taskId = taskId;
    this.comment = true;
  }

  Addcomment(commentText: string){
    // console.log(this.taskId);
    this.commentService.addComment(this.taskId, this.groupId, this.projectId, commentText).subscribe(
      ()=>{
        alert('Comment added!');
        this.router.navigate([`/groups/${this.groupId}/projects/${this.projectId}/tasks/${this.taskId}/comments`]);
        this.comment = false;
      }
    )
  }

  viewComments(taskId: number){
    this.router.navigate([`/groups/${this.groupId}/projects/${this.projectId}/tasks/${taskId}/comments`]);
  }
}
