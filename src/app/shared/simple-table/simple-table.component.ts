import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.css']
})
export class SimpleTableComponent implements OnInit {

  @Input()
  public title: string;

  @Input()
  public columns: any[];
  
  @Input()
  public rows: any[];

  constructor() { }

  ngOnInit() {
  }

}
