import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../../master-services/Rest/rest.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-master-warehouses',
  templateUrl: './master-warehouses.component.html',
  styleUrls: ['./master-warehouses.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterWarehousesComponent implements OnInit {

  active = false;
  inactive = false;
  filterIndicatorText = false;
  rowsTemp: any;
  rowStatic: any;
  change = true;
  rowsClient: any;

  elementDelete: any;
  filterIndicatorCheck = false;

  rowsTempCheck: any;
  rowsTempText: any;

  myForm: FormGroup;
  submitted = false;
  enabledCreated = true;
  switchUpdate = true;
  showButtonUpdated = 0;

  code: any;
  description = '';

  regionals: any;
  selectedRegional: any = 0;
  idConstCenter;
  currentCostCenter = 0;
  myFormUpdate: FormGroup;
  submittedUpdated = false;


  codeUpdate: any;
  descriptionUpdate = '';
  regionalsUpdate;
  selectedRegionalUpdate: any;

  constructor(private restService: RestService, private router: Router) {
    this.loadingData();
    const code = new FormControl('', Validators.required);
    const description = new FormControl('', Validators.required);
    const regional = new FormControl('', Validators.required);

    const codeUpdate = new FormControl('', Validators.required);
    const descriptionUpdate = new FormControl('', Validators.required);
    const regionalUpdate = new FormControl('', Validators.required);

    this.myForm = new FormGroup({
      code: code,
      description: description,
      regional: regional,

    });

    this.myFormUpdate = new FormGroup({
      codeUpdate: codeUpdate,
      descriptionUpdate: descriptionUpdate,
      regionalUpdate: regionalUpdate,
    });
  }

  getRegionals() {
    this.restService.getRegional().then(data => {
      const resp: any = data;
      console.log(resp);
      this.regionals = resp.data;
      console.log(this.regionals);
      swal.close();
    });
  }

  getRegionalCostCenter(regionalsId: number) {
    this.restService.getRegional().then(data => {
      const resp: any = data;
      console.log(resp);
      this.regionals = resp.data;
      this.selectedRegionalUpdate = regionalsId;
      console.log(this.regionals);
      swal.close();
    });
  }

  sendWarehouses() {
    console.log('Ole ole ole');
    console.log(this.code);
    console.log(this.description);
    console.log(this.selectedRegional)

    if (Number(this.selectedRegional) !== 0) {
      this.submitted = true;
      if (!this.myForm.invalid) {
        swal({
          title: 'Validando información ...',
          allowOutsideClick: false
        });
        swal.showLoading();
        this.restService.createWarehouses(this.myForm.get('description').value.toUpperCase(),
          this.myForm.get('code').value, this.selectedRegional.id)
          .then(data => {
            const resp: any = data;
            console.log(resp);
            if (resp.success === false) {
              swal({
                title: 'Esta bodega ya esta registrada',
                text: 'Esta bodega no se pudo registrar',
                type: 'error'
              });
            } else {
              console.log('Cambio');
              console.log(resp.data.id);
              document.getElementById('createWarehousesHide').click();
              this.loadingData();
              swal({
                title: 'Bodega agregada',
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
    this.currentCostCenter = row;
    console.log(this.currentCostCenter);
    this.myFormUpdate.get('descriptionUpdate').setValue(row.description);
    this.myFormUpdate.get('codeUpdate').setValue(row.code);
    this.idConstCenter = row.id;

    document.getElementById('updateWarehouses').click();

    this.getRegionalCostCenter(row.regionals_id);
    // this.selectedRegionalUpdate = row.regionals_id;
    console.log(this.selectedRegionalUpdate);
  }

  changeValue() {
    console.log('valor');
    console.log(this.selectedRegionalUpdate);
    console.log('valor');
    //this.getCosrCentersById(this.regionals.id);
  }

  updateWarehouses() {
    console.log('Ole ole ole kakaakkaka');
    console.log(this.codeUpdate);
    console.log(this.descriptionUpdate);
    console.log(this.selectedRegionalUpdate);
    console.log(this.selectedRegionalUpdate.id);
    console.log(Number(this.selectedRegionalUpdate));

    if (this.selectedRegionalUpdate.id !== 0) {
      this.submittedUpdated = true;
      if (!this.myFormUpdate.invalid) {
        swal({
          title: 'Validando información ...',
          allowOutsideClick: false
        });
        swal.showLoading();
        console.log('kakakaka');
        this.restService.updatWarehouses(Number(this.idConstCenter), this.myFormUpdate.get('descriptionUpdate').value.toUpperCase(),
          this.myFormUpdate.get('codeUpdate').value, this.selectedRegionalUpdate.id)
          .then(data => {
            const resp: any = data;
            console.log(JSON.stringify(resp));
            if (resp.success === false) {
              swal({
                title: 'Falla en la actualizacion',
                text: 'Esta bodega no se pudo actualizar',
                type: 'error'
              });
            } else {
              console.log('Cambio');
              document.getElementById('updateWarehousesHide').click();
              this.loadingData();
              swal({
                title: 'Bodega actualizada.',
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

  deleteWarehoueses(brand: any) {
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
          this.elementDelete = brand;
          console.log(brand);
          console.log(this.elementDelete);
          swal.showLoading();
          this.restService.deleteWarehouses(Number(this.elementDelete.id))
            .then(data => {
              swal.showLoading();
              const resp: any = data;
              console.log(resp);

              if (resp.success === false) {
                swal({
                  title: 'Esta bodega presenta problemas',
                  text: 'Esta bodega no se puede eliminar',
                  type: 'error'
                });
              } else {

                this.loadingData();
                swal({
                  title: 'Bodega eliminado',
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
      return d.description.toLowerCase().indexOf(val) !== -1 || !val;
    });

    if (val !== '') {
      this.filterIndicatorText = true;
      this.rowsTempText = temp;
    }

    // update the rows
    this.rowsClient = temp;

  }

  loadingData() {
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();

    this.restService.getWarehouses().then(data => {
      const resp: any = data;
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


  ngOnInit() {
  }

  blockAgents(vadr: any) {
    console.log(vadr);
  }

  get checkForm() { return this.myForm.controls; }
  get checkFormUpdate() { return this.myFormUpdate.controls; }
}
