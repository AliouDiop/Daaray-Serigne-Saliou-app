import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService, UserModel, ConfirmPasswordValidator } from '../../auth';
import { Logininfo } from 'src/app/model/model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  user: UserModel;
  firstUserState: UserModel;
  subscriptions: Subscription[] = [];
  isLoading$: Observable<boolean>;
  logininfo:Logininfo;
  showlabel = false;
  constructor(private userService: AuthService,
              private fb: FormBuilder,
              private usersService: UsersService) {
    this.isLoading$ = this.userService.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
    this.user = this.usersService.getCrrentUser();
    this.logininfo = this.usersService.getCrrentloginer();
    console.log("information profile",this.user)
    this.loadForm();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  loadForm() {
    this.formGroup = this.fb.group({
      currentPassword: ['', Validators.required],
      password: ['', Validators.required],
      cPassword: ['', Validators.required]
    }, {
      validator: ConfirmPasswordValidator.MatchPassword, 
    });
  }

  save() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid || this.logininfo.password !== this.formGroup.value.currentPassword ) {
      return;
    }
    this.showlabel = false
    this.logininfo.password = this.formGroup.value.password;
    this.user.password = this.formGroup.value.password;
    this.userService.isLoadingSubject.next(true);
    this.usersService.UpdatePasswordUser(this.user)
    .subscribe(data=>{ 
      sessionStorage.setItem('infologin', JSON.stringify(this.logininfo));
      document.location.reload();
    }) 

  }

  cancel() {
    //this.user = Object.assign({}, this.firstUserState);
    this.loadForm();
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
//control pour le champ du current password
  isControlInvalid2(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    if(control.touched ||control.dirty){this.showlabel = true}
    // console.log((control.dirty || control.touched)&& control.value !== this.logininfo.password )
    return  ( control.dirty || control.touched)&& control.value !== this.logininfo.password || control.invalid  ;
  }

  controlHasError(validation, controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  controlcurrentError(validation, controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }
}
