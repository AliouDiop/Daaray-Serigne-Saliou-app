import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OutilService {

  constructor(private http: HttpClient) { }

  verif_number(champ) {
    var chiffres = new RegExp("[0-9]");
    var verif,x;
    var points = 0;

    for (x = 0; x < champ.value.length; x++) {
      verif = chiffres.test(champ.value.charAt(x));
      if (champ.value.charAt(x) == ".") { points++; }
      if (points > 1) { verif = false; points = 1; }
      if (verif == false) {champ.setValue(champ.value.substr(0, x) +champ.value.substr(x + 1,champ.value.length - x + 1)); x--; }
    }
  }

  verif_float(champ) {
    var chiffres = new RegExp("[0-9.]");
    var verif,x;
    var points = 0;

    for (x = 0; x < champ.value.length; x++) {
      verif = chiffres.test(champ.value.charAt(x));
      if (champ.value.charAt(x) == ".") { points++; }
      if (points > 1) { verif = false; points = 1; }
      if (verif == false) {champ.setValue(champ.value.substr(0, x) +champ.value.substr(x + 1,champ.value.length - x + 1)); x--; }
    }
  }
}