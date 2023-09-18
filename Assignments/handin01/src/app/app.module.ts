import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddCreditCardComponent } from './add-credit-card/add-credit-card.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CreditCardDetailsComponent } from './credit-card-details/credit-card-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddCreditCardComponent,
    TransactionsComponent,
    CreditCardDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
