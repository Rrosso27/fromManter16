import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { ModulesService } from '../../master-services/modules/modules.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-master-update-module',
  templateUrl: './master-update-module.component.html',
  styleUrls: ['./master-update-module.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterUpdateModuleComponent implements OnInit {


  myFormUpdate: FormGroup;
  myFormSubModules: FormGroup;
  myFormUpdateSubModules: FormGroup;

  rowsClient: any;
  rowsTemp: any;
  rowStatic: any;
  rows: any;

  dataSubModule: any;

  submittedUpdated = false;
  enabledUpdated: boolean;

  enabledCreatedOfficeUpdate: boolean;

  currentModelId: any = 0;

  // description: any;
  currentSubModule: any;

  elementDelete: any;

  submitted = false;
  enabledCreated = true;

  route: any;
  selectedRoute: any = 0;
  selectedRouteUpdate: any = 0;

  description: string = '';
  descriptionSubModule: string = '';
  currentModule: any;


  constructor(private moduleService: ModulesService, private router: Router, private rutaActiva: ActivatedRoute) {

    this.currentModelId = this.rutaActiva.snapshot.params.id;
    console.log(this.currentModelId);

    this.loadingData(this.currentModelId);

    const descriptionUpdate = new FormControl('', Validators.required);

    const descriptionUpdateSub = new FormControl('', Validators.required);
    const routes = new FormControl('');

    const descriptionSub = new FormControl('');
    const routesUpdate = new FormControl('');


    this.myFormUpdateSubModules = new FormGroup({
      descriptionUpdateSub: descriptionUpdateSub,
      routesUpdate: routesUpdate
    });

    this.myFormUpdate = new FormGroup({
      descriptionUpdate: descriptionUpdate,

    });
    this.myFormSubModules = new FormGroup({
      descriptionSub: descriptionSub,
      routes: routes,

    });
  }

  loadingData(id: any) {
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();

    this.moduleService.getModuleById(id).then(data => {
      const resp: any = data;
      console.log(data);
      this.currentModule = resp.data;
      this.description = this.currentModule.description
      this.getSubModules(id);
      swal.close();
      this.getRoute();
      console.log(this.description);
    }).catch(error => {
      console.log(error);
    });
  }

  getSubModules(idModule: number) {
    // console.log(this.opcionSeleccionado);
    this.moduleService.getSubModule(idModule).then(data => {
      console.log('que mas ps');
      const resp: any = data;
      console.log(resp);
      this.dataSubModule = resp.data;

      console.log('Importante ver la info');
      console.log(this.dataSubModule);
      //   this.dataOffices = this.dataOffices.data;
      console.log('master');
      swal.close();
      // this.cities = resp.data;
      console.log(this.dataSubModule);
    }).catch(error => {
      console.log(error);
    });
  }

  getRoute() {
    // console.log(this.opcionSeleccionado);
    this.moduleService.getRoute(this.currentModule.state).then(data => {
      console.log('que mas ps');
      const resp: any = data;
      console.log(resp);
      this.route = resp.data;

      console.log('Importante ver la info');
      console.log(this.route);
      //   this.dataOffices = this.dataOffices.data;
      console.log('master');
      swal.close();

    }).catch(error => {
      console.log(error);
    });
  }
goBack(){
  this.router.navigateByUrl('maintenance/modules');
}
  sendSubModule() {

    console.log('Ole ole ole');

    this.submitted = true;
    console.log(this.descriptionSubModule);
    console.log(this.selectedRoute);
    if (this.descriptionSubModule != '' && this.selectedRoute != 0) {
      swal({
        title: 'Validando información ...',
        allowOutsideClick: false
      });
      swal.showLoading();

      let statusTemp = 0;
      if (this.enabledCreated === false) {
        statusTemp = 1;
      }

      this.moduleService.createSubModule(this.myFormSubModules.get('descriptionSub').value.toUpperCase(), this.selectedRoute.id,
        this.selectedRoute.description, this.currentModelId)
        .then(data => {
          const resp: any = data;
          console.log(resp);
          console.log('id customer' + resp.data.id);
          this.currentSubModule = resp.data.id;
          if (resp.success === false) {
            swal({
              title: 'Este SubModulo ya esta registrado',
              text: 'Este SubModulo no se puede registrar',
              type: 'error'
            });
          } else {
            swal({
              title: 'SubModulo agregado',
              type: 'success'
            });
            this.myFormSubModules.reset();
            document.getElementById('updateBrandHide').click();
            this.getSubModules(this.currentModelId);
          }
        }).catch(error => {
          console.log(error);
        });
    } else {
      console.log(this.myFormSubModules);
      swal({
        title: 'Debe llenar el campo obligatorio',
        text: 'Debe llenar el campo obligatorio',
        type: 'error'
      });
    }
  }

  updatedCustomer() {

    console.log('Ole ole ole kakaakkaka');

    // console.log(this.selectedPriceListIdUpdate);
    console.log(this.enabledCreatedOfficeUpdate);

    this.submittedUpdated = true;
    if (!this.myFormUpdate.invalid) {
      swal({
        title: 'Validando información ...',
        allowOutsideClick: false
      });
      swal.showLoading();

      let statusTemp = 1;

      if (this.enabledCreatedOfficeUpdate) {
        statusTemp = 0;
      }
      console.log('kakakaka');

      this.moduleService.updateModule(Number(this.currentModelId), this.myFormUpdate.get('descriptionUpdate').value.toUpperCase())
        .then(data => {
          const resp: any = data;
          console.log(JSON.stringify(resp));
          if (resp.success === false) {
            swal({
              title: 'Falla en la actualizacion',
              text: 'No se pudo actualizar el Modulo',
              type: 'error'
            });
          } else {
            swal({
              title: 'Modulo Actualizado',
              type: 'success'
            });
          }
        }).catch(error => {
          console.log(error);
        });

    } else {
      swal({
        title: 'Debe llenar el campo obligatorio',
        text: 'Debe llenar el campo obligatorio',
        type: 'error'
      });
    }
  }

  updateBrand(row) {
    console.log(row);
    this.currentSubModule = row;
    console.log(this.currentSubModule);
    if (this.currentSubModule.status === '0') {
      this.enabledUpdated = true;
    } else {
      this.enabledUpdated = false;
    }

    this.myFormUpdateSubModules.get('descriptionUpdateSub').setValue(this.currentSubModule.description);

    if (this.currentSubModule.status == 0) {
      this.enabledCreatedOfficeUpdate = true;
    } else {
      this.enabledCreatedOfficeUpdate = false;
    }

    document.getElementById('uploadSubModule').click();
  }

  sendUpdateSubModule() {
    console.log('Ole ole ole kakaakkaka');

    // console.log(this.selectedPriceListIdUpdate);
    console.log(this.enabledCreatedOfficeUpdate);

    this.submittedUpdated = true;
    if (!this.myFormUpdateSubModules.invalid) {
      swal({
        title: 'Validando información ...',
        allowOutsideClick: false
      });
      swal.showLoading();

      let statusTemp = 1;

      if (this.enabledCreatedOfficeUpdate) {
        statusTemp = 0;
      }
      console.log('kakakaka');

      this.moduleService.updateSubModule(this.currentSubModule.id, this.myFormUpdateSubModules.get('descriptionUpdateSub').value.toUpperCase(), this.selectedRouteUpdate.id, this.selectedRouteUpdate.description)
        .then(data => {
          const resp: any = data;
          console.log(JSON.stringify(resp));
          if (resp.success === false) {
            swal({
              title: 'Falla en la actualizacion',
              text: 'No se pudo actualizar el SubModulo',
              type: 'error'
            });
          } else {
            document.getElementById('updateSubmoduleHide').click();
            swal({
              title: 'SubModulo Actualizado',
              type: 'success'
            });
            this.myFormUpdateSubModules.reset();
            this.getSubModules(this.currentModelId);
          }
        }).catch(error => {
          console.log(error);
        });

    } else {
      swal({
        title: 'Debe llenar el campo obligatorio',
        text: 'Debe llenar el campo obligatorio',
        type: 'error'
      });
    }
  }

  deleteSubModulo(row: any) {
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
          this.elementDelete = row;
          console.log(row);
          console.log(this.elementDelete);
          swal.showLoading();
          this.moduleService.deleteSubModule(Number(this.elementDelete.id))
            .then(data => {
              swal.showLoading();
              const resp: any = data;
              console.log(resp);
              this.getSubModules(this.currentModelId);
              if (resp.success === false) {
                swal({
                  title: 'Este submodulo presenta problemas',
                  text: 'Este submodulo no se pudo eliminar',
                  type: 'error'
                });
              } else {
                // this.router.navigateByUrl('master/registerBrand');
                swal({
                  title: 'Submodulo eliminado',
                  type: 'success'
                });
              }
            }).catch(error => {
              console.log(error);
            });
        } else {
          // swal('Fail');
        }
        console.log(willDelete);
      });
  }

  blockAgents(vadr: any) {
    console.log(vadr);
  }


  onChangeCreatedOfficeUpdate(check: any) {
    console.log(check);
    this.enabledCreatedOfficeUpdate = check;
  }

  get checkFormUpdate() { return this.myFormUpdate.controls; }
  get checkFormSubModules() { return this.myFormSubModules.controls; }
  get checkFormUpdateSubModules() { return this.myFormUpdateSubModules.controls; }
  ngOnInit() {
  }

}
