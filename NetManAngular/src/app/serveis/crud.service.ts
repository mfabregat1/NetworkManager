import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UsuariAmbRolVO } from '../vo/usuari-vo';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  constructor(private http: HttpClient) { }
  llistarUsuaris(): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    
    return this.http.get<Object>('http://localhost:8090/llistar-usuaris', httpOptions);
  }

  eliminarUsuariPerId(id): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('u_id', id)
    };
    
    return this.http.get<Object>('http://localhost:8090/eliminar-usuari-per-id', httpOptions);
  }

  getUsuariPerId(id) : Observable<UsuariAmbRolVO>{
    const httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('u_id', id)
    };
    
    return this.http.get<UsuariAmbRolVO>('http://localhost:8090/buscar-usuari', httpOptions);
  }

  modificarUsuari(id, username, nom, cognom, correu, contrassenya, actiu, rol) : Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('u_id', id)
                              .set('u_username', username)
                              .set('u_nom', nom)
                              .set('u_cognom', cognom)
                              .set('u_correu', correu)
                              .set('u_contrassenya', contrassenya)
                              .set('u_actiu', actiu)
                              .set('u_rol', rol)
    };
    
    return this.http.get<Object>('http://localhost:8090/modificar-usuari', httpOptions);
  }

  crearUsuari(username, nom, cognom, correu, contrassenya, actiu, rol) : Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('u_username', username)
                              .set('u_nom', nom)
                              .set('u_cognom', cognom)
                              .set('u_correu', correu)
                              .set('u_contrassenya', contrassenya)
                              .set('u_actiu', actiu)
                              .set('u_rol', rol)
    };
    
    return this.http.get<Object>('http://localhost:8090/crear-usuari', httpOptions);
  }
}
