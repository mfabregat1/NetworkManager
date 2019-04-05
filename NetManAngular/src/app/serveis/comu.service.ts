import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ComuService {

  constructor(private http: HttpClient) { }
  private idioma = new BehaviorSubject<string>("ca");

  public getIdioma(): BehaviorSubject<string> {
    return this.idioma;
  }

  public setIdioma(value: string): void {
    this.idioma.next(value);
  }
}
