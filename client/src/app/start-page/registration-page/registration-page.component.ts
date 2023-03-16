import {Component, OnInit} from '@angular/core';
import {HeaderContentService} from "../../services/header/header-content.service";
import {NgForm} from '@angular/forms';
import {AuthenticationService} from "../../services/auth/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit{
  username!: String;
  password!: String;
  repeatPassword!: String;
  isReg = false;
  isPasswordNotMatch = false;
  isRegError = false;
  header = Object;
  errorMessage = '';
  constructor(private headerContent: HeaderContentService, private authService: AuthenticationService, private router: Router,) {

  }
  ngOnInit(): void {
    this.header = this.headerContent.headers['reg'];
  }

  onSubmit(regForm: NgForm) {
    if (regForm.form.get("repeatPassword")?.value == regForm.form.get("password")?.value) {
      this.authService.registrUser(regForm.form.get("username")?.value, regForm.form.get("password")?.value)
        .subscribe({next: (message) => {
        this.isReg = true
        this.router.navigate(['/index']).then(r => {})
      },
      error: (error) => {
        console.log(error.error.message)
        this.errorMessage = error.error.message;
        this.isRegError = true;
      }
    })
    } else {
      this.isPasswordNotMatch = true;
    }
  }
}
