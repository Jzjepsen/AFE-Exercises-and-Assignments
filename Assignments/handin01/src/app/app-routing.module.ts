import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddCreditCardComponent } from './add-credit-card/add-credit-card.component';
import { TransactionsOverviewComponent } from './transactions/transactions-overview.component';
import { CreditCardDetailsComponent } from './credit-card-details/credit-card-details.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'add-credit-card', component: AddCreditCardComponent },
  { path: 'transactions', component: TransactionsOverviewComponent },
  { path: 'card-details/:id', component: CreditCardDetailsComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })], // <-- enableTracing set to true for debugging
  exports: [RouterModule]
})
export class AppRoutingModule { }


