import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-submit-event',
  templateUrl: './submit-event.page.html',
  styleUrls: ['./submit-event.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SubmitEventPage {
  capturedImage: string | undefined;

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) { }

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt
      });
      this.capturedImage = image.dataUrl;
    } catch (error) {
      this.showToast('Could not take picture.', 'danger');
    }
  }

  submitEvent() {
    this.showToast('Event submitted successfully!', 'success');
    this.navCtrl.back();
  }

  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({ message, duration: 3000, position: 'top', color });
    toast.present();
  }
}