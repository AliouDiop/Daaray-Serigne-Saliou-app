import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../../core';
import { Observable } from 'rxjs';
import { UserModel } from '../../../../../../modules/auth/_models/user.model';
import { AuthService } from '../../../../../../modules/auth/_services/auth.service';
import { Caissier } from 'src/app/model/model';
import { ActivitesService } from 'src/app/services/activites.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-offcanvas',
  templateUrl: './user-offcanvas.component.html',
  styleUrls: ['./user-offcanvas.component.scss'],
})
export class UserOffcanvasComponent implements OnInit {
  extrasUserOffcanvasDirection = 'offcanvas-right';
  user$: Caissier;

  constructor(private layout: LayoutService,
              private auth: AuthService,
              private userService: UsersService,
              private activitesService:ActivitesService
              ) {}

  ngOnInit(): void {
    this.extrasUserOffcanvasDirection = `offcanvas-${this.layout.getProp(
      'extras.user.offcanvas.direction'
    )}`;
    this.user$ = this.userService.getCrrentUser();
  }

  logout() {
    this.auth.logout();
    document.location.reload();
  }

  type() {
    this.activitesService.setType("activites");
  }
}
