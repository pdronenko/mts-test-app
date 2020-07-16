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
  activeChannel: Channel;
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

    const remainder1 = Math.abs(channelsCount) % 100;
    const remainder2 = remainder1 % 10;

    const remainderChecks = [
      { check: remainder1 > 10 && remainder1 < 20, word: words[2] },
      { check: remainder2 > 1 && remainder2 < 5, word: words[1] },
      { check: remainder2 === 1, word: words[0] },
      { check: true, word: words[2] },
    ];

    return remainderChecks.find(({ check }) => check).word;
  }
}
