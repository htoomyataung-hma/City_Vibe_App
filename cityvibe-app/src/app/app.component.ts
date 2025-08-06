import { Component, OnInit } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, camera, calendarOutline, sadOutline, locationOutline } from 'ionicons/icons';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonicModule],
})
export class AppComponent implements OnInit {
  constructor(private databaseService: DatabaseService, private platform: Platform) {
    addIcons({ add, camera, calendarOutline, sadOutline, locationOutline });
  }

  async ngOnInit() {
    // Initialize the database when the app starts
    await this.platform.ready();
    await this.databaseService.initializeDatabase();
  }
}