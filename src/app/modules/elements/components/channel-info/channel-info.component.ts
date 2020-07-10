import { Component, OnInit, Input } from '@angular/core';

import { Channel } from '../../../../core/classes/channel.class';

@Component({
  selector: 'app-channel-info',
  templateUrl: './channel-info.component.html',
  styleUrls: ['./channel-info.component.scss']
})
export class ChannelInfoComponent implements OnInit {
  @Input() channel: Channel;

  constructor() { }

  ngOnInit(): void {
  }

}
