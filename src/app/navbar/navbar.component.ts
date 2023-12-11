import { Component, Inject, OnInit } from '@angular/core';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from '../local.service';
import { DOCUMENT } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isUserAuthenticated: boolean = false;
  displayName: string = '';
  flag: boolean = false;
  isSwaggerMock: boolean = false;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthenticationService,
    private router: Router,
    private localStorageService: LocalService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    const currentUrl = this.location.path();
    if (currentUrl.indexOf('swagger-mock') > -1) {
      this.isSwaggerMock = true;
    }
    this.authService.isLoggedInFlag.subscribe((value) => {
      this.isUserAuthenticated = value;
    });
    this.flag = false;
    this.isUserAuthenticated = this.authService.isUserAuthenticated();
  }

  ngOnInit(): void {
    // const userData =
    //   this.router.getCurrentNavigation()?.extras.state?.['userData'];

    this.getDisplayName();
  }

  getDisplayName(): void {
    const userData = localStorage.getItem('userData');

    if (userData) {
      this.isUserAuthenticated = true;
      this.displayName = JSON.parse(userData).firstName;
    }
    this.flag = true;
  }

  logOut() {
    // localStorage.removeItem('userData');
    this.router.navigateByUrl('/login');
    this.removeUserData();
  }

  isAuthenticated() {
    return this.authService.isUserAuthenticated;
  }

  registerNewUser(): void {
    if (
      window.confirm(
        'You are about to navigate to register new user. You will be logged out. Do you want to proceed ?'
      )
    ) {
      this.removeUserData();
      this.router.navigateByUrl('/register');
    }
  }

  removeUserData(): void {
    this.localStorageService.removeData('userData');
    this.displayName = '';
    this.authService.isLoggedInFlag.next(false);
  }
}
