import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { Channel } from '../../../../core/classes/channel.class';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelComponent implements OnInit {
  @Input() channel: Channel;

  constructor() { }

  ngOnInit(): void {
  }

}
