import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { ModulesService } from '../../master-services/modules/modules.service';
import { RestService } from '../../master-services/Rest/rest.service';

@Component({
  selector: 'app-master-routes',
  templateUrl: './master-routes.component.html',
  styleUrls: ['./master-routes.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss'],
})
export class MasterRoutesComponent implements OnInit {

  rowsClient: any;
  currentRoute: any;
  description: any;

  constructor(private restService: RestService,private moduleService: ModulesService) {
    this.getRotues();
  }


  getRotues() {
    //selectedCostCenterId
    Swal.fire({
          title: 'Validando información ...',
          allowOutsideClick: false
        });
    this.moduleService.getRoute('j').then(data => {
      const resp: any = data;
      //console.log(data);
      Swal.close();
      this.rowsClient = resp.data;
    }).catch(error => {
      //console.log(error);
    });
  }

  updateRoute(row:any) {
    //console.log(row);
    this.currentRoute = row;
    //console.log(this.currentRoute);
    this.description = this.currentRoute.description;
    document.getElementById('updateRoutes')?.click();

  }

  updateRoutes() {

      if (this.description.trim()!='') {
        Swal.fire({
          title: 'Validando información ...',
          allowOutsideClick: false
        });
        Swal.showLoading();
        //console.log('kakakaka');
        this.restService.updateRoutes(Number(this.currentRoute.id), this.description.toUpperCase())
          .then(data => {
            const resp: any = data;
            if (resp.success === false) {
              Swal.fire({
                title: 'Falla en la actualizacion',
                text: 'Esta ruta no se pudo actualizar',
                icon: 'error'
              });
            } else {
              //console.log('Cambio');
              document.getElementById('updateWarehousesHide')?.click();
              this.getRotues();
              Swal.fire({
                title: 'Ruta actualizada.',
                icon: 'success'
              });
            }
          }).catch(error => {
            //console.log(error);
          });

    } else {
      Swal.fire({
        title: 'Debe seleccionar todos los campos obligatorios',
        text: 'Debe seleccionar todos los campos obligatorios',
        icon: 'error'
      });
    }
  }


  ngOnInit() {
  }

}
