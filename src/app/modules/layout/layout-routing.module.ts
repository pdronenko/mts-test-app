import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChannelsComponent } from '../pages/components/channels/channels.component';
import { ChannelsResolver } from '../../core/resolvers/channels.resolver';
import { EmptyPageComponent } from '../pages/components/empty-page/empty-page.component';
import { ERoutes } from '../../core/enums/routes.enum';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  { path: '', redirectTo: ERoutes.CHANNELS, pathMatch: 'full' },
  {
    path: ERoutes.MAIN_PAGE,
    component: LayoutComponent,
    children: [
      {
        path: ERoutes.CHANNELS,
        component: ChannelsComponent,
        resolve: { channels: ChannelsResolver },
        data: { pageTitle: 'Телеканалы' }
      },
      { path: ERoutes.FIRST, component: EmptyPageComponent },
      { path: ERoutes.SECOND, component: EmptyPageComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
