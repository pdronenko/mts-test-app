import { Component, OnInit, Input } from '@angular/core';
import { IChannel } from '../../core/interfaces/channel.interface';

@Component({
  selector: 'app-channel-info',
  templateUrl: './channel-info.component.html',
  styleUrls: ['./channel-info.component.scss']
})
export class ChannelInfoComponent implements OnInit {
  @Input() channel: IChannel;

  constructor() { }

  ngOnInit(): void {
  }

}
