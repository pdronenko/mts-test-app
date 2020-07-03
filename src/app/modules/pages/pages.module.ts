import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmptyPageComponent } from './components/empty-page/empty-page.component';
import { ChannelsComponent } from './components/channels/channels.component';
import { ElementsModule } from '../elements/elements.module';

@NgModule({
  declarations: [EmptyPageComponent, ChannelsComponent],
  imports: [
    CommonModule,
    ElementsModule
  ]
})
export class PagesModule { }
