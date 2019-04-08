import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { ComuService } from 'src/app/serveis/comu.service';
import { UsuariVO } from 'src/app/vo/usuari-vo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  serverUrl: string = 'http://localhost:8080';

  private subscription: Subscription = new Subscription();

  constructor(private translate: TranslateService,
              private comuService: ComuService,
              private http: HttpClient) {

    this.subscription.add(this.comuService.getIdioma().subscribe(
      idioma => {
        this.translate.use(idioma);
      }
    ));
  }

  ngOnInit() {
    
  }

  iniciaSessio(correu, contrassenya) {
    if(correu!=null && contrassenya!=null){
      const body = {
        l_correu: correu,
        l_contrassenya: contrassenya
      };
  
      return this.http.post(this.serverUrl + '/netman/login', body);
    }else{
      console.log("Error, falta un dels dos camps");
    }
  }
}
