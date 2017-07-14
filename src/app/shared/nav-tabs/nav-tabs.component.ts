import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-tabs',
  templateUrl: './nav-tabs.component.html',
  styleUrls: ['./nav-tabs.component.css']
})
export class NavTabsComponent implements OnInit {

  @Input()
	tabs: any[];

  constructor() { }

  ngOnInit() {
  }

}
