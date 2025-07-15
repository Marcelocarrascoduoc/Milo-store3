import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  constructor( private sqlite: SQLite ) { 
    this.crearTablas(); // Llama al método crearTablas para crear las tablas al iniciar el servicio
  }

  crearTablas() { // Método para crear las tablas en la base de datos
    this.sqlite.create({ // Crea la base de datos
      name: 'mydb.db', // Nombre de la base de datos
      location: 'default' // Ubicación de la base de datos
    })
    .then((db: SQLiteObject) => { // Crea un objeto SQLiteObject , cuando se crea la base de datos 

      db.executeSql('create table if not exists usuario (nombre varchar(30), apellido varchar(30), contraseña varchar(30), correo varchar(75), telefono varchar(20), nivel_de_estudios varchar(30), fecha_nacimiento varchar(12))', [])
        .then(() => console.log('MCG:TABLA USUARIO CREADA CORRECTAMENTE')) // Crea la tabla usuario
        .catch(e => console.log('MCG:ERROR AL CREAR TABLA USUARIO')); // Si hay un error al crear la tabla usuario, lo muestra en la consola

    }).catch(e => console.log('MCG:ERROR AL CREAR O ABRIR BASE DE DATOS')); // Si hay un error al crear la base de datos, lo muestra en la consola
  }

  almacenarUsuario(nombre: string, apellido: string, contraseña: string, correo: string, telefono: string, nivel_de_estudios: string, fecha_nacimiento: string) { // Método para almacenar los datos del usuario en la base de datos
    this.sqlite.create({ // Crea la base de datos
    name: 'mydb.db', // Nombre de la base de datos
    location: 'default' // Ubicación de la base de datos
  })
  .then((db: SQLiteObject) => { // Crea un objeto SQLiteObject , cuando se crea la base de datos 

    db.executeSql('insert into usuario values(?,?,?,?,?,?,?)', 
      [nombre, apellido, contraseña, correo, telefono, nivel_de_estudios, fecha_nacimiento]) // Inserta los datos del usuario en la tabla usuario
      .then(() => console.log('MCG:USUARIO ALMACENADO ')) // Crea la tabla usuario
      .catch(e => console.log('MCG:ERROR AL ALMACENAR USUARIO')); // Si hay un error al crear la tabla usuario, lo muestra en la consola

  }).catch(e => console.log('MCG:ERROR AL CREAR O ABRIR BASE DE DATOS')); // Si hay un error al crear la base de datos, lo muestra en la consola
} 

  loginUsuario(correo: string, contraseña: string): Promise<number> { // Método para realizar el login del usuario
    return this.sqlite.create({
      name: 'mydb.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      return db.executeSql(
        'select count(correo) as cantidad from usuario where correo = ? and contraseña = ?',
        [correo, contraseña]
      );
    })
    .then((data) => {
      return data.rows.item(0).cantidad;
    })
    .catch(e => {
      console.log('MCG:ERROR AL REALIZAR LOGIN USUARIO:' + JSON.stringify(e));
      return 0; // Retorna 0 en caso de error
    });
  }

  infoUsuario(correo: string, contraseña: string): Promise<any> { // Método para obtener información del usuario
    return this.sqlite.create({
      name: 'mydb.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      return db.executeSql(
        'select nombre, apellido, correo, contraseña, telefono, nivel_de_estudios, fecha_nacimiento from usuario where correo = ? and contraseña = ?',
        [correo, contraseña]
      );
    })
    .then((data) => {
      if (data.rows.length > 0) {
        let objeto: any = {};
        objeto.nombre = data.rows.item(0).nombre;
        objeto.apellido = data.rows.item(0).apellido;
        objeto.correo = data.rows.item(0).correo; 
        objeto.contraseña = data.rows.item(0).contraseña;
        objeto.telefono = data.rows.item(0).telefono;
        objeto.nivel_de_estudios = data.rows.item(0).nivel_de_estudios;
        objeto.fecha_nacimiento = data.rows.item(0).fecha_nacimiento;
        return objeto; // Retorna el objeto con la información del usuario
      } else {
        return null; // No se encontró el usuario
      }
    })
    .catch(e => {
      console.log('MCG:ERROR AL OBTENER INFO DE PERSONA:' + JSON.stringify(e));
      return null; // Retorna null en caso de error
    });
}

}