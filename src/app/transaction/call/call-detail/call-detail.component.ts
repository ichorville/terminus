import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CallService } from '../call.service';

import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

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
            });
        });

        this.galleryOptions = [
            {
                width: '75%',
                height: '400px',
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Slide
            },
            // max-width 800
            {
                breakpoint: 800,
                width: '100%',
                height: '600px',
                imagePercent: 80,
                thumbnailsPercent: 20,
                thumbnailsMargin: 20,
                thumbnailMargin: 20
            },
            // max-width 400
            {
                breakpoint: 400,
                preview: false
            }
        ];

        this.galleryImages = [
            {
                small: 'assets/img/terminus.png',
                medium: 'assets/img/terminus.png',
                big: 'assets/img/terminus.png'
            },
            {
                small: 'assets/img/terminus.png',
                medium: 'assets/img/terminus.png',
                big: 'assets/img/terminus.png'
            },
            {
                small: 'assets/img/terminus.png',
                medium: 'assets/img/terminus.png',
                big: 'assets/img/terminus.png'
            }
        ];
    }

}
