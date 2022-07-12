const express = require('express');
const cors = require('cors') ;
require('dotenv');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        
        
        this.middlewares();
        this.routes();
    }

    // Middlewares


    middlewares() {
        //CORS
        this.app.unsubscribe(cors());

        // Parseo y lectura del body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));
    }    
    
    // Rutas de la app
    routes(){
        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto:',this.port);
        });
    }

}

module.exports = Server;