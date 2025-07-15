import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router'; // <-- Asegúrate de importar NavigationEnd
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private menu: MenuController, private router: Router) {
    // Cerrar el menú en cada navegación
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.menu.close('mainMenu');
      });
  }

  cerrarSesion() {
    localStorage.removeItem('token'); // Elimina el token de sesión
    localStorage.removeItem('user'); // Elimina los datos del usuario
    console.log('Sesión cerrada');
    this.menu.close('mainMenu');
    this.router.navigate(['/login']);
  }
}

