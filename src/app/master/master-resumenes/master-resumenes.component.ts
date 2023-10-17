import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { RestService } from '../../master-services/Rest/rest.service';
import { ForkliftService } from '../../master-services/Forklift/forklift.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ResumenesService } from '../../master-services/resumenes/resumenes.service';
import { UserService } from '../../master-services/User/user.service';

@Component({
  selector: 'app-master-resumenes',
  templateUrl: './master-resumenes.component.html',
  styleUrls: ['./master-resumenes.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterResumenesComponent implements OnInit {

  selectedBusinessId: any = 0;
  selectedRegionalId: any = 0;
  selectedBranchOfficeId: any = 0;
  selectedForkliftId: any = 0;
  branchOffices: any;
  forklifts: any;
  customers: any;
  now: any;
  regional: any;

  forkliftText = '';
  rowsClient: any;

  forklift: any = '';
  customerName: any = '';
  branch: any = '';

  headerId: any;
  regional_id: any;
  customer_id: any;
  branch_id: any;

  userCustomer: boolean = false;
  user_id: any;

  constructor(private restService: RestService, private resumenesService: ResumenesService, private router: Router,
    private forkliftService: ForkliftService, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,
    private activatedRoute: ActivatedRoute, private userService: UserService) {

    if (Number(localStorage.getItem('profile')) == 6 || Number(localStorage.getItem('profile')) == 7) {
      this.user_id = Number(localStorage.getItem('userid'));
      this.getCustomerUser(this.user_id);
      this.userCustomer = true;
      //console.log('Entro');
    } else {
      //console.log('regional');
      this.getRegional();
    }

    // this.getRegional();
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(data => {
      //this.name=data.get('id');
      this.regional_id = Number(data.get('regional'));
      if (Number(localStorage.getItem('profile')) == 6 || Number(localStorage.getItem('profile')) == 7) {
        this.customer_id = Number(data.get('customer'));
        this.branch_id = Number(data.get('branch'));
        this.selectedBusinessId = this.customer_id;
        this.selectedBranchOfficeId = this.branch_id;
        this.getBranchOfficeUser();
        this.userCustomer = true;
        //console.log('Entro 2');

      } else {
        if (this.regional_id) {
          // this.showButtonUpdated=true;
          // this.regional_id=Number(data.get('hours'));
          this.selectedRegionalId = this.regional_id;
          //console.log('rutas')
          this.customer_id = Number(data.get('customer'));
          this.branch_id = Number(data.get('branch'));
          this.selectedBusinessId = this.customer_id;
          this.selectedBranchOfficeId = this.branch_id;
          //console.log(this.selectedRegionalId);
          //console.log(this.selectedBusinessId);
          //console.log(this.selectedBranchOfficeId);


          this.getRegional();
          this.getCustomerRegionals(this.regional_id);
          this.getBranchOffices(this.customer_id);
          //console.log('paso');
        }
      }
      this.getForklifs();


    });
  }

  getCustomerUser(id: any) {
    this.userService.getUserCustomer(id).then(data => {
      const resp: any = data;
      this.customers = resp.data;
      // //console.log(this.customers)
    }).catch(error => {
      console.log(error);
    });
  }

  getBranchOfficeUser() {
    Swal.fire({
      title: 'Validando información ...',
      text: 'Cargando Sedes',
      allowOutsideClick: false
    });
    Swal.showLoading();
    this.userService.getBranchUser(this.selectedBusinessId, this.user_id).then(data => {
      const resp: any = data;
      this.branchOffices = resp.data;
      // //console.log(this.customers)
      Swal.close();
    }).catch(error => {
      console.log(error);
    });
  }


  getRegional() {
    this.restService.getRegionalAll().then(data => {
      const resp: any = data;
      //console.log(data);
      Swal.close();
      this.regional = resp.data;
    }).catch(error => {
      console.log(error);
      Swal.fire({
        title: 'Importante',
        text: 'Ha ocurrido un error al cargar las Sucursales',
        icon: 'error'
      });
    });
  }

  getCustomerRegionals(id:any) {
    //console.log(id);
    this.restService.getRegionalCustomers(id).then(data => {
      const resp: any = data;
      this.selectedBusinessId = this.customer_id;
      //console.log(data);
      Swal.close();
      this.customers = resp.data;

      //asignar valores customer;

    }).catch(error => {
      console.log(error);
      Swal.fire({
        title: 'Importante',
        text: 'Ha ocurrido un error al cargar a los clientes.',
        icon: 'error'
      });
    });
  }

  getBranchOffices(id:any) {
    //console.log(this.selectedBusinessId)
    if (this.selectedBusinessId != 0) {

      // Llenar información de cliente
      this.restService.getOffice(id).then(data => {
        const resp: any = data;
        this.selectedBranchOfficeId = this.branch_id;
        //console.log('oficinas: ' + data);
        Swal.close();
        this.branchOffices = resp.data;
      }).catch(error => {
        console.log(error);
        Swal.fire({
          title: 'Importante',
          text: 'Ha ocurrido un error al cargar las sedes.',
          icon: 'error'
        });
      });
    } else {
      this.selectedBranchOfficeId = 0;
      this.selectedForkliftId = 0;
    }
  }


  //lista equipos
  getForklifs() {
    //console.log(this.selectedBranchOfficeId)
    if (this.selectedBranchOfficeId != 0) {
      //console.log('this.selectedBusinessId.id');
      //console.log(this.selectedBranchOfficeId);

      this.forkliftService.getForkliftBranchOfficesFull(this.selectedBranchOfficeId).then(data => {
        const resp: any = data;
        //console.log(data);
        Swal.close();
        this.forklifts = resp.data;

      }).catch(error => {
        console.log(error);
        Swal.fire({
          title: 'Importante',
          text: 'Ha ocurrido un error al cargar los equipos.',
          icon: 'error'
        });
      });
    }
  }

  clearFilter() {
    this.selectedBusinessId = 0;
    this.selectedBranchOfficeId = 0;
    this.selectedRegionalId = 0;
    this.selectedForkliftId = 0;
  }

  getFilters() {

    if (this.selectedBusinessId == 0 && this.selectedBranchOfficeId == 0 && this.selectedForkliftId == 0) {
      Swal.fire({
        title: 'Importante',
        text: 'Debes seleccionar por lo menos uno de los filtros.',
        icon: 'error'
      });
    } else {
      Swal.fire({
        title: 'Validando información ...',
        allowOutsideClick: false
      });
      Swal.showLoading();

      let params = '';
      let cont = 0;

      if (this.selectedBusinessId != 0) {
        //console.log('imprimir cont');
        //console.log(cont);
        if (cont > 0) {
          params = params + '&&customer_id=' + this.selectedBusinessId;
        } else {
          params = params + 'customer_id=' + this.selectedBusinessId;
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

      if (this.selectedBranchOfficeId != 0) {
        //console.log(cont);
        if (cont > 0) {
          params = params + '&&branch_office_id=' + this.selectedBranchOfficeId;
        } else {
          params = params + 'branch_office_id=' + this.selectedBranchOfficeId;
          cont++;
        }
      }


      //console.log('.---------->' + params);
      this.resumenesService.showFilter(params).then(data => {
        const resp: any = data;
        //console.log('info de filter');
        //console.log(data);
        // this.customers  = resp.data;
        this.rowsClient = resp.data;
        //console.log(resp.error);
        Swal.close();
        if (resp.error) {
          //console.log('entro')
          Swal.fire({
            title: 'Oops',
            text: 'Hubo un error en la consulta.',
            icon: 'error'
          });
        }
        // this.rowStatic =  resp.data;
        // this.rowsTemp = resp.data;
        // //console.log( this.rowsClient);
      }).catch(error => {
        console.log(error);
      });
    }
  }

  editResumenes(row: any) {
    //console.log(row);
    this.router.navigateByUrl('maintenance/editResumenes/' + row.id + '/' + this.selectedRegionalId);
  }

}
