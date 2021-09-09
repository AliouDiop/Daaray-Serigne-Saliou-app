import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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
export class AuthServiceLog {
  private authsessionStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  constructor(private http : HttpClient) { }

  login(info:any){
    
    return this.http.post(BaseUrl+'utilisateur/connexion',JSON.stringify(info),httpOptions).pipe(
      tap((data: any)=> console.log(data,"connexion")),
      map((response: any) =>{

         sessionStorage.setItem(this.authsessionStorageToken, response.accessToken);
         sessionStorage.setItem('utilisateur', JSON.stringify(response.user));
         sessionStorage.setItem('infologin', JSON.stringify(info));
        return  response
        
      }),
      catchError(async (data) => console.log(data,"erreur login"))
    )
  }

  getProfiles(){
    
    return this.http.get(BaseUrl+'profile/liste',httpOptions).pipe(
      tap((data: any)=> console.log(data)),
      map((response: any) =>{
        return  response
      }),
      catchError(async (data) => console.log("erreur autentification",data))
    )
  }

  Verifielogin(info:any){
    
    return this.http.post(BaseUrl+'utilisateur/verificonnexion',JSON.stringify(info),httpOptions).pipe(
      tap((data: any)=> console.log(data,"verificonnexion")),
      map((response: any) =>{ 
        return  true
      }),
      catchError(async () => {return false})
    )
  }
}
