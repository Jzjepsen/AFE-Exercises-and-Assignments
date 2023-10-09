import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionsService } from '../services/transactions.service';


export class CreditCard {
  constructor(
    public card_number: number,
    public csc_code: number,
    public cardholder_name: string,
    public expiration_date_month: number,
    public expiration_date_year: number,
    public issuer: string
  ) { }
}

export class Transaction {
  constructor(
    public card_number: number,
    public uid: string,
    public amount: number,
    public comment: string,
    public date: number,
    public currency: string
  ) { }
}

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions-overview.component.html',
  styleUrls: ['./transactions-overview.component.css'],
})
export class TransactionsOverviewComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  filter?: number;

  constructor(
    private fb: FormBuilder,
    private transactionsService: TransactionsService
  ) {  }

  ngOnInit(): void {
    this.transactionsService.getTransactions().subscribe(
      (transactions) => {
        this.transactions = transactions;
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  }

  handleNewTransaction(newTransaction: Transaction): void {
    // Logic to handle the new transaction
    this.transactions.push(newTransaction);
    // If you have some filtering logic, ensure you update the filtered list as well
    this.filteredTransactions = [...this.transactions];
    // ... send to server or any other logic you need.
  }
  

  applyFilter(): void {
    console.log('Filter Value:', this.filter);  // Add this line  

    if (this.filter !== undefined && this.filter !== null) {
      this.filteredTransactions = this.transactions.filter(transaction =>
        transaction.card_number?.toString() === this.filter?.toString()
      );
      console.log("Filtered Transactions:", this.filteredTransactions)  // Change this line  
    } else {
      this.filteredTransactions = this.transactions;
    }
  }
}
