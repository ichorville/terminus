import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CallService } from '../call.service';

import { NgxGalleryOptions, NgxGalleryImage, 
    NgxGalleryAnimation } from 'ngx-gallery';

@Component({
    selector: 'app-call-detail',
    templateUrl: './call-detail.component.html',
    styleUrls: ['./call-detail.component.css']
})
export class CallDetailComponent implements OnInit {

    call: any;

    lat: number;
    lng: number;

    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

    constructor(
        private _cs: CallService,
        private route: ActivatedRoute
    ) {
        this.call = {};
        this.lat = 51.678418;
        this.lng = 7.809007;
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this._cs.get(id).then((call) => {
                console.log(call);
                this.call = call;
                this.galleryImages = this.call['Assets'][0]['images'];
                console.log(this.galleryImages);
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
