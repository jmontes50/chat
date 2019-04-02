import Server from './clases/server';
import {router} from './routes/router';

const server = new Server();

server.app.use('/',router);

server.start();