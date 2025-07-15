import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: any = {};
  setUsuario(data: any) {
    this.usuario = data;
  }

  getUsuario() {
    return this.usuario;
  }

  actualizarUsuario(data: any) {
    this.usuario = { ...this.usuario, ...data };
  }
}