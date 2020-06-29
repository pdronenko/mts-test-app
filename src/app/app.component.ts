import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  menuItems = [
    { label: 'First', link: 'first'},
    { label: 'Second', link: 'second'},
    { label: 'Телеканалы', link: 'channels'},
  ];
}
