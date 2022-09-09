import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../service/local-storage.service';
import {userObj} from '../interface/Object'
import { userSignup } from '../interface/signup';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DefaultValueAccessor, FormBuilder,FormGroup,Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { isInteger, isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { data } from 'jquery';

@Component({
  selector: 'app-adding-money',
  templateUrl: './adding-money.component.html',
  //template:'<h1>{{totalAmt}}</h1>',
  styleUrls: ['./adding-money.component.css']
})
export class AddingMoneyComponent implements OnInit {
  initialValue:number=0;
  currentDate = new Date();
  testing : number=0;
  [x: string]: any;
  userList:userObj [];
  user1List :userObj [] = [];
  userForm:FormGroup;
  userSum:any;
  i:any;
  sendAmount:any=0;
  RecieveAmount:any=0;
  totalAmt:any;
  userObj :userObj;
  userSignupObj: userSignup = new userSignup;
//  isLogin = false;
  grand:any=0;
  date1 : any;
  constructor(private modalService: NgbModal,private router:Router,private ap:AppComponent,private fb:FormBuilder,private storage: LocalStorageService
    ) { 
this.date1 = this.currentDate.toLocaleDateString('en-GB', { timeZone: 'GMT' })
// this.date1 = moment().format("DD/mm/yyyy")
this.userList = [];
this.list=[];
   this.userObj =new userObj();
   this.userObj.RecievedAmount = 0;
   this.userObj.SendedAmount =0 ;
   this.userObj.date = this.date1;
    this.userForm=this.fb.group({
      SendedAmount:[0,Validators.required],
      RecievedAmount:["0",Validators.required],
      ReasonToSend:['',Validators.required],
      date:[this.date1.toString,Validators.required]
    })
  
      this.ap.bank = "Canara";
      this.ap.hi = false;
    //   if(localStorage.getItem('isLogin') == "true"){
    //   setTimeout(() =>{
    //       localStorage.setItem('isLogin',String(false))
    //      window.location.reload();
    //   },30000);
    // }
     }
  
   inputF = document.getElementById("one");
   getAddingMoneyValue(){
     this.inputF?.append("0")
   }

  dtOptions: any = {};

  ngOnInit(): void { 
    console.log("ytext ")
// if(localStorage.getItem('isLogin') == "true"){
//     this.isLogin =  true;
// }
//     else{
//       this.isLogin =  false;
//     }
    // console.log("isLogoin : ",this.isLogin)
    this.getAddingMoneyValue()
  console.log("this.date1  : ",this.date1)
  console.log("month : ",this.currentDate.toLocaleDateString('en-GB', { timeZone: 'GMT' }).toLocaleLowerCase())
  //  this.list = this.storage.getItem("token");
  //  this.list.getItem("token");
   // this.list.push("token");
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
     return this.totalAmt;
 },0);

 this.i=this.userSum-this.totalAmt;
 console.log(this.totalAmt);
 console.log("i value"+this.i);
   
}
public signup(){
   localStorage.setItem('sigup',JSON.stringify(this.userList) )
}

  public addItem(){
    // this.storage.setItem("token",this.userForm.value);
    // this.list.push("token");
    const latestId=this.getNewId();
    this.userObj.userId= latestId;
    const oldRecords = localStorage.getItem('userList');
    if(oldRecords !== null){
      const userList = JSON.parse(oldRecords);
      console.log(this.userObj);
      
      userList.push(this.userObj);
      localStorage.setItem('userList',JSON.stringify(userList) ); 
      const totalAmt = this.userList.reduce((total,item)=>{
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
      userArr.push(this.userObj);
      localStorage.setItem('userList',JSON.stringify(userArr) );
      console.log(this.userObj);
    }
 
    this.userForm.reset();
  }
  getNewId(){
    const oldRecords = localStorage.getItem('userList');
    if(oldRecords!==null){
      const userList=JSON.parse(oldRecords);
      return userList.length +1;
    }else{
      return 1;
    }
  }
  sum(){
    const totalAmt = this.userList.reduce((total,item)=>{
      return +(total as number) + +(item.SendedAmount as number);
   },0);
   console.log(totalAmt);
  }
reset(){
  this.userForm.reset();
}
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
      this.RecieveAmount=0;
      this.RecieveAmount=+(this.grand as number) - +( this.sendAmount as number);
      return this.totalAmt;
   },0);
   console.log(this.totalAmt);
   this.i=this.userSum-this.totalAmt;
  }
 }
 open(content: any) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}

fileName= this.currentDate.toDateString().split(" ")[1]+ '-' + this.currentDate.getFullYear() +'.xlsx';  

exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element,{raw:true});
 console.log(ws)

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // wb.Sheets.Sheet1.B1.s = { dateformat : {'DD/mm/yyyy'}}
    /* save to file */  
    XLSX.writeFile(wb, this.fileName,{cellDates :true});
    try{
      XLSX.writeFileXLSX(wb, this.fileName,{cellDates :true});
    console.log("sssssssssssssssssss :  ",XLSX.writeFile(wb, this.fileName))
    XLSX.writeFileXLSX(wb, this.fileName).then((fileEntry: any) => {
      // Open the xls with the correct OS tools
      this.fileOpener.open(wb + 'filename.xls', 'application/vnd.ms-excel');
    })
  }catch(e){
console.log("message : ",e)
  }

 
  }
}

  





