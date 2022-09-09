import { Component, OnInit } from '@angular/core';
import { anotherObj } from '../interface/anotherObj';
import { LocalStorageService } from '../service/local-storage.service';
import {userObj} from '../interface/Object'
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-recieving-money',
  templateUrl: './recieving-money.component.html',
  styleUrls: ['./recieving-money.component.css']
})
export class RecievingMoneyComponent implements OnInit {
  // isLogin = false;
constructor(private ap:AppComponent,private route:Router){
this.ap.bank = "Total";
this.ap.hi = false;
// if(localStorage.getItem('isLogin') == "true"){
//   setTimeout(() =>{
//       localStorage.setItem('isLogin',String(false))
//      this.route.navigate(['/LoginComponent'])
//     //  window.location.reload(); 
//   },10000);
// }
 
}
amount:any;
amount1:any;
    
  ngOnInit(): void {
  //   if(localStorage.getItem('isLogin') == "true"){
  //     this.isLogin =  true;
  // }
  //     else{
  //       this.isLogin =  false;
  //     }
  }
  

  public addItem(war:any){
    this.amount=war.value;
   localStorage.setItem("Amount",this.amount);
  }
  public recieveMoney(value1:any){
    this.amount1=value1.value;
    localStorage.setItem("Kotak",this.amount1); 
  }
  public purse(value2:any){
    this.amount1=value2.value;
    localStorage.setItem("HandOnMoney",this.amount1); 
  }
  remove(){
    localStorage.removeItem("Amount");
  }
  remove1(){
    localStorage.removeItem("Kotak");
  }
  remove2(){
    localStorage.removeItem("HandOnMoney")
  }
}
 
