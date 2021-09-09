import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, finalize, first, tap } from 'rxjs/operators';
import { OrphelinService } from 'src/app/services/orphelin.service';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/_metronic/core';
@Component({
  selector: 'app-edit-orphelin',
  templateUrl: './edit-orphelin.component.html',
  styleUrls: ['./edit-orphelin.component.scss'],
  // NOTE: For this example we are only providing current component, but probably
  // NOTE: you will w  ant to provide your main App Module
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class EditOrphelinComponent implements OnInit {
  @Input() id: number;
  isLoading$;
  orphelinLoad: any;
  orphelin: any;
  idi:number;
  orphelinForm: FormGroup;
  private subscriptions: Subscription[] = [];
  sexes = [
    { value: 'Masculin', viewValue: 'Masculin' },
    { value: 'Feminin', viewValue: 'Feminin' }
  ];
  situations = [
    { value: 'Ramassé', viewValue: 'Ramassé' },
    { value: 'Amené', viewValue: 'Amené' }
  ];
  constructor(
    private fb: FormBuilder, public modal: NgbActiveModal,
    private orphelinService: OrphelinService
  ) { }

  ngOnInit() {
    
  //  this.loadOrphelins();
    this.orphelinService.FindById(this.id).subscribe((devs) => {
      this.orphelinLoad = devs;
      console.log("ffgg"+ this.orphelinLoad.id);
      console.log("ffgg nom"+ this.orphelinLoad.nom);
    });
    this.orphelin=this.orphelinLoad;
    //console.log("ffgg2 nom"+ this.orphelin.nom);
    //this.isLoading$ = this.customersService.isLoading$;
    this.initForm();
    
  }

  initForm() {
    this.orphelinForm = this.fb.group({
      prenomorp: ["this.orphelinLoad.id",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ])
      ],
      nomorp: ["this.orphelinLoad.nom",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ])
      ],
      sexeorp: ["this.orphelinLoad.sexe",
        Validators.compose([
          Validators.required
        ])
      ],
      datenaissorp: ["this.orphelinLoad.datenaissance",
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
      prenomtut: ['this.orphelinLoad.tuteur.prenom',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ])
      ],
      nomtut: ['this.orphelinLoad.tuteur.nom',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ])
      ],
      sexetut: ['this.orphelinLoad.tuteur.sexe',
        Validators.compose([
          Validators.required
        ])
      ],
      adressetut: ['this.orphelinLoad.tuteur.adresse',
        Validators.compose([
          Validators.required
        ])
      ],
      telephonetut: ['this.orphelinLoad.tuteur.telephone',
        Validators.compose([
          Validators.required
        ])
      ],
      cnitut: ['this.orphelinLoad.tuteur.cni',
        Validators.compose([
          Validators.required,
        ])
      ],
      emailtut: ["this.orphelinLoad.tuteur.email",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ])
      ],
    });
  }

  save() {
  }

  loadOrphelins() {
    this.orphelinService.FindById(this.id).subscribe((devs) => {
      this.orphelinLoad = devs;
      console.log("ffgg"+ this.orphelinLoad.id);
    });
  }


}
