import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';

import { FilterEvent } from '../custom-events/filter-event';

@Component({
	selector: 'app-simple-search-box',
	templateUrl: './simple-search-box.component.html',
	styleUrls: ['./simple-search-box.component.css']
})
export class SimpleSearchBoxComponent implements OnInit, OnChanges {
	
	@Input()
	public label: string;

	@Input()
	public terms: any[];

	@Input()
	public defaultTerm: string;

	@Output()
	onSearchItemClick: EventEmitter<FilterEvent>;

	matches: any[];
	showList: boolean;
	filterEvent: FilterEvent;
	selected: string;

	constructor() { 
		this.onSearchItemClick = new EventEmitter<FilterEvent>();
		this.filterEvent = new FilterEvent('');
		this.selected = '';
		this.matches = [];
		this.matches = this.terms;
	}

	ngOnInit() {
		this.matches = this.terms;
		this.selected = this.defaultTerm;
	}

	ngOnChanges(changes) {
		this.matches = this.terms;
		this.selected = this.defaultTerm;
	}

	search(term: string) {
		if (term == '') {
			this.matches = this.terms;
		}
		else {
			this.matches = this.terms.filter((element) => {
				return element.value.toLowerCase().indexOf(term.toLowerCase()) > -1;
			});
		}
	}

	select(e) {
		this.showList = false;
		this.filterEvent = e;
		this.selected = e.value;
		this.onSearchItemClick.emit(this.filterEvent);
	}

	toggleDropdown() {
		this.showList = !this.showList;
	}

	showDropdown() {
		this.showList = true;
	}

	hideDropdown() {
		this.showList = false;
	}

}
