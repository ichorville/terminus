import { Component, OnInit, EventEmitter } from '@angular/core';

import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';

@Component({
	selector: 'app-new-asset-add',
	templateUrl: './new-asset-add.component.html',
	styleUrls: ['./new-asset-add.component.css']
})
export class NewAssetAddComponent implements OnInit {

	formData: FormData;
	files: UploadFile[];
	uploadInput: EventEmitter<UploadInput>;
	humanizeBytes: Function;
	dragOver: boolean;

	types = [
		{ key: 'valuaA', value: 'Value A' },
		{ key: 'valueB', value: 'Value B' }
	];

	constructor() { 
		this.files = []; // local uploading files array
		this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
		this.humanizeBytes = humanizeBytes;
	}

	ngOnInit() {

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

	startUpload(): void {
		const event: UploadInput = {
			type: 'uploadAll',
			url: 'http://ngx-uploader.com/upload',
			method: 'POST',
			data: { foo: 'bar' },
			concurrency: 0
		};

		this.uploadInput.emit(event);
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

	onSubmit(event) {
		console.log(event);
		console.log(this.files);
	}
}

export class Album {
	name: string;
	type: string;
	description: string;
	images: [{}]
}
