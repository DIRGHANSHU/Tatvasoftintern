import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    public router: Router,
    public toastr: ToastrService,
    public toast: NgToastService
  ) { }

  loginForm: FormGroup;
  formValid: boolean;

  ngOnInit(): void {
    this.loginUser();
  }

  loginUser() {
    this.loginForm = this.fb.group({
      emailAddress: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  get emailAddress() {
    return this.loginForm.get('emailAddress') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  OnSubmit() {
    this.formValid = true;
    if (this.loginForm.valid) {
      this.login();
      this.formValid = false;
    }
  }

  login() {
    const loginData = {
      emailAddress: this.loginForm.get('emailAddress')?.value,
      password: this.loginForm.get('password')?.value
    };

    this.http.post<any>('https://localhost:7178/api/v1/Auth/login', loginData)
      .subscribe(
        (response) => {
          // Handle successful login
          console.log(response);
          // Save the token, user data, etc.
          // Redirect to the desired page
          this.router.navigate(['/home']);
        },
        (error) => {
          // Handle login error
          console.error(error);
          // Display an error message
        }
      );
  }
}