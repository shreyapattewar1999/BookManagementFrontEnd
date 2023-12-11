import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { LocalService } from '../local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    emailAddress: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private localStorageService: LocalService
  ) {}

  ngOnInit(): void {
    this.localStorageService.removeData('userData');
  }

  login() {
    const userData = {
      emailAddress: this.form.get('emailAddress')?.value!,
      password: this.form.get('password')?.value!,
    };
    // this.authService.verifyUser(userData).subscribe({
    //   next(result) {
    //     if (result) {
    //       localStorage.setItem('userData', JSON.stringify(result));
    //       this.authService.setUserLogin(true);
    //     }
    //   },
    //   error(err) {},
    // });
    this.authService.verifyUser(userData).subscribe(
      (result: any) => {
        if (result) {
          localStorage.setItem('userData', JSON.stringify(result.data));
          this.authService.setUserLogin(true);
          this.router.navigateByUrl('/');
          // this.router.navigate(['/', { state: { userData: result.data } }]);
          this.authService.isLoggedInFlag.next(true);
        }
      },
      (error) => {
        alert(error?.error?.message);
        this.clearForm();
      }
    );
  }

  clearForm() {
    this.form.reset();
  }
}
