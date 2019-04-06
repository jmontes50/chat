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
    this._sWebsocket.escuchar('mensaje-nuevo').subscribe((payload:any)=>{
      let p = document.createElement("p");
      p.innerHTML = payload.nombre+ " dice: "+payload.mensaje;
      this.div.appendChild(p);
      setTimeout(() => {
        this.div.scrollTop = this.div.scrollHeight;
      }, 50);

    })
  }
  enviar(){
    console.log("Enviado mensaje...");
    let contenido = {
      mensaje: this.mensaje,
      nombre: JSON.parse(localStorage.getItem("usuario")).nombre
    };
    this._sWebsocket.emitir('enviar-mensaje',contenido);
    this.mensaje = "";
  }

}
