import { DOCUMENT } from '@angular/common';
import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  constructor(@Inject(DOCUMENT) private document: Document) {}
  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getData(key: string) {
    return localStorage.getItem(key);
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
}

// "serve:ssr:BookDetails": "node dist/book-details/server/server.mjs"
