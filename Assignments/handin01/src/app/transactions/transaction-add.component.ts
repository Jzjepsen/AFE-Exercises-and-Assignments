import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction, CreditCard } from '../transactions/transactions-overview.component';

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.css']
})
export class TransactionAddComponent implements OnInit {

  transactionForm: FormGroup;

  @Output() addTransaction: EventEmitter<Transaction> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.transactionForm = this.fb.group({
      description: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
      currency: ['', Validators.required],
      comment: [''],
      creditCard: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.transactionForm.valid) {
      // Assuming you're generating a unique UID somehow, for now, I'll use a placeholder
      const uid = this.generateUID();
  
      const newTransaction = new Transaction(
        this.transactionForm.value.creditCard, // card_number
        uid, // uid
        this.transactionForm.value.amount, // amount
        this.transactionForm.value.comment, // comment
        Date.now(), // date (current time in milliseconds since 1970)
        this.transactionForm.value.currency // currency
      );
  
      this.addTransaction.emit(newTransaction);
      this.transactionForm.reset();
    }
  }
  
  // Placeholder for UID generation - replace with your own logic
  generateUID(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
  
}
