import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{  

  constructor(private service: TokenService){}

  IsLoggedIn(){
    const token = this.service.getToken();
    if(token)
      return true;
    return false;
  }

  logout(){
    localStorage.removeItem('Bearer');
  }
}
