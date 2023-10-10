import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction } from '../transactions/transactions-overview.component';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<any[]>('http://localhost:3001/transactions').pipe(
      map(responseData => {
        return responseData.map(item => new Transaction(
          item.credit_card.card_number.toString(),
          item.uid,
          parseFloat(item.amount.toFixed(2)),
          item.comment,
          item.date,
          item.currency
        ));
      })
    );
  }

  deleteTransaction(uid: string): Observable<any> {
    return this.http.delete(`http://localhost:3001/transactions/${uid}`);
  }

}
