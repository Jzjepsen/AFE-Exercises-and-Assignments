import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';  
import { AddCreditCardComponent } from './add-credit-card/add-credit-card.component';  
import { TransactionsComponent } from './transactions/transactions.component'; 
import { CreditCardDetailsComponent } from './credit-card-details/credit-card-details.component';  



const routes: Routes = [  
  { path: '', redirectTo: '/home', pathMatch: 'full' },  
  { path: 'home', component: HomeComponent },  
  { path: 'add-credit-card', component: AddCreditCardComponent },  
  { path: 'transactions', component: TransactionsComponent },
  { path: 'card-details/:id', component: CreditCardDetailsComponent },  
];  


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


