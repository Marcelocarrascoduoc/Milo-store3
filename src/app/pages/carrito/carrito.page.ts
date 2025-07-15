import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: false,
})
export class CarritoPage implements OnInit {
  productos: any[] = [];
  metodoPago: string = '';

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    this.productos = this.carritoService.obtenerProductos();
  }

  finalizarcompra() {
    if (this.productos.length === 0) {
      console.log('El carrito está vacío. No se puede finalizar la compra.');
      return;
    }

    // Aquí puedes agregar la lógica para procesar el pago o finalizar la compra
    console.log('Compra finalizada con los siguientes productos:', this.productos);
    
    // Limpiar el carrito después de finalizar la compra
    this.vaciarCarrito();
  }

  vaciarCarrito() {
    this.carritoService.limpiarCarrito();
    this.productos = [];
  }

  sumarCantidad(producto: any) {
    if (!producto.cantidad) {
      producto.cantidad = 1;
    }
    producto.cantidad++;
  }

  restarCantidad(producto: any) {
    if (!producto.cantidad) {
      producto.cantidad = 1;
    }
    if (producto.cantidad > 1) {
      producto.cantidad--;
    }
  }

  obtenerTotal(): number {
    return this.productos.reduce((acc, prod) => acc + (prod.precio * (prod.cantidad || 1)), 0);
  }

}
