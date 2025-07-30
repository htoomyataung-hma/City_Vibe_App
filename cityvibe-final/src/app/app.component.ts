import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, camera, calendarOutline, sadOutline, timeOutline, peopleOutline, logOutOutline, logInOutline, locationOutline, documentTextOutline, newspaperOutline, personCircleOutline, shareSocialOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonicModule],
})
export class AppComponent {
  constructor() {
    // Register all icons that will be used in the app globally
    addIcons({ add, camera, calendarOutline, sadOutline, timeOutline, peopleOutline, logOutOutline, logInOutline, locationOutline, documentTextOutline, newspaperOutline, personCircleOutline, shareSocialOutline });
  }
}