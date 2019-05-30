import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UsuariAmbRolVO } from '../vo/usuari-vo';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  esLogat: boolean = false;
  correu: string = null;
  contrassenya: string = null;
  constructor(private http: HttpClient) { }
  iniciaSessio(correu, contrassenya): Observable<UsuariAmbRolVO> {
    this.correu = correu;
    this.contrassenya = contrassenya;
    const httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('l_correu', correu).set('l_contrassenya', contrassenya)
    };
    
    return this.http.get<UsuariAmbRolVO>('http://localhost:8090/inicia-sessio', httpOptions);
  }
}
