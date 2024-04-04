import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { PathService } from './services/path.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  
  constructor(public service: AuthenticationService, 
    public path: PathService
  ){
  }
}
