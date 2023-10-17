import { Component, OnInit } from '@angular/core';
import { WorkService } from '../../master-services/Work/work.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { ChecklistService } from '../../master-services/checklist/checklist.service';
import { RestService } from '../../master-services/Rest/rest.service';

interface itemSelectInterface {
  // item para mostrar selccionados
  id?: number;
  item?: string;
  select?: boolean;
}

@Component({
  selector: 'app-master-register-checklists',
  templateUrl: './master-register-checklists.component.html',
  styleUrls: [
    './master-register-checklists.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss',
  ],
})
export class MasterRegisterChecklistsComponent implements OnInit {
  cusotmerSelecteds: Array<itemSelectInterface> = [];
  cusotmerSelected: any;

  regionalSelecteds: Array<itemSelectInterface> = [];
  regionalSelected: any;

  title1: string = '';
  hours1: number = 0;
  observation1: string = '';

  headerinfo: any;

  typeRoutine: any = 0;
  selectedBusinessId: any = 0;
  customers: any;
  filterIndicatorText: any;
  rowsTemp: any;
  rowsClient: any;
  rowsTempText: any;
  rowStatic: any;
  regional: any;
  currentType: any;
  updateCustomer: any;
  updateRegional: any;
  showButtonUpdated: boolean = true;

  customerList = '';
  regionalList = '';

  constructor(
    private workService: WorkService,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private formbuilder: FormBuilder,
    private checkServices: ChecklistService,
    private restServices: RestService
  ) {
    this.getCustomer();
    this.getRegionals();
  }

  valueSelectType(value: number) {
    if (value != 0) {
      console.log(value);
      this.typeRoutine = value;
      if (this.typeRoutine == 2) {
        //  this.getRegionals();
      }
      if (this.typeRoutine == 3) {
        //  this.getCustomer();
      }
    }
  }

  // valueSelectTypeUpdate(value:number){
  // if(value != 0){
  // console.log(value);
  // this.typeRoutine = value;
  // if(this.typeRoutine==5){
  //   this.getRegionalsUpdate();
  // }
  // if(this.typeRoutine==4){
  //   this.getCustomerUpdate();
  // }
  // }

  validateSelecteType() {
    if (this.typeRoutine != 0) {
      if (this.typeRoutine == 2) {
        if (this.regionalList != '') {
          this.registerheader();
        } else {
          console.log(this.typeRoutine);
          // this.showButtonUpdated=false;
          this.generalAlert(
            'Ha ocurrido un error',
            'Por favor seleccione al menos una regional.',
            'error'
          );
        }
      }
      if (this.typeRoutine == 3) {
        if (this.customerList != '') {
          this.registerheader();
        } else {
          console.log(this.typeRoutine);
          // this.showButtonUpdated=false;
          this.generalAlert(
            'Ha ocurrido un error',
            'Por favor seleccione al menos un cliente.',
            'error'
          );
        }
      }
      if (this.typeRoutine == 1) {
        this.registerheader();
      }
    } else {
      console.log(this.typeRoutine);
      // this.showButtonUpdated=false;
      this.generalAlert(
        'Ha ocurrido un error',
        'Por favor seleccione el tipo de rutina.',
        'error'
      );
    }
  }

  registerheader() {
    console.log(this.title1);
    if (this.typeRoutine != 0) {
      if (this.title1 != null || this.title1 != '' || this.hours1 == null) {
        Swal.fire({
          title: 'Obteniendo información ...',
          allowOutsideClick: false,
        });
        Swal.showLoading();
        this.checkServices
          .createChecklist(
            this.title1,
            this.hours1,
            this.observation1,
            this.typeRoutine,
            this.customerList,
            this.regionalList
          )
          .then((data) => {
            const resp: any = data;
            this.headerinfo = resp.data;
            console.log('header information');
            console.log(this.headerinfo);
            Swal.close();
            this.router.navigateByUrl(
              'maintenance/updateChecklist/' + this.headerinfo.id
            );
          })
          .catch((err) => {
            console.log(err);
            this.generalAlert(
              'ha ocurrido un herror',
              'ocurrio un error durante la ecucion',
              'error'
            );
          });
      } else {
        this.generalAlert(
          'ha ocurrido un herror',
          'complete todos los campos obligatorios',
          'error'
        );
      }
    } else {
      //   console.log('description '+this.title1);
      this.showButtonUpdated = false;
      this.generalAlert(
        'Ha ocurrido un error',
        'Complete todos los campos obligatorios',
        'error'
      );
    }
  }

  generalAlert(title: string, message: string, type: any) {
    Swal.fire({
      title: title,
      text: message,
      icon: type,
    });
  }
  // getWorkDetailsType(){
  //   this.workService.getWorksDetails(this.headerinfo).then(data=>{
  //     const resp:any=data;
  //     if (resp.success==true) {
  //       this.currentType = resp.data;
  //       console.log(this.currentType)
  //       console.log('antes de todo cargar type')
  //       // this.cusotmerSelecteds.length = 0;

  //       let value;
  //       if(this.currentType.routine.type ==2){
  //         value = 2;
  //         console.log('entro regionales');
  //         this.updateRegional = this.currentType.type;
  //         this.getRegionalUpdate(this.updateRegional);
  //         document.getElementById( 'regional').click();
  //       }
  //       if(this.currentType.routine.type ==3){
  //         console.log('entro cliente');
  //         value = 3;
  //         this.updateCustomer = this.currentType.type;
  //         this.getCustomerUpdate(this.updateCustomer);
  //         document.getElementById( 'customer').click();
  //       }
  //       if(this.currentType.routine.type ==1){
  //         value = 1;
  //         document.getElementById( 'general').click();
  //       }
  //       // this.valueSelectTypeUpdate(value);

  //     }
  //   }).catch(error=>{
  //     console.log(error);
  //     this.generalAlert("ha ocurrido un error","ha ocurrido un error al mostrar la informacion","error");
  //   });
  // }
  getCustomer() {
    this.restServices
      .getCustomers()
      .then((data) => {
        const resp: any = data;
        console.log(data);
        this.customers = resp.data;
        this.rowStatic = resp.data;
        this.rowsTemp = resp.data;
        for (let item of this.customers) {
          console.log(item); // 1, "string", false
          // item = JSON.parse(item);
          let itemSelectInterface: itemSelectInterface = {
            id: item.id,
            item: item.business_name,
            select: false,
          };
          this.cusotmerSelected = itemSelectInterface;
          this.cusotmerSelecteds.push(this.cusotmerSelected);
        }
        this.rowStatic = this.cusotmerSelecteds;
        this.rowsTemp = this.cusotmerSelecteds;
      })
      .catch((error) => {
        console.log(error);
        this.generalAlert(
          'Ha ocurrido un error',
          'Ha ocurrido un error al mostrar la información',
          'error'
        );
      });
  }

  getCustomerUpdate(customer: any) {
    console.log(customer);
    for (let elemento of customer) {
      console.log('ingreso a mirar checks');
      this.SelectItemCustomer(elemento);
    }
  }

  getRegionalUpdate(regional: any) {
    console.log(regional);
    for (let elemento of regional) {
      console.log('ingreso a mirar checks');
      this.SelectItemRegional(elemento);
    }
  }

  SelectItemCustomer(idItem: any) {
    // Falta organizarlo
    var item = idItem.customer_id;
    this.cusotmerSelecteds.map(function (dato) {
      console.log(idItem);
      console.log(dato);
      if (Number(dato.id) === Number(item)) {
        dato.select = true;
        console.log('hacer cambio');
      }

      return dato;
    });
  }

  SelectItemRegional(idItem: any) {
    // Falta organizarlo
    var item = idItem.regional_id;
    this.regionalSelecteds.map(function (dato) {
      console.log(idItem);
      console.log(dato);
      if (Number(dato.id) === Number(item)) {
        dato.select = true;
        console.log('hacer cambio');
      }

      return dato;
    });
  }

  getRegionals() {
    Swal.fire({
      title: 'Validando información ...',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    this.restServices
      .getRegional()
      .then((data) => {
        const resp: any = data;
        console.log(data);
        Swal.close();
        this.regional = resp.data;
        for (let item of this.regional) {
          console.log(item); // 1, "string", false
          // item = JSON.parse(item);
          let itemSelectInterface: itemSelectInterface = {
            id: item.id,
            item: item.description,
            select: false,
          };
          this.regionalSelected = itemSelectInterface;
          this.regionalSelecteds.push(this.regionalSelected);
        }
        console.log(this.regional);
        // this.getWorkDetailsType();
      })
      .catch((error) => {
        console.log(error);
        this.generalAlert(
          'Ha ocurrido un error',
          'Ha ocurrido un error al mostrar la información',
          'error'
        );
      });
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    // filter our data

    if (val === '') {
      console.log('vacio');
      this.filterIndicatorText = false;
      this.rowsTemp = this.rowStatic;
    }
    console.log(val);
    console.log(this.rowStatic);

    const temp = this.rowsTemp.filter(function (d: any) {
      return d.item.toLowerCase().indexOf(val) !== -1 || !val;
    });
    console.log(temp);

    if (val !== '') {
      this.filterIndicatorText = true;
      this.rowsTempText = temp;
    }

    // update the rows
    // this.cusotmerSelecteds.length = 0;
    this.cusotmerSelecteds = temp;
  }

  saveCustomer() {
    for (let item of this.cusotmerSelecteds) {
      console.log('entro');
      if (item.select) {
        console.log(item);
        console.log('entro');
        this.customerList = this.customerList + item.id + ',';
        console.log('entro');
      }
    }
    console.log(this.customerList);
    if (this.customerList == '') {
      Swal.fire({
        title: 'Clientes no seleccionados',
        text: 'Debe seleccionar al menos un cliente',
        icon: 'error',
      });
    } else {
      document.getElementById('assignPrevetiveHide')?.click();
    }
  }
  saveRegional() {
    for (let item of this.regionalSelecteds) {
      console.log('entro');
      if (item.select) {
        console.log(item);
        console.log('entro');
        this.regionalList = this.regionalList + item.id + ',';
        console.log('entro');
      }
    }
    console.log(this.regionalList);
    if (this.regionalList == '') {
      Swal.fire({
        title: 'Regionales no seleccionados',
        text: 'Debe seleccionar al menos una regional',
        icon: 'error',
      });
    } else {
      document.getElementById('assignRegionalHide')?.click();
    }
  }

  ngOnInit() {}
}
