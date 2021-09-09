
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
export class ActivitesService {
  private type:any;
  private authsessionStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  constructor(private http : HttpClient) { }

  saveActivites(info:any){
    return this.http.post(BaseUrl+'activites/add',JSON.stringify(info),httpOptions).pipe(
      tap((data: any)=> console.log(data)),
      map((response: any) =>{
        return {
          activites: response
        }
      }),
      catchError(async () => console.log("Add activites genrrerreur"))
    )
  }

  getType(){
    return this.type;
  }

  setType(info:any){
    this.type=info;
  }

  UpdateActivites(info:any){
    
    return this.http.post(BaseUrl+'activites/update',JSON.stringify(info),httpOptions).pipe(
      tap((data: any)=> console.log(data)),
      map((response: any) =>{
        sessionStorage.setItem('agent', JSON.stringify(response));
        return {
          agent: response
          
        }
      }),
      catchError(async () => console.log("erreur"))
    )
  }

  getListActivites(){
    return this.http.get(BaseUrl+'activites/liste',httpOptions).pipe(
      tap((data: any)=> console.log(data)),
      map((response: any) =>{
        return response
      }),
      catchError(async () => console.log("erreujhhjr"))
    )
  }
  
}
