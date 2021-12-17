const mysql = require('mysql');


class Sqlserver {

    constructor() {

        this.conexion = mysql.createConnection({
            host: 'localhost',
            database: 'mars_dsp',
            user: 'root',
            password: 'AbcD1234',
        });
        this.initconexion();
    }

    initconexion() {

        this.conexion.connect((error) => {
            if (error) {
                throw error;
            } else {
                console.log('La conexion con la base de datos fue establecida');
            }
        });
    }

    querySelect() {

        let { ab, bc } = this.conexion.query('SELECT * from usuarios', (error, result, fields) => {
            if (error)
                throw error;
            result.forEach(result => {
                // console.log(result);
            });
        });
        console.log(ab);
        conexion.end();

    }

}

module.exports = Sqlserver;