import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Channel } from '../classes/channel.class';
import { ChannelsService } from '../services/channels.service';
import { IGenre } from '../interfaces/genre.interface';
import { StoreService } from '../services/store.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelsResolver implements Resolve<Observable<null>> {
  constructor(
    private channelsService: ChannelsService,
    private titleService: Title,
    private storeService: StoreService,
    ) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<null> {
    const { pageTitle } = route.data;
    this.titleService.setTitle(pageTitle);

    this.channelsService.getChannels().subscribe((response) => {
      const channels = response.channelDetails.map(channel => new Channel(channel));

      this.storeService.allChannels = channels;
      this.storeService.channelsLimit = 24;
      this.storeService.setChannels(channels);
      this.storeService.setUniqueGenres(this.getUniqueGenres(channels));
    });

    return of(null);
  }

  private getUniqueGenres(channels: Channel[]): IGenre[] {
    return channels.reduce((acc, channel) => {
      const uniqueGenres = channel.genres
        .filter(genre => !acc.some(accGenre => accGenre.genreID === genre.genreID))
        || [];

      return [...acc, ...uniqueGenres];
    }, [] as IGenre[]);
  }
}
