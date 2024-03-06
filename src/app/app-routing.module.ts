import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { GroupsComponent } from './groups/groups.component';
import { AuthGuard } from './guard/loginguard.guard';
import { ProjectComponent } from './project/project.component';
import { RedirectionGuard } from './guard/redirection.guard';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  { path: 'groups', component: GroupsComponent, canActivate: [RedirectionGuard]},
  { path: 'groups/:groupId/projects', component: ProjectComponent, canActivate: [RedirectionGuard]},
  { path: 'groups/:groupId/projects/:projectId/tasks', component: TaskComponent, canActivate: [RedirectionGuard] },
  { path: '', redirectTo: '/signup', pathMatch:'full'},
  { path: '**', redirectTo: '/login', pathMatch: 'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
