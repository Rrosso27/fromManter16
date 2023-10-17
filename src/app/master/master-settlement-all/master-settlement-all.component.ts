import { Component, Injectable} from '@angular/core';
import { jsPDF } from "jspdf";
const doc = new jsPDF();
import {FormControl, FormGroup, Validators,FormBuilder, FormArray} from '@angular/forms';
import {NgbCalendar, NgbDateParserFormatter,NgbDatepickerI18n, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../../master-services/Rest/rest.service';
import { ForkliftService } from '../../master-services/Forklift/forklift.service';
import { UploadService } from '../../master-services/services/upload.service';
import { UserService } from '../../master-services/User/user.service';
import { EstimateService } from '../../master-services/estimate/estimate.service';
import { SettlementService } from '../../master-services/settlement/settlement.service';
//import * as jsPDF from 'jspdf';
import 'jspdf-autotable';


/*interface jsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}*/

import Swal from 'sweetalert2';
import { Router } from '@angular/router';



interface I18NValues {
  [key: string]: {
    weekdays: string[];
    months: string[];
  };
}

const I18N_VALUES: I18NValues = {
  fr: {
    weekdays: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  },
  // Otros idiomas...
};


interface emailFormat {// item para mostrar selccionados
  email?: string;
  contact?: string;
}


interface itemSelectInterface {// item para mostrar selccionados
  id?: number;
  item?: string;
  description?: string;
  cost?: number;
  quantity?: number;
  active?: boolean;
  type?: boolean;
}


interface fileImage {// item para mostrar selccionados
  content?: any;
  ext?: string;
  url?:string;
}


@Injectable()
export class I18n {
  language = 'fr';
}


@Component({
  selector: 'app-master-settlement-all',
  templateUrl: './master-settlement-all.component.html',
  styleUrls: ['./master-settlement-all.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss'],
})
export abstract class MasterSettlementAllComponent  extends NgbDatepickerI18n {

  public userModel = {
   id: 0,
   name: "",
   roles: []
  };





 names=['','Juan','Pedro'];
 modelPopup: any;
 modelPorpup: any;

 emailsSend: Array <emailFormat> = [];
 emailSend:any ;

 filesImage: Array <fileImage> = [];
 fileImage:any;

 myForm: FormGroup;
 myFormUpdate: FormGroup;
 submitted:boolean = false;
 rowsClient: any;
 rowsTemp: any;
 rowStatic: any;
 rows: any;
 a: any = 5;
 kilo: any;
 elementDelete: any;
 indice:number=0;
 comment:string = '';
 images: Array <any>=[];
 switchCreate :boolean= true;
 switchUpdate:boolean = true;
 change :boolean= true;
 active:boolean = false;
 inactive :boolean= false;
 enabledUpdated:boolean = false;
 creationDate:any;

 filterIndicatorText = false;
 filterIndicatorCheck = false;

 checkHideCode :boolean= false;// false por defecto
 filesEstimateImage:any = 0;

 extImageOne:string = '';
 extImageTwo:string = '';
 extImageThree:string = '';
 extImageFour:string = '';

 rowsTempCheck: any;
 rowsTempText: any;

 currentBrand: any;

 customers: any;
 forklifts: any;

 part:any='';
 codepart:any='';

 numberEstimate:any='';

 subject:any='';
 message:any;
 emails:any;
 quantityItem:any;

 checkAllWorkForce:boolean= false;
 checkAllPart:boolean= false;
 considerDate:boolean=true;
 programate:boolean=false;

 listStatus: any =[];

 selectedBusinessId: any = 0;
 selectedRegionalId:any = 0;
 selectedBranchOfficeId: any = 0;
 selectedUserId: any =0;
 selectedCostCenter: any = 0;
 selectWarehouses: any = 0;
 selectedSubCostCenter: any = 0;
 selectedForkliftId: any = 0;
 selectedDepartmentId = 0;
 selectedCityId = 0;

 customerOffices: any = 0;
 rowsUser:any;
 rowsItemsparts:any;
 rowsItemsWorkforce:any;
 estimateId:any;
 blobGlobal:any;

 forkliftText: any='';
 cityEstimate: any='';
 guarantyEstimate: any='';
 validity: any='';
 payment_method: any='';
 subtotalHours: any='';
 subtotalParts : any='';
 total: any='';
 observationEstimate: any='';
 numberSettlement: any='';
 numberInvoice: any='';

 user:any;
 consecutive:any;
 documentCustomer:any;
 nameCustomer:any;
 contact:any;
 cellphone:any;

 estimateCurrent:any;

 s3info:any;
 detailform: FormGroup;

 masterEmail: any ;
 masterName: any='';

 rowsItemsWorkforceApproval: any;
 rowsItemsPartsApproval: any;

 itemsWorkforce: Array <itemSelectInterface> = [];
 itemWorkforce:itemSelectInterface;

 itemsPart: Array <itemSelectInterface> = [];
 itemPart:itemSelectInterface;

 itemsFinalApproval: Array <itemSelectInterface> = [];

 rejectionsEstimate: any;
 imageGlobal: any;

 columns = [
   { name: 'Estado', prop: 'status'}
 ];

 columnWidths = [
   {column: "status", width: 200}
 ];

 partUpdateTemp:any;

 fromDate: NgbDateStruct;
 untilDate: NgbDateStruct;
 today:any = this.calendar.getToday();
 masterSelected:boolean;
 checklist:any;

 emailCustomer: any = '';
 emailShow: any = '';


 regional: any;
 warehouses: any;
 costCenters: any;
 subCostCenter: any;
 branchOffices: any;

 rowsItemsCustomer: any;

 regionalDescription:any ;
 costCenterDescription:any;
 warehouseDescription:any ;
 estimate:any;
 totalCost = 0;
 num: any;
 date: any;
 invoice: any;
 settlementId: any;
 days:any=0;
 departments: any;
 cities: any;
 subCenter:any;
 email:any=[];

 constructor(private restService: RestService, private _i18n: I18n, private router: Router, private estimateService: EstimateService, private forkliftService: ForkliftService,
             private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private userService: UserService,  private uploadService: UploadService,   private formbuilder:FormBuilder, private settlementeService: SettlementService) {
               super();


               const subject = new FormControl('',Validators.required);
               //const work = new FormControl('');
               const comment = new FormControl('');
               this.detailform= this.formbuilder.group({
                 subject:subject,
                 emails:this.formbuilder.array([
                   this.formbuilder.group({
                     email:['']
                   }),
                   this.formbuilder.group({
                     name:['']
                   })
                 ]),
                 comment:comment
               })

               var date = new Date();
               var ngbDateStruct = { day: date.getDate(), month: date.getMonth()+1, year: date.getFullYear()};


               this.restService.getRegionalAll().then(data => {
                const resp: any = data;
                console.log(data);
                Swal.close();
                this.regional  = resp.data;
              }).catch(error => {
                console.log(error);
              });


               this.fromDate=ngbDateStruct;
               this.untilDate=ngbDateStruct;

               console.log(   this.fromDate);
               console.log(   this.untilDate);

               this.getUser();
               this.masterSelected = false;
               this.checklist = [
                 {id:1,value:'APROBADO',isSelected:false},
                 {id:2,value:'ENVIADO',isSelected:false},
                 {id:3,value:'GENERADO',isSelected:false},
                 {id:4,value:'RECHAZADO',isSelected:false}
               ];
 /*  Swal({
     title: 'Validando información ...',
     allowOutsideClick: false
   });
   Swal.showLoading();

   this.restService.getBrands().then(data => {
     const resp: any = data;
     console.log(data);
     Swal.close();
     this.rowsClient = resp.data;
     this.rowStatic =  resp.data;
     this.rowsTemp = resp.data;
     console.log( this.rowsClient);
   }).catch(error => {
     console.log(error);
   });*/



   this.loadingData();

   const description = new FormControl('', Validators.required);
   const descriptionUpdate = new FormControl('', Validators.required);


   this.myForm = new FormGroup({
     description: description
   });

   this.myFormUpdate = new FormGroup({
     descriptionUpdate: descriptionUpdate
   });
 }


  loadingData() {
   Swal({
     title: 'Validando información ...',
     allowOutsideClick: false
   });
   Swal.showLoading();

    this.getEstimateFiltersInitial();
  /* this.forkliftService.getForklifts().then(data => {
     const resp: any = data;
     console.log(data);
     Swal.close();
     this.rowsClient = resp.data;
     this.rowStatic =  resp.data;
     this.rowsTemp = resp.data;
     console.log( this.rowsClient);
   }).catch(error => {
     console.log(error);
   });*/

 }
  updateFilter(event) {
   const val = event.target.value.toLowerCase();
   // filter our data

   if (val === '') {
     console.log('vacio');
     this.filterIndicatorText = false;
     this.rowsTemp = this.rowStatic;
   }

   // this.filterIndicatorCheck = true;
   if (this.inactive === true ||  this.active === true) {
     this.rowsTemp = this.rowsTempCheck;
   }
   const temp = this.rowsTemp.filter(function(d) {
     return d.brand_description.toLowerCase().indexOf(val) !== -1 || !val;
   });

   if (val !== '') {
     this.filterIndicatorText = true;
     this.rowsTempText = temp;
   }

   // update the rows
   this.rowsClient = temp;

 }

 getWeekdayShortName(weekday: number): string {
   return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
 }
 getMonthShortName(month: number): string {
   return I18N_VALUES[this._i18n.language].months[month - 1];
 }
 getMonthFullName(month: number): string {
   return this.getMonthShortName(month);
 }


getWarehouses() {
  //selectedCostCenterId
  this.restService.getWarehousesSettlement(this.selectedRegionalId.id).then(data => {
    const resp: any = data;
    console.log(data);
    Swal.close();
    this.warehouses  = resp.data_warehouses;
  }).catch(error => {
    console.log(error);
  });
}

 getSubCostCenter(){
  console.log('regional-costCenter');
  console.log(this.selectedRegionalId);
  this.settlementeService.getSubCostCenter(this.selectedRegionalId.id).then(data => {
    console.log(data);
    const resp: any = data;
    this.subCostCenter=resp.data_subcostcenters;
  }).catch(error => {
    console.log(error);
 });
}

getCenterCost() {
  this.getCustomerRegionals();
  this.getWarehouses();
  this.getSubCostCenter();
  //selectedCostCenterId
  this.restService.getCostCenterSettlement(this.selectedRegionalId.id).then(data => {
    const resp: any = data;
    console.log(data);
    Swal.close();
    this.costCenters  = resp.data_costcenters;
  }).catch(error => {
    console.log(error);
  });
}


getCustomerRegionals() {
  this.restService.getRegionalCustomers(this.selectedRegionalId.id).then(data => {
    const resp: any = data;
    console.log(data);
    Swal.close();
    this.customers  = resp.data;

    //asignar valores customer;

  }).catch(error => {
    console.log(error);
  });
 }

 getBranchOffices() {
  if(this.selectedBusinessId!=0){

  // Llenar información de cliente
  this.documentCustomer = this.selectedBusinessId.document_id;
  this.nameCustomer = this.selectedBusinessId.business_name;
  this.cellphone = this.selectedBusinessId.telephone;
  this.contact =  '';
  // this.days = this.selectedBusinessId.day;
  this.selectedDepartmentId = this.selectedBusinessId.department_id;
  // Se cargan las las ciudades y la ciudad del cliente
  this.getCities();

  this.restService.getOffice(this.selectedBusinessId.id).then(data => {
    const resp: any = data;
    console.log('oficinas: '+data);
    Swal.close();
    this.branchOffices  = resp.data;
  }).catch(error => {
    console.log(error);
  });

  /*this.restService.getRegionalCustomer(this.selectedBusinessId.id).then(data => {
    const resp: any = data;
    console.log(data);
    Swal.close();
    this.regionals  = resp.data_customerRegionals;
  }).catch(error => {
    console.log(error);
  });*/

}else{
  this.selectedDepartmentId=0;
  this.selectedCityId=0;
  this.documentCustomer = '';
  this.nameCustomer ='';
  this.cellphone = '';
  this.contact =  '';
  this.days =0;
  this.selectedBranchOfficeId=0;
  this.selectedForkliftId=0;
}
}

getCities() {
  console.log('oleole');
  console.log(this.selectedDepartmentId);
  this.restService.getCities(this.selectedDepartmentId).then(data => {
    const resp: any = data;
    console.log(data);
    Swal.close();
    this.cities = resp.data;
    if(this.selectedBusinessId.city_id){
      console.log('this.selectedBusinessId.city_id');
      console.log(this.selectedBusinessId.city_id);
      this.selectedCityId=this.selectedBusinessId.city_id;
    }
    console.log( this.cities);
  }).catch(error => {
    console.log(error);
  });
}


 changeConsiderDate(event: any){
 if(this.considerDate==true){
   this.considerDate=false;
 }else{
   this.considerDate=true;
 }

 console.log('------');
 console.log(this.considerDate);

 }

 updateFilterActiveInactive(active: string) {
   const val = active;

   // filter our data

   if (this.filterIndicatorText === true) {
     this.rowsTemp = this.rowsTempText;
   } else {
     console.log('vacio por este lado');
     this.rowsTemp = this.rowStatic;
   }

   const temp = this.rowsTemp.filter(function(d) {
     return d.status.toLowerCase().indexOf(val) !== -1 || !val;
   });

   // update the rows

   if (this.inactive === true ||  this.active === true) {
     this.rowsTempCheck = temp;
     this.filterIndicatorCheck = true;
   }

   this.rowsClient = temp;
 }


 downloadPdf(item: any, ind: number){
   Swal.showLoading();
 console.log('item :'+ JSON.stringify(item));
 console.log(item);
 this.estimateId= item.id;
 this.user = item.elaborate_user.username
 this.consecutive = item.settlement_consecutive;
 this.documentCustomer = item.customer_document;
 this.nameCustomer = item.customer.business_name;
 this.cellphone =   item.telephone;
 this.creationDate = item.create_at_date;

 if(item.forklift_text){
   this.forkliftText = item.forklift_text;
 }else{
   this.forkliftText = '';
 }

 this.estimate = item.estimate_order;
 this.subtotalHours = item.subtotal_hours;
 this.subtotalParts = item.subtotal_parts;
 this.total = item.total;
 this.observationEstimate= item.observation;
 this.regionalDescription = item.regional.description;
 this.costCenterDescription = item.cost_center.description;
 this.warehouseDescription = item.warehouse.description;
 this.date = item.create_at_date;
  // 0 Solo para descargar y 1 para enviar;

// this.pp( this.estimateId);
console.log('download ole');

 this.getSettlementParts(ind);
 }




 getSettlementParts(ind: number) {
   console.log('entro parts');
   if(this.estimateId){
     this.settlementeService.getSettlementDetailsParts(this.estimateId).then(data => {
       console.log('Datos de partes');
       console.log(data);
       const resp: any = data;
       this.rowsItemsparts=resp.data;

       this.getSettlementWorkforce(ind);

     }).catch(error => {
       console.log(error);
     });
   }
  }

  getSettlementWorkforce(ind: number)
{
  console.log('Ingreso a la mano de obra');
   if(this.estimateId){
     this.settlementeService.getSettlementDetailsWorkforce(this.estimateId).then(data => {
       const resp: any = data;
       console.log('data de horas');
       console.log(data);
       this.rowsItemsWorkforce=resp.data;
       // this.download3(ind);
       this.getSettlementDetailCustomer(ind);
     }).catch(error => {
       console.log(error);
     });
   }
  }

 getSettlementDetailCustomer(ind: number){

  console.log('Ingreso a la mano de obra');
   if(this.estimateId){
     this.settlementeService.getSettlementDetailsCustomer(this.estimateId).then(data => {
       const resp: any = data;
       console.log('datos de customer con settlemente');
       console.log(data);
       this.rowsItemsCustomer=resp.data;
       // this.download3(ind);
        this.getFilesImage(ind);    //Se omite carga de imagenes
     }).catch(error => {
       console.log(error);
     });
   }
 }

 async getSubCenter(id: any){
  console.log('Id sub centro: '+id);

   await this.settlementeService.getSubCostCenters(id).then(data => {
    const resp: any = data;
      console.log('datos de sub centro con settlemente');
      console.log(data);
      this.subCenter=resp.data;
      console.log(this.subCenter);
      console.log(this.subCenter[0].description);

       this.subCenter=this.subCenter[0].description;

      return this.subCenter

    }).catch(error => {
      console.log(error);
    });

 }


 totalComparison(totalCustomer:number, totalDetail:number){
  console.log('Total de factura detalle' + totalDetail);
  console.log('Total de factura cliente' + totalCustomer);
   if(this.estimateId){
     this.settlementeService.totalComparisonSettlement(this.estimateId).then(data => {
       const resp: any = data;
       console.log('datos de customer con settlemente');
       console.log(data);

       let difference = resp.data;
      console.log(resp.data);
      console.log(resp.data.difference);
      console.log(difference.difference);
       if(resp.data.difference == 0){
        this.sendEmailEstimateAmazon();
       }else{
        Swal({
        type: 'error',
        title: 'Oops a currido un error',
        text: 'Los totales de Factura HGI y Factura Cliente son diferentes'
        });
       }
     }).catch(error => {
       console.log(error);
     });
   }
 }
  // Estos consumos es para la vista de aprobación

  getEstimatePartsApproval(ind: number) {
   if(ind){
     this.estimateService.getEstimateDetailsParts(ind).then(data => {
       const resp: any = data;
       this.rowsItemsPartsApproval=resp.data;

       console.log('información de items');
       console.log( this.rowsItemsPartsApproval);

       this.itemsPart=[];
       this.itemsWorkforce=[];
       this.rowsItemsPartsApproval.forEach((item)=>{
         console.log(item);
         let unitPrice =  Number(item.price)/Number(item.quantity);
         this.itemPart={
           id: item.id,
           item: item.item,
           description: item.description,
           cost: unitPrice,
           quantity: item.quantity,
           active: false
         }
         this.itemsPart.push(this.itemPart);
       });


       this.getEstimateWorkforceApproval(ind);
     }).catch(error => {
       console.log(error);
     });

   }
  }

  getEstimateWorkforceApproval(ind: number) {

   if(ind){
     this.estimateService.getEstimateDetailsWorkforce(ind).then(data => {

       const resp: any = data;
       this.rowsItemsWorkforceApproval=resp.data;
       Swal.close();
       console.log(this.rowsItemsWorkforceApproval);
       this.rowsItemsWorkforceApproval.forEach((item)=>{
         let unitPrice =  Number(item.price)/Number(item.quantity);
         this.itemWorkforce={
           id: item.id,
           item: item.item,
           description: item.service,
           cost: unitPrice,
           quantity: item.quantity,
           active: false
         }
         this.itemsWorkforce.push(this.itemWorkforce);
       });

     }).catch(error => {
       console.log(error);
     });
   }
  }


  sendEmail(){
   console.log('entro sendEmail');


   // Si el estatus es

   let ind=1; // 0 Solo para descargar y 1 para enviar;
   this.getSettlementParts(ind);
  }


  sendEmailEstimateAmazon(){
    console.log('IMPORTANTE INGRESO');

   let nameFileEstimate ='Liquidacion_No_'+this.consecutive+'.pdf';
   this.uploadService.uploadFilesAllSettlement(this.blobGlobal, this.estimateCurrent.id,3,nameFileEstimate).then(res=>{
   console.log('s3info'+JSON.stringify(res));
   this.s3info=res;
   console.log(this.s3info);
   console.log('Cargo la info en s3 6/3/20');
   //Aqui va el codigo para enviar correo
   this.sendEmailFinal();

 /*  Swal({
     title: 'Liquidación almacenada',
     type: 'success'
    });*/

   //this.insertNew();
 }).catch(error=> {
   console.log(error);
   Swal({
     type: 'error',
     title: 'oops a currido un error',
     text:'se ha presentado un error',
     allowOutsideClick: false
   });
 });
}

selectEvent(item) {
 console.log('este es el item: '+JSON.stringify(item));
 this.masterName = item.email;
 // masterName
 // do something with selected item
}

onChangeSearch(search: string) {
 console.log('search:' +JSON.stringify(search));}

onFocused(e) {
console.log('este es el e:'+ +JSON.stringify(e));
}



  upload() {

   this.uploadService.uploadFileForkliftUpdate3(this.blobGlobal).then(res=>{
     console.log('que paso');
     console.log(this.blobGlobal);
     console.log('s3info'+JSON.stringify(res));
     this.s3info=res;
     console.log(this.s3info);
     //this.insertNew();
   }).catch(error=> {
     console.log(error);
     Swal({
       type: 'error',
       title: 'oops a currido un error',
       text: error,
       allowOutsideClick: false
     });
   });
   }

   sendSettlementEmail(row:any){
  console.log(row)
  this.checkHideCode=false;

     this.estimateId= row.id;
     this.user = row.elaborate_user.username;
     this.consecutive = row.settlement_consecutive;
     this.documentCustomer = row.customer_document;
     this.nameCustomer = row.customer.business_name;
     this.contact = row.contact;
     this.cellphone =   row.telephone;
     this.creationDate = row.create_at_date;

     console.log(this.forkliftText);
  console.log(row.forklift_text);
  if( row.forklift_text){
      console.log("entro if");
    this.forkliftText = row.forklift_text;
    console.log(this.forkliftText);
  }else{
    console.log("entro else");
    this.forkliftText = '';
  }
     this.estimate = row.estimate_order;
      this.subtotalHours = row.subtotal_hours;
      this.subtotalParts = row.subtotal_parts;
      this.total = row.total;
      this.observationEstimate= row.observation;
      this.regionalDescription = row.regional.description;
      this.costCenterDescription = row.cost_center.description;
      this.warehouseDescription = row.warehouse.description;
      this.date = row.create_at_date;

     this.emailsSend = [];
     this.subject = '';
     this.comment = '';
     console.log('entro a email');
     console.log('cotización actual:'+ row);
     this.estimateCurrent= row;
     document.getElementById( 'showEmail').click();
     this.getEmailCustomer();
   }

   getEmailCustomer(){//this.estimateCurrent.customer_id
     this.estimateService.getEmailsCustomer(this.estimateCurrent.customer_id).then(data=>{
       const resp: any = data;
       console.log('emails');
       this.emailCustomer= resp.data;
       console.log(this.emailCustomer);
       for(let em of this.emailCustomer){
         if(em.email ==="facturacion@montacargasmaster.com" || em.email ==="auxcomprasant@montacargasmaster.com"){
           console.log(em);
          }else{
            this.email.push(em);
           console.log('correcto');
         }
       }
       //Poner un for para los email's
       console.log(this.emailCustomer);
     }).catch(error=> {
       console.log(error);
     });
   }

   assignInvoice(){
    console.log('entro a email');
    console.log(this.invoice);
    Swal.showLoading();
    this.settlementeService.assingInvoice(this.invoice, this.settlementId).then(data => {
      console.log(data);
      const resp: any = data;
      console.log('envio');
      console.log(resp);
      this.settlementeService.updateSettlementStatus(
        this.settlementId, 1).then(data => {
        const resp: any = data;
        console.log('envio');
        console.log(resp);
        this.getEstimateFiltersInitial();
         document.getElementById('assignInvoiceHide').click();
         this.invoice = "";
         Swal({
           title: 'Factura Asignada',
           type: 'success'
          });
       }).catch(error => {
         console.log(error);
       });
       }).catch(error => {
         console.log(error);
       });
   }


   showAssignInvoice(row){
    console.log(row)
    this.settlementId = row.id;
    document.getElementById( 'showAssignInvoice').click();

   }

   showCheckItems(row: any){
     let rowCurrent= row;
     this.estimateCurrent=row;
     this.getEstimatePartsApproval(rowCurrent.id);
     this.checkAllPart=false;
     this.checkAllWorkForce= false;
     Swal({
       title: 'Obteniendo información ...',
       allowOutsideClick: false
     });
     Swal.showLoading();

    // this.getEstimateWorkforceApproval(rowCurrent.id);
     //this.checkItemsApprove(rowCurrent);
     document.getElementById( 'showCheckItem').click();

     Swal.close();
   }

   checkItemsApprove(row: any){
     let rowCurrent= row

   }


   rejectionEstimate(row: any){
     this.estimateCurrent = row;
     let rowCurrent= row;
     this.estimateService.getRejectionsEstimate().then(data => {
       const resp: any = data;
       console.log('info de filter');
       console.log(data);
       Swal.close();
      // this.customers  = resp.data;
        this.rejectionsEstimate = resp.data;
       // this.rowStatic =  resp.data;
       // this.rowsTemp = resp.data;
       // console.log( this.rowsClient);
     }).catch(error => {
       console.log(error);
     });
     document.getElementById( 'showRejection').click();
   }


   sendEmailEstimate(){

     Swal({
       title: 'Validando información ...',
       allowOutsideClick: false
     });
     Swal.showLoading();
     // Validar forma de envio de correo--
     // armar json de correos con nombres--
     // cargar pdf a s3
     // validar check para cambiar el pdf--
     // sendEstimateEmail

     //

     //this.download3(1);
     console.log('este debe pasar este lado ps');

     //if( this.estimateCurrent.status === 0){
       this.sendEmail();
       console.log('Ingreso para armar el correo');
     /*}else{
       this.sendEmailFinal();
       console.log('Solo para enviar el correo');
     }*/
     this.emailCustomer='';
       console.log('este debe pasar este lado ps sssssssssssssss');
    }




    sendEmailFinal(){
     let subjectTemp; //= 'Montacargas Master Cotización '+
    //  console.log(this.estimateCurrent.estimate_consecutive);
     console.log('Sujet importante');
     if((this.subject.trim()).length>0){
       console.log('importante el subject:'+this.subject)
       subjectTemp= this.subject;
      }else{
        subjectTemp= 'Montacargas Master Liquidación '+ this.consecutive;
        console.log('subjectTemp el subject: '+subjectTemp)
     }
    // concatenar los correos y nos con ","
   let emailsName = '';
    for (let i = 0; i < this.emailsSend.length; i++) {
      if(i!==0){
       emailsName=emailsName+'|';
      }
       emailsName=emailsName+this.emailsSend[i].email+'|'+this.emailsSend[i].contact;
    }

    if( this.masterEmail != '' ||  this.masterName != '' ){

     emailsName= this.masterEmail+'|'+ this.masterName+'|'+ emailsName;
   }

    console.log('------------------');
    console.log(emailsName);
    console.log('---------------------');

     if(this.emailsSend.length>0){


     this.settlementeService.sendSettlementEmailAmazon(//sendEstimateEmailAmazon
       this.estimateCurrent.elaborate_user_id, this.estimateCurrent.customer_id, this.estimateCurrent.id,
       emailsName.trim(),this.comment,subjectTemp).then(data => {
       const resp: any = data;
       console.log('envio');
       console.log(JSON.stringify(resp));
       console.log(resp);
       console.log(resp.data);

       if(resp.status == 200){

        console.log('no error');
        console.log('Entro a cambiar estatus');
        this.settlementeService.updateSettlementStatus(
        this.estimateCurrent.id, 2).then(data => {
        const resp: any = data;
        console.log('envio');
        console.log(resp);
        this.getEstimateFiltersInitial();
        document.getElementById('emailDetailHide') ?.click();
        Swal.fire({
          title: 'Correo enviado',
          icon: 'success'
          });
          this.masterEmail='';
          this.masterName='';
         // this.checkHideCode=false;
      }).catch(error => {
         console.log('error');
         console.log('error');
         Swal.fire({
          title: 'Error al enviar el correo',
          text:'Por favor verificar que los archivos adjuntos no tengan caracteres especiales en los nombres, ó debe ingresar por lo menos un correo',
          icon: 'error'
         });
      Swal.fire({
       title: 'Error al enviar el correo',
       text:'Por favor verificar que los archivos adjuntos no tengan caracteres especiales en los nombres, ó debe ingresar por lo menos un correo',
       icon: 'error'
      });
      });

     }else{
      console.log('error');
      Swal.fire({
       title: 'Error al enviar el correo',
       text:'Por favor verificar que los archivos adjuntos no tengan caracteres especiales en los nombres, ó debe ingresar por lo menos un correo',
       icon: 'error'
      });
     }


     }).catch(error => {
       console.log(error);
     });
   }else if( this.masterEmail != '' ||  this.masterName != '' ){

    this.settlementeService.sendSettlementEmailAmazon(//sendEstimateEmailAmazon
       this.estimateCurrent.elaborate_user_id, this.estimateCurrent.customer_id, this.estimateCurrent.id,
       emailsName.trim(),this.comment,subjectTemp).then(data => {
       const resp: any = data;
       console.log('envio');
       console.log(resp);

       if(resp.status == 200){
          console.log('no error');
          this.settlementeService.updateSettlementStatus(
          this.estimateCurrent.id, 2).then(data => {
          const resp: any = data;
          console.log('envio');
          console.log(resp);
          this.getEstimateFiltersInitial();
          document.getElementById('emailDetailHide')?.click();
          Swal.fire({
            title: 'Correo enviado',
            icon: 'success'
            });
            this.masterEmail='';
            this.masterName='';
            // this.checkHideCode=false;
        }).catch(error => {
          console.log(error);
          console.log('error');
          Swal.fire({
           title: 'Error al enviar el correo',
           text:'Por favor verificar que los archivos adjuntos no tengan caracteres especiales en los nombres, ó debe ingresar por lo menos un correo',
           icon: 'error'
          });
        });

       }else{
         console.log(this.masterEmail);
        console.log('error');
        Swal({
         title: 'Error al enviar el correo',
         text:'Por favor verificar que los archivos adjuntos no tengan caracteres especiales en los nombres, ó debe ingresar por lo menos un correo',
         type: 'error'
        });
       }


     }).catch(error => {
       console.log(error);
       console.log('error');
       Swal({
        title: 'Error al enviar el correo',
        text:'Por favor verificar que los archivos adjuntos no tengan caracteres especiales en los nombres, ó debe ingresar por lo menos un correo',
        type: 'error'
       });
     });
   }else{
     Swal({
       text:'Debe ingresar por lo menos un correo electrónico valido',
       type: 'error'
      });
   }
    //este es el codigo para enviar el correo
    }


  loadPdfSendEmail(ind: number){



   // this.pp();



   let months = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
   let days = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
   let currentDate = new Date(this.creationDate.replace('-','/'));
   let currentDateFormat = days[currentDate.getDay()] + ", " + (currentDate.getDate()) + " de " + months[currentDate.getMonth()] + " de " + currentDate.getFullYear();
   var body_table = [];


   let imageurl = 'data:image/png;base64,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';
   const doc = new jsPDF('p', 'px', 'a4');
   console.log('Ingreso armar el pdf');


   var width = doc.internal.pageSize.width;
   var height = doc.internal.pageSize.height;

   console.log('este es el ancho'+width);
   console.log('este es el alto'+height);

   doc.autoTable({
     startY: 7,
     columnStyles:{2: { cellWidth:50, fontSize:8,   fillColor: null},  1: {cellWidth:260,fontSize:8, halign: 'left',fillColor: null},  0: {cellWidth:90,fontSize:8, halign: 'left', fillColor: null} },
     alternateRowStyles:{fontSize:9},
     margin: { left: 15},
     body: [[currentDateFormat,'', '1 de 1' ]]

   });


   doc.text('Liquidación de Facturación', 230, 55, 'center');
   doc.addImage(imageurl, 'PNG', 15, 60, 120, 42);
   //doc.text('Cotizacción', 230, doc.image.previous.finalY, 'center');

   doc.autoTable({
     startY: 60,
     columnStyles:{0: { cellWidth:105, fontSize:9,   fillColor: null} },
     alternateRowStyles:{fontSize:9},
     margin: {top: 60, right: 15, bottom: 0, left: 135},
     body: [['Soluciones integrales para el movimiento interno de sus mercancias' ]]

   });

   doc.autoTable({

    startY: 85,
    columnStyles:{0: { cellWidth:180, fontSize:9,  fillColor: null},  1: {fontSize:12, halign: 'center', fillColor: null, textColor:[255, 0, 0] }},
    alternateRowStyles:{fontSize:9},
    margin: {top: 60, right: 15, bottom: 0, left: 135},
    body: [ ['Creado Por: '+ this.user,'No. ' + this.consecutive ]]
  });

   doc.autoTable({
    startY: doc.autoTable.previous.finalY,
    theme:'grid',
    styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
    columnStyles: {
     0: { fontSize:9, cellWidth:190, fillColor: null},
     1: { fontSize:9, cellWidth:125, fillColor: null},
     2: { fontSize:9, cellWidth:99, fillColor: null},
    },
    margin: { left: 15},
    body: [['Cliente: '+ this.nameCustomer,'Bodega: '+ this.warehouseDescription,'Fecha: '+ this.date]]
  });

  console.log('this.estimate')
  console.log(this.estimate)
  if(this.estimate == null){
    this.estimate = '';
  }

   doc.autoTable({
    startY: doc.autoTable.previous.finalY,
    theme:'grid',
    styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
    columnStyles: {
     0: { fontSize:9, cellWidth:120, fillColor: null},
     1: { fontSize:9, cellWidth:150, fillColor: null},
     2: { fontSize:9, cellWidth:144, fillColor: null},
    },
    margin: { left: 15},
    body: [['Sucursal: '+ this.regionalDescription,'C.Costos: '+ this.costCenterDescription,'OC/Cotización: Pedido No: '+ this.estimate]]
  });

   doc.autoTable({
    startY: doc.autoTable.previous.finalY,
    theme:'grid',
    styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
    columnStyles: {
     0: { fontSize:9, cellWidth:214, fillColor: null},
     1: { fontSize:9, cellWidth:200, fillColor: null},
    },
    margin: { left: 15},
    body: [['Maquina: ' + this.forkliftText, '']]
  });

   doc.autoTable({
    startY: doc.autoTable.previous.finalY,
    theme:'grid',
    styles: {fillColor: [215,215,215],valign:"top",lineColor:[4,1,0],lineWidth:0.2},
    columnStyles: {0: {halign: 'center'},  }, // Cells in first column centered and green
    margin: {top: 60, right: 15, bottom: 0, left: 15},
    body: [['Factura HGI']]
  });


   //Vamos en este punto


   //**********************************************************     */


    console.log('esta parte es importante YCV ');
    console.log(this.checkHideCode);
   if(this.checkHideCode){
    doc.autoTable({
      startY: doc.autoTable.previous.finalY,
      theme:'grid',
      styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
      columnStyles: {
      0: {halign: 'center', fontSize:9, cellWidth:20},
      1: {halign: 'center', fontSize:9, cellWidth:50},
      2: {halign: 'center', fontSize:9, cellWidth:120},
      3: {halign: 'center', fontSize:9, cellWidth:50},
      4: {halign: 'center', fontSize:9, cellWidth:26},
      5: {halign: 'center', fontSize:9, cellWidth:50},
      6: {halign: 'center', fontSize:9, cellWidth:40},
      7: {halign: 'center', fontSize:9, cellWidth:55}
      },
      margin: { left: 15},
      body: [['','REFERENCIA','DESCRIPCIÓN','SUB. CCOST','CANT.','VLR. UNIT.','DESC%','TOTAL']]
    });
   }else{
    doc.autoTable({
      startY: doc.autoTable.previous.finalY,
      theme:'grid',
      styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
      columnStyles: {
      0: {halign: 'center', fontSize:9, cellWidth:20},
      1: {halign: 'center', fontSize:9, cellWidth:50},
      2: {halign: 'center', fontSize:9, cellWidth:120},
      3: {halign: 'center', fontSize:9, cellWidth:50},
      4: {halign: 'center', fontSize:9, cellWidth:26},
      5: {halign: 'center', fontSize:9, cellWidth:50},
      6: {halign: 'center', fontSize:9, cellWidth:40},
      7: {halign: 'center', fontSize:9, cellWidth:55}
      },
      margin: { left: 15},
      body: [['','REFERENCIA','DESCRIPCIÓN','SUB. CCOST','CANT.','VLR. UNIT.','DESC%','TOTAL']]
    });
   }



 // doc.save('Cotizacion_No_'+ this.consecutive+'.pdf');
 console.log('Info importante');

 //ifff
 if(this.checkHideCode){
  let j = 1;
  if(this.rowsItemsparts.length>0){
   for (let i = 0; i < this.rowsItemsparts.length; i++) {
 //Este total se debe remplazar por el subtotal_parts que se encuentra en la tabla de settlement
     let value=  Number(this.rowsItemsparts[i].subtotal);
     this.totalCost = Number(this.totalCost + value);

     console.log('total');
     console.log(this.rowsItemsparts[i].subtotal_decimal);
     if(this.rowsItemsparts[i].sub_cost_center == null){
       body_table = [i+1, this.rowsItemsparts[i].code, this.rowsItemsparts[i].description, '', this.rowsItemsparts[i].quantity, '$'+this.rowsItemsparts[i].price_decimal, this.rowsItemsparts[i].discount,   '$'+this.rowsItemsparts[i].subtotal_decimal];
     }else{
       body_table = [i+1, this.rowsItemsparts[i].code, this.rowsItemsparts[i].description, this.rowsItemsparts[i].sub_cost_center.code+'-'+this.rowsItemsparts[i].sub_cost_center.description, this.rowsItemsparts[i].quantity, '$'+this.rowsItemsparts[i].price_decimal, this.rowsItemsparts[i].discount,   '$'+this.rowsItemsparts[i].subtotal_decimal];
     }
     console.log(this.totalCost);



      doc.autoTable({
        startY: doc.autoTable.previous.finalY,
        theme:'grid',
        styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
        columnStyles: {
         0: {halign: 'center', fontSize:9, cellWidth:20},
         1: {halign: 'center', fontSize:9, cellWidth:50},
         2: {fontSize:9, cellWidth:120},
         3: {halign: 'center', fontSize:9, cellWidth:50},
         4: {halign: 'center', fontSize:9, cellWidth:26},
         5: {halign: 'center', fontSize:9, cellWidth:50},
         6: {halign: 'center', fontSize:9, cellWidth:39},
         7: {halign: 'center', fontSize:9, cellWidth:55}
         },
        margin: { left: 15},
        body: [ body_table ]
      });
      j ++;
     }

   }

 }else{
 let j = 1;
 if(this.rowsItemsparts.length>0){
  for (let i = 0; i < this.rowsItemsparts.length; i++) {
//Este total se debe remplazar por el subtotal_parts que se encuentra en la tabla de settlement
    let value=  Number(this.rowsItemsparts[i].subtotal);
    this.totalCost = Number(this.totalCost + value);

    console.log('total');
    console.log(this.rowsItemsparts[i].subtotal_decimal);
    if(this.rowsItemsparts[i].sub_cost_center == null){
      body_table = [i+1, this.rowsItemsparts[i].code, this.rowsItemsparts[i].description, '', this.rowsItemsparts[i].quantity, '$'+this.rowsItemsparts[i].price_decimal, this.rowsItemsparts[i].discount,   '$'+this.rowsItemsparts[i].subtotal_decimal];
    }else{
      body_table = [i+1, this.rowsItemsparts[i].code, this.rowsItemsparts[i].description, this.rowsItemsparts[i].sub_cost_center.code+'-'+this.rowsItemsparts[i].sub_cost_center.description, this.rowsItemsparts[i].quantity, '$'+this.rowsItemsparts[i].price_decimal, this.rowsItemsparts[i].discount,   '$'+this.rowsItemsparts[i].subtotal_decimal];
    }
    console.log(this.totalCost);



     doc.autoTable({
       startY: doc.autoTable.previous.finalY,
       theme:'grid',
       styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
       columnStyles: {
        0: {halign: 'center', fontSize:9, cellWidth:20},
        1: {halign: 'center', fontSize:9, cellWidth:50},
        2: {fontSize:9, cellWidth:120},
        3: {halign: 'center', fontSize:9, cellWidth:50},
        4: {halign: 'center', fontSize:9, cellWidth:26},
        5: {halign: 'center', fontSize:9, cellWidth:50},
        6: {halign: 'center', fontSize:9, cellWidth:39},
        7: {halign: 'center', fontSize:9, cellWidth:55}
        },
       margin: { left: 15},
       body: [ body_table ]
     });
     j ++;
    }

  }
}

if(this.checkHideCode){
  let j = 1;
  if(this.rowsItemsWorkforce.length>0){
   for (let i = 0; i < this.rowsItemsWorkforce.length; i++) {
 //Este total se debe remplazar por el subtotal_parts que se encuentra en la tabla de settlement
 let value=  Number(this.rowsItemsWorkforce[i].total);
     this.totalCost = Number(this.totalCost + value);


     console.log('total');
     console.log(this.rowsItemsWorkforce[i].sub_cost_center);
     if(this.rowsItemsWorkforce[i].sub_cost_center == null){
       body_table = [j+1, this.rowsItemsWorkforce[i].service, '', this.rowsItemsWorkforce[i].quantity, '$'+this.rowsItemsWorkforce[i].hour_value_decimal, this.rowsItemsWorkforce[i].discount,   '$'+this.rowsItemsWorkforce[i].total_decimal];

     }else{
       body_table = [j+1, this.rowsItemsWorkforce[i].service, this.rowsItemsWorkforce[i].sub_cost_center.code+'-'+this.rowsItemsWorkforce[i].sub_cost_center.description, this.rowsItemsWorkforce[i].quantity, '$'+this.rowsItemsWorkforce[i].hour_value_decimal, this.rowsItemsWorkforce[i].discount,   '$'+this.rowsItemsWorkforce[i].total_decimal];

     }
     console.log(this.totalCost);



      doc.autoTable({
        startY: doc.autoTable.previous.finalY,
        theme:'grid',
        styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
        columnStyles: {
         0: {halign: 'center', fontSize:9, cellWidth:20},
         1: {fontSize:9, cellWidth:150},
         2: {halign: 'center', fontSize:9, cellWidth:70},
         3: {halign: 'center', fontSize:9, cellWidth:26},
         4: {halign: 'center', fontSize:9, cellWidth:50},
         5: {halign: 'center', fontSize:9, cellWidth:39},
         6: {halign: 'center', fontSize:9, cellWidth:55}
         },
        margin: { left: 15},
        body: [ body_table ]
      });
      j++;
     }

   }
}else{
let j = 1;
 if(this.rowsItemsWorkforce.length>0){
  for (let i = 0; i < this.rowsItemsWorkforce.length; i++) {
//Este total se debe remplazar por el subtotal_parts que se encuentra en la tabla de settlement
let value=  Number(this.rowsItemsWorkforce[i].total);
    this.totalCost = Number(this.totalCost + value);


    console.log('total');
    console.log(this.rowsItemsWorkforce[i].sub_cost_center);
    if(this.rowsItemsWorkforce[i].sub_cost_center == null){
      body_table = [j+1, this.rowsItemsWorkforce[i].code, this.rowsItemsWorkforce[i].service, '', this.rowsItemsWorkforce[i].quantity, '$'+this.rowsItemsWorkforce[i].hour_value_decimal, this.rowsItemsWorkforce[i].discount,   '$'+this.rowsItemsWorkforce[i].total_decimal];

    }else{
      body_table = [j+1, this.rowsItemsWorkforce[i].code, this.rowsItemsWorkforce[i].service, this.rowsItemsWorkforce[i].sub_cost_center.code+'-'+this.rowsItemsWorkforce[i].sub_cost_center.description, this.rowsItemsWorkforce[i].quantity, '$'+this.rowsItemsWorkforce[i].hour_value_decimal, this.rowsItemsWorkforce[i].discount,   '$'+this.rowsItemsWorkforce[i].total_decimal];

    }
    console.log(this.totalCost);



     doc.autoTable({
       startY: doc.autoTable.previous.finalY,
       theme:'grid',
       styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
       columnStyles: {
        0: {halign: 'center', fontSize:9, cellWidth:20},
        1: {halign: 'center', fontSize:9, cellWidth:50},
        2: {fontSize:9, cellWidth:120},
        3: {halign: 'center', fontSize:9, cellWidth:50},
        4: {halign: 'center', fontSize:9, cellWidth:26},
        5: {halign: 'center', fontSize:9, cellWidth:50},
        6: {halign: 'center', fontSize:9, cellWidth:39},
        7: {halign: 'center', fontSize:9, cellWidth:55}
        },
       margin: { left: 15},
       body: [ body_table ]
     });
     j++;
    }

  }
 }
  // let total = this.finalFormatPrice(this.totalCost);
  // console.log('total');
  // console.log(total);
     doc.autoTable({
      startY: doc.autoTable.previous.finalY,
      theme:'grid',
      styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
      columnStyles: {
      0: {halign: 'center', fontSize:9, cellWidth:250},
      1: {halign: 'center', fontSize:9, cellWidth:69},
      2: {halign: 'center', fontSize:9, cellWidth:39},
      3: {halign: 'center', fontSize:9, cellWidth:55},
      },
      margin: { left: 15},
      body: [['','TOTAL','DESC%','$' + this.total]]
    });
    this.totalCost = 0;
  doc.autoTable({
    startY: doc.autoTable.previous.finalY,
    theme:'grid',
    styles: {fillColor: [215,215,215],valign:"top",lineColor:[4,1,0],lineWidth:0.2},
    columnStyles: {0: {halign: 'center'},  }, // Cells in first column centered and green
    margin: {top: 60, right: 15, bottom: 0, left: 15},
    body: [['Factura Cliente']]
  });
  if(this.checkHideCode){
    doc.autoTable({
      startY: doc.autoTable.previous.finalY,
      theme:'grid',
      styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
      columnStyles: {
      0: {halign: 'center', fontSize:9, cellWidth:20},
      1: {halign: 'center', fontSize:9, cellWidth:150},
      2: {halign: 'center', fontSize:9, cellWidth:70},
      3: {halign: 'center', fontSize:9, cellWidth:26},
      4: {halign: 'center', fontSize:9, cellWidth:50},
      5: {halign: 'center', fontSize:9, cellWidth:39},
      6: {halign: 'center', fontSize:9, cellWidth:55}
      },
      margin: { left: 15},
      body: [['','DESCRIPCIÓN','SUB. CCOST','CANT.','VLR. UNIT.','DESC%','TOTAL']]
    });



    if(this.rowsItemsCustomer.length>0){
      for (let i = 0; i < this.rowsItemsCustomer.length; i++) {
    //Este total se debe remplazar por el subtotal_parts que se encuentra en la tabla de settlement
    let value=  Number(this.rowsItemsCustomer[i].subtotal);
        this.totalCost = Number(this.totalCost + value);

        console.log('total');
        console.log(this.rowsItemsCustomer[i].subtotal_decimal);
        if(this.rowsItemsCustomer[i].sub_cost_center == null){
          body_table = [i+1, this.rowsItemsCustomer[i].description,'', this.rowsItemsCustomer[i].quantity, '$'+this.rowsItemsCustomer[i].price_decimal, this.rowsItemsCustomer[i].discount,   '$'+this.rowsItemsCustomer[i].subtotal_decimal];
        }else{
          body_table = [i+1, this.rowsItemsCustomer[i].description, this.rowsItemsCustomer[i].sub_cost_center.code+'-'+this.rowsItemsCustomer[i].sub_cost_center.description, this.rowsItemsCustomer[i].quantity, '$'+this.rowsItemsCustomer[i].price_decimal, this.rowsItemsCustomer[i].discount,   '$'+this.rowsItemsCustomer[i].subtotal_decimal];
        }
        console.log(this.totalCost);


     doc.autoTable({
       startY: doc.autoTable.previous.finalY,
       theme:'grid',
       styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
       columnStyles: {
        0: {halign: 'center', fontSize:9, cellWidth:20},
        1: {fontSize:9, cellWidth:150},
        2: {halign: 'center', fontSize:9, cellWidth:70},
        3: {halign: 'center', fontSize:9, cellWidth:26},
        4: {halign: 'center', fontSize:9, cellWidth:50},
        5: {halign: 'center', fontSize:9, cellWidth:39},
        6: {halign: 'center', fontSize:9, cellWidth:55}
        },
       margin: { left: 15},
       body: [ body_table ]
     });
    }
  }
  }else{
  doc.autoTable({
    startY: doc.autoTable.previous.finalY,
    theme:'grid',
    styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
    columnStyles: {
    0: {halign: 'center', fontSize:9, cellWidth:20},
    1: {halign: 'center', fontSize:9, cellWidth:50},
    2: {halign: 'center', fontSize:9, cellWidth:120},
    3: {halign: 'center', fontSize:9, cellWidth:50},
    4: {halign: 'center', fontSize:9, cellWidth:26},
    5: {halign: 'center', fontSize:9, cellWidth:50},
    6: {halign: 'center', fontSize:9, cellWidth:39},
    7: {halign: 'center', fontSize:9, cellWidth:55}
    },
    margin: { left: 15},
    body: [['','REFERENCIA','DESCRIPCIÓN','SUB. CCOST','CANT.','VLR. UNIT.','DESC%','TOTAL']]
  });



  if(this.rowsItemsCustomer.length>0){
    for (let i = 0; i < this.rowsItemsCustomer.length; i++) {
  //Este total se debe remplazar por el subtotal_parts que se encuentra en la tabla de settlement
  let value=  Number(this.rowsItemsCustomer[i].subtotal);
      this.totalCost = Number(this.totalCost + value);

      console.log('total');
      console.log(this.rowsItemsCustomer[i].subtotal_decimal);
      if(this.rowsItemsCustomer[i].sub_cost_center == null){
        body_table = [i+1, this.rowsItemsCustomer[i].code, this.rowsItemsCustomer[i].description,'', this.rowsItemsCustomer[i].quantity, '$'+this.rowsItemsCustomer[i].price_decimal, this.rowsItemsCustomer[i].discount,   '$'+this.rowsItemsCustomer[i].subtotal_decimal];
      }else{
        body_table = [i+1, this.rowsItemsCustomer[i].code, this.rowsItemsCustomer[i].description, this.rowsItemsCustomer[i].sub_cost_center.code+'-'+this.rowsItemsCustomer[i].sub_cost_center.description, this.rowsItemsCustomer[i].quantity, '$'+this.rowsItemsCustomer[i].price_decimal, this.rowsItemsCustomer[i].discount,   '$'+this.rowsItemsCustomer[i].subtotal_decimal];
      }
      console.log(this.totalCost);


   doc.autoTable({
     startY: doc.autoTable.previous.finalY,
     theme:'grid',
     styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
     columnStyles: {
      0: {halign: 'center', fontSize:9, cellWidth:20},
      1: {halign: 'center', fontSize:9, cellWidth:50},
      2: {fontSize:9, cellWidth:120},
      3: {halign: 'center', fontSize:9, cellWidth:50},
      4: {halign: 'center', fontSize:9, cellWidth:26},
      5: {halign: 'center', fontSize:9, cellWidth:50},
      6: {halign: 'center', fontSize:9, cellWidth:39},
      7: {halign: 'center', fontSize:9, cellWidth:55}
      },
     margin: { left: 15},
     body: [ body_table ]
   });
  }
}
}

  // y=y+15;
let totalCus = this.finalFormatPrice(this.totalCost);
  console.log('total');
  console.log(totalCus);

  doc.autoTable({
    startY: doc.autoTable.previous.finalY,
    theme:'grid',
    styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
    columnStyles: {
      0: {halign: 'center', fontSize:9, cellWidth:250},
      1: {halign: 'center', fontSize:9, cellWidth:69},
      2: {halign: 'center', fontSize:9, cellWidth:39},
      3: {halign: 'center', fontSize:9, cellWidth:55}
    },
    margin: { left: 15},
    body: [['','TOTAL','DESC%','$' + totalCus]]
  });
console.log(this.observationEstimate);
  doc.autoTable({
    startY: doc.autoTable.previous.finalY,
    theme:'grid',
    styles: {fillColor: [215,215,215],valign:"top",lineColor:[4,1,0],lineWidth:0.2},
    columnStyles: {0: {halign: 'left'},  }, // Cells in first column centered and green
    margin: {top: 60, right: 15, bottom: 0, left: 15},
    body: [['Observación: '+this.observationEstimate]]
  });

  // doc.save('Liquidación_No_'+ this.consecutive+'.pdf');
  this.totalCost=0;
  // y=y+15;
  console.log(this.filesImage.length+' oleole');
 Swal.close()

var height=doc.autoTable.previous.finalY;
if(doc.autoTable.previous.finalY+150>631){
 doc.addPage();
 height=100;
}
doc.save('Liquidación_No_'+ this.consecutive+'.pdf');
Swal.close();

var imagesLong= this.filesImage.length;

if(imagesLong>0){ // Si hay imagenes


var src;
var img;
var exts;
var img2;
var src2;
var exts2;
var img3;
var src3;
var exts3;
var img4;
var src4;
var exts4 ;


if(this.filesImage[0]){
  img = new Image;
  this.extImageOne = this.filesImage[0].ext;
  src = this.filesImage[0].url;
}
if(this.filesImage[1]){
  img2 = new Image;
  src2 = this.filesImage[1].url;
  this.extImageTwo = this.filesImage[1].ext;
}

if(this.filesImage[2]){
  img3 = new Image;
  src3 = this.filesImage[2].url;
  this.extImageThree = this.filesImage[2].ext;
}
if(this.filesImage[3]){
  img4 = new Image;
  src4 = this.filesImage[3].url;
  this.extImageFour = this.filesImage[3].ext;
}


var extOne=this.extImageOne;
var extTwo=this.extImageTwo;
var extThree=this.extImageThree;
var extFour=this.extImageFour;

img.onload = function() {


     height=height+10;
     doc.addImage(img, extOne,  15,  height, 150,150);
     //doc.save('FirstPdf.pdf');
     //doc.addPage();
     height=height+150;

     if(height+150>631){
       doc.addPage();
       height=20;
     }else{
       height=height+151;
     }
     if(2<=imagesLong){
     img2.onload = function() {
       doc.addImage(img2, this.extImageTwo,  15,  height, 150,150);

     //  doc.save('FirstPdf.pdf');
      // doc.addPage();
      if(height+150>631){
       doc.addPage();
       height=20;
     }else{
       height=height+151;
     }
      if(3<=imagesLong){
      img3.onload = function() {
       doc.addImage(img3, this.extImageThree,  15,  height, 150,150);

     //  doc.save('FirstPdf.pdf');
     //  doc.addPage();
     if(height+150>631){
       doc.addPage();
       height=100;
     }else{
       height=height+151;
     }
     if(4<=imagesLong){
     img4.onload = function() {
       doc.addImage(img4, 'png',  15, this.extImageFour, 150,150);
      // doc.save('FirstPdf.pdf');
     // this.blobGlobal = doc.output('blob');
     // this.upload();

   };
   img4.crossOrigin = "";
   img4.src = src4;
   var exts = exts4;
//----------------
//----------------
}

   };

   img3.crossOrigin = "";
   img3.src = src3;
   var exts = exts3;
//----------------
}else{
 // doc.save('FirstPdf.pdf');
 this.blobGlobal = doc.output('blob');
 this.upload();
}

   };
   img2.crossOrigin = "";
   img2.src = src2;
   var exts = exts2;

   //-------
 }else{
  // doc.save('FirstPdf.pdf');
   // this.blobGlobal = doc.output('blob');
   // this.upload();
 }
 };
 img.crossOrigin = "";
 img.src = src;

}

    /*   if(this.filesImage[0]){
         console.log('0');
         console.log(this.filesImage[0].ext);
         doc.addImage(this.filesImage[0].content,this.filesImage[0].ext,  15, 200, 150,150);
       }


       if(this.filesImage[1]){
         console.log('1');
         console.log(this.filesImage[1].ext);
         doc.addImage(this.filesImage[1].content, this.filesImage[1].ext,  15, 350, 100, 100);
       }*/




       /*
       if(this.filesImage[2]){
         console.log('2');
         console.log(this.filesImage[2].ext);
         doc.addImage(this.filesImage[2].content, this.filesImage[2].ext,  15, 500, 222, 100);
       }*/







   if(ind==0){
  //   doc.save('FirstPdf.pdf');
  this.blobGlobal = doc.output('blob');
  this.upload();
   }else{
     this.blobGlobal = doc.output('blob');
     this.upload();
   }

   }


   download4(ind: number){
     // this.pp();


     let months = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
     let days = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
     let currentDate = new Date(this.creationDate.replace('-','/'));
     let currentDateFormat = days[currentDate.getDay()] + ", " + (currentDate.getDate()) + " de " + months[currentDate.getMonth()] + " de " + currentDate.getFullYear();
     var body_table = [];


     let imageurl = 'data:image/png;base64,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';
     const doc = new jsPDF('p', 'px', 'a4');


     var width = doc.internal.pageSize.width;
     var height = doc.internal.pageSize.height;

     console.log('este es el ancho'+width);
     console.log('este es el alto'+height);

     doc.autoTable({
       startY: 7,
       columnStyles:{2: { cellWidth:50, fontSize:8,   fillColor: null},  1: {cellWidth:260,fontSize:8, halign: 'left',fillColor: null},  0: {cellWidth:90,fontSize:8, halign: 'left', fillColor: null} },
       alternateRowStyles:{fontSize:9},
       margin: { left: 15},
       body: [[currentDateFormat,'', '1 de 1' ]]

     });


     doc.text('Cotización', 230, 55, 'center');
     doc.addImage(imageurl, 'PNG', 15, 60, 120, 42);
     //doc.text('Cotizacción', 230, doc.image.previous.finalY, 'center');

     doc.autoTable({
       startY: 60,
       columnStyles:{2: { cellWidth:105, fontSize:9,   fillColor: null},  1: {cellWidth:102,fontSize:9, halign: 'left',fillColor: null},  0: {cellWidth:88,fontSize:9, halign: 'left', fillColor: null} },
       alternateRowStyles:{fontSize:9},
       margin: {top: 60, right: 15, bottom: 0, left: 135},
       body: [['MONTACARGAS MASTER Nit. 900.204.935-2              Medellín - Colombia     ','PBX. (57-4) 444 6055               CLL 10 B sur # 51 42', '' ]]

     });

     doc.autoTable({

       startY: 85,
       columnStyles:{0: { cellWidth:180, fontSize:9,  fillColor: null},  1: {fontSize:12, halign: 'center', fillColor: null, textColor:[255, 0, 0] }},
       alternateRowStyles:{fontSize:9},
       margin: {top: 60, right: 15, bottom: 0, left: 135},
       body: [ ['Creado Por: '+ this.user,'No. ' + this.consecutive ]]
     });


     doc.autoTable({
       startY: doc.autoTable.previous.finalY,
       theme:'grid',
       styles: {fillColor: [215,215,215],valign:"top",lineColor:[4,1,0],lineWidth:0.2},
       columnStyles: {0: {halign: 'center'},  }, // Cells in first column centered and green
       margin: {top: 60, right: 15, bottom: 0, left: 15},
       body: [['CLIENTE']]
     });

     doc.autoTable({
       startY: doc.autoTable.previous.finalY,
       theme:'grid',
       styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
       columnStyles: {0: { cellWidth: 230, fontSize:9,  fillColor: null},  1: {fontSize:9, halign: 'left', fillColor: null, cellWidth:185}},
       margin: { left: 15},
       body: [['Nit: ' + this.documentCustomer+' '+this.nameCustomer, 'Contacto: '+ this.contact]]
     });

     doc.autoTable({
       startY:doc.autoTable.previous.finalY,
       theme:'grid',
       styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
       columnStyles: {0: { cellWidth:100, fontSize:9,  fillColor: null},  1: {fontSize:9, halign: 'left', fillColor: null, cellWidth:100},  2: {fontSize:9, halign: 'left', fillColor: null, cellWidth:214}},
       margin: { left: 15},
       body: [['Telefono: '+ this.cellphone, 'Ciudad: '+ 'Medellín', 'Maquina: '+  'CHEVROLEJTL CHR3566987893 123456543345'  ]]
     });
     //Vamos en este punto


     //**********************************************************     */


     doc.autoTable({
       startY:doc.autoTable.previous.finalY,
       theme:'grid',
       styles: {fillColor: [215,215,215],valign:"top",lineColor:[4,1,0],lineWidth:0.2},
       columnStyles: {0: {halign: 'center'},  }, // Cells in first column centered and green
       margin: {top: 60, right: 15, bottom: 0, left: 15},
       body: [['MANO DE OBRA Y SERVICIOS']]
     });

     if(this.checkHideCode==false){
     doc.autoTable({
       startY: doc.autoTable.previous.finalY,
       theme:'grid',
       styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
       columnStyles: {0: {halign: 'center', fontSize:9, cellWidth:23}, 1: {halign: 'center', fontSize:9, cellWidth:55},2: {halign: 'center', fontSize:9, cellWidth:185},3: {halign: 'center', fontSize:9, cellWidth:27},4: {halign: 'center', fontSize:9, cellWidth:40}, 5: {halign: 'center', fontSize:9, cellWidth:39}, 6: {halign: 'center', fontSize:9, cellWidth:42}  },
       margin: { left: 15},
       body: [['ITEM','CÓDIGO','DESCRIPCIÓN','CANT.','VLR. UNIT.','TOTAL','ENTREGA']]
     });
   }else{
     doc.autoTable({
       startY: doc.autoTable.previous.finalY,
       theme:'grid',
       styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
       columnStyles: {0: {halign: 'center', fontSize:9, cellWidth:23},1: {halign: 'center', fontSize:9, cellWidth:190},2: {halign: 'center', fontSize:9, cellWidth:27},3: {halign: 'center', fontSize:9, cellWidth:63}, 4: {halign: 'center', fontSize:9, cellWidth:63}, 5: {halign: 'center', fontSize:9, cellWidth:46}  },
       margin: { left: 15},
       body: [['ITEM','DESCRIPCIÓN','CANT.','VLR. UNIT.','TOTAL','ENTREGA']]
     });
   }

     if(this.rowsItemsWorkforce.length>0){

       if(this.checkHideCode==false){
     doc.autoTable({
       startY:doc.autoTable.previous.finalY,
       theme:'grid',
       styles: {fillColor: [215,215,215],valign:"top",lineColor:[4,1,0],lineWidth:0.2},
       columnStyles: {0: {halign: 'center'},  }, // Cells in first column centered and green
       margin: {top: 60, right: 15, bottom: 0, left: 15},
       body: [['MANO DE OBRA']]
     });

     /*doc.autoTable({
       startY: doc.autoTable.previous.finalY,
       theme:'grid',
       styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
       columnStyles: {0: {halign: 'center', fontSize:9, cellWidth:23}, 1: {halign: 'center', fontSize:9, cellWidth:55},2: {halign: 'center', fontSize:9, cellWidth:185},3: {halign: 'center', fontSize:9, cellWidth:27},4: {halign: 'center', fontSize:9, cellWidth:40}, 5: {halign: 'center', fontSize:9, cellWidth:39}, 6: {halign: 'center', fontSize:9, cellWidth:42}  },
       margin: { left: 15},
       body: [['ITEM','CÓDIGO','DESCRIPCIÓN','CANT.','VLR. UNIT.','TOTAL','ENTREGA']]
     });*/

     for (let i = 0; i < this.rowsItemsWorkforce.length; i++) {

       body_table = [i+1, this.rowsItemsWorkforce[i].code, this.rowsItemsWorkforce[i].service, this.rowsItemsWorkforce[i].quantity, this.rowsItemsWorkforce[i].hour_value_decimal, this.rowsItemsWorkforce[i].subtotal_decimal,
       this.rowsItemsWorkforce[i].delivery+ ' días'];

       doc.autoTable({
         startY: doc.autoTable.previous.finalY,
         theme:'grid',
         styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
         columnStyles: {0: {halign: 'center', fontSize:8, cellWidth:23},1: {halign: 'left', fontSize:8, cellWidth:205}, 2: {halign: 'center', fontSize:8, cellWidth:27}, 3: {halign: 'center', fontSize:8, cellWidth:15}, 4: {halign: 'center', fontSize:8, cellWidth:15}, 5: {halign: 'center', fontSize:8, cellWidth:47}  },
         margin: { left: 15},
         body: [ body_table ]
       });
      // y=y+15;
     }
   }else{

     doc.autoTable({
       startY:doc.autoTable.previous.finalY,
       theme:'grid',
       styles: {fillColor: [215,215,215],valign:"top",lineColor:[4,1,0],lineWidth:0.2},
       columnStyles: {0: {halign: 'center'},  }, // Cells in first column centered and green
       margin: {top: 60, right: 15, bottom: 0, left: 15},
       body: [['MANO DE OBRA']]
     });

    /* doc.autoTable({
       startY: doc.autoTable.previous.finalY,
       theme:'grid',
       styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
       columnStyles: {0: {halign: 'center', fontSize:9, cellWidth:23}, 1: {halign: 'center', fontSize:9, cellWidth:55},2: {halign: 'center', fontSize:9, cellWidth:185},3: {halign: 'center', fontSize:9, cellWidth:27},4: {halign: 'center', fontSize:9, cellWidth:40}, 5: {halign: 'center', fontSize:9, cellWidth:39}, 6: {halign: 'center', fontSize:9, cellWidth:42}  },
       margin: { left: 15},
       body: [['ITEM','DESCRIPCIÓN','CANT.','VLR. UNIT.','TOTAL','ENTREGA']]
     });*/

     for (let i = 0; i < this.rowsItemsWorkforce.length; i++) {

       body_table = [i+1, this.rowsItemsWorkforce[i].service, this.rowsItemsWorkforce[i].quantity, this.rowsItemsWorkforce[i].hour_value_decimal, this.rowsItemsWorkforce[i].subtotal_price, this.rowsItemsWorkforce[i].delivery+''];

       doc.autoTable({
         startY: doc.autoTable.previous.finalY,
         theme:'grid',
         styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
         columnStyles: {0: {halign: 'center', fontSize:9, cellWidth:23},1: {halign: 'center', fontSize:9, cellWidth:190},2: {halign: 'center', fontSize:9, cellWidth:27},3: {halign: 'center', fontSize:9, cellWidth:63}, 4: {halign: 'center', fontSize:9, cellWidth:63}, 5: {halign: 'center', fontSize:9, cellWidth:46}  },
         margin: { left: 15},
         body: [ body_table ]
       });
      // y=y+15;
     }

   }
   }

   if(this.rowsItemsparts.length>0){

     if(this.checkHideCode==false){
   doc.autoTable({
     startY:doc.autoTable.previous.finalY,
     theme:'grid',
     styles: {fillColor: [215,215,215],valign:"top",lineColor:[4,1,0],lineWidth:0.2},
     columnStyles: {0: {halign: 'center'},  }, // Cells in first column centered and green
     margin: {top: 60, right: 15, bottom: 0, left: 15},
     body: [['REPUESTOS']]
   });

  /* doc.autoTable({
     startY: doc.autoTable.previous.finalY,
     theme:'grid',
     styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
     columnStyles: {0: {halign: 'center', fontSize:9, cellWidth:23}, 1: {halign: 'center', fontSize:9, cellWidth:55},2: {halign: 'center', fontSize:9, cellWidth:185},3: {halign: 'center', fontSize:9, cellWidth:27},4: {halign: 'center', fontSize:9, cellWidth:40}, 5: {halign: 'center', fontSize:9, cellWidth:39}, 6: {halign: 'center', fontSize:9, cellWidth:42}  },
     margin: { left: 15},
     body: [['ITEM','CÓDIGO','DESCRIPCIÓN','CANT.','VLR. UNIT.','TOTAL','ENTREGA']]
   });*/

   for (let i = 0; i < this.rowsItemsparts.length; i++) {

     body_table = [i+1, this.rowsItemsparts[i].code, this.rowsItemsparts[i].description, this.rowsItemsparts[i].quantity, this.rowsItemsparts[i].price_decimal, this.rowsItemsparts[i].subtotal_decimal,
     this.rowsItemsparts[i].delivery+' días'];

     doc.autoTable({
       startY: doc.autoTable.previous.finalY,
       theme:'grid',
       styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
       columnStyles: {0: {halign: 'center', fontSize:8, cellWidth:23}, 1: {halign: 'left', fontSize:8, cellWidth:55},2: {halign: 'left', fontSize:8, cellWidth:185},3: {halign: 'center', fontSize:8, cellWidth:27},4: {halign: 'center', fontSize:8, cellWidth:40}, 5: {halign: 'center', fontSize:8, cellWidth:39}, 6: {halign: 'center', fontSize:8, cellWidth:42}  },
       margin: { left: 15},
       body: [ body_table ]
     });
    // y=y+15;
   }
 }else{

   doc.autoTable({
     startY:doc.autoTable.previous.finalY,
     theme:'grid',
     styles: {fillColor: [215,215,215],valign:"top",lineColor:[4,1,0],lineWidth:0.2},
     columnStyles: {0: {halign: 'center'},  }, // Cells in first column centered and green
     margin: {top: 60, right: 15, bottom: 0, left: 15},
     body: [['REPUESTOS']]
   });

  /* doc.autoTable({
     startY: doc.autoTable.previous.finalY,
     theme:'grid',
     styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
     columnStyles: {0: {halign: 'center', fontSize:9, cellWidth:23}, 1: {halign: 'center', fontSize:9, cellWidth:55},2: {halign: 'center', fontSize:9, cellWidth:185},3: {halign: 'center', fontSize:9, cellWidth:27},4: {halign: 'center', fontSize:9, cellWidth:40}, 5: {halign: 'center', fontSize:9, cellWidth:39}, 6: {halign: 'center', fontSize:9, cellWidth:42}  },
     margin: { left: 15},
     body: [['ITEM','DESCRIPCIÓN','CANT.','VLR. UNIT.','TOTAL','ENTREGA']]
   });*/

   for (let i = 0; i < this.rowsItemsparts.length; i++) {

     body_table = [i+1, this.rowsItemsparts[i].description, this.rowsItemsparts[i].quantity, this.rowsItemsparts[i].price_decimal, this.rowsItemsparts[i].subtotal_decimal,
     this.rowsItemsparts[i].delivery];

     doc.autoTable({
       startY: doc.autoTable.previous.finalY,
       theme:'grid',
       styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
       columnStyles: {0: {halign: 'center', fontSize:9, cellWidth:23},1: {halign: 'left', fontSize:9, cellWidth:190},2: {halign: 'center', fontSize:9, cellWidth:27},3: {halign: 'center', fontSize:9, cellWidth:63}, 4: {halign: 'center', fontSize:9, cellWidth:63}, 5: {halign: 'center', fontSize:9, cellWidth:46}  },
       margin: { left: 15},
       body: [ body_table ]
     });
    // y=y+15;
   }

 }
 }

 doc.autoTable({
   startY:doc.autoTable.previous.finalY,
   theme:'grid',
   styles: {fillColor: null,valign:"top",lineColor:[4,1,0],lineWidth:0.2},
   columnStyles: {0: {halign: 'left', fontSize:8, cellWidth:85}, 1: {halign: 'left', fontSize:8, cellWidth:86},2: {halign: 'left', fontSize:8, cellWidth:81},3: {halign: 'left', fontSize:8, cellWidth:80},4: {halign: 'center', fontSize:8, cellWidth:81} },
   margin: {top: 60, right: 15, bottom: 0, left: 15},
   body: [['Validez Oferta: 5 días','Forma Pago: 30 días','Garantía: 90 días','Subtotal Repuestos:','1.500.000']]
 });

     doc.autoTable({
       startY:  doc.autoTable.previous.finalY,
       theme:'grid',
       styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
       columnStyles: {0: {halign: 'left', fontSize:8, cellWidth:85}, 1: {halign: 'left', fontSize:8, cellWidth:86},2: {halign: 'left', fontSize:8, cellWidth:81},3: {halign: 'left', fontSize:8, cellWidth:80},4: {halign: 'center', fontSize:8, cellWidth:81} },
       margin: { left: 15},
       body: [
       [{content: 'HNYUCW-00128', colSpan: 3, rowSpan: 3, styles: {halign: 'left'}},'Subtotal Mano de Obra','0'],
        ['Total','89000'],
        [{content: 'NOTA: VALORES ANTES DE IVA', colSpan: 2,  styles: {halign: 'left'}}]]
     });


     console.log(this.filesImage.length+' oleole');
     //doc.addPage();
    /*for (let i = 0; i < this.filesImage.length; i++) {
       console.log('este es el valor de los i');
       console.log(i);
       console.log(this.filesImage[i]);
       let a = this.filesImage[i].content;
       let b = 1+i;
       let j = 400;
       let k= j*b;


     }*/



   /*  var img = new Image;
     img.crossOrigin = "";
     img.src = this.filesImage[0].url;
     var exts = this.filesImage[0].ext;
     img.onload = function () {
       doc.addImage(img, exts,  15, 200, 150,150);
       doc.save('FirstPdf.pdf');
     }
 */

 var height=doc.autoTable.previous.finalY;
 if(doc.autoTable.previous.finalY+150>631){
   doc.addPage();
   height=100;
 }

 for (let i = 0; i < this.filesImage.length; i++) {
   doc.addImage(this.filesImage[i].content, this.filesImage[i].ext, 15, height, 120, 42);
   height=height+12;
 }
 var imagesLong= this.filesImage.length;
 doc.addImage(imageurl, 'PNG', 15, height, 120, 42);
 if(imagesLong>0){ // Si hay imagenes


 var src;
 var img;
 var exts;
 var img2;
 var src2;
 var exts2;
 var img3;
 var src3;
 var exts3;
 var img4;
 var src4;
 var exts4 ;


 if(this.filesImage[0]){
    img = new Image;
    this.extImageOne = this.filesImage[0].ext;
    src = this.filesImage[0].url;
 }
 if(this.filesImage[1]){
    img2 = new Image;
    src2 = this.filesImage[1].url;
    this.extImageTwo = this.filesImage[1].ext;
 }

 if(this.filesImage[2]){
    img3 = new Image;
    src3 = this.filesImage[2].url;
    this.extImageThree = this.filesImage[2].ext;
 }
 if(this.filesImage[3]){
    img4 = new Image;
    src4 = this.filesImage[3].url;
    this.extImageFour = this.filesImage[3].ext;
 }


 var extOne=this.extImageOne;
 var extTwo=this.extImageTwo;
 var extThree=this.extImageThree;
 var extFour=this.extImageFour;

 img.onload = function() {


       height=height+10;
       doc.addImage(img, extOne,  15,  height, 150,150);
       //doc.save('FirstPdf.pdf');
       //doc.addPage();
       height=height+150;

       if(height+150>631){
         doc.addPage();
         height=20;
       }else{
         height=height+151;
       }
       if(2<=imagesLong){
       img2.onload = function() {
         doc.addImage(img2, this.extImageTwo,  15,  height, 150,150);

       //  doc.save('FirstPdf.pdf');
        // doc.addPage();
        if(height+150>631){
         doc.addPage();
         height=20;
       }else{
         height=height+151;
       }
        if(3<=imagesLong){
        img3.onload = function() {
         doc.addImage(img3, this.extImageThree,  15,  height, 150,150);

       //  doc.save('FirstPdf.pdf');
       //  doc.addPage();
       if(height+150>631){
         doc.addPage();
         height=100;
       }else{
         height=height+151;
       }
       if(4<=imagesLong){
       img4.onload = function() {
         doc.addImage(img4, 'png',  15, this.extImageFour, 150,150);

            // test
            this.blobGlobal = doc.output('blob');
            this.uploadFile();

         doc.save('FirstPdf.pdf');


     };
     img4.crossOrigin = "";
     img4.src = src4;
     var exts = exts4;
 //----------------
 //----------------
 }

     };

     img3.crossOrigin = "";
     img3.src = src3;
     var exts = exts3;
 //----------------
 }else{
      // test
      this.blobGlobal = doc.output('blob');
      this.uploadFile();

   doc.save('FirstPdf.pdf');

 }

     };
     img2.crossOrigin = "";
     img2.src = src2;
     var exts = exts2;

     //-------
   }else{
        // test
        this.blobGlobal = doc.output('blob');
        //this.uploadFile();

     doc.save('FirstPdf.pdf');
   }
   };
   img.crossOrigin = "";
   img.src = src;
   this.upload();

 }

      /*   if(this.filesImage[0]){
           console.log('0');
           console.log(this.filesImage[0].ext);
           doc.addImage(this.filesImage[0].content,this.filesImage[0].ext,  15, 200, 150,150);
         }


         if(this.filesImage[1]){
           console.log('1');
           console.log(this.filesImage[1].ext);
           doc.addImage(this.filesImage[1].content, this.filesImage[1].ext,  15, 350, 100, 100);
         }*/




         /*
         if(this.filesImage[2]){
           console.log('2');
           console.log(this.filesImage[2].ext);
           doc.addImage(this.filesImage[2].content, this.filesImage[2].ext,  15, 500, 222, 100);
         }*/







     if(ind==0){
      doc.save('FirstPdf.pdf');
    this.blobGlobal = doc.output('blob');
    this.upload();
     }else{
       this.blobGlobal = doc.output('blob');
       this.upload();
     }

     }


     downloadSend(ind: number){



   // this.pp();



   let months = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
   let days = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
   let currentDate = new Date(this.creationDate.replace('-','/'));
   let currentDateFormat = days[currentDate.getDay()] + ", " + (currentDate.getDate()) + " de " + months[currentDate.getMonth()] + " de " + currentDate.getFullYear();
   var body_table = [];


   let imageurl = 'data:image/png;base64,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';
   const doc = new jsPDF('p', 'px', 'a4');

  console.log('YCV ingreso a la función downloadSend ');

   var width = doc.internal.pageSize.width;
   var height = doc.internal.pageSize.height;

   console.log('este es el ancho'+width);
   console.log('este es el alto'+height);

   doc.autoTable({
     startY: 7,
     columnStyles:{2: { cellWidth:50, fontSize:8,   fillColor: null},  1: {cellWidth:260,fontSize:8, halign: 'left',fillColor: null},  0: {cellWidth:90,fontSize:8, halign: 'left', fillColor: null} },
     alternateRowStyles:{fontSize:9},
     margin: { left: 15},
     body: [[currentDateFormat,'', '1 de 1' ]]

   });


   doc.text('Liquidación de Facturación', 230, 55, 'center');
   doc.addImage(imageurl, 'PNG', 15, 60, 120, 42);
   //doc.text('Cotizacción', 230, doc.image.previous.finalY, 'center');

   doc.autoTable({
     startY: 60,
     columnStyles:{0: { cellWidth:105, fontSize:9,   fillColor: null} },
     alternateRowStyles:{fontSize:9},
     margin: {top: 60, right: 15, bottom: 0, left: 135},
     body: [['Soluciones integrales para el movimiento interno de sus mercancias' ]]

   });

   doc.autoTable({

    startY: 85,
    columnStyles:{0: { cellWidth:180, fontSize:9,  fillColor: null},  1: {fontSize:12, halign: 'center', fillColor: null, textColor:[255, 0, 0] }},
    alternateRowStyles:{fontSize:9},
    margin: {top: 60, right: 15, bottom: 0, left: 135},
    body: [ ['Creado Por: '+ this.user,'No. ' + this.consecutive ]]
  });

   doc.autoTable({
    startY: doc.autoTable.previous.finalY,
    theme:'grid',
    styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
    columnStyles: {
     0: { fontSize:9, cellWidth:215, fillColor: null},
     1: { fontSize:9, cellWidth:100, fillColor: null},
     2: { fontSize:9, cellWidth:99, fillColor: null},
    },
    margin: { left: 15},
    body: [['Cliente: '+ this.nameCustomer,'Bodega: '+ this.warehouseDescription,'Fecha: '+ this.date]]
  });

  console.log('this.estimate')
  console.log(this.estimate)
  if(this.estimate == null){
    this.estimate = '';
  }

   doc.autoTable({
    startY: doc.autoTable.previous.finalY,
    theme:'grid',
    styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
    columnStyles: {
     0: { fontSize:9, cellWidth:215, fillColor: null},
     1: { fontSize:9, cellWidth:100, fillColor: null},
     2: { fontSize:9, cellWidth:99, fillColor: null},
    },
    margin: { left: 15},
    body: [['Sucursal: '+ this.regionalDescription,'C.Costos: '+ this.costCenterDescription,'OC/Cotización: Pedido No: '+ this.estimate]]
  });

   doc.autoTable({
    startY: doc.autoTable.previous.finalY,
    theme:'grid',
    styles: {fillColor: [215,215,215],valign:"top",lineColor:[4,1,0],lineWidth:0.2},
    columnStyles: {0: {halign: 'center'},  }, // Cells in first column centered and green
    margin: {top: 60, right: 15, bottom: 0, left: 15},
    body: [['Factura HGI']]
  });


   //Vamos en este punto


   //**********************************************************     */


   let j = 1;

 if(this.checkHideCode){
  doc.autoTable({
    startY: doc.autoTable.previous.finalY,
    theme:'grid',
    styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
    columnStyles: {
    0: {halign: 'center', fontSize:9, cellWidth:20},
    1: {halign: 'center', fontSize:9, cellWidth:150},
    2: {halign: 'center', fontSize:9, cellWidth:70},
    3: {halign: 'center', fontSize:9, cellWidth:26},
    4: {halign: 'center', fontSize:9, cellWidth:50},
    5: {halign: 'center', fontSize:9, cellWidth:39},
    6: {halign: 'center', fontSize:9, cellWidth:55}
    },
    margin: { left: 15},
    body: [['','DESCRIPCIÓN','SUB. CCOST','CANT.','VLR. UNIT.','DESC%','TOTAL']]
  });

// doc.save('Cotizacion_No_'+ this.consecutive+'.pdf');
console.log('Info importante');

//ifff


if(this.rowsItemsparts.length>0){
 for (let i = 0; i < this.rowsItemsparts.length; i++) {
//Este total se debe remplazar por el subtotal_parts que se encuentra en la tabla de settlement
let value=  Number(this.rowsItemsparts[i].subtotal);
   this.totalCost = Number(this.totalCost + value);
   console.log('total');
   console.log(this.rowsItemsparts[i].subtotal_decimal);
   console.log(this.totalCost);

   if(this.rowsItemsparts[i].sub_cost_center == null){
     body_table = [i+1, this.rowsItemsparts[i].description, '', this.rowsItemsparts[i].quantity, '$'+this.rowsItemsparts[i].price_decimal, this.rowsItemsparts[i].discount,   '$'+this.rowsItemsparts[i].subtotal_decimal];
   }else{
     body_table = [i+1, this.rowsItemsparts[i].description, this.rowsItemsparts[i].sub_cost_center.code+'-'+this.rowsItemsparts[i].sub_cost_center.description, this.rowsItemsparts[i].quantity, '$'+this.rowsItemsparts[i].price_decimal, this.rowsItemsparts[i].discount,   '$'+this.rowsItemsparts[i].subtotal_decimal];
   }
    doc.autoTable({
      startY: doc.autoTable.previous.finalY,
      theme:'grid',
      styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
      columnStyles: {
       0: {halign: 'center', fontSize:9, cellWidth:20},
       1: {fontSize:9, cellWidth:150},
       2: {halign: 'center', fontSize:9, cellWidth:70},
       3: {halign: 'center', fontSize:9, cellWidth:26},
       4: {halign: 'center', fontSize:9, cellWidth:50},
       5: {halign: 'center', fontSize:9, cellWidth:39},
       6: {halign: 'center', fontSize:9, cellWidth:55}
       },
      margin: { left: 15},
      body: [ body_table ]
    });
    j ++;
   }

 }
 }else{
doc.autoTable({
     startY: doc.autoTable.previous.finalY,
     theme:'grid',
     styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
     columnStyles: {
     0: {halign: 'center', fontSize:9, cellWidth:20},
     1: {halign: 'center', fontSize:9, cellWidth:50},
     2: {halign: 'center', fontSize:9, cellWidth:120},
     3: {halign: 'center', fontSize:9, cellWidth:50},
     4: {halign: 'center', fontSize:9, cellWidth:26},
     5: {halign: 'center', fontSize:9, cellWidth:50},
     6: {halign: 'center', fontSize:9, cellWidth:39},
     7: {halign: 'center', fontSize:9, cellWidth:55}
     },
     margin: { left: 15},
     body: [['','REFERENCIA','DESCRIPCIÓN','SUB. CCOST','CANT.','VLR. UNIT.','DESC%','TOTAL']]
   });

 // doc.save('Cotizacion_No_'+ this.consecutive+'.pdf');
 console.log('Info importante');

 //ifff


 if(this.rowsItemsparts.length>0){
  for (let i = 0; i < this.rowsItemsparts.length; i++) {
//Este total se debe remplazar por el subtotal_parts que se encuentra en la tabla de settlement
let value=  Number(this.rowsItemsparts[i].subtotal);
    this.totalCost = Number(this.totalCost + value);
    console.log('total');
    console.log(this.rowsItemsparts[i].subtotal_decimal);
    console.log(this.totalCost);

    if(this.rowsItemsparts[i].sub_cost_center == null){
      body_table = [i+1, this.rowsItemsparts[i].code, this.rowsItemsparts[i].description, '', this.rowsItemsparts[i].quantity, '$'+this.rowsItemsparts[i].price_decimal, this.rowsItemsparts[i].discount,   '$'+this.rowsItemsparts[i].subtotal_decimal];
    }else{
      body_table = [i+1, this.rowsItemsparts[i].code, this.rowsItemsparts[i].description, this.rowsItemsparts[i].sub_cost_center.code+'-'+this.rowsItemsparts[i].sub_cost_center.description, this.rowsItemsparts[i].quantity, '$'+this.rowsItemsparts[i].price_decimal, this.rowsItemsparts[i].discount,   '$'+this.rowsItemsparts[i].subtotal_decimal];
    }
     doc.autoTable({
       startY: doc.autoTable.previous.finalY,
       theme:'grid',
       styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
       columnStyles: {
        0: {halign: 'center', fontSize:9, cellWidth:20},
        1: {halign: 'center', fontSize:9, cellWidth:50},
        2: {fontSize:9, cellWidth:120},
        3: {halign: 'center', fontSize:9, cellWidth:50},
        4: {halign: 'center', fontSize:9, cellWidth:26},
        5: {halign: 'center', fontSize:9, cellWidth:50},
        6: {halign: 'center', fontSize:9, cellWidth:39},
        7: {halign: 'center', fontSize:9, cellWidth:55}
        },
       margin: { left: 15},
       body: [ body_table ]
     });
     j ++;
    }

  }
}
  if(this.checkHideCode){

    if(this.rowsItemsWorkforce.length>0){
      for (let i = 0; i < this.rowsItemsWorkforce.length; i++) {
    //Este total se debe remplazar por el subtotal_parts que se encuentra en la tabla de settlement
    let value=  Number(this.rowsItemsWorkforce[i].total);
        this.totalCost = Number(this.totalCost + value);

        console.log('total');
        console.log(this.rowsItemsWorkforce[i].subtotal_decimal);
        console.log(this.totalCost);

        if(this.rowsItemsWorkforce[i].sub_cost_center == null){
          body_table = [j+1, this.rowsItemsWorkforce[i].service, '', this.rowsItemsWorkforce[i].quantity, '$'+this.rowsItemsWorkforce[i].hour_value_decimal, this.rowsItemsWorkforce[i].discount,   '$'+this.rowsItemsWorkforce[i].total_decimal];

        }else{
          body_table = [j+1, this.rowsItemsWorkforce[i].service, this.rowsItemsWorkforce[i].sub_cost_center.code+'-'+this.rowsItemsWorkforce[i].sub_cost_center.description, this.rowsItemsWorkforce[i].quantity, '$'+this.rowsItemsWorkforce[i].hour_value_decimal, this.rowsItemsWorkforce[i].discount,   '$'+this.rowsItemsWorkforce[i].total_decimal];

        }
         doc.autoTable({
           startY: doc.autoTable.previous.finalY,
           theme:'grid',
           styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
           columnStyles: {
            0: {halign: 'center', fontSize:9, cellWidth:20},
            1: {fontSize:9, cellWidth:150},
            2: {halign: 'center', fontSize:9, cellWidth:70},
            3: {halign: 'center', fontSize:9, cellWidth:26},
            4: {halign: 'center', fontSize:9, cellWidth:50},
            5: {halign: 'center', fontSize:9, cellWidth:39},
            6: {halign: 'center', fontSize:9, cellWidth:55}
            },
           margin: { left: 15},
           body: [ body_table ]
         });
         j++;
        }
      }
  }
  else{
 if(this.rowsItemsWorkforce.length>0){
  for (let i = 0; i < this.rowsItemsWorkforce.length; i++) {
//Este total se debe remplazar por el subtotal_parts que se encuentra en la tabla de settlement
let value=  Number(this.rowsItemsWorkforce[i].total);
    this.totalCost = Number(this.totalCost + value);

    console.log('total');
    console.log(this.rowsItemsWorkforce[i].subtotal_decimal);
    console.log(this.totalCost);

    if(this.rowsItemsWorkforce[i].sub_cost_center == null){
      body_table = [j+1, this.rowsItemsWorkforce[i].code, this.rowsItemsWorkforce[i].service, '', this.rowsItemsWorkforce[i].quantity, '$'+this.rowsItemsWorkforce[i].hour_value_decimal, this.rowsItemsWorkforce[i].discount,   '$'+this.rowsItemsWorkforce[i].total_decimal];

    }else{
      body_table = [j+1, this.rowsItemsWorkforce[i].code, this.rowsItemsWorkforce[i].service, this.rowsItemsWorkforce[i].sub_cost_center.code+'-'+this.rowsItemsWorkforce[i].sub_cost_center.description, this.rowsItemsWorkforce[i].quantity, '$'+this.rowsItemsWorkforce[i].hour_value_decimal, this.rowsItemsWorkforce[i].discount,   '$'+this.rowsItemsWorkforce[i].total_decimal];

    }
     doc.autoTable({
       startY: doc.autoTable.previous.finalY,
       theme:'grid',
       styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
       columnStyles: {
        0: {halign: 'center', fontSize:9, cellWidth:20},
        1: {halign: 'center', fontSize:9, cellWidth:50},
        2: {fontSize:9, cellWidth:120},
        3: {halign: 'center', fontSize:9, cellWidth:50},
        4: {halign: 'center', fontSize:9, cellWidth:26},
        5: {halign: 'center', fontSize:9, cellWidth:50},
        6: {halign: 'center', fontSize:9, cellWidth:39},
        7: {halign: 'center', fontSize:9, cellWidth:55}
        },
       margin: { left: 15},
       body: [ body_table ]
     });
     j++;
    }

  }
     }


  let totalHGI = parseInt(this.finalFormatPrice(this.totalCost));
  console.log('total')
  console.log(totalHGI)
     doc.autoTable({
      startY: doc.autoTable.previous.finalY,
      theme:'grid',
      styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
      columnStyles: {
      0: {halign: 'center', fontSize:9, cellWidth:250},
      1: {halign: 'center', fontSize:9, cellWidth:69},
      2: {halign: 'center', fontSize:9, cellWidth:39},
      3: {halign: 'center', fontSize:9, cellWidth:55},
      },
      margin: { left: 15},
      body: [['','TOTAL','DESC%','$' + this.total]]
    });
    this.totalCost = 0;
  doc.autoTable({
    startY: doc.autoTable.previous.finalY,
    theme:'grid',
    styles: {fillColor: [215,215,215],valign:"top",lineColor:[4,1,0],lineWidth:0.2},
    columnStyles: {0: {halign: 'center'},  }, // Cells in first column centered and green
    margin: {top: 60, right: 15, bottom: 0, left: 15},
    body: [['Factura Cliente']]
  });

  if(this.checkHideCode){
    doc.autoTable({
      startY: doc.autoTable.previous.finalY,
      theme:'grid',
      styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
      columnStyles: {
      0: {halign: 'center', fontSize:9, cellWidth:20},
      1: {halign: 'center', fontSize:9, cellWidth:150},
      2: {halign: 'center', fontSize:9, cellWidth:70},
      3: {halign: 'center', fontSize:9, cellWidth:26},
      4: {halign: 'center', fontSize:9, cellWidth:50},
      5: {halign: 'center', fontSize:9, cellWidth:39},
      6: {halign: 'center', fontSize:9, cellWidth:55}
      },
      margin: { left: 15},
      body: [['','DESCRIPCIÓN','SUB. CCOST','CANT.','VLR. UNIT.','DESC%','TOTAL']]
    });



    if(this.rowsItemsCustomer.length>0){
      for (let i = 0; i < this.rowsItemsCustomer.length; i++) {
    //Este total se debe remplazar por el subtotal_parts que se encuentra en la tabla de settlement
    let value=  Number(this.rowsItemsCustomer[i].subtotal);
        this.totalCost = Number(this.totalCost + value);

        console.log('total');
        console.log(this.rowsItemsCustomer[i].subtotal_decimal);
        console.log(this.totalCost);
        if(this.rowsItemsCustomer[i].sub_cost_center == null){
          body_table = [i+1,  this.rowsItemsCustomer[i].description,'', this.rowsItemsCustomer[i].quantity, '$'+this.rowsItemsCustomer[i].price_decimal, this.rowsItemsCustomer[i].discount,   '$'+this.rowsItemsCustomer[i].subtotal_decimal];
        }else{
          body_table = [i+1,  this.rowsItemsCustomer[i].description, this.rowsItemsCustomer[i].sub_cost_center.code+'-'+this.rowsItemsCustomer[i].sub_cost_center.description, this.rowsItemsCustomer[i].quantity, '$'+this.rowsItemsCustomer[i].price_decimal, this.rowsItemsCustomer[i].discount,   '$'+this.rowsItemsCustomer[i].subtotal_decimal];
        }

     doc.autoTable({
       startY: doc.autoTable.previous.finalY,
       theme:'grid',
       styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
       columnStyles: {
        0: {halign: 'center', fontSize:9, cellWidth:20},
        1: {fontSize:9, cellWidth:150},
        2: {halign: 'center', fontSize:9, cellWidth:70},
        3: {halign: 'center', fontSize:9, cellWidth:26},
        4: {halign: 'center', fontSize:9, cellWidth:50},
        5: {halign: 'center', fontSize:9, cellWidth:39},
        6: {halign: 'center', fontSize:9, cellWidth:55}
        },
       margin: { left: 15},
       body: [ body_table ]
     });
    }
  }
  }else{
  doc.autoTable({
    startY: doc.autoTable.previous.finalY,
    theme:'grid',
    styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
    columnStyles: {
    0: {halign: 'center', fontSize:9, cellWidth:20},
    1: {halign: 'center', fontSize:9, cellWidth:50},
    2: {halign: 'center', fontSize:9, cellWidth:120},
    3: {halign: 'center', fontSize:9, cellWidth:50},
    4: {halign: 'center', fontSize:9, cellWidth:26},
    5: {halign: 'center', fontSize:9, cellWidth:50},
    6: {halign: 'center', fontSize:9, cellWidth:39},
    7: {halign: 'center', fontSize:9, cellWidth:55}
    },
    margin: { left: 15},
    body: [['','REFERENCIA','DESCRIPCIÓN','SUB. CCOST','CANT.','VLR. UNIT.','DESC%','TOTAL']]
  });



  if(this.rowsItemsCustomer.length>0){
    for (let i = 0; i < this.rowsItemsCustomer.length; i++) {
  //Este total se debe remplazar por el subtotal_parts que se encuentra en la tabla de settlement
  let value=  Number(this.rowsItemsCustomer[i].subtotal);
      this.totalCost = Number(this.totalCost + value);

      console.log('total');
      console.log(this.rowsItemsCustomer[i].subtotal_decimal);
      console.log(this.totalCost);
      if(this.rowsItemsCustomer[i].sub_cost_center == null){
        body_table = [i+1, this.rowsItemsCustomer[i].code, this.rowsItemsCustomer[i].description,'', this.rowsItemsCustomer[i].quantity, '$'+this.rowsItemsCustomer[i].price_decimal, this.rowsItemsCustomer[i].discount,   '$'+this.rowsItemsCustomer[i].subtotal_decimal];
      }else{
        body_table = [i+1, this.rowsItemsCustomer[i].code, this.rowsItemsCustomer[i].description, this.rowsItemsCustomer[i].sub_cost_center.code+'-'+this.rowsItemsCustomer[i].sub_cost_center.description, this.rowsItemsCustomer[i].quantity, '$'+this.rowsItemsCustomer[i].price_decimal, this.rowsItemsCustomer[i].discount,   '$'+this.rowsItemsCustomer[i].subtotal_decimal];
      }

   doc.autoTable({
     startY: doc.autoTable.previous.finalY,
     theme:'grid',
     styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
     columnStyles: {
      0: {halign: 'center', fontSize:9, cellWidth:20},
      1: {halign: 'center', fontSize:9, cellWidth:50},
      2: {fontSize:9, cellWidth:120},
      3: {halign: 'center', fontSize:9, cellWidth:50},
      4: {halign: 'center', fontSize:9, cellWidth:26},
      5: {halign: 'center', fontSize:9, cellWidth:50},
      6: {halign: 'center', fontSize:9, cellWidth:39},
      7: {halign: 'center', fontSize:9, cellWidth:55}
      },
     margin: { left: 15},
     body: [ body_table ]
   });
  }
}
  // y=y+15;
}

  let totalCustomer = parseInt(this.finalFormatPrice(this.totalCost));
  console.log('totalcustomer')
  let totalCusEnv = this.finalFormatPrice(this.totalCost);

  doc.autoTable({
    startY: doc.autoTable.previous.finalY,
    theme:'grid',
    styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
    columnStyles: {
      0: {halign: 'center', fontSize:9, cellWidth:250},
      1: {halign: 'center', fontSize:9, cellWidth:69},
      2: {halign: 'center', fontSize:9, cellWidth:39},
      3: {halign: 'center', fontSize:9, cellWidth:55}
    },
    margin: { left: 15},
    body: [['','TOTAL','DESC%','$' + totalCusEnv]]
  });

  doc.autoTable({
    startY: doc.autoTable.previous.finalY,
    theme:'grid',
    styles: {fillColor: [215,215,215],valign:"top",lineColor:[4,1,0],lineWidth:0.2},
    columnStyles: {0: {halign: 'left'},  }, // Cells in first column centered and green
    margin: {top: 60, right: 15, bottom: 0, left: 15},
    body: [['Observación: '+this.observationEstimate]]
  });

   this.blobGlobal = doc.output('blob');
   console.log('ingreso a ja');
   this.totalComparison(totalHGI, totalCustomer);


   console.log('el ja tiene el metodo para enviar el correo');
   }




  download3(ind: number){



   // this.pp();


   let months = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
   let days = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
   let currentDate = new Date(this.creationDate.replace('-','/'));
   let currentDateFormat = days[currentDate.getDay()] + ", " + (currentDate.getDate()) + " de " + months[currentDate.getMonth()] + " de " + currentDate.getFullYear();
   var body_table = [];


   let imageurl = 'data:image/png;base64,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';
   const doc = new jsPDF('p', 'px', 'a4');


   var width = doc.internal.pageSize.width;
   var height = doc.internal.pageSize.height;

   console.log('este es el ancho'+width);
   console.log('este es el alto'+height);

   doc.autoTable({
     startY: 7,
     columnStyles:{2: { cellWidth:50, fontSize:8,   fillColor: null},  1: {cellWidth:260,fontSize:8, halign: 'left',fillColor: null},  0: {cellWidth:90,fontSize:8, halign: 'left', fillColor: null} },
     alternateRowStyles:{fontSize:9},
     margin: { left: 15},
     body: [[currentDateFormat,'', '1 de 1' ]]

   });


   doc.text('Cotización', 230, 55, 'center');
   doc.addImage(imageurl, 'PNG', 15, 60, 120, 42);
   //doc.text('Cotizacción', 230, doc.image.previous.finalY, 'center');

   doc.autoTable({
     startY: 60,
     columnStyles:{2: { cellWidth:105, fontSize:9,   fillColor: null},  1: {cellWidth:102,fontSize:9, halign: 'left',fillColor: null},  0: {cellWidth:88,fontSize:9, halign: 'left', fillColor: null} },
     alternateRowStyles:{fontSize:9},
     margin: {top: 60, right: 15, bottom: 0, left: 135},
     body: [['MONTACARGAS MASTER Nit. 900.204.935-2              Medellín - Colombia     ','PBX. (57-4) 444 6055               CLL 10 B sur # 51 42', '' ]]

   });

   doc.autoTable({

     startY: 85,
     columnStyles:{0: { cellWidth:180, fontSize:9,  fillColor: null},  1: {fontSize:12, halign: 'center', fillColor: null, textColor:[255, 0, 0] }},
     alternateRowStyles:{fontSize:9},
     margin: {top: 60, right: 15, bottom: 0, left: 135},
     body: [ ['Creado Por: '+ this.user,'No. ' + this.consecutive ]]
   });


   doc.autoTable({
     startY: doc.autoTable.previous.finalY,
     theme:'grid',
     styles: {fillColor: [215,215,215],valign:"top",lineColor:[4,1,0],lineWidth:0.2},
     columnStyles: {0: {halign: 'center'},  }, // Cells in first column centered and green
     margin: {top: 60, right: 15, bottom: 0, left: 15},
     body: [['CLIENTE']]
   });

   doc.autoTable({
     startY: doc.autoTable.previous.finalY,
     theme:'grid',
     styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
     columnStyles: {0: { cellWidth: 230, fontSize:9,  fillColor: null},  1: {fontSize:9, halign: 'left', fillColor: null, cellWidth:185}},
     margin: { left: 15},
     body: [['Nit: ' + this.documentCustomer+' '+this.nameCustomer, 'Contacto: '+ this.contact]]
   });

   doc.autoTable({
     startY:doc.autoTable.previous.finalY,
     theme:'grid',
     styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
     columnStyles: {0: { cellWidth:100, fontSize:9,  fillColor: null},  1: {fontSize:9, halign: 'left', fillColor: null, cellWidth:100},  2: {fontSize:9, halign: 'left', fillColor: null, cellWidth:214}},
     margin: { left: 15},
     body: [['Telefono: '+ this.cellphone, 'Ciudad: '+ this.cityEstimate, 'Maquina: '+  this.forkliftText  ]]
   });
   //Vamos en este punto

   //**********************************************************     */


   doc.autoTable({
     startY:doc.autoTable.previous.finalY,
     theme:'grid',
     styles: {fillColor: [215,215,215],valign:"top",lineColor:[4,1,0],lineWidth:0.2},
     columnStyles: {0: {halign: 'center'},  }, // Cells in first column centered and green
     margin: {top: 60, right: 15, bottom: 0, left: 15},
     body: [['MANO DE OBRA Y SERVICIOS']]
   });

   if(this.checkHideCode==false){
   doc.autoTable({
     startY: doc.autoTable.previous.finalY,
     theme:'grid',
     styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
     columnStyles: {0: {halign: 'center', fontSize:9, cellWidth:23}, 1: {halign: 'center', fontSize:9, cellWidth:55},2: {halign: 'center', fontSize:9, cellWidth:185},3: {halign: 'center', fontSize:9, cellWidth:27},4: {halign: 'center', fontSize:9, cellWidth:40}, 5: {halign: 'center', fontSize:9, cellWidth:39}, 6: {halign: 'center', fontSize:9, cellWidth:42}  },
     margin: { left: 15},
     body: [['ITEM','CÓDIGO','DESCRIPCIÓN','CANT.','VLR. UNIT.','TOTAL','ENTREGA']]
   });
 }else{
   doc.autoTable({
     startY: doc.autoTable.previous.finalY,
     theme:'grid',
     styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
     columnStyles: {0: {halign: 'center', fontSize:9, cellWidth:23},1: {halign: 'center', fontSize:9, cellWidth:190},2: {halign: 'center', fontSize:9, cellWidth:27},3: {halign: 'center', fontSize:9, cellWidth:63}, 4: {halign: 'center', fontSize:9, cellWidth:63}, 5: {halign: 'center', fontSize:9, cellWidth:46}  },
     margin: { left: 15},
     body: [['ITEM','DESCRIPCIÓN','CANT.','VLR. UNIT.','TOTAL','ENTREGA']]
   });
 }

   if(this.rowsItemsWorkforce.length>0){

     if(this.checkHideCode==false){
   doc.autoTable({
     startY:doc.autoTable.previous.finalY,
     theme:'grid',
     styles: {fillColor: [215,215,215],valign:"top",lineColor:[4,1,0],lineWidth:0.2},
     columnStyles: {0: {halign: 'center'},  }, // Cells in first column centered and green
     margin: {top: 60, right: 15, bottom: 0, left: 15},
     body: [['MANO DE OBRA']]
   });

   /*doc.autoTable({
     startY: doc.autoTable.previous.finalY,
     theme:'grid',
     styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
     columnStyles: {0: {halign: 'center', fontSize:9, cellWidth:23}, 1: {halign: 'center', fontSize:9, cellWidth:55},2: {halign: 'center', fontSize:9, cellWidth:185},3: {halign: 'center', fontSize:9, cellWidth:27},4: {halign: 'center', fontSize:9, cellWidth:40}, 5: {halign: 'center', fontSize:9, cellWidth:39}, 6: {halign: 'center', fontSize:9, cellWidth:42}  },
     margin: { left: 15},
     body: [['ITEM','CÓDIGO','DESCRIPCIÓN','CANT.','VLR. UNIT.','TOTAL','ENTREGA']]
   });*/

   for (let i = 0; i < this.rowsItemsWorkforce.length; i++) {

     body_table = [i+1, this.rowsItemsWorkforce[i].code, this.rowsItemsWorkforce[i].service, this.rowsItemsWorkforce[i].quantity, this.rowsItemsWorkforce[i].hour_value_decimal, this.rowsItemsWorkforce[i].subtotal_decimal,
     this.rowsItemsWorkforce[i].delivery+' días'];

     doc.autoTable({
       startY: doc.autoTable.previous.finalY,
       theme:'grid',
       styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
       columnStyles: {0: {halign: 'center', fontSize:8, cellWidth:23},1: {halign: 'left', fontSize:8, cellWidth:55}, 2: {halign: 'left', fontSize:8, cellWidth:175}, 3: {halign: 'center', fontSize:8, cellWidth:28}, 4: {halign: 'center', fontSize:8, cellWidth:45}, 5: {halign: 'center', fontSize:8, cellWidth:45},  6: {halign: 'center', fontSize:8, cellWidth:40}  },
       margin: { left: 15},
       body: [ body_table ]
     });
    // y=y+15;
   }
 }else{

   doc.autoTable({
     startY:doc.autoTable.previous.finalY,
     theme:'grid',
     styles: {fillColor: [215,215,215],valign:"top",lineColor:[4,1,0],lineWidth:0.2},
     columnStyles: {0: {halign: 'center'},  }, // Cells in first column centered and green
     margin: {top: 60, right: 15, bottom: 0, left: 15},
     body: [['MANO DE OBRA']]
   });

  /* doc.autoTable({
     startY: doc.autoTable.previous.finalY,
     theme:'grid',
     styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
     columnStyles: {0: {halign: 'center', fontSize:9, cellWidth:23}, 1: {halign: 'center', fontSize:9, cellWidth:55},2: {halign: 'center', fontSize:9, cellWidth:185},3: {halign: 'center', fontSize:9, cellWidth:27},4: {halign: 'center', fontSize:9, cellWidth:40}, 5: {halign: 'center', fontSize:9, cellWidth:39}, 6: {halign: 'center', fontSize:9, cellWidth:42}  },
     margin: { left: 15},
     body: [['ITEM','DESCRIPCIÓN','CANT.','VLR. UNIT.','TOTAL','ENTREGA']]
   });*/

   for (let i = 0; i < this.rowsItemsWorkforce.length; i++) {

     body_table = [i+1, this.rowsItemsWorkforce[i].service, this.rowsItemsWorkforce[i].quantity, this.rowsItemsWorkforce[i].hour_value_decimal, this.rowsItemsWorkforce[i].subtotal_decimal,
     this.rowsItemsWorkforce[i].delivery+ ' días'];

     doc.autoTable({
       startY: doc.autoTable.previous.finalY,
       theme:'grid',
       styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
       columnStyles: {0: {halign: 'center', fontSize:9, cellWidth:23},1: {halign: 'center', fontSize:9, cellWidth:190},2: {halign: 'center', fontSize:9, cellWidth:27},3: {halign: 'center', fontSize:9, cellWidth:63}, 4: {halign: 'center', fontSize:9, cellWidth:63}, 5: {halign: 'center', fontSize:9, cellWidth:46}  },
       margin: { left: 15},
       body: [ body_table ]
     });
    // y=y+15;
   }

 }
 }

 if(this.rowsItemsparts.length>0){

   if(this.checkHideCode==false){
 doc.autoTable({
   startY:doc.autoTable.previous.finalY,
   theme:'grid',
   styles: {fillColor: [215,215,215],valign:"top",lineColor:[4,1,0],lineWidth:0.2},
   columnStyles: {0: {halign: 'center'},  }, // Cells in first column centered and green
   margin: {top: 60, right: 15, bottom: 0, left: 15},
   body: [['REPUESTOS']]
 });

/* doc.autoTable({
   startY: doc.autoTable.previous.finalY,
   theme:'grid',
   styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
   columnStyles: {0: {halign: 'center', fontSize:9, cellWidth:23}, 1: {halign: 'center', fontSize:9, cellWidth:55},2: {halign: 'center', fontSize:9, cellWidth:185},3: {halign: 'center', fontSize:9, cellWidth:27},4: {halign: 'center', fontSize:9, cellWidth:40}, 5: {halign: 'center', fontSize:9, cellWidth:39}, 6: {halign: 'center', fontSize:9, cellWidth:42}  },
   margin: { left: 15},
   body: [['ITEM','CÓDIGO','DESCRIPCIÓN','CANT.','VLR. UNIT.','TOTAL','ENTREGA']]
 });*/

 for (let i = 0; i < this.rowsItemsparts.length; i++) {

   body_table = [i+1, this.rowsItemsparts[i].code, this.rowsItemsparts[i].description, this.rowsItemsparts[i].quantity, this.rowsItemsparts[i].price_decimal, this.rowsItemsparts[i].subtotal_decimal,
   this.rowsItemsparts[i].delivery+' días'];

   doc.autoTable({
     startY: doc.autoTable.previous.finalY,
     theme:'grid',
     styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
     columnStyles: {0: {halign: 'center', fontSize:8, cellWidth:23}, 1: {halign: 'left', fontSize:8, cellWidth:55},2: {halign: 'left', fontSize:8, cellWidth:175},3: {halign: 'center', fontSize:8, cellWidth:27},4: {halign: 'center', fontSize:8, cellWidth:45}, 5: {halign: 'center', fontSize:8, cellWidth:45}, 6: {halign: 'center', fontSize:8, cellWidth:41}  },
     margin: { left: 15},
     body: [ body_table ]
   });
  // y=y+15;
 }
}else{

 doc.autoTable({
   startY:doc.autoTable.previous.finalY,
   theme:'grid',
   styles: {fillColor: [215,215,215],valign:"top",lineColor:[4,1,0],lineWidth:0.2},
   columnStyles: {0: {halign: 'center'},  }, // Cells in first column centered and green
   margin: {top: 60, right: 15, bottom: 0, left: 15},
   body: [['REPUESTOS']]
 });

/* doc.autoTable({
   startY: doc.autoTable.previous.finalY,
   theme:'grid',
   styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
   columnStyles: {0: {halign: 'center', fontSize:9, cellWidth:23}, 1: {halign: 'center', fontSize:9, cellWidth:55},2: {halign: 'center', fontSize:9, cellWidth:185},3: {halign: 'center', fontSize:9, cellWidth:27},4: {halign: 'center', fontSize:9, cellWidth:40}, 5: {halign: 'center', fontSize:9, cellWidth:39}, 6: {halign: 'center', fontSize:9, cellWidth:42}  },
   margin: { left: 15},
   body: [['ITEM','DESCRIPCIÓN','CANT.','VLR. UNIT.','TOTAL','ENTREGA']]
 });*/

 for (let i = 0; i < this.rowsItemsparts.length; i++) {

   body_table = [i+1, this.rowsItemsparts[i].description, this.rowsItemsparts[i].quantity, this.rowsItemsparts[i].price_decimal, this.rowsItemsparts[i].subtotal,
   this.rowsItemsparts[i].delivery + ' días'];

   doc.autoTable({
     startY: doc.autoTable.previous.finalY,
     theme:'grid',
     styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
     columnStyles: {0: {halign: 'center', fontSize:9, cellWidth:23},1: {halign: 'left', fontSize:9, cellWidth:190},2: {halign: 'center', fontSize:9, cellWidth:27},3: {halign: 'center', fontSize:9, cellWidth:63}, 4: {halign: 'center', fontSize:9, cellWidth:63}, 5: {halign: 'center', fontSize:9, cellWidth:46}  },
     margin: { left: 15},
     body: [ body_table ]
   });
  // y=y+15;
 }

}
}

doc.autoTable({
 startY:doc.autoTable.previous.finalY,
 theme:'grid',
 styles: {fillColor: null,valign:"top",lineColor:[4,1,0],lineWidth:0.2},
 columnStyles: {0: {halign: 'left', fontSize:8, cellWidth:85}, 1: {halign: 'left', fontSize:8, cellWidth:86},2: {halign: 'left', fontSize:8, cellWidth:81},3: {halign: 'left', fontSize:8, cellWidth:80},4: {halign: 'center', fontSize:8, cellWidth:81} },
 margin: {top: 60, right: 15, bottom: 0, left: 15},
 body: [['Validez Oferta: '+ this.validity  +' días','Forma Pago: ' + this.payment_method + ' días','Garantía: '+ this.guarantyEstimate +' días','Subtotal Repuestos:',this.subtotalParts]]
});


   doc.autoTable({
     startY:  doc.autoTable.previous.finalY,
     theme:'grid',
     styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
     columnStyles: {0: {halign: 'left', fontSize:8, cellWidth:85}, 1: {halign: 'left', fontSize:8, cellWidth:86},2: {halign: 'left', fontSize:8, cellWidth:81},3: {halign: 'left', fontSize:8, cellWidth:80},4: {halign: 'center', fontSize:8, cellWidth:81} },
     margin: { left: 15},
     body: [
     [{content: this.observationEstimate, colSpan: 3, rowSpan: 3, styles: {halign: 'left'}},'Subtotal Mano de Obra',this.subtotalHours],
      ['Total',this.total],
      [{content: 'NOTA: VALORES ANTES DE IVA', colSpan: 2,  styles: {halign: 'left'}}]]
   });

console.log('info de imagenes');

console.log(this.filesImage);

 if(this.filesImage.length>0){
 console.log(this.estimateCurrent);


 console.log('MOSTRAME POR FAVOR LA URL'+ this.filesImage[0].url);
 var img4 = new Image;
 img4.onload = function() {
     doc.addImage(img4, exts,  15,  doc.autoTable.previous.finalY+20, 150,150);
     console.log('ingreso por este 4');
      doc.save('Cotizacion_No_'+estimateConsecutive+'.pdf');

 };
 img4.crossOrigin = "";
 img4.src =this.filesImage[0].url;
 var exts = this.filesImage[0].ext;
 var estimateConsecutive= this.consecutive;
 console.log('este es el numero: '+ this.estimateCurrent.estimate_consecutive);
}else{
 doc.save('Cotizacion_No_'+ this.consecutive+'.pdf');
}

 //  console.log(this.filesImage.length+' oleole');
   //doc.addPage();
  /*for (let i = 0; i < this.filesImage.length; i++) {
     console.log('este es el valor de los i');
     console.log(i);
     console.log(this.filesImage[i]);
     let a = this.filesImage[i].content;
     let b = 1+i;
     let j = 400;
     let k= j*b;


   }*/



 /*  var img = new Image;
   img.crossOrigin = "";
   img.src = this.filesImage[0].url;
   var exts = this.filesImage[0].ext;
   img.onload = function () {
     doc.addImage(img, exts,  15, 200, 150,150);
     doc.save('FirstPdf.pdf');
   }
*/

// var height=doc.autoTable.previous.finalY;
// if(doc.autoTable.previous.finalY+150>631){
//  doc.addPage();
//  height=100;
// }

/*
var imagesLong= this.filesImage.length;


var src;
var img;
var exts;
var img2;
var src2;
var exts2;
var img3;
var src3;
var exts3;
var img4;
var src4;
var exts4 ;


if(this.filesImage[0]){
  img = new Image;
  this.extImageOne = this.filesImage[0].ext;
  src = this.filesImage[0].url;
}
if(this.filesImage[1]){
  img2 = new Image;
  src2 = this.filesImage[1].url;
  this.extImageTwo = this.filesImage[1].ext;
}

if(this.filesImage[2]){
  img3 = new Image;
  src3 = this.filesImage[2].url;
  this.extImageThree = this.filesImage[2].ext;
}
if(this.filesImage[3]){
  img4 = new Image;
  src4 = this.filesImage[3].url;
  this.extImageFour = this.filesImage[3].ext;
}


var extOne=this.extImageOne;
var extTwo=this.extImageTwo;
var extThree=this.extImageThree;
var extFour=this.extImageFour;

if(imagesLong>0){ // Si hay imagenes




img.onload = function() {


     height=height+10;
     doc.addImage(img, extOne,  15,  height, 150,150);
     //doc.save('FirstPdf.pdf');
     //doc.addPage();


     if(height+150>631){
       doc.addPage();
       height=20;
     }else{
       height=height+151;
     }
     if(2<=imagesLong){
     img2.onload = function() {
       doc.addImage(img2, extTwo,  15,  height, 150,150);

     //  doc.save('FirstPdf.pdf');
      // doc.addPage();
      if(height+150>631){
       doc.addPage();
       height=20;
     }else{
       height=height+151;
     }
      if(3<=imagesLong){
      img3.onload = function() {
       doc.addImage(img3, extThree,  15,  height, 150,150);

     //  doc.save('FirstPdf.pdf');
     //  doc.addPage();
     if(height+150>631){
       doc.addPage();
       height=100;
     }else{
       height=height+151;
     }
     if(4<=imagesLong){
     img4.onload = function() {
       doc.addImage(img4, extFour,  15, height, 150,150);
       console.log('ingreso por este 4');
       doc.save('CuatroFirstPdf.pdf');

   };
   img4.crossOrigin = "";
   img4.src = src4;
   var exts = exts4;
//----------------
//----------------
}

   };

   img3.crossOrigin = "";
   img3.src = src3;
   var exts = exts3;
//----------------
}else{
 doc.save('TresFirstPdf.pdf');

}

   };
   img2.crossOrigin = "";
   img2.src = src2;
   var exts = exts2;

   //-------
 }else{
   doc.save('DosFirstPdf.pdf');
 }
 };
 img.crossOrigin = "";
 img.src = src;

} */

    /*   if(this.filesImage[0]){
         console.log('0');
         console.log(this.filesImage[0].ext);
         doc.addImage(this.filesImage[0].content,this.filesImage[0].ext,  15, 200, 150,150);
       }


       if(this.filesImage[1]){
         console.log('1');
         console.log(this.filesImage[1].ext);
         doc.addImage(this.filesImage[1].content, this.filesImage[1].ext,  15, 350, 100, 100);
       }*/




       /*
       if(this.filesImage[2]){
         console.log('2');
         console.log(this.filesImage[2].ext);
         doc.addImage(this.filesImage[2].content, this.filesImage[2].ext,  15, 500, 222, 100);
       }*/







  /* if(ind==0){
   doc.save('FirstPdf.pdf');

   }else{
     this.blobGlobal = doc.output('blob');
     console.log('ingreso a ja');
     this.ja();
   }*/


   console.log('el ja tiene el metodo para enviar el correo');
   Swal.close();
   }

   async  getBase64ImageFromUrl(imageUrl) {
     var res = await fetch(imageUrl);
     var blob = await res.blob();
     return new Promise((resolve, reject) => {
       var reader  = new FileReader();
       reader.addEventListener("load", function () {
           resolve(reader.result);
       }, false);
       reader.onerror = () => {
         return reject(this);
       };
       reader.readAsDataURL(blob);
     })
   }

   createPdf() {
     var doc = new jsPDF();

     doc.setFontSize(18);
     doc.text('With content', 14, 22);
     doc.setFontSize(11);
     doc.setTextColor(100);

     // jsPDF 1.4+ uses getWidth, <1.4 uses .width
     var pageSize = doc.internal.pageSize;
     var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
   //  var text = doc.splitTextToSize(faker.lorem.sentence(45), pageWidth - 35, {});

     var body_table = [];
     let i=0;
     body_table = [i+1, this.rowsItemsparts[i].code, this.rowsItemsparts[i].description, this.rowsItemsparts[i].quantity, this.rowsItemsparts[i].price_decimal, this.rowsItemsparts[i].subtotal_decimal,
     this.rowsItemsparts[i].delivery];

     doc.autoTable({
       startY:23,
       theme:'grid',
       styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
       columnStyles: {0: {halign: 'center', fontSize:8, cellWidth:23}, 1: {halign: 'center', fontSize:8, cellWidth:55},2: {halign: 'left', fontSize:8, cellWidth:185},3: {halign: 'center', fontSize:8, cellWidth:27},4: {halign: 'center', fontSize:8, cellWidth:40}, 5: {halign: 'center', fontSize:8, cellWidth:39}, 6: {halign: 'center', fontSize:8, cellWidth:42}  },
       margin: { left: 15},
       body: [ body_table ]
     });


     doc.text('i', 14, doc.autoTable.previous.finalY + 10);

     doc.save('table.pdf');
   }


// ***********************************



downloadSend2(ind: number){

 console.log('downloadSend');


 // this.pp();



 let months = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
 let days = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
 let currentDate = new Date(this.creationDate.replace('-','/'));
 let currentDateFormat = days[currentDate.getDay()] + ", " + (currentDate.getDate()) + " de " + months[currentDate.getMonth()] + " de " + currentDate.getFullYear();
 var body_table = [];


 let imageurl = 'data:image/png;base64,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';
 const doc = new jsPDF('p', 'px', 'a4');


 var width = doc.internal.pageSize.width;
 var height = doc.internal.pageSize.height;

 console.log('este es el ancho'+width);
 console.log('este es el alto'+height);

 doc.autoTable({
   startY: 7,
   columnStyles:{2: { cellWidth:50, fontSize:8,   fillColor: null},  1: {cellWidth:260,fontSize:8, halign: 'left',fillColor: null},  0: {cellWidth:90,fontSize:8, halign: 'left', fillColor: null} },
   alternateRowStyles:{fontSize:9},
   margin: { left: 15},
   body: [[currentDateFormat,'', '1 de 1' ]]

 });


 doc.text('Cotización', 230, 55, 'center');
 doc.addImage(imageurl, 'PNG', 15, 60, 120, 42);
 //doc.text('Cotizacción', 230, doc.image.previous.finalY, 'center');

 doc.autoTable({
   startY: 60,
   columnStyles:{2: { cellWidth:105, fontSize:9,   fillColor: null},  1: {cellWidth:102,fontSize:9, halign: 'left',fillColor: null},  0: {cellWidth:88,fontSize:9, halign: 'left', fillColor: null} },
   alternateRowStyles:{fontSize:9},
   margin: {top: 60, right: 15, bottom: 0, left: 135},
   body: [['MONTACARGAS MASTER Nit. 900.204.935-2              Medellín - Colombia     ','PBX. (57-4) 444 6055               CLL 10 B sur # 51 42', '' ]]

 });

 doc.autoTable({

   startY: 85,
   columnStyles:{0: { cellWidth:180, fontSize:9,  fillColor: null},  1: {fontSize:12, halign: 'center', fillColor: null, textColor:[255, 0, 0] }},
   alternateRowStyles:{fontSize:9},
   margin: {top: 60, right: 15, bottom: 0, left: 135},
   body: [ ['Creado Por: '+ this.user,'No. ' + this.consecutive ]]
 });


 doc.autoTable({
   startY: doc.autoTable.previous.finalY,
   theme:'grid',
   styles: {fillColor: [215,215,215],valign:"top",lineColor:[4,1,0],lineWidth:0.2},
   columnStyles: {0: {halign: 'center'},  }, // Cells in first column centered and green
   margin: {top: 60, right: 15, bottom: 0, left: 15},
   body: [['CLIENTE']]
 });

 doc.autoTable({
   startY: doc.autoTable.previous.finalY,
   theme:'grid',
   styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
   columnStyles: {0: { cellWidth: 230, fontSize:9,  fillColor: null},  1: {fontSize:9, halign: 'left', fillColor: null, cellWidth:185}},
   margin: { left: 15},
   body: [['Nit: ' + this.documentCustomer+' '+this.nameCustomer, 'Contacto: '+ this.contact]]
 });

 doc.autoTable({
   startY:doc.autoTable.previous.finalY,
   theme:'grid',
   styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
   columnStyles: {0: { cellWidth:100, fontSize:9,  fillColor: null},  1: {fontSize:9, halign: 'left', fillColor: null, cellWidth:100},  2: {fontSize:9, halign: 'left', fillColor: null, cellWidth:214}},
   margin: { left: 15},
   body: [['Telefono: '+ this.cellphone, 'Ciudad: '+ 'Medellín', 'Maquina: '+  'CHEVROLEJTL CHR3566987893 123456543345'  ]]
 });
 //Vamos en este punto


 //**********************************************************     */


 doc.autoTable({
   startY:doc.autoTable.previous.finalY,
   theme:'grid',
   styles: {fillColor: [215,215,215],valign:"top",lineColor:[4,1,0],lineWidth:0.2},
   columnStyles: {0: {halign: 'center'},  }, // Cells in first column centered and green
   margin: {top: 60, right: 15, bottom: 0, left: 15},
   body: [['MANO DE OBRA Y SERVICIOS']]
 });

 if(this.checkHideCode==false){
 doc.autoTable({
   startY: doc.autoTable.previous.finalY,
   theme:'grid',
   styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
   columnStyles: {0: {halign: 'center', fontSize:9, cellWidth:23}, 1: {halign: 'center', fontSize:9, cellWidth:55},2: {halign: 'center', fontSize:9, cellWidth:185},3: {halign: 'center', fontSize:9, cellWidth:27},4: {halign: 'center', fontSize:9, cellWidth:40}, 5: {halign: 'center', fontSize:9, cellWidth:39}, 6: {halign: 'center', fontSize:9, cellWidth:42}  },
   margin: { left: 15},
   body: [['ITEM','CÓDIGO','DESCRIPCIÓN','CANT.','VLR. UNIT.','TOTAL','ENTREGA']]
 });
}else{
 doc.autoTable({
   startY: doc.autoTable.previous.finalY,
   theme:'grid',
   styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
   columnStyles: {0: {halign: 'center', fontSize:9, cellWidth:23},1: {halign: 'center', fontSize:9, cellWidth:190},2: {halign: 'center', fontSize:9, cellWidth:27},3: {halign: 'center', fontSize:9, cellWidth:63}, 4: {halign: 'center', fontSize:9, cellWidth:63}, 5: {halign: 'center', fontSize:9, cellWidth:46}  },
   margin: { left: 15},
   body: [['ITEM','DESCRIPCIÓN','CANT.','VLR. UNIT.','TOTAL','ENTREGA']]
 });
}

 if(this.rowsItemsWorkforce.length>0){

   if(this.checkHideCode==false){
 doc.autoTable({
   startY:doc.autoTable.previous.finalY,
   theme:'grid',
   styles: {fillColor: [215,215,215],valign:"top",lineColor:[4,1,0],lineWidth:0.2},
   columnStyles: {0: {halign: 'center'},  }, // Cells in first column centered and green
   margin: {top: 60, right: 15, bottom: 0, left: 15},
   body: [['MANO DE OBRA']]
 });

 /*doc.autoTable({
   startY: doc.autoTable.previous.finalY,
   theme:'grid',
   styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
   columnStyles: {0: {halign: 'center', fontSize:9, cellWidth:23}, 1: {halign: 'center', fontSize:9, cellWidth:55},2: {halign: 'center', fontSize:9, cellWidth:185},3: {halign: 'center', fontSize:9, cellWidth:27},4: {halign: 'center', fontSize:9, cellWidth:40}, 5: {halign: 'center', fontSize:9, cellWidth:39}, 6: {halign: 'center', fontSize:9, cellWidth:42}  },
   margin: { left: 15},
   body: [['ITEM','CÓDIGO','DESCRIPCIÓN','CANT.','VLR. UNIT.','TOTAL','ENTREGA']]
 });*/

 for (let i = 0; i < this.rowsItemsWorkforce.length; i++) {

   body_table = [i+1, this.rowsItemsWorkforce[i].code, this.rowsItemsWorkforce[i].service, this.rowsItemsWorkforce[i].quantity, this.rowsItemsWorkforce[i].hour_value_decimal, this.rowsItemsWorkforce[i].subtotal_decimal,
   this.rowsItemsWorkforce[i].delivery];

   doc.autoTable({
     startY: doc.autoTable.previous.finalY,
     theme:'grid',
     styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
     columnStyles: {0: {halign: 'center', fontSize:8, cellWidth:23},1: {halign: 'left', fontSize:8, cellWidth:55}, 2: {halign: 'center', fontSize:8, cellWidth:185}, 3: {halign: 'center', fontSize:8, cellWidth:28}, 4: {halign: 'center', fontSize:8, cellWidth:40}, 5: {halign: 'center', fontSize:8, cellWidth:40},  6: {halign: 'center', fontSize:8, cellWidth:40}  },
     margin: { left: 15},
     body: [ body_table ]
   });
  // y=y+15;
 }
}else{

 doc.autoTable({
   startY:doc.autoTable.previous.finalY,
   theme:'grid',
   styles: {fillColor: [215,215,215],valign:"top",lineColor:[4,1,0],lineWidth:0.2},
   columnStyles: {0: {halign: 'center'},  }, // Cells in first column centered and green
   margin: {top: 60, right: 15, bottom: 0, left: 15},
   body: [['MANO DE OBRA']]
 });

/* doc.autoTable({
   startY: doc.autoTable.previous.finalY,
   theme:'grid',
   styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
   columnStyles: {0: {halign: 'center', fontSize:9, cellWidth:23}, 1: {halign: 'center', fontSize:9, cellWidth:55},2: {halign: 'center', fontSize:9, cellWidth:185},3: {halign: 'center', fontSize:9, cellWidth:27},4: {halign: 'center', fontSize:9, cellWidth:40}, 5: {halign: 'center', fontSize:9, cellWidth:39}, 6: {halign: 'center', fontSize:9, cellWidth:42}  },
   margin: { left: 15},
   body: [['ITEM','DESCRIPCIÓN','CANT.','VLR. UNIT.','TOTAL','ENTREGA']]
 });*/

 for (let i = 0; i < this.rowsItemsWorkforce.length; i++) {

   body_table = [i+1, this.rowsItemsWorkforce[i].service, this.rowsItemsWorkforce[i].quantity, this.rowsItemsWorkforce[i].hour_value_decimal, this.rowsItemsWorkforce[i].subtotal_decimal,
   this.rowsItemsWorkforce[i].delivery];

   doc.autoTable({
     startY: doc.autoTable.previous.finalY,
     theme:'grid',
     styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
     columnStyles: {0: {halign: 'center', fontSize:9, cellWidth:23},1: {halign: 'center', fontSize:9, cellWidth:190},2: {halign: 'center', fontSize:9, cellWidth:27},3: {halign: 'center', fontSize:9, cellWidth:63}, 4: {halign: 'center', fontSize:9, cellWidth:63}, 5: {halign: 'center', fontSize:9, cellWidth:46}  },
     margin: { left: 15},
     body: [ body_table ]
   });
  // y=y+15;
 }

}
}

if(this.rowsItemsparts.length>0){

 if(this.checkHideCode==false){
doc.autoTable({
 startY:doc.autoTable.previous.finalY,
 theme:'grid',
 styles: {fillColor: [215,215,215],valign:"top",lineColor:[4,1,0],lineWidth:0.2},
 columnStyles: {0: {halign: 'center'},  }, // Cells in first column centered and green
 margin: {top: 60, right: 15, bottom: 0, left: 15},
 body: [['REPUESTOS']]
});

/* doc.autoTable({
 startY: doc.autoTable.previous.finalY,
 theme:'grid',
 styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
 columnStyles: {0: {halign: 'center', fontSize:9, cellWidth:23}, 1: {halign: 'center', fontSize:9, cellWidth:55},2: {halign: 'center', fontSize:9, cellWidth:185},3: {halign: 'center', fontSize:9, cellWidth:27},4: {halign: 'center', fontSize:9, cellWidth:40}, 5: {halign: 'center', fontSize:9, cellWidth:39}, 6: {halign: 'center', fontSize:9, cellWidth:42}  },
 margin: { left: 15},
 body: [['ITEM','CÓDIGO','DESCRIPCIÓN','CANT.','VLR. UNIT.','TOTAL','ENTREGA']]
});*/

for (let i = 0; i < this.rowsItemsparts.length; i++) {

 body_table = [i+1, this.rowsItemsparts[i].code, this.rowsItemsparts[i].description, this.rowsItemsparts[i].quantity, this.rowsItemsparts[i].price_decimal, this.rowsItemsparts[i].subtotal_decimal,
 this.rowsItemsparts[i].delivery];

 doc.autoTable({
   startY: doc.autoTable.previous.finalY,
   theme:'grid',
   styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
   columnStyles: {0: {halign: 'center', fontSize:8, cellWidth:23}, 1: {halign: 'left', fontSize:8, cellWidth:55},2: {halign: 'left', fontSize:8, cellWidth:185},3: {halign: 'center', fontSize:8, cellWidth:27},4: {halign: 'center', fontSize:8, cellWidth:40}, 5: {halign: 'center', fontSize:8, cellWidth:39}, 6: {halign: 'center', fontSize:8, cellWidth:42}  },
   margin: { left: 15},
   body: [ body_table ]
 });
// y=y+15;
}
}else{

doc.autoTable({
 startY:doc.autoTable.previous.finalY,
 theme:'grid',
 styles: {fillColor: [215,215,215],valign:"top",lineColor:[4,1,0],lineWidth:0.2},
 columnStyles: {0: {halign: 'center'},  }, // Cells in first column centered and green
 margin: {top: 60, right: 15, bottom: 0, left: 15},
 body: [['REPUESTOS']]
});

/* doc.autoTable({
 startY: doc.autoTable.previous.finalY,
 theme:'grid',
 styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
 columnStyles: {0: {halign: 'center', fontSize:9, cellWidth:23}, 1: {halign: 'center', fontSize:9, cellWidth:55},2: {halign: 'center', fontSize:9, cellWidth:185},3: {halign: 'center', fontSize:9, cellWidth:27},4: {halign: 'center', fontSize:9, cellWidth:40}, 5: {halign: 'center', fontSize:9, cellWidth:39}, 6: {halign: 'center', fontSize:9, cellWidth:42}  },
 margin: { left: 15},
 body: [['ITEM','DESCRIPCIÓN','CANT.','VLR. UNIT.','TOTAL','ENTREGA']]
});*/

for (let i = 0; i < this.rowsItemsparts.length; i++) {

 body_table = [i+1, this.rowsItemsparts[i].description, this.rowsItemsparts[i].quantity, this.rowsItemsparts[i].price_decimal, this.rowsItemsparts[i].subtotal,
 this.rowsItemsparts[i].delivery];

 doc.autoTable({
   startY: doc.autoTable.previous.finalY,
   theme:'grid',
   styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
   columnStyles: {0: {halign: 'center', fontSize:9, cellWidth:23},1: {halign: 'left', fontSize:9, cellWidth:190},2: {halign: 'center', fontSize:9, cellWidth:27},3: {halign: 'center', fontSize:9, cellWidth:63}, 4: {halign: 'center', fontSize:9, cellWidth:63}, 5: {halign: 'center', fontSize:9, cellWidth:46}  },
   margin: { left: 15},
   body: [ body_table ]
 });
// y=y+15;
}

}
}

doc.autoTable({
startY:doc.autoTable.previous.finalY,
theme:'grid',
styles: {fillColor: null,valign:"top",lineColor:[4,1,0],lineWidth:0.2},
columnStyles: {0: {halign: 'left', fontSize:8, cellWidth:85}, 1: {halign: 'left', fontSize:8, cellWidth:86},2: {halign: 'left', fontSize:8, cellWidth:81},3: {halign: 'left', fontSize:8, cellWidth:80},4: {halign: 'center', fontSize:8, cellWidth:81} },
margin: {top: 60, right: 15, bottom: 0, left: 15},
body: [['Validez Oferta: 5 días','Forma Pago: 30 días','Garantía: 90 días','Subtotal Repuestos:','1.500.000']]
});

 doc.autoTable({
   startY:  doc.autoTable.previous.finalY,
   theme:'grid',
   styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
   columnStyles: {0: {halign: 'left', fontSize:8, cellWidth:85}, 1: {halign: 'left', fontSize:8, cellWidth:86},2: {halign: 'left', fontSize:8, cellWidth:81},3: {halign: 'left', fontSize:8, cellWidth:80},4: {halign: 'center', fontSize:8, cellWidth:81} },
   margin: { left: 15},
   body: [
   [{content: 'HNYUCW-00128', colSpan: 3, rowSpan: 3, styles: {halign: 'left'}},'Subtotal Mano de Obra','0'],
    ['Total','89000'],
    [{content: 'NOTA: VALORES ANTES DE IVA', colSpan: 2,  styles: {halign: 'left'}}]]
 });


 if(this.filesImage.length>0){
 console.log('MOSTRAME POR FAVOR LA URL'+ this.filesImage[0].url);
var img4 = new Image;
img4.crossOrigin = "";
img4.src =this.filesImage[0].content;
var exts = this.filesImage[0].ext;


// img4.onload = function() {
   doc.addImage(img4, exts,  15,  doc.autoTable.previous.finalY+20, 150,150);
   console.log('ingreso por este 4');

 }
   // doc.save('CuatroFirstPdf.pdf');
  // this.blobGlobal = doc.output('blob');
// };


this.blobGlobal = doc.output('blob');
console.log('ingreso a ja');
this.sendEmailEstimateAmazon();

//  console.log(this.filesImage.length+' oleole');
 //doc.addPage();
/*for (let i = 0; i < this.filesImage.length; i++) {
   console.log('este es el valor de los i');
   console.log(i);
   console.log(this.filesImage[i]);
   let a = this.filesImage[i].content;
   let b = 1+i;
   let j = 400;
   let k= j*b;


 }*/



/*  var img = new Image;
 img.crossOrigin = "";
 img.src = this.filesImage[0].url;
 var exts = this.filesImage[0].ext;
 img.onload = function () {
   doc.addImage(img, exts,  15, 200, 150,150);
   doc.save('FirstPdf.pdf');
 }
*/

// var height=doc.autoTable.previous.finalY;
// if(doc.autoTable.previous.finalY+150>631){
//  doc.addPage();
//  height=100;
// }

/*
var imagesLong= this.filesImage.length;


var src;
var img;
var exts;
var img2;
var src2;
var exts2;
var img3;
var src3;
var exts3;
var img4;
var src4;
var exts4 ;


if(this.filesImage[0]){
img = new Image;
this.extImageOne = this.filesImage[0].ext;
src = this.filesImage[0].url;
}
if(this.filesImage[1]){
img2 = new Image;
src2 = this.filesImage[1].url;
this.extImageTwo = this.filesImage[1].ext;
}

if(this.filesImage[2]){
img3 = new Image;
src3 = this.filesImage[2].url;
this.extImageThree = this.filesImage[2].ext;
}
if(this.filesImage[3]){
img4 = new Image;
src4 = this.filesImage[3].url;
this.extImageFour = this.filesImage[3].ext;
}


var extOne=this.extImageOne;
var extTwo=this.extImageTwo;
var extThree=this.extImageThree;
var extFour=this.extImageFour;

if(imagesLong>0){ // Si hay imagenes




img.onload = function() {


   height=height+10;
   doc.addImage(img, extOne,  15,  height, 150,150);
   //doc.save('FirstPdf.pdf');
   //doc.addPage();


   if(height+150>631){
     doc.addPage();
     height=20;
   }else{
     height=height+151;
   }
   if(2<=imagesLong){
   img2.onload = function() {
     doc.addImage(img2, extTwo,  15,  height, 150,150);

   //  doc.save('FirstPdf.pdf');
    // doc.addPage();
    if(height+150>631){
     doc.addPage();
     height=20;
   }else{
     height=height+151;
   }
    if(3<=imagesLong){
    img3.onload = function() {
     doc.addImage(img3, extThree,  15,  height, 150,150);

   //  doc.save('FirstPdf.pdf');
   //  doc.addPage();
   if(height+150>631){
     doc.addPage();
     height=100;
   }else{
     height=height+151;
   }
   if(4<=imagesLong){
   img4.onload = function() {
     doc.addImage(img4, extFour,  15, height, 150,150);
     console.log('ingreso por este 4');
     doc.save('CuatroFirstPdf.pdf');

 };
 img4.crossOrigin = "";
 img4.src = src4;
 var exts = exts4;
//----------------
//----------------
}

 };

 img3.crossOrigin = "";
 img3.src = src3;
 var exts = exts3;
//----------------
}else{
doc.save('TresFirstPdf.pdf');

}

 };
 img2.crossOrigin = "";
 img2.src = src2;
 var exts = exts2;

 //-------
}else{
 doc.save('DosFirstPdf.pdf');
}
};
img.crossOrigin = "";
img.src = src;

} */

  /*   if(this.filesImage[0]){
       console.log('0');
       console.log(this.filesImage[0].ext);
       doc.addImage(this.filesImage[0].content,this.filesImage[0].ext,  15, 200, 150,150);
     }


     if(this.filesImage[1]){
       console.log('1');
       console.log(this.filesImage[1].ext);
       doc.addImage(this.filesImage[1].content, this.filesImage[1].ext,  15, 350, 100, 100);
     }*/




     /*
     if(this.filesImage[2]){
       console.log('2');
       console.log(this.filesImage[2].ext);
       doc.addImage(this.filesImage[2].content, this.filesImage[2].ext,  15, 500, 222, 100);
     }*/







/* if(ind==0){
 doc.save('FirstPdf.pdf');

 }else{
   this.blobGlobal = doc.output('blob');
   console.log('ingreso a ja');
   this.ja();
 }*/


 console.log('el ja tiene el metodo para enviar el correo');
 }










// *******************************************
   async pp(id:number){
 await  this.getFilesImage(id);

  /* this.getBase64ImageFromUrl('https://masterforklift.s3.amazonaws.com/estimate_files/simpsons_PNG95.png')
   .then(result =>{
   //  console.log(result);
   //this.download(254);
     this.imageGlobal=result;
   })
   .catch(err => console.error(err));*/
 }

getImgFromUrl(logo_url, callback) {
   var img = new Image();
   img.src = logo_url;
   img.onload = function () {
       callback(img);
   };
}

generatePDF(img){
 var options = {orientation: 'p', unit: 'mm'};
 var doc = new jsPDF(options);
 doc.addImage(img, 'JPEG', 0, 0, 100, 50);
}


opp(){
 var logo_url = "/images/logo.jpg";
this.getImgFromUrl(logo_url, function (img) {
   this.generatePDF(img);
});
}




  getCustomers() {
   this.restService.getCustomer().then(data => {
     const resp: any = data;
     console.log(data);
     Swal.close();
     this.customers  = resp.data;
     // this.rowsClient = resp.data;
     // this.rowStatic =  resp.data;
     // this.rowsTemp = resp.data;
     // console.log( this.rowsClient);
   }).catch(error => {
     console.log(error);
   });
  }

  getForklifs() {
    if(this.selectedBranchOfficeId!=0){
    console.log('this.selectedBusinessId.id');
    console.log(this.selectedBranchOfficeId.id);

  this.forkliftService.getForkliftBranchOfficesFull(this.selectedBranchOfficeId.id).then(data => {
      const resp: any = data;
      console.log(data);
      Swal.close();
      this.forklifts  = resp.data;

    }).catch(error => {
      console.log(error);
    });
  }else{
    this.selectedDepartmentId=0;
    this.selectedCityId=0;
    this.documentCustomer = '';
    this.nameCustomer ='';
    this.cellphone = '';
    this.contact =  '';
    this.selectedForkliftId=0;
   //  this.email =  this.selectedBusinessId.email;
    this.days =0;
  }
}

  getForkliftText(){}


  partChange(event:any, item:any){

   console.log('valor para editar');
   console.log(event.target.value);
   console.log(item);
   console.log(item.id);

   for (let i = 0; i < this.itemsPart.length; i++){
    if (this.itemsPart[i].id == item.id){
    console.log(item);
    console.log('lo encontre'+i);

    if(event.target.value !='' && event.target.value != 0){
      this.itemsPart[i].quantity=event.target.value;
      console.log(this.itemsPart[i]);
    }else{
      Swal({
        title:'Error',
        text: 'Las cantidades deben ser diferentes a 0',
        type: 'error'
       });
    }

    }
  }
 }



  workForceChange(event:any, item:any){

    console.log('valor para editar');
    console.log(event.target.value);
    console.log(item);
    console.log(item.id);

    for (let i = 0; i < this.itemsWorkforce.length; i++){
     if (this.itemsWorkforce[i].id == item.id){
     console.log(item);
     console.log('lo encontre'+i);

     if(event.target.value !='' && event.target.value != 0){
       this.itemsWorkforce[i].quantity=event.target.value;
       console.log(this.itemsWorkforce[i]);
     }else{
       Swal({
         title:'Error',
         text: 'Las cantidades deben ser diferentes a 0',
         type: 'error'
        });
     }

     }
   }
  }


  workForceChangeActive(event:any, item:any){

   console.log('valor para editar');
   console.log(event);
   console.log(item);
   console.log(item.id);

   for (let i = 0; i < this.itemsWorkforce.length; i++){
    if (this.itemsWorkforce[i].id == item.id){
    console.log(item);
    console.log('lo encontre'+i);
      this.itemsWorkforce[i].active=event.target.checked;
      console.log(this.itemsWorkforce[i]);
    }
  }
 }


 partChangeActive(event:any, item:any){

   console.log('valor para editar');
   console.log(event);
   console.log(item);
   console.log(item.id);

   for (let i = 0; i < this.itemsPart.length; i++){
    if (this.itemsPart[i].id == item.id){
    console.log(item);
    console.log('lo encontre'+i);
      this.itemsPart[i].active=event.target.checked;
      console.log(this.itemsPart[i]);
    }
  }
 }


 onChangeCode(event){
   console.log(event);
   this.checkHideCode= event.target.checked;
   console.log('este es el evento para chekear eso');
 }


 checkUncheckAllWorkforce(event:any){

 this.checkAllWorkForce=event.target.checked;
   for (let i = 0; i < this.itemsWorkforce.length; i++){
     console.log('lo encontre'+i);
       this.itemsWorkforce[i].active=event.target.checked;
   }
 }


 checkUncheckAllPart(event:any){

   this.checkAllPart=event.target.checked;
     for (let i = 0; i < this.itemsPart.length; i++){
       console.log('lo encontre'+i);
         this.itemsPart[i].active=event.target.checked;
     }
   }



  getEstimateFilters() {

   if(this.considerDate == false && this.selectedBusinessId == 0 &&  this.part == 0 &&
     this.codepart == 0 && this.numberEstimate == 0  &&  this.selectedRegionalId == 0 &&
     this.programate == false && this.selectedUserId == 0 && this.selectWarehouses == 0 &&
     this.selectedCostCenter == 0  && this.selectedSubCostCenter == 0 && this.selectedBranchOfficeId == 0 && this.selectedForkliftId == 0){
       Swal({
         title:'Importante',
         text: 'Debes seleccionar por lo menos uno de los filtros o activar casilla para tener en cuenta las fechas',
         type: 'error'
        });
     }else{
   Swal({
     title: 'Validando información ...',
     allowOutsideClick: false
   });
   Swal.showLoading();

   let params='';
   let cont=0;
   if(this.considerDate){

     // poner los 0
     var day = (this.fromDate.day < 10 ? '0' : '') +this.fromDate.day;
     // 01, 02, 03, ... 10, 11, 12
     let month = ((this.fromDate.month) < 10 ? '0' : '') + (this.fromDate.month);
     // 1970, 1971, ... 2015, 2016, ...
     var year = this.fromDate.year;

     // until poner los ceros
     var dayUntil = (this.untilDate.day < 10 ? '0' : '') +this.untilDate.day;
     // 01, 02, 03, ... 10, 11, 12
     let monthUntil = ((this.untilDate.month) < 10 ? '0' : '') + (this.untilDate.month);
     // 1970, 1971, ... 2015, 2016, ...
     var yearUntil = this.untilDate.year;

     var fromD = year +'-'+ month+'-'+ day;
     var untilD = yearUntil +'-'+ monthUntil+'-'+ dayUntil;
     //var fromD = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day; //31 de diciembre de 2015
     // var untilD = this.untilDate.year+'-'+this.untilDate.month+'-'+this.untilDate.day;
     params='from_date='+ fromD+' 00:00:00'+'&&'+'to_date=' +untilD+' 23:59:59';
   cont++;
   }

   if(this.selectedBusinessId!=0){
    console.log('imprimir cont');
     console.log(cont);
     if(cont>0){
       params=params+'&&customer_id='+this.selectedBusinessId.id;
     }else{
       params=params+'customer_id='+this.selectedBusinessId.id;
       cont++;
     }
   }

   if(this.part!=''){
     if(cont>0){
       params=params+'&&description_query='+this.part;
     }else{
       params=params+'description_query='+this.part;
       cont++;
     }
   }

   if(this.codepart!=''){
     if(cont>0){
       params=params+'&&codepart_query='+this.codepart;
     }else{
       params=params+'codepart_query='+this.codepart;
       cont++;
     }
   }


   if(this.numberSettlement!=''){
     if(cont>0){
       params=params+'&&consecutive='+this.numberSettlement;
     }else{
       params=params+'consecutive='+this.numberSettlement;
       cont++;
     }
   }

   if(this.numberInvoice!=''){
     if(cont>0){
       params=params+'&&invoice_text='+this.numberInvoice;
     }else{
       params=params+'invoice_text='+this.numberInvoice;
       cont++;
     }
   }

   if(this.numberEstimate!=''){
     if(cont>0){
       params=params+'&&estimate='+this.numberEstimate;
     }else{
       params=params+'estimate='+this.numberEstimate;
       cont++;
     }
   }

   if(this.selectedRegionalId!=0){
     console.log(cont);
     if(cont>0){
     params=params+'&&regional_id='+this.selectedRegionalId.id;
     }else{
       params=params+'regional_id='+this.selectedRegionalId.id;
       cont++;
     }
   }

   if(this.selectedBranchOfficeId!=0){
    console.log(cont);
     if(cont>0){
     params=params+'&&branch_office_id='+this.selectedBranchOfficeId.id;
     }else{
       params=params+'branch_office_id='+this.selectedBranchOfficeId.id;
       cont++;
     }
   }

   if(this.selectedForkliftId!=0){
    console.log(cont);
     if(cont>0){
     params=params+'&&forklift_id='+this.selectedForkliftId.id;
     }else{
       params=params+'forklift_id='+this.selectedForkliftId.id;
       cont++;
     }
   }

   if(this.selectedUserId!=0){
    console.log(cont);
     if(cont>0){
     params=params+'&&user_id='+this.selectedUserId;
     }else{
       params=params+'user_id='+this.selectedUserId;
       cont++;
     }
   }
   if(this.selectWarehouses!=0){
    console.log(cont);
     if(cont>0){
     params=params+'&&warehouses_id='+this.selectWarehouses;
     }else{
       params=params+'warehouses_id='+this.selectWarehouses;
       cont++;
     }
   }
   if(this.selectedCostCenter!=0){
    console.log(cont);
     if(cont>0){
     params=params+'&&cost_center_id='+this.selectedCostCenter;
     }else{
       params=params+'cost_center_id='+this.selectedCostCenter;
       cont++;
     }
   }
   if(this.selectedSubCostCenter!=0){
    console.log(cont);
     if(cont>0){
     params=params+'&&sub_cots_center_id='+this.selectedSubCostCenter;
     }else{
       params=params+'sub_cots_center_id='+this.selectedSubCostCenter;
       cont++;
     }
   }

   if(this.programate == true){
     if(cont>0){
     params=params+'&&programmed='+1;
     }else{
       params=params+'programmed='+1;
       cont++;
     }
   }

   console.log('.---------->'+params);
   this.settlementeService.showSettlementFilter(params).then(data => {
     const resp: any = data;
     console.log('info de filter');
     console.log(data);
    // this.customers  = resp.data;
      this.rowsClient = resp.data;
      console.log(resp.error);
      Swal.close();
      if(resp.error){
        console.log('entro')
        Swal({
          title:'Tiempo de busqueda excedido',
          text: 'El rango de tiempo seleccionado para la busqueda es muy amplio, seleccione uno mejor para una consulta mas optima.',
          type: 'warning'
         });
      }
     // this.rowStatic =  resp.data;
     // this.rowsTemp = resp.data;
     // console.log( this.rowsClient);
   }).catch(error => {
     console.log(error);
   });
 }
}

  getEstimateFiltersInitial() {

   let params='';
   let cont=0;

   var day = (this.fromDate.day < 10 ? '0' : '') +this.fromDate.day;
   // 01, 02, 03, ... 10, 11, 12
   let month = ((this.fromDate.month) < 10 ? '0' : '') + (this.fromDate.month);
   // 1970, 1971, ... 2015, 2016, ...
   var year = this.fromDate.year;

   // until poner los ceros
   var dayUntil = (this.untilDate.day < 10 ? '0' : '') +this.untilDate.day;
   // 01, 02, 03, ... 10, 11, 12
   let monthUntil = ((this.untilDate.month) < 10 ? '0' : '') + (this.untilDate.month);
   // 1970, 1971, ... 2015, 2016, ...
   var yearUntil = this.untilDate.year;

   var fromD = year +'-'+ month+'-'+ day;
   var untilD = yearUntil +'-'+ monthUntil+'-'+ dayUntil;

   //  var fromD = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day; //31 de diciembre de 2015
   //  var untilD = this.untilDate.year+'-'+this.untilDate.month+'-'+this.untilDate.day;
     params='from_date='+ fromD+' 00:00:00'+'&&'+'to_date=' +untilD+' 23:59:59';

   console.log('.---------->'+params);
   this.settlementeService.showSettlementFilter(params).then(data => {
     const resp: any = data;
     console.log('info de filter');
     console.log(data);
     Swal.close();
    // this.customers  = resp.data;
      this.rowsClient = resp.data;
     // this.rowStatic =  resp.data;
     // this.rowsTemp = resp.data;
     // console.log( this.rowsClient);
   }).catch(error => {
     console.log(error);
   });
  }




  ole(){
   console.log(this.modelPorpup);
  }

   getCustomersForklift(idCustomer:number) {
   this.forkliftService.getForkliftsCustomer(idCustomer).then(data => {
     const resp: any = data;
     console.log('forklifts');
     console.log(data);
     Swal.close();
     this.rowsClient = resp.data;
     this.rowStatic =  resp.data;
     this.rowsTemp = resp.data;
     console.log( this.rowsClient);
   }).catch(error => {
     console.log(error);
   });
  }


  getBranchOfficeForklift(idBranch:number) {
   this.forkliftService.getForkliftsBranch(idBranch).then(data => {
     const resp: any = data;
     console.log('forklifts branch');
     console.log(data);
    Swal.close();
     this.rowsClient = resp.data;
     this.rowStatic =  resp.data;
     this.rowsTemp = resp.data;
     console.log( this.rowsClient);
   }).catch(error => {
     console.log(error);
   });
  }

  getCustomerOffice() {
   console.log(this.selectedBusinessId);
   this.getCustomersForklift(this.selectedBusinessId);
   this.restService. getCustomerOffice(this.selectedBusinessId).then(data => {
    const resp: any = data;
    console.log('ole ole');
    console.log(resp);
    this.customerOffices = resp.data_branchoffices;
    Swal.close();
  }).catch(error => {
    console.log(error);
  });

 }

 getOfficeForklift() {
  this.getBranchOfficeForklift(this.selectedBranchOfficeId);
 }

 onChangeCreate(check: any) {
  this.change = check;
   console.log(check);
 }


 selectStatus(event:any){
   console.log(this.programate);
   this.programate =  event.target.checked;
   console.log(this.programate);
 }

 onChangeUpdate(check: any) {
   this.switchUpdate = check;
   this.enabledUpdated = check;

   console.log(check);
 }


 getUser() {
   Swal({
     title: 'Obteniendo información ...',
     allowOutsideClick: false
   });
   Swal.showLoading();
   this.userService.getUsers().then(data => {
     const resp: any = data;
     if (resp.error) {
       Swal({
         title:'Error',
         text: 'Ha ocurrido un error',
         type: 'error'
        });
     } else {
       console.log(data);
       Swal.close();
       this.rowsUser = resp.data;
       console.log( this.rowsUser);
   }
   }).catch(error => {
     Swal.close();
     Swal({
       title:'Error',
       text: 'Ha ocurrido un error',
       type: 'error'
      });
     console.log(error);
   });
 }

 onChangeActive(d) {
   let indice;
   if (this.active === false ) {
     this.active = true;
     if (this.inactive === true ) {
       indice = '';
     } else {
       indice = '0';
     }
     this.updateFilterActiveInactive(indice);
   } else {
     this.active = false;
     if (this.inactive === true ) {
       indice = '1';
     } else {
       indice = '';
     }
     this.updateFilterActiveInactive(indice);
   }
 }

 updateEstimate(row:any){
   console.log(row);
   this.router.navigateByUrl('maintenance/settlementCustomerUpdate/'+row.id);
 }

 onChangeInactive(d) {
   let indice;
   if (this.inactive === false ) {
     this.inactive = true;
     if (this.active === true ) {
       indice = '';
     } else {
       indice = '1';
     }
     this.updateFilterActiveInactive(indice);
   } else {
     this.inactive = false;
     if (this.active === true ) {
       indice = '0';
     } else {
       indice = '';
     }
     this.updateFilterActiveInactive(indice);
   }
 }

updateForklift(forklift:any) {
 console.log(forklift);
 this.router.navigateByUrl('maintenance/forkliftUpdate/' + forklift.id);
}

  sendBrand() {
   console.log(localStorage.getItem('token'));
   this.submitted = true;
  if ( !this.myForm.invalid) {
   Swal({
     title: 'Validando información ...',
     allowOutsideClick: false
   });
   Swal.showLoading();

   let statusTemp = 0;
   if (this.enabledUpdated === true) {
     statusTemp = 0;
   } else {
     statusTemp = 1;
   }
   this.restService.createBrand(this.myForm.get('description').value.toUpperCase(), statusTemp).then(data => {
     const resp: any = data;
     console.log(resp);
     if (resp.success === false) {
       Swal({
         title: 'Este equipo ya esta registrado',
         text: 'Este equipo no se puede registrar',
         type: 'error'
        });
     } else {
       this.myForm.get('description').setValue('');
    /*Swal({
     title: 'equipo agregada',
     type: 'success'
    });*/
  //   this.router.navigateByUrl('master/registerBrand');

  document.getElementById( 'createBrandHide').click();
  this.loadingData();
  Swal({
   title: 'equipo agregado',
   type: 'success'
  });
   }
   }).catch(error => {
     console.log(error);
   });
   }
 }

 sendUpdateBrand() {
   console.log(this.myFormUpdate.get('descriptionUpdate'));
   console.log(localStorage.getItem('token'));
   this.submitted = true;
  if ( !this.myFormUpdate.invalid) {
   Swal({
     title: 'Validando información ...',
     allowOutsideClick: false
   });
   Swal.showLoading();

   let statusTemp = 1;
   if (this.enabledUpdated === true) {
     statusTemp = 0;
   } else {
     statusTemp = 1;
   }
   console.log(this.myFormUpdate.get('descriptionUpdate').value.toUpperCase() + ' ' + statusTemp);
   this.restService.updateBrand(Number(this.currentBrand.id), this.myFormUpdate.get('descriptionUpdate').value.toUpperCase(), statusTemp)
   .then(data => {
     const resp: any = data;
     console.log(resp);
     if (resp.success === false) {
       Swal({
         title: 'Esta equipo ya esta actualizado',
         text: 'Esta equipo no se puede actualizar',
         type: 'error'
        });
     } else {
    // this.router.navigateByUrl('master/registerBrand');
    document.getElementById( 'updateBrandHide').click();
    this.loadingData();
    Swal({
     title: 'equipo actualizado',
     type: 'success'
    });
   }
   }).catch(error => {
     console.log(error);
   });
   }
 }

 get checkForm() { return this.myForm.controls; }
 get checkFormUpdate() { return this.myFormUpdate.controls; }



 showForklift(forklift:any){
   console.log(forklift);
   this.router.navigateByUrl('maintenance/forkliftShow/' + forklift.id);
 }

 sendForklift() {
   this.router.navigateByUrl('/maintenance/registerForklift');
 }

 createEstimate(){
   this.router.navigateByUrl('maintenance/settlementCustomer');
 }


 () {
   this.columns.forEach((col: any) => {
     const colWidth = this.columnWidths.find(colWidth => colWidth.column === col.prop);
     if (colWidth) {
       col.width = colWidth.width;
     }
   });
 }

 blockAgents( vadr: any) {
 console.log('----------------');
 console.log(vadr);
 }


 showEstimateLink(row: any){
 console.log('EL NUEVO VALOR') ;
 console.log(row);
 }

 clearFilter(){
   console.log(this.fromDate);
 }


 onDateSelectionFrom(date: any) {

   if(this.untilDate){
   var fromD = new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day); //31 de diciembre de 2015
   var untilD = new Date(this.untilDate.year, this.untilDate.month, this.untilDate.day);

   console.log(this.fromDate.day);
   if(fromD> untilD){
     console.log('es mayor');
     this.untilDate=this.fromDate;
   }
 }
 }


 rejectEstimateFinal(){
   this.settlementeService.updateSettlementStatus(
     this.estimateCurrent.id, 5).then(data => {
     const resp: any = data;
     console.log('envio');
     console.log(resp);
     document.getElementById('hideRejection').click();

     this.getEstimateFiltersInitial();
     Swal({
       title: 'cotización rechazada',
       type: 'success'
      });
   }).catch(error => {
     console.log(error);
     Swal.close();
   });

 }



 onDateSelectionUntil(date: any) {
     var fromD = new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day); //31 de diciembre de 2015
     var untilD = new Date(this.untilDate.year, this.untilDate.month, this.untilDate.day);
     if( untilD< fromD){
       console.log('es mayor');
       this.fromDate=this.untilDate;
     }
 }


 get getEmails(){
   return this.detailform.get('emails') as FormArray;
 }


 get getNames(){
   return this.detailform.get('names') as FormArray;
 }


   addEmail(){
     console.log('este es el valor de email: '+ this.masterEmail);
     if(this.validateEmail(this.masterEmail)){

      let emailFormat:emailFormat  ={
        email: this.masterEmail,
        contact: this.masterName
      }
       this.emailSend=emailFormat ;

       this.emailsSend.push(this.emailSend);

       this.masterEmail='';
       this.masterName='';
     }else{
       Swal({
         text:'Debe ingresar un correo electrónico valido',
         type: 'error'
        });
     }
 }




 validateEmail( email )
 {
     var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
     return regex.test(email) ? true : false;
 }




 storageDetail(formValue:any){
   Swal({
     title: 'Obteniendo información ...',
     allowOutsideClick: false
   });
   Swal.showLoading();
   const emails=formValue.emails;
   const names=formValue.name;
   const subject=formValue.subject;
   const comment=formValue.comment;
   console.log('info');
   console.log(subject);
   console.log(comment);
   console.log("parte");
   console.log(emails[0].email);
   if ((emails[0].email!=null)&&(emails[0].email!="")&&(comment!=null)&&(comment!="")&&(subject!=null)&&(subject!="")) {
     console.log((emails));
   let array=""
   emails.forEach(email => {
     if(email.email!=null){
       array+=email.email+"<br><br>";
     }
   });
   console.log(array);


   let arrayNames=""
   names.forEach(name => {
     if(name.name!=null){
       array+=name.name+"<br><br>";
     }
   });
   console.log('este es el array  de los  names');
   console.log(arrayNames);

  /* this.workservice.storeWorkDetail(this.headerinfo.id,comment,array,subject).then(data=>{
     const resp:any=data;
     console.log(data);
     console.log(resp);
     if (resp.success==1) {
       this.generalAlert('Proceso exitoso','Se ha guardado el detalle correctamente','success');
      //  this.getWorkDetails();

       document.getElementById('storageDetailHide').click();emailDetailHide
     } else {
       this.generalAlert('No se puede guardar','Ha ocurrido un error en la ejecucion','error');
     }

   }).catch(error=>{
     console.log(error);
     this.generalAlert('No se puede guardar','Ha ocurrido un error en la ejecucion','error')
   });*/
   this.resetCreateForm();
   }else{
     this.generalAlert('No se puede guardar','Debe Completar todos los campos obligatorios','error')
   }
 }


 resetCreateForm(){
   this.detailform.reset();
   for (let index = this.indice; index > 0; index--) {
     const control =<FormArray>this.detailform.controls['emails'];
     control.removeAt(index);
     this.indice--;
   }
 }

 deleteEmail(index:number){

    /* const control =<FormArray>this.detailform.controls['emails'];
     control.removeAt(index);
     this.indice--;*/
     this.emailsSend.splice(index);
 }


 generalAlert(title:string,message:string,type:any){
   Swal({
     title:title,
     text: message,
     type: type
    });
 }


   getFilesImage(ind){
   console.log('INGRESO A LAS IMAGENES  KKKK');
   this.estimateService.getEstimateDetailFilesImages(Number(this.estimateId)).then(data => {
     const resp: any = data;
     this.filesEstimateImage=resp.data;
     console.log('esta es la respuesta de la imagen');
     console.log(resp);

     if(resp.success){
     this.filesImage=[];
    // for (let i = 0; i < this.filesEstimateImage.length; i++){
       console.log('ingreso a la conversión');
       console.log(this.filesEstimateImage[0].url);

       this.getBase64ImageFromUrl(this.filesEstimateImage[0].url)
       .then(result =>{
       //  console.log(result);
       //this.download(254);
       console.log(result);

       var ext=(this.filesEstimateImage[0].name).toString().split('.').pop();
       var url =this.filesEstimateImage[0].url;
       console.log('extensiones');
       console.log(ext);
         console.log('ingreso a llenar result');
         let fileImageData:fileImage = {
          content: result,
          ext:ext,
          url:url
         }
         this.fileImage = fileImageData

         // revisar la i
         this.filesImage.push( this.fileImage);


        // if(i== this.filesEstimateImage.length-1){
          console.log('debes pasar por aqui seguridad');

          console.log('este es el indice'+ind);
           if(ind==0){
             console.log('ingreso a la descarga');
             //this.download3(ind);
             this.loadPdfSendEmail(ind);

           }else{
             console.log('ingreso al envio del correo');
             //this.download3(0);
             this.downloadSend(ind); // Este es el problema
           }

           // Descargar PDF 0
           // Cargar PDF a S3 y enviar 1;

        // }
       })
       .catch(err => console.error(err));

    // }


     // images.push();

     }else{
       console.log('esto es muy impotante');
       console.log(ind);
       if(ind==0){
         console.log('ingreso a la descarg6a');
        // this.download3(ind);
        this.loadPdfSendEmail(ind);
       }else{
         console.log('ingreso al envio del corre6o');
             this.downloadSend(ind); //Este es el problema
       }
     }
   }).catch(error => {
     console.log(error);
   });
 }


finalApproval(){

 this.itemsFinalApproval=[];
 for (let i = 0; i < this.itemsPart.length; i++){
   console.log('lo encontre'+i);
   if(this.itemsPart[i].active){
     this.itemsFinalApproval.push(this.itemsPart[i]);
   }
 }
 for (let i = 0; i < this.itemsWorkforce.length; i++){
   console.log('lo encontre'+i);
   if(this.itemsWorkforce[i].active){
     this.itemsFinalApproval.push(this.itemsWorkforce[i]);
   }
 }

 let valuesApproval='';

 for (let i = 0; i < this.itemsFinalApproval.length; i++){
   valuesApproval=valuesApproval+ this.itemsFinalApproval[i].id+'@'+this.itemsFinalApproval[i].quantity+'@';
 }

 console.log('items aprobados de cotizacion '+ this.estimateCurrent);
 console.log(this.itemsFinalApproval);
 console.log(valuesApproval);

 if(valuesApproval != ''){
 Swal({
   title: 'Validando información ...',
   allowOutsideClick: false
 });
 Swal.showLoading();

 this.estimateService.approveEstimateDetails(valuesApproval
   ).then(data => {
   const resp: any = data;
   console.log('envio autorización');
   console.log(resp);

   //---------------------------
   this.estimateService.updateEstimateStatus(
     this.estimateCurrent.id, 2).then(data => {
     const resp: any = data;
     console.log('envio');
     console.log(resp);
     document.getElementById('hideCheckItem').click();

     this.getEstimateFiltersInitial();
     Swal({
       title: 'cotización aprobada',
       type: 'success'
      });
   }).catch(error => {
     console.log(error);
     Swal.close();
   });
   // ----------------------------

 }).catch(error => {
   console.log(error);
   Swal.close();
 });

}else{
    Swal({
       title: 'Se presentó un problema',
       text: 'Favor selecionar al menos una opcion.',
       type: 'error',
     });
   }

}

finalFormatPrice(value: number){
  this.num = value; //.toString().replace('.','').replace(',','.');
  console.log('num') //.toString().replace('.','').replace(',','.');
  console.log(this.num) //.toString().replace('.','').replace(',','.');
  this.num +='';
  var splitStr = this.num.split('.');
  var splitLeft = splitStr[0];
  var splitRight = splitStr.length > 1 ? ',' + splitStr[1] : '';
  var regx = /(\d+)(\d{3})/;
  while (regx.test(splitLeft)) {
  splitLeft = splitLeft.replace(regx, '$1' + '.' + '$2');
  console.log(splitLeft);
  }
  console.log('Importante oleole');
  console.log(splitLeft +splitRight);
  let price=splitLeft +splitRight;
  return price;
  }


rejectQuote(){

}

 /*

 Comparar fechas https://desarrolloweb.com/articulos/comparar-fechas-javascript.html*/
}
