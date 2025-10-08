import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Player {
  playerName: string;
  nation: string;
  position: string;
  age: number;
  minutesPlayed: number;
  goals: number;
  assists: number;
  penaltyGoals: number;
  yellowCards: number;
  redCards: number;
  team: string;
}

export interface PlayerFilters {
  team?: string;
  position?: string;
  nation?: string;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = 'http://localhost:8080/api/v1/players';

  constructor(private http: HttpClient) {}

  // Get all players with optional filters
  getPlayers(filters?: PlayerFilters): Observable<Player[]> {
    let params = new HttpParams();

    if (filters) {
      if (filters.team) params = params.set('team', filters.team);
      if (filters.position) params = params.set('position', filters.position);
      if (filters.nation) params = params.set('nation', filters.nation);
      if (filters.name) params = params.set('name', filters.name);
    }

    const url = `${this.apiUrl}${params.toString() ? '?' + params.toString() : ''}`;
    console.log('Making request to:', url);

    return this.http.get<Player[]>(this.apiUrl, { params });
  }

  // Get single player by name
  getPlayerByName(name: string): Observable<Player[]> {
    const params = new HttpParams().set('name', name);
    return this.http.get<Player[]>(this.apiUrl, { params });
  }

  // Create new player
  createPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(this.apiUrl, player);
  }

  // Update existing player
  updatePlayer(player: Player): Observable<Player> {
    return this.http.put<Player>(this.apiUrl, player);
  }

  // Delete player
  deletePlayer(player: Player): Observable<Player> {
    return this.http.delete<Player>(`${this.apiUrl}/playerName`, { body: player });
  }
}
