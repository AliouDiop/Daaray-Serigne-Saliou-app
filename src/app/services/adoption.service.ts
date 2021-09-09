import { CodePreviewComponent } from '../_metronic/partials/content/general/code-preview/code-preview.component';

import { Transaction, utilisateur } from '../model/model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map,tap  } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { identifierModuleUrl } from '@angular/compiler';
// const UserUrl = 'https://jsonplaceholder.typicode.com/users/';
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
export class AdoptionService {
  
  constructor(private http : HttpClient) { }

  save(info:any){
    return this.http.post(BaseUrl+'adoption/add',JSON.stringify(info),httpOptions).pipe(
      tap((data: any)=> console.log(data)),
      map((response: any) =>{
        return {
          orphelin: response
        }
      }),
      catchError(async () => console.log("Add adoption genrrerreur"))
    )
  }

  FindById(id:any){
    return this.http.get(BaseUrl+'adoption/findById/'+id,httpOptions).pipe(
      tap((data: any)=> console.log(data)),
      map((response: any) =>{
        return response
      }),
      catchError(async (data) => console.log(data,"erreur"))
    )
  }

  UpdateeAdoption(info:any){
    return this.http.post(BaseUrl+'adoption/update',JSON.stringify(info),httpOptions).pipe(
      tap((data: any)=> console.log(data)),
      map((response: any) =>{
        return {
          orphelin: response
        }
      }),
      catchError(async () => console.log("erreur"))
    )   
  }
  
  getList(){
    return this.http.get(BaseUrl+'adoption/liste',httpOptions).pipe(
      tap((data: any)=> console.log(data)),
      map((response: any) =>{
        return response
      }),
      catchError(async (data) => console.log("erreur"))
    )
  }

}
