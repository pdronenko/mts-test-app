import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { StoreService } from '../services/store.service';
import { ChannelsService } from '../services/channels.service';
import { IGenre } from '../interfaces/genre.interface';
import { IChannel } from '../interfaces/channel.interface';

@Injectable({
  providedIn: 'root'
})
export class ChannelsResolver implements Resolve<Observable<number>> {
  constructor(
    private channelsService: ChannelsService,
    private titleService: Title,
    private storeService: StoreService,
    ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<number> {
    const { pageTitle } = route.data;
    this.titleService.setTitle(pageTitle);

    this.channelsService.getChannels().subscribe((response) => {
      this.storeService.setChannels(response);
      this.storeService.setUniqueGenres(this.getUniqueGenres(response.channelDetails));
    });

    return of(null);
  }

  private getUniqueGenres(channelDetails: IChannel[]): IGenre[] {
    return channelDetails.reduce((acc, channel) => {
      const uniqueGenres = channel.genres && channel.genres
        .filter(genre => !acc.some(accGenre => accGenre.genreID === genre.genreID))
        || [];

      return [...acc, ...uniqueGenres];
    }, [] as IGenre[]);
  }
}
