import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RequestInterceptor } from './request.interceptor';
import { LoginComponent } from './login/login.component';
import { GroupsComponent } from './groups/groups.component';
import { ProjectComponent } from './project/project.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TaskComponent } from './task/task.component';
import { TaskStatusComponent } from './task-status/task-status.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastRef, ToastrModule } from 'ngx-toastr';
import { TaskCommentComponent } from './task-comment/task-comment.component';
import { FilterPipe } from './project/filter.pipe';
import { ToasterService } from './services/toaster.service';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    GroupsComponent,
    ProjectComponent,
    SpinnerComponent,
    TaskComponent,
    TaskStatusComponent,
    TaskCommentComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgDynamicBreadcrumbModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
