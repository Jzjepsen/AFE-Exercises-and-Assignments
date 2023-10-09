import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddCreditCardComponent } from './add-credit-card/add-credit-card.component';
import { CreditCardDetailsComponent } from './credit-card-details/credit-card-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TransactionAddComponent } from './transactions/transaction-add.component';
import { Transaction, TransactionsOverviewComponent } from './transactions/transactions-overview.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component'
import { CreditCardService } from './services/credit-card.service';
import { FormsModule } from '@angular/forms';
import { TransactionListComponent } from './transactions/transaction-list.component';
import { TransactionsService } from './services/transactions.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddCreditCardComponent,
    TransactionsOverviewComponent,
    CreditCardDetailsComponent,
    TransactionAddComponent,
    NavigationBarComponent,
    TransactionListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    CreditCardService,
    TransactionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
