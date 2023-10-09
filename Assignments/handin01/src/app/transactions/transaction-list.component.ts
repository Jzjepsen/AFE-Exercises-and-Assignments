import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Transaction } from '../transactions/transactions-overview.component';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
})
export class TransactionListComponent implements OnInit {
  @Input() transactions: Transaction[] = [];
  @Input() filter?: number;
  @Output() filterChange = new EventEmitter<number>();

  filteredTransactions: Transaction[] = [];

  constructor() { }

  ngOnInit(): void {
    this.applyFilter();
  }

  ngOnChanges(): void {
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.filter !== undefined && this.filter !== null) {
      this.filteredTransactions = this.transactions.filter(transaction =>
        transaction.card_number?.toString() === this.filter?.toString()
      );
    } else {
      this.filteredTransactions = this.transactions;
    }
  }
}
