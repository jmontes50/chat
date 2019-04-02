import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import { Usuarios } from './usuarios';
import { Usuario } from './usuario';


export default class Server {
    
    public app:express.Application;
    public puerto:any;
    public httpServer:http.Server;
    public io:socketIO.Server;
    public usuariosConectados:Usuarios = new Usuarios();

    constructor(){
        this.app = express();
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.puerto = process.env.PORT || 3700;
        this.escucharSockets();
    }

    escucharSockets(){
        console.log("Escuchando sockets");
        this.io.on('connect',(cliente)=>{

            console.log(`${cliente.id} se ha  conectado`);
            let usuario = new Usuario(cliente.id);
            this.usuariosConectados.agregar(usuario);
            console.log("Lista de usuarios");
            console.log(this.usuariosConectados.getLista());
            
            
            cliente.on('disconnect',()=>{
                console.log(`${cliente.id} se ha desconectado`);
                this.usuariosConectados.borrarUsuario(cliente.id);
            });

            cliente.on('enviar-mensaje',(payload)=>{
                console.log(payload);
                this.io.emit('mensaje-nuevo',payload);
            });
            
            cliente.on("configurar-usuario",(usuario)=>{
                this.usuariosConectados.actualizarNombre(cliente.id,usuario.nombre);
                console.log(this.usuariosConectados.getLista());
            });

            cliente.on('obtener-usuarios',()=>{
                // this.io.emit('usuarios-activos',this.usuariosConectados.getLista());
                // this.io.in(id)=> emite un socket para un cliente en especifico
                // dado su id
                this.io.in(cliente.id).emit('usuarios-activos',this.usuariosConectados.getLista());
            });
        });
    }

    start(){
        this.httpServer.listen(this.puerto,()=>{
            console.log("Servidor iniciado correctamente =) puerto => " 
                        + this.puerto);
        });
    }
}