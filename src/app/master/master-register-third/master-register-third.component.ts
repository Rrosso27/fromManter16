import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../../master-services/Rest/rest.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { UploadService } from '../../master-services/services/upload.service';
import { UUID } from 'angular2-uuid';

interface regionalSelectInterface {// item para mostrar selccionados
  id?: number;
  code?: string,
  description?: string;
  cheked?: boolean;
}


@Component({
  selector: 'app-master-register-third',
  templateUrl: './master-register-third.component.html',
  styleUrls: ['./master-register-third.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss']
})

export class MasterRegisterThirdComponent implements OnInit {
  // getTypeDocuments

  selectedFiles:any = FileList;
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

  currentUpdateOffice: any;
  currentUpdateCustomerId: any = 0;

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

  enabledCreatedOfficeUpdate = true;
  public imagePath:any;
  imgURL: any;
  public message: string = '';
  enabledUpdated = true;
  idCustomerCreated:any;

  showButtonUpdated = 0;
  selectedValue = 0;
  switchCreate = true;
  switchUpdate = true;

  selectedTypeDocumentId: any = 0;
  // selectedPriceListId: any = 0;
  selectedPaymentConditionId: any = 0;
  selectedDepartmentId: any = 0;
  selectedCityId: any = 0;

  selectedDepartmentOfficeId: any = 0;
  selectedCityOfficeId: any = 0;

  selectedDepartmentOfficeIdUpdate: any = 0;
  selectedCityOfficeIdUpdate: any = 0;

  selectedTypeDocumentIdUpdate: any = 0;
  // selectedPriceListIdUpdate: any = 0;
  selectedPaymentConditionIdUpdate: any = 0;
  selectedDepartmentIdUpdate: any = 0;
  selectedCityIdUpdate: any = 0;
  priceM: any = 0;

  checkAllRegional = false;
  regionals: Array<regionalSelectInterface> = [];
  itemRegional: any;
  rowsRegional: any;
  selectRegional: Array<regionalSelectInterface> = [];
  typeDocument: any = 0;
  documentType: any = 0;

  constructor(private restService: RestService, private router: Router, private uploadService: UploadService) {
    this.getMasters(0);
    // this.getOffices();
    this.getRegionals();

    console.log(this.currentCustomerId);

    const businessName = new FormControl('', Validators.required);
    const typeDocumentId = new FormControl('', Validators.required);
    const documentId = new FormControl('', Validators.required);
    const telephone = new FormControl('', Validators.required);
    const address = new FormControl('', Validators.required);
    const priceMargin = new FormControl(this.priceM);
    // const priceListId = new FormControl('', Validators.required);
    const paymentConditionId = new FormControl('', Validators.required);
    const departmentId = new FormControl('', Validators.required);
    const cityId = new FormControl('', Validators.required);

    const businessNameUpdate = new FormControl('', Validators.required);
    const typeDocumentIdUpdate = new FormControl('', Validators.required);
    const documentIdUpdate = new FormControl('', Validators.required);
    const telephoneUpdate = new FormControl('', Validators.required);
    const addressUpdate = new FormControl('', Validators.required);
    const priceMarginUpdate = new FormControl('', Validators.required);
    // const priceListIdUpdate  = new FormControl('', Validators.required);
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
    const priceMargin2 = new FormControl('');

    this.myFormCreateOffice = new FormGroup({
      nameOffice: nameOffice,
      telephoneOffice: telephoneOffice,
      departmentOffice: departmentOffice,
      citytOffice: citytOffice,
      addressOffice: addressOffice
    });

    this.myFormUpdateOffice = new FormGroup({
      nameOfficeUpdate: nameOfficeUpdate,
      telephoneOfficeUpdate: telephoneOfficeUpdate,
      departmentOfficeUpdate: departmentOfficeUpdate,
      citytOfficeUpdate: citytOfficeUpdate,
      addressOfficeUpdate: addressOfficeUpdate
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
      priceMargin2: priceMargin2
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
      cityIdUpdate: cityIdUpdate
    });
  }
  validateFormat(event:any) {
    let key;
    if (event.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      key = event.keyCode;
      key = String.fromCharCode(key);
    }
    const regex = /[0-9]|\./;
    if (!regex.test(key)) {
      event.returnValue = false;
      if (event.preventDefault) {
        event.preventDefault();
      }
    }
  }



  ccNit() {
    // documentType

    const data = this.selectedTypeDocumentId.id;

    if (data == 1) {
      this.documentType = 0
      console.log (data)
    } else {
      this.documentType = 1
      console.log (data)

    }
  }


  DocumentTipe() {
    this.DocumentTipe = this.myForm.get('documentId')?.value
  }



  getRegionals() {
    this.restService.getRegional().then(data => {
      const resp: any = data;
      console.log(resp);
      console.log('OEOEOEOEOEEO');
      console.log('---------------------------');
      this.rowsRegional = resp.data;

      console.log('información de regional');
      console.log(this.rowsRegional);
      console.log(this.rowsRegional.length);

      this.regionals = [];
      this.rowsRegional.forEach((item:any) => {
        console.log(item);
        let regionalSelectInterface:regionalSelectInterface = {
          id: item.id,
          code: item.code,
          description: item.description
        }
        this.itemRegional = regionalSelectInterface
        this.regionals.push(this.itemRegional);
      });

    }).catch(error => {
      console.log(error);
    });
  }

  checkUncheckAllPart(event: any) {

    this.checkAllRegional = event.target.checked;
    for (let i = 0; i < this.regionals.length; i++) {
      console.log('lo encontre' + i);
      this.regionals[i].cheked = event.target.checked;
    }
  }




  partChangeActive(event: any, item: any) {

    console.log('valor para editar');
    console.log(event);
    console.log(item);
    console.log(item.id);

    for (let i = 0; i < this.regionals.length; i++) {
      if (this.regionals[i].id == item.id) {
        console.log(item);
        console.log('lo encontre' + i);
        this.regionals[i].cheked = event.target.checked;
        console.log(this.regionals[i]);
      }
    }
  }

  finalRegional() {
    this.selectRegional = [];
    for (let i = 0; i < this.regionals.length; i++) {
      console.log('lo encontre' + i);
      if (this.regionals[i].cheked) {
        this.selectRegional.push(this.regionals[i]);
      }
    }
    let regionalSelec = '';
    regionalSelec = this.idCustomerCreated + '@';
    console.log(regionalSelec);
    console.log(this.idCustomerCreated);

    for (let i = 0; i < this.selectRegional.length; i++) {
      regionalSelec = regionalSelec + this.selectRegional[i].id + '@';
    }
    console.log(this.selectRegional);
    console.log(regionalSelec);

    if (regionalSelec != '') {
      Swal.fire({
        title: 'Validando información ...',
        allowOutsideClick: false
      });
      Swal.showLoading();

      this.restService.customerRegionalSelect(regionalSelec
      ).then(data => {
        const resp: any = data;
        console.log('envio');
        console.log(resp);
        if (resp.success === false) {
          Swal.fire({
            title: 'Falla en la actualizacion',
            text: 'Este cliente no se pudo registrar',
            icon: 'error'
          });
        } else {
          Swal.fire({
            title: 'Sucursales guardadas',
            icon: 'success'
          });
        }
      }).catch(error => {
        console.log(error);
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


  ngOnInit() {
  }


  updateBrand(brand:any) {
    console.log(brand);
    this.currentOffice = brand;
    console.log(this.currentOffice);
    if (this.currentOffice.status === '0') {
      this.enabledUpdated = true;
    } else {
      this.enabledUpdated = false;
    }

    this.myFormUpdateOffice.get('nameOfficeUpdate')?.setValue(this.currentOffice.branch_name);
    this.myFormUpdateOffice.get('telephoneOfficeUpdate')?.setValue(this.currentOffice.telephone);

    this.myFormUpdateOffice.get('addressOfficeUpdate')?.setValue(this.currentOffice.address);

    this.selectedDepartmentOfficeIdUpdate = 1;
    this.getCitiesOfficeUpdate(1);
    this.selectedCityOfficeIdUpdate = 3;

    document.getElementById('uploadBrand')?.click();
  }


  upload() {
    const file = this.selectedFiles.item(0);
    const uuid = UUID.UUID();
    console.log(uuid);
    console.log(file.name + '' + file.type);
    const extension = (file.name.substring(file.name.lastIndexOf('.'))).toLowerCase();
    console.log(extension);
    this.uploadService.uploadFile(file);
  }


  selectFile(event:any) {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }

  ChangingValue() {
    this.selectedTypeDocumentIdUpdate = this.selectedTypeDocumentId.id;
    // this.selectedPriceListIdUpdate = this.selectedPriceListId.id;
    this.selectedPaymentConditionIdUpdate = this.selectedPaymentConditionId.id;
    this.selectedDepartmentIdUpdate = this.selectedDepartmentId.id;
    this.selectedCityIdUpdate = this.selectedCityId.id;

    console.log(this.selectedTypeDocumentIdUpdate);
  }


  getCitiesOffice() {
    // console.log(this.opcionSeleccionado);
    this.selectedCityOfficeId = 0;

    this.restService.getCities(Number(this.selectedDepartmentOfficeId.id)).then(data => {
      const resp: any = data;
      console.log(data);
      Swal.close();
      this.citiesOffice = resp.data;
      console.log(this.cities);
    }).catch(error => {
      console.log(error);
    });
  }


  getCitiesOfficeUpdate(val: any) {
    // console.log(this.opcionSeleccionado);
    this.selectedCityOfficeIdUpdate = 0;
    console.log('oleole');

    this.restService.getCities(Number(val)).then(data => {
      const resp: any = data;
      console.log(data);
      Swal.close();
      this.citiesOfficeUpdate = resp.data;
      console.log(this.cities);
    }).catch(error => {
      console.log(error);
    });
  }

  getCities(val: any) {
    // console.log(this.opcionSeleccionado);
    this.selectedCityId = 0;

    this.restService.getCities(Number(this.selectedDepartmentId.id)).then(data => {
      const resp: any = data;
      console.log(data);
      Swal.close();
      this.cities = resp.data;
      console.log(this.cities);
    }).catch(error => {
      console.log(error);
    });
  }


  getCitiesUpdate(val: any) {
    // console.log(this.opcionSeleccionado);
    this.selectedCityIdUpdate = 0;

    this.restService.getCities(Number(this.selectedDepartmentIdUpdate)).then(data => {
      const resp: any = data;
      console.log(data);
      Swal.close();
      this.cities = resp.data;
      console.log(this.cities);
    }).catch(error => {
      console.log(error);
    });
  }


  sendCustomer() {
    console.log('Ole ole ole');
    console.log(this.selectedTypeDocumentId);
    console.log(this.selectedPaymentConditionId);
    console.log(this.selectedDepartmentId);
    console.log(this.selectedCityId);
    // console.log(this.selectedPriceListId);

    if (Number(this.selectedTypeDocumentId) !== 0 && Number(this.selectedPaymentConditionId) !== 0
      && Number(this.selectedDepartmentId) !== 0 && Number(this.selectedCityId) !== 0) {
      this.submitted = true;
      if (!this.myForm.invalid) {
        Swal.fire({
          title: 'Validando información ...',
          allowOutsideClick: false
        });
        Swal.showLoading();

        let statusTemp = 0;
        console.log(this.switchUpdate);
        if (this.enabledCreated === false) {
          statusTemp = 1;
        }

        console.log(this.selectedPaymentConditionId.id);

        this.restService.createCustomer(this.myForm.get('businessName')?.value.toUpperCase(),
          this.selectedTypeDocumentId.id, this.myForm.get('documentId')?.value,
          this.myForm.get('telephone')?.value, this.myForm.get('address')?.value,
          statusTemp, this.myForm.get('priceMargin')?.value,
          this.selectedPaymentConditionId.id, this.selectedCityId.id, this.selectedDepartmentId.id)
          .then(data => {
            const resp: any = data;
            console.log(resp);
            console.log('id customer' + resp.data.id);
            this.currentCustomerId = resp.data.id;
            if (resp.success === false) {
              Swal.fire({
                title: 'Este tercero ya esta registrado',
                text: 'Este tercero no se puede registrar',
                icon: 'error'
              });
            } else {


              this.selectedTypeDocumentIdUpdate = this.selectedTypeDocumentId.id;
              // this.selectedPriceListIdUpdate = this.selectedPriceListId.id;
              this.selectedPaymentConditionIdUpdate = this.selectedPaymentConditionId.id;
              this.selectedDepartmentIdUpdate = this.selectedDepartmentId.id;
              this.selectedCityIdUpdate = this.selectedCityId.id;
              this.getMasters(1);
              // this.getOffices();

              this.showButtonUpdated = 1;
              console.log('oleole');
              console.log(this.myForm.get('documentId')?.value);

              this.myFormUpdate.get('documentIdUpdate')?.setValue(this.myForm.get('documentId')?.value);
              this.myFormUpdate.get('businessNameUpdate')?.setValue(this.myForm.get('businessName')?.value.toUpperCase());
              this.myFormUpdate.get('telephoneUpdate')?.setValue(this.myForm.get('telephone')?.value);
              this.myFormUpdate.get('addressUpdate')?.setValue(this.myForm.get('address')?.value);
              this.idCustomerCreated = resp.data.id;
              console.log('Cambio');
              /*Swal({
               title: 'tercero agregada',
               type: 'success'
              });*/
              //   this.router.navigateByUrl('master/registerBrand');

              // document.getElementById( 'createBrandHide').click();
              // this.loadingData();
              Swal.fire({
                title: 'Tercero agregado',
                icon: 'success'
              });

              this.router.navigateByUrl('master/customersUpdate/' + this.idCustomerCreated);
            }
          }).catch(error => {
            console.log(error);
          });
      }
    } else {
      Swal.fire({
        title: 'Debe seleccionar todos los campos obligatorios',
        text: 'Debe seleccionar todos los campos obligatorios',
        icon: 'error'
      });
    }
  }

  // sendOffice() {
  //   try {
  //   console.log('Ole ole ole');
  //   if ( Number(this.selectedDepartmentOfficeId.id) !== 0 && Number(this.selectedCityOfficeId.id) !== 0) {
  //     this.submittedOffice = true;
  //     console.log('paso y no podia pasar');
  //     console.log(this.myFormCreateOffice.errors);
  //    if ( !this.myFormCreateOffice.invalid) {
  //     Swal({
  //       title: 'Validando información ...',
  //       allowOutsideClick: false
  //     });
  //     Swal.showLoading();

  //     let statusTemp = 0;
  //     console.log( this.switchUpdate);
  //     if ( this.enabledCreatedOffice === false) {
  //       statusTemp = 1;
  //     }
  //     this.restService.createOffice(this.currentCustomerId, this.myFormCreateOffice.get('nameOffice').value.toUpperCase())
  //     .then(data => {
  //       const resp: any = data;
  //       console.log(resp);
  //       if (resp.success === false) {
  //         Swal({
  //           title: 'Esta sede ya esta registrada',
  //           text: 'Esta sede no se puede registrar',
  //           type: 'error'
  //          });
  //       } else {
  //    this.myFormCreateOffice.reset();
  //    document.getElementById( 'createBrandHide').click();
  //    this.getOffices(this.currentCustomerId);
  //    Swal({
  //     title: 'Sede agregada',
  //     type: 'success'
  //    });
  //     }
  //     }).catch(error => {
  //       console.log(error);
  //     });
  //     }
  //   } else {
  //     console.log('llegod');
  //     Swal({
  //       title: 'Debe seleccionar todos los campos obligatorios',
  //       text: 'Debe seleccionar todos los campos obligatorios',
  //       type: 'error'
  //      });
  //   }
  // } catch (error) {
  // console.log(error);
  // }
  // }


  messageError() {
    Swal.fire({
      title: 'Debe crear un cliente',
      text: 'Luego de crear el cliente, puedes crear sedes',
      icon: 'error'
    });
  }


  // updatedOffice(oficcerow:any) {
  //   this.currentUpdateOffice=oficcerow;
  //   console.log("cosa a actualizar");
  //   console.log(this.currentUpdateOffice);
  //   try {
  //   if ( Number(this.selectedDepartmentOfficeIdUpdate) !== 0 && Number(this.selectedCityOfficeIdUpdate) !== 0) {
  //     this.submittedOfficeUpdated = true;

  //    if ( !this.myFormUpdateOffice.invalid) {
  //     Swal({
  //       title: 'Validando información ...',
  //       allowOutsideClick: false
  //     });
  //     Swal.showLoading();

  //     let statusTemp = 0;
  //     if ( this.switchUpdate === true) {
  //       statusTemp = 0;
  //     } else {
  //       statusTemp = 1;
  //     }

  //     this.restService.updateOffice(this.currentUpdateOffice.id,25, this.myFormUpdateOffice.get('nameOfficeUpdate').value.toUpperCase())
  //     .then(data => {
  //       const resp: any = data;
  //       console.log(resp);
  //       if (resp.success === false) {
  //         Swal({
  //           title: 'Este tercero ya esta registrado',
  //           text: 'Este tercero no se puede registrar',
  //           type: 'error'
  //          });
  //       } else {
  //    Swal({
  //     title: 'Tercero agregado',
  //     type: 'success'
  //    });
  //     }
  //     }).catch(error => {
  //       console.log(error);
  //     });
  //     }
  //   } else {
  //     console.log('llegod');
  //     Swal({
  //       title: 'Debe seleccionar todos los campos obligatorios',
  //       text: 'Debe seleccionar todos los campos obligatorios',
  //       type: 'error'
  //      });
  //   }
  // } catch (error) {
  // console.log(error);
  // }
  // }

  // updatedOfficePro() {
  //   console.log("datos a actualizar");
  //   console.log(this.selectedDepartmentOfficeIdUpdate);
  //   console.log(this.selectedCityOfficeIdUpdate);

  //      try {
  //     if ( Number(this.selectedDepartmentOfficeIdUpdate.id) !== 0 && Number(this.selectedCityOfficeIdUpdate.id) !== 0) {
  //       this.submittedOffice = true;
  //       console.log('paso y no podia pasar');
  //      if ( !this.myFormUpdateOffice.invalid) {
  //       Swal({
  //         title: 'Validando información ...',
  //         allowOutsideClick: false
  //       });
  //       Swal.showLoading();
  //       let statusTemp = 0;
  //       console.log( this.switchUpdate);
  //       if ( this.switchUpdate === true) {
  //         statusTemp = 0;
  //       } else {
  //         statusTemp = 1;
  //       }
  //   console.log('llego');
  //       this.restService.updateOffice(this.currentOffice.id,this.currentCustomerId, this.myFormUpdateOffice.get('nameOfficeUpdate').value.toUpperCase())
  //       .then(data => {
  //         const resp: any = data;
  //         console.log(resp);
  //         if (resp.success === false) {
  //           Swal({
  //             title: 'Esta sede ya esta registrada',
  //             text: 'Esta sede no se puede registrar',
  //             type: 'error'
  //            });
  //         } else {
  //      this.myFormCreateOffice.reset();
  //      document.getElementById( 'createBrandHide').click();
  //      this.getOffices(this.currentCustomerId);
  //      document.getElementById('updateBrandHide').click();
  //      Swal({
  //       title: 'Sede Actualizado',
  //       type: 'success'
  //      });
  //       }
  //       }).catch(error => {
  //         console.log(error);
  //       });
  //       }
  //     } else {
  //       console.log('llegod');
  //       Swal({
  //         title: 'Debe seleccionar todos los campos obligatorios',
  //         text: 'Debe seleccionar todos los campos obligatorios',
  //         type: 'error'
  //        });
  //     }
  //   } catch (error) {
  //   console.log(error);
  //   }
  // }

  updatedCustomer() {
    console.log(this.showButtonUpdated);
    console.log('Ole ole ole kakaakkaka');
    console.log(this.selectedTypeDocumentIdUpdate);
    console.log(this.selectedPaymentConditionIdUpdate);
    console.log(this.selectedDepartmentIdUpdate);
    console.log(this.selectedCityIdUpdate);
    // console.log(this.selectedPriceListIdUpdate);

    if (Number(this.selectedTypeDocumentIdUpdate) !== 0 && Number(this.selectedPaymentConditionIdUpdate) !== 0
      && Number(this.selectedDepartmentIdUpdate) !== 0 && Number(this.selectedCityIdUpdate) !== 0) {
      this.submittedUpdated = true;
      if (!this.myFormUpdate.invalid) {
        Swal.fire({
          title: 'Validando información ...',
          allowOutsideClick: false
        });
        Swal.showLoading();

        let statusTemp = 0;
        console.log(this.switchUpdate);
        if (this.switchUpdate === false) {
          statusTemp = 1;
        }
        console.log('kakakaka');

        this.restService.updateCustomer(Number(this.idCustomerCreated), this.myFormUpdate.get('businessNameUpdate')?.value.toUpperCase(),
          this.selectedTypeDocumentIdUpdate, this.myFormUpdate.get('documentIdUpdate')?.value,
          this.myFormUpdate.get('telephoneUpdate')?.value, this.myFormUpdate.get('addressUpdate')?.value,
          statusTemp, this.myFormUpdate.get('priceMarginUpdate')?.value,
          this.selectedPaymentConditionIdUpdate, this.selectedCityIdUpdate, this.selectedDepartmentIdUpdate)
          .then(data => {
            const resp: any = data;
            console.log(JSON.stringify(resp));
            if (resp.success === false) {
              Swal.fire({
                title: 'Este tercero ya esta registrado',
                text: 'Este tercero no se puede registrar',
                icon: 'error'
              });
            } else {

              this.getMasters(1);
              // this.getOffices();



              console.log('Cambio');
              /*Swal({
               title: 'tercero agregada',
               type: 'success'
              });*/
              //   this.router.navigateByUrl('master/registerBrand');

              // document.getElementById( 'createBrandHide').click();
              // this.loadingData();
              Swal.fire({
                title: 'Tercero agregado',
                icon: 'success'
              });
            }
          }).catch(error => {
            console.log(error);
          });
      }
    } else {
      Swal.fire({
        title: 'Debe seleccionar todos los campos obligatorios',
        text: 'Debe seleccionar todos los campos obligatorios',
        icon: 'error'
      });
    }
  }




  onChangeCreated(check: any) {
    // this.switchUpdate = check;
    this.enabledCreated = check;
    // this.enabledUpdated = this.enabledCreated ;
  }


  onChangeCreatedOfficeUpdate(check: any) {
    this.enabledCreatedOfficeUpdate = check;
  }

  onChangeCreatedOffice(check: any) {
    this.enabledCreatedOffice = check;

  }

  onChangeUpdated(check: any) {
    this.switchUpdate = check;
    this.enabledUpdated = check;
  }
  getMasters(indice: number) {
    // console.log(this.opcionSeleccionado);
    this.restService.getMastersThird().then(data => {
      const resp: any = data;
      console.log('Info de getMaster');
      console.log('---------------------');
      console.log(resp);
      this.dataMasters = data;
      this.paymentConditions = this.dataMasters.payment_condition;
      this.typeDocuments = this.dataMasters.documents;
      this.departments = this.dataMasters.department;
      this.priceList = this.dataMasters.price_list;

      this.selectedTypeDocumentIdUpdate = this.dataMasters.documents;
      //  this.selectedPriceListIdUpdate = this.dataMasters.price_list;
      this.selectedPaymentConditionIdUpdate = this.dataMasters.payment_condition;
      this.selectedDepartmentIdUpdate = this.dataMasters.department;
      //this.selectedCityIdUpdate: any = 0;

      console.log('master');
      console.log(data);
      Swal.close();

      /* if (indice === 1) {

         console.log('oleole2');
         console.log(this.selectedTypeDocumentId);
         console.log(this.selectedTypeDocumentId.id);
         this.selectedTypeDocumentIdUpdate = '3'; // String(this.selectedTypeDocumentId.id);
         this.selectedPriceListIdUpdate = this.selectedPriceListId;
         this.selectedPaymentConditionIdUpdate = this.selectedPaymentConditionId;
         this.selectedDepartmentIdUpdate = this.selectedDepartmentId;
         this.selectedCityIdUpdate = this.selectedCityIdUpdate;
       }*/
    }).catch(error => {
      console.log(error);
    });

  }

  getOffices(idCustomer: number) {
    // console.log(this.opcionSeleccionado);
    this.restService.getCustomerOffice(idCustomer).then(data => {
      console.log('que mas ps');
      const resp: any = data;
      console.log(resp);
      this.dataOffices = resp.data_branchoffices;
      //   this.dataOffices = this.dataOffices.data;
      console.log('master');
      Swal.close();
      // this.cities = resp.data;
      console.log(this.dataOffices);
    }).catch(error => {
      console.log(error);
    });

  }


  deleteBrand(brand: any) {
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
          this.elementDelete = brand;
          console.log(brand);
          console.log(this.elementDelete);
          Swal.showLoading();
          this.restService.deleteOffice(Number(this.elementDelete.id))
            .then(data => {
              Swal.showLoading();
              const resp: any = data;
              console.log(resp);

              if (resp.success === false) {
                Swal.fire({
                  title: 'Esta marca presenta problemas',
                  text: 'Esta marca no se puede eliminar',
                  icon: 'error'
                });
              } else {
                // this.router.navigateByUrl('master/registerBrand');
                Swal.fire({
                  title: 'Marca eliminada',
                  icon: 'success'
                });
              }
            }).catch(error => {
              console.log(error);
            });
        } else {
          // Swal('Fail');
        }
        console.log(willDelete);
      });
  }



  onChange(d: any) {
    console.log('jajaja');
    console.log(d);
  }

  preview(files:any) {
    if (files.length === 0) {
      return console.log('jaja');
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

  get checkForm() { return this.myForm.controls; }
  get checkFormUpdate() { return this.myFormUpdate.controls; }
  get checkFormOffice() { return this.myFormCreateOffice.controls; }
  get checkFormOfficeUpdate() { return this.myFormUpdateOffice.controls; }

}
