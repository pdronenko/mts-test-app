import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ChannelComponent } from './components/channel/channel.component';
import { ChannelInfoComponent } from './components/channel-info/channel-info.component';
import { ChannelsComponent } from './components/channels/channels.component';
import { EmptyPageComponent } from './components/empty-page/empty-page.component';

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
