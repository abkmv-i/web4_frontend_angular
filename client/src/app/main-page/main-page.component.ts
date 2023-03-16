import {Component, OnInit, ViewChild} from '@angular/core';
import {HeaderContentService} from "../services/header/header-content.service";
import {SendDataService} from "../services/auth/send-data.service";
import {AttemptModel} from "../wrappers/request/attemptModel";
import {CoordinatesListComponent} from "../coordinates/coordinates-list/coordinates-list.component";
import {NgForm} from "@angular/forms";
import {CanvasComponent} from "../coordinates/canvas/canvas.component";
import {CanvasCoordinatesWrap} from "../coordinates/canvas/canvas-coordinates-wrap";
import {MainPageGuard} from "../services/auth/main-page.guard";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {
  @ViewChild(CoordinatesListComponent)
  viewList!: CoordinatesListComponent
  @ViewChild(CanvasComponent)
  viewCanvas!: CanvasComponent
  coordinatesArray!: AttemptModel[]
  header = Object;

  constructor(private guard: MainPageGuard, private router: Router, private headerContent: HeaderContentService, private sendDataService: SendDataService) {
  }

  ngOnInit(): void {
    this.header = this.headerContent.headers['main'];

    setInterval(() => {

      this.sendDataService.getAttempts().subscribe({
        next: (data) => {
          console.log(data);
          this.viewList.coordinates = data.coordinates;
          this.viewCanvas.coordinates = data.coordinates;
        }, error: error => {
          console.log(error)
        }
      });
    }, 500);
  }

  catchEventSubmit($event: NgForm) {
    if ($event.form.get('x')) {
      $event.form.get('x')?.value.forEach((coordinate: number) => {
        this.sendDataService.sendAttempt(Number(coordinate)
          , Number($event.form.get('y')?.value)
          , Number($event.form.get('r')?.value), false).subscribe({
          next: (response) => {
            this.viewList.coordinates = response.coordinates;
            this.viewCanvas.coordinates = response.coordinates;
          }
        });
      })
    }
  }

  catchEventCanvasSubmit($event: CanvasCoordinatesWrap) {
    this.sendDataService.sendAttempt($event.x, $event.y, $event.r, true).subscribe({
      next: (response) => {
        this.viewList.coordinates = response.coordinates;
        this.viewCanvas.coordinates = response.coordinates;
      }
    });
  }

  changeRValue($event: String) {
    this.viewCanvas.rValue = Number($event)
  }
}
