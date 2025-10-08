import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Player } from '../../services/player';

type SortColumn = keyof Player;
type SortDirection = 'asc' | 'desc' | '';

@Component({
  selector: 'app-player-table',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './player-table.html',
  styleUrls: ['./player-table.scss']
})
export class PlayerTableComponent {
  @Input() players: Player[] = [];

  sortColumn: SortColumn = 'playerName';
  sortDirection: SortDirection = 'asc';

  get sortedPlayers(): Player[] {
    if (!this.sortColumn || !this.sortDirection) {
      return this.players;
    }

    return [...this.players].sort((a, b) => {
      const aValue = a[this.sortColumn];
      const bValue = b[this.sortColumn];

      if (aValue === bValue) return 0;

      const comparison = aValue > bValue ? 1 : -1;
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  sort(column: SortColumn): void {
    if (this.sortColumn === column) {
      // Toggle direction
      if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc';
      } else if (this.sortDirection === 'desc') {
        this.sortDirection = '';
        this.sortColumn = 'playerName';
      } else {
        this.sortDirection = 'asc';
      }
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  getSortIcon(column: SortColumn): string {
    if (this.sortColumn !== column) return '↕️';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  extractNationCode(nation: string): string {
    if (!nation) return '';
    // Extract only uppercase letters from nation string (e.g., "al ALB" -> "ALB")
    const match = nation.match(/[A-Z]+/);
    return match ? match[0] : nation;
  }

  getNationFlag(nation: string): string {
    if (!nation) return '';

    // Extract lowercase country code (e.g., "al ALB" -> "al")
    const codeMatch = nation.match(/^[a-z]+/);
    if (!codeMatch) return '';

    const countryCode = codeMatch[0].toUpperCase();

    // Convert country code to flag emoji
    // Flag emojis are created by combining regional indicator symbols
    // Each letter A-Z maps to 🇦-🇿 (U+1F1E6 to U+1F1FF)
    if (countryCode.length === 2) {
      const firstChar = countryCode.charCodeAt(0) - 65 + 0x1F1E6;
      const secondChar = countryCode.charCodeAt(1) - 65 + 0x1F1E6;
      return String.fromCodePoint(firstChar, secondChar);
    }

    return '';
  }
}
