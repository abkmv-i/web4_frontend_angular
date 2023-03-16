import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataResponse} from "../../wrappers/response/data-response";
import {AttemptModel} from "../../wrappers/request/attemptModel";

let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'ResponseType': 'json'
  })};

@Injectable({
  providedIn: 'root'
})
export class SendDataService {

  constructor(private http: HttpClient) {
  }

  private attemptURL = 'http://localhost:8080/attempt/add';

  private getAttemptsURL = 'http://localhost:8080/attempt/getAll';

  public sendAttempt(x: Number, y: Number, r: Number, isCanvas: Boolean): Observable<DataResponse> {
    return this.http.post<any>(this.attemptURL, {x: x, y: y, r: r, isCanvasRequest: isCanvas}, httpOptions);
  }

  public getAttempts(): Observable<DataResponse> {
    return this.http.post<any>(this.getAttemptsURL, {}, httpOptions);
  }

}
