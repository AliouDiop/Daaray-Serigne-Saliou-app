
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
import { BehaviorSubject, Observable } from 'rxjs';
import { OutilService } from 'src/app/_service/outil.service';
import { DatePipe } from '@angular/common';
import { SubheaderService } from 'src/app/_metronic/partials/layout';
import { TuteurService } from 'src/app/services/tuteur.service';
import { OrphelinService } from 'src/app/services/orphelin.service';
import { UsersService } from 'src/app/services/users.service';
import { DialogAddorphelinComponent } from './dialog-addorphelin/dialog-addorphelin.component';
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
  selector: 'app-addorphelin',
  templateUrl: './addorphelin.component.html',
  styleUrls: ['./addorphelin.component.scss']
})
export class AddorphelinComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('wizard', { static: true }) el: ElementRef;
  hasError: boolean = false;

  public formData = new FormData();
  public selectedFile: File = null;
  public imageSrc: string;

  orphelinForm: FormGroup;
  tuteurForm: FormGroup;
  submitted = false;
  transaction: Transaction;
  wizard: any;
  user: any;
  tof:any;
  user2: Caissier;
  compteagence: any;
  soldeError: boolean;
  headerLogo: string;
  transLoad: any;
  recu: boolean;
  montanttotal: any;
  animalSubject = new BehaviorSubject<string>('');
  animal$: Observable<string>;
  animal: string;
  sexes = [
    { value: 'Masculin', viewValue: 'Masculin' },
    { value: 'Feminin', viewValue: 'Feminin' }
  ];
  situations = [
    { value: 'Ramassé', viewValue: 'Ramassé' },
    { value: 'Amené', viewValue: 'Amené' }
  ];
  //compteAgence: any;
  constructor(private fb: FormBuilder,
    private userService: UsersService,
    private orphelinService: OrphelinService,
    private activitesService: ActivitesService,
    private tuteurService: TuteurService,
    private modalService: NgbModal,
    public customerService: CustomersService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private imageService: ImageService,
    private outilService: OutilService, private subheader: SubheaderService) {
  }

  ngOnInit() {
    this.user = this.userService.getCrrentUser();
    this.initForm();
    this.InitSubheader();
    this.headerLogo = this.getLogo();
  }

  onSelectFile(event) {
    this.selectedFile = event.target.files[event.target.files.length - 1] as File;
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  initForm() {
    this.orphelinForm = this.fb.group({
      prenomorp: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ])
      ],
      nomorp: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ])
      ],
      sexeorp: ['',
        Validators.compose([
          Validators.required
        ])
      ],
      datenaissorp: ['',
        Validators.compose([
          Validators.required
        ])],
      situationorp: ['',
        Validators.compose([
          Validators.required
        ])
      ],
      adresseorp: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ])
      ],
      infossuporp: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ])
      ],
      prenomtut: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ])
      ],
      nomtut: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ])
      ],
      sexetut: ['',
        Validators.compose([
          Validators.required
        ])
      ],
      adressetut: ['',
        Validators.compose([
          Validators.required
        ])
      ],
      telephonetut: ['',
        Validators.compose([
          Validators.required
        ])
      ],
      cnitut: ['',
        Validators.compose([
          Validators.required,
        ])
      ],
      emailtut: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ])
      ],
    });
  }

  ngAfterViewInit(): void {
    // Initialize form wizard
    this.wizard = new KTWizard(this.el.nativeElement, {
      startStep: 1
    });

    // Validation before going to next page
    this.wizard.on('beforeNext', (wizardObj) => {
      // https://angular.io/guide/forms
      // https://angular.io/guide/form-validation

      // validate the form and use below function to stop the wizard's step
      // wizardObj.stop();
    });

    // Change event
    this.wizard.on('change', () => {
      setTimeout(() => {
        KTUtil.scrollTop();
      }, 500);
    });
  }

  submit(param: any) {
    let infotuteur =
    {
      prenom: this.strUcFirst(param.prenomtut),
      nom: this.strUcFirst(param.nomtut),
      telephone: param.telephonetut,
      sexe: this.strUcFirst(param.sexetut),
      cni: param.cnitut,
      email: param.emailtut,
      adresse: this.strUcFirst(param.adressetut)
    }
    //Ajout orphelin
    this.tuteurService.save(infotuteur)
      .subscribe((tut) => {
        if (tut) {
          console.log(tut.tuteur)
          this.formData.set('file', this.selectedFile, this.selectedFile.name);
          console.log(this.formData.get('file'));
          this.imageService.uploadImage(this.formData).subscribe(
            res => {
              this.imageSrc = res;
              console.log("Image source" + this.imageSrc + "ghhgh");
          
              let infoorphelin =
              {
                prenom: this.strUcFirst(param.prenomorp),
                nom: this.strUcFirst(param.nomorp),
                datenaissance: param.datenaissorp,
                sexe: param.sexeorp,
                situation: param.situationorp,
                infossup: this.strUcFirst(param.infossuporp),
                adresse: this.strUcFirst(param.adresseorp),
                usercreateur: this.user,
                photo: this.imageSrc,
                tuteur: tut.tuteur
              }

              this.orphelinService.save(infoorphelin)
              .subscribe(data => {
  
                if (data) {
                  console.log(" cool orphelin ajout");
                  const modalRef = this.modalService.open(DialogAddorphelinComponent, { size: 'sm' });
                  modalRef.result.then(() => this.customerService.fetch(), () => {
                    location.reload();
                  });
                }
                else {
                  console.log("Erreur pas cool orphelin ajout");
                  this.openDialog("", "Ajout pas effectué");
                }
  
              });

            }
          );
         
        }
        else {
          console.log("Erreur pas cool tuteur ajout");
          this.openDialog("", "Ajout pas effectué");
        }

      });
  }

  // Nouvelle méthode pour les chaînes de caractères
  strUcFirst(a) {
    return (a + '').charAt(0).toUpperCase() + a.substr(1);
  }

  InitSubheader() {
    setTimeout(() => {
      this.subheader.setTitle('Ajout orphelin');
    }, 1);
  }

  private getLogo() {
    return './assets/media/logos/logo-1.png';
  }

  verif_number(champ) {
    this.outilService.verif_number(champ);
  }

  verif_float(champ) {
    this.outilService.verif_float(champ);
  }

  onSubmit() {
    this.submitted = true;
  }

  ngOnDestroy() {
    this.wizard = undefined;
  }

  reLoad() {
    window.location.reload();
  }

  openDialog(name: string, rapport: string): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '280px',
      data: { name: name, rapport: rapport },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.animalSubject.next(result);
      }
    });
  }

  transform(value: string) {
    var datePipe = new DatePipe("en-US");
    value = datePipe.transform(value, 'dd/MM/yyyy');
    return value;
  }

  private getTagsHtml(tagName: keyof HTMLElementTagNameMap): string {
    const htmlStr: string[] = [];
    const elements = document.getElementsByTagName(tagName);
    for (let idx = 0; idx < elements.length; idx++) {
      htmlStr.push(elements[idx].outerHTML);
    }

    return htmlStr.join('\r\n');
  }

  print(): void {
    let dateenv = this.transform(this.transLoad.dateenvoi);
    let popupWin;
    // printContents = document.getElementById('print-section').innerHTML;
    const stylesHtml = this.getTagsHtml('style');
    const linksHtml = this.getTagsHtml('link');
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Reçu envoi ${this.transLoad.id}</title>
            ${linksHtml}
            ${stylesHtml}
            <style>
            html, body, h1, h2, h3, h4, p, img { margin: 0;} /* margin reset*/
            h1{font-size: 18pt; font-weight: 500; margin-bottom: 0.5cm;}
            h2{font-size: 16pt; font-weight: 500;}
            p{font-size: 12pt;}
            .gauche {
              position: absolute;
              left: 1%;
            }
            .droite {
              position: absolute;
              right: 1%;
            }      
            .itemss-group {
              border-style: solid;
              border-color: black;
              border-width: 1pt 1pt 1pt 1pt;
              border-radius: 5pt;
              padding: 3pt 3pt 3pt 3pt;
              margin: 85pt 9pt 80pt 9pt;
            }
            .items-group {
              border-style: solid;
              border-color: black;
              border-width: 1pt 1pt 1pt 1pt;
              border-radius: 5pt;
              padding: 3pt 3pt 3pt 3pt;
              margin: 9pt 4pt 9pt 4pt;
            }
            .logotipo {
              width: 6cm;
              height: 4cm;
              margin: -0.5cm;
            }
            
            .label { font-weight: 500;}
            
            .disclaimer, .address p {
              font-size: 10pt;
            }
            
            .signature-field {
              padding-bottom: 24pt;
              border-bottom: solid black 1pt;
            }
         }
      </style>
        </head>
        <body onload="window.print();window.close()"> 
          
        <div class="container-fluid" >
        <div class=" itemss-group">
    
            <div class="row no-gutters" style="padding:4px 7px 0px 7px;">
                <div class="col-xs-12 col-sm-3 col-md-3 col-lg-7 col-lg-offset-1" >
                    <ng-container><img alt="Logo" src="./assets/media/logos/logo-topay-recu.png" /></ng-container>
                </div>
                <div class="col-xs-12 col-sm-9 col-md-9 col-lg-2 col-lg-offset-1 text-center"  >
                <ng-container>
                <h5>Distribution</h5>
                <p>Reçu Agence</p>
            </ng-container>
                </div>
            </div>
     
            <div class="row no-gutters " >
                <div class="col-md item-group" >
                    <div class="row no-gutters " >
                        <div class="col-xs" style="padding:0px 0px 0px 20px;">
                            <div class="address">
                                <p>Agent</p>
                                <p>Date opération&nbsp;&nbsp;&nbsp;</p>
                            </div>
                        </div> 
                        <div class="col-sm " style="margin:0px 100px 0px 0px;">
                            <div class="address">
                                <p>:&nbsp;&nbsp;&nbsp;${this.user.prenom} ${this.user.nom} -
                                ${this.user.agence.adresse.quartier} , ${this.user.agence.adresse.commune}</p>
                                <p>:&nbsp;&nbsp;&nbsp;${dateenv}<br></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md item-group">
                    <div class="address">
                        <p>N° transaction : ${this.transLoad.id}</p>
                        <p>Opération&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : Envoi</p>
                        </div>
                </div>
            </div>
            <div class="row no-gutters ">
                <div class="col-sm  items-group" style="padding:7px;">
                    <h6><u>Expéditeur</u></h6>
                    <div class="row no-gutters ">
                        <div class="col-xs" >
                            <div class="address">
                                <p>Pays</p>
                                <p>Prénom</p>
                                <p>Nom</p>
                                <p>Téléphone&nbsp;&nbsp;&nbsp;<br><br></p>
                            </div>
                        </div>
                        <div class="col-sm ">
                            <div class="address">
                                <p>:&nbsp;&nbsp;&nbsp;Sénégal</p>
                                <p>:&nbsp;&nbsp;&nbsp;${this.transLoad.prenomexp}</p>
                                <p>:&nbsp;&nbsp;&nbsp;${this.transLoad.nomexp}</p>
                                <p>:&nbsp;&nbsp;&nbsp;${this.transLoad.numexp}<br></p>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div class="col-sm  items-group" style="padding:7px;" >
                    <h6><u>Bénéficiaire</u></h6>
                    <div class="row no-gutters " >
                        <div class="col-xs">
                            <div class="address">
                                <p>Pays</p>
                                <p>Prénom&nbsp;&nbsp;&nbsp;</p>
                                <p>Nom</p>
                            </div>
                        </div>
                        <div class="col-sm ">
                            <div class="address">
                                <p>:&nbsp;&nbsp;&nbsp;Sénégal</p>
                                <p>:&nbsp;&nbsp;&nbsp;${this.transLoad.prenomdest}</p>
                                <p>:&nbsp;&nbsp;&nbsp;${this.transLoad.nomdest}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm  items-group" style="padding:7px;">
                    <h6><u>Détails</u></h6>
                    <div class="row no-gutters ">
                        <div class="col-xs">
                            <div class="address">
                                <p>Date & heure</p>
                                <p>Montant envoyé&nbsp;&nbsp;&nbsp;</p>
                                <p>Frais</p>
                                <p>Montant total<br><br></p>
                            </div>
                        </div>
                        <div class="col-sm ">
                            <div class="address">
                                <p>:&nbsp;&nbsp;&nbsp;${dateenv}</p>
                                <p>:&nbsp;&nbsp;&nbsp;${this.transLoad.montant}</p>
                                <p>:&nbsp;&nbsp;&nbsp;${this.transLoad.frais}</p>
                                <p>:&nbsp;&nbsp;&nbsp;${this.transLoad.montant + this.transLoad.frais} Fcfa</p><br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="row no-gutters ">
                <div class="col  items-group">
                    <p class="text-justify"
                        style="padding:5px;font-family: verdana; font-size:10px; color: rgb(15, 15, 15)">Si
                        vous choisissez de communiquer votre numéro de téléphone, vous consentez
                        expressement à recevoir des messages commerciaux via les moyens de communication, à etre notifier
                        par SMS du paiement du transfert et à supporter à votre seule charge les couts éventuels
                    </p>
                </div>
            </div>
    
            <div class="row no-gutters ">
                <div class="col-md-7 items-group">
                    <p style="padding:5px;font-family: verdana; font-size:10px; color: rgb(15, 15, 15)">En signant ce
                        formulaire
                        je :
                        <br>1-Consens expressement au tranfert de mes données personnelles mentionnées ci-dessus afin de
                        me fournir le service de transfert d'argent et d'entreprendre les actions additionnelles de
                        protection de données décrites dans le paragraphe
                        <br>2-Consens expressement à faire l'objet d'activités de marketing et de communication ciblées
                        <br>3-Confirme que les informations fournies sont correctes et que j'ai lu et accepter les termes
                        et conditions du service ainsi que les termes et conditions du programme de fidelité s'il ya lieu
                    </p>
                </div>
    
                <div class="col-sm items-group" style="padding:7px;">
                    <h6><u>Signature du client</u></h6> 
                </div>
                <div class="col-sm items-group" style="padding:7px;" >
                    <h6><u>Signature de l'agent</u></h6>
                </div>
            </div>
    
        </div>
        </div>
        <div class="row no-gutters">
            <div class="col">
                <p class="disclaimer signature-field">
                </p>
            </div>
        </div>
        
        <div class="container-fluid" >
        <div class=" itemss-group">
    
            <div class="row no-gutters" style="padding:4px 7px 0px 7px;">
                <div class="col-xs-12 col-sm-3 col-md-3 col-lg-7 col-lg-offset-1" >
                    <ng-container><img alt="Logo" src="./assets/media/logos/logo-topay-recu.png" /></ng-container>
                </div>
                <div class="col-xs-12 col-sm-9 col-md-9 col-lg-2 col-lg-offset-1 text-center"  >
                <ng-container>
                <h5>Distribution</h5>
                <p>Reçu Client</p>
            </ng-container>
                </div>
            </div>
     
            <div class="row no-gutters " >
                <div class="col-md item-group" >
                    <div class="row no-gutters " >
                        <div class="col-xs" style="padding:0px 0px 0px 20px;">
                            <div class="address">
                                <p>Agent</p>
                                <p>Date opération&nbsp;&nbsp;&nbsp;</p>
                            </div>
                        </div> 
                        <div class="col-sm " style="margin:0px 100px 0px 0px;">
                            <div class="address">
                                <p>:&nbsp;&nbsp;&nbsp;${this.user.prenom} ${this.user.nom} -
                                ${this.user.agence.adresse.quartier} , ${this.user.agence.adresse.commune}</p>
                                <p>:&nbsp;&nbsp;&nbsp;dggfghfhff<br></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md item-group">
                    <div class="address">
                        <p>N° transaction : ${this.transLoad.id}</p>
                        <p>Opération&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : Envoi</p>
                        </div>
                </div>
            </div>
            <div class="row no-gutters ">
                <div class="col-sm  items-group" style="padding:7px;">
                    <h6><u>Expéditeur</u></h6>
                    <div class="row no-gutters ">
                        <div class="col-xs" >
                            <div class="address">
                                <p>Prénom</p>
                                <p>Nom</p>
                                <p>Téléphone&nbsp;&nbsp;&nbsp;<br><br></p>
                            </div>
                        </div>
                        <div class="col-sm ">
                            <div class="address">
                                <p>:&nbsp;&nbsp;&nbsp;${this.transLoad.prenomexp}</p>
                                <p>:&nbsp;&nbsp;&nbsp;${this.transLoad.nomexp}</p>
                                <p>:&nbsp;&nbsp;&nbsp;${this.transLoad.numexp}<br></p>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div class="col-sm  items-group" style="padding:7px;" >
                    <h6><u>Bénéficiaire</u></h6>
                    <div class="row no-gutters " >
                        <div class="col-xs">
                            <div class="address">
                                <p>Prénom&nbsp;&nbsp;&nbsp;</p>
                                <p>Nom</p>
                            </div>
                        </div>
                        <div class="col-sm ">
                            <div class="address">
                                <p>:&nbsp;&nbsp;&nbsp;${this.transLoad.prenomdest}</p>
                                <p>:&nbsp;&nbsp;&nbsp;${this.transLoad.nomdest}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm  items-group" style="padding:7px;">
                    <h6><u>Détails</u></h6>
                    <div class="row no-gutters ">
                        <div class="col-xs">
                            <div class="address">
                                <p>Date & heure</p>
                                <p>Montant envoyé&nbsp;&nbsp;&nbsp;</p>
                                <p>Frais</p>
                                <p>Montant total<br><br></p>
                            </div>
                        </div>
                        <div class="col-sm ">
                            <div class="address">
                                <p>:&nbsp;&nbsp;&nbsp;15/03/2012</p>
                                <p>:&nbsp;&nbsp;&nbsp;${this.transLoad.montant}</p>
                                <p>:&nbsp;&nbsp;&nbsp;${this.transLoad.frais}</p>
                                <p>:&nbsp;&nbsp;&nbsp;${this.transLoad.montant + this.transLoad.frais} Fcfa</p><br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="row no-gutters ">
                <div class="col  items-group">
                    <p class="text-justify"
                        style="padding:5px;font-family: verdana; font-size:10px; color: rgb(15, 15, 15)">Si
                        vous choisissez de communiquer votre numéro de téléphone, vous consentez
                        expressement à recevoir des messages commerciaux via les moyens de communication, à etre notifier
                        par SMS du paiement du transfert et à supporter à votre seule charge les couts éventuels
                    </p>
                </div>
            </div>
    
            <div class="row no-gutters ">
                <div class="col-md-7 items-group">
                    <p style="padding:5px;font-family: verdana; font-size:10px; color: rgb(15, 15, 15)">En signant ce
                        formulaire
                        je :
                        <br>1-Consens expressement au tranfert de mes données personnelles mentionnées ci-dessus afin de
                        me fournir le service de transfert d'argent et d'entreprendre les actions additionnelles de
                        protection de données décrites dans le paragraphe
                        <br>2-Consens expressement à faire l'objet d'activités de marketing et de communication ciblées
                        <br>3-Confirme que les informations fournies sont correctes et que j'ai lu et accepter les termes
                        et conditions du service ainsi que les termes et conditions du programme de fidelité s'il ya lieu
                    </p>
                </div>
    
                <div class="col-sm items-group" style="padding:7px;">
                    <h6><u>Signature du client</u></h6> 
                </div>
                <div class="col-sm items-group" style="padding:7px;" >
                    <h6><u>Signature de l'agent</u></h6>
                </div>
            </div>
    
        </div>
        </div>

        </body>
      </html>`
    );
    popupWin.document.close();
  }

}