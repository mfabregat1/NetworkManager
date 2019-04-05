import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  
  constructor(public _parent: AppComponent) { 
  }

  ngOnInit() {
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  useLanguage(language: string) {
    this._parent.useLanguage(language);
  }
 
}
