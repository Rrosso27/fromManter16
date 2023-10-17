import { Component, ViewChild, ElementRef, OnInit, Inject, Input, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RestService } from '../../master-services/Rest/rest.service';
import { FilexcelService } from '../../master-services/FileExcel/filexcel.service';
import { WorkService } from '../../master-services/Work/work.service';
import { UploadService } from '../../master-services/services/upload.service';
import { EstimateService } from '../../master-services/estimate/estimate.service';
import { SettlementService } from '../../master-services/settlement/settlement.service';
import { ReportsService } from '../../master-services/reports/reports.service';
import { ForkliftService } from '../../master-services/Forklift/forklift.service';
import { UUID } from 'angular2-uuid';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbCalendar, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import TrmApi from 'trm-api';


const trmapi = new TrmApi();
const I18N_VALUES = {
  'fr': {
    weekdays: ['Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb', 'Dom'],
    months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Agos', 'Sep', 'Oct', 'Nov', 'Dic'],
  }
  // other languages you would support
};

interface jsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}

interface itemEstimateInterface {// item para mostrar selccionados
  estimate_consecutive?: string;
  item?: Array<itemEstimateDetailInterface>;
}

interface itemEstimateDetailInterface {// item para mostrar selccionados
  id?: number;
  code?: string;
  description?: string;
  quantity?: number;
  subtotal?: string;
  active?: boolean;
}

interface itemTypeMaintenance{
  id?:number;
  value?:string;
  isSelected?:boolean
}

interface itemDataMaintenance{
  id?:number;
  type?:string;
  full_name?: string
  description?:string;
  consecutive?:string;
  active?:boolean
  workforce?:boolean
  part?:boolean
}

interface itemForkliftTextInterface {// item para mostrar selccionados
  id?: number;
  full_name?: string;
}

interface FileSettlementInterface {
  id?: number;
  url?: string;
  content?: string;
  type?: number;
  file?:any;
}


interface EmailSettlementInterface {
  id?: number;
  contact?: string;
  email?: string;
}

@Injectable()
export class I18n {
  language = 'fr';
}

@Component({
  selector: 'app-master-update-settlement-customer',
  templateUrl: './master-update-settlement-customer.component.html',
  styleUrls: ['./master-update-settlement-customer.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: MasterUpdateSettlementCustomerComponent}]
})



export class MasterUpdateSettlementCustomerComponent extends NgbDatepickerI18n  {

    data: any = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000
    },{
    eid: 'e102',
    ename: 'ram',
    esal: 2000
    },{
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
    }];

  name = 'Angular 5';

   images = [{
    name: "Image 1", url:"https://4.bp.blogspot.com/-OuIrYzKE1lM/WJ1nqskJ5pI/AAAAAAAAOww/v9JfD7Hb_Fwe_K1svBN7gz2A_BUKxbqGwCLcB/s400/mindblowing-awasome-wallpapers-imgs.jpg"
  },
  {
    name:"Image 2",
    url:"https://akm-img-a-in.tosshub.com/indiatoday/559_102017023826.jpg?TZlWXro5W8Rj4VbO.MpENgo1F2MX93j"
  }]


    items = {
      "Name" : "XYZ",
      "Age" : "22",
      "Gender" : "Male"

    };

  itemsEstimate: Array <itemEstimateInterface> = [];
  itemEstimate:itemEstimateInterface;
  itemsDetailEstimate: Array<itemEstimateDetailInterface> = [];
  itemDetailEstimate: itemEstimateDetailInterface;

  itemMaintenance: itemTypeMaintenance;
  itemsMaintenance: Array<itemTypeMaintenance> = [];
  dataMaintenance: itemDataMaintenance;
  dataMaintenances: Array<itemDataMaintenance> = [];


  itemsEstimateForklift: Array <itemEstimateInterface> = [];
  itemEstimateForklift:itemEstimateInterface;
  itemsDetailEstimateForklift: Array<itemEstimateDetailInterface> = [];
  itemDetailEstimateForklift: itemEstimateDetailInterface;


  itemsCopyClient: Array <itemEstimateInterface> = [];
  itemCopyClient:itemEstimateInterface;
  itemsDetailCopyClient: Array<itemEstimateDetailInterface> = [];
  itemDetailCopyClient: itemEstimateDetailInterface;


  itemForklift: itemForkliftTextInterface;


  fileSettlement: FileSettlementInterface;
  filesSettlement: Array<itemEstimateDetailInterface> = [];

  detailCodes: any;
  selectedItemsDetail=[];
  selectedItemsDetailCustomer=[];
  selectedItemsDetailForklift=[];
  subcentersCost:any;
  code:any;
  fullCode: any=null;
  fullCodeUpdate: any=null;
  fullCodeCustomer: any=null;
  fullCodeCustomerUpdate: any=null;
  fullCodeWorkforce: any=null;
  fullCodeWorkforceUpdate: any=null;
  fullCodeCustomerWorkforce: any=null;
  branchOffices:any;
  rowsItemsEmails:any;

  myForm: FormGroup;
  myFormUpdate: FormGroup;
  submitted = false;
  submittedUpdate = false;
  rowsItems: any;
  rowsItemsWorkforce: any;
  rowsItemsparts: any;
  rowsItemscustomer:any;
  rowsTemp: any;
  rowStatic: any;
  rows: any;
  a: any = 5;
  kilo: any;
  elementDelete: any;
  freightGeneral;
  contFiles=0;
  numberPage=1;
  limitPage;

  numberPageMaintenance=1;
  limitPageMaintenance;


  numberPageForklift=1;
  limitPageForklift;

  switchCreate = true;
  switchUpdate = true;

  indicatorFullCodeCreatePart=0;
  indicatorFullCodeCreatePartUpdate=0;

  indicatorFullCodeCreateWorkforce=0;
  indicatorFullCodeCreateWorkforceUpdate=0;

  indicatorFullCodeCreateCustomer=0;
  indicatorFullCodeCreateCustomerUpdate=0;

  finalWeightUpdate=0;

  scheduleSettlementCustomer: any;
  change = true;
  active = false;
  inactive = false;
  enabledUpdated = false;
  selectedDepartmentId = 0;
  selectedCityId = 0;

  filterIndicatorText = false;
  filterIndicatorCheck = false;

  rowsTempCheck: any;
  rowsTempText: any;

  currentCountry: any;
  selectedEstimateCountryId :any=0;
  estimateCountries: any;
  consecutive:any;


  currentCountryText:any;
  s3info:any;
  fileTest:any;



  forkliftText: any;

  quantity = 1;
  unitCost  = 0;
  weight  = 0;
  weightTypeList  = 0;
  priceList  = 0;
  suggestedPrice :any = 0;
  price :any = 0;
  subtotal: any = 0;
  description='';
  delivery:any;
  totalPrice:any=0;
  totalPriceUpdate:any=0;
  discountPart:any=0;
  discountPartUpdate:any=0;
  discountWorkforce:any=0;
  discountWorkforceUpdate:any=0;
  discountCustomer:any=0;
  discountCustomerUpdate:any=0;

  deliveryPart:any = 0;
  deliveryPartUpdate:any = 0;
  deliveryWorkForce:any = 0;
  deliveryWorkForceUpdate:any = 0;

  quantityUpdate = 1;
  unitCostUpdate  = 0;
  weightUpdate  :any =0;
  weightTypeListUpdate  = 0;
  priceListUpdate  = 0;
  suggestedPriceUpdate :any = 0;
  priceUpdate :any = 0;
  subtotalUpdate: any = 0;
  codeUpdate='';
  descriptionUpdate='';
  deliveryUpdate:any;

  totalPriceWorkforce;
  totalPriceWorkforceUpdate;
  totalPriceCustomer:any;

  totalPriceCustomerUpdate:any;

  now:any;
  user:any;
  customers:any;
  forklifts:any;
  forkliftsDetails:any;

  // variables settlement
  regionals: any;
  costCenters: any;
  warehouses: any;

  estimateDetailId: any;

  selectedMaintenanceId = '';
  selectedForkliftId:any=0;
  selectedRegionalId:any=0;
  selectedCostCenterId:any=0;
  selectedSubcostCenterId:any=0;
  selectedSubcostCenterUpdateId:any=0;
  selectedSubcostCenterWorkforceUpdateId:any=0;
  selectedSubcostCenterWorkforceId:any=0;
  selectedSubcostCenterCustomerId:any=0;
  selectedSubcostCenterCustomerUpdateId:any=0;

  selectedScheduleOptionOne:any=0;
  switchScheduleOptionOne:any= false;
  selectedScheduleOptionSecond:any=0;
  switchScheduleOptionSecond:any= false;

  selectedWarehouseId:any=0;
  managementVariables=0;
  managmentTariff=0;
  finalWeight=0;
  showShippingCountriesDhlFilter: any;
  configDetailEstimates: any; // configuración de detalles
  configTrm: any;
  operationItemResult=0;
  conditionValidation=0;
  salePrice=0;
  salePriceUpdate=0;
  costTotalGlobal=0;
  costPesosGlobal=0;

  fileWidth:any;

  costTotalGlobalUpdate=0;
  costPesosGlobalUpdate=0;

  documentCustomer:any;
  nameCustomer:any;
  cellphone:any;
  contact:any='';
  email:any;
  days:any=0;
  numberEstimate: any='';
  trmGeneralUsa:any;
  trmGeneralEsp:any;
  guaranty:any=0;
  validity:any=0;
  departments: any;
  cities: any;
  observation:any;
  selectedBusinessId:any=0;
  selectedBranchOfficeId: any=0;

  settlementEstimatesCustomer:any;
  settlementEstimatesForklift:any;
  settlementEstimatesCopyClient:any;

  settlementId=null;
  currentSettlement:any;

  fileEstimateTemp: any;

  showSettlementId=true;
  showCreateItem=false;
  showSaveFile=false;
  lowPrice : any;
  higherPrice : any;

  lowPriceUpdate : any;
  higherPriceUpdate : any;

  daysUpdate:any;

  emails;
  emailBody;
  emailSubject;

  //Varaibles de configuración validación
  suggestedMaximum:any;
  newCustomerMargin:any;
  thirdService:any;
  nationalService:any;

  conditionTrmUsa:any;
  conditionTrmEsp:any;

  blobGlobal:any;

  customerCode: any;
  customerDescription: any;
  customerquantity: any;
  customerSubtotal: any;
  customerDelivery: any;
  customerPrice:any;


  workforceCode: any;
  workforceService: any;
  workforcequantity: any;
  workforceHourValue: any;
  workforceSubtotal: any;
  workforceDelivery: any;

  workforceCodeUpdate: any;
  workforceServiceUpdate: any;
  workforcequantityUpdate: any;
  workforceHourValueUpdate: any;
  workforceSubtotalUpdate: any;
  workforceDeliveryUpdate: any;
  workforceDetailIdUpdate: any;

  customerCodeUpdate: any;
  customerServiceUpdate: any;
  customerquantityUpdate: any;
  customerPriceUpdate: any;
  customerSubtotalUpdate: any;
  customerDeliveryUpdate: any;
  customerDetailIdUpdate: any;

  idCustomerCreated:any;
  itemEnd = [];

  observationUpdate:any;
  validityUpdate:any;

  idDetail:any;

  selectedFilesImages: Array<File> = [];
  selectedFiles: Array<File> = [];
  urlsImages = [];
  urlsFiles = [];

  settlementSubject:any='';
  settlementComment:any='';
  settlementCheckHideCode:any=false;
  rowsItemsEmailsSettlement:any;
  separador: "." ;// separador para los miles
  sepDecimal: ',';


  emailCurrentSettlement:EmailSettlementInterface;
  emailsCurrentSettlement:Array<EmailSettlementInterface>=[];

  contEmailsCurrent=0;
  hideFileds=0;


  masterEmail='';
  masterName='';

  fromDateCustomer: NgbDateStruct;
  untilDateCustomer: NgbDateStruct;
  fromDateForklift: NgbDateStruct;
  untilDateForklift: NgbDateStruct;
  today = this.calendar.getToday();

  totalParts: any = 0;
  totalWorkforce: any = 0;
  totalSettlement: any = 0;
  totalCustom: any = 0;
  selectedBranchOfficeMaintenanceId = 0;
  typeMaintenance: any;
  listMaintenance: any;
  checkAll: boolean = false;
  checkAllPart: boolean = false;
  checkAllWorkforce: boolean = false;
  countPartMaintenance: number = 0;
  countWorkforceMaintenance: number = 0;

  selectedBranchPart = 0;
  selectedBranchWorkforce = 0;
  selectedBranchCustomer = 0;
  selectedForkliftPart = 0;
  selectedForkliftWorkforce = 0;
  selectedForkliftCustomer = 0;

  imageps = "data:image/jpeg;base64,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"


  @ViewChild('content') content: ElementRef;

  constructor(private restService: RestService, private router: Router, private estimateService: EstimateService, private excelService:FilexcelService,  private workService:WorkService,  private uploadService: UploadService, private forkliftService: ForkliftService, private settlementService: SettlementService, private rutaActiva: ActivatedRoute, private calendar: NgbCalendar, private _i18n: I18n, private reportService: ReportsService) {
    super();
    const trmapi = new TrmApi('I9pLc8IBKHjjMPFEr7Z3qkZFX');


  trmapi
  .latest()
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

  console.log('------------------');
  this.settlementId = this.rutaActiva.snapshot.params.id;
  this.showCreateItem = true;


    this.showShippingCountriesDhlInitial();

    this.getRegionalsMaster();
    this.getDepartments();

    this.getSettlementSpecific(this.settlementId);

    this.getSettlementParts();
    this.getSettlementWorkforce();
    this.getSettlementCustomer();
    this.getSettlementCodes();

    // this.showCountryWeight();
    console.log('importante info');


    this.loadingData();

    // this.getSettlementParts();
    // this.getSettlementWorkforce();
    // this.getFilesEstimate();

    var date = new Date();
    // poner los 0
    var day = (date.getDate() < 10 ? '0' : '') + date.getDate();
    // 01, 02, 03, ... 10, 11, 12
    let month = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    // 1970, 1971, ... 2015, 2016, ...
    var year = date.getFullYear();

    this.now = year +'-'+ month+'-'+ day;
    this.user = localStorage.getItem('username');


    var ngbDateStruct = { day: date.getDate(), month: date.getMonth()+1, year: date.getFullYear()};

    this.fromDateCustomer=ngbDateStruct;
    this.untilDateCustomer=ngbDateStruct;

    this.fromDateForklift=ngbDateStruct;
    this.untilDateForklift=ngbDateStruct;

    console.log(   this.fromDateCustomer);
    console.log(   this.untilDateCustomer);
    console.log(   this.fromDateForklift);
    console.log(   this.untilDateForklift);


    const weight = new FormControl('', Validators.required);
    const price = new FormControl('', Validators.required);


    const weightUpdate = new FormControl('', Validators.required);
    const priceUpdate = new FormControl('', Validators.required);


    this.myForm = new FormGroup({
      weight: weight,
      price:price
    });

    this.myFormUpdate = new FormGroup({
      weightUpdate: weightUpdate,
      priceUpdate:priceUpdate
    });
   }

   onDateSelectionUntil(date: any) {
    var fromD = new Date(this.fromDateCustomer.year, this.fromDateCustomer.month, this.fromDateCustomer.day); //31 de diciembre de 2015
    var untilD = new Date(this.untilDateCustomer.year, this.untilDateCustomer.month, this.untilDateCustomer.day);
    if( untilD< fromD){
      console.log('es mayor');
      this.fromDateCustomer=this.untilDateCustomer;
    }
  }

onDateSelectionFrom(date: any) {

  if(this.untilDateCustomer){
  var fromD = new Date(this.fromDateCustomer.year, this.fromDateCustomer.month, this.fromDateCustomer.day); //31 de diciembre de 2015
  var untilD = new Date(this.untilDateCustomer.year, this.untilDateCustomer.month, this.untilDateCustomer.day);

  console.log(this.fromDateCustomer.day);
    if(fromD> untilD){
      console.log('es mayor');
      this.untilDateCustomer=this.fromDateCustomer;
    }
  }
}
onDateSelectionUntilForklift(date: any) {
    var fromD = new Date(this.fromDateForklift.year, this.fromDateForklift.month, this.fromDateForklift.day); //31 de diciembre de 2015
    var untilD = new Date(this.untilDateForklift.year, this.untilDateForklift.month, this.untilDateForklift.day);
    if( untilD< fromD){
      console.log('es mayor');
      this.fromDateForklift=this.untilDateForklift;
    }
}

onDateSelectionFromForklift(date: any) {

  if(this.untilDateForklift){
  var fromD = new Date(this.fromDateForklift.year, this.fromDateForklift.month, this.fromDateForklift.day); //31 de diciembre de 2015
  var untilD = new Date(this.untilDateForklift.year, this.untilDateForklift.month, this.untilDateForklift.day);

  console.log(this.fromDateForklift.day);
    if(fromD> untilD){
      console.log('es mayor');
      this.untilDateForklift=this.fromDateForklift;
    }
  }
}

   removeAccents (str){
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }



  getRegionalsMaster(){
    this.restService.getRegionalAll().then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      this.regionals  = resp.data;
    }).catch(error => {
      console.log(error);
    });
  }

  hideFiled(regional: any){
    console.log(regional);
    this.selectedCostCenterId = 0;
    this.selectedWarehouseId = 0;
    for (let reg of  regional) {
      console.log('entro for');
      if(reg.id == this.selectedRegionalId){
        console.log('entro if');
        if(reg.hide_fileds == 1){
          this.hideFileds = 1;
        }else{
          this.hideFileds = 0;
        }
      }
    }
  }


   getConsecutive() {

    this.settlementService.showSettlementConsecutive().then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      this.consecutive  = resp.data;
      var date = new Date();

      let now = date.getFullYear();


      // 01, 02, 03, ... 10, 11, 12
      let month = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);


      let yearCosecutive=date.getFullYear().toString().substring(2,4);
      this.consecutive= Number(this.consecutive.consecutive)+1;
      this.consecutive = Number(yearCosecutive.toString()+month.toString()+this.consecutive.toString());



      // this.rowsClient = resp.data;
      // this.rowStatic =  resp.data;
      // this.rowsTemp = resp.data;
      // console.log( this.rowsClient);
    }).catch(error => {
      console.log(error);
    });
   }




   getEstimateDetails() {

    if(this.settlementId){
      this.estimateService.getEstimateDetails(this.settlementId).then(data => {
        const resp: any = data;
        this.rowsItems=resp.data;

        for (let i = 0; i < this.rowsItems.length; i++) {
          this.itemEnd.push(+i+1+','+ this.rowsItems[i].code+','+this.rowsItems[i].description+','+this.rowsItems[i].quantity+','+this.rowsItems[i].unit_cost+','+this.rowsItems[i].price+','+this.rowsItems[i].delivery);
        }



        console.log('INFO PARA VER ITEMS PARA EL PDF');
        console.log('Importante');
        console.log(this.itemEnd.toString());
        console.log('------------'+ this.itemEnd[0]);

        console.log(data);
      }).catch(error => {
        console.log(error);
      });

    }

   }




   getSettlementWorkforce() {

    if(this.settlementId){
      swal({
        title: 'Validando información ...',
        allowOutsideClick: false
      });
      swal.showLoading();
      this.settlementService.getSettlementDetailsWorkforce(this.settlementId).then(data => {
        const resp: any = data;
        this.rowsItemsWorkforce=resp.data;

        /*for (let i = 0; i < this.rowsItems.length; i++) {
          this.itemEnd.push(+i+1+','+ this.rowsItems[i].code+','+this.rowsItems[i].description+','+this.rowsItems[i].quantity+','+this.rowsItems[i].unit_cost+','+this.rowsItems[i].price+','+this.rowsItems[i].delivery);
        }*/

        console.log('INFO PARA VER ITEMS PARA EL PDF');
        console.log('Importante');
        console.log(this.itemEnd.toString());
        console.log('------------'+ this.itemEnd[0]);
        swal.close();
        console.log(data);
      }).catch(error => {
        swal.close();
        console.log(error);
      });

    }

   }


   getSettlementParts() {

    if(this.settlementId){
          swal({
            title: 'Validando información ...',
            allowOutsideClick: false
          });
          swal.showLoading();
      this.settlementService.getSettlementDetailsParts(this.settlementId).then(data => {
        const resp: any = data;
        console.log('Partes '+JSON.stringify(data));

        this.rowsItemsparts=resp.data;

     /*   for (let i = 0; i < this.rowsItems.length; i++) {
          this.itemEnd.push(+i+1+','+ this.rowsItems[i].code+','+this.rowsItems[i].description+','+this.rowsItems[i].quantity+','+this.rowsItems[i].unit_cost+','+this.rowsItems[i].price+','+this.rowsItems[i].delivery);
        }*/
        console.log('INFO PARA VER ITEMS PARA EL PDF');
        console.log('Importante');
        console.log(this.itemEnd.toString());
        console.log('------------'+ this.itemEnd[0]);

        console.log(data);
        swal.close();
        // this.assingTotal();
      }).catch(error => {
        swal.close()
        console.log(error);
      });
    }
   }

   assingTotal(){
     console.log('asignacion de totales');

      for (let item of this.rowsItemsWorkforce){
      this.totalWorkforce =Number(Number(this.totalWorkforce) + Number(item.total));
      }
      console.log(this.totalWorkforce);

      console.log(this.totalParts);
      for (let item of this.rowsItemsparts){
        console.log(item);
        this.totalParts = Number(Number(this.totalParts) + Number(item.total));
      }
      console.log(this.totalParts);

      this.totalSettlement = Number(Number(this.totalWorkforce) + Number(this.totalParts));
      console.log(this.totalSettlement);

      this.totalWorkforce = this.finalFormatStandard((this.totalWorkforce).toFixed(0));
      this.totalParts = this.finalFormatStandard((this.totalParts).toFixed(0));
      this.totalSettlement = this.finalFormatStandard((this.totalSettlement).toFixed(0));

   }

   getSettlementCustomer() {

    if(this.settlementId){
      this.settlementService.getSettlementDetailsCustomer(this.settlementId).then(data => {
        const resp: any = data;
        console.log('CUSTOMER '+JSON.stringify(data));

      this.rowsItemscustomer=resp.data;
      console.log(this.rowsItemscustomer);
     /*   for (let i = 0; i < this.rowsItems.length; i++) {
          this.itemEnd.push(+i+1+','+ this.rowsItems[i].code+','+this.rowsItems[i].description+','+this.rowsItems[i].quantity+','+this.rowsItems[i].unit_cost+','+this.rowsItems[i].price+','+this.rowsItems[i].delivery);
        }*/
        let total = 0;
        for(let value of this.rowsItemscustomer){
          console.log(value);
          console.log(this.totalCustom);
          total = Number(Number(total)+ Number(value.subtotal));

        }

        console.log('total factura cliente');
        console.log(total);
        this.totalCustom = this.finalFormatStandard(total);
        console.log(this.totalCustom);
        console.log('INFO PARA VER ITEMS PARA EL PDF');
        console.log('Importante');
        console.log(this.itemEnd.toString());
        console.log('------------'+ this.itemEnd[0]);

        console.log(data);
      }).catch(error => {
        console.log(error);
      });
    }
   }

   finalFormaHourValueUpdate(){

   }

   getCustomers() {

    // Cambiar para que quede como la creación
    this.restService.getCustomer().then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      this.customers  = resp.data;

      //asignar valores customer;



      // this.rowsClient = resp.data;
      // this.rowStatic =  resp.data;
      // this.rowsTemp = resp.data;
      // console.log( this.rowsClient);
    }).catch(error => {
      console.log(error);
    });
   }

   getCustomerRegionals() {
    this.restService.getRegionalCustomers(this.selectedRegionalId).then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      this.customers  = resp.data;

      //asignar valores customer;



      // this.rowsClient = resp.data;
      // this.rowStatic =  resp.data;
      // this.rowsTemp = resp.data;
      // console.log( this.rowsClient);
    }).catch(error => {
      console.log(error);
    });
   }


   getBranchOffices() {
    if(this.selectedBusinessId!=0){

    // Llenar información de cliente
    //this.documentCustomer = this.selectedBusinessId.document_id;
    //this.nameCustomer = this.selectedBusinessId.business_name;
    //this.cellphone = this.selectedBusinessId.telephone;
    //this.contact =  '';
    // this.days = this.selectedBusinessId.day;
    //this.selectedDepartmentId = this.selectedBusinessId.department_id;
    // Se cargan las las ciudades y la ciudad del cliente
   // this.getCities();

    this.restService.getOffice(this.selectedBusinessId).then(data => {
      const resp: any = data;
      console.log('oficinas: ');
      console.log(data);
      swal.close();
      this.branchOffices  = resp.data;
    }).catch(error => {
      console.log(error);
    });

    /*this.restService.getRegionalCustomer(this.selectedBusinessId.id).then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
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
    this.selectedCityId=0;
    this.forkliftText='';
  }
}

   getSettlementCodes() {
    if(this.settlementId){
      this.settlementService.getSettlementCodes().then(data => {
        const resp: any = data;
        if(resp.success){
          this.detailCodes =resp.data;
        }

        console.log(data);
      }).catch(error => {
        console.log(error);
      });
    }
   }

   getSettlementSubCenterCost() {
    if(this.settlementId){
     // this.settlementService.getRegionalSubCenterCost(this.selectedRegionalId).then(data => {
      this.settlementService.getSubCostCenter(this.selectedRegionalId).then(data => {
        const resp: any = data;
        if(resp.success){
          this.subcentersCost =resp.data_subcostcenters;
        }
        console.log('codigos de parte '+JSON.stringify(data));
        console.log(data);
      }).catch(error => {
        console.log(error);
      });
    }
   }



   getTrmCurrent() {
    console.log('oleole');
    let trm;
    trmapi.latest().then((data) =>{
      console.log(data);
      trm = data.valor;
      this.trmGeneralUsa = trm;
    })
    .catch((error) => {
      console.log(error);
      this.estimateService.showTrmCurrent().then(data => {
        const resp: any = data;

        try{
          trm =resp.data.value
        }catch(error){
          trm =resp.result.value
        }

        console.log('---trm----');
        console.log(data);
      // let trm = resp.data.value;
        console.log(trm);



        trm = trm.toString().replace('.',',');
        let trmSecondPart =trm.substring(1);
        let trmFirtsPart = trm.substring(0, 1);
        this.trmGeneralUsa= trmFirtsPart+'.'+trmSecondPart;
        swal.close();

        console.log( this.cities);
      }).catch(error => {
        console.log(error);
      });
    });
  }

 format(inputTrm)
{
  console.log(inputTrm);
  var num = inputTrm.replace(/\./g,'');
  if(!isNaN(num)){
  console.log('Ingreso ps');
  num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
  num = num.split('').reverse().join('').replace(/^[\.]/,'');
  this.trmGeneralUsa= num;
}else{
alert('Solo se permiten numeros');
this.trmGeneralUsa= inputTrm.value.replace(/[^\d\.]*/g,'');
}
}


   getCities() {
      console.log('oleole');
      console.log(this.selectedDepartmentId);
      this.restService.getCities(this.selectedDepartmentId).then(data => {
        const resp: any = data;
        console.log(data);
        swal.close();
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

    getFilesSettlement(){
      console.log('ingreso que paso ps');
      console.log('este es el id '+this.settlementId);
       this.settlementService.getSettlementDetailFiles(Number(this.settlementId)).then(data => {
         const resp: any = data;
       if(resp.data){
         console.log('------------dddd-----------');
         console.log(data);
         console.log('-----------------------');

         let i = 0;
         for (let estimateFile of  resp.data) {
           //console.log(estimateFile.name);
           console.log('Jajajajaja');

           this.fileSettlement={
             id: estimateFile.id,
             url: estimateFile.name,
             content: '',
             type: estimateFile.type
           };
           i= i + 1;
           this.urlsFiles.push(this.fileSettlement);
           //this.fileEstimateTemp.push(this.fileEstimate);
          //  this.urlsImages.push(estimateFile.url);
          // this.urls.push(EstimateImage.url);
           // this.urlsInitial.push(EstimateImage.name);
           // this.guideImagesInitial.push(i);// guia para saber que imagenes estan en amazon
           //i=i+1;
          }
          this.contFiles = i;

        // this.urls
         console.log('vihdsik--' + this.contFiles);
         console.log('Estos son los archivos: '+data);
        }else{
          this.fileEstimateTemp=[];
        }
       }).catch(error => {
         console.log(error);
       });
     }

   getDepartments() {
    this.restService.getDepartments().then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      this.departments  = resp.data;
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

    //this.documentCustomer = this.selectedBusinessId.document_id;
    //this.nameCustomer = this.selectedBusinessId.business_name;
    //this.cellphone = this.selectedBusinessId.telephone;
    //this.contact =  '';
   //  this.email =  this.selectedBusinessId.email;
    //this.days = this.selectedBusinessId.day;
     //this.selectedDepartmentId = this.selectedBusinessId.department_id;

    //this.getCities();
 // if(this.selectedBusinessId.id!=0){

 //   if(this.selectedBusinessId!=0){
    console.log('this.selectedBusinessId.id');
    console.log(this.selectedBusinessId.id);

    this.forkliftService.getForkliftBranchOfficesFull(this.selectedBranchOfficeId).then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      this.forklifts  = resp.data;



        // business_name,  last_name,name, email cellphone
      // this.rowsClient = resp.data;
      // this.rowStatic =  resp.data;
      // this.rowsTemp = resp.data;
      // console.log( this.rowsClient);
    }).catch(error => {
      console.log(error);
    });
  }/*else{
    this.selectedDepartmentId=0;
    this.selectedCityId=0;
    this.documentCustomer = '';
    this.nameCustomer ='';
    this.cellphone = '';
    this.contact =  '';
   //  this.email =  this.selectedBusinessId.email;
    this.days =0;
  }*/



}

getForklifsDetails(selectedBranchPart) {
      console.log('selectedBranchPart');
      console.log(selectedBranchPart);
      this.selectedForkliftPart = 0;

      this.forkliftService.getForkliftBranchOfficesFull(selectedBranchPart).then(data => {
        const resp: any = data;
        console.log(data);
        swal.close();
        this.forkliftsDetails  = resp.data;
        // if(value != null){
        //   this.selectedForkliftPart = value;
        // }


      }).catch(error => {
        console.log(error);
      });
}


   getRegionals() {
    if(this.selectedBusinessId!=0){

    // Llenar información de cliente
    this.documentCustomer = this.selectedBusinessId.document_id;
    this.nameCustomer = this.selectedBusinessId.business_name;
    this.cellphone = this.selectedBusinessId.telephone;
    this.contact =  '';
    this.days = this.selectedBusinessId.day;
    this.selectedDepartmentId = this.selectedBusinessId.department_id;
    // Se cargan las las ciudades y la ciudad del cliente
    // this.getCities();

    this.restService.getRegionalCustomer(this.selectedBusinessId.id).then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      this.regionals  = resp.data_customerRegionals;
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
    this.days =0;
  }
}

getCenterCost() {
  this.getCustomerRegionals();

  //selectedCostCenterId
  this.restService.getCostCenterSettlement(this.selectedRegionalId).then(data => {
    const resp: any = data;
    console.log('centro de costo');
    console.log(data);
    swal.close();

    this.costCenters  = resp.data_costcenters;
  }).catch(error => {
    console.log(error);
  });
}

getWarehouses() {
  //selectedCostCenterId
  this.restService.getWarehousesSettlement(this.selectedRegionalId).then(data => {
    const resp: any = data;
    console.log(data);
    swal.close();
    this.warehouses  = resp.data_warehouses;
  }).catch(error => {
    console.log(error);
  });
}

loadingData() {
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    this.estimateService.getEstimateCountries().then(data => {
      const resp: any = data;
      this.estimateCountries = resp.data;
      swal.close();
    }).catch(error => {
      console.log(error);
    });
}

   validationFullCodeCreatePart(){
   if(this.fullCode){
   // this.indicatorFullCodeCreatePart
    if(this.fullCode.required_subcenter==1){ // Si es true se debe validar subcenter obligatorio
      if(this.selectedSubcostCenterId!=0){
        return this.indicatorFullCodeCreatePart=1; //asignamos 1 si esta el subcentro
      }else{
        return this.indicatorFullCodeCreatePart=2; //asignamos 2 si no hay subcento
      }
    }else{
      return this.indicatorFullCodeCreatePart=3; // no require subcenter
     }
   }else{
    return this.indicatorFullCodeCreatePart=4; // no hay code
   }
// es validar el 2 si devuelve 2 se pide subcenter
   }

   createSettlementDetail(){
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    console.log('code '+this.code);
     let priceTemp=  this.changeFormatDecimal( this.price);//

     if(this.description!==''){
     if(this.code!==''){
     let indSubcenter= this.validationFullCodeCreatePart();
       if(indSubcenter!=2){

     if(Number(priceTemp) >= Number(this.lowPrice) && Number(priceTemp) <= Number(this.higherPrice)){

     let settlementIdDetailTemp= this.settlementId;

     let codeTemp;
     if(this.fullCode){
      codeTemp=this.fullCode.code;
     }else{
      codeTemp= this.code;
     }

     let fullCodeTemp = this.code;
     let descriptionTemp= this.description;
     let quantityTemp = this.quantity;
     let unitCostTemp = this.unitCost;
     let priceListTemp = this.priceList;
     let priceSuggestTemp = this.changeFormatDecimal(this.suggestedPrice);// this.suggestedPrice;
     let discount = this.discountPart;
    // let daysTemp = this.days;
     // priceTemp ya se asigno
    // let priceTemp = this.price;
     let deliveryPartTemp = this.deliveryPart;
     let weightTemp = this.weight;
     let totalTemp =  this.changeFormatDecimal(this.totalPrice)//this.subtotal.toString().replace('.','').replace(',','.');
     let observationTemp = this.observation;
     let statusTemp = 0;
     console.log('Antes de guardar');
     console.log(this.totalPrice);
     let subtotalTemp =  this.changeFormatDecimal(this.totalPrice)
     let typeServiceTemp = 0;
     let weightTypeList = this.weightTypeList;
     let branchOfficePart = this.selectedBranchPart;
     let forkliftPart = this.selectedForkliftPart;
     let subcenterId= this.selectedSubcostCenterId;
     console.log('estos son los puntos');

     this.settlementService.createSettlementDetails(settlementIdDetailTemp,codeTemp,descriptionTemp,
      quantityTemp, unitCostTemp, priceListTemp, priceSuggestTemp, weightTemp,
      priceTemp, subtotalTemp, deliveryPartTemp, totalTemp,statusTemp, typeServiceTemp, weightTypeList,subcenterId,discount,fullCodeTemp,branchOfficePart, forkliftPart).then(data => {
       const resp: any = data;
       swal({
        title: 'Item creado',
        type: 'success'
       });
       document.getElementById( 'createItemHide').click();
       this.clearFormDetail();
      // this.getEstimateDetails();
      this.getSettlementParts();
       this.getSettlementWorkforce();

      // this.getSettlementCustomer();
      this.getSettlementSpecific(this.settlementId);

       console.log(resp);
      //  this.assingTotal();
     }).catch(error => {

      swal({
        title: 'Se presento un problema, para guardar este item',
        type: 'error'
       });

       console.log(error);
     });
    }else{
      swal({
        title: 'Se presentó un problema',
        text: 'El precio asignado está por debajo del sugerido o está por encima del porcentaje permitido',
        type: 'error'
       });
    }
  }else{
    swal({
      title: 'Se presentó un problema',
      text: 'El campo subcentro es requerido es requerido',
      type: 'error'
     });
  }
  }else{
    swal({
      title: 'Se presentó un problema',
      text: 'El campo código es requerido',
      type: 'error'
     });
  }
}else{
    swal({
      title: 'Se presentó un problema',
      text: 'El campo descripción es requerido',
      type: 'error'
     });
  }

}

   changeFormatDecimal(price: any){
    console.log(price);
    let priceTempStr = price.toString();
    priceTempStr = priceTempStr.split('.').join('');
    let priceTemp= priceTempStr.replace(',','.');
    return priceTemp;
   }

   validationFullCodeCreatePartUpdate(){
     try{
    if(this.fullCodeUpdate){
    // this.indicatorFullCodeCreatePart
     if(this.fullCodeUpdate.required_subcenter==1){ // Si es true se debe validar subcenter obligatorio
       if(this.selectedSubcostCenterUpdateId!=0){
         return this.indicatorFullCodeCreatePartUpdate=1; //asignamos 1 si esta el subcentro
       }else{
         return this.indicatorFullCodeCreatePartUpdate=2; //asignamos 2 si no hay subcento
       }
     }else{
       return this.indicatorFullCodeCreatePartUpdate=3; // no require subcenter
      }
    }else{
     return this.indicatorFullCodeCreatePartUpdate=4; // no hay code
    }
  }catch(err){
    return this.indicatorFullCodeCreatePartUpdate=4;
  }
 // es validar el 2 si devuelve 2 se pide subcenter
    }


    validationFullCodeCustomerUpdate(){
      try{
     if(this.fullCodeCustomerUpdate){
     // this.indicatorFullCodeCreatePart
      if(this.fullCodeCustomerUpdate.required_subcenter==1){ // Si es true se debe validar subcenter obligatorio
        if(this.selectedSubcostCenterCustomerUpdateId!=0){
          return this.indicatorFullCodeCreateCustomerUpdate=1; //asignamos 1 si esta el subcentro
        }else{
          return this.indicatorFullCodeCreateCustomerUpdate=2; //asignamos 2 si no hay subcento
        }
      }else{
        return this.indicatorFullCodeCreateCustomerUpdate=3; // no require subcenter
       }
     }else{
      return this.indicatorFullCodeCreateCustomerUpdate=4; // no hay code
     }
   }catch(err){
     return this.indicatorFullCodeCreateCustomerUpdate=4;
   }
  // es validar el 2 si devuelve 2 se pide subcenter
     }





   validationFullCodeWorkforceUpdate(){
    try{
   if(this.fullCodeWorkforceUpdate){
   // this.indicatorFullCodeCreatePart
    if(this.fullCodeWorkforceUpdate.required_subcenter==1){ // Si es true se debe validar subcenter obligatorio
      if(this.selectedSubcostCenterWorkforceId!=0){
        return this.indicatorFullCodeCreateWorkforceUpdate=1; //asignamos 1 si esta el subcentro
      }else{
        return this.indicatorFullCodeCreateWorkforceUpdate=2; //asignamos 2 si no hay subcento
      }
    }else{
      return this.indicatorFullCodeCreateWorkforceUpdate=3; // no require subcenter
     }
   }else{
    return this.indicatorFullCodeCreateWorkforceUpdate=4; // no hay code
   }
 }catch(err){
   return this.indicatorFullCodeCreateWorkforceUpdate=4;
 }
// es validar el 2 si devuelve 2 se pide subcenter
   }


   updateSettlementDetailWorkforce(){
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
     // console.log(this.lowPrice+ '--' +this.price+ '--'+ this.higherPrice);
     let priceUpdateTemp=  this.changeFormatDecimal(this.priceUpdate);//
     this.lowPriceUpdate = this.changeFormatDecimal(this.suggestedPriceUpdate);
     this.higherPriceUpdate = Number(this.lowPriceUpdate *(1+(this.suggestedMaximum/100))).toFixed(0);
     console.log('info de importante');
     console.log('----'+priceUpdateTemp+ '----'+ this.lowPriceUpdate+'---'+  this.higherPriceUpdate + '---' + this.suggestedMaximum);
     // cambio YCV
     if(this.workforceServiceUpdate!==''){
      if(this.workforceCodeUpdate!==''){
      let indSubcenter= this.validationFullCodeWorkforceUpdate();

      if(indSubcenter!=2){
      let codeTemp;
      if(this.fullCodeWorkforceUpdate){
       codeTemp=this.fullCodeWorkforceUpdate.code;
      }else{
       codeTemp= this.workforceCodeUpdate;
      }
     let fullCodeTemp = this.workforceCodeUpdate;

     let settlementIdDetailTemp= this.workforceDetailIdUpdate;
     let serviceTemp= this.workforceServiceUpdate;
     let quantityTemp = this.workforcequantityUpdate;


     let hourValueTemp = this.changeFormatDecimal(this.workforceHourValueUpdate);
     let subtotalTemp = this.changeFormatDecimal(this.totalPriceWorkforceUpdate);
     let deliveryTemp = this.workforceDeliveryUpdate;
     let statusTemp = 0;
     let typeServiceTemp = 1;
     let totalTemp;
     let subCenterCostIdWorkforce= this.selectedSubcostCenterWorkforceUpdateId;
     let discountTemp= this.discountWorkforceUpdate;
     let estimateDestil = this.estimateDetailId;
     let branchOfficePart = this.selectedBranchWorkforce;
     let forkliftPart = this.selectedForkliftWorkforce;

     this.settlementService.updateSettlementDetailWorkforce(settlementIdDetailTemp,codeTemp,serviceTemp,
      quantityTemp,  hourValueTemp, subtotalTemp, deliveryTemp, subtotalTemp,statusTemp, typeServiceTemp, subCenterCostIdWorkforce, discountTemp, fullCodeTemp,estimateDestil,branchOfficePart,forkliftPart ).then(data => {
       const resp: any = data;
       swal({
        title: 'Item actualizado',
        type: 'success'
       });

       document.getElementById( 'updateItemHideDetailWorkforce').click();

       this.clearFormDetailWorkUpdate();
      // this.getEstimateDetails();
      this.getSettlementParts();
       this.getSettlementWorkforce();

       console.log(resp);

       this.getSettlementSpecific(this.settlementId);
     }).catch(error => {

      swal({
        title: 'Se presento un problema, para guardar este item',
        type: 'error'
       });

       console.log(error);
     });

  }else{
    swal({
      title: 'Se presentó un problema',
      text: 'El campo subcentro es requerido es requerido',
      type: 'error'
     });
  }
  }else{
    swal({
      title: 'Se presentó un problema',
      text: 'El campo código es requerido',
      type: 'error'
     });
  }
}else{
    swal({
      title: 'Se presentó un problema',
      text: 'El campo descripción es requerido',
      type: 'error'
     });
  }

   }

// ------------------------------------------

   updateSettlementDetailCustomer(){
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
     // console.log(this.lowPrice+ '--' +this.price+ '--'+ this.higherPrice);
     let priceUpdateTemp=  this.changeFormatDecimal(this.customerPriceUpdate);//
     this.lowPriceUpdate = this.changeFormatDecimal(this.suggestedPriceUpdate);
     this.higherPriceUpdate = Number(this.lowPriceUpdate *(1+(this.suggestedMaximum/100))).toFixed(0);
     console.log('info de importante');
     console.log('----'+priceUpdateTemp+ '----'+ this.lowPriceUpdate+'---'+  this.higherPriceUpdate + '---' + this.suggestedMaximum);
     // cambio YCV
     if(this.customerServiceUpdate!==''){
      if(this.customerCodeUpdate!==''){
      let indSubcenter= this.validationFullCodeCustomerUpdate();

      if(indSubcenter!=2){
      let codeTemp;
      if(this.fullCodeCustomerUpdate){
       codeTemp=this.fullCodeCustomerUpdate.code;
      }else{
       codeTemp= this.customerCodeUpdate;
      }

     let fullCodeTemp = this.customerCodeUpdate;


     let settlementIdDetailTemp= this.customerDetailIdUpdate;//este
     let serviceTemp= this.customerServiceUpdate;
     let quantityTemp = this.customerquantityUpdate;
     let hourValueTemp = this.changeFormatDecimal(this.customerPriceUpdate);
     let subtotalTemp = this.changeFormatDecimal(this.customerSubtotalUpdate);
     let deliveryTemp = this.customerDeliveryUpdate;
     let statusTemp = 0;
     let typeServiceTemp = 1;
     let totalTemp;
     let subCenterCostIdWorkforce= this.selectedSubcostCenterCustomerUpdateId;
     let discountTemp= this.discountCustomerUpdate;
     let branchOfficePart = this.selectedBranchCustomer;
     let forkliftPart = this.selectedForkliftCustomer;

     this.settlementService.updateSettlementDetailCustomer(settlementIdDetailTemp,codeTemp,serviceTemp,
      quantityTemp, hourValueTemp, deliveryTemp, subtotalTemp, subtotalTemp,statusTemp, subCenterCostIdWorkforce, discountTemp, fullCodeTemp,branchOfficePart,forkliftPart ).then(data => {
       const resp: any = data;
       swal({
        title: 'Item actualizado',
        type: 'success'
       });

       document.getElementById('updateHideCustomer').click();

       this.clearFormDetailWorkUpdate();
      // this.getEstimateDetails();
      this.getSettlementCustomer();
      this.getSettlementParts();
       this.getSettlementWorkforce();

       console.log(resp);
     }).catch(error => {

      swal({
        title: 'Se presento un problema, para guardar este item',
        type: 'error'
       });

       console.log(error);
     });

  }else{
    swal({
      title: 'Se presentó un problema',
      text: 'El campo subcentro es requerido es requerido',
      type: 'error'
     });
  }
  }else{
    swal({
      title: 'Se presentó un problema',
      text: 'El campo código es requerido',
      type: 'error'
     });
  }
}else{
    swal({
      title: 'Se presentó un problema',
      text: 'El campo descripción es requerido',
      type: 'error'
     });
  }

   }

   // -------------------------------------------------

   updateSettlementDetail(){
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
     // console.log(this.lowPrice+ '--' +this.price+ '--'+ this.higherPrice);
     let priceUpdateTemp=  this.changeFormatDecimal(this.priceUpdate);//
     this.lowPriceUpdate = this.changeFormatDecimal(this.suggestedPriceUpdate);
     this.higherPriceUpdate = Number(this.lowPriceUpdate *(1+(this.suggestedMaximum/100))).toFixed(0);
     console.log('info de importante');
     console.log('----'+priceUpdateTemp+ '----'+ this.lowPriceUpdate+'---'+  this.higherPriceUpdate + '---' + this.suggestedMaximum);
     // cambio YCV
     if(this.descriptionUpdate!==''){
      if(this.codeUpdate!==''){
      let indSubcenter= this.validationFullCodeCreatePartUpdate();

      if(indSubcenter!=2){

     if(Number(priceUpdateTemp) >= Number(this.lowPriceUpdate) && Number(priceUpdateTemp) <= Number(this.higherPriceUpdate)){

      let codeTemp;
      if(this.fullCodeUpdate){
       codeTemp=this.fullCodeUpdate.code;
      }else{
       codeTemp= this.codeUpdate;
      }

     let fullCodeTemp = this.codeUpdate;

     console.log(this.fullCodeUpdate);
     console.log(this.codeUpdate);
     console.log(fullCodeTemp);
     console.log(codeTemp);

     let settlementIdDetailTemp= this.idDetail;//this.settlementId;

     let descriptionTemp= this.descriptionUpdate;
     let quantityTemp = this.quantityUpdate;
     let unitCostTemp = this.unitCostUpdate;
     let priceListTemp = this.priceListUpdate;
     let priceSuggestTemp = this.changeFormatDecimal(this.suggestedPriceUpdate);
     //let daysTemp = this.daysUpdate;
     // let priceTemp = this.priceUpdate;
     let deliveryPartTemp = this.deliveryPartUpdate;
     let weightTemp = this.weightUpdate;
     let totalTemp = this.changeFormatDecimal(this.totalPriceUpdate);
     let observationTemp = this.observationUpdate;
     let statusTemp = 0;
     let discountTemp= this.discountPartUpdate;
     console.log('Antes de guardar');
     console.log(this.totalPriceUpdate);
     let subtotalTemp = this.changeFormatDecimal(this.totalPriceUpdate);
     let typeServiceTemp = 0;
     let weightTypeTemp = this.weightTypeListUpdate;
     let subcenterId= this.selectedSubcostCenterUpdateId;
     let estimateDestil = this.estimateDetailId;
     let branchOfficePart = this.selectedBranchPart;
     let forkliftPart = this.selectedForkliftPart;

     this.settlementService.updateSettlementDetails(settlementIdDetailTemp,codeTemp,descriptionTemp,
      quantityTemp, unitCostTemp, priceListTemp, priceSuggestTemp, weightTemp,
      priceUpdateTemp, subtotalTemp, deliveryPartTemp, totalTemp,statusTemp, typeServiceTemp,weightTypeTemp,subcenterId,
       discountTemp, fullCodeTemp,estimateDestil,branchOfficePart,forkliftPart ).then(data => {
       const resp: any = data;
       swal({
        title: 'Item actualizado',
        type: 'success'
       });

       document.getElementById('updateItemHide').click();
       document.getElementById('updateItemHideCopy').click();

       this.clearFormDetailUpdate();
      // this.getEstimateDetails();
      this.getSettlementParts();
       this.getSettlementWorkforce();
       // this.getSettlementCustomer();
       this.getSettlementSpecific(this.settlementId);
       console.log(resp);
     }).catch(error => {

      swal({
        title: 'Se presento un problema, para guardar este item',
        type: 'error'
       });

       console.log(error);
     });
    }else{
      swal({
        title: 'Se presentó un problema',
        text: 'El precio asignado está por debajo del sugerido o está por encima del porcentaje permitido',
        type: 'error'
       });
    }
  }else{
    swal({
      title: 'Se presentó un problema',
      text: 'El campo subcentro es requerido es requerido',
      type: 'error'
     });
  }
  }else{
    swal({
      title: 'Se presentó un problema',
      text: 'El campo código es requerido',
      type: 'error'
     });
  }
}else{
    swal({
      title: 'Se presentó un problema',
      text: 'El campo descripción es requerido',
      type: 'error'
     });
  }





   }


   sendPriceCountries() {
    console.log(localStorage.getItem('token'));
    this.submitted = true;
   if ( !this.myForm.invalid) {
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();


    this.estimateService.createPriceCountries(Number(this.selectedEstimateCountryId.id),
                                              this.myForm.get('weight').value.toUpperCase(),
                                      this.myForm.get('price').value.toUpperCase()).then(data => {
      const resp: any = data;
      console.log(resp);
      if (resp.success === false) {
        swal({
          title: 'Este peso ya esta registrado',
          text: 'Este peso no se puede registrar',
          type: 'error'
         });
      } else {
        this.myForm.get('weight').setValue('');
        this.myForm.get('price').setValue('');
     /*swal({
      title: 'Marca agregada',
      type: 'success'
     });*/
   //   this.router.navigateByUrl('master/registerBrand');

   document.getElementById( 'createCountryHide').click();
   this.ChangingValue();
   swal({
    title: 'País agregado',
    type: 'success'
   });
    }
    }).catch(error => {
      console.log(error);
    });
    }
  }

  ChangingValue(){
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    console.log('--------------');
    this.currentCountryText= this.selectedEstimateCountryId.name;
    console.log('-----*******---------');
    console.log( this.currentCountryText);
    console.log(this.selectedEstimateCountryId.id);
    this.estimateService.getPriceDhlCountry(Number(this.selectedEstimateCountryId.id)).then(data => {
      const resp: any = data;
      console.log(data);
     //this.rowsClient = resp.data;
      swal.close();
    }).catch(error => {
      console.log(error);
    });
  }

  sendUpdatePriceCountries() {
    this.submittedUpdate = true;
   if ( !this.myFormUpdate.invalid) {
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    console.log('-----------------');
    console.log(Number(this.currentCountry.id)+'-'+ Number(this.myFormUpdate.get('weightUpdate').value)+'-'+Number(this.myFormUpdate.get('priceUpdate').value));
    console.log('----------------------');
    this.estimateService.updatePriceCountries(Number(this.currentCountry.id),
    Number(this.myFormUpdate.get('weightUpdate').value),
    Number(this.myFormUpdate.get('priceUpdate').value))
    .then(data => {
      const resp: any = data;
      console.log(resp);
      if (resp.error) {
        swal({
          title: 'Esta país ya esta registrado',
          text: 'Este país no se puede actualizar',
          type: 'error'
         });
      } else {
     // this.router.navigateByUrl('master/registerBrand');
     document.getElementById( 'updateCountryHide').click();
     this.ChangingValue();
     swal({
      title: 'Marca actualizada',
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



  updateItems(item:any) {

    console.log('-----------------------');
    console.log(item);
    if(item.estimate_id != null){
      // this.onChangeCodeUpdate(item.full_code);
      this.idDetail = item.id;
      this.codeUpdate= item.full_code;
      this.descriptionUpdate= item.description;
      this.quantityUpdate= item.quantity;
      this.unitCostUpdate  = item.unit_cost;
      this.priceListUpdate  = item.price_list;
      this.suggestedPriceUpdate = this.finalFormatStandard(Number(item.price_suggest).toFixed(0));
      this.priceUpdate =this.finalFormatStandard(Number(item.price).toFixed(0));

      console.log('info importante '+item.subtotal);
      console.log('info importante '+item.discount);
      this.subtotalUpdate =this.finalFormatStandard(Number(Number(item.price)*(Number(item.quantity))).toFixed(0));
      this.deliveryUpdate =  item.delivery;
      this.weightUpdate = item.weight;
      this.weightTypeListUpdate = item.weight_type;
      this.selectedSubcostCenterUpdateId = item.subcost_center_id;
      this.discountPartUpdate= item.discount;
      this.estimateDetailId = item.estimate_detail_id;
      this.selectedBranchPart = item.branch_office_id;
      if(this.selectedBranchPart != null){
        this.getForklifsDetails(this.selectedBranchPart)
      }
      this.selectedForkliftPart = item.forklift_id;
      this.totalPriceUpdate= this.finalFormatStandard(Number(item.subtotal).toFixed(0));
      // console.log(item);
      document.getElementById( 'uploadItemCopy').click();
    }else{

      // this.onChangeCodeUpdate(item.full_code);
      this.idDetail = item.id;
      this.codeUpdate= item.full_code;
      this.descriptionUpdate= item.description;
      this.quantityUpdate= item.quantity;
      this.unitCostUpdate  = item.unit_cost;
      this.priceListUpdate  = item.price_list;
      this.suggestedPriceUpdate = this.finalFormatStandard(Number(item.price_suggest).toFixed(0));
      this.priceUpdate =this.finalFormatStandard(Number(item.price).toFixed(0));
      console.log('info importante '+item.subtotal);
      console.log('info importante '+item.discount);
      this.subtotalUpdate =this.finalFormatStandard(Number(Number(item.price)*(Number(item.quantity))).toFixed(0));
      this.deliveryUpdate =  item.delivery;
      this.weightUpdate = item.weight;
      this.weightTypeListUpdate = item.weight_type;
      this.selectedSubcostCenterUpdateId = item.subcost_center_id;
      this.discountPartUpdate= item.discount;
      this.selectedBranchPart = item.branch_office_id;
      if(this.selectedBranchPart != null){
        this.getForklifsDetails(this.selectedBranchPart)
      }
      this.selectedForkliftPart = item.forklift_id;
      this.totalPriceUpdate= this.finalFormatStandard(Number(item.subtotal).toFixed(0));
      // console.log(item);
      document.getElementById('uploadItem').click();

    }
  }


  updateWorkForceItems(item:any) {
    // this.onChangeworkforceCodeUpdate(item.full_code);
    this.workforceDetailIdUpdate = item.id;
    this.workforceCodeUpdate = item.full_code;
    this.workforceServiceUpdate = item.service;
    this.workforcequantityUpdate = item.quantity;
    this.workforceHourValueUpdate = this.finalFormatStandard((Number(item.hour_value)).toFixed(0));
    this.workforceSubtotalUpdate =  this.finalFormatStandard((Number(item.hour_value)* Number(item.quantity)).toFixed(0)); // (Number(item.subtotal)).toFixed(0);
    this.workforceDeliveryUpdate = item.delivery;
    this.selectedSubcostCenterUpdateId = item.subcost_center_id;
    this.discountWorkforceUpdate= item.discount;
    this.totalPriceWorkforceUpdate= this.finalFormatStandard( Number(item.subtotal).toFixed(0));
    this.estimateDetailId = item.estimate_detail_id;
    this.selectedBranchWorkforce = item.branch_office_id;
    if(this.selectedBranchWorkforce != null){
      this.getForklifsDetails(this.selectedBranchWorkforce)
    }
    this.selectedForkliftWorkforce = item.forklift_id;

        // console.log(item);
        document.getElementById( 'uploadWorkforceItem').click();
  }

    updateCustomerItems(item:any) {
        console.log(item);
        // this.onChangeCustomerCodeUpdate(item.full_code);
        this.customerDetailIdUpdate = item.id;
        this.customerCodeUpdate = item.full_code;
        this.customerServiceUpdate = item.description;
        this.customerquantityUpdate = item.quantity;
        this.customerPriceUpdate = this.finalFormatStandard((Number(item.price)).toFixed(0));
        this.customerSubtotalUpdate = (Number(item.subtotal)).toFixed(0);
        this.customerDeliveryUpdate = item.delivery;
        this.selectedSubcostCenterCustomerUpdateId = item.subcost_center_id;
        this.discountCustomerUpdate= item.discount;
        this.totalPriceCustomerUpdate= this.finalFormatStandard( Number(item.subtotal).toFixed(0));
        this.selectedBranchCustomer = item.branch_office_id;
        if(this.selectedBranchCustomer != null){
          this.getForklifsDetails(this.selectedBranchCustomer)
        }
        this.selectedForkliftCustomer = item.forklift_id;


        // console.log(item);
        document.getElementById('uploadCustomerItem').click();
    }


  deletePriceCountry(item: any) {
    swal({
      title: 'Estás seguro de eliminar este elemento?',
     // text: 'Once deleted, you will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si'

    })
    .then((willDelete) => {
        if (willDelete.value) {
          this.elementDelete = item;
          console.log(item);
          console.log(    this.elementDelete);
          swal.showLoading();
          this.estimateService.deletePriceCountries(Number(this.elementDelete.id))
          .then(data => {
            swal.showLoading();
            const resp: any = data;
            console.log(resp);

            if (resp.success === false) {
              swal({
                title: 'Este peso presenta problemas',
                text: 'Este peso no se puede eliminar',
                type: 'error'
               });
            } else {
           // this.router.navigateByUrl('master/registerBrand');
           this.ChangingValue();
           swal({
            title: 'Peso eliminada',
            type: 'success'
           });
          }
          }).catch(error => {
            console.log(error);
          });
          console.log(this.elementDelete.id);
        } else {
         // swal('Fail');
        }
      console.log(willDelete);
    });
  }



  deleteEstimateDetail(item: any) {
    swal({
      title: 'Estás seguro de eliminar este elemento?',
     // text: 'Once deleted, you will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si'

    })
    .then((willDelete) => {
        if (willDelete.value) {
          this.elementDelete = item;
          console.log(item);
          console.log(    this.elementDelete);
          swal.showLoading();
          console.log(this.elementDelete.id);
          console.log(JSON.stringify(this.elementDelete));
          this.settlementService.deleteSettlementDetail(Number(this.elementDelete.id))
          .then(data => {
            swal.showLoading();
            const resp: any = data;
            console.log(resp);

            if (resp.success === false) {
              swal({
                title: 'Este peso presenta problemas',
                text: 'Este peso no se puede eliminar',
                type: 'error'
               });
            } else {
           // this.router.navigateByUrl('master/registerBrand');
           this.ChangingValue();
           swal({
            title: 'Elemento eliminado',
            type: 'success'
           });
           this.getSettlementParts();
           this.getSettlementWorkforce();
          // this.getSettlementCustomer();
          this.getSettlementSpecific(this.settlementId);
          }
          }).catch(error => {
            console.log(error);
          });
          console.log(this.elementDelete.id);
        } else {
         // swal('Fail');
        }
      console.log(willDelete);
    });
  }


  deleteWorkForceItems(item: any) {
    swal({
      title: 'Estás seguro de eliminar este elemento?',
     // text: 'Once deleted, you will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si'

    })
    .then((willDelete) => {
        if (willDelete.value) {
          this.elementDelete = item;
          console.log(item);
          console.log(    this.elementDelete);
          swal.showLoading();
          console.log(this.elementDelete.id);
          console.log(JSON.stringify(this.elementDelete));
          this.settlementService.deleteSettlementDetail(Number(this.elementDelete.id))
          .then(data => {
            swal.showLoading();
            const resp: any = data;
            console.log(resp);

            if (resp.success === false) {
              swal({
                title: 'Este peso presenta problemas',
                text: 'Este peso no se puede eliminar',
                type: 'error'
               });
            } else {
           // this.router.navigateByUrl('master/registerBrand');
           this.ChangingValue();
           swal({
            title: 'Elemento eliminado',
            type: 'success'
           });
           this.getSettlementParts();
           this.getSettlementWorkforce();
          // this.getSettlementCustomer();
          this.getSettlementSpecific(this.settlementId);
          }
          }).catch(error => {
            console.log(error);
          });
          console.log(this.elementDelete.id);
        } else {
         // swal('Fail');
        }
      console.log(willDelete);
    });
  }


  deleteCustomerDetail(item: any) {
    swal({
      title: 'Estás seguro de eliminar este elemento?',
     // text: 'Once deleted, you will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si'

    })
    .then((willDelete) => {
        if (willDelete.value) {
          this.elementDelete = item;
          console.log(item);
          console.log(    this.elementDelete);
          swal.showLoading();
          console.log(this.elementDelete.id);
          console.log(JSON.stringify(this.elementDelete));
          this.settlementService.deleteSettlementDetailCustomer(Number(this.elementDelete.id))
          .then(data => {
            swal.showLoading();
            const resp: any = data;
            console.log(resp);

            if (resp.success === false) {
              swal({
                title: 'Este peso presenta problemas',
                text: 'Este peso no se puede eliminar',
                type: 'error'
               });
            } else {
           // this.router.navigateByUrl('master/registerBrand');
           this.ChangingValue();
           swal({
            title: 'Elemento eliminado',
            type: 'success'
           });
           this.getSettlementCustomer();
           this.getSettlementParts();
           this.getSettlementWorkforce();
          // this.getSettlementCustomer();
          }
          }).catch(error => {
            console.log(error);
          });
          console.log(this.elementDelete.id);
        } else {
         // swal('Fail');
        }
      console.log(willDelete);
    });
  }


calculateFreight(weight: number, price: number) {

    if(this.weightTypeList==1){
    weight=weight/2.2;
    }

weight=weight*1.1;
let result=0;
console.log('Este es el peso final'+weight);

if(weight>1){
let vInput = weight;
let b = Math.trunc(vInput);

console.log('este es el valor de '+b);
let c = vInput%b;

console.log('este es el valor de c'+c);
if( c>0){
  if(c>0.50){
    result=b+1;
  }else{
    result=b+0.50;
  }
}else{
  result=b;
}
console.log('REDONDEO DE VALORES A '+result);

 }else{
   console.log('Ingreso Hpta');
  if(weight<=0.50){
    result=0.50;
    console.log('Ingreso ---------------');
  }else{
    result=1;
    console.log('Ingreso ---------------ala 1');
  }
}

  console.log('-------------------------- este es el titulo');
  console.log('peso: '+result+' precio: '+price +'peso'+ weight);

if ( price < 1000 && weight < 45) {
  this.conditionValidation = 1;

} else if (price >= 1000   && price <= 1999 && weight < 45) {
  this.conditionValidation = 2;
  console.log('REDONDEO DE VALORES '+result);
  weight=result;

} else if (price >= 2000 || weight >=45) {
  this.conditionValidation = 3;
}

console.log('condición final: '+this.conditionValidation);
this.finalWeight=weight;
console.log('condicion ' + this.conditionValidation + ' preciosLista ' + this.priceList + ' peso ' + weight);

this.showShippingCountriesDhl(this.conditionValidation,this.priceList, weight,0);// create
console.log('Importante informacion: '+ this.conditionValidation);
 }


 calculateFreightUpdate(weight: number, price: number) {

  if(this.weightTypeListUpdate==1){
  weight=weight/2.2;
  }

weight=weight*1.1;
let result=0;
console.log('Este es el peso final'+weight);

if(weight>1){
let vInput = weight;
let b = Math.trunc(vInput);

console.log('este es el valor de '+b);
let c = vInput%b;

console.log('este es el valor de c'+c);
if( c>0){
if(c>0.50){
  result=b+1;
}else{
  result=b+0.50;
}
}else{
result=b;
}
console.log('REDONDEO DE VALORES A '+result);

}else{
 console.log('Ingreso Hpta');
if(weight<=0.50){
  result=0.50;
  console.log('Ingreso ---------------');
}else{
  result=1;
  console.log('Ingreso ---------------ala 1');
}
}

console.log('-------------------------- este es el titulo');
console.log('peso: '+result+' precio: '+price +'pesok'+ weight);

if ( price < 1000 && weight < 45) {
this.conditionValidation = 1;

} else if (price >= 1000   && price <= 1999 && weight < 45) {
this.conditionValidation = 2;
console.log('REDONDEO DE VALORES '+result);
weight=result;

} else if (price >= 2000 || weight >=45) {
this.conditionValidation = 3;
}

console.log('condición final: '+this.conditionValidation);
this.finalWeightUpdate=weight;
this.showShippingCountriesDhl(this.conditionValidation,this.priceListUpdate, weight,1);// update
console.log('Importante informacion: '+ this.conditionValidation);
}


  ngOnInit() {
  }

  blockAgents( vadr: any) {
   console.log(vadr);
  }

  showShippingCountriesDhlInitial(){
    this.estimateService.showShippingCountriesDhl().then(data => {
      const resp: any = data;
      console.log('Este es la API DE CONFIGURACIÓN');
      console.log(data);
    this.showShippingCountriesDhlFilter=resp.data;
      swal.close();
    }).catch(error => {
      console.log(error);
    });
  }

  getConfigTrmInitial(){
    this.estimateService.getConfigTrm().then(data => {
      const resp: any = data;
      console.log('Este es la API DE CONFIGURACIÓN');
      console.log(data);

    this.conditionTrmUsa=resp.data[0]; // Configuración de TRM USA
    this.conditionTrmEsp=resp.data[1]; // Configuración de TRM ESP

    let trm;
    trmapi.latest().then((data) =>{
      console.log(data);
      trm = data.valor;
      if(this.conditionTrmUsa.id==1){
        this.trmGeneralUsa=trm;
      }

      if(this.conditionTrmUsa.id==2){
        this.trmGeneralUsa=(Number(this.conditionTrmUsa.constant)).toFixed(2);
      }

      if(this.conditionTrmUsa.id==3){

        console.log(trm);
        console.log(this.conditionTrmUsa.constant);
        this.trmGeneralUsa= trm+(Math.trunc(this.conditionTrmUsa.constant));
      }

      this.trmGeneralEsp= ( this.trmGeneralUsa*this.conditionTrmEsp.constant).toFixed(2);

      console.log('para ver el id');
      console.log(this.conditionTrmUsa);
    })
    .catch((error) => {
      console.log(error);
      this.estimateService.showTrmCurrent().then(data => {
        const resp: any = data;
      //   let trm = resp.data.value;
        let trm ;
        try{
          trm =resp.data.value
        }catch(error){
          trm =resp.result.value
        }

        if(this.conditionTrmUsa.id==1){
          this.trmGeneralUsa=trm;
        }

        if(this.conditionTrmUsa.id==2){
          this.trmGeneralUsa=(Number(this.conditionTrmUsa.constant)).toFixed(2);
        }

        if(this.conditionTrmUsa.id==3){

          console.log(trm);
          console.log(this.conditionTrmUsa.constant);
          this.trmGeneralUsa= trm+(Math.trunc(this.conditionTrmUsa.constant));
        }


        this.trmGeneralEsp= ( this.trmGeneralUsa*this.conditionTrmEsp.constant).toFixed(2);




        console.log('para ver el id');
        console.log(this.conditionTrmUsa);


      //  trm = trm.toString().replace('.',',');
      //   let trmSecondPart =trm.substring(1);
      //  let trmFirtsPart = trm.substring(0, 1);
      //  this.trmGeneral= trmFirtsPart+'.'+trmSecondPart;
      //  swal.close();

        console.log( this.cities);
      }).catch(error => {
        console.log(error);
      });
    });

    this.configTrm=resp.data;
      swal.close();
    }).catch(error => {
      console.log(error);
    });
  }


  onChangeScheduleOptionOne(event:any){
   // console.log('optionOne '+JSON.stringify(event));
    this.switchScheduleOptionOne = event;
    console.log(this.selectedScheduleOptionOne);
  }

  // selectedScheduleOptionOne:any=0;
  // switchScheduleOptionOne:any= false;
  // selectedScheduleOptionSecond:any=0;
  // switchScheduleOptionSecond:any= false;

  onChangeScheduleOptionSecond(event:any){
    console.log('optionSecond '+event);
    this.switchScheduleOptionSecond = event;
    console.log(this.selectedScheduleOptionSecond);
    console.log(this.switchScheduleOptionSecond);
  }



  saveScheduleOption(){
      let switchOne= 0;
      let switchSecond= 0;
      if(this.switchScheduleOptionOne==true){
        switchOne= 1;
      }

      if(this.switchScheduleOptionSecond==true){
        switchSecond= 1;
      }

    if(this.selectedScheduleOptionOne!=0 || this.selectedScheduleOptionSecond!=0){
      swal({
        title: 'Validando información ...',
        allowOutsideClick: false
      });
      swal.showLoading();

    if( this.scheduleSettlementCustomer.length>0){

      let params = this.scheduleSettlementCustomer[0].id+'@'+this.selectedScheduleOptionOne+'@'+switchOne+
      '@'+  this.scheduleSettlementCustomer[1].id +'@'+this.selectedScheduleOptionSecond+'@'+switchSecond;

      console.log(params);

      this.settlementService.updateScheduleSettlement(params).then(data => {
        const resp: any = data;
        console.log(data);
        swal({
          title: 'Se actualizo correctamente',
          type: 'success'
         });
       // swal.close();
       document.getElementById('hideModalProgramming').click();

      }).catch(error => {
        console.log(error);
        swal.close();
      });
      console.log('importante entro la info');
    }else{



      let params = this.currentSettlement.id+'@'+this.selectedScheduleOptionOne+'@'+switchOne+
      '@'+  this.currentSettlement.id+'@'+this.selectedScheduleOptionSecond+'@'+switchSecond;
      console.log(params);

      this.settlementService.createScheduleSettlement(params).then(data => {
        const resp: any = data;
        console.log(data);
       // swal.close();
       swal({
        title: 'Se guardo correctamente',
        type: 'success'
       });
       document.getElementById('hideModalProgramming').click();
      }).catch(error => {
        console.log(error);
        swal.close();
      });

    }
  }else{
    swal({
      title: 'Seleccionar un día',
      text: 'Se debe seleccionar por lo menos un día para enviar la liquidación',
      type: 'error'
    });

  }



  }



  getForkliftText(){
    if(this.selectedForkliftId!=0){
      this.forklifts.forEach((item)=>{
        if(item.id==this.selectedForkliftId){
           this.forkliftText= item.full_name;
        }
        console.log(item);
      });
    }else{
      this.forkliftText= '';
    }
   // this.forkliftText=this.selectedForkliftId.full_name;
  }

  onChangeCode(detailCode:any){
    console.log(detailCode);

    for (let i = 0; i < this.detailCodes.length; i++) {
      if(this.detailCodes[i].full_description==detailCode){
            this.fullCode=this.detailCodes[i];
      }
    }
    console.log(JSON.stringify(this.fullCode));
  }

  onChangeCodeUpdate(detailCode:any){

    for (let i = 0; i < this.detailCodes.length; i++) {
      if(this.detailCodes[i].full_description==detailCode){
            this.fullCodeUpdate=this.detailCodes[i];
      }
    }
    console.log(JSON.stringify(this.fullCodeUpdate));
  }

  onChangeCustomerCode(detailCode:any){
    console.log(detailCode);

    for (let i = 0; i < this.detailCodes.length; i++) {
      if(this.detailCodes[i].full_description==detailCode){
            this.fullCodeCustomer=this.detailCodes[i];
      }
    }
    console.log(JSON.stringify(this.fullCode));
  }


  onChangeCustomerCodeUpdate(detailCode:any){

    for (let i = 0; i < this.detailCodes.length; i++) {
      if(this.detailCodes[i].full_description==detailCode){
            this.fullCodeCustomerUpdate=this.detailCodes[i];
      }
    }
    console.log(JSON.stringify(this.fullCode));
  }

  getConfigEstimatesInitial(){
    this.estimateService.getConfigEstimates().then(data => {
      const resp: any = data;
      console.log('Este es la API DE CONFIGURACIÓN TOPE MAXIMO, MARGEN, ST,SN');
      console.log(data);
    this.configDetailEstimates=resp.data;

    this.suggestedMaximum=this.configDetailEstimates[0].constant;
    this.newCustomerMargin=this.configDetailEstimates[1].constant;
    this.thirdService=this.configDetailEstimates[2].constant;
    console.log(this.thirdService);
    this.nationalService=this.configDetailEstimates[3].constant;


    console.log('Servicio nacional');
    console.log(this.nationalService);

      swal.close();
    }).catch(error => {
      console.log(error);
    });
  }


showShippingCountriesDhl(conditionValidation:number ,country:number,weight: number, ind:number){ // ind 0:create, 1:update
  console.log(conditionValidation);
  console.log(country);
   let priceTemp=0;
  console.log('---------------------');
  console.log(this.showShippingCountriesDhlFilter);
  console.log('Valores definitivos '+conditionValidation +','+country+','+weight+','+ ind);


for (let item of  this.showShippingCountriesDhlFilter) {
console.log(country+'-'+item.estimate_countries_id+'-'+item.conexion_id_validation_front+'-'+conditionValidation);
    if(item.estimate_countries_id==country && item.conexion_id_validation_front==conditionValidation){
      priceTemp=item.price;
      this.managementVariables=item.management_variables;
      this.managmentTariff=item.tariff;
      console.log('-----');
      console.log('--------Entrocccc');
      console.log(item);
    }

    }

    if(priceTemp==0){
    console.log('Toca buscar el valor en tabla: '+country+'-------'+weight);
    this.showCountryWeight(country,weight,ind);

    }else{
      console.log('este es el valor: '+priceTemp);
      this.freightGeneral=priceTemp;
       console.log( this.freightGeneral);

       console.log('Llego hasta aqui 123')
       if(ind==0){
        this.finalOperation(country);
       }else{
        this.finalOperationUpdate(country);
       }

    }


   }

   onChangeCodeEmails(event){
    console.log(event);
    this.settlementCheckHideCode= event.target.checked;
    console.log('este es el evento para chekear eso');
  }

  showCountryWeight(country:number, weight: number, ind: number){

    console.log('-------ole ole---'+weight);
    this.estimateService.showCountryWeight(country, weight).then(data => {
      const resp: any = data;
      console.log(data);
       this.freightGeneral = resp.data[0].price;
       console.log('Este es el flete:'+ this.freightGeneral);
       if(ind==0){
        this.finalOperation(country);
       }else{
        this.finalOperationUpdate(country);
       }
      swal.close();
    }).catch(error => {
      console.log(error);
    });
  }

  calculateFreightValues(){
    console.log('jajajajaj');
    console.log(this.unitCost+'-'+ this.weight+'-'+ this.weightTypeList+'-'+  this.priceList);
    if(this.unitCost!==0 && this.weight!==0 && this.weightTypeList!==0 && this.priceList!==0 && this.quantity!==0){

    if(this.priceList==5 || this.priceList==6){
      console.log('calculo diferente');
      if(this.priceList==5 ){
        this.suggestedPrice =Number(Number(this.unitCost/this.thirdService)).toFixed(0);
        this.price =   this.suggestedPrice;
        this.subtotal=  this.suggestedPrice*this.quantity;
        console.log('ingreso ps');
        this.totalPrice= this.finalFormat(this.subtotal);
        this.lowPrice = this.suggestedPrice;
        this.higherPrice=Number(this.suggestedPrice *(1+(this.suggestedMaximum/100))).toFixed(0);
        console.log('Precio : ' + this.suggestedPrice);
        console.log('Precio bajo: ' + this.lowPrice);
        console.log('Precio alto: ' + this.higherPrice);
      }else if (this.priceList==6) {
        this.suggestedPrice =Number(Number(this.unitCost/ this.nationalService)).toFixed(0);
        this.price =   this.suggestedPrice;
        this.subtotal=  this.suggestedPrice*this.quantity;
        this.totalPrice= this.finalFormat(this.subtotal);
        this.lowPrice = this.suggestedPrice;
        this.higherPrice=Number(this.suggestedPrice *(1+(this.suggestedMaximum/100))).toFixed(0);
        console.log('Precio : ' + this.suggestedPrice);
        console.log('Precio bajo: ' + this.lowPrice);
        console.log('Precio alto: ' + this.higherPrice);
      }
    }else{
      console.log('ingreso');
      console.log('paso 29-04-20');
      this.calculateFreight(this.weight, this.unitCost);
    }
    }

    if(this.unitCost!==0 && this.priceList!==0 && this.quantity!==0){
      if(this.priceList==7){
        console.log('calculo simple');
        this.suggestedPrice = Number(this.unitCost);
        this.price = this.suggestedPrice;
        this.subtotal = Number(this.suggestedPrice*this.quantity).toFixed(0);
        this.totalPrice= this.finalFormat(this.subtotal);
        this.lowPrice = this.suggestedPrice;
        this.higherPrice = Number(this.suggestedPrice *(1+(this.suggestedMaximum/100))).toFixed(0);
        console.log('Precion bajo: ' + this.lowPrice);
        console.log('Precion alto: ' + this.higherPrice);
      }
    }

    if(this.unitCost!==0 && this.priceList!==0 && this.quantity!==0){
      if(this.priceList==5 || this.priceList==6){
        console.log('calculo diferente');
        if(this.priceList==5 ){
          this.suggestedPrice = Number(Number(this.unitCost/this.thirdService)).toFixed(0);
          this.price =   this.suggestedPrice;
          this.subtotal=  this.suggestedPrice*this.quantity;
          this.totalPrice= this.finalFormat(this.subtotal);
          this.lowPrice = this.suggestedPrice;
          this.higherPrice=Number(this.suggestedPrice *(1+(this.suggestedMaximum/100))).toFixed(0);
          console.log('Precio : ' + this.suggestedPrice);
          console.log('Precio bajo: ' + this.lowPrice);
          console.log('Precio alto: ' + this.higherPrice);
        }else if (this.priceList==6) {
          this.suggestedPrice =Number(Number(this.unitCost/ this.nationalService)).toFixed(0);
          this.price =   this.suggestedPrice;
          this.subtotal=  this.suggestedPrice*this.quantity;
          this.totalPrice= this.finalFormat(this.subtotal);
          this.lowPrice = this.suggestedPrice;
          this.higherPrice=Number(this.suggestedPrice *(1+(this.suggestedMaximum/100))).toFixed(0);
          console.log('Precio : ' + this.suggestedPrice);
          console.log('Precio bajo: ' + this.lowPrice);
          console.log('Precio alto: ' + this.higherPrice);
        }
      }

    }
    console.log('valores con los decimales');
    this.suggestedPrice= this.finalFormat(this.suggestedPrice);
    this.price= this.finalFormat(this.price);
    this.subtotal= this.finalFormat(this.subtotal);
    console.log(this.weight);
  }


  calculateFreightValuesUpdate(){

    if( this.unitCostUpdate!==0 && this.weightUpdate!==0 && this.weightTypeListUpdate!==0 && this.priceListUpdate!==0 && this.quantityUpdate!==0){

    if(this.priceListUpdate==5 || this.priceListUpdate==6){
      console.log('calculo diferente');
      if(this.priceListUpdate==5 ){
        this.suggestedPrice =Number(Number(this.unitCostUpdate/this.thirdService).toFixed(0));
        this.priceUpdate =   this.suggestedPriceUpdate;
        this.subtotalUpdate =  this.suggestedPriceUpdate*this.quantityUpdate;
        console.log('ingreso calcular Sub')
          console.log(this.suggestedPriceUpdate);
          console.log(this.quantityUpdate);
          console.log(this.subtotalUpdate);
        this.totalPriceUpdate = this.finalFormat( this.subtotalUpdate);
        this.lowPriceUpdate = this.suggestedPriceUpdate;
        this.higherPriceUpdate=Number(this.suggestedPriceUpdate *(1+(this.suggestedMaximum/100))).toFixed(0);
        console.log('Precion bajo: ' + this.lowPriceUpdate);
        console.log('Precion alto: ' + this.higherPriceUpdate);
      }else if (this.priceListUpdate==6) {
        this.suggestedPriceUpdate =Number(Number(this.unitCostUpdate/ this.nationalService).toFixed(0));
        this.priceUpdate =   this.suggestedPriceUpdate;
        this.subtotalUpdate =  this.suggestedPriceUpdate*this.quantityUpdate;
        this.totalPriceUpdate= this.finalFormat( this.subtotalUpdate);
        this.lowPriceUpdate = this.suggestedPriceUpdate;
        this.higherPriceUpdate=Number(this.suggestedPriceUpdate *(1+(this.suggestedMaximum/100))).toFixed(0);
        console.log('Precion bajo: ' + this.lowPriceUpdate);
        console.log('Precion alto: ' + this.higherPriceUpdate);
      }
    }else{
      console.log('ingreso 24-08-2020');
      this.calculateFreightUpdate(this.weightUpdate, this.unitCostUpdate);
    }
    }
    if(this.unitCostUpdate!==0 && this.priceListUpdate!==0 && this.quantity!==0){
      if(this.priceListUpdate==7){
        console.log('calculo simple 24-08-2020');
        this.suggestedPriceUpdate =Number(this.unitCostUpdate);
        this.priceUpdate =   this.suggestedPriceUpdate;
        this.subtotalUpdate = Number(this.suggestedPriceUpdate*this.quantityUpdate).toFixed(0);
        console.log('ingreso calcular Sub')
          console.log(this.suggestedPriceUpdate);
          console.log(this.quantityUpdate);
          console.log(this.subtotalUpdate);
        this.totalPriceUpdate = this.finalFormat( this.subtotalUpdate);
        this.lowPriceUpdate = this.suggestedPriceUpdate;
        this.higherPriceUpdate=Number(this.suggestedPriceUpdate *(1+(this.suggestedMaximum/100))).toFixed(0);
        console.log('Precion bajo: ' + this.lowPriceUpdate);
        console.log('Precion alto: ' + this.higherPriceUpdate);
      }
    }
    if(this.unitCostUpdate!==0 && this.priceListUpdate!==0 && this.quantity!==0){
      if(this.priceListUpdate==5 || this.priceListUpdate==6){
        console.log('calculo diferente');
        if(this.priceListUpdate==5 ){
          this.suggestedPriceUpdate = Number(Number(this.unitCostUpdate/this.thirdService).toFixed(0));
          this.priceUpdate =   this.suggestedPriceUpdate;
          this.subtotalUpdate =  this.suggestedPriceUpdate*this.quantityUpdate;
          console.log('ingreso calcular Sub')
          console.log(this.suggestedPriceUpdate);
          console.log(this.quantityUpdate);
          console.log(this.subtotalUpdate);
          this.totalPriceUpdate = this.finalFormat( this.subtotalUpdate);
          this.lowPriceUpdate = this.suggestedPriceUpdate;
          this.higherPriceUpdate=Number(this.suggestedPriceUpdate *(1+(this.suggestedMaximum/100))).toFixed(0);
          console.log('Precion bajo: ' + this.lowPriceUpdate);
          console.log('Precion alto: ' + this.higherPriceUpdate);
        }else if (this.priceListUpdate==6) {
          this.suggestedPriceUpdate =Number(Number(this.unitCostUpdate/ this.nationalService).toFixed(0));
          this.priceUpdate =   this.suggestedPriceUpdate;
          this.subtotalUpdate =  this.suggestedPriceUpdate*this.quantityUpdate;
          console.log('ingreso calcular Sub')
          console.log(this.suggestedPriceUpdate);
          console.log(this.quantityUpdate);
          console.log(this.subtotalUpdate);
          this.totalPriceUpdate = this.finalFormat( this.subtotalUpdate);
          this.lowPriceUpdate = this.suggestedPriceUpdate;
          this.higherPriceUpdate=Number(this.suggestedPriceUpdate *(1+(this.suggestedMaximum/100))).toFixed(0);
          console.log('Precion bajo: ' + this.lowPriceUpdate);
          console.log('Precion alto: ' + this.higherPriceUpdate);
        }

      }

      console.log('valores con los decimale');
      console.log(this.suggestedPriceUpdate);
      this.suggestedPriceUpdate= this.finalFormat(this.suggestedPriceUpdate);
      console.log(this.suggestedPriceUpdate);
      console.log('-----------IL----');
      console.log(this.priceUpdate);
      this.priceUpdate= this.finalFormat(this.priceUpdate);
      console.log(this.priceUpdate);
      console.log('-----------IL----');
      console.log(this.subtotalUpdate);
      this.subtotalUpdate= this.finalFormat(this.subtotalUpdate);
      console.log(this.subtotalUpdate);

    }
    /* console.log('jajajajaj');
    console.log(this.unitCostUpdate+'-'+ this.weightUpdate+'-'+ this.weightTypeListUpdate+'-'+  this.priceListUpdate);
    if(this.unitCostUpdate!==0 && this.weightUpdate!==0 && this.weightTypeListUpdate!==0 && this.priceListUpdate!==0 && this.quantityUpdate!==0){
     console.log('ingreso');
      this.calculateFreight(this.weightUpdate, this.unitCostUpdate);
    }
    console.log(this.weight);*/
  }

  calculateFreightValuesUpdateCopy(){

    if( this.unitCostUpdate!==0 && this.weightUpdate!==0 && this.weightTypeListUpdate!==0 && this.priceListUpdate!==0 && this.quantityUpdate!==0){

      console.log('valor');
      console.log(this.priceUpdate);
      console.log(Number(this.priceUpdate));
      console.log(this.changeFormatDecimal(this.priceUpdate));
      this.subtotalUpdate =  this.priceUpdate*this.quantityUpdate;
      console.log(this.subtotalUpdate);
      this.subtotalUpdate = this.changeFormatDecimal(this.priceUpdate)*this.quantityUpdate;
      console.log(this.subtotalUpdate);
      this.lowPriceUpdate = this.suggestedPriceUpdate;
      this.higherPriceUpdate=Number(this.suggestedPriceUpdate *(1+(this.suggestedMaximum/100))).toFixed(0);
      console.log('Precion bajo: ' + this.lowPriceUpdate);
      console.log('Precion alto: ' + this.higherPriceUpdate);

      console.log('valores con los decimales');
      console.log(this.subtotalUpdate);
      // this.priceUpdate= this.finalFormat(this.priceUpdate);
      this.subtotalUpdate= this.finalFormat(this.subtotalUpdate);
      this.totalPriceUpdate = this.subtotalUpdate;

    }
  }

  finalOperation(country:number){

    //Variables necesarias para  el calculo
    // this.freightGeneral  this.managementVariables this.finalWeight
    console.log('Ingreso hasta aquí');
     let drivingCost=0;

    if(this.conditionValidation==3){
      drivingCost=Number(this.managementVariables)+this.unitCost*(Number(this.managmentTariff)/100);;
      console.log('costo de manejo');
      console.log(drivingCost);

    }else{
      //if(country==4){
        drivingCost=this.unitCost*Number(this.managementVariables)+this.unitCost*(Number(this.managmentTariff)/100);//10
      /*}else{
        drivingCost=this.unitCost*Number(this.managementVariables);
      }*/

    }

    let operationFreight=0;

    if(this.conditionValidation==2){
      console.log('peso para inicccio '+this.finalWeight);
      if(this.weightTypeList==1){
        this.finalWeight=this.weight/2.2;
        }else{
          this.finalWeight=this.weight;
        }
        this.finalWeight =  this.finalWeight*1.1;

        console.log('peso para inicccio '+this.finalWeight);

       operationFreight = Number(Number(this.freightGeneral).toFixed(2))*this.finalWeight;
    }else{
       operationFreight = Number(Number(this.freightGeneral).toFixed(2))*this.finalWeight;
    }


    console.log('driving '+drivingCost);
    // let operationFreight = this.freightGeneral*this.finalWeight;
    console.log('operation '+ this.freightGeneral);

    this.costTotalGlobal=  Number(this.unitCost) +  Number(operationFreight) +  Number(drivingCost);
    console.log(this.costTotalGlobal);
    console.log('Costo total '+ this.unitCost+'-'+operationFreight+'-'+drivingCost);

    let dolar; //llamar api medata
    if(country==3){
      dolar=this.trmGeneralEsp;
    }else{
      dolar=this.trmGeneralUsa;
    }


    console.log(this.costTotalGlobal+'--------------------'+dolar);
    console.log(Number(dolar)*1);
    let costPesos=this.costTotalGlobal*dolar;
    this.costPesosGlobal= costPesos;


    console.log( this.costPesosGlobal);

    let margin;
    console.log(this.currentSettlement);
   console.log('actual '+this.currentSettlement.price_margin);
    if(this.currentSettlement){
      console.log('entro');
      if( this.currentSettlement.customer.price_margin != 0){
          margin= (Number(this.currentSettlement.customer.price_margin))/100;
      }else{
        margin=Number(this.newCustomerMargin)/100
      }
    }else{
      margin=Number(this.newCustomerMargin)/100
    }

    console.log(margin);
    console.log('margin');


    // llamar api para cada usuario y configurar clientes que no existan
    this.salePrice=costPesos/(1-margin);
    this.suggestedPrice=((Number(this.salePrice)).toFixed(0));
    this.lowPrice = this.suggestedPrice;
    this.higherPrice = Number(this.suggestedPrice *(1+(this.suggestedMaximum/100))).toFixed(0);

    console.log('Este es el precio bajo:'+ this.lowPrice);
    console.log('Este es el precio alto' + this.higherPrice);
    console.log( this.lowPrice +'-----'+ this.higherPrice);

    this.price=Number(this.salePrice).toFixed(0);
    this.subtotal=(Number(this.salePrice)*Number(this.quantity)).toFixed(0);

    let totalPart =  Number((this.price*this.quantity)-((this.price*this.quantity)*(this.discountPart/100))).toFixed(0);
    this.totalPrice= this.finalFormat(totalPart);

  }

finalOperationUpdate(country:number){

  //Variables necesarias para  el calculo
  // this.freightGeneral  this.managementVariables this.finalWeight
  console.log('Ingreso hasta aquí');
   let drivingCost=0;

  if(this.conditionValidation==3){
    drivingCost=Number(this.managementVariables)+this.unitCostUpdate*(Number(this.managmentTariff)/100);;
    console.log('costo de manejo');
    console.log(drivingCost);

  }else{
    // if(country==4){
      drivingCost=this.unitCostUpdate*Number(this.managementVariables)+this.unitCostUpdate*(Number(this.managmentTariff)/100);//10
    // }else{
      // drivingCost=this.unitCostUpdate*Number(this.managementVariables);
      //drivingCost=this.unitCostUpdate*Number(this.managementVariables)+this.unitCostUpdate*(Number(this.managmentTariff)/100);//
    //}

  }

  let operationFreight=0;




  if(this.conditionValidation==2){
    console.log('peso para inicccio '+this.finalWeightUpdate);
    if(this.weightTypeList==1){
      this.finalWeightUpdate=this.weightUpdate/2.2;
      }else{
        this.finalWeightUpdate=this.weightUpdate;
      }
      this.finalWeightUpdate =  this.finalWeightUpdate*1.1;

      console.log('peso para inicccio '+this.finalWeightUpdate);
     operationFreight = Number(Number(this.freightGeneral).toFixed(2))*this.finalWeightUpdate;
  }else{
     operationFreight = Number(Number(this.freightGeneral).toFixed(2))*this.finalWeightUpdate;
  }

  console.log('driving '+drivingCost);
  // let operationFreight = this.freightGeneral*this.finalWeight;
  console.log('operation '+ this.freightGeneral);

  this.costTotalGlobalUpdate=  Number(this.unitCostUpdate) +  Number(operationFreight) +  Number(drivingCost);
  console.log(this.costTotalGlobalUpdate);
  console.log('Costo total '+ this.unitCostUpdate+'-'+operationFreight+'-'+drivingCost);

  let dolar; //llamar api medata
  if(country==3){
    dolar=this.trmGeneralEsp;
  }else{
    dolar=this.trmGeneralUsa;
  }

  console.log(this.costTotalGlobalUpdate+'--------------------'+dolar);
  let costPesos=this.costTotalGlobalUpdate*dolar;
  this.costPesosGlobalUpdate= costPesos;


  console.log( this.costPesosGlobal);

  let margin;
  console.log(this.currentSettlement);
  console.log('actual '+this.currentSettlement.price_margin);
   if(this.currentSettlement){
     console.log('entro');
     if( this.currentSettlement.customer.price_margin != 0){
         margin= (Number(this.currentSettlement.customer.price_margin))/100;
     }else{
       margin=Number(this.newCustomerMargin)/100
     }
   }else{
     margin=Number(this.newCustomerMargin)/100
   }

  console.log('margin');


  // llamar api para cada usuario y configurar clientes que no existan
  this.salePriceUpdate=costPesos/(1-margin);
  this.suggestedPriceUpdate=((Number(this.salePriceUpdate)).toFixed(0));
  this.lowPriceUpdate = this.suggestedPriceUpdate;
  this.higherPriceUpdate = Number(this.suggestedPriceUpdate *(1+(this.suggestedMaximum/100))).toFixed(0);

  console.log( this.lowPriceUpdate +'-----'+ this.higherPriceUpdate);

  this.priceUpdate=Number(this.salePriceUpdate).toFixed(0);
  let salePrice = Number(this.salePriceUpdate).toFixed(0);
  this.subtotalUpdate=((Number(salePrice))*Number(this.quantityUpdate)).toFixed(0);

  let totalPart =  Number((this.priceUpdate*this.quantityUpdate)-((this.priceUpdate*this.quantityUpdate)*(this.discountPartUpdate/100))).toFixed(0);
    this.totalPriceUpdate= this.finalFormat(totalPart);
}




public downloadPdf(){
  const doc =new jsPDF();
  let specialElementHandlers = {
    '#editor':function(element, renderer){
      return true;
    }
  };


let content = "<table align='center'  width='100%' cellpadding='0' cellspacing='0'><tr><td width='30%' height='100' valign='top'>LOGO</td> <td width='50%' height='100' valign='top'>MONTACARGAS MASTER COTIZACIÓN PBX. (57-4) 444 6055 11/28/2019 9:24:12 AM Nit. 900.204.935-2 CLL 10 B sur # 51 42 Medellín - Colombia Creado Por: MARLON CARDONA GARCIA</td><td width='30%' height='100' valign='top'>No. 1911310</td></tr>  </table><table align='center' border='1' width='100%' cellpadding='0' cellspacing='0'> <tr><td width='100%' colspan='2' height='30' valign='top'>CLIENTE</td></tr><tr><td width='65%'  height='30' valign='top'>Nit:</td><td width='45%' height='30' valign='top'>Contacto:</td></tr></table><table align='center' border='1' width='100%' cellpadding='0' cellspacing='0'><tr><td width='30' height='30' valign='top'>Teléfono</td><td width='30' height='30' valign='top'>Departamento</td><td width='30' height='30' valign='top'>Ciudad</td></tr><tr><td width='30' height='30' colspan='3' valign='top'>MANO DE OBRA Y SERVICIOS</td></tr>  </table><table align='center' border='1' width='100%'  height='30' cellpadding='0' cellspacing='0'><tr><td width='5%' height='30' valign='top'>ITEM</td><td width='15%' height='30' valign='top'>CÓDIGO</td><td width='30%' height='30' valign='top'>DESCRIPCIÓN</td><td width='5%' height='30' valign='top'>CANT.</td><td width='15%' height='30' valign='top'>VLR. UNIT</td><td width='15%' height='30' valign='top'>TOTAL</td><td width='10' height='30' valign='top'>ENTREGA</td></tr>  </table><table align='center' border='1' width='100%' cellpadding='0' cellspacing='0'><tr><td width='30' height='30' colspan='3' valign='top'>REPUESTOS</td></tr></table> <table align='center' border='1' width='100%'  height='30' cellpadding='0' cellspacing='0'><tr><td width='5%' height='30' valign='top'>1</td><td width='15%' height='30' valign='top'> IMPCA55-258</td><td width='30%' height='30' valign='top'>CARBURETOR - AIR HORN 90 DEG DU 2-1/16 AIRHORN 2-1/16 HOSE</td><td width='5%' height='30' valign='top'>1</td><td width='15%' height='30' valign='top'>$369.583</td><td width='15%' height='30' valign='top'>$369.583</td><td width='10' height='30' valign='top'>2-5 DIAS</td></tr></table><table align='center' border='1' width='100%'  height='30' cellpadding='0' cellspacing='0'><tr><td width='20%' height='30' valign='top'>Validez Oferta:</td><td width='20%' height='30' valign='top'>Forma Pago:</td><td width='20%' height='30' valign='top'>Garantía:</td><td width='20%' height='30' valign='top'>Subtotal Repuestos:</td><td width='20%' height='30' valign='top'>$369,583</td></tr>   <tr><td colspan='3' rowspan='3' height='30' valign='top'>Observaciones: favor verificar segun la imagen enviada sobre el regulador modelo J que sea acorde a lo que solicitan.</td><td width='20%' height='30' valign='top'>Subtotal Mano de Obra:</td><td width='20%' height='30' valign='top'>0</td></tr>  <tr><td width='20%' height='30' valign='top'>Total:</td><td width='20%' height='30' valign='top'>$369,583</td> </tr><tr>	<td width='20%' colspan='2' height='30' valign='top'>NOTA: VALORES ANTES DE IVA</td>	</tr>  </table>";

let content2="<table align='center'  width='100%' cellpadding='0' cellspacing='0'><tr><td width='30%' height='100' valign='top'>LOGO</td> <td width='50%' height='100' valign='top'>MONTACARGAS MASTER COTIZACIÓN PBX. (57-4) 444 6055 11/28/2019 9:24:12 AM Nit. 900.204.935-2 CLL 10 B sur # 51 42 Medellín - Colombia Creado Por: MARLON CARDONA GARCIA</td><td width='30%' height='100' valign='top'>No. 1911310</td></tr>  </table>";
  doc.fromHTML(content2, 0, 0, {
    'elementHandlers': specialElementHandlers
  });



  doc.addPage();


  var imageurl = 'data:image/png;base64,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';
  // var som = this.convertImgToBase64(imageurl);
  doc.addImage(imageurl, 'PNG', 15, 40, 60, 30);
 // doc.output('datauristring');

doc.save('Test.pdf');
}

normalize(element: string) {
  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};

  for(var i = 0, j = from.length; i < j; i++ )
      mapping[ from.charAt( i ) ] = to.charAt( i );

  return function( str ) {
      var ret = [];
      for( var i = 0, j = str.length; i < j; i++ ) {
          var c = str.charAt( i );
          if( mapping.hasOwnProperty( str.charAt( i ) ) )
              ret.push( mapping[ c ] );
          else
              ret.push( c );
      }
      return ret.join( '' );
  }
}


onSelectFileImage(event) {

   console.log('tamaño de la imagen: '+ event.target.files.length);

    var filesAmount = event.target.files.length;
    // this.selectedFilesImages.push(event.target.files);
    var filename = event.target.files[event.target.files.length-1].name;
   //this.fileWidth =this.selectedFilesImages[0];
   //console.log('ESTES ES EL ANCHO DE LA IMAGEN: '+ this.fileWidth[0].name); //Se deja para despues si se tiene que validar width de  imagen
    console.log('Importante');

    var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
    console.log(allowedExtensions.exec(filename));
    var extFilename = filename.split('.').pop();

    if(extFilename==='jpg' || extFilename==='jpeg' || extFilename==='png'){

    console.log(filename);
    console.log(this.urlsImages);
    console.log('que es esto '+filesAmount);
    console.log('tamaño de vector:'+ this.urlsImages.length);
    console.log(event.target.files+'---'+ event.target.files[0]);
   if(this.urlsImages.length<1){
    if (event.target.files && event.target.files[0]) {
      this.selectedFilesImages.push(event.target.files);
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
                reader.onload = (event:any) => {
                  console.log(event.target.result);

                  this.urlsImages.push(event.target.result);

                }
                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }else{
    swal({
      title: 'El numero maximo de imagenes son 1',
      text: 'No se pueden cargar mas de 1 imagenes',
      type: 'error'
    });
  }
  }else{
  swal({
    title: 'El formato del archivo, no es correcto',
    text: 'Se permiten solo estas extensiones jpg, jpeg, png',
    type: 'error'
  });
  }
}

/*onSelectFile(event) {
  var filesAmount = event.target.files.length;


  var filename = event.target.files[event.target.files.length-1].name;
  console.log('Nombre de archivo');
  console.log(filename);

  var extFilename = filename.split('.').pop();

  console.log('-----');
  console.log(extFilename);


    console.log('filename que es');
    var filename = event.target.files[event.target.files.length-1].name;
    console.log(filename);
    this.urlsFiles.push(filename);
    this.selectedFiles.push(event.target.files);

}*/


onSelectFile(event) {
  var filesAmount = event.target.files.length;


  var filename = event.target.files[event.target.files.length-1].name;
  console.log('Nombre de archivo');
  console.log(filename);
  //  var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
  //  console.log(allowedExtensions.exec(filename));
  var extFilename = filename.split('.').pop();

  console.log('-----');
  console.log(extFilename);

 // if(extFilename !=='jpg' && extFilename !=='jpeg' && extFilename !=='png'){
    console.log('filename que es');
    var filename = event.target.files[event.target.files.length-1].name;
    console.log('nombre de archivo '+filename);

    this.fileSettlement={
      id: 0,
      url: filename
    };

    this.urlsFiles.push( this.fileSettlement);
    this.selectedFiles.push(event.target.files);
  /*}else{
  swal({
    title: 'El formato del archivo, no es correcto',
    text: 'No se permite cargar archivos con extensión jpg, jpeg, png ',
    type: 'error'
  });
  }*/
}


uploadImagesEstimate() {
  for (let file of this.selectedFilesImages) {
  const fileole = file[0];
  console.log(fileole);
  const uuid = UUID.UUID();
  console.log(uuid);
  console.log(fileole.name + '' + fileole.type);
  const extension = (fileole.name.substring(fileole.name.lastIndexOf('.'))).toLowerCase();
  console.log(extension);
  this.uploadService.uploadFileEstimate(fileole).then(res=>{
    console.log('s3info'+JSON.stringify(res));
    this.s3info=res;
    console.log(this.s3info);
    //this.insertNew();
  }).catch(error=> {
    console.log(error);
    swal({
      type: 'error',
      title: 'Oops a currido un error',
      text:'Se ha presentado un error al subir la imagen',
      allowOutsideClick: false
    });
  });

}
  }


  uploadAll(){
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    this.uploadFiles();

     swal({
        title: 'Archivos guardados',
        type: 'success'
       });

  }
  normalizes = (function() {
  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç+*%!¡¿?|¬°",
      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};

  for(var i = 0, j = from.length; i < j; i++ )
      mapping[ from.charAt( i ) ] = to.charAt( i );

  return function( str ) {
      var ret = [];
      for( var i = 0, j = str.length; i < j; i++ ) {
          var c = str.charAt( i );
          if( mapping.hasOwnProperty( str.charAt( i ) ) )
              ret.push( mapping[ c ] );
          else
              ret.push( c );
      }
      return ret.join( '' );
  }

})();

  uploadFiles() {
    for (let fileCurrent of this.selectedFiles) {
    const file = fileCurrent[0];
    console.log(file);
   //  const uuid = UUID.UUID();
   // console.log(uuid);
    console.log(file.name + '.' + file.type);

    let nameTemp= this.removeAccents(this.consecutive +this.normalizes(file.name.replace(/\s/g,"")));
    const extension = (file.name.substring(file.name.lastIndexOf('.'))).toLowerCase();
    console.log(extension);
    this.uploadService.uploadFilesAllSettlement(file,this.settlementId,0,nameTemp).then(res=>{
      console.log('s3info'+JSON.stringify(res));
      this.s3info=res;
      console.log(this.s3info);
      /*swal({
        title: 'Archivos guardados',
        type: 'success'
       });*/

       swal.close();
       this.showSaveFile=false;
    }).catch(error=> {
      console.log(error);
      swal({
        type: 'error',
        title: 'Oops a currido un error',
        text:'Se ha presentado un error al subir la imagen',
        allowOutsideClick: false
      });
    });
  }
}

 uploadFilesImages() {
   console.log('esta es la longitud: '+this.selectedFilesImages.length);
   console.log('contenido'+this.selectedFilesImages);
  for (let fileCurrent of this.selectedFilesImages) {
  const file = fileCurrent[0];
  var img = new Image();
  img=file;

  img.width= 30;
  img.height= 300;
  console.log('info de file');
  console.log(file);
  const uuid = UUID.UUID();
  console.log(uuid);
  console.log(img.name + '' + file.type);
  const extension = (file.name.substring(file.name.lastIndexOf('.'))).toLowerCase();
  console.log(extension);
  // 1 son las imagenes
  let nameTemp= this.removeAccents(this.consecutive +file.name.replace(/\s/g,""));
  // let nameTemp= this.consecutive +file.name.replace(/\s/g,"");
  this.uploadService.uploadFilesAll(img, this.settlementId,1, nameTemp).then(res=>{
    console.log('s3info'+JSON.stringify(res));
    this.s3info=res;
    console.log(this.s3info);
    /*swal({
      title: 'Imagenes guardadas',
      type: 'success'
     });*/

     swal.close();

    //this.insertNew();
  }).catch(error=> {
    console.log(error);
    swal({
      type: 'error',
      title: 'Oops a currido un error',
      text:'Se ha presentado un error al subir la imagen',
      allowOutsideClick: false
    });
  });
}
}

getSettlementSpecific(id:number) {

  this.settlementService.getSettlemetSpecific(id).then(data => {
    const resp: any = data;
    this.currentSettlement=resp.data;
    console.log('ingreso');
    console.log(resp.data);
    this.selectedRegionalId =  this.currentSettlement.regional_id;
    this.getCustomerRegionals();
    console.log('paso00000000001234');
    console.log('cotizacion actual '+ JSON.stringify(this.currentSettlement));
    this.now =(this.currentSettlement.create_at).substring(0,10);
    this.consecutive= this.currentSettlement.settlement_consecutive;
    console.log('customer '+this.currentSettlement.customer_id);
    this.selectedBusinessId = this.currentSettlement.customer_id; // Number(this.currentSettlement.customer.id);
    this.selectedBranchOfficeId = this.currentSettlement.branch_office_id;
    this.getBranchOffices();
    this.getForklifs();
    console.log(this.selectedBusinessId);
    if(this.currentSettlement.forklift){
      this.selectedForkliftId = this.currentSettlement.forklift_id; //this.currentSettlement.forklift_id;
      this.forkliftText= this.currentSettlement.forklift_text;
    }else{
      this.forkliftText= this.currentSettlement.forklift_text;
    }
    if(this.currentSettlement.regional.hide_fileds == 1){
      this.hideFileds = 1;
    }else{
      this.hideFileds = 0;
    }

    this.documentCustomer =  this.currentSettlement.customer_document;
    this.nameCustomer =  this.currentSettlement.customer.business_name;
    console.log('departamento '+this.currentSettlement.department_id);
    this.selectedDepartmentId = this.currentSettlement.department_id;
    this.numberEstimate = this.currentSettlement.estimate_order;
    this.totalParts = Number(this.currentSettlement.subtotal_parts).toFixed(0);
    this.totalWorkforce = Number(this.currentSettlement.subtotal_hours).toFixed(0);
    this.totalSettlement = Number(this.currentSettlement.total).toFixed(0);

      console.log((this.totalWorkforce));
      console.log(this.totalWorkforce);
      console.log(this.totalParts);
      console.log(this.totalSettlement);
      this.totalWorkforce = this.finalFormatStandard(this.totalWorkforce);
      this.totalParts = this.finalFormatStandard(this.totalParts);
      this.totalSettlement = this.finalFormatStandard(this.totalSettlement);

    this.getFilesSettlement();
    this.getConfigEstimatesInitial();
    this.getConfigTrmInitial();
    this.getCities();
    // this.getTrmCurrent();
    this.getCenterCost();
    this.getWarehouses();
    this.getSettlementSubCenterCost();
    this.selectedCityId = this.currentSettlement.city_id;



    console.log('id de la oficina'+this.selectedBranchOfficeId)
    this.selectedCostCenterId = this.currentSettlement.cost_center_id;
    this.selectedWarehouseId = this.currentSettlement.warehouse_id;
  //  this.days = this.currentSettlement.payment_method;
  //  this.guaranty = this.currentSettlement.guaranty;
    this.contact = this.currentSettlement.contact;
  //  this.email = this.currentSettlement.email;
  //  this.validity = this.currentSettlement.validity;
    this.cellphone = this.currentSettlement.telephone;
    this.observation = this.currentSettlement.observation;

    this.user= this.currentSettlement.elaborate_user.username;
    this.rowsItems=this.currentSettlement.estimate_details;

/*
    this.getConfigEstimatesInitial();
    this.getConfigTrmInitial();

    this.getCustomers();
    this.getForklifs();
    this.getDepartments();
    this.getCities();
    this.getTrmCurrent();
*/
    // Cambio para carga bien data inicio de actualización
  }).catch(error => {
    console.log(error);
  });
 }


  deleteImage(i: number){
    if( this.showSaveFile == true){
      console.log('Este es el valor de i ' + i);
      console.log(i);
      this.urlsImages.splice(i,1);
      this.selectedFilesImages.splice(i,1);
    }else{
      swal({
        title: 'No se permite eliminar la imagen, debes ir a editar la cotización',
        type: 'error'
       });
    }
   }


   saveEmailSettlement(){
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();

    let params='';
    let checkCode=0;

    if(this.settlementCheckHideCode==true){
     checkCode=1;
    }

    for (let i = 0; i < this.emailsCurrentSettlement.length; i++) {
        params=params+this.emailsCurrentSettlement[i].email+'|'+this.emailsCurrentSettlement[i].contact+'%';
      }

      console.log('estos son los parametros' + params);
      this.settlementService.createEmailsSettlement(this.settlementId, this.settlementSubject,
                          this.settlementComment,checkCode,params).then(data => {

        const resp: any = data;
        console.log('Emails '+JSON.stringify(data));

        swal({ title: 'Cambios realizados exitosamente',
        type: 'success'
       });

       document.getElementById('modalEmailSettlementHide').click();

      }).catch(error => {
        swal.close();
        console.log(error);
      });
   }




  deleteFile(i: number){
    if( this.showSaveFile == true){
    console.log('Este es el valor de i ');
    console.log(i);
    this.urlsFiles.splice(i,1);
    this.selectedFiles.splice(i,1);
    } else{
      swal({
        title: 'No se permite eliminar la imagen, debes ir a editar la cotización',
        type: 'error'
       });
    }
   }

   deleteFiles(item: any, i: number){
    console.log(item);
    console.log(i);
  if(item.id){
      swal({
        title: 'Estás seguro de eliminar este elemento?',
       // text: 'Once deleted, you will not be able to recover this imaginary file!',
        type: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: 'No',
        confirmButtonText: 'Si'
      })
      .then((willDelete) => {
          if (willDelete.value) {
            this.elementDelete = item;
            console.log(item);
            swal.showLoading();
            this.settlementService.deleteSettlementFile(Number(item.id))
            .then(data => {
              swal.showLoading();
              const resp: any = data;
              console.log('esta es la respuesta eliminando archivo'+JSON.stringify(resp));

              if (resp.success === false) {
                swal({
                  title: 'Este archivo presenta problemas',
                  text: 'Este archivo no se puede eliminar',
                  type: 'error'
                 });
              } else {
             // this.router.navigateByUrl('master/registerBrand');
            // this.ChangingValue();
             swal({
              title: 'Archivo eliminado',
              type: 'success'
             });
            }
           // swal.showLoading();
            this.urlsFiles.length = 0;
            this.getFilesSettlement();
            }).catch(error => {
              console.log(error);
            });
            console.log(item.id);
          } else {
           // swal('Fail');
          }
      });

    }else{
      this.urlsFiles.splice(i,1);
      console.log(this.urlsFiles.splice(i,1));
      var j = this.contFiles-i;
      console.log('este es valor de la posición de j: '+j);
      this.selectedFiles.splice(j,1);
    }
   }



dataURItoBlob(dataURI) {
  var binary = atob(dataURI.split(',')[1]);
  var array = [];
for (var i = 0; i < binary.length; i++) {
   array.push(binary.charCodeAt(i));
}
return new Blob([new Uint8Array(array)], {
  type: 'image/jpg'
});
}


downloadEcxel():void {
  this.excelService.exportAsExcelFile(this.data, 'sample');
}

 convertImgToBase64(url){
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var img = document.createElement('img');
    img.src = url;
    canvas.height = img.height;
    canvas.width = img.width;
    var dataURL = canvas.toDataURL('image/png')
    alert(dataURL);
    canvas = null;
    console.log('------------------------');
    console.log(dataURL);
    return dataURL;
  }


  getBase64Image(img) {
    var canvas = document.createElement("canvas");
    console.log("image");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
  }




  download(){
var imageurl = 'data:image/png;base64,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';
const doc = new jsPDF('portrait', 'px', 'a4') as jsPDFWithPlugin;



 /*
  doc.autoTable({
  head: [['Name', 'Email', 'Country']],
  body: [
    ['David', 'david@example.com', 'Sweden'],
    ['Castille', 'castille@example.com', 'Norway']
  ]
});

doc.autoTable({
  head: [['Name', 'Email', 'Country']],
  body: [
    ['David', 'david@example.com', 'Sweden'],
    ['Castille', 'castille@example.com', 'Norway']
  ]
});
*/

doc.autoTable({
  startY: 7,
  columnStyles:{2: { cellWidth:50, fontSize:8,   fillColor: null},  1: {cellWidth:140,fontSize:8, halign: 'left',fillColor: null},  0: {cellWidth:250,fontSize:8, halign: 'left', fillColor: null} },
  alternateRowStyles:{fontSize:9},
  margin: { left: 15},
  body: [['Jueves, 26 de diciembre de 2019','', '1 de 1' ]]

});

doc.text('Cotización', 230, 55, 'center');

doc.addImage(imageurl, 'PNG', 15, 60, 120, 42);

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
  startY: 101,
  theme:'grid',
  styles: {fillColor: [215,215,215],valign:"top",lineColor:[4,1,0],lineWidth:0.2},
  columnStyles: {0: {halign: 'center'},  }, // Cells in first column centered and green
  margin: {top: 60, right: 15, bottom: 0, left: 15},
  body: [['CLIENTE']]
});

doc.autoTable({
  startY: 117,
  theme:'grid',
  styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
  columnStyles: {0: { cellWidth:235, fontSize:9,  fillColor: null},  1: {fontSize:9, halign: 'left', fillColor: null, cellWidth:180}},
  margin: { left: 15},
  body: [['Nit: ' + this.documentCustomer+' '+this.nameCustomer, 'Contacto: '+ this.contact]]
});

doc.autoTable({
  startY: 133,
  theme:'grid',
  styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
  columnStyles: {0: { cellWidth:100, fontSize:9,  fillColor: null},  1: {fontSize:9, halign: 'left', fillColor: null, cellWidth:100},  2: {fontSize:9, halign: 'left', fillColor: null, cellWidth:214}},
  margin: { left: 15},
  body: [['Telefono: '+ this.cellphone, 'Ciudad: '+ 'Medellín', 'Maquina: '+  'CHEVROLEJTL CHR3566987893 123456543345'  ]]
});

doc.autoTable({
  startY: 148,
  theme:'grid',
  styles: {fillColor: [215,215,215],valign:"top",lineColor:[4,1,0],lineWidth:0.2},
  columnStyles: {0: {halign: 'center'},  }, // Cells in first column centered and green
  margin: {top: 60, right: 15, bottom: 0, left: 15},
  body: [['MANO DE OBRA Y SERVICIOS']]
});

doc.autoTable({
  startY: 164,
  theme:'grid',
  styles: {fillColor: [215,215,215],lineColor:[4,1,0],lineWidth:0.2},
  columnStyles: {0: {halign: 'center', fontSize:9, cellWidth:23}, 1: {halign: 'center', fontSize:9, cellWidth:55},2: {halign: 'center', fontSize:9, cellWidth:185},3: {halign: 'center', fontSize:9, cellWidth:27},4: {halign: 'center', fontSize:9, cellWidth:40}, 5: {halign: 'center', fontSize:9, cellWidth:39}, 6: {halign: 'center', fontSize:9, cellWidth:42}  },
  margin: { left: 15},
  body: [['ITEM','CÓDIGO','DESCRIPCIÓN','CANT.','VLR. UNIT.','TOTAL','ENTREGA']]
});

doc.autoTable({
  startY: 179,
  theme:'grid',
  styles: {fillColor: [215,215,215],valign:"top",lineColor:[4,1,0],lineWidth:0.2},
  columnStyles: {0: {halign: 'center'},  }, // Cells in first column centered and green
  margin: {top: 60, right: 15, bottom: 0, left: 15},
  body: [['REPUESTOS']]
});
let a=[];
a =['1','HNYUCW-0021','LOCKOFF - eaef','1','$385.000','$385.000','5 DIAS'],
['1','HNYUCW-00122','LOCKOFF - efe','1','$385.000','$385.000','5 DIAS'],
['1','HNYUCW-00122','LOCKOFF - ee','1','$385.000','$385.000','5 DIAS']
;

let ss=['ITEM','CÓDIGO','DESCRIPCIÓN','CANT.','VLR. UNIT.','TOTAL','ENTREGA'];
var body_table = [];
 body_table = ['David', 'david@example.com', 'Sweden'], ['David', 'david@example.com', 'Sweden'],['David', 'david@example.com', 'Sweden'];


let y = 195;
for (let i = 0; i < this.rowsItemsparts.length; i++) {

  body_table = [i+1, this.rowsItemsparts[i].code, this.rowsItemsparts[i].description, this.rowsItemsparts[i].quantity, this.rowsItemsparts[i].unit_cost, this.rowsItemsparts[i].price,
  this.rowsItemsparts[i].delivery];

  doc.autoTable({
    startY: y,
    theme:'grid',
    styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
    columnStyles: {0: {halign: 'center', fontSize:8, cellWidth:23}, 1: {halign: 'center', fontSize:8, cellWidth:55},2: {halign: 'left', fontSize:8, cellWidth:185},3: {halign: 'center', fontSize:8, cellWidth:27},4: {halign: 'center', fontSize:8, cellWidth:40}, 5: {halign: 'center', fontSize:8, cellWidth:39}, 6: {halign: 'center', fontSize:8, cellWidth:42}  },
    margin: { left: 15},
    body: [ body_table ]
  });
  y=y+15;
}

doc.autoTable({
  startY: y,
  theme:'grid',
  styles: {fillColor: null,lineColor:[4,1,0],lineWidth:0.2},
  columnStyles: {0: {halign: 'center', fontSize:8, cellWidth:85}, 1: {halign: 'center', fontSize:8, cellWidth:86},2: {halign: 'left', fontSize:8, cellWidth:81},3: {halign: 'center', fontSize:8, cellWidth:80},4: {halign: 'center', fontSize:8, cellWidth:80} },
  margin: { left: 15},
  body: [
  [{content: 'HNYUCW-00128', colSpan: 3, rowSpan: 3, styles: {halign: 'center'}},'Subtotal Mano de Obra','0'],
   ['Total','89000'],
   [{content: 'HNYUCW-00128', colSpan: 2,  styles: {halign: 'center'}}]]
});




/*doc.autoTable({
  styles: {fillColor: [255, 0, 0]},
  columnStyles: {0: {halign: 'center', fillColor: [0, 255, 0]}, }, // Cells in first column centered and green
  margin: {top: 200},
  body: [['Sweden', 'Japan', 'Canada'], ['Norddway', 'China', 'USA'], ['Denmark', 'China', 'Mexico']]
})*/

// Example usage with columnStyles,


// Example usage of columns property. Note that America will not be included even though it exist in the body since there is no column specified for it.
/*doc.autoTable({
  columnStyles: {europe: {halign: 'center'}}, // European countries centered
  body: [{europe: 'Sweden', america: 'Canada', asia: 'China'}, {europe: 'Norway', america: 'Mexico', asia: 'Japan'}],
  columns: [{header: 'Europe', dataKey: 'europe'}, {header: 'Asia', dataKey: 'asia'}]
})*/










doc.save('FirstPdf.pdf');

this.blobGlobal = doc.output('blob');
 /// this.upload();
}


upload() {


  this.uploadService.uploadFileForkliftUpdate4(this.imageps).then(res=>{
    console.log('s3info'+JSON.stringify(res));
    this.s3info=res;
    console.log(this.s3info);
    //this.insertNew();
  }).catch(error=> {
    console.log(error);
    swal({
      type: 'error',
      title: 'Oops a currido un error',
      text: error,
      allowOutsideClick: false
    });
  });
  }



  upload3(image:any) {
    this.uploadService.uploadFileForkliftUpdate3(image).then(res=>{
      console.log('s3info'+JSON.stringify(res));
      this.s3info=res;
      console.log(this.s3info);
      //this.insertNew();
    }).catch(error=> {
      console.log(error);
      swal({
        type: 'error',
        title: 'oops a currido un error',
        text: error,
        allowOutsideClick: false
      });
    });
    }

    createSettlementCondition(){

    // Validar condiciones

    console.log('información de validación'+this.documentCustomer +'-'+ this.selectedBusinessId +'-'+ this.nameCustomer +'-'+ this.selectedDepartmentId +'-'+ this.selectedCityId +'-'+
    this.days +'-'+ this.guaranty +'-'+ this.contact +'-'+
    this.validity);

    // this.selectedBusinessId  != 0
    if(this.documentCustomer !== '' && this.nameCustomer !== '' && this.selectedDepartmentId != 0 && this.selectedCityId != 0 && this.selectedRegionalId != 0  && this.selectedCostCenterId !=0 && this.selectedWarehouseId!=0 && this.contact !== '' && this.cellphone !== ''){
      console.log((this.days.toString()).length);
     // if( (this.days.toString()).length<=2){
     //   if( ( this.guaranty.toString()).length<=3){
    // if((this.validity.toString()).length<=2){

     //   if(this.validateEmail(this.email)){
       console.log('probando '+ this.selectedBusinessId);
          if(this.selectedBusinessId != '' &&  this.selectedBusinessId != 0){
            console.log('ingreso para crear cotizacion ');

            console.log(this.selectedBusinessId);
            this.createSettlement();
         }else{
          console.log('ingreso para crear cliente');

          console.log(this.selectedBusinessId);
           this.createNewCustomer();
         }
      /*  }else{
          swal({
            title: 'Se presento un problema',
            text:'Debe ingresar un correo electrónico valido',
            type: 'error'
           });
        }*/
  /*}else{
    swal({
      title: 'Se presento un problema',
      text:'La validez debe ser menor o igual a 99 días',
      type: 'error'
     });
    }
  }else{
    swal({
      title: 'Se presento un problema',
      text:'La garantia debe  ser menor o igual a 999 días',
      type: 'error'
     });
    }
  }else{
    swal({
      title: 'Se presento un problema',
      text:'La forma de pago debe ser menor o igual a 99 días',
      type: 'error'
     });
    }*/
}else{
  swal({
    title: 'Se presento un problema',
    text:'Debe diligenciar los valores obligatorios(*)',
    type: 'error'
   });
}

  }

 /* validateEmail( email )
{
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
}*/

showSettlementProgramming(){
  swal({
    title: 'Validando información ...',
    allowOutsideClick: false
  });
  swal.showLoading();
  this.switchScheduleOptionOne=false;
  this.switchScheduleOptionSecond=false;
  this.settlementService.getScheduleSettlementCustomer(this.currentSettlement.id).then(data => {
    console.log('data schedule '+data);
    let  respGetSchedule: any = data;
    this.scheduleSettlementCustomer=respGetSchedule.data;

    if(this.scheduleSettlementCustomer.length>0){

      if(this.scheduleSettlementCustomer[0].status==1){
        this.switchScheduleOptionOne=true;
      }

      if(this.scheduleSettlementCustomer[1].status==1){
        this.switchScheduleOptionSecond=true;
      }

      this.selectedScheduleOptionOne = this.scheduleSettlementCustomer[0].day;
      this.selectedScheduleOptionSecond =  this.scheduleSettlementCustomer[1].day;
    }

    document.getElementById('showModalProgramming').click();
    swal.close();

    }).catch(error => {
    console.log(error);
    swal.close();
    });
}

showSettlementEstimateCustomer(){
  swal({
    title: 'Validando información ...',
    allowOutsideClick: false
  });

  let from_date='';
  let to_date='';

  var day = (this.fromDateCustomer.day < 10 ? '0' : '') +this.fromDateCustomer.day;
   // 01, 02, 03, ... 10, 11, 12
   let month = ((this.fromDateCustomer.month) < 10 ? '0' : '') + (this.fromDateCustomer.month);
   // 1970, 1971, ... 2015, 2016, ...
   var year = this.fromDateCustomer.year;

   // until poner los ceros
   var dayUntil = (this.untilDateCustomer.day < 10 ? '0' : '') +this.untilDateCustomer.day;
   // 01, 02, 03, ... 10, 11, 12
   let monthUntil = ((this.untilDateCustomer.month) < 10 ? '0' : '') + (this.untilDateCustomer.month);
   // 1970, 1971, ... 2015, 2016, ...
   var yearUntil = this.untilDateCustomer.year;

   var fromD = year +'-'+ month+'-'+ day;
   var untilD = yearUntil +'-'+ monthUntil+'-'+ dayUntil;

   from_date=fromD+' 00:00:00';
   to_date=untilD+' 23:59:59';
  swal.showLoading();
  console.log('--------------');
  console.log(this.currentSettlement);
  console.log(this.currentSettlement.customer_id);

  let branchOfficesId;

  /*if(this.selectedBranchOfficeId){

    branchOfficesId= Number(this.selectedBranchOfficeId);
  }else{
    branchOfficesId= 0;
  }*/
  console.log('idSede'+branchOfficesId);
  this.settlementService.getSettlementEstimateCustomer(this.selectedBusinessId,this.selectedBranchOfficeId, this.numberPage,from_date,to_date).then(data => {
    let respSettlement:any= data;
    this.itemsEstimate=[];
    this.limitPage=respSettlement.data.last_page;
    console.log('limite de paginas '+this.limitPage);
    this.settlementEstimatesCustomer=respSettlement.data.data;


    this.settlementEstimatesCustomer.forEach((item)=>{

      this.itemsDetailEstimate=[];
      item.estimate_details_settlement.forEach((itemDetail)=>{

        let activeDetail=false;
        console.log('consolidado '+this.selectedItemsDetail+' '+itemDetail.id);
        if(this.selectedItemsDetail.length>0){
          var index = this.selectedItemsDetail.indexOf(itemDetail.id);
          if (index !== -1) {
             activeDetail=true;
          }
        }
        this.itemDetailEstimate={
          id:itemDetail.id,
          code: itemDetail.code,
          description: itemDetail.description,
          quantity: itemDetail.quantity,
          subtotal: itemDetail.total_decimal,
          active: activeDetail
        }

        this.itemsDetailEstimate.push(this.itemDetailEstimate);
      });

      this.itemEstimate={
        estimate_consecutive: item.estimate_consecutive,
        item:this.itemsDetailEstimate
      }

      this.itemsEstimate.push(this.itemEstimate);
    });

    console.log('--oleole-------------');
    console.log('resultado final: ' +JSON.stringify( this.itemsEstimate));
    console.log(this.settlementEstimatesCustomer);

    document.getElementById('checkEstimateCustomers').click();
    swal.close();

    }).catch(error => {
    console.log(error);
    swal.close();
    });
}






checkChangeActive(event:any, item:any){

  console.log('valor para editar');
  console.log(event);
  console.log(item);
  console.log(item.id);
  for (let i = 0; i < this.itemsEstimate.length; i++){
  // let itemsDetail:Array<itemEstimateDetailInterface>=this.itemsEstimate.item;
  for (let j = 0; j < this.itemsEstimate[i].item.length; j++){

    if (this.itemsEstimate[i].item[j].id == item.id){
     this.itemsEstimate[i].item[j].active=event.target.checked;
     if(event.target.checked==true){
      this.selectedItemsDetail.push(item.id);
     }else{
      var index = this.selectedItemsDetail.indexOf(item.id);
      if (index !== -1) {
          this.selectedItemsDetail.splice(index, 1);
      }
     }
   }

  }
 }
 console.log('Consolidado: '+this.selectedItemsDetail);
}


checkChangeActiveForklift(event:any, item:any){

  console.log('valor para editar');
  console.log(event);
  console.log(item);
  console.log(item.id);
  for (let i = 0; i < this.itemsEstimateForklift.length; i++){
  // let itemsDetail:Array<itemEstimateDetailInterface>=this.itemsEstimate.item;
  for (let j = 0; j < this.itemsEstimateForklift[i].item.length; j++){

    if (this.itemsEstimateForklift[i].item[j].id == item.id){
     this.itemsEstimateForklift[i].item[j].active=event.target.checked;
     if(event.target.checked==true){
      this.selectedItemsDetailForklift.push(item.id);
     }else{
      var index = this.selectedItemsDetailForklift.indexOf(item.id);
      if (index !== -1) {
          this.selectedItemsDetailForklift.splice(index, 1);
      }
     }
   }

  }
 }
 console.log('Consolidado: '+this.selectedItemsDetailForklift);
}

checkChangeActiveClients(event:any, item:any){

  console.log('valor para editar');
  console.log(event);
  console.log(item);
  console.log(item.id);
  for (let i = 0; i < this.itemsCopyClient.length; i++){
  // let itemsDetail:Array<itemEstimateDetailInterface>=this.itemsEstimate.item;
  for (let j = 0; j < this.itemsCopyClient[i].item.length; j++){

    if (this.itemsCopyClient[i].item[j].id == item.id){
     this.itemsCopyClient[i].item[j].active=event.target.checked;
     if(event.target.checked==true){
      this.selectedItemsDetailCustomer.push(item.id);
     }else{
      var index = this.selectedItemsDetailCustomer.indexOf(item.id);
      if (index !== -1) {
          this.selectedItemsDetailCustomer.splice(index, 1);
      }
     }
   }

  }
 }
 console.log('Consolidado: '+this.selectedItemsDetailCustomer);
}


deleteItemsSelect(){
  this.selectedItemsDetail=[];
  document.getElementById('hideEstimateCustomers').click();
}

deleteItemsSelectForklift(){
  this.selectedItemsDetailForklift=[];
  document.getElementById('hideEstimateCustomers').click();
}

nextPage(){
  this.numberPage= this.numberPage+1;
  this.showSettlementEstimateCustomer();
}

backPage(){
  if( this.numberPage>1){
    this.numberPage= this.numberPage-1;
    this.showSettlementEstimateCustomer();
  }
}

nextPageMaintenance(){
  this.numberPageMaintenance= this.numberPageMaintenance+1;
  this.showFilterMaintenance();
}

backPageMaintenance(){
  if( this.numberPageMaintenance>1){
    this.numberPageMaintenance= this.numberPageMaintenance-1;
    this.showFilterMaintenance();
  }
}

nextPageForklift(){
  this.numberPageForklift= this.numberPageForklift+1;
  this.showSettlementEstimateForklift();
}

backPageForklift(){
  if( this.numberPageForklift>1){
    this.numberPageForklift= this.numberPageForklift-1;
    this.showSettlementEstimateForklift();
  }
}

cambiocheck(item, value:number){
  if(value == 0){
    item.part = true;
  }
  if(value == 1){
    item.workforce = true;
  }
  console.log(item);
}

showSettlementEstimateForklift(){
  swal({
    title: 'Validando información ...',
    allowOutsideClick: false
  });
  swal.showLoading();
  let from_date='';
  let to_date='';

  var day = (this.fromDateCustomer.day < 10 ? '0' : '') +this.fromDateCustomer.day;
   // 01, 02, 03, ... 10, 11, 12
   let month = ((this.fromDateCustomer.month) < 10 ? '0' : '') + (this.fromDateCustomer.month);
   // 1970, 1971, ... 2015, 2016, ...
   var year = this.fromDateCustomer.year;

   // until poner los ceros
   var dayUntil = (this.untilDateCustomer.day < 10 ? '0' : '') +this.untilDateCustomer.day;
   // 01, 02, 03, ... 10, 11, 12
   let monthUntil = ((this.untilDateCustomer.month) < 10 ? '0' : '') + (this.untilDateCustomer.month);
   // 1970, 1971, ... 2015, 2016, ...
   var yearUntil = this.untilDateCustomer.year;

   var fromD = year +'-'+ month+'-'+ day;
   var untilD = yearUntil +'-'+ monthUntil+'-'+ dayUntil;

   from_date=fromD+' 00:00:00';
   to_date=untilD+' 23:59:59';
  console.log('--------------');
  console.log(this.currentSettlement);
  console.log(this.currentSettlement.customer_id);

  this.settlementService.getSettlementEstimateForklift(this.selectedBusinessId, this.selectedBranchOfficeId,from_date,to_date).then(data => {
    let respSettlementForklift:any= data;
    console.log('data forklift '+JSON.stringify(data));
    this.itemsEstimateForklift=[];
    this.limitPageForklift=respSettlementForklift.lastPage;
    console.log('limite de paginas '+ this.limitPageForklift);
    this.settlementEstimatesForklift=respSettlementForklift.data;


    this.settlementEstimatesForklift.forEach((item)=>{

      this.itemsDetailEstimateForklift=[];
      item.details.forEach((itemDetail)=>{

        let activeDetail=false;
        console.log('consolidado '+this.selectedItemsDetailForklift+' '+itemDetail.id);
        if(this.selectedItemsDetailForklift.length>0){
          var index = this.selectedItemsDetailForklift.indexOf(itemDetail.id);//gestionar seleccionados
          if (index !== -1) {
             activeDetail=true;
          }
        }
        this.itemDetailEstimateForklift={
          id:itemDetail.id,
          code: itemDetail.code,
          description: itemDetail.description,
          quantity: itemDetail.quantity,
          subtotal: itemDetail.total_decimal,
          active: activeDetail
        }

        this.itemsDetailEstimateForklift.push(this.itemDetailEstimateForklift);
      });
      console.log('serie '+item.forklift.serie);
      this.itemEstimateForklift={
        estimate_consecutive: item.forklift.serie,
        item:this.itemsDetailEstimateForklift
      }

      this.itemsEstimateForklift.push(this.itemEstimateForklift);
    });

    console.log('--oleole-------------');
    console.log('resultado final: ' +JSON.stringify( this.itemsEstimateForklift));
    console.log(this.settlementEstimatesForklift);

    document.getElementById('checkEstimateForklift').click();
    swal.close();

    }).catch(error => {
    console.log(error);
    swal.close();
    });
}



showSettlementCopyClient(){
  swal({
    title: 'Validando información ...',
    allowOutsideClick: false
  });
  swal.showLoading();
  console.log('--------------');
  console.log(this.currentSettlement);
  console.log(this.currentSettlement.id);

  this.settlementService.getSettlementEstimateCopyClient(this.currentSettlement.id).then(data => {
    let respSettlementCopyCllient:any= data;
    this.itemsEstimate=[];
    this.limitPage=respSettlementCopyCllient.last_page;
    console.log('info de detalles '+ JSON.stringify(respSettlementCopyCllient.data));
    this.settlementEstimatesCopyClient=respSettlementCopyCllient.data;


    this.settlementEstimatesCopyClient.forEach((item)=>{

      this.itemsDetailCopyClient=[];
      this.itemsCopyClient = [];
      item.settlement_details.forEach((itemDetail)=>{

        let activeDetail=false;
        console.log('consolidado '+this.selectedItemsDetail+' '+itemDetail.id);
        if(this.selectedItemsDetail.length>0){
          var index = this.selectedItemsDetail.indexOf(itemDetail.id);//gestionar seleccionados
          if (index !== -1) {
             activeDetail=true;
          }
        }

        if(itemDetail.type_service==0){
          this.itemDetailCopyClient={
            id:itemDetail.id,
            code: itemDetail.code,
            description: itemDetail.description,
            quantity: itemDetail.quantity,
            subtotal: itemDetail.total_decimal,
            active: activeDetail
          }
        }else{
          this.itemDetailCopyClient={
            id:itemDetail.id,
            code: itemDetail.code,
            description: itemDetail.service,
            quantity: itemDetail.quantity,
            subtotal: itemDetail.total_decimal,
            active: activeDetail
        }
      }
        this.itemsDetailCopyClient.push(this.itemDetailCopyClient);
      });

      this.itemCopyClient={
        estimate_consecutive: item.settlement_consecutive,
        item:this.itemsDetailCopyClient
      }

      this.itemsCopyClient.push(this.itemCopyClient);
    });

    console.log('--oleole-------------');
    console.log('resultado final: ' +JSON.stringify( this.itemsCopyClient));
    console.log(this.settlementEstimatesCopyClient);

    document.getElementById('modalCopyCustomerFormShow').click();
    swal.close();

    }).catch(error => {
    console.log(error);
    swal.close();
    });
}




/*
showSettlementEstimateForklift(){
  swal({
    title: 'Validando información ...',
    allowOutsideClick: false
  });
  swal.showLoading();

  this.settlementService.getSettlementEstimateForklift(this.currentSettlement.customer_id).then(data => {
    let respSettlementForklift:any= data;
    this.settlementEstimatesForklift=respSettlementForklift.data;
    console.log(this.settlementEstimatesForklift);

    // document.getElementById('showModalProgramming').click();
    swal.close();

    }).catch(error => {
    console.log(error);
    swal.close();
    });
} */


showSettlementEmails(){

  if(this.settlementId){
    this.settlementService.getSettlementEmails(this.settlementId).then(data => {
      const resp: any = data;
      console.log('Emails '+JSON.stringify(data));
      this.rowsItemsEmails= resp.data;

     // console.log('ingresoeee ps' + this.rowsItemsEmails[0].success);

      this.settlementSubject = this.rowsItemsEmails.subject;
      this.settlementComment=this.rowsItemsEmails.comment;
      this.rowsItemsEmailsSettlement=this.rowsItemsEmails.emails;


      console.log('ingreeeeso ps');

      this.rowsItemsEmailsSettlement.forEach((item)=>{
        if(item.email){
          this.emailCurrentSettlement={
            id:  item.id,
            email: item.email,
            contact:  item.contact,
         }
         console.log('ingreso ps');
         this.emailsCurrentSettlement.push(this.emailCurrentSettlement);
        }
      });

      console.log(JSON.stringify(this.rowsItemsEmailsSettlement));
      if(this.rowsItemsEmails.check_hide_code==1){
        this.settlementCheckHideCode=true;
      }


    }).catch(error => {
      console.log(error);
    });
  }
  document.getElementById('showModalEmailsSettlement').click();
}



showMaintenance(){
  swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    console.log(this.selectedBranchOfficeMaintenanceId);
    console.log(this.selectedBranchOfficeId);
  if(this.selectedBranchOfficeId != 0  && this.selectedBranchOfficeId != null){
    this.selectedBranchOfficeMaintenanceId = this.selectedBranchOfficeId;
    this.showFilterMaintenance();
   }
  //else{
  //   this.getBranchOffices();
  // }
    this.reportService.getTyeMaintenance().then(data => {
      const resp: any = data;
      this.typeMaintenance = resp.data;
      swal.close();
      console.log(data);
      document.getElementById('modalMaintenanceShow').click();

    }).catch(error => {
      swal({
        title: 'Se presento un problema',
        type: 'error'
       });
      console.log(error);
    });
}

showFilterMaintenance(){

  this.dataMaintenances.length  = 0;
  console.log(this.dataMaintenances);
  try{
    if(this.selectedMaintenanceId != '' ){
      swal({
        title: 'Validando información ...',
        allowOutsideClick: false
      });
      swal.showLoading();
      console.log('este es el valor');
      console.log( this.selectedMaintenanceId);
      this.settlementService.getMaintenanceFilter(this.selectedBranchOfficeMaintenanceId, this.selectedMaintenanceId,this.selectedBusinessId).then(data => {
        const resp: any = data;
        console.log(data);
        this.listMaintenance = resp.data;
        if(this.listMaintenance.length < 1){
          swal({
            title: 'No hay mantenimientos',
            type: 'warning'
           });
        }
        this.listMaintenance.map((item) =>{
          this.dataMaintenance = {
            id: item.id,
            description: item.description,
            type:item.type,
            full_name: item.full_name,
            consecutive: item.consecutive,
            active:false,
            workforce:false,
            part:false,
          }
          this.dataMaintenances.push(this.dataMaintenance);


        })
        // console.log(this.dataMaintenances);
        swal.close();
      }).catch(error => {
        swal({
          title: 'Se presento un problema',
          type: 'error'
         });
        swal.close();
        console.log(error)
      })
    }
  }catch(error) {
    swal({
      title: 'Se presento un problema',
      type: 'error'
     });
    swal.close();
    console.log(error);
  }
}

storeMaintenance(){
  swal({
    title: 'Validando información ...',
    allowOutsideClick: false
  });
  swal.showLoading();
  let maintenance = [];
  for(let data of this.dataMaintenances){
    // console.log(data);
    if(data.part || data.workforce){
      // console.log('data');
      // console.log(data);
      maintenance.push(data);
    }
  }

    this.settlementService.storeSettlementMaintenance(this.settlementId,maintenance).then(data => {
      const resp: any = data;
      // console.log(data);
      this.getSettlementParts();
      this.getSettlementWorkforce();
      swal.close();
      this.cancelSelect();
      document.getElementById('modalMaintenanceHide').click();

    }).catch(error => {
          swal({
            title: 'Se presento un problema',
            type: 'error'
           });
          swal.close();
          console.log(error)
    })
}

  checkCheckAll(event: any) {

    this.checkAll = event.target.checked;
    for (let i = 0; i < this.dataMaintenances.length; i++) {
      console.log('lo encontre' + i);
      this.dataMaintenances[i].active = event.target.checked;
    }
  }

  checkCheckAllPart(event: any) {

    this.checkAllPart = event.target.checked;
    for (let i = 0; i < this.dataMaintenances.length; i++) {
      console.log('lo encontre' + i);
      this.dataMaintenances[i].part = event.target.checked;

    }
  }

  checkCheckAllWorkforce(event: any) {

    this.checkAllWorkforce = event.target.checked;
    for (let i = 0; i < this.dataMaintenances.length; i++) {
      console.log('lo encontre' + i);
      this.dataMaintenances[i].workforce = event.target.checked;

    }

  }

  cancelSelect(){
    this.typeMaintenance = null
    this.selectedMaintenanceId = '';
    this.dataMaintenances.length = 0;
    this.checkAllPart = false;
    this.checkAllWorkforce = false;
    this.selectedBranchOfficeMaintenanceId = 0;
  }

createDetailsEstimateSettlement(){
  swal({
    title: 'Validando información ...',
    allowOutsideClick: false
  });
  swal.showLoading();

  // this.currentSettlement.id
  this.settlementService.copyEstimateToSettlement(this.settlementId,this.selectedItemsDetail ).then(data => {

    let resp:any=data;
   // let respSettlementForklift:any= data;
    //this.settlementEstimatesForklift=respSettlementForklift.data;
    console.log(data);

    if(resp.success==true){
      this.getSettlementParts();
      this.getSettlementWorkforce();

      swal({
        title: 'Se crearon los detalles correctamente',
        type: 'success'
       });

       this.selectedItemsDetail=[];
       document.getElementById('hideEstimateCustomers').click();
    }else{
      swal({
        title: 'Se presento un problema, para guardar los detalles',
        type: 'error'
       });
    }
    this.selectedItemsDetail=[];
     document.getElementById('hideEstimateForklift').click();

    }).catch(error => {
      this.selectedItemsDetail=[];
    console.log(error);
    swal.close();
    });
}


createDetailsSettlementCustomer(){
  swal({
    title: 'Validando información ...',
    allowOutsideClick: false
  });
  swal.showLoading();

  // this.currentSettlement.id
  this.settlementService.copySettlementCustomer(this.settlementId, this.selectedItemsDetailCustomer).then(data => {

    let resp:any=data;
   // let respSettlementForklift:any= data;
    //this.settlementEstimatesForklift=respSettlementForklift.data;
    console.log(data);

    if(resp.success==true){
      this.getSettlementParts();
      this.getSettlementWorkforce();
      this.getSettlementCustomer();

      swal({
        title: 'Se crearon los detalles correctamente',
        type: 'success'
       });

       this.selectedItemsDetailCustomer=[];
       document.getElementById('hideEstimateCustomers').click();
    }else{
      swal({
        title: 'Se presento un problema, para guardar los detalles',
        type: 'error'
       });
    }
    this.selectedItemsDetailCustomer=[];
     document.getElementById('modalCopyCustomerFormHide').click();

    }).catch(error => {
      this.selectedItemsDetailCustomer=[];
    console.log(error);
    swal.close();
    });
}


validationDifference(){
  swal({
    title: 'Validando información ...',
    allowOutsideClick: false
  });
  swal.showLoading();

  // this.currentSettlement.id
  this.settlementService.getValidationDifference(this.settlementId).then(data => {

    let resp:any=data;
   // let respSettlementForklift:any= data;
    //this.settlementEstimatesForklift=respSettlementForklift.data;
    console.log(data);

    if(resp.success==true){

      if(resp.data.difference==0){
        swal({
          title: 'Se creo liquidación correctamente',
          type: 'success'
         });
         this.router.navigateByUrl('maintenance/settlementAll')
      }else{
        let textDifference =' Se presento un problema, los totales presentan diferencia<br> <br> TOTAL HGI: '+resp.data.totalDetail+' <br>  TOTAL CLIENTE: '+resp.data.totalCustomer;
        swal({
          title: textDifference,
          type: 'error'
         });
      }
    }else{
      swal({
        title: 'Se presento un problema, en validando diferencia',
        type: 'error'
       });
    }


    }).catch(error => {

    console.log(error);
    swal.close();
    });
}


createDetailsEstimateSettlementForklift(){
  swal({
    title: 'Validando información ...',
    allowOutsideClick: false
  });
  swal.showLoading();

  // this.currentSettlement.id
  this.settlementService.copyEstimateToSettlement(this.settlementId,this.selectedItemsDetailForklift).then(data => {

    let resp:any=data;
   // let respSettlementForklift:any= data;
    //this.settlementEstimatesForklift=respSettlementForklift.data;
    console.log(data);

    if(resp.success==true){
      this.getSettlementParts();
      this.getSettlementWorkforce();

      swal({
        title: 'Se crearon los detalles correctamente',
        type: 'success'
       });

       document.getElementById('hideEstimateCustomers').click();
    }else{
      swal({
        title: 'Se presento un problema, para guardar los detalles',
        type: 'error'
       });
    }
     this.selectedItemsDetailForklift=[];
     document.getElementById('hideEstimateForklift').click();

    }).catch(error => {
    this.selectedItemsDetailForklift=[];
    console.log(error);
    swal.close();
    });
}

showSettlementEstimateBusiness(){
  document.getElementById('showModalApproval').click();
}


createSettlement() {

    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    //estimate_consecutive: number, custmer_id: number, customer_document: string, department_id: number, city_id: number, forklift_id: number, contact: string, payment_method: number, guaranty: number, validity: number, telephone: string, observation: string, total: number, status: number

    let consecutiveTemp= Number(this.consecutive);

    let customerIdTemp;
console.log('acaaaaaaaaaaaaa');
    // if(this.selectedBusinessId!=0){
      console.log('acaaaaaaaaaaaaa');
    if(this.selectedBusinessId!=0){
      console.log('entro por que existe el cliente');
       customerIdTemp= Number(this.selectedBusinessId.id);
    }else{
      console.log('No existe pero lo creo');
      customerIdTemp= Number(this.idCustomerCreated);
    }// en este else no entraría si funciona
    /*}else{
      console.log('no paso ole');
      // customerIdTemp= Number(this.idCustomerCreated);
      customerIdTemp= Number(this.selectedBusinessId.id);
   }*/

   console.log(customerIdTemp);

    let documentCustomerTemp= this.documentCustomer;
    let nameCustomerTemp = this.nameCustomer;
    let idDepartmentTemp = this.selectedDepartmentId;
    let selectedCityTemp = this.selectedCityId;
    let selectedForkliftIdTemp = this.selectedForkliftId.id;
    let contactTemp = this.contact;
    let selectedRegionalIdTemp= this.selectedRegionalId.id;
    let selectedCostCenterIdTemp= this.selectedCostCenterId.id;
    let selectedWarehouseIdTemp= this.selectedWarehouseId.id;
    let numberEstimateTemp= this.numberEstimate;


   // let daysTemp = this.days;
   // let guarantyTemp = this.guaranty;
   // let validityTemp = this.validity;
    let cellphoneTemp = this.cellphone;
    let observationTemp = this.observation;
   // let forkliftTextTemp=  this. forkliftText;

    this.settlementService.createSettlement(consecutiveTemp,customerIdTemp,documentCustomerTemp,
      idDepartmentTemp, selectedCityTemp, contactTemp, cellphoneTemp, observationTemp,0,'',0,
      selectedRegionalIdTemp, selectedCostCenterIdTemp, selectedWarehouseIdTemp, numberEstimateTemp,0,0,'ol2').then(data => {
      const resp: any = data;
      console.log('respuesta de la api de creacion');
      console.log(resp);
      this.settlementId= resp.data.id;
      this.showSettlementId = false;
      this.showCreateItem = true;
      this.showSaveFile=true;

      console.log('estimate para crear items');
      console.log(this.settlementId);
      console.log('crear cotización');
      console.log(data);

      this.settlementService.updateConsecutive().then(data => {
        const resp: any = data;
        console.log(data);

        swal({
          title: 'Encabezado liquidación creado',
          type: 'success'
         });

         console.log('llego hasta aqui');

        // swal.close();
        // this.rowsClient = resp.data;
        // this.rowStatic =  resp.data;
        // this.rowsTemp = resp.data;
        // console.log( this.rowsClient);
      }).catch(error => {
        swal({
          title: 'Se presento un problema, para guardar este encabezado cotización',
          type: 'error'
         });
        console.log(error);
      });
      // this.rowsClient = resp.data;
      // this.rowStatic =  resp.data;
      // this.rowsTemp = resp.data;
      // console.log( this.rowsClient);
    }).catch(error => {
      console.log(error);
    });
   }


   onChangeworkforceCode(detailCode:any){

    for (let i = 0; i < this.detailCodes.length; i++) {
      if(this.detailCodes[i].full_description==detailCode){
            this.fullCodeWorkforce=this.detailCodes[i];
      }
    }
    console.log(JSON.stringify(this.fullCode));
  }

  onChangeworkforceCodeUpdate(detailCode:any){
    console.log(detailCode);

    for (let i = 0; i < this.detailCodes.length; i++) {
      if(this.detailCodes[i].full_description==detailCode){
            this.fullCodeWorkforceUpdate=this.detailCodes[i];
      }
    }
    console.log(JSON.stringify(this.fullCode));
  }



   validationFullCodeCreateWorkforce(){
    if(this.fullCodeWorkforce){
    // this.indicatorFullCodeCreatePart
     if(this.fullCodeWorkforce.required_subcenter==1){ // Si es true se debe validar subcenter obligatorio
       if(this.selectedSubcostCenterWorkforceId!=0){
         return this.indicatorFullCodeCreateWorkforce=1; //asignamos 1 si esta el subcentro
       }else{
         return this.indicatorFullCodeCreateWorkforce=2; //asignamos 2 si no hay subcento
       }
     }else{
       return this.indicatorFullCodeCreateWorkforce=3; // no require subcenter
      }
    }else{
     return this.indicatorFullCodeCreateWorkforce=4; // no hay code
    }
 // es validar el 2 si devuelve 2 se pide subcenter
    }




    validationFullCodeCreateCustomer(){
      if(this.fullCodeCustomer){
      // this.indicatorFullCodeCreatePart
       if(this.fullCodeCustomer.required_subcenter==1){ // Si es true se debe validar subcenter obligatorio
         if(this.selectedSubcostCenterCustomerId!=0){
           return this.indicatorFullCodeCreateCustomer=1; //asignamos 1 si esta el subcentro
         }else{
           return this.indicatorFullCodeCreateCustomer=2; //asignamos 2 si no hay subcento
         }
       }else{
         return this.indicatorFullCodeCreateCustomer=3; // no require subcenter
        }
      }else{
       return this.indicatorFullCodeCreateCustomer=4; // no hay code
      }
   // es validar el 2 si devuelve 2 se pide subcenter
      }

   validateEmail( email ){
     var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
     return regex.test(email) ? true : false;
 }

 addEmail(){
  console.log('este es el valor de email: '+ this.masterEmail);
  if(this.validateEmail(this.masterEmail)){
    this.contEmailsCurrent=this.contEmailsCurrent+1;
    this.emailCurrentSettlement={
      id: this.contEmailsCurrent,
      contact: this.masterName,
      email: this.masterEmail
    }
    this.emailsCurrentSettlement.push(this.emailCurrentSettlement);
    this.masterEmail='';
    this.masterName='';
  }else{
    swal({
      text:'Debe ingresar un correo electrónico valido',
      type: 'error'
     });
  }
}

deleteEmail(id:number){
  for (let i = 0; i < this.emailsCurrentSettlement.length; i++) {
    if(this.emailsCurrentSettlement[i].id==id){
      this.emailsCurrentSettlement.splice(i,1);
    }
  }
}

    createSettlementDetailWorkforce(){
      swal({
        title: 'Validando información ...',
        allowOutsideClick: false
      });
      swal.showLoading();

       if(this.workforceService!==''){
       if(this.workforceCode!==''){
       let indSubcenter= this.validationFullCodeCreateWorkforce();
         if(indSubcenter!=2){

       let codeTemp;
       if(this.fullCodeWorkforce){
        codeTemp=this.fullCodeWorkforce.code;
       }else{
        codeTemp= this.workforceCode;
       }


       let settlementIdTemp= this.settlementId;
       let fullCodeTemp= this.workforceCode;
       let serviceTemp = this.workforceService;
       let quantityTemp = this.workforcequantity;
       let hourValueTemp = this.changeFormatDecimal(this.workforceHourValue);
       let subtotalTemp = this.changeFormatDecimal(this.totalPriceWorkforce);
       let deliveryTemp = this.workforceDelivery;
       let typeService = 1 ;
       let statusTemp = 0;
       let subcenterId= this.selectedSubcostCenterWorkforceId;
       let discountTemp = this.discountWorkforce;
       let branchOfficePart = this.selectedBranchWorkforce;
       let forkliftPart = this.selectedForkliftWorkforce;

       console.log(settlementIdTemp+'  -  '+codeTemp+'  -  '+serviceTemp+'  -  '+
        quantityTemp+'  -  '+ hourValueTemp+'  -  '+ subtotalTemp+'  -  '+ deliveryTemp+'  -  '+ subtotalTemp+'  -  '+statusTemp+'  -  '+ typeService+'  -  '+
        subcenterId+'  -  '+discountTemp+'  -  '+fullCodeTemp)

       this.settlementService.createSettlementDetailWorkforce(settlementIdTemp,codeTemp,serviceTemp,
        quantityTemp, hourValueTemp, subtotalTemp, deliveryTemp, subtotalTemp,statusTemp, typeService,
        subcenterId,discountTemp,fullCodeTemp,branchOfficePart,forkliftPart).then(data => {
         const resp: any = data;
         swal({
          title: 'Item creado',
          type: 'success'
         });

         document.getElementById('createItemHideDetailWorkforce').click();
         this.clearFormDetailWork();
        // this.getEstimateDetails();
        this.getSettlementParts();
        this.getSettlementWorkforce();

         console.log(resp);
        //  this.assingTotal();
        this.getSettlementSpecific(this.settlementId);
       }).catch(error => {

        swal({
          title: 'Se presento un problema, para guardar este item',
          type: 'error'
         });

         console.log(error);
       });

       console.log('estos son los puntos');



    }else{
      swal({
        title: 'Se presentó un problema',
        text: 'El campo subcentro es requerido es requerido',
        type: 'error'
       });
    }
    }else{
      swal({
        title: 'Se presentó un problema',
        text: 'El campo código es requerido',
        type: 'error'
       });
    }
  }else{
      swal({
        title: 'Se presentó un problema',
        text: 'El campo descripción es requerido',
        type: 'error'
       });
    }

     }



     createSettlementDetailCustomer(){
      swal({
        title: 'Validando información ...',
        allowOutsideClick: false
      });
      swal.showLoading();

       if(this.customerDescription!==''){
       if(this.customerCode!==''){
       let indSubcenter= this.validationFullCodeCreateCustomer();
         if(indSubcenter!=2){

       let codeTemp;
       if(this.fullCodeCustomer){
        codeTemp=this.fullCodeCustomer.code;
       }else{
        codeTemp= this.customerCode;
       }


       let settlementIdTemp= this.settlementId;
       let fullCodeTemp= this.customerCode;
       let serviceTemp = this.customerDescription;
       let quantityTemp = this.customerquantity;
       let priceTemp = this.changeFormatDecimal(this.customerPrice);
       let subtotalTemp = this.changeFormatDecimal(this.customerSubtotal);
       let deliveryTemp = this.customerDelivery;
       let statusTemp = 0;
       let subcenterId= this.selectedSubcostCenterCustomerId;
       let discountTemp = this.discountCustomer;
       let branchOfficePart = this.selectedBranchCustomer;
       let forkliftPart = this.selectedForkliftCustomer;

       this.settlementService.createSettlementDetailsCustomer(settlementIdTemp,codeTemp,serviceTemp,
        quantityTemp, priceTemp, priceTemp, subtotalTemp, deliveryTemp, subtotalTemp,statusTemp,
        subcenterId,discountTemp,fullCodeTemp,branchOfficePart,forkliftPart).then(data => {
         const resp: any = data;
         swal({
          title: 'Item creado',
          type: 'success'
         });

         document.getElementById('createItemHideDetailCustomer').click();
         this.clearFormDetailCustomer();
        // this.getEstimateDetails();
        this.getSettlementParts();
        this.getSettlementWorkforce();
         this.getSettlementCustomer();
         console.log(resp);
       }).catch(error => {

        swal({
          title: 'Se presento un problema, para guardar este item',
          type: 'error'
         });

         console.log(error);
       });

       console.log('estos son los puntos');



    }else{
      swal({
        title: 'Se presentó un problema',
        text: 'El campo subcentro es requerido es requerido',
        type: 'error'
       });
    }
    }else{
      swal({
        title: 'Se presentó un problema',
        text: 'El campo código es requerido',
        type: 'error'
       });
    }
  }else{
      swal({
        title: 'Se presentó un problema',
        text: 'El campo descripción es requerido',
        type: 'error'
       });
    }

     }


   sendEmailEstimate(){

    this.estimateService.sendEstimateEmail(
      this.settlementId, this.emails, 107, this.emailBody, this.emailSubject).then(data => {
      const resp: any = data;

      console.log('envio');
      console.log(resp);


      swal({
        title: 'Item creado',
        type: 'success'
       });

       document.getElementById( 'sendHide').click();
      // this.rowsClient = resp.data;
      // this.rowStatic =  resp.data;
      // this.rowsTemp = resp.data;
      // console.log( this.rowsClient);


    }).catch(error => {
      console.log(error);
    });
   }

   calculateSubtotalWork(){
    console.log('calular de subtotal actualizar');
    let workforceHourValueTemp = this.changeFormatDecimal(this.workforceHourValue);
    let value =  this.workforcequantity*workforceHourValueTemp;
    this.workforceSubtotal = Number(value).toFixed(0);
    let totalWorkforce =  Number((workforceHourValueTemp*this.workforcequantity)-((workforceHourValueTemp*this.workforcequantity)*(this.discountWorkforce/100))).toFixed(0);
    this.totalPriceWorkforce= this.finalFormat(totalWorkforce);
    console.log('this.workforceSubtotal ----- '+this.workforceSubtotal);
    this.finalFormaHourValueSubtotal();
   // this.workforceSubtotal =  this.changeFormatDecimal(this.workforceSubtotal);
   }



   calculateSubtotalCustomer(){
    console.log('calular de subtotal actualizar');
    console.log(this.customerPrice);

    let customerPriceTemp = this.changeFormatDecimal(this.customerPrice);
    let value =  this.customerquantity*customerPriceTemp;
    this.customerSubtotal = Number(value).toFixed(0);
    let totalCustomer =  Number((customerPriceTemp*this.customerquantity)-((customerPriceTemp*this.customerquantity)*(this.discountCustomer/100))).toFixed(0);
    this.totalPriceCustomer= this.finalFormat(totalCustomer);
    console.log('this.workforceSubtotal ----- '+this.workforceSubtotal);
    this.finalFormaCustomerSubtotal();
   // this.workforceSubtotal =  this.changeFormatDecimal(this.workforceSubtotal);

  }

   calculateSubtotalWorkUpdate(){
    console.log('calular de subtotal actualizar');
    let workforceHourValueTempUpdate = this.changeFormatDecimal(this.workforceHourValueUpdate);

    let value =  this.workforcequantityUpdate*workforceHourValueTempUpdate;
    this.workforceSubtotalUpdate = Number(value).toFixed(0);
    let totalWorkforce =  Number((workforceHourValueTempUpdate*this.workforcequantityUpdate)-((workforceHourValueTempUpdate*this.workforcequantityUpdate)*(this.discountWorkforceUpdate/100))).toFixed(0);
    this.totalPriceWorkforceUpdate= this.finalFormat(totalWorkforce);
    console.log('this.workforceSubtotalUpdate ----- '+this.workforceSubtotalUpdate);
    this.finalFormaHourValueSubtotalUpdate();
   // this.workforceSubtotal =  this.changeFormatDecimal(this.workforceSubtotal);
   }

   calculateSubtotalCustomerUpdate(){
    console.log('calular de subtotal actualizar customer');
    let customerPriceUpdate = this.changeFormatDecimal(this.customerPriceUpdate);
    console.log('----' + customerPriceUpdate );
    console.log('----' + this.customerPriceUpdate );

    let value =  this.customerquantityUpdate*customerPriceUpdate;
    this.customerSubtotalUpdate = Number(value).toFixed(0);

    let totalCustomer =  Number((customerPriceUpdate*this.customerquantityUpdate)-((customerPriceUpdate*this.customerquantityUpdate)*(this.discountCustomerUpdate/100))).toFixed(0);
    this.totalPriceCustomerUpdate= this.finalFormat(totalCustomer);
    console.log('Valores ----- '+ customerPriceUpdate);
    console.log('Valores ----- '+ this.customerquantityUpdate);
    console.log('Valores ----- '+ this.discountCustomerUpdate);

    this.finalFormaCustomerSubtotalUpdate();
   // this.workforceSubtotal =  this.changeFormatDecimal(this.workforceSubtotal);
   }



   createNewCustomer() {
      swal({
        title: 'Validando información ...',
        allowOutsideClick: false
      });
      swal.showLoading();

      let margin=Number(this.newCustomerMargin)/100;

      console.log('Ingreso a crear un nuevo cliente');

      this.restService.createCustomerNewCustomer(this.nameCustomer,3, this.documentCustomer,
      this.cellphone, 'Sin Dirección', 0,margin,1,  this.selectedCityId, this.selectedDepartmentId, this.selectedRegionalId)
      .then(data => {
        const resp: any = data;
        console.log(resp);
        console.log('id customer' + resp.data.id);
        if (resp.success === false) {
          swal({
            title: 'Este tercero ya esta registrado',
            text: 'Este tercero no se puede registrar',
            type: 'error'
           });
        } else {
          console.log('---- respuesta de creación de id');
          console.log(resp.data);
          this.idCustomerCreated = resp.data.id;
          console.log('Cambio');

          this.createSettlement();
     /*swal({
      title: 'Tercero agregado',
      type: 'success'
     });*/
  }
      }).catch(error => {
        console.log(error);
      });
  }


//  this.selectedBusinessId != 0 &&

  updateSettlementCondition(){
    console.log('Ingresa ps');
    this.selectedBusinessId

    // this.selectedBusinessId!=0 &&
    if(this.documentCustomer !== '' && this.nameCustomer !== '' && this.selectedDepartmentId != 0 && this.selectedCityId != 0 && this.selectedRegionalId != 0  && this.selectedCostCenterId !=0 && this.selectedWarehouseId!=0 && this.contact !== '' && this.cellphone !== ''){
    console.log(this.selectedWarehouseId);
    console.log(this.selectedCostCenterId);
      console.log('-- '+this.selectedCityId );


      if(this.selectedBusinessId){
        this.updateSettlement();
        console.log('entron ');

        console.log(this.selectedBusinessId);

     }else{
      console.log('entron ');

        console.log(this.selectedBusinessId);
       this.createNewCustomer();
     }

     // if(this.validateEmail(this.email)){

  //  if( this.idCustomerCreated){
   //    this.updateSettlement();
   /*}else{
     this.updateNewCustomer();
   }*/
 /*  }else{
    swal({
      title: 'Se presento un problema',
      text:'Debe ingresar un correo electrónico valido',
      type: 'error'
     });
  }*/
}else{
    swal({
      title: 'Se presento un problema',
      text:'Debe diligenciar los valores obligatorios(*)',
      type: 'error'
     });
  }
  }



  updateSettlement() {

    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    //estimate_consecutive: number, custmer_id: number, customer_document: string, department_id: number, city_id: number, forklift_id: number, contact: string, payment_method: number, guaranty: number, validity: number, telephone: string, observation: string, total: number, status: number

    let customerIdTemp;

    if(this.selectedBusinessId){
      console.log('entroooooooooooooooooooooooooo pssssssssssssssssssssssssssssssss siiiiiiiiiiiii');
       customerIdTemp= Number(this.selectedBusinessId);
    }else{
      console.log('entroooooooooooooooooooooooooo pssssssssssssssssssssssssssssssss siiiiiiiiiiiii');
      customerIdTemp= Number(this.idCustomerCreated);
    }

    let documentCustomerTemp= this.documentCustomer;
    let idDepartmentTemp = this.selectedDepartmentId;
    let selectedCityTemp = this.selectedCityId;
    let contactTemp = this.contact;
    let selectedRegionalIdTemp= this.selectedRegionalId;
    let selectedCostCenterIdTemp= this.selectedCostCenterId;
    let selectedWarehouseIdTemp= this.selectedWarehouseId;
    let cellphoneTemp = this.cellphone;
    let observationTemp = this.observation;
    let numberEstimateTemp= this.numberEstimate;
    let branchOfficeTemp= this.selectedBranchOfficeId;
    let selectedForkliftIdTemp = this.selectedForkliftId;
    let forkliftTextTemp=  this.forkliftText;

    console.log(forkliftTextTemp);

    this.settlementService.updateSettlement(this.settlementId, customerIdTemp,documentCustomerTemp,
      idDepartmentTemp, selectedCityTemp, contactTemp, cellphoneTemp, observationTemp, selectedRegionalIdTemp,
      selectedCostCenterIdTemp, selectedWarehouseIdTemp,numberEstimateTemp,branchOfficeTemp, selectedForkliftIdTemp,
      forkliftTextTemp).then(data => {

      swal.close();
      console.log('dataUpdate '+JSON.stringify(data));
      const resp: any = data;
      console.log(resp.data);
      this.settlementId= resp.data.id;
      this.showSettlementId = false;
      this.showCreateItem = true;
      this.showSaveFile = true;

      // this.rowsClient = resp.data;
      // this.rowStatic =  resp.data;
      // this.rowsTemp = resp.data;
      // console.log( this.rowsClient);
    }).catch(error => {
      swal({
        title: 'Se presento un problema, para guardar este encabezado cotización',
        type: 'error'
       });
      console.log(error);
    });
   }


 getBase64Images2(img) {

  let baseImage = new Image;
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
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

pp(){
  this.getBase64ImageFromUrl('https://masterforklift.s3.amazonaws.com/estimate_files/ole.jpeg')
  .then(result => console.log(result))
  .catch(err => console.error(err));
}

formatValue(inputTrm){
  console.log(inputTrm);
  var num = inputTrm.toString().replace(/\./g,'');
  if(!isNaN(num)){
  console.log('Ingreso ps');
  num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
  num = num.split('').reverse().join('').replace(/^[\.]/,'');
 console.log(num);
 return num;
}else{
console.log('Solo se permiten numeros');
//this.trmGeneralUsa= inputTrm.value.replace(/[^\d\.]*/g,'');
}
}

 // separador para los decimales
 finalFormat(num){
  num +='';
  var splitStr = num.split('.');
  var splitLeft = splitStr[0];
  var splitRight = splitStr.length > 1 ? ',' + splitStr[1] : '';
  var regx = /(\d+)(\d{3})/;
  while (regx.test(splitLeft)) {
  splitLeft = splitLeft.replace(regx, '$1' + '.' + '$2');
  console.log(splitLeft);
  }
  console.log('Importante oleole');
  console.log('------IL-----');
  console.log(splitLeft +splitRight);
  return  splitLeft +splitRight;
  }

  calculateSubtotal(){
    let priceTemp = this.changeFormatDecimal(this.price);
     // =this.price.toString().replace('.','').replace(',','.');
     let value =  priceTemp*this.quantity;
     console.log('descuento test'+ this.discountPart);
     let totalPart =  Number((priceTemp*this.quantity)-((priceTemp*this.quantity)*(this.discountPart/100))).toFixed(0);
     this.subtotal= this.finalFormat(value);
     this.totalPrice= this.finalFormat(totalPart);
    console.log('subtotal--- ' + this.subtotal);

  }


  calculateSubtotalUpdate(){
    let priceUpdateTemp = this.changeFormatDecimal(this.priceUpdate);
     // =this.price.toString().replace('.','').replace(',','.');
    let value =  priceUpdateTemp*this.quantityUpdate;
     this.subtotalUpdate= this.finalFormat(value);
     let totalPartUpdate =  Number((priceUpdateTemp*this.quantityUpdate)-((priceUpdateTemp*this.quantityUpdate)*(this.discountPartUpdate/100))).toFixed(0);
     this.totalPriceUpdate= this.finalFormat(totalPartUpdate);
    console.log('subtotal-- ' + this.subtotalUpdate);

  }






  finalFormatPrice(){
    var num = this.changeFormatDecimal(this.price); //.toString().replace('.','').replace(',','.');
    num +='';
    var splitStr = num.split('.');
    var splitLeft = splitStr[0];
    var splitRight = splitStr.length > 1 ? ',' + splitStr[1] : '';
    var regx = /(\d+)(\d{3})/;
    while (regx.test(splitLeft)) {
    splitLeft = splitLeft.replace(regx, '$1' + '.' + '$2');
    console.log(splitLeft);
    }
    console.log('Importante oleole');
    console.log(splitLeft +splitRight);
    this.price=splitLeft +splitRight;
    }


    finalFormaHourValue(){
      var num = this.changeFormatDecimal(this.workforceHourValue); // this.changeFormatDecimal(this.workforceHourValue);
      console.log(num);
      num +='';
      var splitStr = num.split('.');
      var splitLeft = splitStr[0];
      var splitRight = splitStr.length > 1 ? ',' + splitStr[1] : '';
      var regx = /(\d+)(\d{3})/;
      while (regx.test(splitLeft)) {
      splitLeft = splitLeft.replace(regx, '$1' + '.' + '$2');
      console.log(splitLeft);
      }
      console.log('Importante oleole');
      console.log(splitLeft +splitRight);
      this.workforceHourValue=splitLeft +splitRight;
      }

      finalFormaHourValueCustomer(){
        var num = this.changeFormatDecimal(this.customerPrice); // this.changeFormatDecimal(this.workforceHourValue);
        console.log(num);
        num +='';
        var splitStr = num.split('.');
        var splitLeft = splitStr[0];
        var splitRight = splitStr.length > 1 ? ',' + splitStr[1] : '';
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
        splitLeft = splitLeft.replace(regx, '$1' + '.' + '$2');
        console.log(splitLeft);
        }
        console.log('Importante oleole');
        console.log(splitLeft +splitRight);
        this.customerPrice=splitLeft +splitRight;
        }

      finalFormaCustomerUpdate(){
        var num = this.changeFormatDecimal(this.customerPriceUpdate); // this.changeFormatDecimal(this.workforceHourValue);
        console.log(num);
        num +='';
        var splitStr = num.split('.');
        var splitLeft = splitStr[0];
        var splitRight = splitStr.length > 1 ? ',' + splitStr[1] : '';
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
        splitLeft = splitLeft.replace(regx, '$1' + '.' + '$2');
        console.log(splitLeft);
        }
        console.log('Importante oleole');
        console.log(splitLeft +splitRight);
        this.customerPriceUpdate=splitLeft +splitRight;
        }

      finalFormaHourValueSubtotal(){
        var num = this.workforceSubtotal;//this.changeFormatDecimal(this.workforceSubtotal); // this.changeFormatDecimal(this.workforceHourValue);
        console.log(num);
        num +='';
        var splitStr = num.split('.');
        var splitLeft = splitStr[0];
        var splitRight = splitStr.length > 1 ? ',' + splitStr[1] : '';
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
        splitLeft = splitLeft.replace(regx, '$1' + '.' + '$2');
        console.log(splitLeft);
        }
        console.log('Importante oleole');
        console.log(splitLeft +splitRight);
        this.workforceSubtotal=splitLeft +splitRight;
        }


        finalFormaCustomerSubtotal(){
          var num = this.customerSubtotal;//this.changeFormatDecimal(this.customerSubtotal); // this.changeFormatDecimal(this.workforceHourValue);
          console.log(num);
          num +='';
          var splitStr = num.split('.');
          var splitLeft = splitStr[0];
          var splitRight = splitStr.length > 1 ? ',' + splitStr[1] : '';
          var regx = /(\d+)(\d{3})/;
          while (regx.test(splitLeft)) {
          splitLeft = splitLeft.replace(regx, '$1' + '.' + '$2');
          console.log(splitLeft);
          }
          console.log('Importante oleole');
          console.log(splitLeft +splitRight);
          this.customerSubtotal=splitLeft +splitRight;
          }

          finalFormaCustomerSubtotalUpdate(){
            var num = this.customerSubtotalUpdate;//this.changeFormatDecimal(this.workforceSubtotalUpdate); // this.changeFormatDecimal(this.workforceHourValue);
            console.log(num);
            num +='';
            var splitStr = num.split('.');
            var splitLeft = splitStr[0];
            var splitRight = splitStr.length > 1 ? ',' + splitStr[1] : '';
            var regx = /(\d+)(\d{3})/;
            while (regx.test(splitLeft)) {
            splitLeft = splitLeft.replace(regx, '$1' + '.' + '$2');
            console.log(splitLeft);
            }
            console.log('Importante oleole');
            console.log(splitLeft +splitRight);
            this.customerSubtotalUpdate=splitLeft +splitRight;
            }

        finalFormaHourValueSubtotalUpdate(){
          var num = this.workforceSubtotalUpdate;//this.changeFormatDecimal(this.workforceSubtotalUpdate); // this.changeFormatDecimal(this.workforceHourValue);
          console.log(num);
          num +='';
          var splitStr = num.split('.');
          var splitLeft = splitStr[0];
          var splitRight = splitStr.length > 1 ? ',' + splitStr[1] : '';
          var regx = /(\d+)(\d{3})/;
          while (regx.test(splitLeft)) {
          splitLeft = splitLeft.replace(regx, '$1' + '.' + '$2');
          console.log(splitLeft);
          }
          console.log('Importante oleole');
          console.log(splitLeft +splitRight);
          this.workforceSubtotalUpdate=splitLeft +splitRight;
          }

        finalFormatStandard(priceUpdate:any){
          var num = priceUpdate;//this.changeFormatDecimal(priceUpdate); // this.changeFormatDecimal(this.workforceHourValue);
          console.log(num);
          num +='';
          var splitStr = num.split('.');
          var splitLeft = splitStr[0];
          var splitRight = splitStr.length > 1 ? ',' + splitStr[1] : '';
          var regx = /(\d+)(\d{3})/;
          while (regx.test(splitLeft)) {
          splitLeft = splitLeft.replace(regx, '$1' + '.' + '$2');
          console.log(splitLeft);
          }
          console.log('Importante oleole');
          console.log(splitLeft +splitRight);
          num=splitLeft +splitRight;
          console.log('Boom');
          console.log(num);
          return num;
        }


        finalFormatPriceUpdate(){
          var num = this.changeFormatDecimal(this.priceUpdate); //.toString().replace('.','').replace(',','.');
          num +='';
          var splitStr = num.split('.');
          var splitLeft = splitStr[0];
          var splitRight = splitStr.length > 1 ? ',' + splitStr[1] : '';
          var regx = /(\d+)(\d{3})/;
          while (regx.test(splitLeft)) {
          splitLeft = splitLeft.replace(regx, '$1' + '.' + '$2');
          console.log(splitLeft);
          }
          console.log('Importante oleole');
          console.log(splitLeft +splitRight);
          this.priceUpdate=splitLeft +splitRight;
          }


      clearFormDetail(){
          this.code='';
          this.description='';
          this.quantity=1;
          this.unitCost=0;
          this.weight=0;
          this.weightTypeList=0;
          this.priceList=0;
          this.suggestedPrice=0;
          this.price=0;
          this.subtotal=0;
          this.deliveryPart=0;
          this.totalPrice=0;
          this.selectedSubcostCenterId=0;
          this.fullCode=null;
          this.discountPart=0;
          this.selectedBranchPart = 0;
          this.selectedForkliftPart = 0;
        }

        clearFormDetailUpdate(){
          this.codeUpdate='';
          this.descriptionUpdate='';
          this.quantityUpdate=1;
          this.unitCostUpdate=0;
          this.weightUpdate=0;
          this.weightTypeListUpdate=0;
          this.priceListUpdate=0;
          this.suggestedPriceUpdate=0;
          this.priceUpdate=0;
          this.subtotalUpdate=0;
          this. deliveryPartUpdate=0;
          this.selectedBranchPart = 0;
          this.selectedForkliftPart = 0;
        }

        clearFormDetailWork(){
          this.workforceCode='';
          this.workforceService='';
          this.workforcequantity=1;
          this.workforceHourValue=0;
          this.workforceSubtotal=0;
          this.workforceDelivery=0;
          this.selectedSubcostCenterWorkforceId=0;
          this.discountWorkforce=0;
          this.selectedBranchWorkforce = 0;
          this.selectedForkliftWorkforce = 0;
        }


        clearFormDetailCustomer(){
          this.customerCode='';
          this.customerDescription='';
          this.customerquantity=1;
          this.customerPrice=0;
          this.customerSubtotal=0;
          this.customerDelivery=0;
          this.selectedSubcostCenterCustomerId=0;
          this.discountCustomer=0;
          this.selectedBranchCustomer = 0;
          this.selectedForkliftCustomer = 0;
        }

        clearFormDetailCustomerUpdate(){
          this.customerCodeUpdate='';
          this.customerServiceUpdate='';
          this.customerquantityUpdate=1;
          this.customerPriceUpdate=0;
          this.customerSubtotalUpdate=0;
          this.customerDeliveryUpdate=0;
          this.selectedSubcostCenterCustomerUpdateId=0;
          this.discountCustomerUpdate=0;
          this.selectedBranchCustomer = 0;
          this.selectedForkliftCustomer = 0;
        }

        clearFormDetailWorkUpdate(){
          this.workforceCode='';
          this.workforceService='';
          this.workforcequantity=1;
          this.workforceHourValue=0;
          this.workforceSubtotal=0;
          this.workforceDeliveryUpdate=0;
          this.selectedSubcostCenterWorkforceUpdateId=0;
          this.discountWorkforceUpdate=0;
          this.selectedBranchWorkforce = 0;
          this.selectedForkliftWorkforce = 0;
        }

        cancelFormDetail(){
          document.getElementById('createItemHide').click();
          this.clearFormDetail();
        }

        cancelFormDetailUpdate(){
          document.getElementById('updateItemHide').click();
          this.clearFormDetailUpdate();
        }

        cancelFormWorkCreate(){
          document.getElementById('createHideWorkforce').click();
          this.clearFormDetailWork();
        }


        cancelFormCustomerCreate(){
          document.getElementById('createItemHideDetailCustomer').click();
         this.clearFormDetailCustomer();
        }


        cancelFormDetailWorkforceUpdate(){
          document.getElementById('updateHideWorkforce').click();
          this.clearFormDetailWorkUpdate();
        }

        cancelFormCustomerUpdate(){
          document.getElementById('updateHideCustomer').click();
          this.clearFormDetailCustomerUpdate();
        }
        //funcion limpiar y validar campos obligatorios


        getWeekdayShortName(weekday: number): string {
          return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
        }
        getMonthShortName(month: number): string {
          return I18N_VALUES[this._i18n.language].months[month - 1];
        }
        getMonthFullName(month: number): string {
          return this.getMonthShortName(month);
        }
}
