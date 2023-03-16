import {AfterViewInit, Component, ElementRef, HostListener, OnInit} from '@angular/core';

class User {
  name: string;
  password: string;

  constructor(name: string, password: string) {
    this.name = name;
    this.password = password;
  }

}

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: 'app.component.html'
})

export class AppComponent {
  title = 'client';
  name = '';

}

