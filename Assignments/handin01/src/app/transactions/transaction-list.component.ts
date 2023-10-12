import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Transaction } from '../transactions/transactions-overview.component';
import { TransactionsService } from '../services/transactions.service';
import { MatDialog } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


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

  constructor(private transactionsService: TransactionsService, public dialog: MatDialog) { }

  uniqueCardNumbers: number[] = [];

  ngOnInit(): void {
    this.uniqueCardNumbers = [...new Set(this.transactions.map(item => item.card_number))];
    this.applyFilter();
  }

  ngOnChanges(): void {
    this.applyFilter();
  }

  applyFilter(filterValue?: string): void {
    if (filterValue) {
      this.filteredTransactions = this.transactions.filter(transaction =>
        transaction.card_number?.toString() === filterValue
      );
    } else {
      this.filteredTransactions = this.transactions;
    }
  }


  onDelete(transaction: Transaction): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: transaction
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.transactionsService.deleteTransaction(transaction.uid).subscribe(
          response => {
            console.log("Transaction deleted successfully");
            this.transactions = this.transactions.filter(t => t.uid !== transaction.uid);
            this.filteredTransactions = this.filteredTransactions.filter(t => t.uid !== transaction.uid);
          },
          error => {
            console.error("Error deleting transaction", error);
          }
        );
      }
    });
  }

}


@Component({
  selector: 'app-confirm-dialog',
  template: `  
    <h1 mat-dialog-title>Are you sure?</h1>  
    <div mat-dialog-content>  
      <p>You are about to delete the following transaction:</p>  
      <p>Card Number: {{data.card_number}}</p>  
      <p>Amount: {{data.amount}}</p>  
      <p>Currency: {{data.currency}}</p>  
      <p>Comment: {{data.comment}}</p>  
      <p>Date: {{data.date}}</p>  
    </div>  
    <div mat-dialog-actions>  
      <button mat-button [mat-dialog-close]="true">Yes</button>  
      <button mat-button [mat-dialog-close]="false">No</button>  
    </div>  
  `,
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Transaction) { }
}  