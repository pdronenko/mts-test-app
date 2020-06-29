import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChannelsComponent } from './components/channels/channels.component';
import { EmptyPageComponent } from './components/empty-page/empty-page.component';

const routes: Routes = [
  { path: 'channels', component: ChannelsComponent },
  { path: 'first', component: EmptyPageComponent },
  { path: 'second', component: EmptyPageComponent },
  { path: '**', redirectTo: 'channels' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
