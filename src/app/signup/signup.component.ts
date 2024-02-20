import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;
  submitted = false;
  err = false;
  error!: string;

  constructor(private service: UserService, private fb: FormBuilder, private router: Router){
    this.signupForm = this.fb.group ({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      groupName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      referralCode: new FormControl('')
    });
  }

  signUp(form: FormGroup) {
    this.service.SignUp(form.value.email, form.value.password, form.value.name, form.value.groupName, form.value.referralCode)
    .subscribe(() => {
      this.router.navigate(['/groups']);
    },
    (error) => {
      console.error(error.error);
      this.error = error.error;
      this.err = true;
    });
    this.submitted = true;
  }
}
