import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AttemptModel} from "../../wrappers/request/attemptModel";
import {TokenStorageService} from "../../services/storage/token-storage.service";
import {FormControl, NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {SendDataService} from "../../services/auth/send-data.service";
import {CoordinatesListComponent} from "../coordinates-list/coordinates-list.component";
import {CanvasComponent} from "../canvas/canvas.component";
import {IDropdownSettings} from "ng-multiselect-dropdown";

@Component({
  selector: 'app-coordinates-form',
  templateUrl: './coordinates-form.component.html',
  styleUrls: ['./coordinates-form.component.css']
})
export class CoordinatesFormComponent implements OnInit {
  control = new FormControl()
  x: string[] = [];
  xAvailableValues: number[] = [];
  y: String = '0';
  r: String = '0';

  @Output() sendEventSubmit = new EventEmitter()
  @Output() sendEventNewR = new EventEmitter()
  username!: string;

  ngOnInit(): void {
    this.xAvailableValues = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2]
  }

  constructor(private canvas: CanvasComponent, private coordinateList: CoordinatesListComponent, private sendDataService: SendDataService, private token: TokenStorageService, private router: Router) {
    this.username = <string>this.token.getUsername();
  }

  onSubmit(coordinateForm: NgForm) {
    this.sendEventSubmit.emit(coordinateForm);
  }

  logOut() {
    this.token.signOut();
    this.router.navigate(['/index']).then(r => {
    })
  }

  knobClickAndChangeValue(event: MouseEvent, classElement: string, coordinateForm: NgForm) {
    this.sendEventNewR.emit(coordinateForm.form.get('r')?.value)
  }
}


