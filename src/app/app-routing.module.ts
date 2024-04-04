import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { GroupsComponent } from './groups/groups.component';
import { AuthGuard } from './guard/loginguard.guard';
import { ProjectComponent } from './project/project.component';
import { RedirectionGuard } from './guard/redirection.guard';
import { TaskComponent } from './task/task.component';
import { TaskStatusComponent } from './task-status/task-status.component';
import { TaskCommentComponent } from './task-comment/task-comment.component';


const routes: Routes = [
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  { 
    path: 'groups', 
    component: GroupsComponent, 
    canActivate: [RedirectionGuard], 
    data: 
    { 
      title: 'Groups', 
      breadcrumb:
        [
          {
            label:'Group', 
            url:''
          }
        ]
      }
    },
  { 
    path: 'groups/:groupId/projects', 
    component: ProjectComponent, 
    canActivate: [RedirectionGuard], 
    data: 
    {
      title:'Projects', 
      breadcrumb: 
        [ 
          { 
            label: 'Groups', 
            url:'/groups'
          }, 
          {
            label:'Projects', 
            url:''
          }
        ]
      }
    },
  { 
    path: 'groups/:groupId/projects/:projectId/tasks', 
    component: TaskComponent, 
    canActivate: [RedirectionGuard], 
    data: 
    { 
      title:'Tasks', 
      breadcrumb: 
        [
          { 
            label:'Groups', 
            url:'/groups'
          }, 
          { 
            label: 'Projects', 
            url:'/groups/:groupId/projects'
          },
          {
            label: 'Tasks', 
            url:''
          }
        ]
      }
    },
  { 
    path: 'groups/:groupId/projects/:projectId/statuses', 
    component: TaskStatusComponent, 
    canActivate: [RedirectionGuard], 
    data: 
    { 
      title:'Statuses', 
      breadcrumb: 
        [
          { 
            label:'Groups', 
            url:'/groups'
          }, 
          { 
            label: 'Projects', 
            url:'/groups/:groupId/projects'
          },
          {
            label: 'Tasks', 
            url: '/groups/:groupId/projects/:projectId/tasks'
          },
          {
            label: 'Statuses', 
            url:''
          }
        ]
      }
    },
    { 
      path: 'groups/:groupId/projects/:projectId/tasks/:taskId/comments', 
      component: TaskCommentComponent, 
      canActivate: [RedirectionGuard], 
      data: 
      { 
        title:'Tasks', 
        breadcrumb: 
          [
            { 
              label:'Groups', 
              url:'/groups'
            }, 
            { 
              label: 'Projects', 
              url:'/groups/:groupId/projects'
            },
            {
              label: 'Tasks', 
              url: '/groups/:groupId/projects/:projectId/tasks'
            },
            {
              label: 'Comments', 
              url:''
            }
          ]
        }
      },
  { 
    path: '', redirectTo: '/signup', pathMatch:'full'
  },
  { 
    path: '**', redirectTo: '/login', pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static components = [
    GroupsComponent,
    ProjectComponent,
    TaskComponent,
    TaskStatusComponent
  ];
 }
