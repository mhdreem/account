import { Component, Input, OnInit } from '@angular/core';
import { AccountsIndex } from 'src/app/modules/shared/models/AccountsIndex';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {

  @Input() data!: AccountsIndex[];

  todayDate: Date;

  constructor() {
    this.todayDate= new Date();
   }

  ngOnInit(): void {
  }

}
