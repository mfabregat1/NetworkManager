import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { TranslateService } from '@ngx-translate/core';
import { ComuService } from 'src/app/serveis/comu.service';
import { CrudService } from 'src/app/serveis/crud.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router} from '@angular/router';
import { UsuariAmbRolVO } from 'src/app/vo/usuari-vo';

@Component({
  selector: 'app-cusuari',
  templateUrl: './cusuari.component.html',
  styleUrls: ['./cusuari.component.css']
})
export class CusuariComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  infoUsuari: UsuariAmbRolVO;
  esLogat: boolean=false;
  esAdmin: boolean=false;
  idUsuariAModificar: any;
  UsuariAModificar: UsuariAmbRolVO;

  formCrear: FormGroup;
  usuari="";
  nom="";
  cognom="";
  correu="";
  contrassenya="";
  actiu:boolean;
  rol="";

  constructor(public _parent: AppComponent,
              private translate: TranslateService,
              private comuService: ComuService,
              private crudService: CrudService,
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
      if (this.esAdmin==false) {
        this.router.navigateByUrl('router');
      } else {
        this.crearFormCrear();
      }
    }
  }

  crearFormCrear(){
    this.formCrear = this.bf.group({
      usuari: ["", Validators.compose([
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.required
      ])],
      nom: ["", Validators.compose([
        Validators.required,
        Validators.maxLength(20)
      ])],
      cognom: ["", Validators.compose([
        Validators.required,
        Validators.maxLength(20)
      ])],
      correu: ["", Validators.compose([
        Validators.required,
        Validators.email
      ])],
      contrassenya: ["", Validators.compose([
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.required
      ])],
      actiu: [],
      rol: ["", Validators.compose([
        Validators.required
      ])]
    })
  }

  crearUsuari(camps) {
    if(camps.usuari!="" || camps.nom!="" || camps.cognom!="" || camps.correu!="" || camps.contrassenya!="" || camps.rol!=""){
      this.usuari = camps.usuari;
      this.nom = camps.nom;
      this.cognom = camps.cognom;
      this.correu = camps.correu;
      this.contrassenya = camps.contrassenya;
      this.actiu = camps.actiu;
      if (camps.rol=="ROL_AG"){
        this.rol="ROL_ADMINGLOB";
      } else if (camps.rol=="ROL_A"){
        this.rol="ROL_ADMIN";
      } else if (camps.rol=="ROL_U"){
        this.rol="ROL_USUARI";
      } else {
        this.router.navigateByUrl('gestionar-usuaris');
      }
      this.crudService.crearUsuari(this.usuari, this.nom, this.cognom, this.correu, this.contrassenya, this.actiu, this.rol).subscribe(
        data => {
          console.log(data);
          this.router.navigateByUrl('gestionar-usuaris');
        }, error => {
          console.log(error);
        }
      );
    } else{
      this.router.navigateByUrl('gestionar-usuaris');
    }
  }
}
