import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
@Injectable({ providedIn: 'root' })
export class GeolocationService {
    getCurrentPosition(): Promise<Position> {
        return Geolocation.getCurrentPosition({ enableHighAccuracy: true });
    }
}
