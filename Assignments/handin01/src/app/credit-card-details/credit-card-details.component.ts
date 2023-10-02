import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-card-details',
  templateUrl: './credit-card-details.component.html',
  styleUrls: ['./credit-card-details.component.css']
})
export class CreditCardDetailsComponent implements OnInit {
  card: any;
  transactions: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        const index = +params['id'] - 1;
        return this.http.get<any[]>('http://localhost:3001/cards').pipe(
          switchMap(cards => {
            const cardNumber = cards[index].card_number;
            console.log("card details: ", cardNumber)
            return this.http.get(`http://localhost:3001/cards/${cardNumber}`);
          })
        );
      })
    ).subscribe(card => {
      this.card = card;
      this.fetchTransactions();
    }, error => {
      console.error('Error fetching card details:', error);
    });
  }

  fetchTransactions() {
    this.http.get<any[]>('http://localhost:3001/transactions').subscribe(transactions => {
      this.transactions = transactions.filter(transaction => transaction.credit_card.card_number === this.card.card_number);
    }, error => {
      console.error('Error fetching transactions:', error);
    });
  }

  deleteCard() {
    if (window.confirm('Are you sure you want to delete this card?')) {
      this.http.delete(`http://localhost:3001/cards/${this.card.card_number}`).subscribe(() => {
        alert('Card deleted successfully!');
      }, error => {
        console.error('Error deleting card:', error);
      });
    }
  }
}  
