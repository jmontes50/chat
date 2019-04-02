import { Component, OnInit } from '@angular/core';
import {WebsocketService} from '../../services/websocket.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: []
})
export class ChatComponent implements OnInit {
  div:any;
  mensaje:string = '';

  constructor(private _sWebsocket:WebsocketService) { }

  ngOnInit() {
    this.div = document.getElementById("mensajes");
    this._sWebsocket.escuchar('mensaje-nuevo').subscribe((mensaje:string)=>{
      let p = document.createElement("p");
      p.innerHTML = mensaje;
      this.div.appendChild(p);
    })
  }

  enviar(){
    console.log("Enviado mensaje...");
    this._sWebsocket.emitir('enviar-mensaje',this.mensaje);
    this.mensaje = "";
  }

}
