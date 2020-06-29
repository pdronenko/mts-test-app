import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChannelsComponent } from './channels/channels.component';
import { ChannelComponent } from './channel/channel.component';
import { EmptyPageComponent } from './empty-page/empty-page.component';
import { ChannelInfoComponent } from './channel-info/channel-info.component';

@NgModule({
  declarations: [
    AppComponent,
    ChannelsComponent,
    ChannelComponent,
    EmptyPageComponent,
    ChannelInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
