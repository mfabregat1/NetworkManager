import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { ComuService } from 'src/app/serveis/comu.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/serveis/login.service';
import { UsuariAmbRolVO } from 'src/app/vo/usuari-vo';
import { AppComponent } from 'src/app/app.component';
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  correu="";
  contrassenya="";
  infoUsuari: UsuariAmbRolVO;
  mostrarAlertErrorUsuariInactiu: boolean = false;
  mostrarAlertErrorUsuariIncorrecte: boolean = false;
  esLogat: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(public _parent: AppComponent,
              private translate: TranslateService,
              private comuService: ComuService,
              private loginServei: LoginService,
              private bf: FormBuilder,
              private router: Router) {

    this.subscription.add(this.comuService.getIdioma().subscribe(
      idioma => {
        this.translate.use(idioma);
      }
    ));
    this.crearFormLogin();
    
  }

  ngOnInit() {
    
    this.esLogat = this.comuService.estaLogat();
    if (this.esLogat==true){
      this.router.navigateByUrl("router");
    } else {
      this.infoUsuari = this.comuService.getUserLoggedIn();
    }
  }

  crearFormLogin(){
    this.formLogin = this.bf.group({
      correu: ["", Validators.compose([
        Validators.required,
        Validators.email
      ])],
      contrassenya: ["", Validators.compose([
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.required
      ])]
    })
  }

  iniciaSessio(camps) {
    this.correu = camps.correu;
    this.contrassenya = camps.contrassenya;
    if(this.correu!=null && this.contrassenya!=null){
      this.loginServei.iniciaSessio(this.correu, this.contrassenya).subscribe(
        data => {
          if(!data){
            console.log("USUARI INCORRECTE");
            this.mostrarAlertErrorUsuariIncorrecte=true;
          } else if(data!=null){
            console.log("USUARI CORRECTE");
            console.log("ARRAY USUARI");
            this.infoUsuari = data;
            if(this.infoUsuari.actiu==true){
              //this.comuService.setInfoUsuari(this.infoUsuari);
              this.comuService.setUserLoggedIn(this.infoUsuari);
              this.comuService.quinRolTe(this.infoUsuari.rol);
              this.infoUsuari = null;
              this.router.navigateByUrl("router");
            }
            else{
              this.mostrarAlertErrorUsuariInactiu=true;
            }
          } else{
            console.log("USUARI INCORRECTE");
            this.mostrarAlertErrorUsuariIncorrecte=true;
          }          
        }, error => {
          console.log(error);
          console.log("USUARI INCORRECTE");
          this.mostrarAlertErrorUsuariIncorrecte=true;
        }
      );
    }else{
      console.log("Error, falta un dels dos camps");
    }
  }
}
