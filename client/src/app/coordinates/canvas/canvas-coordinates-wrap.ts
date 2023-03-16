export class CanvasCoordinatesWrap {

  x!: number

  y!: number

  r!: number

  isCanvas!: boolean

  constructor(x: number, y: number, r: number, isCanvas: boolean) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.isCanvas = isCanvas;
  }

}
