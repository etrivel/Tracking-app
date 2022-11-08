import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
// import jsPDF from 'jspdf';
import { jsPDF } from "jspdf"

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
     }
  
   inputF = document.getElementById("one");
   getAddingMoneyValue(){
     this.inputF?.append("0")
   }

  dtOptions: any = {};

  ngOnInit(): void { 
    console.log("ytext ")
    this.getAddingMoneyValue()
  console.log("this.date1  : ",this.date1)
  console.log("month : ",this.currentDate.toLocaleDateString('en-GB', { timeZone: 'GMT' }).toLocaleLowerCase())
   const records =localStorage.getItem('userList');
   if(records!==null){
     this.userList = JSON.parse(records);
     this.user1List = JSON.parse(records);
     this.userList= this.user1List.reverse();
     }
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
 console.log(this.userList,"this.userList")
   
}
public signup(){
   localStorage.setItem('sigup',JSON.stringify(this.userList) )
}

  public addItem(){
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
  localStorage.setItem('userList',JSON.stringify(userList));
}
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
// content : ElementRef | undefined;
@ViewChild('content') content: ElementRef;  
public async SavePDF(): Promise<void> {  
  let content=this.content.nativeElement;    
  const doc = new jsPDF();  
  let _elementHandlers =  
  {  
    '#editor':function(element: any,renderer: any){  
      return true;  
    }  
  };  
  // doc.fromHTML(content.innerHTML,15,15,{  

  //   'width':190,  
  //   'elementHandlers':_elementHandlers  
  // });  
  await doc.html(content.innerHTML)
  doc.save('test.pdf');  
}  
downloadCSV() {
  this.csvData = [
    [
      'S.No',
      'Date',
      'SendedAmount',
      'RecievedAmount',
      'Reason',
    ],
  ];

  this.userList.forEach((userList: any, index: number) => {
    const csvRow = [
      index + 1,
      userList.date,
      userList.SendedAmount,
      userList.RecievedAmount,
      userList.Reason
    ]
    this.csvData.push(csvRow);
  })

  let csvFile =
    'data:text/csv;charset=utf-8,' +
    this.csvData.map((e: any) => e.join(',')).join('\n');

  var encodedUri = encodeURI(csvFile);
  var link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  var timeF = new Date().toLocaleString();
  const fileName = `Export_${timeF}.csv`;
  link.setAttribute(
    'download',
    fileName.replace(',', '').replace(' ', '_')
  );
  document.body.appendChild(link);

  link.click();
  if (this.plt.is('cordova')) {
    this.file.writeFile(this.file.dataDirectory, 'data.csv', this.csvData, {replace: true}).then( (res: { nativeURL: any; }) => {
      this.socialSharing.share(null, null, res.nativeURL, null).then((e: any) =>{
        // Success
      }).catch((e: any) =>{
        console.log('Share failed:', e)
      });
    }, (err: any) => {
      console.log('Error: ', err);
    });

  } else {
    // Dummy implementation for Desktop download purpose
    var blob  = new Blob([this.csvData]);
    var a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'newdata.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

trackByFn(index: any, item: any) {
  return index;
}

}

  





