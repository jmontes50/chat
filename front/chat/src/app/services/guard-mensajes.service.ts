import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardMensajesService implements CanActivate{

  constructor(private _router:Router) { }

  canActivate(){
    if(localStorage.getItem("usuario")){
      return true;
    }else{
      this._router.navigateByUrl("/");
      return false;
    }
  }

}
