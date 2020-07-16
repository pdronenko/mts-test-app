import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { Channel } from '../../../../core/classes/channel.class';

@Component({
  selector: 'app-channel-info',
  templateUrl: './channel-info.component.html',
  styleUrls: ['./channel-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelInfoComponent implements OnInit {
  @Input() channel: Channel;

  constructor() { }

  ngOnInit(): void {
  }

}
