// tslint:disable:no-string-literal
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  GroupingState,
  PaginatorState,
  SortState,
  ICreateAction,
  IEditAction,
  IDeleteAction,
  IDeleteSelectedAction,
  IFetchSelectedAction,
  IUpdateStatusForSelectedAction,
  ISortView,
  IFilterView,
  IGroupingView,
  ISearchView,
} from 'src/app/_metronic/shared/crud-table';
import { CustomersService } from 'src/app/modules/e-commerce/_services';
import { Caissier, Transaction } from 'src/app/model/model';
import { ActivitesService } from 'src/app/services/activites.service';
import { ActivatedRoute } from '@angular/router';
import { SubheaderService } from 'src/app/_metronic/partials/layout';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdoptionService } from 'src/app/services/adoption.service';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/_service/user.service';
import { DetailuserComponent } from '../detailuser/detailuser.component';


@Component({
  selector: 'app-material-modal',
  template: ` <div class="col-xl-12">
  <div class="col-xl-12">
  <div class="col-xl-12">
    <br />
    <h3 mat-dialog-title >Confirmer la suppression</h3><br /><br />
    <div mat-dialog-content>
      <h5>Utilisateur</h5><br />
      <div class="row">
        <div class="col-xs">
          <div class="address">
            <p>ID</p>
            <p>Prénom&nbsp;&nbsp;&nbsp;</p>
            <p>Nom</p>
            <p>Téléphone</p>
            <p>Email</p>
          </div>
        </div>
        <div class="col-sm ">
          <div class="address">
            <p>:&nbsp;&nbsp;&nbsp;<b>{{ userLoad.id }}</b></p>
            <p>:&nbsp;&nbsp;&nbsp;<b>{{ userLoad.prenom}}</b></p>
            <p>:&nbsp;&nbsp;&nbsp;<b>{{ userLoad.nom }}</b></p>
            <p>:&nbsp;&nbsp;&nbsp;<b>{{ userLoad.telephone }}</b></p>
            <p>:&nbsp;&nbsp;&nbsp;<b>{{userLoad.email}}</b><br><br><br /></p>
          </div>
        </div>
      </div>
      
    </div>
      
    <div mat-dialog-actions>
    <div class="row">
      <div class="col-sm ">
      <button mat-button class="btn btn-sm btn-inline btn-light-danger" (click)="annuler()">&nbsp;&nbsp;Annuler&nbsp;&nbsp;</button>

      </div>
      <div class="col-sm ">
      <button mat-button class="btn btn-sm btn-inline btn-light-primary" (click)="onNoClick()" cdkFocusInitial>
      &nbsp;&nbsp;OK&nbsp;&nbsp;
      </button>
      </div>
    </div>
      
    </div> <br />
  </div>
</div>`,
})

export class ModalComponent {
  userLoad:any;
  dateadop: string;
  datenaiss: string;
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private userService: UsersService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.userService.FindById(this.data.id).subscribe((devs) => {
      this.userLoad = devs;
      console.log("hhjhj"+this.userLoad.id);
    });
  }

  onNoClick(): void {
    this.userLoad.isactive=false;
    this.userLoad.isdelete=true;
    this.userService.Update(this.userLoad).subscribe((devs) => {
      this.dialogRef.close();
      location.reload();
    });
    
  }

  annuler(): void {
    this.dialogRef.close();
  }
}
export interface DialogData {
  id: number;
  prenom: string;
  date: Date;
  nom: string;
}


@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.scss'],
})
export class ListuserComponent
  implements
  OnInit,
  OnDestroy,
  ICreateAction,
  IEditAction,
  IDeleteAction,
  IDeleteSelectedAction,
  IFetchSelectedAction,
  IUpdateStatusForSelectedAction,
  ISortView,
  IFilterView,
  IGroupingView,
  ISearchView,
  IFilterView {
  paginator: PaginatorState;
  sorting: SortState;
  grouping: GroupingState;
  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  id: number;
  secondModel;
  secondModell;
  user: Caissier;
  model2: Date;
  searchTerm: any;
  animalSubject = new BehaviorSubject<string>('');
  trans: any;
  datedebut = new FormControl();
  datefin = new FormControl();
  private subscriptions: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  listUsers: any[];
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    public customerService: CustomersService,
    private routes: ActivatedRoute,
    private userService: UsersService,
    public dialog: MatDialog,
    private activitesService: ActivitesService,
    private adoptionService: AdoptionService,
    private subheader: SubheaderService
  ) {
  }

  // angular lifecircle hooks
  ngOnInit(): void {
    this.filterForm();
    this.searchForm();
    this.loadAdoptions();
    this.InitSubheader();
    this.customerService.fetch();
    this.grouping = this.customerService.grouping;
    this.paginator = this.customerService.paginator;
    this.sorting = this.customerService.sorting;
    const sb = this.customerService.isLoading$.subscribe(res => this.isLoading = res);
    this.subscriptions.push(sb);
    this.user = this.userService.getCrrentUser();
    this.id = this.user.id;
    console.log("Transactionid" + this.id);
  }

  voirr() {
    console.log("fdgdfgfgfdg" + this.searchTerm);
  }

  InitSubheader() {
    setTimeout(() => {
      this.subheader.setTitle('Liste des utilisateurs');
    }, 1);
  }

  loadAdoptions() {
    /*this.adoptionService.getList().subscribe((data) => {
      this.listAdoptions = data;
      console.log("Transactionszzz" + this.listAdoptions);
    });*/
    this.listUsers = this.routes.snapshot.data.listusers;
    console.log("Transansjjkkjzzz" + this.listUsers);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  // filtration
  filterForm() {
    this.filterGroup = this.fb.group({
      status: [''],
      type: [''],
      searchTerm: [''],
    });
    this.subscriptions.push(
      this.filterGroup.controls.status.valueChanges.subscribe(() =>
        this.filter()
      )
    );
    this.subscriptions.push(
      this.filterGroup.controls.type.valueChanges.subscribe(() => this.filter())
    );
  }

  filter() {
    const filter = {};
    const status = this.filterGroup.get('status').value;
    if (status) {
      filter['status'] = status;
    }

    const type = this.filterGroup.get('type').value;
    if (type) {
      filter['type'] = type;
    }
    this.customerService.patchState({ filter });
  }

  // search
  searchForm() {
    this.searchGroup = this.fb.group({
      searchTerm: [''],
    });
    const searchEvent = this.searchGroup.controls.searchTerm.valueChanges
      .pipe(
        /*
      The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator,
      we are limiting the amount of server requests emitted to a maximum of one every 150ms
      */
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe((val) => this.search(val));
    this.subscriptions.push(searchEvent);
  }

  search(searchTerm: string) {
    this.customerService.patchState({ searchTerm });
  }

  // sorting
  sort(column: string) {
    const sorting = this.sorting;
    const isActiveColumn = sorting.column === column;
    if (!isActiveColumn) {
      sorting.column = column;
      sorting.direction = 'asc';
    } else {
      sorting.direction = sorting.direction === 'asc' ? 'desc' : 'asc';
    }
    this.customerService.patchState({ sorting });
  }

  // pagination
  paginate(paginator: PaginatorState) {
    this.customerService.patchState({ paginator });
  }

  // form actions
  create() {
    this.edit(undefined);
  }

  edit(id: number) {
  /*  const modalRef = this.modalService.open(EditAdoptionComponent, { size: 'xl' });
    modalRef.componentInstance.id = id;
    modalRef.result.then(() =>
      this.customerService.fetch(),
      () => { }
    );*/
  }

  supprimer(orp: any) {
    this.openDialog(orp.id,  orp.prenom, orp.nom,orp.datenaissance);
  }


  openDialog(id: number,prenom: string, nom: string,date: Date): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      //  width: '280px',
      data: { id: id, date: date, prenom:prenom, nom:nom },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.animalSubject.next(result);
      }
    });
  }

  voir(id: number) {
    const modalRef = this.modalService.open(DetailuserComponent, { size: 'xl' });
    modalRef.componentInstance.id = id;
    modalRef.result.then(() =>
      this.customerService.fetch(),
      () => { }
    );
  }

  editt(id: number, type: string) {
    /* let info =
     {
       id: id,
       type: type
     }
     const modalRef = this.modalService.open(Recu2TransactionComponent, { size: 'xl' });
     modalRef.componentInstance.info = info;
     modalRef.result.then(() =>
       this.customerService.fetch(),
       () => { }
     );*/
  }

  delete(id: number) {
    /*const modalRef = this.modalService.open(DeleteHistoriqueModalComponent);
    modalRef.componentInstance.id = id;
    modalRef.result.then(() => this.customerService.fetch(), () => { });*/
  }

  deleteSelected() {
    /* const modalRef = this.modalService.open(DeleteHistoriquesModalComponent);
     modalRef.componentInstance.ids = this.grouping.getSelectedRows();
     modalRef.result.then(() => this.customerService.fetch(), () => { });*/
  }

  updateStatusForSelected() {
    /*  const modalRef = this.modalService.open(UpdateHistoriquesStatusModalComponent);
      modalRef.componentInstance.ids = this.grouping.getSelectedRows();
      modalRef.result.then(() => this.customerService.fetch(), () => { });*/
  }

  fetchSelected() {
    /*const modalRef = this.modalService.open(FetchHistoriquesModalComponent);
    modalRef.componentInstance.ids = this.grouping.getSelectedRows();
    modalRef.result.then(() => this.customerService.fetch(), () => { });*/
  }


  /*loadTransactions() {
   // this.id=this.user.id;
    console.log("Tonszzz" + this.id);
    this.transactionService.getListByUserId(2).subscribe((data) => {
      this.listTransactions =  data;
      console.log("Transactionszzz" + this.listTransactions);
    });
    //this.transactionService.getListByUserId(this.user.id).subscribe((data) => {
  }*/
}
