import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, NavController } from '@ionic/angular';
import { Event, EventService } from '../services/event.service';
import { GeolocationService } from '../services/geolocation.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HomePage implements OnInit {
  events: Event[] = [];
  isLoading = false;

  constructor(
    private eventService: EventService,
    private geolocationService: GeolocationService,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.loadEvents();
  }

  goToSubmitEventPage() {
    this.navCtrl.navigateForward('/submit-event');
  }

  async loadEvents() {
    this.isLoading = true;
    try {
      await this.geolocationService.getCurrentPosition();
      this.showToast('Location found!', 'success');
    } catch (error) {
      this.showToast('Could not get location. Showing default events.', 'danger');
    }

    this.events = await this.eventService.getEvents();
    this.isLoading = false;
  }

  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({ message, duration: 3000, position: 'top', color });
    toast.present();
  }
}
