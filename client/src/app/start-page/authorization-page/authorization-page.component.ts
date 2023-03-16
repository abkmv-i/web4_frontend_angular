import {Component, OnInit, Output} from '@angular/core';
import {HeaderContentService} from "../../services/header/header-content.service";
import {AuthenticationService} from "../../services/auth/authentication.service";
import {TokenStorageService} from "../../services/storage/token-storage.service";
import {FormBuilder, NgForm} from '@angular/forms';
import {Router} from "@angular/router";
import {MainPageGuard} from "../../services/auth/main-page.guard";

@Component({
  selector: 'app-authorization-page',
  templateUrl: './authorization-page.component.html',
  styleUrls: ['./authorization-page.component.css']
})
export class AuthorizationPageComponent implements OnInit{

  username?: string = ''
  password?: string = ''
  isLogIn = false;
  isLogInFail = false;
  errorMessage = '';
  header = Object;
  constructor(private headerContent: HeaderContentService,
              private authService: AuthenticationService,
              private formBuilder: FormBuilder,
              private router: Router,
              private tokenStorage: TokenStorageService) {}
  ngOnInit(): void {
    this.header = this.headerContent.headers['index'];
    if (this.tokenStorage.getToken()) {
      this.isLogIn = true;
    } else {
      this.router.navigate(['/index']).then(r => {})
    }
  }

  onSubmit(logInForm: NgForm) {
    this.authService.authAttempt(logInForm.form.get("username")?.value, logInForm.form.get("password")?.value)
      .subscribe({
        next: (response) => {
          console.log(response)
          this.tokenStorage.saveToken(String(response.jwt));
          this.tokenStorage.saveUsername(String(response.username));

          this.router.navigate(['/main']).then(r => {})
      }, error: error => {
          this.errorMessage = error.error.message
          this.isLogInFail = true
          this.router.navigate(['/index']).then(r => {})
        }})
  }
}
