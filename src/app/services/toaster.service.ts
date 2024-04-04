import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr: ToastrService) { }

  toasterSuccess(message: string){
    console.log("tooooooaster : " + message);
    this.toastr.success(message);
  }

  toasterFailure(message: string){
    console.log("tooooooaster : " + message);
    this.toastr.error(message);
  }
}
