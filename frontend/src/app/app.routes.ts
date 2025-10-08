import { Routes } from '@angular/router';
import { PlayerListComponent } from './components/player-list/player-list';
import { PlayerDetailComponent } from './components/player-detail/player-detail';

export const routes: Routes = [
  { path: '', component: PlayerListComponent },
  { path: 'player/:name', component: PlayerDetailComponent },
  { path: '**', redirectTo: '' }
];
