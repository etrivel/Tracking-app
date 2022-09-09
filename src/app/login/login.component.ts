import { Component, OnInit } from '@angular/core';
import { userObj } from '../interface/Object';
import { AppComponent } from '../app.component';
import { AddingMoneyComponent } from '../adding-money/adding-money.component';
import { RecievingMoneyComponent } from '../recieving-money/recieving-money.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Credentials = '';

  // userSignup : userSignup [] = [];
  touched = true;
  isLogin1 = false;
 userName = "vetri";
 Password = "vetri";
  constructor(private ap:AppComponent,private ac:AddingMoneyComponent,private rc:RecievingMoneyComponent
    ) { 
    this.ap.bank = "Login";
    // this.rc.isLogin = this.isLogin1;

    console.log("userLogin :",this.isLogin1)
  
  }
  
  ngOnInit(): void {
    localStorage.setItem("UserName",this.userName);
    localStorage.setItem("Password",this.Password);

  }
  
  
  public recieveMoney(userName1:any,Password1:any){
    if(this.userName == userName1.value && this.Password == Password1.value){
  //   localStorage.setItem("UserName",userName1.value);
  // localStorage.setItem("Password",Password1.value);
  console.log("Success");
  this.isLogin1 = true;
  // this.rc.isLogin = this.isLogin1;
  localStorage.setItem('isLogin',String(true))
  
    }else{
      this.isLogin1 = false;
       localStorage.setItem('isLogin',String(false))
      this.Credentials = "Invalid Credentials";
      console.log("false")
      this.touched = true;
    }
// if(localStorage.getItem('isLogin') == "true"){
//     window.location.reload();
// }
  }
 
  select(){
    this.touched = false;
  }
}
