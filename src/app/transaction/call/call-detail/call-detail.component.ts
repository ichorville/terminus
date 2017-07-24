import { Component, OnInit } from '@angular/core';

import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-call-detail',
  templateUrl: './call-detail.component.html',
  styleUrls: ['./call-detail.component.css']
})
export class CallDetailComponent implements OnInit {

    lat: number;
    lng: number;

    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

  constructor() {
    this.lat = 51.678418;
    this.lng = 7.809007;
   }

  ngOnInit() {
    this.galleryOptions = [
            {
                width: '100%',
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
