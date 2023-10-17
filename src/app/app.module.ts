import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {BreadcrumbsComponent} from './layout/admin/breadcrumbs/breadcrumbs.component';
import { MasterModule } from './master/master.module';
import { MasterAdminComponent } from './master-layout/master-admin/master-admin.component';
import { MasterSharedModule } from './master-shared/master-shared.module';
import {MenuItems} from './shared/menu-items/menu-items';
import { MenuItemsMasterService } from './master-shared/menu-master/menu-items-master.service';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { PlainsightComponent } from './plainsight/plainsight.component';
//import { PdfViewerModule } from 'ng2-pdf-viewer';




// import { MasterNewsComponent } from './master/master-news/master-news.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    BreadcrumbsComponent,
    MasterAdminComponent,
    PlainsightComponent,


   // MasterNewsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    MasterModule,
    MasterSharedModule,
    AutocompleteLibModule,
  //  PdfViewerModule
  ],
  providers: [MenuItems, MenuItemsMasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
