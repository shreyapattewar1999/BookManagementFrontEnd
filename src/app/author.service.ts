import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTHOR_API, BASE_URL } from './constants';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor(private http: HttpClient) {}

  getAuthors(): Observable<any[]> {
    return this.http.get<any[]>(BASE_URL + AUTHOR_API);
  }
}
