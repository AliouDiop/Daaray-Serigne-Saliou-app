
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService, UserModel } from '../../auth';
import { Agent, Caissier } from 'src/app/model/model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  user: any;
  photo:string;
  firstUserState: Caissier;
  subscriptions: Subscription[] = [];
  avatarPic = 'none';
  isLoading$: Observable<boolean>;
  editable=false;

  constructor(private userService: AuthService,
             private fb: FormBuilder,
             private usersService: UsersService) {
    this.isLoading$ = this.userService.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
    this.user = this.usersService.getCrrentUser();
    this.photo='url('+this.user.photo+')';
    console.log("information profile",this.photo)
    this.loadForm();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  loadForm() {
    this.formGroup = this.fb.group({
      prenom: [this.user.prenom, Validators.required],
      adresse: [this.user.adresse, Validators.required], 
      nom: [this.user.nom, Validators.required],
      telephone: [this.user.telephone, Validators.required],
      email: [this.user.email, Validators.compose([Validators.required, Validators.email])],
    });
  }

  save() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      return;
    }

    const formValues = this.formGroup.value;
    console.log(formValues)
    this.user.adresse = formValues.adresse;
    this.user.email = formValues.email;
    this.user.prenom = formValues.prenom;
    this.user.nom = formValues.nom;
    this.user.telephone = formValues.telephone;
    this.usersService.Update(this.user)
    .subscribe(data=>{
      this.editable = false;
      document.location.reload();
    }) 

    // Do request to your server for user update, we just imitate user update there
    //this.userService.isLoadingSubject.next(true);
    // setTimeout(() => {
    //   this.userService.currentUserSubject.next(Object.assign({}, this.user));
    //   this.userService.isLoadingSubject.next(false);
    // }, 2000);
  }

  cancel() {
    this.user = Object.assign({}, this.firstUserState);
    this.loadForm();
  }

  getPic() {
    // if (!this.user.pic) {
    //   return 'none';
    // }

    // return `url('${this.user.pic}')`;
  }

  deletePic() {
    // this.user.pic = '';
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
