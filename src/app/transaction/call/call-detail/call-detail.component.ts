import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { CallService } from '../call.service';

import { NgxGalleryOptions, NgxGalleryImage, 
    NgxGalleryAnimation } from 'ngx-gallery';

import { LoginVariable } from '../../../global';

@Component({
    selector: 'app-call-detail',
    templateUrl: './call-detail.component.html',
    styleUrls: ['./call-detail.component.css']
})
export class CallDetailComponent implements OnInit {

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
                this.call = call;
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
