import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivitesService } from 'src/app/services/activites.service';
import { LayoutService } from '../../../../core';

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
})
export class Dashboard1Component implements OnInit {
  type :any;
  constructor(private route: ActivatedRoute,
    private activitesService:ActivitesService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.type = params['type'];
    })
    this.type=this.activitesService.getType();
  }
}
