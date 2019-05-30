import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { ComuService } from 'src/app/serveis/comu.service';
import { UsuariAmbRolVO } from 'src/app/vo/usuari-vo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  infoUsuari: UsuariAmbRolVO;
  

  private subscription: Subscription = new Subscription();
  
  constructor(public _parent: AppComponent,
              public comuService: ComuService,
              private router: Router) { 
    
  }

  ngOnInit() {
    
    if(this.comuService.getUserLoggedIn() != null){
      this.infoUsuari = this.comuService.getUserLoggedIn();
    }
    else{
      this.infoUsuari = null;
      this.comuService.infoUsuariLoggedIn.subscribe(infoUsuari => this.infoUsuari = infoUsuari)
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  useLanguage(language: string) {
    this._parent.useLanguage(language);
  }
  logout(){
    window.sessionStorage.removeItem('NetManUsuariActual');
    window.sessionStorage.removeItem('NetManRolUsuariActual');
    window.sessionStorage.removeItem('ConnexioRouterIP');
    window.sessionStorage.removeItem('ConnexioRouterPORT');
    window.sessionStorage.removeItem('ConnexioRouterUSUARI');
    window.sessionStorage.removeItem('ConnexioRouterCONTRASSENYA');
    window.sessionStorage.clear();
    window.sessionStorage.setItem('NetManUsuariActual', null);
    window.sessionStorage.setItem('NetManRolUsuariActual', null);
    this.infoUsuari = null;
    this.ngOnDestroy();
    this.router.navigateByUrl("/");
  }
}
