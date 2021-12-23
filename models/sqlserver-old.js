const mysql = require('mysql');


class Serversql {

    constructor() {

        this.conexion = mysql.createConnection({
            host: 'localhost',
            database: 'mars_dsp',
            user: 'root',
            password: 'AbcD1234',
        });
        this.initconexion();
        this.querySelect();
        this.conexion.end();
    }

    async initconexion() {

        await this.conexion.connect((error) => {
            if (error) {
                throw error;
            } else {
                console.log('La conexion con la base de datos fue establecida');
            }
        });
    }

    querySelect() {

        let datos = this.conexion.query('SELECT * from usuario', (error, result, fields) => {
            if (error)
                throw error;
            result.forEach(result => {
                console.log(result);
            });
        });



    }

}

module.exports = Serversql;