import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { IChannelsResponse } from '../core/interfaces/channels-response.interface';
import { ChannelsService } from '../core/services/channels.service';
import { IChannel } from '../core/interfaces/channel.interface';

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
  private sub = new Subscription();

  identify(index: number, channel: IChannel): string {
    return channel.name;
  }

  showMoreChannels(): void {
    this.channelsLimit += 12;
    this.sliceChannels();
  }

  constructor(private channelsService: ChannelsService) { }

  ngOnInit(): void {
    this.sub.add(
      this.channelsService.getChannels().subscribe((channelsResponse) => {
        this.channelsResponse = channelsResponse;
        this.total = +channelsResponse.total;
        this.sliceChannels();
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private sliceChannels(): void {
    this.channelDetails = this.channelsResponse.channelDetails.slice(0, this.channelsLimit);
  }
}
