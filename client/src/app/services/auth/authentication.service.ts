import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SignUpResponse} from "../../wrappers/response/sign-up-response";
import {LoginResponse} from "../../wrappers/response/login-response";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'ResponseType': 'json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  private authURL = 'http://localhost:8080/users/auth';

  private regURL = 'http://localhost:8080/users/reg';

  public authAttempt(username: String, password: String): Observable<LoginResponse> {
    return this.http.post<any>(this.authURL, {username: username, password: password}, httpOptions);
  }

  public registrUser(username: String, password: String): Observable<SignUpResponse> {
    return this.http.post<any>(this.regURL, {username: username, password: password}, httpOptions);
  }



}
