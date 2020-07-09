import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ERoutes } from './core/enums/routes.enum';

const routes: Routes = [
  { path: ERoutes.MAIN_PAGE, loadChildren: () => import('./modules/layout/layout.module').then(m => m.LayoutModule) },
  { path: '**', redirectTo: ERoutes.MAIN_PAGE }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
