import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';

import { IChannel } from '../interfaces/channel.interface';
import { IGenre } from '../interfaces/genre.interface';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  allChannels: IChannel[];
  channelsLimit = 24;
  totalChannels = 0;

  private channels$: BehaviorSubject<IChannel[]> = new BehaviorSubject(null);
  private selectedGenreId$: BehaviorSubject<string> = new BehaviorSubject(localStorage.getItem('selectedFilterId'));
  private selectedSorting$: BehaviorSubject<string> = new BehaviorSubject(localStorage.getItem('selectedSorting'));
  private uniqueGenres$: BehaviorSubject<IGenre[]> = new BehaviorSubject(null);

  constructor() { }

  getChannels(): Observable<IChannel[]> {
    return this.channels$.asObservable()
      .pipe(
        filter(channels => !!channels),
        map(channels => this.sliceChannels(channels)),
        withLatestFrom(this.selectedGenreId$),
        map(this.filterChannelsByGenre),
        withLatestFrom(this.selectedSorting$),
        map(this.sortChannels),
      );
  }

  getSelectedGenreId(): Observable<string> {
    return this.selectedGenreId$.asObservable();
  }

  getUniqueGenres(): Observable<IGenre[]> {
    return this.uniqueGenres$.asObservable();
  }

  getSelectedSorting(): Observable<string> {
    return this.selectedSorting$.asObservable();
  }

  setChannels(channels: IChannel[]): void {
    this.channels$.next(channels);
  }

  setSelectedGenreId(genre: string): void {
    localStorage.setItem('selectedFilterId', genre);
    this.selectedGenreId$.next(genre);
    this.channels$.next(this.allChannels);
  }

  setUniqueGenres(genres: IGenre[]): void {
    this.uniqueGenres$.next(genres);
  }

  setSelectedSorting(sorting: string): void {
    localStorage.setItem('selectedSorting', sorting);
    this.selectedSorting$.next(sorting);
    this.channels$.next(this.allChannels);
  }

  showMoreChannels(): void {
    this.channelsLimit += 12;
    this.channels$.next(this.allChannels);
  }

  private filterChannelsByGenre([channels, genreId]): IChannel[] {
    if (!genreId) { return channels; }

    return channels.filter((channel: IChannel) => {
      return channel.genres && channel.genres.some(genre => genre.genreID === genreId);
    });
  }

  private sliceChannels(channels: IChannel[]): IChannel[] {
    return channels.slice(0, this.channelsLimit);
  }

  private sortChannels([channels, sorting]): IChannel[] {
    if (!sorting) { return channels; }

    return channels.sort((a: IChannel, b: IChannel) => sorting === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
    );
  }
}
