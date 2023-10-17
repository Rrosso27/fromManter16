import { Component, OnInit } from '@angular/core';
import { RestService } from '../../master-services/Rest/rest.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AnyBuildOptions } from '@ionic/cli';

@Component({
  selector: 'app-master-cost-center',
  templateUrl: './master-cost-center.component.html',
  styleUrls: ['./master-cost-center.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterCostCenterComponent implements OnInit {

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
  idConstCenter:any;
  currentCostCenter = 0;
  myFormUpdate: FormGroup;
  submittedUpdated = false;


  codeUpdate: any;
  descriptionUpdate = '';
  idCostCenter:any;
  constCenter: any;
  regionalsUpdate:any;
  selectedRegionalUpdate: any;

  constructor(private restService: RestService, private router: Router) {
    this.loadingData();
    const code = new FormControl('', Validators.required);
    const description = new FormControl('', Validators.required);
    const regionals = new FormControl('', Validators.required);

    const codeUpdate = new FormControl('', Validators.required);
    const descriptionUpdate = new FormControl('', Validators.required);
    const regionalsUpdate = new FormControl('', Validators.required);

    this.myForm = new FormGroup({
      code: code,
      description: description,
      regionals: regionals,

    });

    this.myFormUpdate = new FormGroup({
      codeUpdate: codeUpdate,
      descriptionUpdate: descriptionUpdate,
      regionalsUpdate: regionalsUpdate,
    });
  }

  getRegionals() {
    this.restService.getRegional().then(data => {
      const resp: any = data;
      this.regionals = resp.data;
      swal.close();
    });
  }

  changeValue() {

  }

  sendCostCenter() {


    if (Number(this.selectedRegional) !== 0) {
      this.submitted = true;
      if (!this.myForm.invalid) {
        swal.fire({
          title: 'Validando información ...',
          allowOutsideClick: false
        });
        swal.showLoading();
        this.restService.createCostCenter(this.myForm.get('description')?.value.toUpperCase(),
          this.myForm.get('code')?.value, this.selectedRegional.id)
          .then(data => {
            const resp: any = data;
            if (resp.success === false) {
              swal.fire({
                title: 'Este centro de costos ya esta registrado',
                text: 'Este centro de costos no se pudo registrar',
                icon: 'error'
              });
            } else {
              this.idConstCenter = resp.data.id;
              document.getElementById('createCostCenterHide')?.click();
              this.loadingData();
              swal.fire({
                title: 'Centro de costos agregada',
                icon: 'success'
              });
            }
          }).catch(error => {
            console.log(error);
          });
      }
    } else {
      swal.fire({
        title: 'Debe seleccionar todos los campos obligatorios',
        text: 'Debe seleccionar todos los campos obligatorios',
        icon: 'error'
      });
    }
  }

  updateCostCenter(row:any) {
    this.currentCostCenter = row;
    this.myFormUpdate.get('descriptionUpdate')?.setValue(row.description);
    this.myFormUpdate.get('codeUpdate')?.setValue(row.code);
    this.idCostCenter = row.id;
    document.getElementById('updateCostCenter')?.click();

    this.getRegionals();
    this.selectedRegionalUpdate = row.regional_id;
  }

  updateCostCenters() {

    if (Number(this.selectedRegionalUpdate) !== 0) {
      this.submittedUpdated = true;
      if (!this.myFormUpdate.invalid) {
        swal.fire({
          title: 'Validando información ...',
          allowOutsideClick: false
        });
        swal.showLoading();
        this.restService.updatCostCenters(Number(this.idCostCenter), this.myFormUpdate.get('descriptionUpdate')?.value.toUpperCase(),
          this.myFormUpdate.get('codeUpdate')?.value, this.selectedRegionalUpdate)
          .then(data => {
            const resp: any = data;
            if (resp.success === false) {
              swal.fire({
                title: 'Falla en la actualizacion',
                text: 'Este centor de costos no se pudo actualizar',
                icon: 'error'
              });
            } else {
              document.getElementById('updateCostCenterHide')?.click();
              this.loadingData();
              swal.fire({
                title: 'Centro de costos actualizado.',
                icon: 'success'
              });
            }
          }).catch(error => {
          });
      }
    } else {
      swal.fire({
        title: 'Debe seleccionar todos los campos obligatorios',
        text: 'Debe seleccionar todos los campos obligatorios',
        icon: 'error'
      });
    }
  }

  deleteCostCenters(brand: any) {
    swal.fire({
      title: 'Estás seguro de eliminar este elemento?',
      // text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si'

    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.elementDelete = brand;
          swal.showLoading();
          this.restService.deleteCostCenter(Number(this.elementDelete.id))
            .then(data => {
              swal.showLoading();
              const resp: any = data;

              if (resp.success === false) {
                swal.fire({
                  title: 'Este centro de costos presenta problemas',
                  text: 'Este centro de costos no se puede eliminar',
                  icon: 'error'
                });
              } else {

                this.loadingData();
                swal.fire({
                  title: 'Centro de costos eliminado',
                  icon: 'success'
                });
              }
            }).catch(error => {
            });
        } else {
          // swal('Fail');
        }
      });
  }

  updateFilter(event:any) {
    const val = event.target.value.toLowerCase();
    // filter our data

    if (val === '') {
      this.filterIndicatorText = false;
      this.rowsTemp = this.rowStatic;
    }

    // this.filterIndicatorCheck = true;
    if (this.inactive === true || this.active === true) {
      this.rowsTemp = this.rowsTempCheck;
    }
    const temp = this.rowsTemp.filter(function (d:any) {
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
    swal.fire({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();

    this.restService.getCostCenter().then(data => {
      const resp: any = data;
      swal.close();
      this.rowsClient = resp.data;
      this.rowStatic = resp.data;
      this.rowsTemp = resp.data;
    }).catch(error => {
      console.log(error);
    });
  }


  ngOnInit() {
  }

  blockAgents(vadr: any) {
  }

  get checkForm() { return this.myForm.controls; }
  get checkFormUpdate() { return this.myFormUpdate.controls; }
}
