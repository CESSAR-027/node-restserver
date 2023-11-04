const express = require('express');
const cors = require('cors');
const { conexionDB } = require('../database/config');



class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/usuarios';

        //conexion base datos
        this.conectarDB();
        //middelwares
        this.middlewares();
        //rutas app
        this.routes();
    }

    async conectarDB(){
        await conexionDB();
    }

    middlewares() {

        //CORS
        this.app.use(cors());
        
        //BODY
        this.app.use(express.json());

        //DIRECTORIO PUBLIC
        this.app.use(express.static('public'));

    }

    routes() {

        this.app.use(this.userPath, require('../routes/userRouter'));


    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('SERVIDOR FUNCIONANDO CORRECTAMENTE', this.port);
        })
    }
}


module.exports = Server;