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

import { ProductMasterService } from '../product-master.service';
import {ProductTypeService} from '../../../configuration/product-config/product-type/product-type.service';
import {ProductGroupService} from '../../../configuration/product-config/product-group/product-group.service';


@Component({
	selector: 'app-product-edit',
	templateUrl: './product-edit.component.html',
	styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

    product: any;
	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	categoryOptions: { key: string, value: string }[];
	typeOptions: { key: string, value: string }[];
	groupOptions: { key: string, value: string }[];	

	productCategory: string;
	productType: string;
	productGroup: string;

	constructor(
			private router: Router,
			private route: ActivatedRoute,
			private _pms: ProductMasterService,
			private _pts: ProductTypeService,
			private _pgs: ProductGroupService
	) { 
		this.title = 'Edit Product';
		this.buttonValue = 'Update';
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();
		this.product = {};
		this.createForm();
	}

	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this._pms.get(id).then((product) => {
				this.product = product;
				this.createForm();
			});
			this._pms.categories().then((categories) => {
				this.categoryOptions = [];
				categories['t'].forEach((element) => {
					this.categoryOptions.push({ key: element.Uid, value: element.Description });
				});
				this.createForm();
				this._pts.all().then((types) => {
					this.typeOptions = [];
					types['t'].forEach((element) => {
						this.typeOptions.push({ key: element.Uid, value: element.Description });
					});
					this._pgs.all().then((groups) => {
						this.groupOptions = [];
						groups['t'].forEach((element) => {
							this.groupOptions.push({ key: element.Uid, value: element.Description });
						});
						this.createForm();
					});
				});
			});				
		});		
	}

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let product: any = {
			'uid': this.product['UID'],
			'id': formValues.itemID == '' ? this.product['ItemID'] : formValues.itemID,
			'description': formValues.description == '' ? this.product['Description'] : formValues.description,
			'name': formValues.itemName == '' ? this.product['ItemName'] : formValues.itemName,
			'categoryUid': formValues.category == '' ? this.product['CategoryUid'] : formValues.category,
			'typeUid': formValues.type == '' ? this.product['TypeUid'] : formValues.type,
			'groupUid': formValues.group == '' ? this.product['GroupUid'] : formValues.group
		};
		console.log(product);

		this._pms.update(product).then((response) => {
			if(response.status == 200) {
				this.router.navigateByUrl('/master-data/products');
			} else {
				alert('Cannot Edit Due to Error');
			}			
		});
	}	

	private createForm() {
		this.formElements = [
			new FormTextbox({
				key: 'itemID',
				label: 'Product Id',
				value: this.product['ItemID'],
				controlType: 'textbox',
				required: true,
				order: 1,
				placeholder: 'Product Id'
			}),
			new FormTextbox({
				key: 'itemName',
				label: 'Product Name',
				value: this.product['ItemName'],
				controlType: 'textbox',
				required: true,
				order: 2,
				placeholder: 'Product Name'
			}),
			new FormTextbox({
				key: 'description',
				label: 'Product Description',
				value: this.product['Description'],
				controlType: 'textbox',
				required: true,
				order: 3,
				placeholder: 'Product Description'
			}),
			new FormDropdown({
				key: 'category',
				label: 'Category',
				value: this.product['CategoryUid'],
				controlType: 'dropbox',
				options: this.categoryOptions,
				required: true,
				order: 4
			}),
			new FormDropdown({
				key: 'type',
				label: 'Type',
				value: this.product['TypeUid'],
				controlType: 'dropbox',
				options: this.typeOptions,
				required: true,
				order: 5
			}),
			new FormDropdown({
				key: 'group',
				label: 'Group',
				value: this.product['GroupUid'],
				controlType: 'dropbox',
				options: this.groupOptions,
				required: true,
				order: 6
			})
		]
	}
}
