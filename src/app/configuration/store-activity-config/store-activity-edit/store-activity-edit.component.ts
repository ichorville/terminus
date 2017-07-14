import {
	Component, OnInit, Output, EventEmitter, state,
	trigger, style, transition, animate
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';

import { FormElement } from '../../../shared/form-elements/form-element';
import { FormTextbox } from '../../../shared/form-elements/form-textbox';
import { FormDropdown } from '../../../shared/form-elements/form-dropdown';

import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../shared/custom-events/form-submit-complete-event';

// import { FirebaseObjectObservable } from 'angularfire2';
import {StoreActivityConfigService} from '../store-activity-config.service';

@Component({
  selector: 'app-store-activity-edit',
  templateUrl: './store-activity-edit.component.html',
  styleUrls: ['./store-activity-edit.component.css']
})
export class StoreActivityEditComponent implements OnInit {

  constructor(private router: Router,
		private route: ActivatedRoute,
		private _sacs: StoreActivityConfigService) { }

  ngOnInit() {
  }

}
