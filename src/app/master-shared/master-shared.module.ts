import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
// import { MasterSliderModule } from './master-slider/master-slider.module';
import {NgxCarouselModule} from 'ngx-carousel';
import 'hammerjs';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import { MasterSliderComponent } from './master-slider/master-slider.component';
import { MasterSpinnerComponent } from './master-spinner/master-spinner.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    // MasterSliderModule,
    NgbModule,
    NgxCarouselModule,
    PerfectScrollbarModule
    ],
  declarations: [MasterSliderComponent, MasterSpinnerComponent],
  exports: [  MasterSliderComponent,
    MasterSpinnerComponent,
    PerfectScrollbarModule,
    NgbModule
    ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class MasterSharedModule { }
