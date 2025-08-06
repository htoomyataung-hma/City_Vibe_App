import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

// Define the structure of an event in the database
export interface Event {
  id?: number; // The row ID from the database
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  private db: SQLiteDBConnection | null = null;
  private sqlite: SQLiteConnection;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  // Initializes the database connection and creates the table if it doesn't exist
  async initializeDatabase() {
    this.db = await this.sqlite.createConnection('cityvibe-db', false, 'no-encryption', 1, false);
    await this.db.open();
    const schema = `
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        category TEXT,
        date TEXT,
        location TEXT,
        description TEXT,
        image TEXT
      );
    `;
    await this.db.execute(schema);
    return true;
  }

  // Fetches all events from the database
  async getEvents(): Promise<Event[]> {
    if (!this.db) return [];
    const result = await this.db.query('SELECT * FROM events ORDER BY id DESC;');
    return result.values || [];
  }

  // Adds a new event to the database
  async addEvent(event: Omit<Event, 'id'>) {
    if (!this.db) return;
    const query = 'INSERT INTO events (title, category, date, location, description, image) VALUES (?, ?, ?, ?, ?, ?);';
    const values = [event.title, event.category, event.date, event.location, event.description, event.image];
    return this.db.run(query, values);
  }
}