import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { TranslateService } from '@ngx-translate/core';
import { ComuService } from 'src/app/serveis/comu.service';
import { CrudService } from 'src/app/serveis/crud.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { UsuariAmbRolVO } from 'src/app/vo/usuari-vo';

@Component({
  selector: 'app-llusuaris',
  templateUrl: './llusuaris.component.html',
  styleUrls: ['./llusuaris.component.css']
})
export class LlusuarisComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  arrayUsuaris: Object;
  infoUsuari: UsuariAmbRolVO;
  esLogat: boolean=false;
  esAdmin: boolean=false;
  mostrarErrorEliminarAdminGlob:boolean=false;

  constructor(public _parent: AppComponent,
              private translate: TranslateService,
              private comuService: ComuService,
              private crudService: CrudService,
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
        this.cargarUsuaris();
      }
    }
  }

  cargarUsuaris(){
    this.crudService.llistarUsuaris().subscribe(
      data => {
        if(!data){
          console.log("USUARIS NO REBUTS CORRECTAMENT");
          console.log("NO EXISTEIX L'INFORMACIO DEMANADA");
          console.log(data);
        } else if(data!=null){
          console.log("ARRAY USUARIS");
          this.arrayUsuaris = null;
          this.arrayUsuaris = data;
          console.log(this.arrayUsuaris);
        } else{
          console.log("USUARIS NO REBUTS CORRECTAMENT");
          console.log("ARRAY NULL");
        }          
      }, error => {
        console.log("USUARIS NO REBUTS CORRECTAMENT");
        console.log("ERROR AL SERVIDOR");
        console.log(error);
        
      }
    );
  }

  eliminarUsuariPerId(id){
    if(id==1){
      this.mostrarErrorEliminarAdminGlob=true;
    } else{
      this.crudService.eliminarUsuariPerId(id).subscribe(
        data => {
          console.log(data);     
          this.cargarUsuaris();    
        }, error => {
          console.log(error);
        }
      );
    }
  }
}
