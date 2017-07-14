import { Component, OnInit, state, Input,
  trigger, style, transition, animate  } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FormSubmitCompleteEvent } from '../custom-events/form-submit-complete-event';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: [
		trigger('gridState', [				
				state('fade-out', style({
						visibility: 'hidden',
						opacity: 0,
						transition: 'visibility 0s 1s, opacity 1.5s linear'
				})),
				state('fade-in', style({
						visibility: 'visible',
						opacity: 1,
						transition: 'opacity 1.5s linear'
				})),
				transition('fade-in <=> fade-out', animate('500ms linear'))
			]
		)
	],
})
export class AlertComponent implements OnInit {
   
  gridState: string;
  @Input()
  onFormSubmitComplete: Subject<FormSubmitCompleteEvent>
  message: string;
  success: boolean;

  constructor() {
    this.gridState = 'fade-out';
    this.message = '';
    this.success = true;
   }

  ngOnInit() {
    this.onFormSubmitComplete.subscribe((e) => {
      this.alert(e);
    })
  }

  alert(e) {
    this.message = e.message;
    this.success = e.success;
    this.gridState = 'fade-in';
    
    setTimeout(() => this.gridState = 'fade-out', 1500);
  }

}
