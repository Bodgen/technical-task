import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderComponent} from "./header/header.component";
import {HttpClientModule} from "@angular/common/http";
import { CurrencyCardComponent } from './currency-card/currency-card.component';
import { HomeComponent } from './home/home.component';
import { InputItemComponent } from './home/input-item/input-item.component';
import {RateDataService} from "./services/rate-data.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CurrencyCardComponent,
    HomeComponent,
    InputItemComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [RateDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
