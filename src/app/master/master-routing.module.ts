import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterUserRegisterComponent } from './master-user-register/master-user-register.component';
import { MasterNewsComponent } from './master-news/master-news.component';
import { MasterForgetPasswordComponent } from './master-forget-password/master-forget-password.component';
import { MasterChangePasswordComponent } from './master-change-password/master-change-password.component';
import { MasterCreateSliderComponent } from './master-create-slider/master-create-slider.component';
import { MasterSliderComponent } from "../master-shared/master-slider/master-slider.component";
import { MasterRegisterThirdComponent } from './master-register-third/master-register-third.component';
import { MasterBranchOfficeComponent } from './master-branch-office/master-branch-office.component';
import { MasterForkliftComponent } from './master-forklift/master-forklift.component';
import { MasterBrandComponent } from './master-brand/master-brand.component';
import { MasterModelComponent } from './master-model/master-model.component';
import { MasterFuelComponent } from './master-fuel/master-fuel.component';
import { MasterTyreComponent } from './master-tyre/master-tyre.component';
import { MasterMachineComponent } from './master-machine/master-machine.component';
import { MasterTypeDocumentComponent } from './master-type-document/master-type-document.component';
import { MasterPaymentConditionComponent } from './master-payment-condition/master-payment-condition.component';
// import { MasterPaymentMarginComponent } from './master-payment-margin/master-payment-margin.component';
import { MasterTaskComponent } from './master-task/master-task.component';
import { MasterCustomersComponent } from './master-customers/master-customers.component';
import { MasterUpdateCustomerComponent } from './master-update-customer/master-update-customer.component';
import { MasterdetailCustomerComponent } from './master-detail-customer/master-detail-customer.component';

import { MasterShowForkliftComponent } from './master-show-forklift/master-show-forklift.component';
import { MasterExternalUserComponent } from './master-external-user/master-external-user.component';
import { MasterRestartPasswordComponent } from "./master-restart-password/master-restart-password.component";
import { MasterWorkDashboardComponent } from "./master-work-dashboard/master-work-dashboard.component";
import { MasterWorkDetailsComponent } from "./master-work-details/master-work-details.component";
import { MasterRoutineDetailsComponent } from './master-routine-details/master-routine-details.component';
import { MasterHorometroComponent } from "./master-horometro/master-horometro.component";
import { MasterForkliftUpdateComponent } from './master-forklift-update/master-forklift-update.component';
import { MasterExternalUserUpdateComponent } from './master-external-user-update/master-external-user-update.component';
import { MasterForkliftShowComponent } from './master-forklift-show/master-forklift-show.component';
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
import { MasterSettlementListComponent } from './master-settlement-list/master-settlement-list.component';
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
import { MasterProfileComponent } from './master-profile/master-profile.component';
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
import { MasterTechnicianForkliftReportComponent } from './master-technician-forklift-report/master-technician-forklift-report.component';
import { MasterRegisterTechnicianForkliftReportComponent } from './master-register-technician-forklift-report/master-register-technician-forklift-report.component';
import { MasterUpdateTechnicianForkliftReportComponent } from './master-update-technician-forklift-report/master-update-technician-forklift-report.component';
import { MasterPlataformTechnicanComponent } from './master-plataform-technican/master-plataform-technican.component';
import { MasterStevedoreTechnicanComponent } from './master-stevedore-technican/master-stevedore-technican.component';
import { MasterViewResumenesStevedoreComponent } from './master-view-resumenes-stevedore/master-view-resumenes-stevedore.component';
import { MasterViewResumenesPlatformComponent } from './master-view-resumenes-platform/master-view-resumenes-platform.component';
import { MasterPersonalMonitoringComponent } from './master-personal-monitoring/master-personal-monitoring.component';
import { MasterBatteryMaintenanceComponent } from './master-battery-maintenance/master-battery-maintenance.component';
import { MasterPedingComponent } from './master-peding/master-peding.component';
import { MasterRoutesComponent } from './master-routes/master-routes.component';
import { MasterMaintenanceDurationComponent } from './master-maintenance-duration/master-maintenance-duration.component';
import { MasterForkliftMaintenanceComponent } from './master-forklift-maintenance/master-forklift-maintenance.component';
import { MasterMaintenanceSystemComponent } from './master-maintenance-system/master-maintenance-system.component';
import { MasterModelContentsComponent } from './master-model-contents/master-model-contents.component';
import { MasterBrandContentsComponent } from './master-brand-contents/master-brand-contents.component';
import {MasterbatteryComponent} from './master-battery/master-battery.component';
import {MasterBatteryDetailComponent} from './master-battery-detail/master-battery-detail.component';
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
import { MasterReportMaintenanceSettlementComponent } from './master-report-maintenance-settlement/master-report-maintenance-settlement.component';
import { MasterEjemploComponent } from './master-ejemplo/master-ejemplo.component';
import { MasterTicketsComponent} from  './master-tickets/master-tickets.component'
// import { MasterMaintenanceNotificationComponent } from './master-maintenance-notification/master-maintenance-notification.component';








const routes: Routes = [
  {
    path: 'condicion',
    component: MasterEjemploComponent
  },
  {
    path:'masterbattery',
    component:MasterbatteryComponent
  },
  {
    path:'masterbattery/:id',
    component: MasterBatteryDetailComponent
  },
  {
    path: 'master',
    component: MasterSliderComponent
  },
  {
    path: 'register',
    component: MasterUserRegisterComponent
  },
  {
    path: 'horometro',
    component: MasterHorometroComponent
  },
  {
    path: 'work_details',
    component: MasterWorkDetailsComponent
  },
  {
    path: 'work_detailsUpdate/:id/:description/:hours/:observation',
    component: MasterWorkDetailsComponent
  },
  {
    path: 'work_dashboard',
    component: MasterWorkDashboardComponent
  },
  {
    path: 'restartPassword/:token',
    component: MasterRestartPasswordComponent
  },
  {
    path: '',
    component: MasterNewsComponent
  },
  {
    path: 'forget',
    component: MasterForgetPasswordComponent
  },
  {
    path: 'changePassword',
    component: MasterChangePasswordComponent
  },
  {
    path: 'createSlider',
    component: MasterCreateSliderComponent
  },
  {
    path: 'registerCustomer',
    component: MasterRegisterThirdComponent
  },
  {
    path: 'registerOffice',
    component: MasterBranchOfficeComponent
  },

  {
    path: 'task',
    component: MasterTaskComponent
  },
  {
    path: 'registerForklift',
    component: MasterForkliftComponent
  },
  {
    path: 'registerBrand',
    component: MasterBrandComponent
  },
  {
    path: 'registerModel',
    component: MasterModelComponent
  },
  {
    path: 'registerFuel',
    component: MasterFuelComponent
  },
  {
    path: 'registerTyre',
    component: MasterTyreComponent
  },
  {
    path: 'registerMachine',
    component: MasterMachineComponent
  },
  {
    path: 'registerTypeDocument',
    component: MasterTypeDocumentComponent
  },
  {
    path: 'registerPaymentCondition',
    component: MasterPaymentConditionComponent
  },
  {
    path: "customers",
    component: MasterCustomersComponent
  },
  {
    path: 'customersUpdate/:id',
    component: MasterUpdateCustomerComponent
  },
  {
    path: 'customersDetail/:id',
    component: MasterdetailCustomerComponent
  },
  {
    path: 'forkliftShow',
    component: MasterShowForkliftComponent
  },
  {
    path: 'externalUser',
    component: MasterExternalUserComponent
  },
  {
    path: 'detailRoutine',
    component: MasterRoutineDetailsComponent
  },
  {
    path: 'forkliftUpdate/:id',
    component: MasterForkliftUpdateComponent
  }, {
    path: 'externalUserUpdate/:id',
    component: MasterExternalUserUpdateComponent
  }, {
    path: 'forkliftShow/:id',
    component: MasterForkliftShowComponent
  }, {
    path: 'forkliftShow/:customer_id/:office_id',
    component: MasterShowForkliftComponent
  }, {
    path: 'resetPasswordLogin',
    component: MasterResetPasswordLoginComponent
  }, {
    path: 'estimateCountries',
    component: MasterEstimateCountriesComponent
  }, {
    path: 'priceCountriesDhl',
    component: MasterPriceCountriesDhlComponent
  }, {
    path: 'estimateCustomer',
    component: MasterEstimateCustomerComponent
  }, {
    path: 'estimateAll',
    component: MasterEstimateAllComponent
  }, {
    path: 'estimateConfiguration',
    component: MasterEstimateConfigurationComponent
  }, {
    path: 'estimateCustomerUpdate/:id',
    component: MasterUpdateEstimateCustomerComponent
  }, {
    path: 'estimateCustomerCopy/:id',
    component: MasterCopyEstimateCustomerComponent
  }, {
    path: 'privacyPolicy',
    component: MasterPrivacyPolicyComponent
  }, {
    path: 'administrarclientes',
    component: MasterPrivacyPolicyComponent
  }, {
    path: 'regionalsAll',
    component: MasterRegionalsComponent
  }, {
    path: 'techniciansAll',
    component: MasterTechniciansComponent,
  }, {
    path: 'registerTechnicians',
    component: MasterCreateTechniciansComponent,
  }, {
    path: 'costCenter',
    component: MasterCostCenterComponent,
  }, {
    path: 'warehouses',
    component: MasterWarehousesComponent
  }, {
    path: 'subCostCenter',
    component: MasterSubCostCenterComponent
  }, {
    path: 'warehousesout',
    component: MasterWarehousesOutComponent
  }, {
    path: 'createWarehousesout',
    component: MasterCreateWarehousesOutComponent
  }, {
    path: 'settlementCustomer',
    component: MasterSettlementCustomerComponent
  }, {
    path: 'settlementAll',
    component: MasterSettlementAllComponent
  }, {
    path: 'settlementCustomerUpdate/:id',
    component: MasterUpdateSettlementCustomerComponent
  }, {
    path: 'modules',
    component: MasterModuleComponent
  }, {
    path: 'moduleRegister',
    component: MasterRegisterModuleComponent
  }, {
    path: 'moduleUpdate/:id',
    component: MasterUpdateModuleComponent
  }, {
    path: 'LogTrm',
    component: MasterLogTrmComponent
  }, {
    path: 'checklists',
    component: MasterChecklistsComponent
  }, {
    path: 'registerChecklist',
    component: MasterRegisterChecklistsComponent
  }, {
    path: 'updateChecklist/:id',
    component: MasterUpdateChecklistsComponent
  }, {
    path: 'settlementList',
    component: MasterSettlementListComponent
  }, {
    path: 'question',
    component: MasterQuestionComponent
  }, {
    path: 'toilet',
    component: MasterToiletComponent
  }, {
    path: 'resumenes',
    component: MasterResumenesComponent
  }, {
    path: 'resumenes/:regional/:customer/:branch',
    component: MasterResumenesComponent
  }, {
    path: 'editResumenes/:id/:regional',
    component: MasterEditResumenesComponent
  }, {
    path: 'prevetiveMaintenance',
    component: MasterPreventiveMaintenanceComponent
  }, {
    path: 'checklistMaintenance',
    component: MasterChecklistMaintenanceComponent
  }, {
    path: 'correctiveMaintenance',
    component: MasterCorrectiveMaintenanceComponent
  }, {
    path: 'platforms',
    component: MasterPlatformsComponent
  }, {
    path: 'platformsRegister',
    component: MasterRegisterPlatformsComponent
  }, {
    path: 'stevedores',
    component: MasterStevedoreComponent
  }, {
    path: 'stevedoresRegister',
    component: MasterRegisterStevedoreComponent
  }, {
    path: 'stevedoresUpdate/:id',
    component: MasterUpdateStevedoreComponent
  }, {
    path: 'plataformsUpdate/:id',
    component: MasterUpdatePlatformComponent
  }, {
    path: 'profile',
    component: MasterProfileComponent
  }, {
    path: 'profileRegister',
    component: MasterRegisterProfileComponent
  }, {
    path: 'profileUpdate/:id',
    component: MasterUpdateProfileComponent
  }, {
    path: 'viewPreventive/:id',
    component: MasterViewResumenesPreventiveComponent
  }, {
    path: 'viewCorrective/:id',
    component: MasterViewResumenesCorrectiveComponent
  }, {
    path: 'viewChecklist/:id',
    component: MasterViewResumenesChecklistComponent
  }, {
    path: 'controlTechnician',
    component: MasterTechnicianMaintenanceComponent
  }, {
    path: 'personalActivities',
    component: MasterPersonalActivitiesComponent
  }, {
    path: 'technicianReport',
    component: MasterTechnicianReportComponent
  }, {
    path: 'reportUpdate/:id',
    component: MasterUpdateTechnicianReportComponent
  }, {
    path: 'reportRegister',
    component: MasterRegisterTechnicianReportComponent
  }, {
    path: 'forkliftReport',
    component: MasterTechnicianForkliftReportComponent
  }, {
    path: 'registerForkliftReport',
    component: MasterRegisterTechnicianForkliftReportComponent
  }, {
    path: 'updateForkliftReport/:id',
    component: MasterUpdateTechnicianForkliftReportComponent
  }, {
    path: 'platformTechinician',
    component: MasterPlataformTechnicanComponent
  }, {
    path: 'stevedoreTechinician',
    component: MasterStevedoreTechnicanComponent
  }, {
    path: 'viewPlatform/:id',
    component: MasterViewResumenesPlatformComponent
  }, {
    path: 'viewStevedore/:id',
    component: MasterViewResumenesStevedoreComponent
  }, {
    path: 'personalMonitoring',
    component: MasterPersonalMonitoringComponent
  }, {
    path: 'batteryForklif',
    component: MasterBatteryMaintenanceComponent
  }, {
    path: 'pending',
    component: MasterPedingComponent
  }, {
    path: 'routes',
    component: MasterRoutesComponent
  },
  // {
  //   path:'notificationDays',
  //   component: MasterMaintenanceNotificationComponent
  // },
  {
    path: 'reportsDuration',
    component: MasterMaintenanceDurationComponent
  }, {
    path: 'reportsForkliftMaintenance',
    component: MasterForkliftMaintenanceComponent
  }, {
    path: 'maintenanceSystem',
    component: MasterMaintenanceSystemComponent
  }, {
    path: 'brandContents',
    component: MasterBrandContentsComponent
  }, {
    path: 'modelContents',
    component: MasterModelContentsComponent
  }, {
    path: 'brandModelContents',
    component: MasterModelBrandContentsComponent
  }, {
    path: 'cataloguePdfUpdate/:id',
    component: MasterViewPdfCatalogueComponent
  }, {
    path: 'createCataloguePdf',
    component: MasterCreatePdfCatalogueComponent
  }, {
    path: 'viewPdfCatalogue',
    component: MasterViewPdfTechnicianComponent
  }, {
    path: 'pendingReport',
    component: MasterPendingReportComponent
  }, {
    path: 'reportAsingFinish',
    component: MasterMaintenanceAsingFinishComponent
  }, {
    path: 'reportSystemMaintenance',
    component: MasterMaintenanceSystemReportComponent
  }, {
    path: 'reportEstimateSettlement',
    component: MasterEstimateSettlementReportComponent
  }, {
    path: 'reportIndicatorMaintenance',
    component: MasterComplianceIndicatorMaintenanceComponent
  }, {
    path: 'reportsDurationTimesMaintenance',
    component: MasterDifferentTimesAssignationComponent
  }, {
    path: 'controlMaintenanceForklift',
    component: MasterMaintenanceForkliftComponent
  }, {
    path: 'statusForklift',
    component: MasterStatusForkliftComponent
  }, {
    path: 'horometerForklift',
    component: MasterReportHorometerComponent
  }, {
    path: 'timeOutForklift',
    component: MasterTimeOutForkliftComponent
  }, {
    path: 'supportMain',
    component: MasterSupportMainComponent
  }, {
    path: 'supportViewTicket/:id',
    component: MasterSupportViewComponent
  }, {
    path: 'supportTicketRegister',
    component: MasterSupportRegisterComponent
  }, {
    path: 'maintenanceSettlement',
    component: MasterReportMaintenanceSettlementComponent
  },
  {
    path:'admin/tickets',
    component:MasterTicketsComponent
  },

];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
