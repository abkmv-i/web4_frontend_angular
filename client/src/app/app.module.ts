import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderContentService } from "./services/header/header-content.service";
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule, RouterOutlet, Routes } from "@angular/router";
import { CoordinatesFormComponent } from './coordinates/coordinates-form/coordinates-form.component';
import { CoordinatesListComponent } from './coordinates/coordinates-list/coordinates-list.component';
import { CanvasComponent } from './coordinates/canvas/canvas.component';
import { RegistrationPageComponent } from './start-page/registration-page/registration-page.component';
import { AuthorizationPageComponent } from './start-page/authorization-page/authorization-page.component';
import {AuthInterceptor} from "./services/auth-interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthenticationService} from "./services/auth/authentication.service";
import {SendDataService} from "./services/auth/send-data.service";
import {TokenStorageService} from "./services/storage/token-storage.service";
import {MainPageGuard} from "./services/auth/main-page.guard";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatSliderModule } from '@angular/material/slider';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { KnobModule } from 'primeng/knob';
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {CheckboxModule} from "primeng/checkbox";


const appRoutes: Routes =[
  { path: '', component: AuthorizationPageComponent },
  { path: 'index', component: AuthorizationPageComponent },
  { path: 'main', component: MainPageComponent, canActivate: [MainPageGuard] },
  { path: 'reg', component: RegistrationPageComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CoordinatesFormComponent,
    CoordinatesListComponent,
    CanvasComponent,
    RegistrationPageComponent,
    AuthorizationPageComponent,
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), FormsModule,
    RouterOutlet, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule,
    MatSliderModule, NgMultiSelectDropDownModule, KnobModule, MatSelectModule, MatCheckboxModule, CheckboxModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, HeaderContentService, AuthenticationService, SendDataService, TokenStorageService, CoordinatesListComponent, CanvasComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
