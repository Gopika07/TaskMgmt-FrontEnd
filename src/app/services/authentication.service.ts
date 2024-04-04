import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{  

  constructor(private service: TokenService, private toaster: ToasterService){}

  IsLoggedIn(){
    const token = this.service.getToken();
    if(token)
      return true;
    return false;
  }

  logout(){
    this.toaster.toasterSuccess('Logged Out');
    localStorage.removeItem('Bearer');
  }
}
