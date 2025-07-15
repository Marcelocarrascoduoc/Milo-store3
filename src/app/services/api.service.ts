import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClientModule para realizar peticiones HTTP
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // URL de la API de ejemplo 
  constructor( private http: HttpClient // Inyecta HttpClientModule para realizar peticiones HTTP
  ) { }

  // METODO GET PARA LOS USUARIOS 
  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl); // Realiza una petición GET a la URL de la API,obtiene todos los datos de los usuarios
  }

  // METODO POST PARA CREAR UN USUARIO
  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user); // Realiza una petición POST a la URL de la API con el usuario, crea un nuevo usuario
  }

  // METODO PUT PARA ACTUALIZAR UN USUARIO
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user); // Realiza una petición PUT a la URL de la API con el usuario, actualiza un usuario existente
  }
  // METODO DELETE PARA ELIMINAR UN USUARIO
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`); // Realiza una petición DELETE a la URL de la API, elimina un usuario existente
  }
}


