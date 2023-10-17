import { Component, OnInit } from '@angular/core';
import {NgxCarousel} from 'ngx-carousel';
import { RestService } from '../../master-services/Rest/rest.service';
import { NewService } from '../../master-services/new/new.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-master-slider',
  templateUrl: './master-slider.component.html',
  styleUrls: [
    './master-slider.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss'
  ]
})

export class MasterSliderComponent implements OnInit {

  imgags: string[];
  imgagsBanner: string[];
  myCarousel: any;
  currentSlider: any;

  slides = [
    {img: 'http://placehold.it/350x150/000000'},
    {img: 'http://placehold.it/350x150/111111'},
    {img: 'http://placehold.it/350x150/333333'},
    {img: 'http://placehold.it/350x150/666666'}
  ];
  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "nextArrow":"<div class='nav-btn next-slide'></div>",
    "prevArrow":"<div class='nav-btn prev-slide'></div>",
    "dots":true,
    "infinite": false
  };

  newsPhotos: any;

  public carouselBannerItems: Array<any> = [];
  public carouselBanner: NgxCarousel;

  public carouselTileItems: Array<any> = [];
  public carouselTile: NgxCarousel;

  public carouselTileOneItems: Array<any> = [];
  public carouselTileOne: NgxCarousel;

  public carouselTileTwoItems: Array<any> = [];
  public carouselTileTwo: NgxCarousel;
  id;
  ll;

  constructor(private newService: NewService, private router: Router) {
    this.loadingData();
}

  loadingData() {
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    this.newService.getNewsImages().then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      this.newsPhotos = resp.data;
      console.log(this.newsPhotos[0].id);
      this.changeSlider(this.newsPhotos[0].id);
      console.log( this.newsPhotos);
    }).catch(error => {
      console.log(error);
    });
   }


   ole(a: any) {
console.log(a);
   }

   changeSlider(slider: any) {
   console.log(slider);

   // this.currentSlider = this.newsPhotos.filter(val => 'id' === 13);
   this.currentSlider = this.newsPhotos.filter(current => current.id === Number(slider));
   this.currentSlider = JSON.parse(JSON.stringify(this.currentSlider));
   this.currentSlider  =  this.currentSlider[0];
  // console.log(this.currentSlider[0].id);
   }
  ngOnInit() {
    this.imgagsBanner = [
      'assets/images/slider/slide4.jpg',
      'assets/images/slider/slide3.jpg',
      'assets/images/slider/slide2.jpg',
      'assets/images/slider/slide1.jpg'
    ];

    this.imgags = [
      'assets/images/task/task-u1.jpg',
      'assets/images/task/task-u2.jpg',
      'assets/images/task/task-u3.jpg',
      'assets/images/task/task-u4.jpg',
      'assets/images/task/task-u2.jpg',
      'assets/images/task/task-u1.jpg',
      'assets/images/task/task-u3.jpg',
      'assets/images/task/task-u4.jpg'
    ];

    this.carouselBanner = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      slide: 4,
     // speed: 500,
     // interval: 10000,
      point: {
        visible: true,
        pointStyles: `
          .ngxcarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 12px;
            margin: 0;
            white-space: nowrap;
            overflow: auto;
            position: absolute;
            width: 100%;
            bottom: 20px;
            left: 0;
            box-sizing: border-box;
          }
          .ngxcarouselPoint li {
            display: inline-block;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.55);
            padding: 5px;
            margin: 0 3px;
            transition: .4s ease all;
          }
          .ngxcarouselPoint li.active {
              background: white;
              width: 10px;
          }
          .pcoded[layout-type="dark"] .ngxcarouselPoint li.active, body.dark .ngxcarouselPoint li.active{
            background: #00f;
            border-color:#00f;
          }
        `
      },
      load: 2,
      custom: 'banner',
      touch: true,
      loop: true,
      easing: 'cubic-bezier(0, 0, 0.2, 1)'
    };

    this.carouselTile = {
      grid: { xs: 1, sm: 2, md: 2, lg: 3, all: 0 },
      speed: 600,
      interval: 10000,
      point: {
        visible: true,
        pointStyles: `
          .ngxcarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 12px;
            margin: 0;
            white-space: nowrap;
            overflow: auto;
            box-sizing: border-box;
          }
          .ngxcarouselPoint li {
            display: inline-block;
            border-radius: 50%;
            border: 2px solid rgba(0, 0, 0, 0.55);
            padding: 4px;
            margin: 0 3px;
            transition-timing-function: cubic-bezier(.17, .67, .83, .67);
            transition: .4s;
          }
          .ngxcarouselPoint li.active {
              background: #6b6b6b;
              transform: scale(1.2);
          }
          .pcoded[layout-type="dark"] .ngxcarouselPoint li.active, body.dark .ngxcarouselPoint li.active{
            background:#fff;
          }
        `
      },
      load: 2,
      loop: true,
      touch: true
    };

    this.carouselTileTwo = {
      grid: { xs: 1, sm: 3, md: 4, lg: 6, all: 230 },
      speed: 600,
      interval: 10000,
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      loop: true
    };

    this.carouselTileOne = {
      grid: { xs: 1, sm: 2, md: 3, lg: 4, all: 0 },
      speed: 600,
      interval: 10000,
      point: {
        visible: true,
        pointStyles: `
          .ngxcarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 12px;
            margin: 0;
            white-space: nowrap;
            overflow: auto;
            box-sizing: border-box;
          }
          .ngxcarouselPoint li {
            display: inline-block;
            border-radius: 50%;
            background: #6b6b6b;
            padding: 5px;
            margin: 0 3px;
            transition: .4s;
          }
          .ngxcarouselPoint li.active {
              border: 2px solid rgba(0, 0, 0, 0.55);
              transform: scale(1.2);
              background: transparent;
            }
          .pcoded[layout-type="dark"] .ngxcarouselPoint li.active, body.dark .ngxcarouselPoint li.active{
            border-color: #fff;
            background:transparent;
          }
        `
      },
      loop: true,
      touch: true,
      easing: 'ease',
      animation: 'lazy',
    };

    this.carouselBannerLoad();
    this.carouselTileLoad();
    this.carouselTileOneLoad();
    this.carouselTileTwoLoad();
  }

  onmoveFn(data) {
     console.log(data);

  }

  onChange(ole: any) {
  console.log(ole);
  }


  addSlide() {
    this.slides.push({img: 'http://placehold.it/350x150/777777'});
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }

  public carouselBannerLoad() {
    const len = this.carouselBannerItems.length;
    if (len <= 3) {
      for (let i = len; i < len + 4; i++) {
        this.carouselBannerItems.push(
          this.imgagsBanner[i]
        );
      }
    }

  }

  public carouselTileLoad() {
    const len = this.carouselTileItems.length;
    if (len <= 7) {
      for (let i = len; i < len + 8; i++) {
        this.carouselTileItems.push(
          this.imgags[i]
        );
      }
    }
  }

  public carouselTileOneLoad() {
    const len = this.carouselTileOneItems.length;
    if (len <= 7) {
      for (let i = len; i < len + 8; i++) {
        this.carouselTileOneItems.push(
          this.imgags[i]
        );
      }
    }
  }

  public carouselTileTwoLoad() {
    const len = this.carouselTileTwoItems.length;
    if (len <= 7) {
      for (let i = len; i < len + 8; i++) {
        this.carouselTileTwoItems.push(
          this.imgags[i]
        );
      }
    }
  }

}
