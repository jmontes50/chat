import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent{
  public usuariosConectados:any = [];
  constructor(private _sWebsocket:WebsocketService,
              private _router:Router) {
                this.obtenerUsuariosConectados();
              }

  obtenerUsuariosConectados() {
    this._sWebsocket.emitir('obtener-usuarios');
    console.log("se emitio el obtner-usuarios");
    this._sWebsocket.escuchar('usuarios-activos').subscribe((listaUsuarios)=>{
      console.log(listaUsuarios);
        this.usuariosConectados = listaUsuarios;
    });
  }

  cerrarSesion(){
    this._sWebsocket.cerrarSesion();
    this._router.navigateByUrl('/');

  }

}
