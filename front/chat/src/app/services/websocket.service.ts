import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  
  public socketStatus = false;
  public usuario:Usuario = new Usuario('');
  
  constructor(private _socket:Socket) {
    this.checkStatus();
    // this.cargarStorage();
  }
  cargarStorage(){
    if(localStorage.getItem("usuario")){
      this.usuario.nombre = JSON.parse(localStorage.getItem("usuario")).nombre;
      this.loginWs(this.usuario.nombre);
    }
  }

  checkStatus(){
    this._socket.on('connect',()=>{
      console.log("Conectado al Servidor con socket");
      this.socketStatus = true;
    }); 
    this._socket.on('disconnect',()=>{
      console.log("Desconectado al Servidor con socket");
      this.socketStatus = false;
    });
  }
  
  emitir(evento:string,payload?:any){
    this._socket.emit(evento,payload);
  }

  escuchar(evento:string){
    return this._socket.fromEvent(evento);
  }
  /**
   * Funcion que guarda al usuario en el localStorage
   * @param nombre el nombre del usuario que esta iniciando
   * sesión
   */
  loginWs(nombre:string){

    this.usuario = new Usuario(nombre);
    this.emitir("configurar-usuario",this.usuario);
    this.guardarStorage();

  }
  guardarStorage(){
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cerrarSesion(){
    this.usuario = null;
    localStorage.removeItem('usuario');
    this.emitir('cerrar-sesion');
  }

}
