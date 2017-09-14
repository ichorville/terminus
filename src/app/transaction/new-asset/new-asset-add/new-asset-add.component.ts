import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';

import { NewAssetService } from '../new-asset.service';

@Component({
	selector: 'app-new-asset-add',
	templateUrl: './new-asset-add.component.html',
	styleUrls: ['./new-asset-add.component.css']
})
export class NewAssetAddComponent implements OnInit {

	form: FormGroup;
	asset: NewAsset;

	formData: FormData;
	files: UploadFile[];
	uploadInput: EventEmitter<UploadInput>;
	humanizeBytes: Function;
	dragOver: boolean;

	types = [
		{ key: 'valuaA', value: 'Value A' },
		{ key: 'valueB', value: 'Value B' }
	];

	constructor(
		private router: Router,
		private _nas: NewAssetService,
		private fb: FormBuilder
	) { 
		this.files = []; // local uploading files array
		this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
		this.humanizeBytes = humanizeBytes;

		this.asset = new NewAsset();
	}

	ngOnInit() {
		this.buildForm();
	}

	onUploadOutput(output: UploadOutput): void {
		if (output.type === 'allAddedToQueue') { // when all files added in queue
			// uncomment this if you want to auto upload files when added
			// const event: UploadInput = {
			//   type: 'uploadAll',
			//   url: '/upload',
			//   method: 'POST',
			//   data: { foo: 'bar' },
			//   concurrency: 0
			// };
			// this.uploadInput.emit(event);
		} else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') { // add file to array when added
			this.files.push(output.file);
		} else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
			// update current data in files array for uploading file
			const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
			this.files[index] = output.file;
		} else if (output.type === 'removed') {
			// remove file from array when removed
			this.files = this.files.filter((file: UploadFile) => file !== output.file);
		} else if (output.type === 'dragOver') {
			this.dragOver = true;
		} else if (output.type === 'dragOut') {
			this.dragOver = false;
		} else if (output.type === 'drop') {
			this.dragOver = false;
		}
	}

	cancelUpload(id: string): void {
		this.uploadInput.emit({ type: 'cancel', id: id });
	}

	removeFile(id: string): void {
		this.uploadInput.emit({ type: 'remove', id: id });
	}

	removeAllFiles(): void {
		this.uploadInput.emit({ type: 'removeAll' });
	}

	buildForm(): void {
		this.form = this.fb.group({
			'type': [this.asset.type, [Validators.required]],
			'class': [this.asset.class, [Validators.required]]
			// group: string;
			// distributor: string;
			// salesRep: string;
			// location: string;
			// serialNumber: string;
			// description: string;
			// supplier: string;
			// notes: string;
			// images: [{
				
			// }];
		});
		this.form.valueChanges.subscribe(data => this.onValueChanged(data));
		this.onValueChanged();
	}

	onValueChanged(data?: any) {
		if(!this.form) {
			return;
		}
		const thisForm = this.form;

		for(const field in this.formErrors) {
			// clear previous messages if any
			this.formErrors[field] = '';
			const control = thisForm.get(field);

			if(control && control.dirty && !control.valid) {
				const messages = this.validationMessages[field];
				for(const key in control.errors) {
					this.formErrors[field] += messages[key] + ' ';
				}
			}
		}
	}

	formErrors = {
	
	};

	validationMessages = {
		
	};

	onSubmit(event) {
		console.log(event);
		console.log(this.files);
	}
}

export class NewAsset {
	type: string;
	class: string;
	group: string;
	distributor: string;
	salesRep: string;
	location: string;
	serialNumber: string;
	description: string;
	supplier: string;
	notes: string;
	images: [{

	}];
}
