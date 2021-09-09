
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from '../../../../../core';
import { AuthService } from '../../../../../../modules/auth/_services/auth.service';
import { Caissier } from 'src/app/model/model';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-user-dropdown-inner',
  templateUrl: './user-dropdown-inner.component.html',
  styleUrls: ['./user-dropdown-inner.component.scss'],
})
export class UserDropdownInnerComponent implements OnInit {
  extrasUserDropdownStyle: 'light' | 'dark' = 'light';
  user$: Caissier;

  constructor(private layout: LayoutService,
              private auth: AuthService,
              private userService: UsersService) {}

  ngOnInit(): void {
    this.extrasUserDropdownStyle = this.layout.getProp(
      'extras.user.dropdown.style'
    );
    this.user$ = this.userService.getCrrentUser();
    console.log(this.user$ );
  }

  logout() {
    this.auth.logout();
    document.location.reload();
  }
}
