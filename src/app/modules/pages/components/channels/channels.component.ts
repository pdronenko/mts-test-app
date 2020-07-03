import { Component, OnInit, OnDestroy } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Subscription, combineLatest } from 'rxjs';

import { IChannel } from 'src/app/core/interfaces/channel.interface';
import { IChannelsResponse } from 'src/app/core/interfaces/channels-response.interface';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit, OnDestroy {
  channelDetails: IChannel[];
  channelsLimit = 24;
  total: number;

  private channelsResponse: IChannelsResponse;
  private genreFilterId: string;
  private sorting = 'reset';
  private sub = new Subscription();
  private unfilteredChannels: IChannel[];

  identify(index: number, channel: IChannel): string {
    return channel.name;
  }

  showMoreChannels(): void {
    this.channelsLimit += 12;
    this.sliceChannels();
    this.filterChannelsByGenre(this.genreFilterId);
    this.sortChannels(this.sorting);
  }

  constructor(
    private storeService: StoreService,
  ) { }

  ngOnInit(): void {
    this.sub.add(
      this.storeService.getChannels()
      .pipe(filter(channels => !!channels))
      .subscribe((channelsResponse) => {
        this.channelsResponse = channelsResponse;
        this.total = +channelsResponse.total;
        this.sliceChannels();
        this.filterChannelsByGenre(this.genreFilterId);
        this.sortChannels(this.sorting);
      })
    ).add(
      combineLatest(
        this.storeService.getSorting(),
        this.storeService.getGenresFilter()
      ).subscribe(([sorting, genreId]) => {
        this.sorting = sorting;
        this.genreFilterId = genreId;
        this.filterChannelsByGenre(genreId);
        this.sortChannels(sorting);
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private sliceChannels(): void {
    this.channelDetails = this.channelsResponse.channelDetails.slice(0, this.channelsLimit);
    this.unfilteredChannels = this.channelDetails;
  }

  private sortChannels(sorting: string): void {
    if (!this.channelDetails) { return; }
    if (sorting === 'reset') {
      this.sliceChannels();

      if (this.genreFilterId) {
        this.filterChannelsByGenre(this.genreFilterId);
      }
      return;
    }

    this.channelDetails = this.channelDetails.sort((a, b) => sorting === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
    );
  }

  private filterChannelsByGenre(genreId: string): void {
    if (!this.channelDetails) { return; }
    if (genreId === 'reset') {
      this.sliceChannels();
      return;
    }

    this.channelDetails = this.unfilteredChannels.filter((channel) => {
      return channel.genres && channel.genres.some(genre => genre.genreID === genreId);
    });
  }
}
