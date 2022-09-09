import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap' ;

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddingMoneyComponent } from './adding-money/adding-money.component';
import { RecievingMoneyComponent } from './recieving-money/recieving-money.component';
import { DisplayListComponent } from './display-list/display-list.component';
import { DataTablesModule } from 'angular-datatables';
import { CalculatorComponent } from './calculator/calculator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchByNamePipe } from './search-by-name.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LoginComponent } from './login/login.component';
import { SecondAccountComponent } from './second-account/second-account.component';
import { HandsOnMoneyComponent } from './hands-on-money/hands-on-money.component';






@NgModule({
  declarations: [
    AppComponent,
    AddingMoneyComponent,
    RecievingMoneyComponent,
    DisplayListComponent,
    CalculatorComponent,
    SearchByNamePipe,
    LoginComponent,
    SecondAccountComponent,
    HandsOnMoneyComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    BrowserAnimationsModule,
    NgbModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  MatSidenavModule 

  ],
  providers: [LoginComponent,AddingMoneyComponent,RecievingMoneyComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
