import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  standalone: false
})
export class ClientesPage implements OnInit {

  users: any[] = [];
  nuevoUsuario = { name: '', email: '' }; // Cambia a camelCase
  
  constructor(
    private apiService: ApiService,
    private menu: MenuController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.menu.close("main-menu");

    // llama al metodo GET de la ApiService
    this.apiService.getUsers().subscribe(
      (response: any) => {
        this.users = response;
      },
      (error: any) => { 
        this.mostrarAlerta('No se pudieron cargar los clientes. Inténtalo de nuevo más tarde.');
      }
    );
  }

  // funcion para agregar nuevos cliente
  agregarUsuario() { 
    this.apiService.addUser(this.nuevoUsuario).subscribe(
      (response) => {
        this.users.push(response);
        this.nuevoUsuario = { name: '', email: '' }; // Resetea el formulario
        this.mostrarAlerta('Cliente agregado exitosamente.');
      },
      (error) => {
        this.mostrarAlerta('No se pudo agregar el cliente. Inténtalo de nuevo.');
      }
    );
  }
  
  // Método para eliminar un usuario
  eliminarUsuario(user: any) {
    this.apiService.deleteUser(user.id).subscribe(
      () => {
        // Elimina el usuario de la lista local
        this.users = this.users.filter((u: any) => u.id !== user.id);
        this.mostrarAlerta('Cliente eliminado exitosamente.');
      },
      (error) => {
        this.mostrarAlerta('No se pudo eliminar el cliente. Inténtalo de nuevo.');
      }
    );
  }

  // metodo para mostrar la alerta
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Mi aplicación',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

}
