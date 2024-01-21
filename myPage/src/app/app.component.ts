import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myPage';

  public eventData: String = "1";
  private blurFlag: HTMLElement | null | undefined;
  
  ngAfterViewChecked() {
    this.blurFlag = document.getElementById("main");
  }

  onReceiveEventFromChild(eventData: String) {
    this.eventData = eventData;
    if(this.blurFlag){
      if ( eventData == "-1") {
        this.blurFlag.classList.add('blur');
      }
      else {
        this.blurFlag.classList.remove('blur');
      }
    }
  }
}
