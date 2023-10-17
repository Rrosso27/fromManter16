import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { RestService } from "../../master-services/Rest/rest.service";
import { Router } from "@angular/router";
import { UploadService } from "../../master-services/services/upload.service";
// import Swal from "sweetalert2";
import Swal from 'sweetalert2/dist/sweetalert2.js'


@Component({
  selector: "app-master-branch-office",
  templateUrl: "./master-branch-office.component.html",
  styleUrls: [
    "./master-branch-office.component.scss",
    "../../../assets/icon/icofont/css/icofont.scss",
  ],
})
export class MasterBranchOfficeComponent implements OnInit {
  active = false;
  inactive = false;
  filterIndicatorText = false;
  rowsTemp: any;
  rowStatic: any;
  change = true;
  rowsClient: any;
  regional: any;

  elementDelete: any;
  filterIndicatorCheck = false;

  rowsTempCheck: any;
  rowsTempText: any;

  myForm: FormGroup;
  submittedOffice = false;
  enabledCreated = true;
  switchUpdate = true;
  showButtonUpdated = 0;

  code: any;
  description = "";

  regionals: any;
  selectedCustomer: any = 0;
  idConstCenter : any ;
  currentOffice: any = 0;
  myFormUpdate: FormGroup;
  submittedUpdated = false;

  codeUpdate: any;
  descriptionUpdate = "";
  idCostCenter: any;
  constCenter: any;
  regionalsUpdate : any;
  selectedRegionalUpdate: any;
  selectedRegionalId: any = 0;
  dataOffices: any;

  constructor(
    private restService: RestService,
    private router: Router,
    private uploadService: UploadService
  ) {
    this.getMasters();

    const description = new FormControl("", Validators.required);
    const regionalId = new FormControl("", Validators.required);

    const descriptionUpdate = new FormControl("", Validators.required);
    const regionalIdUpdate = new FormControl("", Validators.required);

    this.myForm = new FormGroup({
      description: description,
      regionalId: regionalId,
    });

    this.myFormUpdate = new FormGroup({
      descriptionUpdate: descriptionUpdate,
      regionalIdUpdate: regionalIdUpdate,
    });
    this.getRegional();
  }

  getRegional() {
    this.restService
      .getRegionalAll()
      .then((data) => {
        const resp: any = data;
        Swal.close();
        this.regional = resp.data;
      })
      .catch((error) => {
      });
  }

  getMasters() {
    Swal.fire({
      title: "Validando información ...",
      allowOutsideClick: false,
    });
    Swal.showLoading();

    this.restService
      .getCustomer()
      .then((data) => {
        const resp: any = data;
        Swal.close();
        this.rowsClient = resp.data;

      })
      .catch((error) => {
        console.log(error);
      });
  }

  showCreate() {
    if (Number(this.selectedCustomer) !== 0) {
      document.getElementById("registerOffice")?.click();
    } else {
      Swal.fire({
        title: "No hay cliente selecionado",
        text: "Se debe seleccionar un cliente primero",
        icon: "error",
      });
    }
  }
  sendOffice() {
    try {


      if (Number(this.selectedCustomer) !== 0) {
        if (Number(this.selectedRegionalId) !== 0) {
          this.submittedOffice = true;
          if (!this.myForm.invalid) {
            Swal.fire({
              title: "Validando información ...",
              allowOutsideClick: false,
            });
            Swal.showLoading();

            this.restService
              .createOffice(
                this.selectedCustomer,
                this.myForm.get("description")?.value.toUpperCase(),
                this.myForm.get("regionalId")?.value,
              )
              .then((data) => {
                const resp: any = data;
                if (resp.success === false) {
                  Swal.fire({
                    title: "Esta sede ya esta registrada",
                    text: "Esta sede no se puede registrar",
                    icon: "error",
                  });
                } else {
                  this.getOffices();
                  document.getElementById("createBrandHide")?.click();
                  this.myForm.reset();
                  Swal.fire({
                    title: "Sede agregada",
                    icon: "success",
                  });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        } else {
          Swal.fire({
            title: "Debe seleccionar todos los campos obligatorios",
            text: "Debe seleccionar la sucursal",
            icon: "error",
          });
        }
      } else {
        Swal.fire({
          title: "Debe seleccionar todos los campos obligatorios",
          text: "Debe seleccionar el cliente",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  getOffices() {
    this.restService
      .getCustomerOffice(this.selectedCustomer)
      .then((data) => {
        const resp: any = data;
        this.dataOffices = resp.data_branchoffices;
        this.rowsTemp = resp.data_branchoffices;

      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateBrand(brand:any) {
    this.currentOffice = brand;

    this.myFormUpdate
      .get("descriptionUpdate")
      ?.setValue(this.currentOffice.branch_name);
    this.selectedRegionalUpdate = this.currentOffice.regional_id;

    document.getElementById("uploadBrand")?.click();
  }

  updatedOffice() {

    try {
      if (Number(this.selectedCustomer) !== 0) {
        this.submittedOffice = true;
        if (!this.myFormUpdate.invalid) {
          Swal.fire({
            title: "Validando información ...",
            allowOutsideClick: false,
          });
          Swal.showLoading();

          this.restService
            .updateOffice(
              this.currentOffice.id,
              this.selectedCustomer,
              this.myFormUpdate.get("descriptionUpdate")?.value.toUpperCase(),
              this.myFormUpdate.get("regionalIdUpdate")?.value,
            )
            .then((data) => {
              const resp: any = data;
              if (resp.success === false) {
                Swal.fire({
                  title: "Esta sede ya esta registrada",
                  text: "Esta sede no se puede registrar",
                  icon: "error",
                });
              } else {
                this.myFormUpdate.reset();
                this.getOffices();
                document.getElementById("updateBrandHide")?.click();
                Swal.fire({
                  title: "Sede Actualizada",
                  icon: "success",
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else {
        Swal.fire({
          title: "Debe seleccionar todos los campos obligatorios",
          text: "Debe seleccionar todos los campos obligatorios",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  deleteBrand(brand: any) {
    Swal.fire({
      title: "Estás seguro de eliminar este elemento?",
      // text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Si",
    }).then((willDelete) => {
      if (willDelete.value) {
        this.elementDelete = brand;

        Swal.showLoading();
        this.restService
          .deleteOffice(Number(this.elementDelete.id))
          .then((data) => {
            Swal.showLoading();
            const resp: any = data;
            this.getOffices();
            if (resp.success === false) {
              Swal.fire({
                title: "Esta sede presenta problemas",
                text: "Esta sede no se puede eliminar",
                icon: "error",
              });
            } else {
              // this.router.navigateByUrl('master/registerBrand');
              Swal.fire({
                title: "Sede eliminada",
                icon: "success",
              });
            }
          })
          .catch((error) => {
          });
      } else {
        // Swal('Fail');
      }
    });
  }

  ngOnInit() { }

  get checkForm() {
    return this.myForm.controls;
  }
  get checkFormUpdate() {
    return this.myFormUpdate.controls;
  }
}
