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
      creditCard: ['', Validators.required],
      date: [new Date().toISOString().split('T')[0], Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.transactionForm.valid) {
      // Assuming you're generating a unique UID somehow, for now, I'll use a placeholder
      const uid = this.generateUID();
  
      const newTransaction = new Transaction(
        this.transactionForm.value.creditCard,
        uid,
        this.transactionForm.value.amount,
        this.transactionForm.value.comment,
        new Date(this.transactionForm.value.date).getTime(), // Convert the selected date to milliseconds
        this.transactionForm.value.currency
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
