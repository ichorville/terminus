import { Component, OnInit, Input, 
	EventEmitter, Output, OnChanges } from '@angular/core';

import { DeleteEvent } from '../custom-events/delete-event';

import { PaginationService } from '../services/pagination.service';

@Component({
	selector: 'app-data-table',
	templateUrl: './data-table.component.html',
	styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnChanges {

	@Input()
	public title: string;

	@Input()
	public columns: any[];

	@Input()
	public rows: any[];

	@Input()
	public url: string;

	@Output()
	onDelete: EventEmitter<DeleteEvent>;

	pages: any[];
	filteredRows: any[];
	profile: any[];

	isValid: boolean;

	selectedPage: number;
	isToggle: boolean = false;

	public tempArray: any[];
	public resultArray: any[];

	constructor(
		private _ps: PaginationService
	) {     
		this.pages = [];
		this.rows = [];
		this.filteredRows = [];
		this.onDelete = new EventEmitter<DeleteEvent>();
	}

	ngOnInit() {
		setTimeout(() => {
			try {
				this.isValid = true;

				// string base for the search module to search with
				this.resultArray = this.rows;

				// calculate the no of pagination pages
				this._ps.getPageCount(this.rows.length).then((pages) => {
					this.pages = pages;
				});
				// paginate the whole dataset according to the pagination pages
				this._ps.paginate(5, this.rows).then((filteredRows) => {
					this.tempArray = filteredRows;
					this.filteredRows = this.tempArray[0].items;
				});

				// load the first data set hence first selected page
				this.selectedPage = 1;
			} catch(e) {
				
			}
		}, 2000);
	}

	ngOnChanges() {
		// paginate on every button click: every change event
		this.paginate(event);
		
		// this.reDraw(event);
	}

	paginate(event: any) {
		if (event) {
			if (event > 0) {
				if (this.filteredRows) {
					// extract the relevant data set from the paginated data array
					this.filteredRows = this.tempArray[event - 1].items;
				}
			}
		}
	}

	reDraw(event: any) {
		if (event != undefined) {
			if (event == 'NDF') {
				this.isValid = false;
			} else {
				this.isValid = true;

				this.rows = event;

				// calculate the no of pagination pages
				this._ps.getPageCount(this.rows.length).then((pages) => {
					this.pages = pages;
				});
				// paginate the whole dataset according to the pagination pages
				this._ps.paginate(5, this.rows).then((filteredRows) => {
					this.tempArray = filteredRows;
					this.filteredRows = this.tempArray[0].items;
				});

				// load the first data set hence first selected page
				this.selectedPage = 1;
			}
		}
	}

	delete(id: string) {
		this.onDelete.emit(new DeleteEvent(id));
	}
}
