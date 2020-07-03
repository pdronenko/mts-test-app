import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { PagesModule } from '../pages/pages.module';
import { ElementsModule } from '../elements/elements.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    ElementsModule,
    PagesModule,
    LayoutRoutingModule,
  ]
})
export class LayoutModule { }
