import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterComponent } from './components/filter/filter.component';
import { ChannelInfoComponent } from './components/channel-info/channel-info.component';
import { ChannelComponent } from './components/channel/channel.component';

@NgModule({
  declarations: [FilterComponent, ChannelInfoComponent, ChannelComponent],
  imports: [
    CommonModule
  ],
  exports: [FilterComponent, ChannelInfoComponent, ChannelComponent]
})
export class ElementsModule { }
