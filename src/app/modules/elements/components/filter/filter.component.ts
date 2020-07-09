import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { IGenre } from 'src/app/core/interfaces/genre.interface';
import { StoreService } from '../../../../core/services/store.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() type: 'genres' | 'sorting';

  genres$: Observable<IGenre[]>;
  selectedGenreId$: Observable<string>;
  selectedSorting$: Observable<string>;

  sortingOptions = [
    { value: 'asc', label: 'По возрастанию (А-Я)' },
    { value: 'desc', label: 'По убыванию (Я-А)' },
  ];

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    if (this.type === 'genres') {
      this.genres$ = this.storeService.getUniqueGenres();
      this.selectedGenreId$ = this.storeService.getSelectedGenreId();
    } else {
      this.selectedSorting$ = this.storeService.getSelectedSorting();
    }
  }

  onSelectChange(value: string): void {
    this.type === 'genres'
      ? this.storeService.setSelectedGenreId(value)
      : this.storeService.setSelectedSorting(value);
  }
}
