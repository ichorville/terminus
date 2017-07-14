import { Component, OnInit } from '@angular/core';

import { CustomerMasterService } from '../../master-data/customer-master/customer-master.service';
import { OutletMasterService } from '../../master-data/outlet-master/outlet-master.service';
import { SurveyService } from './survey.service';

@Component({
	selector: 'app-survey',
	templateUrl: './survey.component.html',
	styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
	
	bar: any;
	pie: any;
	cols: number;
	title: string;

	surveys: any[];

	customerOptions: { key: string, value: string }[];
	customerOutletMap: any;
	outletOptions: { key: string, value: string }[];
	selectedCustomer: { key: string, value: string };
	selectedOutlet: { key: string, value: string };
	customers: any[];
	outlets: any[];

	constructor(
		private _cms: CustomerMasterService, 
		private _oms: OutletMasterService,
		private _ss: SurveyService
	) { 
		this.title = 'Survey Results';
		this.surveys = [];
		this.customerOutletMap = {};
		this.selectedCustomer = { key: '', value: '' };
		this.selectedOutlet = { key: '', value: '' };
		this.bar = {
			view: [600, 200],
			showXAxis: true,
			showYAxis: true,
			gradient: false,
			showLegend: false,
			showXAxisLabel: true,
			xAxisLabel: 'Count',
			showYAxisLabel: false,
			yAxisLabel:'',
			colorScheme: {
				domain: ['#283593']
			}
		};

		this.pie = {
			view: [600, 200],
			gradient: false,
			showLegend: true,
			showLabels: false,
			explodeSlices: false,
			doughnut: true,
			colorScheme: {
				domain: ['#283593', '#c62828']
			}
		}
		
	}

	ngOnInit() {
		
		let width = window.innerWidth;
		let size = width > 1280 ? 'lg' : (width <=1280 && width >= 960 ? 'md': 
			(width <960 && width >= 600 ? 'sm' : 'xs')); 

		switch (size) {
			case 'xs':
				this.bar.view = [280, 200];
				this.pie.view = [280, 200];
				this.cols = 1;
				break; 
			case 'sm':
				this.bar.view = [500, 200];
				this.pie.view = [500, 200];
				this.cols = 1;
				break; 
			case 'md':
				this.bar.view = [500, 200];
				this.pie.view = [500, 200];
				this.cols = 2;
				break;
			case 'lg':
				this.bar.view = [600, 200];
				this.pie.view = [600, 200];
				this.cols = 2;
				break;
			default:
				this.bar.view = [600, 200];
				this.pie.view = [600, 200];
				this.cols = 2;
				break;
		}

		this._cms.all().then((customers) => {
			this.customerOptions = [];
			customers.forEach((element) => {
				this.customerOptions.push({ key: element.Uid, value: element.Name });
			});

			this._oms.all().then((outlets) => {
				this.outletOptions = [];
				let allOutlets = outlets['t'];
				allOutlets.forEach((element) => {
					
					if (element.ExpiryDate == null) {
						if (this.customerOutletMap.hasOwnProperty(element.CustomerUid)) {
							this.customerOutletMap[element.CustomerUid].push({ key: element.Uid, value: element.Name });
						}
						else {
							this.customerOutletMap[element.CustomerUid] = [
								{ key: 'all', value: 'All' }, 
								{ key: element.Uid, value: element.Name }
							];
						}
					}
				});

				this.selectedCustomer = this.customerOptions[1];
				this.outletOptions = this.customerOutletMap[this.selectedCustomer.key];
				this.selectedOutlet = { key: 'all', value: 'All' };
				this.fetch();
			});
		});		

	}

	selectCustomer($event) {
		this.selectedCustomer = $event;
		this.outletOptions = this.customerOutletMap[this.selectedCustomer.key];
		this.selectedOutlet = { key: 'all', value: 'All' };
		this.fetch();
	}

	selectOutlet($event) {
		this.selectedOutlet = $event;
		this.fetch();
	}

	onSelect(event) {
		console.log(event);
	}

	fetch() {
		let outlet = this.selectedOutlet.key != 'all' ? this.selectedOutlet.key : undefined;
		this._ss.get(this.selectedCustomer.key, outlet).then((surveys) => {
			this.surveys = [];
			let chartType ='bar';;
			let results = [];
			let name = '';
			let value = '';
			surveys.forEach((survey) => {
				chartType = survey.results.length != 2 ? 'bar' : 'pie';
				results = survey.results.map((result) => {
					name = JSON.stringify(result['name']),
					value = JSON.stringify(result['value'])
					return {
						'name': name.substr(1, name.length - 2),
						'value': value
					}
				});
				
				this.surveys.push({
					"uid": survey.uid,
					"surveyId": survey.surveyId,
					"question": survey.question,
					"chartType": chartType,
					"results": results
				});			
			});
		});
	}
}