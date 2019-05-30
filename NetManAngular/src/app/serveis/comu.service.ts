import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UsuariAmbRolVO } from '../vo/usuari-vo';
import { ResultatVO } from '../vo/resultat-vo';

@Injectable({
  providedIn: 'root'
})
export class ComuService {

  private idioma = new BehaviorSubject<string>("ca");
  /*private infoUsu = new BehaviorSubject<UsuariAmbRolVO>(null);
  infoUsuariActual = this.infoUsu.asObservable();*/
  private rolUsu = new BehaviorSubject<string>(null);
  rolUsuariActual = this.rolUsu.asObservable();
  private isUserLoggedIn:boolean;
  private userLoggedIn = new BehaviorSubject<UsuariAmbRolVO>(null);
  infoUsuariLoggedIn = this.userLoggedIn.asObservable();

  constructor(private http: HttpClient) {
    this.isUserLoggedIn = false;
  }
  
  public getIdioma(): BehaviorSubject<string> {
    return this.idioma;
  }

  public setIdioma(value: string): void {
    this.idioma.next(value);
  }

  /*public setInfoUsuari(infoUsuari: UsuariAmbRolVO){
    this.userLoggedIn.next(infoUsuari)
  }*/

  public quinRolTe(rol: string){
    this.rolUsu.next(rol)
    window.sessionStorage.setItem('NetManRolUsuariActual', JSON.stringify(rol));
  }

  public connectatARouter(){
    if(JSON.parse(window.sessionStorage.getItem('ConnexioRouterIP'))!=null && JSON.parse(window.sessionStorage.getItem('ConnexioRouterPORT'))!=null && JSON.parse(window.sessionStorage.getItem('ConnexioRouterUSUARI'))!=null && JSON.parse(window.sessionStorage.getItem('ConnexioRouterCONTRASSENYA'))!=null){
      return true;
    }
    else{
      return false;
    }
  }

  public estaLogat(){
    if(JSON.parse(window.sessionStorage.getItem('NetManUsuariActual'))==null){
      return false;
    }
    else{
      return true;
    }
  }

  public esAdmin(){
    if(JSON.parse(window.sessionStorage.getItem('NetManRolUsuariActual'))==null){
      return false;
    }
    else{
      if(JSON.parse(window.sessionStorage.getItem('NetManRolUsuariActual'))=="ROL_ADMINGLOB"){
        return true;
      }
      else{
        return false;
      }
    }
  }

  public esUsuariNormal(){
    if(JSON.parse(window.sessionStorage.getItem('NetManRolUsuariActual'))==null){
      return false;
    }
    else{
      if(JSON.parse(window.sessionStorage.getItem('NetManRolUsuariActual'))=="ROL_USUARI"){
        return true;
      }
      else{
        return false;
      }
    }
  }

  setUserLoggedIn(infoUsuari:UsuariAmbRolVO) {
    this.isUserLoggedIn = true;
    this.userLoggedIn.next(infoUsuari)
    window.sessionStorage.setItem('NetManUsuariActual', JSON.stringify(infoUsuari));
  
  }

  getUserLoggedIn() {
  	return JSON.parse(window.sessionStorage.getItem('NetManUsuariActual'));
  }

  provarConnexioRouter(ip, usuari, contrassenya): Observable<ResultatVO> {
    const httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('r_ip', ip)
                              .set('r_usuari', usuari)
                              .set('r_contrassenya', contrassenya)
    };
    
    return this.http.get<ResultatVO>('http://localhost:8090/connexio-router', httpOptions);
  }

  modificarIdentity(identity): Observable<ResultatVO> {
    /*let usuariRouter: string = JSON.parse(window.sessionStorage.getItem('ConnexioRouterUSUARI'));
    let contrassenyaRouter: string = JSON.parse(window.sessionStorage.getItem('ConnexioRouterCONTRASSENYA'));
    let ipRouter: string = JSON.parse(window.sessionStorage.getItem('ConnexioRouterIP'));*/
    const httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
                                .set('Access-Control-Allow-Origin', '*')
                                .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD')
      /*params: new HttpParams()/*.set('r_ip', ipRouter)
                              .set('r_usuari', usuariRouter)
                              .set('r_contrassenya', contrassenyaRouter)
                              .set('r_identity', identity)*/
    };

    //return this.http.get<ResultatVO>('http://localhost:8090/modificar-avui', httpOptions);
    return this.http.get<ResultatVO>('http://localhost:8090/maurici', httpOptions);
  }

  getRouterIdentity(): Observable<ResultatVO> {
    const httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    return this.http.get<ResultatVO>('http://localhost:8090/obtindre-identity-router', httpOptions);
  }
}
