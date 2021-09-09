import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activites } from 'src/app/model/model';
import { ActivitesService } from 'src/app/services/activites.service';

@Component({
  selector: 'app-lists-widget9',
  templateUrl: './lists-widget9.component.html',
})
export class ListsWidget9Component implements OnInit {
  constructor(private activitesService: ActivitesService,   private routes: ActivatedRoute) { }
  activites: Activites[];
  
  ngOnInit(): void {
    this.loadActivites();
  }

  loadActivites() {
    /*this.activitesService.getListActivites().subscribe((data) => {
      this.activites = data;
      console.log("Transactionsactivites" + this.activites);
    });*/

    this.activites  = this.routes.snapshot.data.listactivites;
    
  }
}
