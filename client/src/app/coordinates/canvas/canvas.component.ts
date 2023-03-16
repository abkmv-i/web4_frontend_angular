import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ɵFormGroupRawValue, ɵGetProperty, ɵTypedOrUntyped} from "@angular/forms";
import {AttemptModel} from "../../wrappers/request/attemptModel";
import {CanvasCoordinatesWrap} from "./canvas-coordinates-wrap";

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  @ViewChild('canvasElement', {static: true})
  canvasElement!: ElementRef<HTMLCanvasElement>;
  @Input() _coordinates!: AttemptModel[]

  @Output() sendEventSubmit = new EventEmitter()

  set coordinates(newArray: AttemptModel[]) {
    this._coordinates = newArray;
    this.loadTablePoints()
  }

  private context!: CanvasRenderingContext2D;
  @Input() _rValue!: number

  set rValue(newR: number) {
    this._rValue = newR
    this.clearCanvas();
    this.drawCanvas();
    this.loadTablePoints()
  }

  constructor() {
  }

  ngOnInit() {
    this.context = this.canvasElement.nativeElement.getContext('2d')!;
    this.drawCanvas();
  }

  drawCanvas() {
    if (this._rValue > 0) {
      //Triangle
      this.context.beginPath();
      this.context.fillStyle = "#87CEEB";
      this.context.strokeStyle = "#87CEEB";
      this.context.font = '20px serif';
      this.context.moveTo(150, 150);
      this.context.lineTo(250, 150);
      this.context.lineTo(150, 100);
      this.context.fill();
      //Rect
      this.context.rect(100, 50, 50, 100);
      this.context.fill();
      //Circle
      this.context.beginPath();
      this.context.arc(150, 150, 100, 0, 0.5 * Math.PI);
      this.context.lineTo(150, 150);
      this.context.fill();
      this.context.closePath();
      this.context.stroke();
    }
    if (this._rValue < 0) {
      //Triangle
      this.context.beginPath();
      this.context.fillStyle = "#87CEEB";
      this.context.strokeStyle = "#87CEEB";
      this.context.font = '20px serif';
      this.context.moveTo(150, 150);
      this.context.lineTo(50, 150);
      this.context.lineTo(150, 200);
      this.context.fill();
      //Rect
      this.context.rect(150, 150, 50, 100);
      this.context.fill();
      //Circle
      this.context.beginPath();
      this.context.arc(150, 150, 100, Math.PI, -0.5 * Math.PI);
      this.context.lineTo(150, 150);
      this.context.fill();
      this.context.closePath();
      this.context.stroke();


    }
    //Horizontal line
    this.context.beginPath();
    this.context.strokeStyle = "rgb(0,0,0)";
    this.context.lineWidth = 2;
    this.context.moveTo(0, 150);
    this.context.lineTo(290, 150);
    //Vertical line
    this.context.moveTo(150, 10);
    this.context.lineTo(150, 300);
    //Serifs
    this.context.moveTo(50, 140);
    this.context.lineTo(50, 160);
    this.context.moveTo(100, 140);
    this.context.lineTo(100, 160);
    this.context.moveTo(200, 140);
    this.context.lineTo(200, 160);
    this.context.moveTo(250, 140);
    this.context.lineTo(250, 160);
    this.context.moveTo(140, 50);
    this.context.lineTo(160, 50);
    this.context.moveTo(140, 100);
    this.context.lineTo(160, 100);
    this.context.moveTo(140, 200);
    this.context.lineTo(160, 200);
    this.context.moveTo(140, 250);
    this.context.lineTo(160, 250);
    this.context.stroke();
    //Arrows
    this.context.fillStyle = "#000000";
    this.context.moveTo(150, 0);
    this.context.lineTo(145, 15);
    this.context.lineTo(155, 15);
    this.context.closePath();

    this.context.moveTo(300, 150);
    this.context.lineTo(285, 145);
    this.context.lineTo(285, 155);
    this.context.closePath();
    this.context.fillText('-R', 45, 180);
    this.context.fillText('-R/2', 95, 180);
    this.context.fillText('R/2', 195, 180);
    this.context.fillText('R', 245, 180);
    this.context.fillText('R', 170, 55);
    this.context.fillText('R/2', 170, 105);
    this.context.fillText('-R/2', 170, 205);
    this.context.fillText('-R', 170, 255);
    this.context.fill();
    this.context.stroke();
  }

  clickCanvasEvent(event: MouseEvent) {
    let coordinateX = event.offsetX;
    let coordinateY = event.offsetY;
    let newXValue = ((coordinateX - 150) / 100) * this._rValue;
    let newYValue = ((coordinateY - 150) / -100) * this._rValue;
    this.sendEventSubmit.emit(new CanvasCoordinatesWrap(Number(newXValue.toFixed(2)), Number(newYValue.toFixed(2)), this._rValue, true));
    this.clearCanvas();
    this.drawCanvas();
    this.loadTablePoints();
  }

  clearCanvas() {
    this.context.clearRect(0, 0, 300, 300);
  }

  drawTablePoint(x: number, y: number, r: number, hitResult: boolean) {
    if (r === this._rValue || r === (this._rValue - 0.1)) {
      this.context.fillStyle = !hitResult ? 'red' : 'green';
      console.log(y)
      console.log(-y / r * 100 + (300 / 2))
      this.context.beginPath();
      this.context.rect(x / r * 100 + (300 / 2), -y / r * 100 + (300 / 2), 3, 3);
      this.context.fill();
      this.context.closePath();
    }
  }

  loadTablePoints() {
    this._coordinates.forEach((attempt) => this.drawTablePoint(attempt.x.valueOf(), attempt.y.valueOf(), attempt.r.valueOf(), attempt.result.valueOf()))
  }
}
