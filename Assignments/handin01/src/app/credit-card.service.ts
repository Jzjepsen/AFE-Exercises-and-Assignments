import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  private apiEndpoint = 'http://localhost:3001/cards';

  constructor(private http: HttpClient) { }

  addCard(cardData: any) {
    return this.http.post(this.apiEndpoint, cardData);
  }
}
