import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  checkBoxFlag: number = 1;

  @Output() event = new EventEmitter<String>();

  onClick( ) {
    this.checkBoxFlag = this.checkBoxFlag * -1;
    this.event.emit(String(this.checkBoxFlag));
  }
}
