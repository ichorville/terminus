import { Component, OnInit, Input, 
	Output, EventEmitter, OnChanges } from '@angular/core';

import { FilterEvent } from '../custom-events/filter-event';

@Component({
	selector: 'search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnChanges {

	@Input()
	public terms: any[];

	@Input()
	public parameters: any[];

	@Input()
	initialSearchResults: any[];

	@Output()
	onFilter: EventEmitter<any>;

	term: string;
	matches: any[];
	
	selectedParameters: any[];

	constructor() {
		this.matches = this.terms;
		this.selectedParameters = [];
		this.onFilter = new EventEmitter<any>();
	}

	ngOnInit() {
		this.parameters.forEach((element) => {
			element['status'] = false;
		});
	}

	ngOnChanges(changes) {
		this.matches = this.terms;
	}

	search(term: string) {
		if (term == '') {
			this.matches = this.terms;
			this.onFilter.emit(this.matches);
		} else {
			let arr: any[] = [];

			// iterate through the search parameters
			for (var i in this.selectedParameters) { 
				// search parameter toLowerCase
				let text = this.selectedParameters[i].toLowerCase();
				// filter from object
				this.terms.filter((element) => {
					// filter from object key
					Object.getOwnPropertyNames(element).filter((match) => {
						if ((match == text) && (element[match].toLowerCase().indexOf(term.toLowerCase()) > -1)) {
							// push to array if search condition passes
							arr.push(element);
						}
					});
				});
			}

			// remove duplicate records
			this.matches = arr.filter((elem, index, self) => {
				return index == self.indexOf(elem);
			});

			if (this.matches.length > 0) {
				this.onFilter.emit(this.matches);
			} 
			if (this.matches.length == 0) {
				this.onFilter.emit('NDF');
			}
		}
	}

	selectParameter(parameter: any) {
		if (parameter.status == true) {
			// add paramater to array so that the search function can use it
			this.selectedParameters.push(parameter.name);
			this.matches = [];
		} if (parameter.status == false) {
			// go through the array and deduct the current search parameter
			for (var i in this.selectedParameters) {
				if (this.selectedParameters[i] == parameter.name) {
					let index: any = i;
					this.selectedParameters.splice(index, 1)
				}
			}
			this.matches = [];
		}
	}
}
