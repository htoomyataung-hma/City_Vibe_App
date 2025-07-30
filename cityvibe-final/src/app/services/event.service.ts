import { Injectable } from '@angular/core';
export interface Event { id: number; title: string; category: string; date: string; location: string; description: string; image: string; }
@Injectable({ providedIn: 'root' })
export class EventService {
    private events: Event[] = [
        { id: 1, title: 'Live Music Night', category: 'Music', date: 'July 30, 2025', location: 'Dublin City Centre', description: 'An evening of live performances.', image: 'https://placehold.co/600x400/7B1FA2/FFFFFF?text=Live+Music' },
        { id: 2, title: 'Dublin Food Festival', category: 'Food', date: 'July 31, 2025', location: 'Merrion Square', description: 'Explore a variety of food stalls.', image: 'https://placehold.co/600x400/C2185B/FFFFFF?text=Food+Fest' },
        { id: 3, title: 'Morning Yoga', category: 'Wellness', date: 'August 1, 2025', location: 'Phoenix Park', description: 'A refreshing outdoor yoga session.', image: 'https://placehold.co/600x400/00796B/FFFFFF?text=Yoga' }
    ];
    getEvents(): Promise<Event[]> { return Promise.resolve(this.events); }
}