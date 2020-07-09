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
export class ChannelsResolver implements Resolve<Observable<null>> {
  constructor(
    private channelsService: ChannelsService,
    private titleService: Title,
    private storeService: StoreService,
    ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<null> {
    const { pageTitle } = route.data;
    this.titleService.setTitle(pageTitle);

    this.channelsService.getChannels().subscribe((response) => {
      this.storeService.allChannels = response.channelDetails;
      this.storeService.channelsLimit = 24;
      this.storeService.setChannels(response.channelDetails);
      this.storeService.setUniqueGenres(this.getUniqueGenres(response.channelDetails));
    });

    return of(null);
  }

  private getUniqueGenres(channels: IChannel[]): IGenre[] {
    return channels.reduce((acc, channel) => {
      const uniqueGenres = channel.genres && channel.genres
        .filter(genre => !acc.some(accGenre => accGenre.genreID === genre.genreID))
        || [];

      return [...acc, ...uniqueGenres];
    }, [] as IGenre[]);
  }
}
