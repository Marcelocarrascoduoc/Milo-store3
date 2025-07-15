import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service'; // importa el servicio
import { NavController } from '@ionic/angular'; // para navegar

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: false,
})
export class ProductosPage implements OnInit {

  productos = [
    {
      nombre: 'Complete puppy ',
      precio: 40000,
      imagen: 'assets/img/Comida-1.jpg'
    },
    {
      nombre: 'Bravery de pollo',
      precio: 45000,
      imagen: 'assets/img/Comida-2.jpg'
    },
    {
      nombre: 'Taste of wild',
      precio: 50000,
      imagen: 'assets/img/Comida-3.jpg'
    },
    {
      nombre: 'MasterDog Huesitos',
      precio: 10000,
      imagen: 'assets/img/snack-1.jpeg'
    },
    {
      nombre: 'MasterDog Rollitos',
      precio: 15000,
      imagen: 'assets/img/snack-2.jpeg'
    },
    {
      nombre: 'Advance Puppy snack',
      precio: 5000,
      imagen: 'assets/img/snack-3.jpeg'
    },
    {
      nombre: 'Pedigree Dentastix',
      precio: 5000,
      imagen: 'assets/img/snack-4.jpeg'
    }, 
    {
      nombre: 'Juguete para cachorro',
      precio: 5000,
      imagen: 'assets/img/juguete-perro 1.jpeg'
    }, 
    {
      nombre: 'Juguete perro adulto',
      precio: 5000,
      imagen: 'assets/img/juguete-perro 2.jpeg'
    }, 
    {
      nombre: 'Juguete perro grande',
      precio: 5000,
      imagen: 'assets/img/juguete-perro 3.jpeg'
    }, 
  ];

  constructor(
    private carritoService: CarritoService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  agregarAlCarrito(producto: any) {
    this.carritoService.agregarProducto(producto);
  }

}

