import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from '../service/authentication-service.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  loginForm: FormGroup;


  constructor(private fb: FormBuilder, private authService: AuthenticationServiceService, private router: Router) { }

  errorMessage;
  error: Boolean = false;


  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]

    })
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(
      res => {
        console.log(res);
        this.error = false;
        this.authService.setToken(res['accessToken']);

        this.authService.setUserName(res['username']);
        this.router.navigateByUrl('dashboard');
      },
      err => {
        this.error = true;
        console.log(err);
        this.errorMessage = "Invalid Credentials";
      }
    );

  }

  getEtat() {
    if (localStorage['username'] === undefined) {
      return 'false'
    } else
      return 'true'
  }

}
