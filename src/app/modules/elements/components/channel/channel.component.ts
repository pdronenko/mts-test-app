import { Component, OnInit, Input } from '@angular/core';

import { Channel } from '../../../../core/classes/channel.class';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {
  @Input() channel: Channel;

  showChannelInfo = false;

  constructor() { }

  ngOnInit(): void {
  }

}
