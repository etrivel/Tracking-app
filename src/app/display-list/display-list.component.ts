import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { event } from 'jquery';
import { userObj } from '../interface/Object';
import { MatTableDataSource } from '@angular/material/table';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-display-list',
  templateUrl: './display-list.component.html',
  styleUrls: ['./display-list.component.css']
})
export class DisplayListComponent implements OnInit  {
// dtOptions: DataTables.Settings = {};
// title = 'datatables';
userList:userObj [] = [];
user1List :userObj[] = [];
dataSource : any;
sendAmount:any=0;
currentDate = new Date();
pageSizeArray = [1,2,3] ;
page = 1;
pageSize = 1;
RecieveAmount:any=0;
[x: string]: any;
userSum:any;
i:any;
totalAmt:any;

grand:any=0;
  constructor(private ap:AppComponent) {
    this.userList =[];

  this.ap.bank = "Home";
  this.ap.hi = false;

    
    
  
   }
   sendAmount1 = 0;
  ngOnInit(): void {

   //  this.list = this.storage.getItem("token");
  //  this.list.getItem("token");
   // this.list.push("token");
   this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5,
    processing: true
  };

   const records =localStorage.getItem('userList');
   if(records!==null){
     this.userList = JSON.parse(records);
     this.user1List = JSON.parse(records);
     this.userList= this.user1List.reverse();
     }
     
  //  let total =0;
  //   this.userList.forEach((item =>{
  //      total = total + item.SendedAmount?;
  //   });
  //   console.log(total);
  this.userSum=localStorage.getItem("Amount");
   this.totalAmt = this.userList.reduce((total,item)=>{
    this.grand=  +(this.grand as number) + +(item.SendedAmount as number) + +(item.RecievedAmount as number);
     this.totalAmt=+(total as number) + +(item.SendedAmount as number) - +(item.RecievedAmount as number);
     this.sendAmount=+(this.sendAmount as number) + +(item.SendedAmount as number);
     this.RecieveAmount=+(this.sendAmount as number)-+( this.totalAmt);
     this.sendAmount1 = this.sendAmount;
     return this.totalAmt;
 },0);
 this.i=this.userSum-this.totalAmt;
 console.log(this.totalAmt);
 console.log("i value"+this.i);

    
  }
  k=0;
  applyFilter(filterValue: any ) {
    if(filterValue.value == ''){
      this.userList = this.user1List;
    
    }
    else{
      if(filterValue != '' && (isNaN(filterValue.value)) ){
        this.userList =  this.user1List.filter(i => i.ReasonToSend?.toLowerCase().includes(filterValue?.value.toLowerCase()));
       
      }
    
    else{
      console.log("else : ",(isNaN(filterValue.value)))
      this.userList =  this.user1List.filter(i => i.date?.toString().includes(filterValue.value));
    }
    }
    
 
  }
    

  remove(id: any){
    const  oldRecords = localStorage.getItem('userList');
    if (oldRecords !== null){
    const userList=JSON.parse(oldRecords);
    userList.splice(userList.findIndex((a:any)=>a.userId == id),1);
  // userList.push(this.userObj);
    localStorage.setItem('userList',JSON.stringify(userList));
  }
    // this.list.forEach((value: any,index: any)=>{
    //   if(value == element)
    //   this.list.splice(index,1);
    
    //});
  
  
       
    const records =localStorage.getItem('userList');
    if(records!==null){
      this.userList = JSON.parse(records);
       this.totalAmt = this.userList.reduce((total,item)=>{
         this.grand=0;
        this.grand= +(total  as number)  + +(item.SendedAmount as number) + +(item.RecievedAmount as Number);
        this.totalAmt= +(total as number) + +(item.SendedAmount as number) - +(item.RecievedAmount as Number);
        this.sendAmount=0;
        this.sendAmount=+(this.grand as number) - +(item.RecievedAmount as number);
        this.sendAmount1 = this.sendAmount;
        this.RecieveAmount=0;
        this.RecieveAmount=+(this.grand as number) - +( this.sendAmount as number);
        return this.totalAmt;
     },0);
     console.log(this.totalAmt);
     this.i=this.userSum-this.totalAmt;
    }
  }
  // ngOnDestroy(): void {
  //   this.dtTrigger.unsubscribe();
  // }
}
