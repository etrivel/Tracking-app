import { Component , OnInit,Output, EventEmitter} from '@angular/core';

declare var device: { platform: any; };
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Output() sidenavClose = new EventEmitter();
  bank = "Home";
  addingMoney = true;
  title = 'Tracking-app';
  hi =false;

  ngOnInit() {
    document.addEventListener("deviceready", function () {
      alert(device.platform);
    }, false);
    
}

count = 0;
showtext(){
   this.count++
  //  if(this.count % 2 != 0){
    if(this.hi == false){
      console.log("hitrue :",this.hi)
  this.hi = true;
   }else{
    console.log("hielse :",this.hi)
    this.hi = false;
   }
}

public onSidenavClose = () => {
  this.sidenavClose.emit();
}



}