import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { MensajesComponent } from './components/mensajes/mensajes.component';
import { LoginComponent } from './components/login/login.component';
const rutas:Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'mensajes',
    component:MensajesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(rutas)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
