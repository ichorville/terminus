import {
	Component, OnInit, Output, EventEmitter, state,
	trigger, style, transition, animate
} from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';

import { FormElement } from '../../../shared/form-elements/form-element';
import { FormTextbox } from '../../../shared/form-elements/form-textbox';
import { FormDropdown } from '../../../shared/form-elements/form-dropdown';

import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../shared/custom-events/form-submit-complete-event';

import { ProductMasterService } from '../product-master.service';
import {ProductTypeService} from '../../../configuration/product-config/product-type/product-type.service';
import {ProductGroupService} from '../../../configuration/product-config/product-group/product-group.service';

import { LoginVariable } from '../../../global';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	categoryOptions: { key: string, value: string }[];
	typeOptions: { key: string, value: string }[];
	groupOptions: { key: string, value: string }[];

	constructor(
		private router: Router,
		private _pms: ProductMasterService,
		private _pts: ProductTypeService,
		private _pgs: ProductGroupService
	) {
		this.title = 'Add Product';
		this.buttonValue = 'Save';
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();
		this.categoryOptions = [];
		this.typeOptions = [];
		this.groupOptions = [];
		this.createForm();
	}

	ngOnInit() {
		if (LoginVariable.IS_LOGGED_IN == false) {
			this.router.navigateByUrl(`/login`);
		}
		this._pms.categories().then((categories) => {
			this.categoryOptions = [];
			categories['t'].forEach((element) => {
				if(element.CategoryType == 3){
					this.categoryOptions.push({ key: element.Uid, value: element.Description });
				}
			});
			this.createForm();
			this._pts.all().then((types) => {
				this.typeOptions = [];
				types['t'].forEach((element) => {
					this.typeOptions.push({ key: element.Uid, value: element.Description });
				});
				this.createForm();
				this._pgs.all().then((groups) => {
					console.log(groups);
					this.groupOptions = [];
					groups['t'].forEach((element) => {
						this.groupOptions.push({ key: element.Uid, value: element.Description });
					});	
					this.createForm();
				});
			});

		});
	}

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let product: any = {
			'id': formValues.ItemID,
			'name': formValues.ItemName,
			'description': formValues.Description,
			'categoryUid': formValues.category,
			'typeUid': formValues.type,
			'groupUid': formValues.group
		};

		this._pms.create(product).then((response) => {
			if(response.status == 200) {
				this.router.navigateByUrl('/master-data/products');
			} else {
				alert('Cannot Add Due to Error');
			}
		});
	}

	private createForm() {
		this.formElements = [
			new FormTextbox({
				key: 'ItemID',
				label: 'Product Id',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 1,
				placeholder: 'Product Id'
			}),
			new FormTextbox({
				key: 'ItemName',
				label: 'Product Name',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 2,
				placeholder: 'Product Name'
			}),
			new FormTextbox({
				key: 'Description',
				label: 'Product Description',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 3,
				placeholder: 'Product Description'
			}),
			new FormDropdown({
				key: 'category',
				label: 'Category',
				value: '',
				controlType: 'dropbox',
				options: this.categoryOptions,
				required: true,
				order: 4
			}),
			new FormDropdown({
				key: 'type',
				label: 'Type',
				value: '',
				controlType: 'dropbox',
				options: this.typeOptions,
				required: true,
				order: 5
			}),
			new FormDropdown({
				key: 'group',
				label: 'Group',
				value: '',
				controlType: 'dropbox',
				options: this.groupOptions,
				required: true,
				order: 6
			})
		]
	}
}
