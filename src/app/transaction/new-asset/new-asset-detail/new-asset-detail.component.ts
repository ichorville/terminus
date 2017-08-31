import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { CallService } from '../call.service';

import { NgxGalleryOptions, NgxGalleryImage, 
    NgxGalleryAnimation } from 'ngx-gallery';

import { LoginVariable } from '../../../global';

@Component({
    selector: 'app-new-asset-detail',
    templateUrl: './new-asset-detail.component.html',
    styleUrls: ['./new-asset-detail.component.css']
})
export class NewAssetDetailComponent implements OnInit {

    call: any;

    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

    constructor(
        private _cs: CallService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.call = {};
    }

    ngOnInit() {
        if (LoginVariable.IS_LOGGED_IN == false) {
			this.router.navigateByUrl(`/login`);
		}
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this._cs.get(id).then((call) => {
                console.log(call);
                this.call = call[0];
                console.log(this.call.Assets);
            });
        });

        this.galleryOptions = [
            { 
                "image": false, 
                "height": "100px" 
            },
            { 
                "breakpoint": 500, 
                "width": "100%" 
            }
        ];
    }
}
