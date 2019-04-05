import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { MensajesComponent } from './components/mensajes/mensajes.component';
import { LoginComponent } from './components/login/login.component';
import { GuardMensajesService } from './services/guard-mensajes.service';
const rutas:Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'mensajes',
    component:MensajesComponent,
    canActivate:[GuardMensajesService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(rutas,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
