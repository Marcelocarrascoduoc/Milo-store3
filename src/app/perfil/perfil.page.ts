import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { AlertController } from '@ionic/angular';
import { DbserviceService } from '../services/dbservice.service'; // Asegúrate de importar el servicio de base de datos

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {
  nombre = '';
  apellido = '';
  correo = '';
  educacion = '';
  telefono = '';
  fechaNacimiento = '';
  password = '';
  user: string = ''; 

  constructor(private usuarioService: UsuarioService, 
              private alertController: AlertController,
              private dbService: DbserviceService // Asegúrate de importar y usar el servicio de base de datos si es necesario
            ) {}

  ngOnInit() {
    const datos = this.usuarioService.getUsuario();
    this.nombre = datos.nombre || '';
    this.apellido = datos.apellido || '';
    this.correo = datos.correo || '';
    this.educacion = datos.educacion || '';
    this.telefono = datos.telefono || '';
    this.fechaNacimiento = datos.fechaNacimiento || '';
    this.password = datos.password || '';

    // Si quieres obtener el usuario desde el estado de navegación:
    const navigation = window.history.state;
    if (navigation && navigation.user) {
      this.user = this.nombre; // Muestra el nombre registrado directamente
      // TRASPASO DE DATOS AL PERFIL 
    }

    this.infoUsuario();
  }

  guardarCambios() {
    this.usuarioService.actualizarUsuario({
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      educacion: this.educacion,
      telefono: this.telefono,
      fechaNacimiento: this.fechaNacimiento,
      password: this.password,
    });
    this.alertController
      .create({
        header: 'Perfil actualizado',
        message: 'Tus datos han sido actualizados correctamente.',
        buttons: ['OK'],
      })
      .then((alert) => alert.present());
  }

  infoUsuario() {
    this.dbService.infoUsuario(this.correo, this.password)
      .then(data => {
        if (data) {
          this.nombre = data.nombre || '';
          this.apellido = data.apellido || '';
          this.correo = data.correo || '';
          this.password = data.contraseña || '';
          this.telefono = data.telefono || '';
          this.educacion = data.nivel_de_estudios || '';
          this.fechaNacimiento = data.fecha_nacimiento || '';
        }
      });
  }
}

