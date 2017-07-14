import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';

@Component({
	selector: 'app-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

	@Input()
	pageCount: number;

	@Input()
	startPage: number;

	@Input()
	paginationBarSize: number;

	@Output()
	onPaginate: EventEmitter<number>;

	currentPage: number;
	pages: number[];

	constructor() { 
		this.onPaginate = new EventEmitter<number>();
		this.pages = [];
	}

	ngOnInit() {
		this.currentPage = this.startPage;
		for (let i = 0; i < this.paginationBarSize; i++) {
			this.pages.push(this.currentPage + i);
		}		
	}

	ngOnChanges(changes: any) {
		console.log('pagination change');
		this.currentPage = this.startPage;
		for (let i = 0; i < this.paginationBarSize; i++) {
			this.pages.push(this.currentPage + i);
		}	
	}

	first() {
		this.currentPage = 1;
		this.paginate(this.currentPage);
	}

	next() {
		if (this.currentPage != this.pageCount) {
			this.currentPage++;
			this.paginate(this.currentPage);
		} 
	}

	previous() {
		if (this.currentPage > 1) {
			this.currentPage--;
			this.paginate(this.currentPage);
		}
	}

	last() {
		this.currentPage = this.pageCount;
		this.paginate(this.currentPage);
	}

	paginate(page: number) {
		this.currentPage = page;
		let paginationBar = [];
		if (this.currentPage + 1 == this.pages[0] || this.currentPage == 1) { // if previous
			for (let i = this.currentPage; this.currentPage - i < this.paginationBarSize; i--) {
				paginationBar.push((this.currentPage - i) + 1);
			}
			this.pages = paginationBar;
		} else if (this.currentPage - 1 == this.pages[this.pages.length - 1]) { // next page
			for (let i = 0; i < this.paginationBarSize; i++) {
				paginationBar.push(this.currentPage + i);
			}
			this.pages = paginationBar;
		} else if (this.currentPage == this.pageCount) { // if last page
			for (let i = this.currentPage - this.paginationBarSize + 1; i <= this.currentPage; i++) {
				paginationBar.push(i);
			}
			this.pages = paginationBar;

		}

		this.onPaginate.emit(this.currentPage);
	}
}
