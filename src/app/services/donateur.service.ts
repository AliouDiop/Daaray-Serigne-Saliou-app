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
export class DonateurService {
  
  constructor(private http : HttpClient) { }

  getUser(){
    return this.http.get(BaseUrl).pipe(
      tap((data: any)=> console.log(data)),
      map((response: any) =>{
        return {
          users: response
        }
      })
    )
  }
  save(info:any){
    return this.http.post(BaseUrl+'donateur/add',JSON.stringify(info),httpOptions).pipe(
      tap((data: any)=> console.log(data)),
      map((response: any) =>{
        return response
      }),
      catchError(async () => console.log("Add donateur genrrerreur"))
    )
  }
  
  FindById(id:any){
    return this.http.get(BaseUrl+'donateur/findById/'+id,httpOptions).pipe(
      tap((data: any)=> console.log(data)),
      map((response: any) =>{
        return response
      }),
      catchError(async (data) => console.log(data,"erreur"))
    )
  }

  Update(info:any){
    return this.http.post(BaseUrl+'donateur/update',JSON.stringify(info),httpOptions).pipe(
      tap((data: any)=> console.log(data)),
      map((response: any) =>{
        return {
          tuteur: response
        }
      }),
      catchError(async () => console.log("Update tuteur genrrerreur"))
    )
  }

  getList(){
    return this.http.get(BaseUrl+'donateur/liste',httpOptions).pipe(
      tap((data: any)=> console.log(data)),
      map((response: any) =>{
        return response
      }),
      catchError(async (data) => console.log("erreur"))
    )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
 
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(BaseUrl + 'donateur/liste');
  }

}
