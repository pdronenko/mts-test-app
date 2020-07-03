import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IChannelsResponse } from '../interfaces/channels-response.interface';
import { IGenre } from '../interfaces/genre.interface';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private channels$: BehaviorSubject<IChannelsResponse> = new BehaviorSubject(null);
  private genresFilter$: BehaviorSubject<string[]> = new BehaviorSubject(
    JSON.parse(localStorage.getItem('genresFilter'))
    || ['reset']
  );
  private sorting$: BehaviorSubject<string> = new BehaviorSubject(
    localStorage.getItem('sorting')
    || 'reset'
  );
  private uniqueGenres$: BehaviorSubject<IGenre[]> = new BehaviorSubject(null);

  constructor() { }

  getChannels(): Observable<IChannelsResponse> {
    return this.channels$.asObservable();
  }

  getGenresFilter(): Observable<string[]> {
    return this.genresFilter$.asObservable();
  }

  getUniqueGenres(): Observable<IGenre[]> {
    return this.uniqueGenres$.asObservable();
  }

  getSorting(): Observable<string> {
    return this.sorting$.asObservable();
  }

  setChannels(channels: IChannelsResponse): void {
    this.channels$.next(channels);
  }

  setGenresFilter(genres: string[]): void {
    localStorage.setItem('genresFilter', JSON.stringify(genres));
    this.genresFilter$.next(genres);
  }

  setUniqueGenres(genres: IGenre[]): void {
    this.uniqueGenres$.next(genres);
  }

  setSorting(sorting: string): void {
    localStorage.setItem('sorting', sorting);
    this.sorting$.next(sorting);
  }
}
