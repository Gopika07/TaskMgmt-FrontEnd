import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorTitle: string = '';
  err = false;
  submitted = false;

  constructor(private service: UserService, private fb: FormBuilder, private router:Router){
    this.loginForm = this.fb.group({
      email: new FormControl('', (Validators.required, Validators.email)),
      password: new FormControl('', Validators.required)
    });
  }

  login(form: FormGroup){
    this.service.logIn(form.value.email, form.value.password)
    .subscribe(() =>{
        this.router.navigate(['/groups']);
    },
    (error) => {
      console.log(error);
    }
    );
    this.submitted = true;
  }

}
