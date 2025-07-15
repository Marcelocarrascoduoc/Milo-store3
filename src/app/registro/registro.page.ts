import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FormateoFechaPipe } from '../../pipes/formateo-fecha.pipe';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { DbserviceService } from '../services/dbservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    FormateoFechaPipe
  ]
})
export class RegistroPage implements OnInit {
  // Variables del formulario
  nombre: string = '';
  apellido: string = '';
  password: string = '';
  correo: string = '';
  telefono: string = '';
  nivel_de_educacion: string = '';
  selectedDate: any = '';

  // Limita selección de fecha al día actual
  maxDate: string = new Date().toISOString();

  // Estado para mostrar mensajes de registro
  registroStatus: string = '';

  constructor(
    private alertController: AlertController,
    private menuController: MenuController,
    private formateoFechaPipe: FormateoFechaPipe,
    private usuarioService: UsuarioService,
    private router: Router,
    private dbservice: DbserviceService
  ) {}

  ngOnInit() {
    this.menuController.close('main-menu');
  }

  // Método para registrar y guardar usuario
  async registrarUsuario() {
    if (
      !this.nombre ||
      !this.apellido ||
      !this.password ||
      !this.correo ||
      !this.telefono || 
      !this.nivel_de_educacion ||
      !this.selectedDate
    ) {
      await this.presentAlert('Error', 'Por favor, completa todos los campos');
      return;
    }

    const fechaFormateada = this.formateoFechaPipe.transform(this.selectedDate);

    // Actualizar servicio de usuario
    this.usuarioService.actualizarUsuario({
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      password: this.password,
      telefono: this.telefono,
      educacion: this.nivel_de_educacion,
      fechaNacimiento: fechaFormateada
    });

    // Guardar en base de datos local
    await this.dbservice.almacenarUsuario(
      this.nombre,
      this.apellido,
      this.password,
      this.correo,
      this.telefono,
      this.nivel_de_educacion,
      fechaFormateada // <-- agrega la fecha aquí
    );

    this.registroStatus = 'Registro exitoso';

    await this.presentAlert(this.registroStatus, fechaFormateada);
  }

  // Método reutilizable para mostrar alertas
  async presentAlert(mensaje: string, fechaFormateada: string) {
    const alert = await this.alertController.create({
      header: mensaje,
      message: `${this.nombre} ${this.apellido}\nFecha de nacimiento: ${fechaFormateada}`,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/home']);
          }
        }
      ]
    });

    await alert.present();
  }
}
