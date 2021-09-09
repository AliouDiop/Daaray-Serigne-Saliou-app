import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { TransactionService } from "src/app/services/transaction.service";

@Injectable()
export class TransactionResolver implements Resolve<any> {
  constructor(private transactionService: TransactionService) {}
  resolve(): Observable<any> {
    return this.transactionService.getTransactionList();
  }
}