import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../service/local-storage.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DefaultValueAccessor, FormBuilder,FormGroup,Validators } from '@angular/forms';
import { anotherObj } from '../interface/anotherObj';
import { AppComponent } from '../app.component';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-second-account',
  templateUrl: './second-account.component.html',
  styleUrls: ['./second-account.component.css']
})
export class SecondAccountComponent implements OnInit {

  initialValue:number=0;
  currentDate = new Date();
  testing : number=0;
  [x: string]: any;
  userList1:anotherObj [];
  user1List1 :anotherObj [] = [];
  userForm:FormGroup;
  userSum:any;
  i:any;
  sendAmount:any=0;
  RecieveAmount:any=0;
  totalAmt:any;
  anotherObj :anotherObj;

 
  grand:any=0;
  date1 : any;
  constructor(private router:Router,private ap:AppComponent,private fb:FormBuilder,private storage: LocalStorageService
    ) { 
this.date1 = this.currentDate.toLocaleDateString('en-GB', { timeZone: 'UTC' })
this.userList1 = [];
this.list=[];
   this.anotherObj =new anotherObj();
   this.anotherObj.RecievedAmount = 0;
   this.anotherObj.SendedAmount  =0 ;
   this.anotherObj.date = this.date1;
    this.userForm=this.fb.group({
      SendedAmount:[0,Validators.required],
      RecievedAmount:["0",Validators.required],
      ReasonToSend:['',Validators.required],
      date:[this.date1,Validators.required]
    })
    this.ap.bank = "Kotak";
    this.ap.hi = false;
  }

   inputF = document.getElementById("one");
   getAddingMoneyValue(){
     this.inputF?.append("0")
   }

  dtOptions: any = {};
  ngOnInit(): void {
    this.getAddingMoneyValue()
  console.log("this.date1  : ",this.date1)
  //  this.list = this.storage.getItem("token");
  //  this.list.getItem("token");
   // this.list.push("token");
   const records1 =localStorage.getItem('userList1');
   if(records1!==null){
     this.userList1 = JSON.parse(records1);
     this.user1List1 = JSON.parse(records1);
     this.userList1 = this.user1List1.reverse();
     }
  //  let total =0;
  //   this.userList1.forEach((item =>{
  //      total = total + item.SendedAmount?;
  //   });
  //   console.log(total);
  this.userSum=localStorage.getItem("Kotak");
   this.totalAmt = this.userList1.reduce((total,item)=>{
    this.grand=  +(this.grand as number) + +(item.SendedAmount as number) + +(item.RecievedAmount as number);
     this.totalAmt=+(total as number) + +(item.SendedAmount as number) - +(item.RecievedAmount as number);
     this.sendAmount=+(this.sendAmount as number) + +(item.SendedAmount as number);
     this.RecieveAmount=+(this.sendAmount as number)-+( this.totalAmt);
     return this.totalAmt;
 },0);
 this.i=this.userSum-this.totalAmt;
 console.log(this.totalAmt);
 console.log("i value"+this.i);


}
public signup(){
   localStorage.setItem('sigup',JSON.stringify(this.userList1) )
}
  public addItem(){
    // this.storage.setItem("token",this.userForm.value);
    // this.list.push("token");
    const latestId=this.getNewId();
    this.anotherObj.userId= latestId;
    const oldrecords1 = localStorage.getItem('userList1');
    if(oldrecords1 !== null){
      const userList1 = JSON.parse(oldrecords1);
      console.log(this.anotherObj);
      
      userList1.push(this.anotherObj);
      localStorage.setItem('userList1',JSON.stringify(userList1) ); 
      const totalAmt = this.userList1.reduce((total,item)=>{
        this.grand= +(this.grand  as number)  + +(item.SendedAmount as number) + +(item.RecievedAmount as number);
        this.totalAmt=+(total as number) + +(item.SendedAmount as number) - +(item.RecievedAmount as number);
        this.sendAmount=+(this.sendAmount as number) + +(item.SendedAmount as number);
        this.RecieveAmount=+(this.sendAmount as number)-+( this.totalAmt);
        return this.totalAmt;

     },0);
     this.i=this.userSum-this.totalAmt;
     console.log(totalAmt);
   
    }else{
      const userArr = [];
      userArr.push(this.anotherObj);
      localStorage.setItem('userList1',JSON.stringify(userArr) );
      console.log(this.anotherObj);
    }
 
    this.userForm.reset();
  }
  getNewId(){
    const oldrecords1 = localStorage.getItem('userList1');
    if(oldrecords1!==null){
      const userList1=JSON.parse(oldrecords1);
      return userList1.length +1;
    }else{
      return 1;
    }
  }
  sum(){
    const totalAmt = this.userList1.reduce((total,item)=>{
      return +(total as number) + +(item.SendedAmount as number);
   },0);
   console.log(totalAmt);
  }
reset(){
  this.userForm.reset();
}

  applyFilter(filterValue: any ) {
    if(filterValue.value == ''){
      this.userList1 = this.user1List1.reverse();
    }
    else{
      if(filterValue != '' && (isNaN(filterValue.value)) ){
        this.userList1 =  this.user1List1.filter( i=> i.ReasonToSend?.toLowerCase().includes(filterValue?.value.toLowerCase()));
      }
    
    else{
      console.log("else : ",(isNaN(filterValue.value)))
      this.userList1 =  this.user1List1.filter(i => i.date?.toString().includes(filterValue.value));
    }
    }
    
  }
remove(id: any){
  const  oldrecords1 = localStorage.getItem('userList1');
  if (oldrecords1 !== null){
  const userList1=JSON.parse(oldrecords1);
  userList1.splice(userList1.findIndex((a:any)=>a.userId == id),1);
// userList1.push(this.anotherObj);
  localStorage.setItem('userList1',JSON.stringify(userList1));
}
  // this.list.forEach((value: any,index: any)=>{
  //   if(value == element)
  //   this.list.splice(index,1);
  
  //});


     
  const records1 =localStorage.getItem('userList1');
  if(records1!==null){
    this.userList1 = JSON.parse(records1);
     this.totalAmt = this.userList1.reduce((total,item)=>{
       this.grand=0;
      this.grand= +(total  as number)  + +(item.SendedAmount as number) + +(item.RecievedAmount as Number);
      this.totalAmt= +(total as number) + +(item.SendedAmount as number) - +(item.RecievedAmount as Number);
      this.sendAmount=0;
      this.sendAmount=+(this.grand as number) - +(item.RecievedAmount as number);
      this.RecieveAmount=0;
      this.RecieveAmount=+(this.grand as number) - +( this.sendAmount as number);
      return this.totalAmt;
   },0);
   console.log(this.totalAmt);
   this.i=this.userSum-this.totalAmt;
  }
 }
 w = "bank"
 fileName= this.w+'.xlsx';  
 
 exportexcel(): void
   {
     /* pass here the table id */
     let element = document.getElementById('excel-table');
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element,{raw:true});
  
 
     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
     /* save to file */  
     XLSX.writeFile(wb, this.fileName);
 
  
   }
}

  





