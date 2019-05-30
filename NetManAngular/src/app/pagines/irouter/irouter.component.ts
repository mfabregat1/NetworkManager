import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { TranslateService } from '@ngx-translate/core';
import { ComuService } from 'src/app/serveis/comu.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { UsuariAmbRolVO } from 'src/app/vo/usuari-vo';
import { ResultatVO } from 'src/app/vo/resultat-vo';

@Component({
  selector: 'app-irouter',
  templateUrl: './irouter.component.html',
  styleUrls: ['./irouter.component.css']
})
export class IrouterComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  infoUsuari: UsuariAmbRolVO;
  esLogat: boolean=false;
  esAdmin: boolean=false;
  resultatConnexioRouter:string;
  mostrarErrorConnexio:boolean=false;

  formConexRouter: FormGroup;
  ip="";
  port:number;
  usuari="";
  contrassenya="";

  constructor(public _parent: AppComponent,
              private translate: TranslateService,
              private comuService: ComuService,
              private bf: FormBuilder,
              private router: Router) {

    this.subscription.add(this.comuService.getIdioma().subscribe(
      idioma => {
        this.translate.use(idioma);
      }
    ));
    this.comuService.infoUsuariLoggedIn.subscribe(infoUsuari => this.infoUsuari = infoUsuari);
  }

  ngOnInit() {
    this.esLogat = this.comuService.estaLogat();
    this.esAdmin = this.comuService.esAdmin();
    if(this.esLogat==false){
      this.router.navigateByUrl('/');
    } else {
      this.crearFormConexRouter();
    }
  }

  crearFormConexRouter(){
    this.formConexRouter = this.bf.group({
      ip: ["192.168.1.1", Validators.compose([
        Validators.minLength(7),
        Validators.maxLength(15),
        Validators.required
      ])],
      usuari: ["admin", Validators.compose([
        Validators.required
      ])],
      contrassenya: [""]
    })
  }

  connexioARouter(camps){
    if(camps.ip!=null || camps.usuari!=null){
      this.comuService.provarConnexioRouter(camps.ip, camps.usuari, camps.contrassenya).subscribe(
        data => {
          if(!data){
            console.log("RESPOSTA DEL ROUTER NO REBUDA CORRECTAMENT");
            console.log("NO EXISTEIX L'INFORMACIO DEMANADA");
            console.log(data);
          } else if(data!=null){
            console.log("RESPOSTA DEL ROUTER");
            if (data.resultat=="ok"){
              window.sessionStorage.setItem('ConnexioRouterIP', JSON.stringify(camps.ip));
              window.sessionStorage.setItem('ConnexioRouterUSUARI', JSON.stringify(camps.usuari));
              window.sessionStorage.setItem('ConnexioRouterCONTRASSENYA', JSON.stringify(camps.contrassenya));
              this.router.navigateByUrl('configurar-router');
            }
            else {
              this.resultatConnexioRouter = data.resultat;
              this.mostrarErrorConnexio=true;
            }
            console.log(data);
          } else{
            console.log("RESPOSTA DEL ROUTER NO REBUDA CORRECTAMENT");
            console.log("ARRAY NULL");
          }          
        }, error => {
          console.log("RESPOSTA DEL ROUTER NO REBUDA CORRECTAMENT");
          console.log("ERROR AL SERVIDOR");
          console.log(error);
        }
      );
    }
  }
}
