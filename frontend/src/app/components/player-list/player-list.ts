import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService, Player, PlayerFilters } from '../../services/player';
import { SearchFilterComponent } from '../search-filter/search-filter';
import { PlayerTableComponent } from '../player-table/player-table';

@Component({
  selector: 'app-Player-list',
  standalone: true,
  imports: [CommonModule, SearchFilterComponent, PlayerTableComponent],
  templateUrl: './player-list.html',
  styleUrls: ['./player-list.scss']
})
export class PlayerListComponent implements OnInit {
  players: Player[] = [];
  loading = true;
  error = '';

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers(filters?: PlayerFilters): void {
    this.loading = true;
    this.error = '';

    console.log('Loading players with filters:', filters);

    this.playerService.getPlayers(filters).subscribe({
      next: (data) => {
        console.log('Received players:', data);
        this.players = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading players:', err);
        console.error('Error status:', err.status);
        console.error('Error message:', err.message);
        this.error = `Failed to load players: ${err.status} ${err.statusText || 'Unknown error'}`;
        this.loading = false;
      }
    });
  }

  onFilterChange(filters: PlayerFilters): void {
    this.loadPlayers(filters);
  }
}
