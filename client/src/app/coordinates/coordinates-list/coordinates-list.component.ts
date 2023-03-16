import {Component} from '@angular/core';
import {AttemptModel} from "../../wrappers/request/attemptModel";

@Component({
  selector: 'app-coordinates-list',
  templateUrl: './coordinates-list.component.html',
  styleUrls: ['./coordinates-list.component.css']
})
export class CoordinatesListComponent {
  coordinates!: AttemptModel[];
  constructor() {}
}
