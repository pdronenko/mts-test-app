import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, withLatestFrom, tap } from 'rxjs/operators';

import { Channel } from '../classes/channel.class';
import { IGenre } from '../interfaces/genre.interface';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public allChannels: Channel[];
  public channelsLimit = 24;
  public filteredChannelsCount = 0;

  private channels$: BehaviorSubject<Channel[]> = new BehaviorSubject(null);
  private selectedGenreId$: BehaviorSubject<string> = new BehaviorSubject(localStorage.getItem('selectedFilterId'));
  private selectedSorting$: BehaviorSubject<string> = new BehaviorSubject(localStorage.getItem('selectedSorting'));
  private uniqueGenres$: BehaviorSubject<IGenre[]> = new BehaviorSubject(null);

  constructor() { }

  public getChannels(): Observable<Channel[]> {
    return this.channels$.asObservable()
      .pipe(
        filter(channels => !!channels),
        withLatestFrom(this.selectedGenreId$),
        map(this.filterChannelsByGenre),
        tap(channels => this.filteredChannelsCount = channels.length),
        withLatestFrom(this.selectedSorting$),
        map(this.sortChannels),
        map(channels => this.sliceChannels(channels)),
      );
  }

  public getSelectedGenreId(): Observable<string> {
    return this.selectedGenreId$.asObservable();
  }

  public getUniqueGenres(): Observable<IGenre[]> {
    return this.uniqueGenres$.asObservable();
  }

  public getSelectedSorting(): Observable<string> {
    return this.selectedSorting$.asObservable();
  }

  public setChannels(channels: Channel[]): void {
    this.channels$.next(channels);
  }

  public setSelectedGenreId(genre: string): void {
    localStorage.setItem('selectedFilterId', genre);
    this.selectedGenreId$.next(genre);
    this.channels$.next(this.allChannels);
  }

  public setUniqueGenres(genres: IGenre[]): void {
    this.uniqueGenres$.next(genres);
  }

  public setSelectedSorting(sorting: string): void {
    localStorage.setItem('selectedSorting', sorting);
    this.selectedSorting$.next(sorting);
    this.channels$.next(this.allChannels);
  }

  public showMoreChannels(): void {
    this.channelsLimit += 12;
    this.channels$.next(this.allChannels);
  }

  private filterChannelsByGenre([channels, genreId]): Channel[] {
    if (!genreId) { return channels; }

    return channels.filter((channel: Channel) => {
      return channel.genres.some(genre => genre.genreID === genreId);
    });
  }

  private sliceChannels(channels: Channel[]): Channel[] {
    return channels.slice(0, this.channelsLimit);
  }

  private sortChannels([channels, sorting]): Channel[] {
    if (!sorting) { return channels; }

    return channels.sort((a: Channel, b: Channel) => sorting === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
    );
  }
}
