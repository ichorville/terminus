import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AssignEvent } from '../../../shared/custom-events/assign-event';
import { UnassignEvent } from '../../../shared/custom-events/unassign-event';
import { FilterEvent } from '../../../shared/custom-events/filter-event';

@Component({
	selector: 'app-merchandiser-config-mapping-table',
	templateUrl: './merchandiser-config-mapping-table.component.html',
	styleUrls: ['./merchandiser-config-mapping-table.component.css']
})
export class MerchandiserConfigMappingTableComponent implements OnInit {

	@Input()
	public columns: any[];
	@Input()
	public rows: any[];

	@Output()
	onAssign: EventEmitter<AssignEvent>;

	@Output()
	onUnassign: EventEmitter<UnassignEvent>;

	@Output()
	onFilter: EventEmitter<FilterEvent>;

	constructor() {
		this.onAssign = new EventEmitter<AssignEvent>();
		this.onUnassign = new EventEmitter<UnassignEvent>();
		this.onFilter = new EventEmitter<FilterEvent>();
	}

	ngOnInit() {
	}

	assign(row: any) {
		this.onAssign.emit(new AssignEvent(row));
	}

	unassign(row: any) {
		this.onUnassign.emit(new UnassignEvent(row));
	}

	filter($event: any) {
		this.onFilter.emit(new FilterEvent($event.target.value));
	}
}
