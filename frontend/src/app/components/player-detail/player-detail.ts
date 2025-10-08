import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PlayerService, Player } from '../../services/player';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './player-detail.html',
  styleUrls: ['./player-detail.scss']
})
export class PlayerDetailComponent implements OnInit {
  player: Player | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    const playerName = this.route.snapshot.paramMap.get('name');
    if (playerName) {
      this.loadPlayer(playerName);
    }
  }

  loadPlayer(name: string): void {
    this.playerService.getPlayerByName(name).subscribe({
      next: (players) => {
        if (players && players.length > 0) {
          this.player = players[0];
        } else {
          this.error = 'Player not found';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading player', err);
        this.error = 'Failed to load player data';
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
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
