import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from '../../../../core';
import { SubheaderService } from '../_services/subheader.service';
import { BreadcrumbItemModel } from '../_models/breadcrumb-item.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subheader1',
  templateUrl: './subheader1.component.html',
})
export class Subheader1Component implements OnInit {
  subheaderCSSClasses = '';
  subheaderContainerCSSClasses = '';
  subheaderMobileToggle = false;
  subheaderDisplayDesc = false;
  subheaderDisplayDaterangepicker = false;
  title$: Observable<string>;
  breadcrumbs$: Observable<BreadcrumbItemModel[]>;
  breadcrumbs: BreadcrumbItemModel[] = [];
  description$: Observable<string>;
  agence: any;
  date: Date;
  @Input() title: string;
  nomag: any;
  constructor(
    private layout: LayoutService,
    private subheader: SubheaderService,
    private routes: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {

  }

  ngOnInit() {
    // this.title$ = this.subheader.titleSubject.asObservable();
    // this.description$ = this.subheader.descriptionSubject.asObservable();

    this.title$ = this.routes.snapshot.data.info.title;
    this.description$ = this.routes.snapshot.data.info.description;
    this.breadcrumbs$ = this.subheader.breadCrumbsSubject.asObservable();
    // this.loadAgence();
    this.subheaderCSSClasses = this.layout.getStringCSSClasses('subheader');
    this.subheaderContainerCSSClasses = this.layout.getStringCSSClasses(
      'subheader_container'
    );
    this.subheaderMobileToggle = this.layout.getProp('subheader.mobileToggle');
    this.subheaderDisplayDesc = this.layout.getProp('subheader.displayDesc');
    this.subheaderDisplayDaterangepicker = this.layout.getProp(
      'subheader.displayDaterangepicker'
    );
    this.breadcrumbs$.subscribe((res) => {
      this.breadcrumbs = res;
      this.cdr.detectChanges();
    });
    this.InitSubheader();
    this.utcTime();
  }

  utcTime(): void {
    setInterval(() => {         //replaced function() by ()=>
      this.date = new Date();
      //console.log(this.date); //just testing if it is working
    }, 1000);
  }

  loadAgence() {
    
  }

  refresh() {
    var t = 1000; // rafraîchissement en millisecondes
    setTimeout('showDate()', t)
  }

  InitSubheader() {
    setTimeout(() => {
      this.subheader.setTitle("Accueil ");
      this.subheader.setBreadcrumbs([{
        title: 'Accueil',
        linkText: 'Accueil',
        linkPath: '/'
      }]);
    }, 1);
  }

  showDate() {
    var date = new Date()
    var h: any = date.getHours();
    var m: any = date.getMinutes();
    var s: any = date.getSeconds();
    if (h < 10) { h = '0' + h; }
    if (m < 10) { m = '0' + m; }
    if (s < 10) { s = '0' + s; }
    var time = h + ':' + m + ':' + s
    document.getElementById('horloge').innerHTML = time;
    this.refresh();
  }
}
