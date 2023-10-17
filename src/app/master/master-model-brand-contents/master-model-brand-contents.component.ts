import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { BrandService } from '../../master-services/brand/brand.service';
import { ForkliftService } from '../../master-services/Forklift/forklift.service';
import { RestService } from '../../master-services/Rest/rest.service';
import { UploadService } from '../../master-services/services/upload.service';



@Component({
  selector: 'app-master-model-brand-contents',
  templateUrl: './master-model-brand-contents.component.html',
  styleUrls: ['./master-model-brand-contents.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterModelBrandContentsComponent implements OnInit {

  elementDelete: any;

  brands: any;
  model: any;
  catalogue: any;

  customers: any;
  customerOffices: any = 0;
  selectedBusinessId: any = 0;
  selectedOfficeId: any = 0;

  constructor(private restService: RestService,private brandService:BrandService, private router: Router, private uploadService: UploadService,
    private forkliftService: ForkliftService) {


    // this.getCatalogue();
    this.loadingData();

  }


  getCatalogue() {
    Swal.fire({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.brandService.getCatalogue().then(data => {
      const resp: any = data;
      console.log('tipos');
      console.log(data);
      this.catalogue = resp.data;
      Swal.close();

      console.log(this.brands);
    }).catch(error => {
      console.log(error);
      Swal.fire({
        title: 'Falla al cargar la información',
        text: 'No se pudo cargar las marcas',
        icon: 'error'
      });
    });
  }

  loadingData() {
    Swal.fire({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.brandService.getBrandAll().then(data => {
      const resp: any = data;
      console.log('marcas');
      console.log(data);
      Swal.close();
      this.brands = resp.data;
      // this.rowStatic = resp.data;
      // this.rowsTemp = resp.data;
      console.log(this.brands);
    }).catch(error => {
      console.log(error);
      Swal.fire({
        title: 'Falla al cargar la información',
        text: 'No se pudo cargar las marcas',
        icon: 'error'
      });
    });
  }

  loadingModel() {
    Swal.fire({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.brandService.getModel(this.selectedBusinessId).then(data => {
      const resp: any = data;
      console.log('modelos');
      console.log(data);
      this.model = resp.data_models
      Swal.close();

      // console.log(this.rowsClient);
    }).catch(error => {
      console.log(error);
      Swal.fire({
        title: 'Falla al cargar la información',
        text: 'No se pudo cargar los modelos',
        icon: 'error'
      });
    });
  }


  updateFuel(row:any) {
    console.log(row);
    this.router.navigateByUrl('master/cataloguePdfUpdate/'+row.modelBrand.model_contents_id);
  }

  deleteCatalogue(fuel: any) {
    Swal.fire({
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
          this.elementDelete = fuel;
          console.log(fuel);
          console.log(this.elementDelete);
          Swal.showLoading();
          this.brandService.deleteCatalogue(Number(this.elementDelete.modelBrand.model_contents_id))
            .then(data => {
              Swal.showLoading();
              const resp: any = data;
              console.log(resp);

              if (resp.success === false) {
                Swal.fire({
                  title: 'Se presento un problema',
                  text: 'Estos archivos no se pueden eliminar',
                  icon: 'error'
                });
              } else {
                // this.router.navigateByUrl('master/registerBrand');
                this.getCatalogue();
                Swal.fire({
                  title: 'Archivos eliminados',
                  icon: 'success'
                });
              }
            }).catch(error => {
              console.log(error);
            });
          console.log(this.elementDelete.id);
        } else {
          // Swal('Fail');
        }
        console.log(willDelete);
      });
  }

  getCustomerOffice() {
    console.log(this.selectedBusinessId);
    this.getCustomersForklift(this.selectedBusinessId,'');
    this.loadingModel();

  }

  getCustomersForklift(idCustomer:number,model:any) {
    this.brandService.getCatalogueFilter(model,idCustomer).then(data => {
      const resp: any = data;
      console.log('forklifts');
      console.log(data);
      Swal.close();
      this.catalogue = resp.data;
      console.log( this.catalogue);
    }).catch(error => {
      console.log(error);
    });
   }


  uploadFiles() {
    this.router.navigateByUrl('master/createCataloguePdf');
  }



  ngOnInit() {
  }
}
