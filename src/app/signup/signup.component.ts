import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IBook } from '../models/book.model';
import { IUser } from '../models/user.model';
import { BookService } from '../book.service';
import { Router } from '@angular/router';

import { Location } from '@angular/common';
import { AuthenticationService } from '../authentication.service';
import { LocalService } from '../local.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private localStorageService: LocalService
  ) {}

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    repassword: new FormControl('', Validators.required),
    isAdmin: new FormControl(false, Validators.required),
  });

  ngOnInit(): void {}

  resetForm(): void {
    this.form.reset();
  }

  submitUserData(): void {
    if (
      this.form.get('password')?.value !== this.form.get('repassword')?.value
    ) {
      alert('Passwords are not same, please enter same passwords');
    }

    let userData: IUser = {
      firstName: this.form.get('firstName')?.value!,
      lastName: this.form.get('lastName')?.value!,
      password: this.form.get('password')?.value!,
      emailAddress: this.form.get('repassword')?.value!,
      isAdmin: this.form.get('isAdmin')?.value!,
    };

    this.authService.postUserDetails(userData).subscribe(() => {
      this.router.navigateByUrl('/login');
      this.localStorageService.saveData('userData', JSON.stringify(userData));
      // localStorage.setItem('userData', JSON.stringify(userData));
    });
  }
}
