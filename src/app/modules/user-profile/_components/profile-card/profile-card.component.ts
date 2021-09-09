
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, UserModel } from '../../../auth';
import { Agent, Users } from 'src/app/model/model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent {
  user:any;
  photo:string;
  constructor(public usersService:UsersService, private auth: AuthService,) {
      this.user = this.usersService.getCrrentUser();
      this.photo='url('+this.user.photo+')';
      console.log(this.user)
  }
  logout() {
    this.auth.logout();
    document.location.reload();
  }
}
