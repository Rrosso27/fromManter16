import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RestService } from "../../master-services/Rest/rest.service";
import { ForkliftService } from "../../master-services/Forklift/forklift.service";
import swal from "sweetalert2";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../master-services/User/user.service";

@Component({
  selector: "app-master-show-forklift",
  templateUrl: "./master-show-forklift.component.html",
  styleUrls: [
    "./master-show-forklift.component.scss",
    "../../../assets/icon/icofont/css/icofont.scss",
  ],
})
export class MasterShowForkliftComponent implements OnInit {
  myForm: FormGroup;
  myFormUpdate: FormGroup;
  submitted = false;
  rowsClient: any;
  rowsTemp: any;
  rowStatic: any;
  rows: any;
  a: any = 5;
  kilo: any;
  elementDelete: any;

  switchCreate = true;
  switchUpdate = true;
  change = true;
  active = false;
  inactive = false;
  enabledUpdated = false;

  filterIndicatorText = false;
  filterIndicatorCheck = false;

  rowsTempCheck: any;
  rowsTempText: any;

  currentBrand: any;

  customers: any;

  selectedBusinessId: any = 0;
  selectedOfficeId: any = 0;
  customerOffices: any = 0;

  columns = [{ name: "Estado", prop: "status" }];

  columnWidths = [{ column: "status", width: 200 }];
  userCustomer: boolean = false;
  user_id: any;

  constructor(
    private restService: RestService,
    private router: Router,
    private forkliftService: ForkliftService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    if (
      Number(localStorage.getItem("profile")) == 6 ||
      Number(localStorage.getItem("profile")) == 7
    ) {
      this.user_id = Number(localStorage.getItem("userid"));
      this.getCustomerUser(this.user_id);
      this.userCustomer = true;
    } else {
      this.loadingData();
      this.getCustomers();
    }
    const description = new FormControl("", Validators.required);
    const descriptionUpdate = new FormControl("", Validators.required);

    this.myForm = new FormGroup({
      description: description,
    });

    this.myFormUpdate = new FormGroup({
      descriptionUpdate: descriptionUpdate,
    });
  }

  getCustomerUser(id: any) {
    this.userService
      .getUserCustomer(id)
      .then((data) => {
        const resp: any = data;
        this.customers = resp.data;
        // console.log(this.customers)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getBranchOfficeUser() {
    swal({
      title: "Validando información ...",
      text: "Cargando Sedes",
      allowOutsideClick: false,
    });
    swal.showLoading();
    this.userService
      .getBranchUser(this.selectedBusinessId, this.user_id)
      .then((data) => {
        const resp: any = data;
        this.customerOffices = resp.data;
        // console.log(this.customers)
        swal.close();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loadingData() {
    swal({
      title: "Validando información ...",
      text: "Cargando Sedes",
      allowOutsideClick: false,
    });
    swal.showLoading();

    this.forkliftService
      .getForklifts()
      .then((data) => {
        const resp: any = data;
        console.log(data);
        swal.close();
        this.rowsClient = resp.data;
        this.rowStatic = resp.data;
        this.rowsTemp = resp.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  filter(input: any) {
    this.forkliftService
      .filter(input)
      .then((data) => {
        const resp: any = data;
        this.rowsClient = resp.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    if (val === "") {
      this.rowsClient= this.rowStatic;
    } else {
      this.filter(val);
    }
  }

  updateFilterActiveInactive(active: string) {
    const val = active;

    // filter our data

    if (this.filterIndicatorText === true) {
      this.rowsTemp = this.rowsTempText;
    } else {
      console.log("vacio por este lado");
      this.rowsTemp = this.rowStatic;
    }

    const temp = this.rowsTemp.filter(function (d) {
      return d.status.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows

    if (this.inactive === true || this.active === true) {
      this.rowsTempCheck = temp;
      this.filterIndicatorCheck = true;
    }

    this.rowsClient = temp;
  }

  getCustomers() {
    this.restService
      .getCustomer()
      .then((data) => {
        const resp: any = data;
        console.log(data);
        swal.close();
        this.customers = resp.data;
        // this.rowsClient = resp.data;
        // this.rowStatic =  resp.data;
        // this.rowsTemp = resp.data;
        // console.log( this.rowsClient);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getCustomersForklift(idCustomer: number) {
    this.forkliftService
      .getForkliftsCustomer(idCustomer)
      .then((data) => {
        const resp: any = data;
        console.log("forklifts");
        console.log(data);
        swal.close();
        this.rowsClient = resp.data;
        this.rowStatic = resp.data;
        this.rowsTemp = resp.data;
        console.log(this.rowsClient);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getBranchOfficeForklift(idBranch: number) {
    this.forkliftService
      .getForkliftsBranch(idBranch)
      .then((data) => {
        const resp: any = data;
        console.log("forklifts branch");
        console.log(data);
        swal.close();
        this.rowsClient = resp.data;
        this.rowStatic = resp.data;
        this.rowsTemp = resp.data;
        console.log(this.rowsClient);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getCustomerOffice() {
    console.log(this.selectedBusinessId);
    this.getCustomersForklift(this.selectedBusinessId);
    this.restService
      .getCustomerOffice(this.selectedBusinessId)
      .then((data) => {
        const resp: any = data;
        console.log("ole ole");
        console.log(resp);
        this.customerOffices = resp.data_branchoffices;
        swal.close();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getOfficeForklift() {
    this.getBranchOfficeForklift(this.selectedOfficeId);
  }

  onChangeCreate(check: any) {
    this.change = check;
    console.log(check);
  }

  onChangeUpdate(check: any) {
    this.switchUpdate = check;
    this.enabledUpdated = check;

    console.log(check);
  }

  onChangeActive(d) {
    let indice;
    if (this.active === false) {
      this.active = true;
      if (this.inactive === true) {
        indice = "";
      } else {
        indice = "0";
      }
      this.updateFilterActiveInactive(indice);
    } else {
      this.active = false;
      if (this.inactive === true) {
        indice = "1";
      } else {
        indice = "";
      }
      this.updateFilterActiveInactive(indice);
    }
  }

  onChangeInactive(d) {
    let indice;
    if (this.inactive === false) {
      this.inactive = true;
      if (this.active === true) {
        indice = "";
      } else {
        indice = "1";
      }
      this.updateFilterActiveInactive(indice);
    } else {
      this.inactive = false;
      if (this.active === true) {
        indice = "0";
      } else {
        indice = "";
      }
      this.updateFilterActiveInactive(indice);
    }
  }

  updateForklift(forklift: any) {
    console.log(forklift);
    this.router.navigateByUrl("master/forkliftUpdate/" + forklift.id);
  }

  sendBrand() {
    console.log(localStorage.getItem("token"));
    this.submitted = true;
    if (!this.myForm.invalid) {
      swal({
        title: "Validando información ...",
        allowOutsideClick: false,
      });
      swal.showLoading();

      let statusTemp = 0;
      if (this.enabledUpdated === true) {
        statusTemp = 0;
      } else {
        statusTemp = 1;
      }
      this.restService
        .createBrand(
          this.myForm.get("description").value.toUpperCase(),
          statusTemp
        )
        .then((data) => {
          const resp: any = data;
          console.log(resp);
          if (resp.success === false) {
            swal({
              title: "Este equipo ya esta registrado",
              text: "Este equipo no se puede registrar",
              type: "error",
            });
          } else {
            this.myForm.get("description").setValue("");
            /*swal({
      title: 'equipo agregada',
      type: 'success'
     });*/
            //   this.router.navigateByUrl('master/registerBrand');

            document.getElementById("createBrandHide").click();
            this.loadingData();
            swal({
              title: "equipo agregado",
              type: "success",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  sendUpdateBrand() {
    console.log(this.myFormUpdate.get("descriptionUpdate"));
    console.log(localStorage.getItem("token"));
    this.submitted = true;
    if (!this.myFormUpdate.invalid) {
      swal({
        title: "Validando información ...",
        allowOutsideClick: false,
      });
      swal.showLoading();

      let statusTemp = 1;
      if (this.enabledUpdated === true) {
        statusTemp = 0;
      } else {
        statusTemp = 1;
      }
      console.log(
        this.myFormUpdate.get("descriptionUpdate").value.toUpperCase() +
          " " +
          statusTemp
      );
      this.restService
        .updateBrand(
          Number(this.currentBrand.id),
          this.myFormUpdate.get("descriptionUpdate").value.toUpperCase(),
          statusTemp
        )
        .then((data) => {
          const resp: any = data;
          console.log(resp);
          if (resp.success === false) {
            swal({
              title: "Esta equipo ya esta actualizado",
              text: "Esta equipo no se puede actualizar",
              type: "error",
            });
          } else {
            // this.router.navigateByUrl('master/registerBrand');
            document.getElementById("updateBrandHide").click();
            this.loadingData();
            swal({
              title: "equipo actualizado",
              type: "success",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  get checkForm() {
    return this.myForm.controls;
  }
  get checkFormUpdate() {
    return this.myFormUpdate.controls;
  }

  deleteBrand(brand: any) {
    swal({
      title: "Estás seguro de eliminar este elemento?",
      // text: 'Once deleted, you will not be able to recover this imaginary file!',
      type: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Si",
    }).then((willDelete) => {
      if (willDelete.value) {
        this.elementDelete = brand;
        console.log(brand);
        console.log(this.elementDelete);
        swal.showLoading();
        this.forkliftService
          .deleteForklift(Number(this.elementDelete.id))
          .then((data) => {
            swal.showLoading();
            const resp: any = data;
            console.log(resp);

            if (resp.success === false) {
              swal({
                title: "Esta equipo presenta problemas",
                text: "Esta equipo no se puede eliminar",
                type: "error",
              });
            } else {
              // this.router.navigateByUrl('master/registerBrand');
              this.loadingData();
              swal({
                title: "equipo eliminado",
                type: "success",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
        console.log(this.elementDelete.id);
      } else {
        // swal('Fail');
      }
      console.log(willDelete);
    });
  }

  showForklift(forklift: any) {
    console.log(forklift);
    this.router.navigateByUrl("maintenance/forkliftShow/" + forklift.id);
  }

  sendForklift() {
    this.router.navigateByUrl("/maintenance/registerForklift");
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((data) => {
      //this.name=data.get('id');
      this.selectedBusinessId = Number(data.get("customer_id"));
      // console.log(this.selectedBusinessId);
      this.selectedOfficeId = Number(data.get("office_id"));
      // console.log(this.selectedOfficeId);
      if (
        Number(localStorage.getItem("profile")) == 6 ||
        Number(localStorage.getItem("profile")) == 7
      ) {
        this.getBranchOfficeUser();
        this.userCustomer = true;
        this.getOfficeForklift();
      }
    });
  }

  blockAgents(vadr: any) {
    console.log(vadr);
  }
}
