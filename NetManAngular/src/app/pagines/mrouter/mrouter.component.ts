import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { TranslateService } from '@ngx-translate/core';
import { ComuService } from 'src/app/serveis/comu.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariAmbRolVO } from 'src/app/vo/usuari-vo';
import { ResultatVO } from 'src/app/vo/resultat-vo';

@Component({
  selector: 'app-mrouter',
  templateUrl: './mrouter.component.html',
  styleUrls: ['./mrouter.component.css']
})
export class MrouterComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  infoUsuari: UsuariAmbRolVO;
  esLogat: boolean=false;
  esAdmin: boolean=false;
  esUsuariNormal: boolean=false;
  usuariRouter: string = JSON.parse(window.sessionStorage.getItem('ConnexioRouterUSUARI'));
  contrassenyaRouter: string = JSON.parse(window.sessionStorage.getItem('ConnexioRouterCONTRASSENYA'));
  ipRouter: string = JSON.parse(window.sessionStorage.getItem('ConnexioRouterIP'));
  identityRouter: ResultatVO;

  formIdentity: FormGroup;
  identity="";
  _isDisabled:boolean;

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
    this.esUsuariNormal = this.comuService.esUsuariNormal();

    if(this.esLogat==false){
      this.router.navigateByUrl('/');
    } else if(this.usuariRouter!=null && this.ipRouter!=null) {
      /*this.comuService.getRouterIdentity().subscribe(
        data => {
          console.log(data);
        }, error => {
          console.log(error);
        }
      );*/
      this.crearFormIdentity();
    }
    else {
      this.router.navigateByUrl('/');
    }
  }

  crearFormIdentity(){
    if(this.esUsuariNormal==true){
      this.formIdentity = this.bf.group({
        identity: [{value: "", disabled: true}, Validators.compose([
          Validators.required
        ])]
      })
    } else{
      this.formIdentity = this.bf.group({
        identity: ["", Validators.compose([
          Validators.required
        ])]
      })
    }
  }
  modificarIdentity(camps){
    if (camps.identity!=null){
      let identity = camps.identity;
      this.comuService.modificarIdentity(identity).subscribe(
        data => {
          console.log(data);
          this.router.navigateByUrl('configurar-router');
        }, error => {
          console.log(error);
        }
      );
    }
  }
}
