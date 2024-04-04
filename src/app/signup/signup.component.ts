import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import {  Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service';

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

  constructor(private service: UserService, private fb: FormBuilder, private router: Router, private toaster: ToasterService){
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
      this.toaster.toasterSuccess('Signup successfull!');
      this.router.navigate(['/groups']);
    },
    (error) => {
      this.toaster.toasterFailure('Signup Failed!');
      this.error = error.error;
      this.err = true;
    });
    this.submitted = true;
  }
}
