import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { Event, DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HomePage {
  events: Event[] = [];
  isLoading = false;

  constructor(
    private databaseService: DatabaseService,
    private navCtrl: NavController
  ) {}

  // This lifecycle event fires every time the user enters the page, ensuring the list is fresh
  ionViewWillEnter() {
    this.loadEvents();
  }
  
  async loadEvents() {
    this.isLoading = true;
    try {
      this.events = await this.databaseService.getEvents();
    } catch (error) {
      console.error("Failed to load events from SQLite", error);
    } finally {
      this.isLoading = false;
    }
  }
  
  goToSubmitEventPage() { this.navCtrl.navigateForward('/submit-event'); }
}