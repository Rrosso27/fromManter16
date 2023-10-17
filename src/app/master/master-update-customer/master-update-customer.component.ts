import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../../master-services/Rest/rest.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UploadService } from '../../master-services/services/upload.service';
import { UUID } from 'angular2-uuid';
import { ActivatedRoute, Params } from '@angular/router';
import { getElement } from '@syncfusion/ej2-base';

interface regionalSelectInterface {// item para mostrar selccionados
  id?: number;
  code?: string,
  description?: string;
  cheked?: boolean;
}

@Component({
  selector: 'app-master-update-customer',
  templateUrl: './master-update-customer.component.html',
  styleUrls: ['./master-update-customer.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterUpdateCustomerComponent implements OnInit {

  selectedFiles: FileList;
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
  enabledCreatedOfficeUpdate: boolean;
  public imagePath;
  imgURL: any;
  public message: string;
  enabledUpdated = true;
  idCustomerCreated;

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
  itemRegional: regionalSelectInterface;
  rowsRegionals: any;
  rowsRegional: any;
  selectRegional: Array<regionalSelectInterface> = [];
  valor: any;
  regionalCustomer = [];
  documentType :any =0 ;

  constructor(private restService: RestService, private router: Router, private uploadService: UploadService,
    private rutaActiva: ActivatedRoute) {

    this.getMasters(0);
    // this.getOffices();
    this.getRegionals();
    this.currentCustomerId = this.rutaActiva.snapshot.params.id;
    this.getOffices(this.currentCustomerId);
    //    this.getRegionalId(this.currentCustomerId);
    console.log(this.currentCustomerId);

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
      cityId: cityId
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
      this.getRegionalId(this.currentCustomerId);
    }).catch(error => {
      console.log(error);
    });
  }
  ccNit() {
    // documentType

    const data = this.selectedTypeDocumentId.id;

    if (data == 1) {
      this.documentType = 0
      console.log(data)
    } else {
      this.documentType = 1
      console.log(data)

    }
  }


  validateFormat(event) {
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

  getRegionalId(id: number) {
    this.restService.getRegionalId(id).then(data => {
      const resp: any = data;
      console.log(resp);
      console.log('OEOEOEOEOEEO');
      console.log(resp.data_customerRegionals);
      console.log('----------------data_customerRegionals-----------');
      this.rowsRegionals = resp.data_customerRegionals;
      this.regional = [];


      console.log(this.rowsRegionals);
      console.log(this.rowsRegional);
      this.rowsRegional.forEach((item) => {
        console.log(item);
        this.itemRegional = {
          id: item.id,
          code: item.code,
          description: item.description,
          cheked: false
        }
        this.regionals.push(this.itemRegional);
      });
      // rowsRegionals  Son las regionales del customer
      // rowsRegional  Son las regionales del creadas

      this.rowsRegionals.forEach((value) => {
        console.log(value.regional_id);
        let index = this.regionals.indexOf(this.regionals.find(x => x.id == value.regional_id));
        console.log(index);
        if (index != -1) {

          this.itemRegional = {
            id: this.regionals[index].id,
            code: this.regionals[index].code,
            description: this.regionals[index].description,
            cheked: true
          }

          this.regionals.splice(index, 1);
          this.regionals.push(this.itemRegional);
        }
        console.log(this.regionals);
      });
      console.log(this.regional);
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
        console.log(this.regionals[i].cheked);
        this.selectRegional.push(this.regionals[i]);
      }
    }
    let regionalSelec = '';
    regionalSelec = this.currentCustomerId;
    console.log(regionalSelec);
    console.log(this.currentCustomerId);

    for (let i = 0; i < this.selectRegional.length; i++) {
      regionalSelec = regionalSelec + '@' + this.selectRegional[i].id;
    }
    console.log(this.selectRegional);
    console.log(regionalSelec);

    if (regionalSelec != '') {
      swal({
        title: 'Validando información ...',
        allowOutsideClick: false
      });
      swal.showLoading();

      this.restService.customerRegionalSelect(regionalSelec
      ).then(data => {
        const resp: any = data;
        console.log('envio');
        console.log(resp);
        if (resp.success === false) {
          swal({
            title: 'Falla en la actualizacion',
            text: 'Este cliente no se pudo actualizar',
            type: 'error'
          });
        } else {
          swal({
            title: 'Sucursales guardadas',
            type: 'success'
          });
        }
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

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.getCustomer(this.currentCustomerId);
  }

  updateBrand(brand) {
    console.log(brand);
    this.currentOffice = brand;
    console.log(this.currentOffice);
    if (this.currentOffice.status === '0') {
      this.enabledUpdated = true;
    } else {
      this.enabledUpdated = false;
    }

    this.myFormUpdateOffice.get('nameOfficeUpdate').setValue(this.currentOffice.branch_name);
    this.myFormUpdateOffice.get('telephoneOfficeUpdate').setValue(this.currentOffice.telephone);

    this.myFormUpdateOffice.get('addressOfficeUpdate').setValue(this.currentOffice.address);

    this.selectedDepartmentOfficeIdUpdate = this.currentOffice.department_id;


    if (this.currentOffice.status == 0) {
      this.enabledCreatedOfficeUpdate = true;
    } else {
      this.enabledCreatedOfficeUpdate = false;
    }



    this.getCitiesOfficeUpdate();
    this.selectedCityOfficeIdUpdate = this.currentOffice.city_id;

    document.getElementById('uploadBrand').click();
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


  selectFile(event) {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }

  ChangingValue() {
    this.selectedTypeDocumentIdUpdate = this.selectedTypeDocumentId.id;
    //  this.selectedPriceListIdUpdate = this.selectedPriceListId.id;
    this.selectedPaymentConditionIdUpdate = this.selectedPaymentConditionId.id;
    this.selectedDepartmentIdUpdate = this.selectedDepartmentId.id;
    this.selectedCityIdUpdate = this.selectedCityId.id;

    console.log(this.selectedTypeDocumentIdUpdate);
  }


  getCitiesOffice(val: any) {
    console.log(val);
    this.selectedCityOfficeId = 0;

    this.restService.getCities(Number(this.selectedDepartmentOfficeId.id)).then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      this.citiesOffice = resp.data;
      console.log(this.cities);
    }).catch(error => {
      console.log(error);
    });
  }


  getCitiesOfficeUpdate() {
    // console.log(this.opcionSeleccionado);
    this.selectedCityOfficeIdUpdate = 0;
    console.log('oleole23' + this.selectedDepartmentOfficeIdUpdate);

    this.restService.getCities(this.selectedDepartmentOfficeIdUpdate).then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
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
      swal.close();
      this.cities = resp.data;
      console.log(this.cities);
    }).catch(error => {
      console.log(error);
    });
  }

  getCustomer(id: number) {
    this.restService.getSpecificCustomer(id).then((data: any) => {
      const resp: any = data.data;
      console.log("datosfffffffff");
      console.log(resp);
      this.customer = resp;
      console.log("importar datos");
      console.log(resp.telephone);
      this.myFormUpdate.get('typeDocumentIdUpdate').setValue(resp.type_document_id);
      this.myFormUpdate.get('documentIdUpdate').setValue(resp.document_id);
      this.myFormUpdate.get('businessNameUpdate').setValue(resp.business_name);
      this.myFormUpdate.get('telephoneUpdate').setValue(resp.telephone);
      this.myFormUpdate.get('addressUpdate').setValue(resp.address);
      this.myFormUpdate.get('priceMarginUpdate').setValue(resp.price_margin);
      //  this.myFormUpdate.get('priceListIdUpdate').setValue(resp.price_list_id);
      this.myFormUpdate.get('paymentConditionIdUpdate').setValue(resp.payment_condition_id);
      this.myFormUpdate.get('departmentIdUpdate').setValue(resp.department_id);
      if (resp.status == 0) {
        this.enabledCreatedOfficeUpdate = true;
      } else {
        this.enabledCreatedOfficeUpdate = false;
      }
      this.getCitiesOfficeUpdate();
      this.getCitiesUpdate();
    }).catch(error => {
      this.messageError();
      console.log(error);
    });
  }


  getCitiesUpdate() {
    // console.log(this.opcionSeleccionado);
    this.selectedCityIdUpdate = 0;
    console.log("id:" + (Number(this.selectedDepartmentIdUpdate)));
    this.restService.getCities(Number(this.selectedDepartmentIdUpdate)).then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      this.cities = resp.data;
      console.log(this.cities);
      this.myFormUpdate.get('cityIdUpdate').setValue(this.customer.city_id);
      console.log("se asigno");
    }).catch(error => {
      console.log(error);
    });
  }



  messageError() {
    swal({
      title: 'Debe crear un cliente',
      text: 'Luego de crear el cliente, puedes crear sedes',
      type: 'error'
    });
  }

  updatedCustomer() {
    console.log(this.showButtonUpdated);
    console.log('Ole ole ole kakaakkaka');
    console.log(this.selectedTypeDocumentIdUpdate);
    console.log(this.selectedPaymentConditionIdUpdate);
    console.log(this.selectedDepartmentIdUpdate);
    console.log(this.selectedCityIdUpdate);
    // console.log(this.selectedPriceListIdUpdate);
    console.log(this.enabledCreatedOfficeUpdate);

    if (Number(this.selectedTypeDocumentIdUpdate) !== 0 && Number(this.selectedPaymentConditionIdUpdate) !== 0
      && Number(this.selectedDepartmentIdUpdate) !== 0
      && Number(this.selectedCityIdUpdate) !== 0) {
      this.submittedUpdated = true;
      if (!this.myFormUpdate.invalid) {
        swal({
          title: 'Validando información ...',
          allowOutsideClick: false
        });
        swal.showLoading();

        let statusTemp = 1;
        console.log(this.switchUpdate);
        if (this.enabledCreatedOfficeUpdate) {
          statusTemp = 0;
        }
        console.log('kakakaka');

        this.restService.updateCustomer(Number(this.customer.id), this.myFormUpdate.get('businessNameUpdate').value.toUpperCase(),
          this.selectedTypeDocumentIdUpdate, this.myFormUpdate.get('documentIdUpdate').value,
          this.myFormUpdate.get('telephoneUpdate').value, this.myFormUpdate.get('addressUpdate').value,
          statusTemp, this.myFormUpdate.get('priceMarginUpdate').value,
          this.selectedPaymentConditionIdUpdate, this.selectedCityIdUpdate, this.selectedDepartmentIdUpdate)
          .then(data => {
            const resp: any = data;
            console.log(JSON.stringify(resp));
            if (resp.success === false) {
              swal({
                title: 'Este tercero ya esta registrado',
                text: 'Este tercero no se puede registrar',
                type: 'error'
              });
            } else {

              this.getMasters(1);
              // this.getOffices();



              console.log('Cambio');
              /*swal({
               title: 'tercero agregada',
               type: 'success'
              });*/
              //   this.router.navigateByUrl('master/registerBrand');

              // document.getElementById( 'createBrandHide').click();
              // this.loadingData();
              swal({
                title: 'Tercero agregado',
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

  /*onChangeCreated(check: any) {
    this.switchUpdate = check;
    this.enabledCreated = check;
    this.enabledUpdated = this.enabledCreated ;
      }



  onChangeCreated(check: any) {
    this.switchUpdate = check;
    this.enabledCreated = check;
    this.enabledUpdated = this.enabledCreated ;
      }*/



  onChangeCreated(check: any) {
    // this.switchUpdate = check;
    this.enabledCreated = check;
    // this.enabledUpdated = this.enabledCreated ;
  }


  onChangeCreatedOfficeUpdate(check: any) {
    console.log(check);
    this.enabledCreatedOfficeUpdate = check;
  }

  onChangeCreatedOffice(check: any) {
    this.enabledCreatedOffice = check;

  }


  onChangeUpdated(check: any) {
    //  this.switchUpdate = check;
    this.enabledUpdated = check;
  }
  getMasters(indice: number) {
    // console.log(this.opcionSeleccionado);
    this.restService.getMastersThird().then(data => {
      const resp: any = data;
      this.dataMasters = data;
      this.paymentConditions = this.dataMasters.payment_condition;
      this.typeDocuments = this.dataMasters.documents;
      this.departments = this.dataMasters.department;
      //  this.priceList = this.dataMasters.price_list;
      console.log('master');
      console.log(data);
      swal.close();

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

      console.log('Importante ver la info');
      console.log(this.dataOffices);
      // this.selectedTypeDocumentIdUpdate = resp.customer.type_document_id;
      // this.selectedPriceListIdUpdate = resp.customer.price_list_id;
      // this.selectedPaymentConditionIdUpdate = resp.customer.payment_condition_id;
      // this.selectedDepartmentIdUpdate = resp.customer.department_id;
      // this.selectedCityIdUpdate = resp.data_branchoffices.city_id;
      console.log("antes de consulta " + resp.data_branchoffices[0].department_id);
      //   this.dataOffices = this.dataOffices.data;
      console.log('master');
      swal.close();
      // this.cities = resp.data;
      console.log(this.dataOffices);
    }).catch(error => {
      console.log(error);
    });
  }


  deleteBrand(brand: any) {
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
          this.elementDelete = brand;
          console.log(brand);
          console.log(this.elementDelete);
          swal.showLoading();
          this.restService.deleteOffice(Number(this.elementDelete.id))
            .then(data => {
              swal.showLoading();
              const resp: any = data;
              console.log(resp);
              this.getOffices(this.currentCustomerId);
              if (resp.success === false) {
                swal({
                  title: 'Esta marca presenta problemas',
                  text: 'Esta marca no se puede eliminar',
                  type: 'error'
                });
              } else {
                // this.router.navigateByUrl('master/registerBrand');
                swal({
                  title: 'Marca eliminada',
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



  onChange(d: any) {
    console.log('jajaja');
    console.log(d);
  }

  preview(files) {
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


  // updatedOffice() {
  //   console.log("datos a actualizar");
  //   console.log(this.currentOffice);

  //   try {
  //     if ( Number(this.selectedDepartmentOfficeIdUpdate) !== 0 && Number(this.selectedCityOfficeIdUpdate) !== 0) {
  //       this.submittedOffice = true;
  //       console.log(this.myFormCreateOffice.errors);
  //      if ( !this.myFormUpdateOffice.invalid) {
  //       swal({
  //         title: 'Validando información ...',
  //         allowOutsideClick: false
  //       });
  //       swal.showLoading();
  //       let statusTemp = 0;
  //       console.log( this.switchUpdate);
  //       if ( this.enabledCreatedOfficeUpdate === false) {
  //         statusTemp = 1;
  //       }
  //       this.restService.updateOffice(this.currentOffice.id,this.currentCustomerId, this.myFormUpdateOffice.get('nameOfficeUpdate').value.toUpperCase())
  //       .then(data => {
  //         const resp: any = data;
  //         console.log(resp);
  //         if (resp.success === false) {
  //           swal({
  //             title: 'Esta sede ya esta registrada',
  //             text: 'Esta sede no se puede registrar',
  //             type: 'error'
  //            });
  //         } else {
  //      this.myFormCreateOffice.reset();
  //      document.getElementById( 'createBrandHide').click();
  //      this.getOffices(this.currentCustomerId);
  //      document.getElementById('updateBrandHide').click();
  //      swal({
  //       title: 'Sede Actualizada',
  //       type: 'success'
  //      });
  //       }
  //       }).catch(error => {
  //         console.log(error);
  //       });
  //       }
  //     } else {
  //       console.log('llegod');
  //       swal({
  //         title: 'Debe seleccionar todos los campos obligatorios',
  //         text: 'Debe seleccionar todos los campos obligatorios',
  //         type: 'error'
  //        });
  //     }
  //   } catch (error) {
  //   console.log(error);
  //   }
  // }

  // sendOffice() {
  //   try {
  //   console.log('Ole ole ole');
  //   console.log(this.selectedDepartmentOfficeId);
  //   console.log(this.selectedCityOfficeId);
  //   if ( Number(this.selectedDepartmentOfficeId) !== 0 && Number(this.selectedCityOfficeId) !== 0) {
  //     this.submittedOffice = true;
  //     console.log('---------------');

  //    if ( !this.myFormCreateOffice.invalid) {
  //     swal({
  //       title: 'Validando información ...',
  //       allowOutsideClick: false
  //     });
  //     swal.showLoading();

  //     let statusTemp = 0;
  //     console.log( this.enabledCreatedOffice);
  //     if ( this.enabledCreatedOffice === false) {
  //       statusTemp = 1;
  //     }
  //     this.restService.createOffice(this.currentCustomerId, this.myFormCreateOffice.get('nameOffice').value.toUpperCase())
  //     .then(data => {
  //       const resp: any = data;
  //       console.log(resp);
  //       if (resp.success === false) {
  //         swal({
  //           title: 'Esta sede ya esta registrada',
  //           text: 'Esta sede no se puede registrar',
  //           type: 'error'
  //          });
  //       } else {
  //         this.myFormCreateOffice.reset();
  //         document.getElementById( 'createBrandHide').click();
  //         this.getOffices(this.currentCustomerId);
  //         swal({
  //           title: 'Sede agregada',
  //           type: 'success'
  //         });
  //       }
  //     }).catch(error => {
  //       console.log(error);
  //     });
  //     }
  //   } else {
  //     console.log('llegod');
  //     swal({
  //       title: 'Debe seleccionar todos los campos obligatorios',
  //       text: 'Debe seleccionar todos los campos obligatorios',
  //       type: 'error'
  //      });
  //   }
  // } catch (error) {
  // console.log(error);
  // }
  // }

  goAdminCustomer() {
    this.router.navigateByUrl('master/customers');
  }

  get checkForm() { return this.myForm.controls; }
  get checkFormUpdate() { return this.myFormUpdate.controls; }
  get checkFormOffice() { return this.myFormCreateOffice.controls; }
  get checkFormOfficeUpdate() { return this.myFormUpdateOffice.controls; }

}
