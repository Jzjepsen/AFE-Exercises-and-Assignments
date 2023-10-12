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
import { TransactionsService } from './services/transactions.service';
import { TransactionListComponent, ConfirmDialogComponent } from './transactions/transaction-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ExpirationDatePipe } from './credit-card-details/expiration-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddCreditCardComponent,
    TransactionsOverviewComponent,
    CreditCardDetailsComponent,
    ExpirationDatePipe,
    TransactionAddComponent,
    NavigationBarComponent,
    TransactionListComponent,
    TransactionListComponent,
    ConfirmDialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [
    CreditCardService,
    TransactionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
