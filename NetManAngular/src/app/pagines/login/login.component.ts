import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { ComuService } from 'src/app/serveis/comu.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { UsuariVO } from 'src/app/vo/usuari-vo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin;
  correu="";
  contrassenya="";
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
    this.formLogin = new FormGroup({
      correu: new FormControl("", Validators.compose([
        Validators.required,
        Validators.email
      ])),
      contrassenya: new FormControl("", Validators.compose([
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.required
      ]))
    })
  }

  iniciaSessio(camps) {
    this.correu = camps.correu;
    this.contrassenya = camps.contrassenya;
    console.log(this.correu);
    console.log(this.contrassenya);
    if(this.correu!=null && this.contrassenya!=null){
      const body = {
        l_correu: this.correu,
        l_contrassenya: this.contrassenya
      };

      return this.http.post(this.serverUrl + '/netman/login', body);
    }else{
      console.log("Error, falta un dels dos camps");
    }
  }
}
