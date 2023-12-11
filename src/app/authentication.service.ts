import { Injectable, OnInit } from '@angular/core';
import { IUser } from './models/user.model';
import { Observable, Subject } from 'rxjs';
import { BASE_URL, USER_API, VERIFY_USER } from './constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isLoggedIn: boolean = false;
  isLoggedInFlag: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.isLoggedInFlag.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  isUserAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  setUserLogin(value: boolean): void {
    this.isLoggedIn = value;
  }

  postUserDetails(userData: IUser): Observable<any> {
    return this.http.post<any>(BASE_URL + USER_API, userData);
  }

  verifyUser(userData: any): Observable<any> {
    return this.http.post<any>(BASE_URL + USER_API + VERIFY_USER, userData);
  }
}
