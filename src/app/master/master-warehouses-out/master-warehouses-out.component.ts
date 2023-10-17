import { Component, OnInit, ViewChild, Injectable } from '@angular/core';

declare let jsPDF;
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { NgbCalendar, NgbDateParserFormatter, NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../../master-services/Rest/rest.service';
import { ForkliftService } from '../../master-services/Forklift/forklift.service';
import { UploadService } from '../../master-services/services/upload.service';
import { UserService } from '../../master-services/User/user.service';
import { EstimateService } from '../../master-services/estimate/estimate.service';
//import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';


/*interface jsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}*/

import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DomEventsPlugin } from '@angular/platform-browser/src/dom/events/dom_events';
import { async } from '@angular/core/testing';


const I18N_VALUES = {
  'fr': {
    weekdays: ['Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb', 'Dom'],
    months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Agos', 'Sep', 'Oct', 'Nov', 'Dic'],
  }
  // other languages you would support
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
  url?: string;
}


@Injectable()
export class I18n {
  language = 'fr';
}


@Component({
  selector: 'app-master-warehouses-out',
  templateUrl: './master-warehouses-out.component.html',
  styleUrls: ['./master-warehouses-out.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss'],
  providers: [I18n, { provide: NgbDatepickerI18n, useClass: MasterWarehousesOutComponent }]
})
export class MasterWarehousesOutComponent implements NgbDatepickerI18n {
  @ViewChild('myTable') table: any;

  public rows: any[] = [];
  public expanded: any = {};
  public timeout: any;

  public userModel = {
    id: 0,
    name: "",
    roles: []
  };





  names = ['', 'Juan', 'Pedro'];
  modelPopup: any;
  modelPorpup: any;

  emailsSend: Array<emailFormat> = [];
  emailSend: emailFormat;

  filesImage: Array<fileImage> = [];
  fileImage: fileImage;

  myForm: FormGroup;
  myFormUpdate: FormGroup;
  rowsClient: any;
  rowsTemp: any;
  rowStatic: any;
  a: any = 5;
  kilo: any;
  elementDelete: any;
  indice: number = 0;
  comment: '';
  images: Array<any> = [];
  switchCreate = true;
  switchUpdate = true;
  change = true;
  active = false;
  inactive = false;
  enabledUpdated = false;

  filterIndicatorText = false;
  filterIndicatorCheck = false;

  checkHideCode = false;// false por defecto
  filesEstimateImage: any;

  extImageOne: string;
  extImageTwo: string;
  extImageThree: string;
  extImageFour: string;

  rowsTempCheck: any;
  rowsTempText: any;

  currentBrand: any;

  forklifts: any;

  part: any = '';
  codepart: any = '';

  numberEstimate: any = '';

  subject: any = '';
  message: any;
  emails: any;
  quantityItem: any;

  checkAllWorkForce = false;
  checkAllPart = false;
  considerDate = true;

  listStatus: any = [];

  selectedBusinessId: any = 0;
  selectedForkliftId: any = 0;
  selectedBranchId: any = 0;
  selectedUserId: any = 0;
  customerOffices: any = 0;
  rowsUser: any;
  rowsItemsparts: any;
  rowsItemsWorkforce: any;
  estimateId: any;
  blobGlobal: any;

  forkliftText: any = '';
  cityEstimate: any = '';
  guarantyEstimate: any = '';
  validity: any = '';
  payment_method: any = '';
  subtotalHoursEstimate: any = '';
  subtotalPartsEstimate: any = '';
  totalEstimate: any = '';
  observationEstimate: any = '';

  user: any;
  consecutive: any;
  documentCustomer: any;
  nameCustomer: any;
  contact: any;
  cellphone: any;

  estimateCurrent: any;

  s3info: any;
  detailform: FormGroup;

  masterEmail: any;
  masterName: any;

  rowsItemsWorkforceApproval: any;
  rowsItemsPartsApproval: any;

  itemsWorkforce: Array<itemSelectInterface> = [];
  itemWorkforce: itemSelectInterface;

  itemsPart: Array<itemSelectInterface> = [];
  itemPart: itemSelectInterface;

  itemsFinalApproval: Array<itemSelectInterface> = [];

  rejectionsEstimate: any;
  imageGlobal: any;

  columns = [
    { name: 'Estado', prop: 'status' }
  ];

  columnWidths = [
    { column: "status", width: 200 }
  ];

  partUpdateTemp: any;

  fromDate: NgbDateStruct;
  untilDate: NgbDateStruct;
  today = this.calendar.getToday();
  masterSelected: boolean;
  checklist: any;

  emailCustomer: any = '';
  emailShow: any = '';


  selectedCustomer: any = 0;
  selectedBranchOffice: any = 0;
  selectedTechnician: any = 0;
  selectForkLift: any;


  selectedCustomerUpdate: any = 0;
  selectedBranchOfficeUpdate: any = 0;
  selectedTechnicianUpdate: any = 0;
  selectForkLiftUpdate: any = 0;

  typeDocuments: any;
  customers: any;
  branchOffices: any;
  forkLift: any;
  technicians: any;

  typeDocumentsUpdate: any;
  customersUpdate: any;
  branchOfficesUpdate: any;
  forkLiftUpdate: any;
  techniciansUpdate: any;
  warehousesout: any;
  quantitys = 0;
  value = 0;

  submitted = false;
  idwarehousesout: any;
  referenceChecklist: any;
  descriptionChecklist: any;
  controlChecklist: any;
  estimateChecklist: any;
  liquidationChecklist: any;
  billChecklist: any;

  referenceList: any = [];
  descriptionList: any = [];
  controlList: any = [];
  estimateList: any = [];
  liquidationList: any = [];
  billList: any = [];

  constructor(private restService: RestService, private _i18n: I18n, private router: Router, private estimateService: EstimateService, private forkliftService: ForkliftService,
    private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private userService: UserService, private uploadService: UploadService, private formbuilder: FormBuilder) {
    //  super();


    const subject = new FormControl('', Validators.required);
    //const work = new FormControl('');
    const comment = new FormControl('');
    this.detailform = this.formbuilder.group({
      subject: subject,
      emails: this.formbuilder.array([
        this.formbuilder.group({
          email: ['']
        }),
        this.formbuilder.group({
          name: ['']
        })
      ]),
      comment: comment
    })

    var date = new Date();
    var ngbDateStruct = { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() };

    /*
    this.fetch((data) => {
      this.rows = data;
      console.log('datatatatatatatata');
      console.log(data);
      console.log(this.rows);
    });
     */

    this.fromDate = ngbDateStruct;
    this.untilDate = ngbDateStruct;

    console.log(this.fromDate);
    console.log(this.untilDate);

    this.getUser();
    this.masterSelected = false;
    this.checklist = [
      { id: 1, value: 'APROBADO', isSelected: false },
      { id: 2, value: 'ENVIADO', isSelected: false },
      { id: 3, value: 'GENERADO', isSelected: false },
      { id: 4, value: 'RECHAZADO', isSelected: false }
    ];

    this.loadingData();
    //this.getCustomer();
    this.getWarehousesOut();
    this.getCustomers();
    this.getTechnician();
    this.getDescription();
    this.getReference();
    this.getControl();
    this.getEstimate();
    this.getLiquidation();
    this.getBill();

    const customer = new FormControl('', Validators.required);
    const branchOffice = new FormControl('', Validators.required);
    const technician = new FormControl('', Validators.required);
    const quantity = new FormControl('', Validators.required);
    const reference = new FormControl('', Validators.required);
    const unitCost = new FormControl('', Validators.required);
    const totalCost = new FormControl('', Validators.required);
    const descriptions = new FormControl('', Validators.required);
    const control = new FormControl('');
    const estimate = new FormControl('', Validators.required);
    const consumption = new FormControl('', Validators.required);
    const observation = new FormControl('', Validators.required);
    const liquidation = new FormControl('');
    const bill = new FormControl('');
    const forkliftControl = new FormControl('');


    const customerUpdate = new FormControl('', Validators.required);
    const branchOfficeUpdate = new FormControl('', Validators.required);
    const technicianUpdate = new FormControl('', Validators.required);
    const quantityUpdate = new FormControl('', Validators.required);
    const referenceUpdate = new FormControl('', Validators.required);
    const unitCostUpdate = new FormControl('', Validators.required);
    const totalCostUpdate = new FormControl('', Validators.required);
    const descriptionsUpdate = new FormControl('', Validators.required);
    const controlUpdate = new FormControl('');
    const estimateUpdate = new FormControl('', Validators.required);
    const consumptionUpdate = new FormControl('', Validators.required);
    const observationUpdate = new FormControl('', Validators.required);
    const billUpdate = new FormControl('', Validators.required);
    const liquidationUpdate = new FormControl('');
    const forkliftControlUpdate = new FormControl('', Validators.required);

    this.myForm = new FormGroup({
      customer: customer,
      branchOffice: branchOffice,
      technician: technician,
      quantity: quantity,
      reference: reference,
      unitCost: unitCost,
      totalCost: totalCost,
      descriptions: descriptions,
      control: control,
      estimate: estimate,
      consumption: consumption,
      observation: observation,
      liquidation: liquidation,
      bill: bill,
      forkliftControl: forkliftControl,
    });

    this.myFormUpdate = new FormGroup({
      customerUpdate: customerUpdate,
      branchOfficeUpdate: branchOfficeUpdate,
      technicianUpdate: technicianUpdate,
      quantityUpdate: quantityUpdate,
      referenceUpdate: referenceUpdate,
      unitCostUpdate: unitCostUpdate,
      totalCostUpdate: totalCostUpdate,
      descriptionsUpdate: descriptionsUpdate,
      controlUpdate: controlUpdate,
      estimateUpdate: estimateUpdate,
      consumptionUpdate: consumptionUpdate,
      observationUpdate: observationUpdate,
      liquidationUpdate: liquidationUpdate,
      billUpdate: billUpdate,
      forkliftControlUpdate: forkliftControlUpdate
    });
  }

  getWarehousesOut() {
    this.restService.getWarehousesOut().then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      this.warehousesout = resp.data_warehousesOut;
      console.log(this.warehousesout);
      console.log(this.warehousesout.length);
      this.rows = this.warehousesout;
      this.rowsClient = this.warehousesout;

      console.log(this.rows);
      console.log('isefuiowesdl')
      console.log(this.rowsClient);
    }).catch(error => {
      console.log(error);
    });
  }

  getCustomers() {
    this.restService.getCustomers().then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      this.customers = resp.data;
    }).catch(error => {
      console.log(error);
    });
  }

  getCustomersUpdate(row: any) {
    this.restService.getCustomers().then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      this.customers = resp.data;

      this.selectedCustomerUpdate = row.customer_id;
      this.selectedTechnicianUpdate = row.technician_id;
      this.selectedBranchOfficeUpdate = row.branch_offices_id;;
    }).catch(error => {
      console.log(error);
    });
  }


  getOffices(idCustomer: number) {
    console.log(idCustomer);
    this.restService.getCustomerOffice(idCustomer).then(data => {
      console.log('que mas ps');
      const resp: any = data;
      console.log(resp);
      this.branchOffices = resp.data_branchoffices;
      console.log('master');
      swal.close();
      console.log(this.branchOffices);
    }).catch(error => {
      console.log(error);
    });
  }

  getForkLift(idOffice: number) {
    console.log(idOffice);
    this.restService.getForkLift(idOffice).then(data => {
      console.log('que mas ps');
      const resp: any = data;
      console.log(resp);
      this.forkLift = resp.data;
      console.log('master');
      swal.close();
      console.log(this.forkLift);
    }).catch(error => {
      console.log(error);
    });
  }

  getTechnician() {
    console.log();
    this.restService.getTechnician().then(data => {
      console.log('que mas ps');
      const resp: any = data;
      console.log(resp);
      this.technicians = resp.data;
      console.log('master');
      swal.close();
      console.log(this.technicians);
    }).catch(error => {
      console.log(error);
    });
  }

  getReference() {
    console.log('reference');
    this.restService.getReferences().then(data => {
      console.log('que mas ps');
      const resp: any = data;
      console.log(resp);
      this.referenceChecklist = resp.data_warehousesOut;
      console.log('master');
      swal.close();
      console.log(this.referenceChecklist);
    }).catch(error => {
      console.log(error);
    });
  }

  getDescription() {
    console.log('description');
    this.restService.getDescriptions().then(data => {
      console.log('que mas ps');
      const resp: any = data;
      console.log(resp);
      this.descriptionChecklist = resp.data_warehousesOut;
      console.log('master');
      swal.close();
      console.log(this.descriptionChecklist);
    }).catch(error => {
      console.log(error);
    });
  }

  getControl() {
    console.log('control');
    this.restService.getControls().then(data => {
      console.log('que mas ps');
      const resp: any = data;
      console.log(resp);
      this.controlChecklist = resp.data_warehousesOut;
      console.log('master');
      swal.close();
      console.log(this.controlChecklist);
    }).catch(error => {
      console.log(error);
    });
  }

  getEstimate() {
    console.log('estimate');
    this.restService.getEstimates().then(data => {
      console.log('que mas ps');
      const resp: any = data;
      console.log(resp);
      this.estimateChecklist = resp.data_warehousesOut;
      console.log('master');
      swal.close();
      console.log(this.estimateChecklist);
    }).catch(error => {
      console.log(error);
    });
  }

  getLiquidation() {
    console.log('liquidation');
    this.restService.getSettlements().then(data => {
      console.log('que mas ps');
      const resp: any = data;
      console.log(resp);
      this.liquidationChecklist = resp.data_warehousesOut;
      console.log('master');
      swal.close();
      console.log(this.liquidationChecklist);
    }).catch(error => {
      console.log(error);
    });
  }

  getBill() {
    console.log('bill');
    this.restService.getInvoices().then(data => {
      console.log('que mas ps');
      const resp: any = data;
      console.log(resp);
      this.billChecklist = resp.data_warehousesOut;
      console.log('master');
      swal.close();
      console.log(this.billChecklist);
    }).catch(error => {
      console.log(error);
    });
  }

  ChangingValue() {
    console.log('Cambio cliente');
    console.log(this.selectedCustomer);
    this.getOffices(this.selectedCustomer);
  }

  changingValue() {
    console.log('Cambio cliente');
    console.log(this.selectedBusinessId);
    this.getOffices(this.selectedBusinessId);
  }

  ChangingValueUpdate() {
    console.log('Cambio cliente');
    console.log(this.selectedCustomerUpdate);
    this.getOffices(this.selectedCustomerUpdate);
  }

  ChangingValueBranch() {
    console.log('Cambio sede');
    console.log(this.selectedBranchOffice);
    console.log(this.selectedBranchOffice.id);
    this.getForkLift(this.selectedBranchOffice.id);
  }

  changingValueBranch() {
    console.log('Cambio sede');
    console.log(this.selectedBranchId);
    console.log(this.selectedBranchId.id);
    this.getForkLift(this.selectedBranchId);
  }

  ChangingValueBranchUpdate() {
    console.log('Cambio sede');
    console.log(this.selectedBranchOfficeUpdate);
    console.log(this.selectedBranchOfficeUpdate.id);
    this.getForkLift(this.selectedBranchOfficeUpdate.id);
  }

  calculateTotal() {
    this.quantitys = this.myForm.get('quantity').value;
    console.log(this.quantitys);
    this.value = this.myForm.get('unitCost').value;
    console.log(this.value);
    let total;
    total = Number(this.value * this.quantitys).toFixed(0);
    console.log(total);
    this.myForm.get('totalCost').setValue(total);

  }

  finalFormatPrice() {
    var num = this.myForm.get('totalCost').value; //.toString().replace('.','').replace(',','.');
    console.log(num);
    num += '';
    console.log(num);
    var splitStr = num.split('.');
    var splitLeft = splitStr[0];
    var splitRight = splitStr.length > 1 ? ',' + splitStr[1] : '';
    var regx = /(\d+)(\d{3})/;
    while (regx.test(splitLeft)) {
      splitLeft = splitLeft.replace(regx, '$1' + '.' + '$2');
      console.log(splitLeft);
    }
    console.log('Importante oleole');
    console.log(splitLeft + splitRight);
    var total = splitLeft + splitRight;
    console.log(total);
    this.myForm.get('totalCost').setValue(total);
  }

  sendWarehousesOut() {
    console.log('enviar');
    if (Number(this.selectedCustomer) !== 0 && Number(this.selectedBranchOffice) !== 0 && Number(this.selectedTechnician) !== 0) {
      this.submitted = true;
      if (!this.myForm.invalid) {
        swal({
          title: 'Validando información ...',
          allowOutsideClick: false
        });
        swal.showLoading();
        console.log(this.selectForkLift);
        console.log(this.selectedBranchOffice);
        console.log(this.selectedBranchOffice.id);
        console.log(this.selectedCustomer, this.selectedTechnician, this.selectedBranchOffice.id,
          this.myForm.get('quantity').value, this.myForm.get('reference').value, this.myForm.get('descriptions').value,
          this.myForm.get('control').value, this.myForm.get('unitCost').value, this.myForm.get('totalCost').value,
          this.selectForkLift, this.myForm.get('estimate').value, this.myForm.get('consumption').value,
          this.myForm.get('observation').value);

        this.restService.createWarehousesOut(this.selectedCustomer, this.selectedTechnician, this.selectedBranchOffice.id, this.selectForkLift, this.myForm.get('quantity').value, this.myForm.get('reference').value, this.myForm.get('descriptions').value,
          this.myForm.get('control').value, this.myForm.get('unitCost').value, this.myForm.get('totalCost').value, this.myForm.get('estimate').value, this.myForm.get('consumption').value,
          this.myForm.get('observation').value)
          .then(data => {
            const resp: any = data;
            console.log(resp);
            if (resp.success === false) {
              swal({
                title: 'Esta salida ya esta registrada',
                text: 'Esta salida no se pudo registrar',
                type: 'error'
              });
            } else {
              console.log('Cambio');
              console.log(resp.data.id);
              document.getElementById('clearWarehouses').click();
              document.getElementById('warehousesOutHide').click();
              this.getWarehousesOut();
              this.submitted = false;
              swal({
                title: 'Salida agregada',
                type: 'success'
              });
            }
          }).catch(error => {
            console.log(error);
          });
      }
    } else {
      swal({
        title: 'Debe seleccionar todos los campos obligatorios',
        text: 'Debe seleccionar todos los campos obligatorios',
        type: 'error'
      });
    }
  }

  updateWare(row) {
    console.log(row);
    this.idwarehousesout = row.id
    this.myFormUpdate.get('quantityUpdate').setValue(row.quantity);
    this.myFormUpdate.get('referenceUpdate').setValue(row.reference);
    this.myFormUpdate.get('descriptionsUpdate').setValue(row.description);
    //this.myFormUpdate.get('controlUpdate').setValue(row.control);
    this.myFormUpdate.get('unitCostUpdate').setValue(row.unit_cost);
    this.myFormUpdate.get('totalCostUpdate').setValue(row.total);
    this.myFormUpdate.get('estimateUpdate').setValue(row.order_number);
    this.myFormUpdate.get('controlUpdate').setValue(row.control);
    this.myFormUpdate.get('consumptionUpdate').setValue(row.consumption);
    this.myFormUpdate.get('observationUpdate').setValue(row.observation);
    this.myFormUpdate.get('liquidationUpdate').setValue(row.settlement_text);
    this.myFormUpdate.get('billUpdate').setValue(row.invoice_text);

    document.getElementById('updateWarehouses').click();

    this.getTechnician();
    this.getOffices(row.customer_id)
    this.getForkLift(row.branch_offices_id)
    this.getCustomersUpdate(row);

    console.log(this.selectedCustomerUpdate + '-- wec-- ' + this.selectedTechnicianUpdate + '----------' + this.selectedBranchOfficeUpdate
      + '------' + this.myFormUpdate.get('quantityUpdate').value + '-------' + this.myFormUpdate.get('referenceUpdate').value
      + '------' + this.myFormUpdate.get('descriptionsUpdate').value + '-------' + this.myFormUpdate.get('unitCostUpdate').value + '---' + this.myFormUpdate.get('totalCostUpdate').value
      + '------' + this.myFormUpdate.get('estimateUpdate').value + '-------' + this.myFormUpdate.get('consumptionUpdate').value
      + '--------' + this.myFormUpdate.get('observationUpdate').value + '-----' + this.myFormUpdate.get('liquidationUpdate').value + '------' + this.myFormUpdate.get('billUpdate').value);

  }

  updateWarehousesOut() {
    console.log('DAISLJKSL');
    if (Number(this.selectedCustomerUpdate) !== 0 && Number(this.selectedBranchOfficeUpdate) !== 0 && Number(this.selectedTechnicianUpdate) !== 0) {
      console.log('DAISLJKSL');
      this.submitted = true;
      if (!this.myFormUpdate.invalid) {
        console.log('DAISLJKSL');
        swal({
          title: 'Validando información ...',
          allowOutsideClick: false
        });
        swal.showLoading();
        console.log(this.selectedCustomerUpdate + '-- wec-- ' + this.selectedTechnicianUpdate + '----------' + this.selectedBranchOfficeUpdate
          + '------' + this.myFormUpdate.get('quantityUpdate').value + '-------' + this.myFormUpdate.get('referenceUpdate').value
          + '------' + this.myFormUpdate.get('descriptionsUpdate').value + '-------' + this.myFormUpdate.get('unitCostUpdate').value + '---' + this.myFormUpdate.get('totalCostUpdate').value
          + '------' + this.myFormUpdate.get('estimateUpdate').value + '-----' + this.myFormUpdate.get('controlUpdate').value, +'-------' + this.myFormUpdate.get('consumptionUpdate').value
          + '--------' + this.myFormUpdate.get('observationUpdate').value + '-----' + this.myFormUpdate.get('liquidationUpdate').value + '------' + this.myFormUpdate.get('billUpdate').value);

        this.restService.updateWarehouseOut(this.idwarehousesout, this.selectedCustomerUpdate, this.selectedTechnicianUpdate, this.selectedBranchOfficeUpdate,
          this.myFormUpdate.get('quantityUpdate').value, this.myFormUpdate.get('referenceUpdate').value, this.myFormUpdate.get('descriptionsUpdate').value,
          this.myFormUpdate.get('controlUpdate').value, this.myFormUpdate.get('unitCostUpdate').value, this.myFormUpdate.get('totalCostUpdate').value, this.myFormUpdate.get('estimateUpdate').value,
          this.myFormUpdate.get('consumptionUpdate').value, this.myFormUpdate.get('observationUpdate').value)
          .then(data => {
            const resp: any = data;
            console.log(resp);
            if (resp.success === false) {
              swal({
                title: 'Falla en la actualizacion',
                text: 'Esta salida no se pudo actualizar',
                type: 'error'
              });
            } else {
              console.log('Cambio');
              console.log(resp.data.id);
              document.getElementById('warehousesOutUpdateHide').click();
              this.getWarehousesOut();
              swal({
                title: 'Salida Actualizada',
                type: 'success'
              });
            }
          }).catch(error => {
            console.log(error);
          });
      }
    } else {
      console.log('DAISLJKSL');
      swal({
        title: 'Debe seleccionar todos los campos obligatorios',
        text: 'Debe seleccionar todos los campos obligatorios',
        type: 'error'
      });
    }
  }

  deleteWarehoueses(row) {
    swal({
      title: 'Estás seguro de eliminar este elemento?',
      type: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si'

    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.elementDelete = row;
          console.log(row);
          console.log(this.elementDelete);
          swal.showLoading();
          this.restService.deleteWarehousesOut(Number(this.elementDelete.id))
            .then(data => {
              swal.showLoading();
              const resp: any = data;
              console.log(resp);

              if (resp.success === false) {
                swal({
                  title: 'Esta salida presenta problemas',
                  text: 'Esta salida no se puede eliminar',
                  type: 'error'
                });
              } else {

                this.getWarehousesOut();
                swal({
                  title: 'salida eliminado',
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

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) { }
  loadingData() {
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();

    this.getEstimateFiltersInitial();

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
    if (this.inactive === true || this.active === true) {
      this.rowsTemp = this.rowsTempCheck;
    }
    const temp = this.rowsTemp.filter(function (d) {
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



  changeConsiderDate(event: any) {
    if (this.considerDate == true) {
      this.considerDate = false;
    } else {
      this.considerDate = true;
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

    const temp = this.rowsTemp.filter(function (d) {
      return d.status.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows

    if (this.inactive === true || this.active === true) {
      this.rowsTempCheck = temp;
      this.filterIndicatorCheck = true;
    }

    this.rowsClient = temp;
  }


  // Estos consumos es para la vista de aprobación




  selectEvent(item) {
    console.log('este es el item: ' + JSON.stringify(item));
    this.masterName = item.email;
    // masterName
    // do something with selected item
  }

  onChangeSearch(search: string) {
    console.log('search:' + JSON.stringify(search));
  }

  onFocused(e) {
    console.log('este es el e:' + +JSON.stringify(e));
  }



  upload() {

    this.uploadService.uploadFileForkliftUpdate3(this.blobGlobal).then(res => {
      console.log('que paso');
      console.log(this.blobGlobal);
      console.log('s3info' + JSON.stringify(res));
      this.s3info = res;
      console.log(this.s3info);
      //this.insertNew();
    }).catch(error => {
      console.log(error);
      swal({
        type: 'error',
        title: 'oops a currido un error',
        text: error,
        allowOutsideClick: false
      });
    });
  }


  showCheckItems(row: any) {
    let rowCurrent = row;
    this.estimateCurrent = row;
    //this.getEstimatePartsApproval(rowCurrent.id);
    this.checkAllPart = false;
    this.checkAllWorkForce = false;
    swal({
      title: 'Obteniendo información ...',
      allowOutsideClick: false
    });
    swal.showLoading();

    // this.getEstimateWorkforceApproval(rowCurrent.id);
    //this.checkItemsApprove(rowCurrent);
    document.getElementById('showCheckItem').click();

    swal.close();
  }

  checkItemsApprove(row: any) {
    let rowCurrent = row

  }





  getHeight(row: any, index: number): number {
    return row.someHeight;
  }

  // ******************************************* 
  async pp(id: number) {


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





  getCustomer() {
    this.restService.getCustomer().then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      this.customers = resp.data;
      // this.rowsClient = resp.data;
      // this.rowStatic =  resp.data;
      // this.rowsTemp = resp.data;
      // console.log( this.rowsClient);
    }).catch(error => {
      console.log(error);
    });
  }

  getForklifs() {

    if (this.selectedBusinessId != 0) {
      this.forkliftService.getForkliftsCustomerFull(this.selectedBusinessId).then(data => {
        const resp: any = data;
        console.log(data);
        swal.close();
        this.forklifts = resp.data;
        // this.rowsClient = resp.data;
        // this.rowStatic =  resp.data;
        // this.rowsTemp = resp.data;
        // console.log( this.rowsClient);
      }).catch(error => {
        console.log(error);
      });
    }
  }


  partChange(event: any, item: any) {

    console.log('valor para editar');
    console.log(event.target.value);
    console.log(item);
    console.log(item.id);

    for (let i = 0; i < this.itemsPart.length; i++) {
      if (this.itemsPart[i].id == item.id) {
        console.log(item);
        console.log('lo encontre' + i);

        if (event.target.value != '' && event.target.value != 0) {
          this.itemsPart[i].quantity = event.target.value;
          console.log(this.itemsPart[i]);
        } else {
          swal({
            title: 'Error',
            text: 'Las cantidades deben ser diferentes a 0',
            type: 'error'
          });
        }

      }
    }
  }



  workForceChange(event: any, item: any) {

    console.log('valor para editar');
    console.log(event.target.value);
    console.log(item);
    console.log(item.id);

    for (let i = 0; i < this.itemsWorkforce.length; i++) {
      if (this.itemsWorkforce[i].id == item.id) {
        console.log(item);
        console.log('lo encontre' + i);

        if (event.target.value != '' && event.target.value != 0) {
          this.itemsWorkforce[i].quantity = event.target.value;
          console.log(this.itemsWorkforce[i]);
        } else {
          swal({
            title: 'Error',
            text: 'Las cantidades deben ser diferentes a 0',
            type: 'error'
          });
        }

      }
    }
  }


  workForceChangeActive(event: any, item: any) {

    console.log('valor para editar');
    console.log(event);
    console.log(item);
    console.log(item.id);

    for (let i = 0; i < this.itemsWorkforce.length; i++) {
      if (this.itemsWorkforce[i].id == item.id) {
        console.log(item);
        console.log('lo encontre' + i);
        this.itemsWorkforce[i].active = event.target.checked;
        console.log(this.itemsWorkforce[i]);
      }
    }
  }


  partChangeActive(event: any, item: any) {

    console.log('valor para editar');
    console.log(event);
    console.log(item);
    console.log(item.id);

    for (let i = 0; i < this.itemsPart.length; i++) {
      if (this.itemsPart[i].id == item.id) {
        console.log(item);
        console.log('lo encontre' + i);
        this.itemsPart[i].active = event.target.checked;
        console.log(this.itemsPart[i]);
      }
    }
  }


  onChangeCode(event) {
    console.log(event);
    this.checkHideCode = event.target.checked;
    console.log('este es el evento para chekear eso');
  }


  checkUncheckAllWorkforce(event: any) {

    this.checkAllWorkForce = event.target.checked;
    for (let i = 0; i < this.itemsWorkforce.length; i++) {
      console.log('lo encontre' + i);
      this.itemsWorkforce[i].active = event.target.checked;
    }
  }


  checkUncheckAllPart(event: any) {

    this.checkAllPart = event.target.checked;
    for (let i = 0; i < this.itemsPart.length; i++) {
      console.log('lo encontre' + i);
      this.itemsPart[i].active = event.target.checked;
    }
  }



  getEstimateFilters() {

    if (this.considerDate == false && this.selectedBusinessId == 0 && this.selectedBranchId == 0 &&
      this.selectedUserId == 0 && this.selectedForkliftId == 0 && this.referenceChecklist.length == 0
      && this.descriptionChecklist.length == 0 && this.controlChecklist.length == 0 && this.estimateChecklist.length == 0
      && this.liquidationChecklist.length == 0 && this.billChecklist.length == 0) {
      swal({
        title: 'Importante',
        text: 'Debes seleccionar por lo menos uno de los filtros o activar casilla para tener en cuenta las fechas',
        type: 'error'
      });
    } else {
      swal({
        title: 'Validando información ...',
        allowOutsideClick: false
      });
      swal.showLoading();

      let params = '';
      let cont = 0;
      if (this.considerDate) {

        // poner los 0
        var day = (this.fromDate.day < 10 ? '0' : '') + this.fromDate.day;
        // 01, 02, 03, ... 10, 11, 12
        let month = ((this.fromDate.month) < 10 ? '0' : '') + (this.fromDate.month);
        // 1970, 1971, ... 2015, 2016, ...
        var year = this.fromDate.year;

        // until poner los ceros
        var dayUntil = (this.untilDate.day < 10 ? '0' : '') + this.untilDate.day;
        // 01, 02, 03, ... 10, 11, 12
        let monthUntil = ((this.untilDate.month) < 10 ? '0' : '') + (this.untilDate.month);
        // 1970, 1971, ... 2015, 2016, ...
        var yearUntil = this.untilDate.year;

        var fromD = year + '-' + month + '-' + day;
        var untilD = yearUntil + '-' + monthUntil + '-' + dayUntil;
        //var fromD = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day; //31 de diciembre de 2015
        // var untilD = this.untilDate.year+'-'+this.untilDate.month+'-'+this.untilDate.day;
        params = 'from_date=' + fromD + ' 00:00:00' + '&&' + 'to_date=' + untilD + ' 23:59:59';
        cont++;
      }

      if (this.selectedBusinessId != 0) {
        console.log('imprimir cont');
        console.log(cont);
        if (cont > 0) {
          params = params + '&&customer_id=' + this.selectedBusinessId;
        } else {
          params = params + 'customer_id=' + this.selectedBusinessId;
          cont++;
        }
      }

      if (this.selectedBranchId !== 0) {
        if (cont > 0) {
          params = params + '&&branch_offices_id=' + this.selectedBranchId;
        } else {
          params = params + 'branch_offices_id=' + this.selectedBranchId;
          cont++;
        }
      }

      if (this.selectedUserId !== 0) {
        if (cont > 0) {
          params = params + '&&technician_id=' + this.selectedUserId;
        } else {
          params = params + 'technician_id=' + this.selectedUserId;
          cont++;
        }
      }

      if (this.selectedForkliftId != 0) {
        if (cont > 0) {
          params = params + '&&forklift_id=' + this.selectedForkliftId;
        } else {
          params = params + 'forklift_id=' + this.selectedForkliftId;
          cont++;
        }
      }


      if (this.referenceList.length > 0) {
        if (cont > 0) {
          params = params + '&&reference=' + this.referenceList;
        } else {
          params = params + 'reference=' + this.referenceList;
          cont++;
        }
      }

      if (this.descriptionList.length > 0) {
        if (cont > 0) {
          params = params + '&&description=' + this.descriptionList;
        } else {
          params = params + 'description=' + this.descriptionList;
          cont++;
        }
      }

      if (this.controlList.length > 0) {
        if (cont > 0) {
          params = params + '&&control=' + this.controlList;
        } else {
          params = params + 'control=' + this.controlList;
          cont++;
        }
      }

      if (this.estimateList.length > 0) {
        if (cont > 0) {
          params = params + '&&estimateList=' + this.estimateList;
        } else {
          params = params + 'estimateList=' + this.estimateList;
          cont++;
        }
      }

      if (this.liquidationList.length > 0) {
        if (cont > 0) {
          params = params + '&&settlement_text=' + this.liquidationList;
        } else {
          params = params + 'settlement_text=' + this.liquidationList;
          cont++;
        }
      }

      if (this.billList.length > 0) {
        if (cont > 0) {
          params = params + '&&invoice_text=' + this.billList;
        } else {
          params = params + 'invoice_text=' + this.billList;
          cont++;
        }
      }

      console.log('.---------->' + params);
      this.restService.showWarehouseOutFilter(params).then(data => {
        const resp: any = data;
        console.log('info de filter');
        console.log(data);
        // this.customers  = resp.data;
        this.rowsClient = resp.data;
        this.rows = resp.data;
        swal.close();
        // this.rowStatic =  resp.data;
        // this.rowsTemp = resp.data;
        // console.log( this.rowsClient);
      }).catch(error => {
        console.log(error);
      });
    }
  }

  getEstimateFiltersInitial() {

    let params = '';
    let cont = 0;

    var day = (this.fromDate.day < 10 ? '0' : '') + this.fromDate.day;
    // 01, 02, 03, ... 10, 11, 12
    let month = ((this.fromDate.month) < 10 ? '0' : '') + (this.fromDate.month);
    // 1970, 1971, ... 2015, 2016, ...
    var year = this.fromDate.year;

    // until poner los ceros
    var dayUntil = (this.untilDate.day < 10 ? '0' : '') + this.untilDate.day;
    // 01, 02, 03, ... 10, 11, 12
    let monthUntil = ((this.untilDate.month) < 10 ? '0' : '') + (this.untilDate.month);
    // 1970, 1971, ... 2015, 2016, ...
    var yearUntil = this.untilDate.year;

    var fromD = year + '-' + month + '-' + day;
    var untilD = yearUntil + '-' + monthUntil + '-' + dayUntil;

    //  var fromD = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day; //31 de diciembre de 2015
    //  var untilD = this.untilDate.year+'-'+this.untilDate.month+'-'+this.untilDate.day;
    params = 'from_date=' + fromD + ' 00:00:00' + '&&' + 'to_date=' + untilD + ' 23:59:59';

    console.log('.---------->' + params);
    //this.restService.showWarehouseOutFilter
    this.estimateService.showEstimateFilter(params).then(data => {
      const resp: any = data;
      console.log('info de filter');
      console.log(data);
      swal.close();

      this.rowsClient = resp.data;
    }).catch(error => {
      console.log(error);
    });
  }




  ole() {
    console.log(this.modelPorpup);
  }

  getCustomersForklift(idCustomer: number) {
    this.forkliftService.getForkliftsCustomer(idCustomer).then(data => {
      const resp: any = data;
      console.log('forklifts');
      console.log(data);
      swal.close();
      this.rowsClient = resp.data;
      this.rowStatic = resp.data;
      this.rowsTemp = resp.data;
      console.log(this.rowsClient);
    }).catch(error => {
      console.log(error);
    });
  }


  getBranchOfficeForklift(idBranch: number) {
    this.forkliftService.getForkliftsBranch(idBranch).then(data => {
      const resp: any = data;
      console.log('forklifts branch');
      console.log(data);
      swal.close();
      this.rowsClient = resp.data;
      this.rowStatic = resp.data;
      this.rowsTemp = resp.data;
      console.log(this.rowsClient);
    }).catch(error => {
      console.log(error);
    });
  }

  getCustomerOffice() {
    console.log(this.selectedBusinessId);
    this.getCustomersForklift(this.selectedBusinessId);
    this.restService.getCustomerOffice(this.selectedBusinessId).then(data => {
      const resp: any = data;
      console.log('ole ole');
      console.log(resp);
      this.customerOffices = resp.data_branchoffices;
      swal.close();
    }).catch(error => {
      console.log(error);
    });

  }

  // getOfficeForklift() {
  // this.getBranchOfficeForklift(this.selectedOfficeId);
  //}

  onChangeCreate(check: any) {
    this.change = check;
    console.log(check);
  }


  selectReference(item: any) {
    console.log(item);
    console.log(item.isSelected);
    console.log(this.referenceList.indexOf(item.reference));
    let select = item.isSelected;
    let position = this.referenceList.indexOf(item.reference)
    if (select) {

      this.referenceList.push(item.reference);
    } else {

      this.referenceList.splice(position, 1);
    }
    console.log(this.referenceList);
  }


  selectDescription(item: any) {
    console.log(item);
    console.log(item.isSelected);
    console.log(this.descriptionList.indexOf(item.description));
    let select = item.isSelected;
    let position = this.descriptionList.indexOf(item.description)
    if (select) {

      this.descriptionList.push(item.description);
    } else {

      this.descriptionList.splice(position, 1);
    }
    console.log(this.descriptionList);
  }

  selectControl(item: any) {
    console.log(item);
    console.log(item.isSelected);
    console.log(this.controlList.indexOf(item.control));
    let select = item.isSelected;
    let position = this.controlList.indexOf(item.control)
    if (select) {

      this.controlList.push(item.control);
    } else {

      this.controlList.splice(position, 1);
    }
    console.log(this.controlList);
  }

  selectEstimate(item: any) {
    console.log(item);
    console.log(item.isSelected);
    console.log(this.estimateList.indexOf(item.order_number));
    let select = item.isSelected;
    let position = this.estimateList.indexOf(item.order_number)
    if (select) {

      this.estimateList.push(item.order_number);
    } else {

      this.estimateList.splice(position, 1);
    }
    console.log(this.estimateList);
  }

  selectLiquidation(item: any) {
    console.log(item);
    console.log(item.isSelected);
    console.log(this.liquidationList.indexOf(item.settlement_text));
    let select = item.isSelected;
    let position = this.liquidationList.indexOf(item.settlement_text)
    if (select) {

      this.liquidationList.push(item.settlement_text);
    } else {

      this.liquidationList.splice(position, 1);
    }
    console.log(this.liquidationList);
  }

  selectBill(item: any) {
    console.log(item);
    console.log(item.isSelected);
    console.log(this.billList.indexOf(item.invoice_text));
    let select = item.isSelected;
    let position = this.billList.indexOf(item.invoice_text)
    if (select) {

      this.billList.push(item.invoice_text);
    } else {

      this.billList.splice(position, 1);
    }
    console.log(this.billList);
  }

  onChangeUpdate(check: any) {
    this.switchUpdate = check;
    this.enabledUpdated = check;

    console.log(check);
  }


  getUser() {
    swal({
      title: 'Obteniendo información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    this.userService.getUsers().then(data => {
      const resp: any = data;
      if (resp.error) {
        swal({
          title: 'Error',
          text: 'Ha ocurrido un error',
          type: 'error'
        });
      } else {
        console.log(data);
        swal.close();
        this.rowsUser = resp.data;
        console.log(this.rowsUser);
      }
    }).catch(error => {
      swal.close();
      swal({
        title: 'Error',
        text: 'Ha ocurrido un error',
        type: 'error'
      });
      console.log(error);
    });
  }

  onChangeActive(d) {
    let indice;
    if (this.active === false) {
      this.active = true;
      if (this.inactive === true) {
        indice = '';
      } else {
        indice = '0';
      }
      this.updateFilterActiveInactive(indice);
    } else {
      this.active = false;
      if (this.inactive === true) {
        indice = '1';
      } else {
        indice = '';
      }
      this.updateFilterActiveInactive(indice);
    }
  }

  updateEstimate(row: any) {
    console.log(row);
    this.router.navigateByUrl('maintenance/estimateCustomerUpdate/' + row.id);
  }


  onChangeInactive(d) {
    let indice;
    if (this.inactive === false) {
      this.inactive = true;
      if (this.active === true) {
        indice = '';
      } else {
        indice = '1';
      }
      this.updateFilterActiveInactive(indice);
    } else {
      this.inactive = false;
      if (this.active === true) {
        indice = '0';
      } else {
        indice = '';
      }
      this.updateFilterActiveInactive(indice);
    }
  }

  updateForklift(forklift: any) {
    console.log(forklift);
    this.router.navigateByUrl('maintenance/forkliftUpdate/' + forklift.id);
  }

  sendBrand() {
    console.log(localStorage.getItem('token'));
    this.submitted = true;
    if (!this.myForm.invalid) {
      swal({
        title: 'Validando información ...',
        allowOutsideClick: false
      });
      swal.showLoading();

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
          swal({
            title: 'Este equipo ya esta registrado',
            text: 'Este equipo no se puede registrar',
            type: 'error'
          });
        } else {
          this.myForm.get('description').setValue('');
          /*swal({
           title: 'equipo agregada',
           type: 'success'
          });*/
          //   this.router.navigateByUrl('master/registerBrand');

          document.getElementById('createBrandHide').click();
          this.loadingData();
          swal({
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
    if (!this.myFormUpdate.invalid) {
      swal({
        title: 'Validando información ...',
        allowOutsideClick: false
      });
      swal.showLoading();

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
            swal({
              title: 'Esta equipo ya esta actualizado',
              text: 'Esta equipo no se puede actualizar',
              type: 'error'
            });
          } else {
            // this.router.navigateByUrl('master/registerBrand');
            document.getElementById('updateBrandHide').click();
            this.loadingData();
            swal({
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




  showForklift(forklift: any) {
    console.log(forklift);
    this.router.navigateByUrl('maintenance/forkliftShow/' + forklift.id);
  }

  sendForklift() {
    this.router.navigateByUrl('/maintenance/registerForklift');
  }



  ngOnInit() {
    this.columns.forEach((col: any) => {
      const colWidth = this.columnWidths.find(colWidth => colWidth.column === col.prop);
      if (colWidth) {
        col.width = colWidth.width;
      }
    });
  }

  blockAgents(vadr: any) {
    console.log('----------------');
    console.log(vadr);
  }


  showEstimateLink(row: any) {
    console.log('EL NUEVO VALOR');
    console.log(row);
  }

  clearFilter() {
    console.log(this.fromDate);
  }


  onDateSelectionFrom(date: any) {

    if (this.untilDate) {
      var fromD = new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day); //31 de diciembre de 2015
      var untilD = new Date(this.untilDate.year, this.untilDate.month, this.untilDate.day);

      console.log(this.fromDate.day);
      if (fromD > untilD) {
        console.log('es mayor');
        this.untilDate = this.fromDate;
      }
    }
  }


  rejectEstimateFinal() {
    this.estimateService.updateEstimateStatus(
      this.estimateCurrent.id, 5).then(data => {
        const resp: any = data;
        console.log('envio');
        console.log(resp);
        document.getElementById('hideRejection').click();

        this.getEstimateFiltersInitial();
        swal({
          title: 'cotización rechazada',
          type: 'success'
        });
      }).catch(error => {
        console.log(error);
        swal.close();
      });

  }



  onDateSelectionUntil(date: any) {
    var fromD = new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day); //31 de diciembre de 2015
    var untilD = new Date(this.untilDate.year, this.untilDate.month, this.untilDate.day);
    if (untilD < fromD) {
      console.log('es mayor');
      this.fromDate = this.untilDate;
    }
  }


  get getEmails() {
    return this.detailform.get('emails') as FormArray;
  }


  get getNames() {
    return this.detailform.get('names') as FormArray;
  }


  addEmail() {
    console.log('este es el valor de email: ' + this.masterEmail);
    if (this.validateEmail(this.masterEmail)) {
      this.emailSend = {
        email: this.masterEmail,
        contact: this.masterName
      }
      this.emailsSend.push(this.emailSend);

      this.masterEmail = '';
      this.masterName = '';
    } else {
      swal({
        text: 'Debe ingresar un correo electrónico valido',
        type: 'error'
      });
    }
  }




  validateEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
  }




  storageDetail(formValue: any) {
    swal({
      title: 'Obteniendo información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    const emails = formValue.emails;
    const names = formValue.name;
    const subject = formValue.subject;
    const comment = formValue.comment;
    console.log('info');
    console.log(subject);
    console.log(comment);
    console.log("parte");
    console.log(emails[0].email);
    if ((emails[0].email != null) && (emails[0].email != "") && (comment != null) && (comment != "") && (subject != null) && (subject != "")) {
      console.log((emails));
      let array = ""
      emails.forEach(email => {
        if (email.email != null) {
          array += email.email + "<br><br>";
        }
      });
      console.log(array);


      let arrayNames = ""
      names.forEach(name => {
        if (name.name != null) {
          array += name.name + "<br><br>";
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
    } else {
      this.generalAlert('No se puede guardar', 'Debe Completar todos los campos obligatorios', 'error')
    }
  }


  resetCreateForm() {
    this.detailform.reset();
    for (let index = this.indice; index > 0; index--) {
      const control = <FormArray>this.detailform.controls['emails'];
      control.removeAt(index);
      this.indice--;
    }
  }

  deleteEmail(index: number) {

    /* const control =<FormArray>this.detailform.controls['emails'];
     control.removeAt(index);
     this.indice--;*/
    this.emailsSend.splice(index);
  }


  generalAlert(title: string, message: string, type: any) {
    swal({
      title: title,
      text: message,
      type: type
    });
  }

  finalApproval() {

    this.itemsFinalApproval = [];
    for (let i = 0; i < this.itemsPart.length; i++) {
      console.log('lo encontre' + i);
      if (this.itemsPart[i].active) {
        this.itemsFinalApproval.push(this.itemsPart[i]);
      }
    }
    for (let i = 0; i < this.itemsWorkforce.length; i++) {
      console.log('lo encontre' + i);
      if (this.itemsWorkforce[i].active) {
        this.itemsFinalApproval.push(this.itemsWorkforce[i]);
      }
    }

    let valuesApproval = '';

    for (let i = 0; i < this.itemsFinalApproval.length; i++) {
      valuesApproval = valuesApproval + this.itemsFinalApproval[i].id + '@' + this.itemsFinalApproval[i].quantity + '@';
    }

    console.log('items aprobados de cotizacion ' + this.estimateCurrent);
    console.log(this.itemsFinalApproval);
    console.log(valuesApproval);

    if (valuesApproval != '') {
      swal({
        title: 'Validando información ...',
        allowOutsideClick: false
      });
      swal.showLoading();

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
            swal({
              title: 'cotización aprobada',
              type: 'success'
            });
          }).catch(error => {
            console.log(error);
            swal.close();
          });
        // ----------------------------

      }).catch(error => {
        console.log(error);
        swal.close();
      });

    } else {
      swal({
        title: 'Se presentó un problema',
        text: 'Favor selecionar al menos una opcion.',
        type: 'error',
      });
    }

  }

  rejectQuote() {

  }

  /*

  Comparar fechas https://desarrolloweb.com/articulos/comparar-fechas-javascript.html*/
}
