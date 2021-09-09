import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, finalize, first, tap } from 'rxjs/operators';
import { Customer } from 'src/app/modules/e-commerce/_models/customer.model';
import { CustomersService } from 'src/app/modules/e-commerce/_services';
import { DonsService } from 'src/app/services/dons.service';
import { OrphelinService } from 'src/app/services/orphelin.service';
import { CustomAdapter, CustomDateParserFormatter, getDateFromString } from 'src/app/_metronic/core';

const EMPTY_CUSTOMER: Customer = {
  id: undefined,
  firstName: '',
  lastName: '',
  email: '',
  userName: '',
  gender: 'Female',
  status: 2,
  dob: undefined,
  dateOfBbirth: '',
  ipAddress: '251.237.126.210',
  type: 2
};

const verticalDivider = {
  beforeCodeTitle: 'Vertical divider',
  htmlCode: `
<mat-divider [vertical]="true"></mat-divider>
`,
  tsCode: `
import {Component} from '@angular/core';\n
/**
* @title vertical divider
*/
@Component({
  selector: 'divider-vertical-example',
  templateUrl: 'divider-vertical-example.html',
  styleUrls: ['divider-vertical-example.css'],
})
export class DividerVerticalExample {}
`,
  cssCode: ``,
  viewCode: ``,
  isCodeVisible: false,
  isExampleExpanded: true,
};


@Component({
  selector: 'app-detaildons',
  templateUrl: './detaildons.component.html',
  styleUrls: ['./detaildons.component.scss'],
  //styleUrls: ['./edit-historique-modal.component.scss'],
  // NOTE: For this example we are only providing current component, but probably
  // NOTE: you will w  ant to provide your main App Module
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .mat-list-icon {
        color: rgba(0, 0, 0, 0.54);
      }
      .mat-toolbar > * + .mat-divider-vertical {
        margin-right: 2px;
      }
      .mat-toolbar > .mat-divider-vertical + * {
        margin-right: 24px;
        margin-left: -1px;
      }
      .encadrer-un-contenu{ 
        border-width: 1px; 
        border-style: solid; 
        border-color: #09C;
        padding: 5px;
       }
      .marge-contenu{ 
        margin-right: 100px;
        margin-left: 100px;
      }
    `,

  ],
})
export class DetaildonsComponent implements OnInit, OnDestroy {
  @Input() id: number;
  isLoading$;
  customer: Customer;
  formGroup: FormGroup;
  headerLogo: string;
  donLoad: any;
  datenaiss:any;
  user: any;
  agence: any;
  photo:string;
  envoi = false;
  dateentree:any;
  retrait = false;
  private subscriptions: Subscription[] = [];
  exampleVertical;
  date: string;
  datecreation: string;
  constructor(
    private customersService: CustomersService,
    private donService: DonsService,
    private datePipe: DatePipe,
    private fb: FormBuilder, public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {

    this.isLoading$ = this.customersService.isLoading$;
    this.loadCustomer();
    this.loadDons();
    
    this.headerLogo = this.getLogo();
    this.exampleVertical = verticalDivider;
  
  }

  loadCustomer() {
    if (!this.id) {
      this.customer = EMPTY_CUSTOMER;
      this.loadForm();
    } else {
      const sb = this.customersService.getItemById(this.id).pipe(
        first(),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          return of(EMPTY_CUSTOMER);
        })
      ).subscribe((customer: Customer) => {
        this.customer = customer;
        this.loadForm();
      });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      firstName: [this.customer.firstName, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      lastName: [this.customer.lastName, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      email: [this.customer.email, Validators.compose([Validators.required, Validators.email])],
      dob: [this.customer.dateOfBbirth, Validators.compose([Validators.nullValidator])],
      userName: [this.customer.userName, Validators.compose([Validators.required])],
      gender: [this.customer.gender, Validators.compose([Validators.required])],
      ipAddress: [this.customer.ipAddress],
      type: [this.customer.type, Validators.compose([Validators.required])]
    });
  }

  save() {
    this.prepareCustomer();
    if (this.customer.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  private getLogo() {
    return './assets/media/logos/logo-1.png';
  }

  edit() {
    const sbUpdate = this.customersService.update(this.customer).pipe(
      tap(() => {
        this.modal.close();
      }),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(this.customer);
      }),
    ).subscribe(res => this.customer = res);
    this.subscriptions.push(sbUpdate);
  }

  create() {
    const sbCreate = this.customersService.create(this.customer).pipe(
      tap(() => {
        this.modal.close();
      }),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(this.customer);
      }),
    ).subscribe((res: Customer) => this.customer = res);
    this.subscriptions.push(sbCreate);
  }

  private prepareCustomer() {
    const formData = this.formGroup.value;
    this.customer.dob = new Date(formData.dob);
    this.customer.email = formData.email;
    this.customer.firstName = formData.firstName;
    this.customer.dateOfBbirth = formData.dob;
    this.customer.ipAddress = formData.ipAddress;
    this.customer.lastName = formData.lastName;
    this.customer.type = +formData.type;
    this.customer.userName = formData.userName;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
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

  controlHasError(validation, controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }

  loadDons() {
    this.donService.FindById(this.id).subscribe((devs) => {
      this.donLoad = devs;
      this.date= this.datePipe.transform(this.donLoad.date,'dd-MM-yyyy');
      this.datecreation= this.datePipe.transform(this.donLoad.datecreation,'dd-MM-yyyy');
      this.photo=this.donLoad.photo;
    });
  }



  private getTagsHtml(tagName: keyof HTMLElementTagNameMap): string {
    const htmlStr: string[] = [];
    const elements = document.getElementsByTagName(tagName);
    for (let idx = 0; idx < elements.length; idx++) {
      htmlStr.push(elements[idx].outerHTML);
    }

    return htmlStr.join('\r\n');
  }
  
  print(id:number): void {
    //let dateenv = this.transform(this.transLoad.dateenvoi);
    let popupWin;
    let printContents = document.getElementById('component').innerHTML;
    // printContents = document.getElementById('print-section').innerHTML;
    const stylesHtml = this.getTagsHtml('style');
    const linksHtml = this.getTagsHtml('link');
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Fiche infos don ${id}</title>
            ${linksHtml}
            ${stylesHtml}
            <style>
            html, body, h1, h2, h3, h4, p, img { margin: 0;} /* margin reset*/
          /*  h1{font-size: 18pt; font-weight: 500; margin-bottom: 0.5cm;}
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
        ${printContents}
        </body>
      </html>`
    );
    popupWin.document.close();
  }


}


