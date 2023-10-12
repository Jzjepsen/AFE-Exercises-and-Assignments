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
  ) { }

  creditCardNumbers: number[] = [];

  ngOnInit(): void {
    this.transactionsService.getTransactions().subscribe(
      (transactions) => {
        this.transactions = transactions;
        // Populate filteredTransactions with all transactions initially  
        this.filteredTransactions = [...this.transactions];
        // Create a unique list of credit card numbers  
        this.creditCardNumbers = [...new Set(transactions.map(transaction => transaction.card_number))];
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


  filterInput?: number;
  filterSelect?: number;

  applyFilter(): void {
    if (this.filterInput !== undefined) {
      this.filter = this.filterInput;
      console.log("Filter: ", this.filter)
    } else if (this.filterSelect !== undefined) {
      this.filter = this.filterSelect;
      console.log("Filter: ", this.filter)
    } else {
      this.filter = undefined;
      console.log("Filter: ", this.filter)
    }

    this.filteredTransactions = this.filter !== undefined
      ? this.transactions.filter(transaction => transaction.card_number === this.filter)
      : this.transactions;
  }

  resetFilter(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement.selectedIndex === 0) {
      this.filterSelect = undefined;
      this.applyFilter();
    }
  }



}
