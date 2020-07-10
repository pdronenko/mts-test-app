import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Channel } from '../../../../core/classes/channel.class';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
  channels$: Observable<Channel[]>;

  constructor(
    private storeService: StoreService,
  ) { }

  ngOnInit(): void {
    this.channels$ = this.storeService.getChannels();
  }

  identify(index: number, channel: Channel): string {
    return channel.name;
  }

  showMoreChannels(): void {
    this.storeService.showMoreChannels();
  }

  shouldShowLoadMoreButton(channelsCount: number): boolean {
    return this.storeService.filteredChannelsCount > channelsCount;
  }

  generateChannelString(channelsCount: number): string {
    const words = ['канал', 'канала', 'каналов'];

    const remainder = Math.abs(channelsCount) % 100;
    const remainder1 = remainder % 10;

    if (remainder > 10 && remainder < 20) {
        return words[2];
    }

    if (remainder1 > 1 && remainder1 < 5) {
        return words[1];
    }

    if (remainder1 === 1) {
        return words[0];
    }

    return words[2];
  }
}
