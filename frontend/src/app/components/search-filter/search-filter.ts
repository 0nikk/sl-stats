import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayerFilters } from '../../services/player';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-filter.html',
  styleUrls: ['./search-filter.scss']
})
export class SearchFilterComponent {
  @Output() filterChange = new EventEmitter<PlayerFilters>();

  filters: PlayerFilters = {
    name: '',
    team: '',
    position: '',
    nation: ''
  };

  onFilterChange(): void {
    // Only emit non-empty filters
    const activeFilters: PlayerFilters = {};
    if (this.filters.name?.trim()) activeFilters.name = this.filters.name.trim();
    if (this.filters.team?.trim()) activeFilters.team = this.filters.team.trim();
    if (this.filters.position?.trim()) activeFilters.position = this.filters.position.trim();
    if (this.filters.nation?.trim()) activeFilters.nation = this.filters.nation.trim();

    this.filterChange.emit(activeFilters);
  }

  clearFilters(): void {
    this.filters = {
      name: '',
      team: '',
      position: '',
      nation: ''
    };
    this.filterChange.emit({});
  }
}
