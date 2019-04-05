import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';

export class MTranslateHttpLoader implements TranslateLoader {

  constructor(private http: HttpClient) {}

  /**
   * Gets the translations from the server
   * @param lang
   * @returns { any }
   */
  getTranslation(lang: string): Observable<any> {
    return this.http.get(`./assets/i18n/${lang}.json`);
  }
}
