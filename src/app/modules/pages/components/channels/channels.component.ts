import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IChannel } from 'src/app/core/interfaces/channel.interface';
import { StoreService } from 'src/app/core/services/store.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
  channels$: Observable<IChannel[]>;
  total: number;

  identify(index: number, channel: IChannel): string {
    return channel.name;
  }

  constructor(
    private storeService: StoreService,
  ) { }

  ngOnInit(): void {
    this.channels$ = this.storeService.getChannels()
      .pipe(tap(() => this.total = this.storeService.totalChannels));
  }

  showMoreChannels(): void {
    this.storeService.showMoreChannels();
  }

  shouldShowLoadMoreButton(total: number): boolean {
      return this.storeService.channelsLimit <= total;
  }
}
