import { Component, OnInit } from '@angular/core';
import { ERoutes } from '../../core/enums/routes.enum';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public menuItems = [
    { label: 'First', link: 'first'},
    { label: 'Second', link: 'second'},
    { label: 'Телеканалы', link: 'channels'},
  ];

  constructor() { }

  public ngOnInit(): void {
  }

  public shouldShowFilters(): boolean {
    return location.pathname.includes(ERoutes.CHANNELS);
  }
}
