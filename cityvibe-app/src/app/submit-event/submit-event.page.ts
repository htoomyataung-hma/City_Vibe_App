import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DatabaseService } from '../services/database.service';
import { GeolocationService } from '../services/geolocation.service';


@Component({
  selector: 'app-submit-event',
  templateUrl: './submit-event.page.html',
  styleUrls: ['./submit-event.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SubmitEventPage {
  eventData = {
    title: '',
    category: '',
    date: new Date().toISOString().split('T')[0], // Default to today
    location: '',
    description: '',
    image: 'https://placehold.co/600x400/cccccc/FFFFFF?text=New+Event'
  };
  isSubmitting = false;

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private databaseService: DatabaseService,
    private geolocationService: GeolocationService
  ) { }

  async takePicture() {
    try {
      await Camera.requestPermissions();
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl, 
        source: CameraSource.Prompt
      });
      
      if (image.dataUrl) {
        this.eventData.image = image.dataUrl;
      }
    } catch (error) {
      this.showToast('Could not take picture.', 'danger');
    }
  }

  async getCurrentLocation() {
    try {
      const position = await this.geolocationService.getCurrentPosition();
      // Update the location field with the coordinates
      this.eventData.location = `Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`;
      this.showToast('Location captured!', 'success');
    } catch (error) {
      this.showToast('Could not get current location.', 'danger');
    }
  }

  async submitEvent() {
    if (!this.eventData.title) {
      this.showToast('Please enter an event title.', 'danger');
      return;
    }
    this.isSubmitting = true;
    try {
      await this.databaseService.addEvent(this.eventData);
      this.showToast('Event saved successfully!', 'success');
      this.navCtrl.back();
    } catch (error) {
      console.error("Error saving event:", error);
      this.showToast('Failed to save event.', 'danger');
    } finally {
      this.isSubmitting = false;
    }
  }

  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({ message, duration: 3000, position: 'top', color });
    toast.present();
  }
}