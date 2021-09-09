
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import KTWizard from 'src/assets/js/components/wizard';
import { KTUtil } from 'src/assets/js/components/util';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Transaction, Caissier } from 'src/app/model/model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomersService } from 'src/app/modules/e-commerce/_services';
import { ActivitesService } from 'src/app/services/activites.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { OutilService } from 'src/app/_service/outil.service';
import { DatePipe } from '@angular/common';
import { SubheaderService } from 'src/app/_metronic/partials/layout';
import { TuteurService } from 'src/app/services/tuteur.service';
import { OrphelinService } from 'src/app/services/orphelin.service';
import { UsersService } from 'src/app/services/users.service';
import { AdoptionService } from 'src/app/services/adoption.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth';
import { AuthServiceLog } from 'src/app/_service/auth.service';
import { ProfilService } from 'src/app/services/profil.service';
import { DialogAdduserComponent } from './dialog-adduser/dialog-adduser.component';
import { ImageService } from 'src/app/services/image.service';
const commission = 5 / 100;

@Component({
  selector: 'app-material-modal',
  template: ` <div class="col-xl-12">
    <div class="col-xl-12">
      <br />
      <h1 mat-dialog-title class="text-danger">Erreur {{ data.name }}</h1>
      <div mat-dialog-content>
        <p>{{ data.rapport }} </p>
      </div>
      <div mat-dialog-actions>
        <button mat-button ></button>
        <button mat-button  cdkFocusInitial>
          Ok
        </button>
      </div>
      <br />
    </div>
  </div>`,
})
export class ModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  rapport: string;
  name: string;
}

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;
  hasError: boolean = false;
  ismailinvalide = false;

  public formData = new FormData();
  public selectedFile: File = null;
  public imageSrc: string;


  isLoading$: Observable<boolean>;
  sexes = [
    { value: 'Masculin', viewValue: 'Masculin' },
    { value: 'Feminin', viewValue: 'Feminin' }
  ];
  loginexist = false;
  mailexiste = false;
  profils = [];
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  returnUrl: any;

  constructor(
    private fb: FormBuilder,
    private authServiceLogin: AuthServiceLog,
    private router: Router,
    private userService: UsersService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public customerService: CustomersService,
    private auth2Service: AuthService,
    private subheader: SubheaderService,
    private imageService: ImageService,
    private profilService: ProfilService
  ) {
    this.isLoading$ = this.auth2Service.isLoading$;
    // redirect to home if already logged in
    // if (this.authService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit(): void {
    this.initForm();
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
    this.InitSubheader();
    this.getProfils();
  }

  verifierLogin(param: string) {

    console.log(param);
    this.userService.verifieUsername(param)
      .subscribe((resp) => {
        console.log(resp);
        if (resp) {
          //this.router.navigate([this.returnUrl]);
          this.loginexist = true;
          this.hasError = true;
        } else {

          this.loginexist = false;
        }
      });
  }
  onSelectFile(event) {
    this.selectedFile = event.target.files[event.target.files.length - 1] as File;
  }
  verifierMail(param: string) {
    this.userService.verifieMail(param)
      .subscribe((resp) => {
        console.log(resp);
        if (resp) {
          //this.router.navigate([this.returnUrl]);
          this.mailexiste = true;
          this.hasError = true;
        } else {

          this.mailexiste = false;
        }
      });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.registrationForm.controls;
  }

  InitSubheader() {
    setTimeout(() => {
      this.subheader.setTitle('Ajout utilisateur');
    }, 1);
  }

  initForm() {
    this.registrationForm = this.fb.group(
      {
        prenom: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(100),
          ]),
        ],
        nom: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        login: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(100),
          ]),
        ],
        sexe: [
          '',
          Validators.compose([
            Validators.required
          ]),
        ],
        telephone: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(9),
            Validators.maxLength(13),
          ]),
        ],
        datenaissance: [
          '',
          Validators.compose([
            Validators.required
          ]),
        ],
        adresse: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(200),
          ]),
        ],
        profil: [
          null,
          Validators.compose([
            Validators.required
          ]),
        ],
        cni: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(13),
            Validators.maxLength(13),
          ]),
        ],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.minLength(5),
            Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ]
      }
    );
  }

  submit(param: any) {
    this.auth2Service.isLoadingSubject.next(true);
    this.userService.verifieUsername(param.login)
      .subscribe((resp) => {
        console.log(resp);
        if (resp) {
          //this.router.navigate([this.returnUrl]);
          this.loginexist = true;
          this.hasError = true;
          this.auth2Service.isLoadingSubject.next(false);
        } else {

          this.loginexist = false;
          this.userService.verifieMail(param.email)
            .subscribe((resp) => {
              console.log(resp);
              if (resp) {
                //this.router.navigate([this.returnUrl]);
                this.mailexiste = true;
                this.hasError = true;
                this.auth2Service.isLoadingSubject.next(false);
              } else {

                this.mailexiste = false;

                if (this.mailexiste || this.loginexist) {
                  return;
                }
                console.log(param)

                this.formData.set('file', this.selectedFile, this.selectedFile.name);
                console.log(this.formData.get('file'));
                this.imageService.uploadImage(this.formData).subscribe(
                  res => {
                    this.imageSrc = res;
                    console.log("Image source" + this.imageSrc + "ghhgh");

                    let info =
                    {
                      prenom: param.prenom,
                      nom: param.nom,
                      username: param.login,
                      password: "passer",
                      telephone: param.telephone,
                      adresse: param.adresse,
                      sexe: param.sexe,
                      email: param.email,
                      cni: param.cni,
                      profile: param.profil,
                      datenaissance: param.datenaissance,
                      photo: this.imageSrc
                    }

                    console.log(info)
                    let mail = {
                      destinataire: param.email,
                      objet: 'Creation de compte Daraay  Admin',
                      message: 'Bonjour ' + param.prenom + " " + param.prenom +
                        ',\n\nNous venons de créer votre compte dans l\'administration de Daaray Serigne Saliou.\n\nVotre identifiant est : ' + param.login +
                        '\nVotre mot de passe est : \"passer\" ' +
                        '\n\nVeuillez redéfinir vos informations d\'identification pour assurer  la sécurité de votre compte ',
                    }
                    this.userService.SendMail(mail).subscribe((caissier) => {
                      console.log(caissier);
                      if (caissier) {

                        console.log("cool");
                      } else {
                        this.hasError = true;
                        this.ismailinvalide = true;
                        console.log("pas cool")
                      }
                    });


                    this.userService.save(info)
                      .subscribe((caissier) => {
                        this.auth2Service.isLoadingSubject.next(false);
                        console.log(caissier);
                        if (caissier) {
                          const modalRef = this.modalService.open(DialogAdduserComponent, { size: 'sm' });
                          modalRef.result.then(() => this.customerService.fetch(), () => {
                            location.reload();
                          });

                          console.log("cool")
                        } else {
                          this.hasError = true;
                          console.log("pas cool")
                        }
                      });

                  }
                );



              }
            });
        }
      });


  }

  getProfils() {
    this.profilService.getAll()
      .subscribe((profils) => {
        console.log(profils);
        if (profils) {
          //this.router.navigate([this.returnUrl]);
          this.profils = profils;
          console.log("profilp" + this.profils);
        } else {
          //this.hasError = true;
        }
      });
  }


  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  resset() {
    this.router.navigate(['/user-management/detailuser']);
  }

}
