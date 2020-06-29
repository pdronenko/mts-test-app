import { Component, OnInit, Input } from '@angular/core';
import { IChannel } from '../core/interfaces/channel.interface';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {
  @Input() channel: IChannel;

  showChannelInfo = false;

  constructor() { }

  ngOnInit(): void {
  }

}
