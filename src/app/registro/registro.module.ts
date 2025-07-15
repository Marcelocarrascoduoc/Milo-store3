import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroPageRoutingModule } from './registro-routing.module';

import { RegistroPage } from './registro.page';

import { MatDatepickerModule } from '@angular/material/datepicker'; // Importante para el selector de fecha
import { MatInputModule } from '@angular/material/input'; // Importante para los campos de entrada
import { MatFormFieldModule } from '@angular/material/form-field'; // Importante para los campos de formulario
import { MatNativeDateModule } from '@angular/material/core'; // Importante para el manejo de fechas nativas
import { MatIconModule } from '@angular/material/icon';  // Importante para los iconos
import { FormateoFechaPipe } from '../../pipes/formateo-fecha.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroPageRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule, // Importante para los iconos
    FormateoFechaPipe // <-- Agrega el pipe aquí
  ],
  declarations: [
  ],
  providers: [FormateoFechaPipe]
})
export class RegistroPageModule {}
