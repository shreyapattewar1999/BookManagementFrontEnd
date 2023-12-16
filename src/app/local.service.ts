import { DOCUMENT } from '@angular/common';
import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  localStorageUtility: any;
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.localStorageUtility = this.document.defaultView?.localStorage;
  }
  public saveData(key: string, value: any) {
    if (this.localStorageUtility) {
      this.localStorageUtility.setItem(key, JSON.stringify(value));
    }
  }

  public getData(key: string) {
    if (this.localStorageUtility) {
      return JSON.parse(this.localStorageUtility.getItem(key));
    }
    // if (this.localStorageUtility.has(key)) {
    // }
    return;
  }
  public removeData(key: string) {
    if (this.localStorageUtility) {
      this.localStorageUtility.removeItem(key);
    }
  }

  public clearData() {
    if (this.localStorageUtility) {
      this.localStorageUtility.clear();
    }
  }
}

// "serve:ssr:BookDetails": "node dist/book-details/server/server.mjs"
