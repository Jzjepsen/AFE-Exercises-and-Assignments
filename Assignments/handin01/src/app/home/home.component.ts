import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  creditCardData: any;

  constructor(private http: HttpClient) {
    this.fetchData();
  }

  fetchData() {
    this.http.get<any[]>('http://localhost:3001/cards').subscribe(data => {
      this.creditCardData = data.map((card, index) => ({ id: index + 1, ...card }));
    });
  }
}    
