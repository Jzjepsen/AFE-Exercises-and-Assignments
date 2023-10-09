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
import { TransactionsOverviewComponent } from './transactions/transactions-overview.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component'
import { CreditCardService } from './credit-card.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddCreditCardComponent,
    TransactionsOverviewComponent,
    CreditCardDetailsComponent,
    TransactionAddComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    CreditCardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
