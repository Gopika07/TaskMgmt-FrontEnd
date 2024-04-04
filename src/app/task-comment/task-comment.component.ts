import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TaskCommentService } from '../services/task-comment.service';
import { ToasterService } from '../services/toaster.service';

export interface TaskComment{
  commentId: number;
  commentText: string;
}

@Component({
  selector: 'app-task-comment',
  templateUrl: './task-comment.component.html',
  styleUrls: ['./task-comment.component.scss']
})

export class TaskCommentComponent implements OnInit{

  comments: TaskComment[] = [];
  empty = false;

  constructor(private service: TaskCommentService, private route: ActivatedRoute, private toaster: ToasterService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const taskId = Number(params.get('taskId'));
      const groupId = Number(params.get('groupId'));
      const projectId = Number(params.get('projectId'));
      this.service.getAllComments(taskId, groupId, projectId).subscribe(
        (response) => {
          this.comments = response;
          if(response.length === 0){
            this.empty = true;
          }
        },
        (error) => {
          this.toaster.toasterFailure('Unable to load comments');
        }
      )
    })
  }

  

}
