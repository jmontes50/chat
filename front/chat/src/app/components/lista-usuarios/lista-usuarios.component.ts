import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  public usuariosConectados:any = [];

  constructor(private _sWebsocket:WebsocketService) { }

  ngOnInit() {
    this._sWebsocket.emitir('obtener-usuarios');
    this._sWebsocket.escuchar('usuarios-activos').subscribe((listaUsuarios)=>{
      // setTimeout(() => {
        this.usuariosConectados = listaUsuarios;  
      // }, 2000);
    });
  }

}
