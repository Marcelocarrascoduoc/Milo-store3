import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions, CameraResultType, CameraSource } from '@capacitor/camera';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
  standalone: false
})
export class CamaraPage implements OnInit { 

  capturedImage: string | undefined

  constructor(
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
    this.menuCtrl.close("main-menu");
  }

  async captureImage() {
    try { 
      const image = await Camera.getPhoto({
        quality: 90, // ajustar la calidad de la imagen
        allowEditing: false, // no permitir edición de la imagen
        resultType: CameraResultType.DataUrl, // obtener la imagen como URI
        source: CameraSource.Camera, // usar la cámara
        saveToGallery: true // guardar la imagen en la galería
      });
      this.capturedImage = image.dataUrl; // asignar la imagen capturada a la variable
    } catch (error) {
      console.error('Error al capturar la imagen:', error);
    }
  }
}
