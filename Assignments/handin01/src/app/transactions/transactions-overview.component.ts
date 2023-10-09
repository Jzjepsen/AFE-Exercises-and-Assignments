import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

export class CreditCard {
  constructor(
    public card_number: number,
    public csc_code: number,
    public cardholder_name: string,
    public expiration_date_month: number,
    public expiration_date_year: number,
    public issuer: string
  ) {}
}

export class Transaction {
  constructor(
    public card_number: number,
    public uid: string,
    public amount: number,
    public comment: string,
    public date: number,
    public currency: string
  ) {}
}

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions-overview.component.html',
  styleUrls: ['./transactions-overview.component.css'],
})
export class TransactionsOverviewComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient // Inject the HttpClient module
  ) {
    // Initialize the form group for transactions here...
  }

    ngOnInit(): void {
      // Fetch transactions from the API
      this.http.get<any[]>('http://localhost:3001/transactions').subscribe(
        (responseData) => {
          // Map the API data to the Transaction format
          this.transactions = responseData.map(item => new Transaction(
            item.credit_card.card_number,
            item.uid,
            item.amount,
            item.comment,
            item.date,
            item.currency
          ));
          console.log('Mapped Data:', this.transactions);
        },
        (error) => {
          console.error('Error fetching transactions:', error);
        }
      );
  }
  handleNewTransaction(newTransaction: Transaction): void {
    // Logic to handle the new transaction
    this.transactions.push(newTransaction);
    // ... send to server or any other logic you need.
  }
  
}
