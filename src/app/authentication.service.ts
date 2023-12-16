import { Injectable, Inject, OnInit } from '@angular/core';
import { IUser } from './models/user.model';
import { Observable, Subject } from 'rxjs';
import { BASE_URL, USER_API, VERIFY_USER } from './constants';
import { HttpClient } from '@angular/common/http';
import { LocalService } from './local.service';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isLoggedInFlag: Subject<boolean> = new Subject<boolean>();
  isLoggedIn$ = this.isLoggedInFlag.asObservable();
  showMenuSubject: Subject<boolean> = new Subject<boolean>();
  showMenu$ = this.showMenuSubject.asObservable();

  constructor(
    private http: HttpClient,
    private localStorageService: LocalService
  ) {
    const userData = this.localStorageService?.getData('userData');
    if (userData) {
      this.isLoggedInFlag.next(true);
    }
  }

  updateShowMenuFlag(newVal: boolean): void {
    this.showMenuSubject.next(newVal);
  }

  updateIsLoggedInFlag(newVal: boolean): void {
    this.isLoggedInFlag.next(newVal);
  }

  postUserDetails(userData: IUser): Observable<any> {
    return this.http.post<any>(BASE_URL + USER_API, userData);
  }

  verifyUser(userData: any): Observable<any> {
    return this.http.post<any>(BASE_URL + USER_API + VERIFY_USER, userData);
  }
}
