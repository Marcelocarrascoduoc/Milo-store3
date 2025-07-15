import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private items: any[] = [];

  agregarProducto(producto: any) {
    this.items.push(producto);
  }

  obtenerProductos() {
    return this.items;
  }

  limpiarCarrito() {
    this.items = [];
  }
}