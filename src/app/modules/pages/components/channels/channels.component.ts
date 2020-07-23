import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

import { Channel } from '../../../../core/classes/channel.class';
import { StoreService } from 'src/app/core/services/store.service';
import { IMousePosition } from '../../../../core/interfaces/mouse-position.interface';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit, AfterViewChecked {
  @ViewChild('channelInfo') public channelInfo: ElementRef;

  public activeChannel: Channel;
  public channels$: Observable<Channel[]>;
  public mousePosition: IMousePosition;

  constructor(
    private storeService: StoreService,
  ) { }

  public ngOnInit(): void {
    this.channels$ = this.storeService.getChannels();
  }

  public ngAfterViewChecked(): void {
    console.log('checked', this.channelInfo)
  }

  public identify(index: number, channel: Channel): string {
    return channel.name;
  }

  public generateChannelString(channelsCount: number): string {
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

  public showMoreChannels(): void {
    this.storeService.showMoreChannels();
  }

  public shouldShowLoadMoreButton(channelsCount: number): boolean {
    return this.storeService.filteredChannelsCount > channelsCount;
  }

  public toggleChannelInfo(event: MouseEvent, channel: Channel): void {
    this.mousePosition = { x: event.clientX, y: event.clientY };
    this.activeChannel = this.activeChannel && this.activeChannel.name === channel.name ? null : channel;
  }
}
