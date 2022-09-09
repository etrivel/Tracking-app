import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddingMoneyComponent } from './adding-money/adding-money.component';
import { FormsModule,ReactiveFormsModule}   from '@angular/forms';
import { RecievingMoneyComponent } from './recieving-money/recieving-money.component';
import { DisplayListComponent } from './display-list/display-list.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { SecondAccountComponent } from './second-account/second-account.component';
import { HandsOnMoneyComponent } from './hands-on-money/hands-on-money.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [

  {path:'addingMoney',component:AddingMoneyComponent},
  {path:'recieveMoney',component:RecievingMoneyComponent},
  {path:'table',component:DisplayListComponent},
  {path:'calculator',component:CalculatorComponent},
  {path : 'anotherAccount',component:SecondAccountComponent},
  {path : 'HandsOnMoneyComponent', component:HandsOnMoneyComponent},
  {path : 'LoginComponent',component:LoginComponent},
  {path:'',component:DisplayListComponent},
  
];

@NgModule({
  imports: [ ReactiveFormsModule,FormsModule,RouterModule.forRoot(routes)],
  exports: [RouterModule,ReactiveFormsModule,FormsModule]
})
export class AppRoutingModule { }
