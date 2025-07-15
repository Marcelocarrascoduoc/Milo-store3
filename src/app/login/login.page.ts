import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router'; // Importamos Router si es necesario para navegación
import { DbserviceService } from '../services/dbservice.service'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {

  email: string = '';
  password: string = '';

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private dbservice: DbserviceService
  ) {}

  async login() {
    try {
      const data = await this.dbservice.loginUsuario(this.email, this.password);
      if (data == 1) {
        localStorage.setItem('sesionActiva', 'true');
        this.navCtrl.navigateRoot('/home', {
          state: { email: this.email }
        });
      } else {
        this.mostrarAlerta('Error', 'Correo o contraseña incorrectos');
      }
    } catch (error) {
      this.mostrarAlerta('Error', 'Ocurrió un error al iniciar sesión');
    }
  }
 
  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  registro() {
    this.navCtrl.navigateForward('/registro');
  }
}