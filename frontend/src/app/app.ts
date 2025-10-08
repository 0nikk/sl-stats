import { Component, signal } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {PlayerListComponent} from './components/player-list/player-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PlayerListComponent, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
