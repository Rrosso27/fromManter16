import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterSharedModule } from './../master-shared.module';
import { MasterSliderComponent } from './../master-slider/master-slider.component';
import {NgxCarouselModule} from 'ngx-carousel';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import 'hammerjs';

@NgModule({
  imports: [
    CommonModule,
    NgxCarouselModule,
  //  MasterSharedModule,
     SlickCarouselModule
  ],
  declarations: []
})
export class MasterSliderModule { }

