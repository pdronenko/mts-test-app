import { Component, OnInit, Input, ChangeDetectionStrategy, ElementRef, AfterViewChecked } from '@angular/core';

import { Channel } from '../../../../core/classes/channel.class';
import { IMousePosition } from '../../../../core/interfaces/mouse-position.interface';

@Component({
  selector: 'app-channel-info',
  templateUrl: './channel-info.component.html',
  styleUrls: ['./channel-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelInfoComponent implements OnInit, AfterViewChecked {
  @Input() public channel: Channel;
  @Input() public position: IMousePosition;

  constructor(private element: ElementRef) { }

  public ngOnInit(): void {
  }

  public ngAfterViewChecked(): void {
    console.log(123, this.element.nativeElement.getBo)

  }
}
