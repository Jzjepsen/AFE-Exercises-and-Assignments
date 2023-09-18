import { Component, OnInit } from '@angular/core';  
import { ActivatedRoute } from '@angular/router';  
import { CREDIT_CARD_DATA } from 'hand-in-1-ver2023/credit-card-server/src/credit-card.data';

  
@Component({  
  selector: 'app-card-details',  
  templateUrl: './credit-card-details.component.html',  
  styleUrls: ['./credit-card-details.component.css']  
})  
export class CreditCardDetailsComponent{
    creditCardData = CREDIT_CARD_DATA; 
}  
