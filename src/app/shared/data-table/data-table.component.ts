import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { DeleteEvent } from '../custom-events/delete-event';

@Component({
	selector: 'app-data-table',
	templateUrl: './data-table.component.html',
	styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnChanges {

	@Input()
	public title: string;
	@Input()
	public url: string;
	@Input()
	public columns: any[];
	@Input()
	public rows: any[];

	@Output()
	onDelete: EventEmitter<DeleteEvent>;

	selectedRows: any[];
	rowCount: number;
	pageSize: number;
	pageCount: number;
	startPage: number;
	paginationBarSize: number;

	constructor() {     
		this.onDelete = new EventEmitter<DeleteEvent>();
		this.rowCount = 0;
		this.pageSize = 5;
		this.startPage = 1;
		this.paginationBarSize = 0;
		this.selectedRows = this.rows;
	}

	ngOnInit() {
		this.init();
	}

	ngOnChanges() {
		this.init();
	}

	delete(id: string) {
		this.onDelete.emit(new DeleteEvent(id));
	}

	init() {
		this.selectedRows = this.rows;
		this.rowCount = this.rows.length;
		this.pageCount = Math.ceil(this.rowCount/this.pageSize);
		this.paginationBarSize = this.pageCount > 5 ? 5 : this.pageCount;
		this.paginate(this.startPage);
	}

	paginate(page: any) {
		let start = (page - 1) * this.pageSize;
		let end = page * this.pageSize;
		this.selectedRows = this.rows.slice(start, end);		
	}
}
