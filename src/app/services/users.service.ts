import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Caissier } from '../model/model';

////const BaseUrl = 'http://127.0.0.1:8080/Backend_GesHorphelinat-0.0.1-SNAPSHOT/api/';
const BaseUrl = 'https://backendgestionorphelinat.herokuapp.com/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json' 
  })
};
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private authsessionStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  constructor(private http : HttpClient) { }

  save(info:any){
    
    return this.http.post(BaseUrl+'utilisateur/add',JSON.stringify(info),httpOptions).pipe(
      tap((data: any)=> console.log(data)),
      map((response: any) =>{
        return {
          agent: response
        }
      }),
      catchError(async () => console.log("erreur"))
    )
  }

  Update(info:any){
    
    return this.http.post(BaseUrl+'utilisateur/update',JSON.stringify(info),httpOptions).pipe(
      tap((data: any)=> console.log(data)),
      map((response: any) =>{
        sessionStorage.setItem('utilisateur', JSON.stringify(response));
        return {
          caissier: response
          
        }
      }),
      catchError(async () => console.log("erreur"))
    )
  }

  UpdatePasswordUser(info:any){
    
    return this.http.post(BaseUrl+'utilisateur/updatepassword',JSON.stringify(info),httpOptions).pipe(
      tap((data: any)=> console.log(data)),
      map((response: any) =>{
        sessionStorage.setItem('utilisateur', JSON.stringify(response));
        return {
          agent: response
          
        }
      }),
      catchError(async () => console.log("erreur"))
    )
  }

  getList(){
    
    return this.http.get(BaseUrl+'utilisateur/liste',httpOptions).pipe(
      tap((data: any)=> console.log(data)),
      map((response: any) =>{
        return response
        
      }),
      catchError(async () => console.log("erreur"))
    )
  }

  FindAgenceById(id:any){
    return this.http.get(BaseUrl+'utilisateur/findById/'+id,httpOptions).pipe(
      tap((data: any)=> console.log(data)),
      map((response: any) =>{
        return response
      }),
      catchError(async (data) => console.log(data,"erreur"))
    )
  }

  FindById(id:any){
    return this.http.get(BaseUrl+'utilisateur/findById/'+id,httpOptions).pipe(
      tap((data: any)=> console.log(data)),
      map((response: any) =>{
        return response
      }),
      catchError(async (data) => console.log(data,"erreur"))
    )
  }

  FindCaissierByUsername(username:any):Observable<Caissier>{
    return this.http.get(BaseUrl+'utilisateur/findByUsername/'+username,httpOptions).pipe(
      tap((data: any)=> console.log(data))
    );
  }

  getCrrentUser(){ 
    console.log(JSON.parse(sessionStorage.getItem('utilisateur')))
    return JSON.parse(sessionStorage.getItem('utilisateur'));
  }

  getCrrentloginer(){ 
    console.log(JSON.parse(sessionStorage.getItem('infologin')))
    return JSON.parse(sessionStorage.getItem('infologin'));
  }

  SendMail(info:any){
    
    return this.http.post(BaseUrl+'utilisateur/sendMail',JSON.stringify(info),httpOptions).pipe(
      tap((data: any)=> console.log(data)),
      map((response: any) =>{
        return response
      }),
      catchError(async (data) => console.log(data,"erreur"))
    )
  }

  verifieMail(email:any){
    const url = BaseUrl+'utilisateur/verifieEmail'
    return this.http.post(`${BaseUrl+'utilisateur/verifieEmail'}/${email}`,email,httpOptions).pipe(
      tap((data: any)=> console.log(data)),
      map((response: any) =>{
        return response
      }),
      catchError(async (data) => console.log(data,"erreur"))
    )
  }

  verifieUsername(login:any){
    const url = BaseUrl+'utilisateur/verifieLogin'
    return this.http.post(`${BaseUrl+'utilisateur/verifieLogin'}/${login}`,httpOptions).pipe(
      tap((data: any)=> console.log(data)),
      map((response: any) =>{
        return response
      }),
      catchError(async (data) => console.log(data,"erreur"))
    )
  }
}
