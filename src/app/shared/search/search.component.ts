import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

	@Input()
	public terms: any[];

	@Input()
	public parameters: any[];

	term: string;
	matches: any[];

	selectedParameters: any[];

	constructor() {
		this.matches = [];
		this.selectedParameters = [];
	}

	ngOnInit() {
		this.parameters.forEach((element) => {
			element['status'] = false;
		});
	}

	search(term: string) {
		if (this.selectedParameters.length == 0) {
			if (term) {
				this.matches = [];
			} else {
				this.term = null;
			}
		} else {
			if (term) {
				let arr: any[] = [];

				// iterate through the search parameters
				for (var i in this.selectedParameters) { 
					// search parameter toLowerCase
					let text = this.selectedParameters[i].toLowerCase();
					console.log(text);
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

				console.log(this.matches);
			} else {
				this.term = null;
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
