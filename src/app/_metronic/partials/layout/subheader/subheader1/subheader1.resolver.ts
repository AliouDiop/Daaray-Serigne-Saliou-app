import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { catchError, map, tap } from "rxjs/operators";
import { ActivitesService } from "src/app/services/activites.service";
import { SubheaderService } from "../_services/subheader.service";
////const BaseUrl = 'http://127.0.0.1:8080/Backend_GesHorphelinat-0.0.1-SNAPSHOT/api/';
const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  @Injectable({
    providedIn: 'root'
  })
export class Subheader1Resolver implements Resolve<any>{
    id: number;
    constructor(private activitesService: ActivitesService,
        private subheader: SubheaderService,
        private http : HttpClient) {

    }
    resolve() {
      
      let info={
        title: this.subheader.titleSubject.asObservable(),
        description: this.subheader.descriptionSubject.asObservable()
      }
      return info;
    }
}