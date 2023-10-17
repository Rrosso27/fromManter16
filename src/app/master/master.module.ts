import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterAuthComponent } from './master-auth/master-auth.component';
import { MasterRoutingModule } from './master-routing.module';
import { MasterUserRegisterComponent } from './master-user-register/master-user-register.component';
import { MasterNewsComponent } from './master-news/master-news.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { MasterSharedModule } from '../master-shared/master-shared.module';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MasterForgetPasswordComponent } from './master-forget-password/master-forget-password.component';
import { MasterChangePasswordComponent } from './master-change-password/master-change-password.component';
import { MasterCreateSliderComponent } from './master-create-slider/master-create-slider.component';

// Formularios maestras
import { MasterBrandComponent } from './master-brand/master-brand.component';
import { MasterModelComponent } from './master-model/master-model.component';
import { MasterTypeDocumentComponent } from './master-type-document/master-type-document.component';
import { MasterPaymentConditionComponent } from './master-payment-condition/master-payment-condition.component';

import { MasterMachineComponent } from './master-machine/master-machine.component';
import { MasterTyreComponent } from './master-tyre/master-tyre.component';
import { MasterProfileComponent } from './master-profile/master-profile.component';
import { MasterRegisterThirdComponent } from './master-register-third/master-register-third.component';
import { MasterFuelComponent } from './master-fuel/master-fuel.component';
import { MasterBranchOfficeComponent } from './master-branch-office/master-branch-office.component';
import { MasterForkliftComponent } from './master-forklift/master-forklift.component';
import { MasterTaskComponent } from './master-task/master-task.component';
import { MasterCustomersComponent } from './master-customers/master-customers.component';
import { MasterUpdateCustomerComponent } from './master-update-customer/master-update-customer.component';
import { MasterdetailCustomerComponent } from './master-detail-customer/master-detail-customer.component';

import { MasterShowForkliftComponent } from './master-show-forklift/master-show-forklift.component';
import { MasterExternalUserComponent } from './master-external-user/master-external-user.component';
import {
  ScheduleModule, RecurrenceEditorModule, DayService, WeekService,
  WorkWeekService, MonthService, MonthAgendaService
} from '@syncfusion/ej2-angular-schedule';
import { UiSwitchModule } from 'ng2-ui-switch';
import { MasterRestartPasswordComponent } from './master-restart-password/master-restart-password.component';
import { MasterWorkDetailsComponent } from './master-work-details/master-work-details.component';
import { MasterWorkDashboardComponent } from './master-work-dashboard/master-work-dashboard.component';
import { MasterRoutineDetailsComponent } from './master-routine-details/master-routine-details.component';
import { MasterMultiDatePickerComponent } from './master-multi-date-picker/master-multi-date-picker.component';
import { MasterHorometroComponent } from './master-horometro/master-horometro.component';
import { MasterForkliftUpdateComponent } from './master-forklift-update/master-forklift-update.component';
import { MasterExternalUserUpdateComponent } from './master-external-user-update/master-external-user-update.component';
import { MasterForkliftShowComponent } from './master-forklift-show/master-forklift-show.component';
import { MasterMultiDatePickerShowComponent } from './master-multi-date-picker-show/master-multi-date-picker-show.component';
import { MasterResetPasswordLoginComponent } from './master-reset-password-login/master-reset-password-login.component';
import { MasterEstimateCountriesComponent } from './master-estimate-countries/master-estimate-countries.component';
import { MasterPriceCountriesDhlComponent } from './master-price-countries-dhl/master-price-countries-dhl.component';
import { MasterEstimateCustomerComponent } from './master-estimate-customer/master-estimate-customer.component';
import { MasterEstimateAllComponent } from './master-estimate-all/master-estimate-all.component';
import { MasterEstimateConfigurationComponent } from './master-estimate-configuration/master-estimate-configuration.component';
import { MasterUpdateEstimateCustomerComponent } from './master-update-estimate-customer/master-update-estimate-customer.component';
import { MasterCopyEstimateCustomerComponent } from './master-copy-estimate-customer/master-copy-estimate-customer.component';
import { MasterPrivacyPolicyComponent } from './master-privacy-policy/master-privacy-policy.component';
import { MasterRegionalsComponent } from './master-regionals/master-regionals.component';
import { MasterTechniciansComponent } from './master-technicians/master-technicians.component';
import { MasterCreateTechniciansComponent } from './master-create-technicians/master-create-technicians.component';
import { MasterCostCenterComponent } from './master-cost-center/master-cost-center.component';
import { MasterWarehousesComponent } from './master-warehouses/master-warehouses.component';
import { MasterSubCostCenterComponent } from './master-sub-cost-center/master-sub-cost-center.component';
import { MasterWarehousesOutComponent } from './master-warehouses-out/master-warehouses-out.component';
import { MasterCreateWarehousesOutComponent } from './master-create-warehouses-out/master-create-warehouses-out.component';
import { MasterSettlementCustomerComponent } from './master-settlement-customer/master-settlement-customer.component';
import { MasterSettlementAllComponent } from './master-settlement-all/master-settlement-all.component';
import { MasterUpdateSettlementCustomerComponent } from './master-update-settlement-customer/master-update-settlement-customer.component';
import { MasterModuleComponent } from './master-module/master-module.component';
import { MasterRegisterModuleComponent } from './master-register-module/master-register-module.component';
import { MasterUpdateModuleComponent } from './master-update-module/master-update-module.component';
import { MasterLogTrmComponent } from './master-log-trm/master-log-trm.component';
import { MasterChecklistsComponent } from './master-checklists/master-checklists.component';
import { MasterRegisterChecklistsComponent } from './master-register-checklists/master-register-checklists.component';
import { MasterUpdateChecklistsComponent } from './master-update-checklists/master-update-checklists.component';
import { MasterQuestionComponent } from './master-question/master-question.component';
import { MasterToiletComponent } from './master-toilet/master-toilet.component';
import { MasterResumenesComponent } from './master-resumenes/master-resumenes.component';
import { MasterEditResumenesComponent } from './master-edit-resumenes/master-edit-resumenes.component';
import { MasterPreventiveMaintenanceComponent } from './master-preventive-maintenance/master-preventive-maintenance.component';
import { MasterChecklistMaintenanceComponent } from './master-checklist-maintenance/master-checklist-maintenance.component';
import { MasterCorrectiveMaintenanceComponent } from './master-corrective-maintenance/master-corrective-maintenance.component';
import { MasterPlatformsComponent } from './master-platforms/master-platforms.component';
import { MasterRegisterPlatformsComponent } from './master-register-platforms/master-register-platforms.component';
import { MasterStevedoreComponent } from './master-stevedore/master-stevedore.component';
import { MasterRegisterStevedoreComponent } from './master-register-stevedore/master-register-stevedore.component';
import { MasterUpdateStevedoreComponent } from './master-update-stevedore/master-update-stevedore.component';
import { MasterUpdatePlatformComponent } from './master-update-platform/master-update-platform.component';
import { MasterUpdateProfileComponent } from './master-update-profile/master-update-profile.component';
import { MasterRegisterProfileComponent } from './master-register-profile/master-register-profile.component';
import { MasterViewResumenesPreventiveComponent } from './master-view-resumenes-preventive/master-view-resumenes-preventive.component';
import { MasterViewResumenesCorrectiveComponent } from './master-view-resumenes-corrective/master-view-resumenes-corrective.component';
import { MasterViewResumenesChecklistComponent } from './master-view-resumenes-checklist/master-view-resumenes-checklist.component';
import { MasterTechnicianMaintenanceComponent } from './master-technician-maintenance/master-technician-maintenance.component';
import { MasterPersonalActivitiesComponent } from './master-personal-activities/master-personal-activities.component';
import { MasterTechnicianReportComponent } from './master-technician-report/master-technician-report.component';
import { MasterUpdateTechnicianReportComponent } from './master-update-technician-report/master-update-technician-report.component';
import { MasterRegisterTechnicianReportComponent } from './master-register-technician-report/master-register-technician-report.component';
import { MasterRegisterTechnicianForkliftReportComponent } from './master-register-technician-forklift-report/master-register-technician-forklift-report.component';
import { MasterUpdateTechnicianForkliftReportComponent } from './master-update-technician-forklift-report/master-update-technician-forklift-report.component';
import { MasterPlataformTechnicanComponent } from './master-plataform-technican/master-plataform-technican.component';
import { MasterStevedoreTechnicanComponent } from './master-stevedore-technican/master-stevedore-technican.component';
import { MasterTechnicianForkliftReportComponent } from './master-technician-forklift-report/master-technician-forklift-report.component';
import { MasterViewResumenesStevedoreComponent } from './master-view-resumenes-stevedore/master-view-resumenes-stevedore.component';
import { MasterViewResumenesPlatformComponent } from './master-view-resumenes-platform/master-view-resumenes-platform.component';
import { MasterPersonalMonitoringComponent } from './master-personal-monitoring/master-personal-monitoring.component';
import { MasterBatteryMaintenanceComponent } from './master-battery-maintenance/master-battery-maintenance.component';
import { MasterPedingComponent } from './master-peding/master-peding.component';
import { MasterRoutesComponent } from './master-routes/master-routes.component';
import { MasterMaintenanceDurationComponent } from './master-maintenance-duration/master-maintenance-duration.component';
import { MasterForkliftMaintenanceComponent } from './master-forklift-maintenance/master-forklift-maintenance.component';
import { MasterMaintenanceSystemComponent } from './master-maintenance-system/master-maintenance-system.component';
import { MasterBrandContentsComponent } from './master-brand-contents/master-brand-contents.component';
import {MasterbatteryComponent} from './master-battery/master-battery.component';
import {MasterBatteryDetailComponent} from './master-battery-detail/master-battery-detail.component';

import { MasterModelContentsComponent } from './master-model-contents/master-model-contents.component';
import { MasterModelBrandContentsComponent } from './master-model-brand-contents/master-model-brand-contents.component';
import { MasterViewPdfCatalogueComponent } from './master-view-pdf-catalogue/master-view-pdf-catalogue.component';
import { MasterCreatePdfCatalogueComponent } from './master-create-pdf-catalogue/master-create-pdf-catalogue.component';
import { MasterViewPdfTechnicianComponent } from './master-view-pdf-technician/master-view-pdf-technician.component';
import { MasterPendingReportComponent } from './master-pending-report/master-pending-report.component';
import { MasterMaintenanceAsingFinishComponent } from './master-maintenance-asing-finish/master-maintenance-asing-finish.component';
import { MasterMaintenanceSystemReportComponent } from './master-maintenance-system-report/master-maintenance-system-report.component';
import { MasterEstimateSettlementReportComponent } from './master-estimate-settlement-report/master-estimate-settlement-report.component';
import { MasterComplianceIndicatorMaintenanceComponent } from './master-compliance-indicator-maintenance/master-compliance-indicator-maintenance.component';
import { MasterDifferentTimesAssignationComponent } from "./master-diferent-times-assignation/MasterDifferentTimesAssignationComponent";
import { MasterMaintenanceForkliftComponent } from './master-maintenance-forklift/master-maintenance-forklift.component';
import { MasterStatusForkliftComponent } from './master-status-forklift/master-status-forklift.component';
import { MasterReportHorometerComponent } from './master-report-horometer/master-report-horometer.component';
import { MasterTimeOutForkliftComponent } from './master-time-out-forklift/master-time-out-forklift.component';
import { MasterSupportViewComponent } from './master-support-view/master-support-view.component';
import { MasterSupportMainComponent } from './master-support-main/master-support-main.component';
import { MasterSupportRegisterComponent } from './master-support-register/master-support-register.component';
import { MasterMaintenanceNotificationComponent } from './master-maintenance-notification/master-maintenance-notification.component';
import { MasterReportMaintenanceSettlementComponent } from './master-report-maintenance-settlement/master-report-maintenance-settlement.component';
import { MasterEjemploComponent } from './master-ejemplo/master-ejemplo.component';
import {MasterTicketsComponent} from './master-tickets/master-tickets.component';








//
import { MasterSettlementListComponent } from './master-settlement-list/master-settlement-list.component';
// import { MasterAdminComponent } from '../master-layout/master-admin/master-admin.component';

// Servicios
import { UserService } from '../master-services/User/user.service';
import { NewService } from '../master-services/new/new.service';
import { RestService } from '../master-services/Rest/rest.service';
import { UploadService } from '../master-services/services/upload.service';
import { WorkService } from '../master-services/Work/work.service';
import { ColorPickerService } from 'ngx-color-picker';
import { HorometroService } from "../master-services/horometro/horometro.service";
import { ForkliftService } from '../master-services/Forklift/forklift.service';
import { EstimateService } from '../master-services/estimate/estimate.service';
import { FilexcelService } from '../master-services/FileExcel/filexcel.service';
import { SettlementService } from '../master-services/settlement/settlement.service';
import { ModulesService } from '../master-services/modules/modules.service';
import { ChecklistService } from '../master-services/checklist/checklist.service';
import { QuestionService } from '../master-services/question/question.service';
import { ToiletService } from '../master-services/toliet/toilet.service';
import { ResumenesService } from '../master-services/resumenes/resumenes.service';
import { PlatformsService } from '../master-services/platforms/platforms.service';
import { StevedoreService } from '../master-services/stevedore/stevedore.service';
import { PersonalService } from '../master-services/personal/personal.service';
import { BatteryService } from '../master-services/battery/battery.service';
import { PendingService } from '../master-services/pending/pending.service';
import { ReportsService } from '../master-services/reports/reports.service';
import { SystemsService } from '../master-services/systems/systems.service';
import { BrandService } from '../master-services/brand/brand.service';
import { SupportService } from '../master-services/support/support.service';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';









// import {ChartComponent} from 'angular2-chartjs';



@NgModule({
  imports: [
    CommonModule,
    ScheduleModule,
    RecurrenceEditorModule,
    MasterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MasterSharedModule,
    SharedModule,
    UiSwitchModule,
    NgxDatatableModule,
    NgbModule,
    AutocompleteLibModule,
    // ChartComponent
  ],
  exports: [
  ],
  declarations: [
    // ChartComponent,
    MasterAuthComponent,
    MasterUserRegisterComponent,
    MasterNewsComponent,
    MasterForgetPasswordComponent,
    MasterChangePasswordComponent,
    MasterCreateSliderComponent,
    MasterBrandComponent,
    MasterModelComponent,
    MasterTypeDocumentComponent,
    MasterPaymentConditionComponent,
    MasterEjemploComponent,
    MasterMachineComponent,
    MasterFuelComponent,
    MasterTyreComponent,
    MasterProfileComponent,
    MasterRegisterThirdComponent,
    MasterBranchOfficeComponent,
    MasterForkliftComponent,
    MasterTaskComponent,
    MasterCustomersComponent,
    MasterUpdateCustomerComponent,
    MasterdetailCustomerComponent,
    MasterShowForkliftComponent,
    MasterExternalUserComponent,
    MasterRestartPasswordComponent,
    MasterWorkDashboardComponent,
    MasterWorkDetailsComponent,
    MasterRoutineDetailsComponent,
    MasterMultiDatePickerComponent,
    MasterHorometroComponent,
    MasterForkliftUpdateComponent,
    MasterExternalUserUpdateComponent,
    MasterForkliftShowComponent,
    MasterMultiDatePickerShowComponent,
    MasterResetPasswordLoginComponent,
    MasterEstimateCountriesComponent,
    MasterPriceCountriesDhlComponent,
    MasterEstimateCustomerComponent,
    MasterEstimateAllComponent,
    MasterEstimateConfigurationComponent,
    MasterUpdateEstimateCustomerComponent,
    MasterCopyEstimateCustomerComponent,
    MasterPrivacyPolicyComponent,
    MasterRegionalsComponent,
    MasterTechniciansComponent,
    MasterCreateTechniciansComponent,
    MasterCostCenterComponent,
    MasterWarehousesComponent,
    MasterSubCostCenterComponent,
    MasterWarehousesOutComponent,
    MasterCreateWarehousesOutComponent,
    MasterSettlementCustomerComponent,
    MasterSettlementAllComponent,
    MasterUpdateSettlementCustomerComponent,
    MasterModuleComponent,
    MasterRegisterModuleComponent,
    MasterUpdateModuleComponent,
    MasterLogTrmComponent,
    MasterChecklistsComponent,
    MasterRegisterChecklistsComponent,
    MasterUpdateChecklistsComponent,
    MasterSettlementListComponent,
    MasterQuestionComponent,
    MasterToiletComponent,
    MasterResumenesComponent,
    MasterEditResumenesComponent,
    MasterPreventiveMaintenanceComponent,
    MasterChecklistMaintenanceComponent,
    MasterCorrectiveMaintenanceComponent,
    MasterPlatformsComponent,
    MasterRegisterPlatformsComponent,
    MasterStevedoreComponent,
    MasterRegisterStevedoreComponent,
    MasterUpdateStevedoreComponent,
    MasterUpdatePlatformComponent,
    MasterUpdateProfileComponent,
    MasterRegisterProfileComponent,
    MasterViewResumenesPreventiveComponent,
    MasterViewResumenesCorrectiveComponent,
    MasterViewResumenesChecklistComponent,
    MasterTechnicianMaintenanceComponent,
    MasterPersonalActivitiesComponent,
    MasterTechnicianReportComponent,
    MasterUpdateTechnicianReportComponent,
    MasterRegisterTechnicianReportComponent,
    MasterTechnicianForkliftReportComponent,
    MasterRegisterTechnicianForkliftReportComponent,
    MasterUpdateTechnicianForkliftReportComponent,
    MasterStevedoreTechnicanComponent,
    MasterPlataformTechnicanComponent,
    MasterViewResumenesStevedoreComponent,
    MasterViewResumenesPlatformComponent,
    MasterPersonalMonitoringComponent,
    MasterBatteryMaintenanceComponent,
    MasterPedingComponent,
    MasterRoutesComponent,
    MasterMaintenanceNotificationComponent,
    MasterMaintenanceDurationComponent,
    MasterBrandContentsComponent,
    MasterForkliftMaintenanceComponent,
    MasterMaintenanceSystemComponent,
    MasterModelContentsComponent,
    MasterModelBrandContentsComponent,
    MasterViewPdfCatalogueComponent,
    MasterCreatePdfCatalogueComponent,
    MasterViewPdfTechnicianComponent,
    MasterPendingReportComponent,
    MasterMaintenanceAsingFinishComponent,
    MasterMaintenanceSystemReportComponent,
    MasterEstimateSettlementReportComponent,
    MasterComplianceIndicatorMaintenanceComponent,
    MasterDifferentTimesAssignationComponent,
    MasterMaintenanceForkliftComponent,
    MasterStatusForkliftComponent,
    MasterReportHorometerComponent,
    MasterTimeOutForkliftComponent,
    MasterSupportViewComponent,
    MasterSupportMainComponent,
    MasterSupportRegisterComponent,
    MasterReportMaintenanceSettlementComponent,
    MasterbatteryComponent,
    MasterBatteryDetailComponent,
    MasterTicketsComponent,
    // MasterAdminComponent
  ],
  providers: [
    RestService,
    UserService,
    UploadService,
    WorkService,
    NewService,
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    MonthAgendaService,
    ColorPickerService,
    HorometroService,
    ForkliftService,
    EstimateService,
    FilexcelService,
    SettlementService,
    ModulesService,
    ChecklistService,
    QuestionService,
    ToiletService,
    ResumenesService,
    PlatformsService,
    StevedoreService,
    PersonalService,
    BatteryService,
    PendingService,
    ReportsService,
    SystemsService,
    BrandService,
    SupportService,
  ]
})
export class MasterModule { }
