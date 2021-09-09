import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, delay, finalize, tap } from 'rxjs/operators';
import { CustomersService } from 'src/app/modules/e-commerce/_services';

@Component({
  selector: 'app-dialog-adduser',
  templateUrl: './dialog-adduser.component.html',
  styleUrls: ['./dialog-adduser.component.scss']
})
export class DialogAdduserComponent implements OnInit, OnDestroy {
  @Input() info: any;
  isLoading = false;
  //infoo:any=this.info;
  subscriptions: Subscription[] = [];
  datePipeString : string;
  heurePipeString : string;
  constructor(private customersService: CustomersService, private datePipe: DatePipe,public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  deleteCustomer() {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
