import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService, UserModel } from '../../auth';
import { Agent } from 'src/app/model/model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.component.html',
  styleUrls: ['./account-information.component.scss']
})
export class AccountInformationComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  user: Agent;
  firstUserState: Agent;
  subscriptions: Subscription[] = [];
  isLoading$: Observable<boolean>;
  editable=false;
  loginexist: boolean ;
  constructor(private userService: AuthService,
              private fb: FormBuilder,
              private usersService: UsersService) {
    this.isLoading$ = this.userService.isLoadingSubject.asObservable();
    console.log("tunchi info profile")
  }

  ngOnInit(): void {
    this.user = this.usersService.getCrrentUser();
    console.log("information profile",this.user)
    this.firstUserState = this.usersService.getCrrentUser();
    this.loadForm();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  loadForm() {
    this.formGroup = this.fb.group({
      username: [this.user.username, Validators.required],
      email: [this.user.email, Validators.compose([Validators.required, Validators.email])]
    });
  }

  save() {
    this.userService.isLoadingSubject.next(true);
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      this.userService.isLoadingSubject.next(false);
      return;
    }

    const formValues = this.formGroup.value;
    console.log(formValues) 
    this.usersService.verifieUsername(formValues.username)
    .subscribe((resp) => {
      console.log(resp);
      if (resp) {
        //this.router.navigate([this.returnUrl]);
        this.user.username = formValues.username;
        this.user.email = formValues.email;
        this.loginexist = true; 
        this.userService.isLoadingSubject.next(false);
      } else {
        this.usersService.Update(this.user)
        .subscribe(data=>{
          this.editable = false;
          this.userService.isLoadingSubject.next(false);
          document.location.reload();
        })
        this.loginexist = false;
      }
    });
    
     

    // Do request to your server for user update, we just imitate user update there
    this.userService.isLoadingSubject.next(true);
    // setTimeout(() => {
    //   this.userService.currentUserSubject.next(Object.assign({}, this.user));
    //   this.userService.isLoadingSubject.next(false);
    // }, 2000);
  }

  cancel() {
    this.user = Object.assign({}, this.firstUserState);
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
}
