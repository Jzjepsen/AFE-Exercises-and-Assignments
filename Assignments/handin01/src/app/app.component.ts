import { Component } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
  
@Component({  
  selector: 'app-root',  
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.css']  
})  
export class AppComponent {  
  title = 'handin01';  
  creditCardData: any;  
  
  constructor(private http: HttpClient) {  
    this.fetchData();  
  }  
  
  fetchData() {  
    this.http.get('http://localhost:3001/cards').subscribe(data => {  
      this.creditCardData = data;  
    });  
  }  
}  
