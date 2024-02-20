import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { TokenService } from './token.service';

const signupApi = "https://localhost:7197/api/signup";
const loginApi = "https://localhost:7197/api/login";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token!: string;

  constructor(private httpClient: HttpClient, private service: TokenService) { }

  SignUp(email: string, password: string, name: string, groupName: string, referralCode: string) {
    const body = {
      email: email,
      password: password,
      name: name,
      groupName: groupName,
      referralCode: referralCode
    };
    return this.httpClient.post(signupApi, body, { responseType: 'text'}).pipe(
      tap(response => {
        this.token = response;
        this.service.setToken(this.token);
      })
    );
  }
  logIn(email: string, password: string){
    const body = {
      email: email,
      password: password
    };
    return this.httpClient.post(loginApi, body, { responseType: 'text'}).pipe(
    tap(respose =>{
      this.token = respose;
      this.service.setToken(this.token);
    })
    );
  }
}
