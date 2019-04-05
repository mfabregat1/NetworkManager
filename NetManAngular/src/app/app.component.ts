import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  idioma: string = "ca";
  private subscription: Subscription = new Subscription();

  constructor(private translate: TranslateService) {
    translate.setDefaultLang(this.idioma);
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }
}
