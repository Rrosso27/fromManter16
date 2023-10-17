import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../../master-services/Rest/rest.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'

import { Router } from '@angular/router';
import { UploadService } from '../../master-services/services/upload.service';
import { UUID } from 'angular2-uuid';
import { ActivatedRoute, Params } from '@angular/router';
import { getElement } from '@syncfusion/ej2-base';

interface regionalSelectInterface {
  // item para mostrar selccionados
  id?: number;
  code?: string;
  description?: string;
  cheked?: boolean;
}

@Component({
  selector: 'app-master-detail-customer',
  templateUrl: './master-detail-customer.component.html',
  styleUrls: [
    './master-detail-customer.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss',
  ],
})
export class MasterdetailCustomerComponent implements OnInit {
  selectedFiles: any;
  dataMasters: any;
  dataOffices: any;
  typeDocuments: any;
  priceList: any;
  departments: any;
  department: any;
  cities: any;
  citiesOffice: any;
  citiesOfficeUpdate: any;
  paymentConditions: any;
  elementDelete: any;

  currentOffice: any;
  currentCustomerId: any = 0;

  myForm: FormGroup;
  myFormUpdate: FormGroup;

  myFormCreateOffice: FormGroup;
  myFormUpdateOffice: FormGroup;

  opcionSeleccionado: any = 0;
  check = false;
  enable = false;

  submitted = false;
  submittedUpdated = false;

  submittedOffice = false;
  submittedOfficeUpdated = false;

  enabledCreated = true;
  enabledCreatedOffice = true;
  enabledCreatedOfficeUpdate: any;
  public imagePath: any;
  imgURL: any;
  public message: any;
  enabledUpdated = true;
  idCustomerCreated: any;

  showButtonUpdated = 0;
  selectedValue = 0;
  switchCreate = true;
  switchUpdate = true;

  selectedTypeDocumentId: any = 0;
  selectedPriceListId: any = 0;
  selectedPaymentConditionId: any = 0;
  selectedDepartmentId: any = 0;
  selectedCityId: any = 0;

  selectedDepartmentOfficeId: any = 0;
  selectedCityOfficeId: any = 0;

  selectedDepartmentOfficeIdUpdate: any = 0;
  selectedCityOfficeIdUpdate: any = 0;

  selectedTypeDocumentIdUpdate: any = 0;
  selectedPriceListIdUpdate: any = 0;
  selectedPaymentConditionIdUpdate: any = 0;
  selectedDepartmentIdUpdate: any = 0;
  selectedCityIdUpdate: any = 0;
  customer: any;

  checkAllRegional = false;
  regional = [];
  regionals: Array<regionalSelectInterface> = [];
  itemRegional: any;
  rowsRegionals: any;
  rowsRegional: any;
  selectRegional: Array<regionalSelectInterface> = [];
  valor: any;
  regionalCustomer = [];

  constructor(
    private restService: RestService,
    private router: Router,
    private uploadService: UploadService,
    private rutaActiva: ActivatedRoute
  ) {
    this.getMasters(0);
    // this.getOffices();
    this.getRegionals();
    this.currentCustomerId = this.rutaActiva.snapshot.paramMap.get('id');
    this.getOffices(this.currentCustomerId);
    //    this.getRegionalId(this.currentCustomerId);

    const businessName = new FormControl('', Validators.required);
    const typeDocumentId = new FormControl('', Validators.required);
    const documentId = new FormControl('', Validators.required);
    const telephone = new FormControl('');
    const address = new FormControl('', Validators.required);
    const priceMargin = new FormControl('', Validators.required);
    // const priceListId = new FormControl('', Validators.required);

    const paymentConditionId = new FormControl('', Validators.required);
    const departmentId = new FormControl('', Validators.required);
    const cityId = new FormControl('', Validators.required);

    const businessNameUpdate = new FormControl('', Validators.required);
    const typeDocumentIdUpdate = new FormControl('', Validators.required);
    const documentIdUpdate = new FormControl('', Validators.required);
    const telephoneUpdate = new FormControl('');
    const addressUpdate = new FormControl('', Validators.required);
    const priceMarginUpdate = new FormControl('', Validators.required);
    //  const priceListIdUpdate  = new FormControl('', Validators.required);
    const paymentConditionIdUpdate = new FormControl('', Validators.required);
    const departmentIdUpdate = new FormControl('', Validators.required);
    const cityIdUpdate = new FormControl('', Validators.required);

    const nameOffice = new FormControl('', Validators.required);
    const telephoneOffice = new FormControl('');
    const departmentOffice = new FormControl('', Validators.required);
    const citytOffice = new FormControl('', Validators.required);
    const addressOffice = new FormControl('', Validators.required);

    const nameOfficeUpdate = new FormControl('', Validators.required);
    const telephoneOfficeUpdate = new FormControl('');
    const departmentOfficeUpdate = new FormControl('', Validators.required);
    const citytOfficeUpdate = new FormControl('', Validators.required);
    const addressOfficeUpdate = new FormControl('', Validators.required);

    this.myFormCreateOffice = new FormGroup({
      nameOffice: nameOffice,
      telephoneOffice: telephoneOffice,
      departmentOffice: departmentOffice,
      citytOffice: citytOffice,
      addressOffice: addressOffice,
    });

    this.myFormUpdateOffice = new FormGroup({
      nameOfficeUpdate: nameOfficeUpdate,
      telephoneOfficeUpdate: telephoneOfficeUpdate,
      departmentOfficeUpdate: departmentOfficeUpdate,
      citytOfficeUpdate: citytOfficeUpdate,
      addressOfficeUpdate: addressOfficeUpdate,
    });

    this.myForm = new FormGroup({
      businessName: businessName,
      typeDocumentId: typeDocumentId,
      documentId: documentId,
      telephone: telephone,
      address: address,
      priceMargin: priceMargin,
      paymentConditionId: paymentConditionId,
      departmentId: departmentId,
      cityId: cityId,
    });

    this.myFormUpdate = new FormGroup({
      businessNameUpdate: businessNameUpdate,
      typeDocumentIdUpdate: typeDocumentIdUpdate,
      documentIdUpdate: documentIdUpdate,
      telephoneUpdate: telephoneUpdate,
      addressUpdate: addressUpdate,
      priceMarginUpdate: priceMarginUpdate,
      paymentConditionIdUpdate: paymentConditionIdUpdate,
      departmentIdUpdate: departmentIdUpdate,
      cityIdUpdate: cityIdUpdate,
    });
  }

  getRegionals() {
    this.restService
      .getRegional()
      .then((data) => {
        const resp: any = data;
        this.rowsRegional = resp.data;

        this.getRegionalId(this.currentCustomerId);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getRegionalId(id: number) {
    this.restService.getRegionalId(id).then((data) => {
      const resp: any = data;
      this.rowsRegionals = resp.data_customerRegionals;
      this.regional = [];
      this.rowsRegional.forEach((item: any) => {
        let execeldata: regionalSelectInterface = {
          id: item.id,
          code: item.code,
          description: item.description,
          cheked: false,
        };

        this.itemRegional = execeldata;
        this.regionals.push(this.itemRegional);
      });
      // rowsRegionals  Son las regionales del customer
      // rowsRegional  Son las regionales del creadas

      this.rowsRegionals.forEach((value:any) => {
        let index = this.regionals.indexOf(
          this.regionals.find((x) => x.id == value.regional_id)
        );
        if (index != -1) {
          let execeldata: regionalSelectInterface = {
            id: this.regionals[index].id,
            code: this.regionals[index].code,
            description: this.regionals[index].description,
            cheked: true,
          };
        this.itemRegional = execeldata;


          this.regionals.splice(index, 1);
          this.regionals.push(this.itemRegional);
        }
      });
    });
  }

  checkUncheckAllPart(event: any) {
    this.checkAllRegional = event.target.checked;
    for (let i = 0; i < this.regionals.length; i++) {
      this.regionals[i].cheked = event.target.checked;
    }
  }

  partChangeActive(event: any, item: any) {
    for (let i = 0; i < this.regionals.length; i++) {
      if (this.regionals[i].id == item.id) {
        this.regionals[i].cheked = event.target.checked;
      }
    }
  }

  finalRegional() {
    this.selectRegional = [];
    for (let i = 0; i < this.regionals.length; i++) {
      if (this.regionals[i].cheked) {
        this.selectRegional.push(this.regionals[i]);
      }
    }
    let regionalSelec = '';
    regionalSelec = this.currentCustomerId;

    for (let i = 0; i < this.selectRegional.length; i++) {
      regionalSelec = regionalSelec + '@' + this.selectRegional[i].id;
    }

    if (regionalSelec != '') {
      Swal.fire({
        title: 'Validando información ...',
        allowOutsideClick: false,
      });
      Swal.showLoading();

      this.restService
        .customerRegionalSelect(regionalSelec)
        .then((data) => {
          const resp: any = data;
          if (resp.success === false) {
            Swal.fire({
              title: 'Falla en la actualizacion',
              text: 'Este cliente no se pudo actualizar',
              icon: 'error',
            });
          } else {
            Swal.fire({
              title: 'Sucursales guardadas',
              icon: 'success',
            });
          }
        })
        .catch((error) => {
          Swal.close();
        });
    } else {
      Swal.fire({
        title: 'Se presentó un problema',
        text: 'Favor selecionar al menos una opcion.',
        icon: 'error',
      });
    }
  }

  ngOnInit() {}

  ngAfterContentInit() {
    this.getCustomer(this.currentCustomerId);
  }

  updateBrand(brand:any) {
    this.currentOffice = brand;
    if (this.currentOffice.status === '0') {
      this.enabledUpdated = true;
    } else {
      this.enabledUpdated = false;
    }

    this.myFormUpdateOffice
    .get('nameOfficeUpdate')
      ?.setValue(this.currentOffice.branch_name);
    this.myFormUpdateOffice
      .get('telephoneOfficeUpdate')
      ?.setValue(this.currentOffice.telephone);

    this.myFormUpdateOffice
      .get('addressOfficeUpdate')
      ?.setValue(this.currentOffice.address);

    this.selectedDepartmentOfficeIdUpdate = this.currentOffice.department_id;

    if (this.currentOffice.status == 0) {
      this.enabledCreatedOfficeUpdate = true;
    } else {
      this.enabledCreatedOfficeUpdate = false;
    }

    this.getCitiesOfficeUpdate();
    this.selectedCityOfficeIdUpdate = this.currentOffice.city_id;

    document.getElementById('uploadBrand')?.click();
  }

  upload() {
    const file = this.selectedFiles.item(0);
    const uuid = UUID.UUID();
    const extension = file.name
      .substring(file.name.lastIndexOf('.'))
      .toLowerCase();
    this.uploadService.uploadFile(file);
  }

  selectFile(event:any) {
    this.selectedFiles = event.target.files;
  }

  ChangingValue() {
    this.selectedTypeDocumentIdUpdate = this.selectedTypeDocumentId.id;
    //  this.selectedPriceListIdUpdate = this.selectedPriceListId.id;
    this.selectedPaymentConditionIdUpdate = this.selectedPaymentConditionId.id;
    this.selectedDepartmentIdUpdate = this.selectedDepartmentId.id;
    this.selectedCityIdUpdate = this.selectedCityId.id;
  }

  getCitiesOffice(val: any) {
    this.selectedCityOfficeId = 0;

    this.restService
      .getCities(Number(this.selectedDepartmentOfficeId.id))
      .then((data) => {
        const resp: any = data;
        Swal.close();
        this.citiesOffice = resp.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getCitiesOfficeUpdate() {
    this.selectedCityOfficeIdUpdate = 0;

    this.restService
      .getCities(this.selectedDepartmentOfficeIdUpdate)
      .then((data) => {
        const resp: any = data;
        Swal.close();
        this.citiesOfficeUpdate = resp.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getCities(val: any) {
    this.selectedCityId = 0;

    this.restService
      .getCities(Number(this.selectedDepartmentId.id))
      .then((data) => {
        const resp: any = data;
        Swal.close();
        this.cities = resp.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getCustomer(id: number) {
    this.restService
      .getSpecificCustomer(id)
      .then((data: any) => {
        const resp: any = data.data;
        this.customer = resp;
        this.myFormUpdate
          .get('typeDocumentIdUpdate')
          ?.setValue(resp.type_document_id);
        this.myFormUpdate.get('documentIdUpdate')?.setValue(resp.document_id);
        this.myFormUpdate
          .get('businessNameUpdate')
          ?.setValue(resp.business_name);
        this.myFormUpdate.get('telephoneUpdate')?.setValue(resp.telephone);
        this.myFormUpdate.get('addressUpdate')?.setValue(resp.address);
        this.myFormUpdate.get('priceMarginUpdate')?.setValue(resp.price_margin);
        //  this.myFormUpdate.get('priceListIdUpdate').setValue(resp.price_list_id);
        this.myFormUpdate
          .get('paymentConditionIdUpdate')
          ?.setValue(resp.payment_condition_id);
        this.myFormUpdate
          .get('departmentIdUpdate')
          ?.setValue(resp.department_id);
        if (resp.status == 0) {
          this.enabledCreatedOfficeUpdate = true;
        } else {
          this.enabledCreatedOfficeUpdate = false;
        }
        this.getCitiesOfficeUpdate();
        this.getCitiesUpdate();
      })
      .catch((error) => {
        this.messageError();
        console.log(error);
      });
  }

  getCitiesUpdate() {
    this.selectedCityIdUpdate = 0;
    this.restService
      .getCities(Number(this.selectedDepartmentIdUpdate))
      .then((data) => {
        const resp: any = data;
        Swal.close();
        this.cities = resp.data;
        this.myFormUpdate.get('cityIdUpdate')?.setValue(this.customer.city_id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  messageError() {
    Swal.fire({
      title: 'Debe crear un cliente',
      text: 'Luego de crear el cliente, puedes crear sedes',
      icon: 'error',
    });
  }

  updatedCustomer() {
    if (
      Number(this.selectedTypeDocumentIdUpdate) !== 0 &&
      Number(this.selectedPaymentConditionIdUpdate) !== 0 &&
      Number(this.selectedDepartmentIdUpdate) !== 0 &&
      Number(this.selectedCityIdUpdate) !== 0
    ) {
      this.submittedUpdated = true;
      if (!this.myFormUpdate.invalid) {
        Swal.fire({
          title: 'Validando información ...',
          allowOutsideClick: false,
        });
        Swal.showLoading();

        let statusTemp = 1;
        if (this.enabledCreatedOfficeUpdate) {
          statusTemp = 0;
        }

        this.restService
          .updateCustomer(
            Number(this.customer.id),
            this.myFormUpdate.get('businessNameUpdate')?.value.toUpperCase(),
            this.selectedTypeDocumentIdUpdate,
            this.myFormUpdate.get('documentIdUpdate')?.value,
            this.myFormUpdate.get('telephoneUpdate')?.value,
            this.myFormUpdate.get('addressUpdate')?.value,
            statusTemp,
            this.myFormUpdate.get('priceMarginUpdate')?.value,
            this.selectedPaymentConditionIdUpdate,
            this.selectedCityIdUpdate,
            this.selectedDepartmentIdUpdate
          )
          .then((data) => {
            const resp: any = data;
            if (resp.success === false) {
              Swal.fire({
                title: 'Este tercero ya esta registrado',
                text: 'Este tercero no se puede registrar',
                icon: 'error',
              });
            } else {
              this.getMasters(1);

              Swal.fire({
                title: 'Tercero agregado',
                icon: 'success',
              });
            }
          })
          .catch((error) => {});
      }
    } else {
      Swal.fire({
        title: 'Debe seleccionar todos los campos obligatorios',
        text: 'Debe seleccionar todos los campos obligatorios',
        icon: 'error',
      });
    }
  }

  onChangeCreated(check: any) {
    this.enabledCreated = check;
  }

  onChangeCreatedOfficeUpdate(check: any) {
    this.enabledCreatedOfficeUpdate = check;
  }

  onChangeCreatedOffice(check: any) {
    this.enabledCreatedOffice = check;
  }

  onChangeUpdated(check: any) {
    this.enabledUpdated = check;
  }
  getMasters(indice: number) {
    this.restService
      .getMastersThird()
      .then((data) => {
        const resp: any = data;
        this.dataMasters = data;
        this.paymentConditions = this.dataMasters.payment_condition;
        this.typeDocuments = this.dataMasters.documents;
        this.departments = this.dataMasters.department;
        Swal.close();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getOffices(idCustomer: number) {
    this.restService
      .getCustomerOffice(idCustomer)
      .then((data) => {
        const resp: any = data;
        this.dataOffices = resp.data_branchoffices;
        Swal.close();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteBrand(brand: any) {
    Swal.fire({
      title: 'Estás seguro de eliminar este elemento?',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
    }).then((willDelete) => {
      if (willDelete.value) {
        this.elementDelete = brand;
        Swal.showLoading();
        this.restService
          .deleteOffice(Number(this.elementDelete.id))
          .then((data) => {
            Swal.showLoading();
            const resp: any = data;
            this.getOffices(this.currentCustomerId);
            if (resp.success === false) {
              Swal.fire({
                title: 'Esta marca presenta problemas',
                text: 'Esta marca no se puede eliminar',
                icon: 'error',
              });
            } else {
              Swal.fire({
                title: 'Marca eliminada',
                icon: 'success',
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
      }
    });
  }

  onChange(d: any) {}

  preview(files:any) {
    if (files.length === 0) {
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  goAdminCustomer() {
    this.router.navigateByUrl('master/customers');
  }

  get checkForm() {
    return this.myForm.controls;
  }
  get checkFormUpdate() {
    return this.myFormUpdate.controls;
  }
  get checkFormOffice() {
    return this.myFormCreateOffice.controls;
  }
  get checkFormOfficeUpdate() {
    return this.myFormUpdateOffice.controls;
  }
}
