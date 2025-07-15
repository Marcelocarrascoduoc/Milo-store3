import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; // <-- Importa ActivatedRoute
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage {
  usuario: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private menu: MenuController,
    private route: ActivatedRoute // <-- Inyecta ActivatedRoute
  ) {
    // Se recibe al usuario desde el login 
    const nav = window.history.state;
    if (nav && nav.email) {
      this.usuario = nav.email;
    }
  }

  ngOnInit() { 
    this.menu.close("mainMenu");
    // Obtener los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.password = params['password'];
    });
  }

  irAProductos() {
    this.router.navigate(['/productos']);
  }
}
