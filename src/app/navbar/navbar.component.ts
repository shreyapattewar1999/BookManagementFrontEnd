import {
  AfterViewInit,
  Component,
  Inject,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { LocalService } from '../local.service';
import { DOCUMENT } from '@angular/common';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  isUserAuthenticated: boolean = false;
  displayName: string = '';
  flag: boolean = false;
  userData: any;
  isShowMenu: boolean = false;
  currentPath: string = '';
  private showMenuSubscription: Subscription;
  private loginFlagSubscription: Subscription;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthenticationService,
    private router: Router,
    private localStorageService: LocalService,
    private location: Location
  ) {
    this.currentPath = this.location.path();
    this.showMenuSubscription = this.authService.showMenu$.subscribe(
      (newVal) => {
        this.isShowMenu = newVal;
      }
    );
    this.loginFlagSubscription = this.authService.isLoggedIn$.subscribe(
      (newVal) => {
        this.isUserAuthenticated = newVal;
      }
    );
    // if (this.currentPath.indexOf('swagger-mock') > -1) {
    //   this.isShowMenu = true;
    // }
    // this.authService.isLoggedInFlag.subscribe((value) => {
    //   this.isUserAuthenticated = value;
    // });
    this.flag = false;
  }

  ngOnInit(): void {
    this.getDisplayName();
  }

  getDisplayName(): void {
    // this.userData = localStorage.getItem('userData');
    this.userData = this.localStorageService.getData('userData');
    if (this.userData) {
      this.isUserAuthenticated = true;
      this.displayName = this.userData.firstName;
      this.authService.updateShowMenuFlag(true);
    }
    this.flag = true;
  }

  logOut() {
    // localStorage.removeItem('userData');
    this.router.navigateByUrl('/login');
    this.removeUserData();
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
    this.authService.updateIsLoggedInFlag(false);
  }

  navigateToAuthors(): void {}

  ngOnDestroy(): void {
    this.showMenuSubscription.unsubscribe();
    this.loginFlagSubscription.unsubscribe();
  }
}
