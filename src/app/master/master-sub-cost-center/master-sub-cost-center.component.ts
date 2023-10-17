import { Component, OnInit } from "@angular/core";
import swal from "sweetalert2";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { RestService } from "../../master-services/Rest/rest.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-master-sub-cost-center",
  templateUrl: "./master-sub-cost-center.component.html",
  styleUrls: [
    "./master-sub-cost-center.component.scss",
    "../../../assets/icon/icofont/css/icofont.scss",
  ],
})
export class MasterSubCostCenterComponent implements OnInit {
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
  description = "";

  costCenter: any;
  selectedCostCenter: any = 0;
  idSubConstCenter;
  currentSubCostCenter: any = 0;
  myFormUpdate: FormGroup;
  submittedUpdated = false;

  subCostCenter: any;
  codeUpdate: any;
  descriptionUpdate = "";
  constCenter: any;
  costCenterUpdate;
  selectedCostCenterUpdate: any;

  regionals: any;
  selectedRegional: any = 0;
  selectedRegionalUpdate: any;

  constructor(private restService: RestService, private router: Router) {
    this.loadingData();
    const code = new FormControl("", Validators.required);
    const description = new FormControl("", Validators.required);
    const costCenter = new FormControl("", Validators.required);

    const codeUpdate = new FormControl("", Validators.required);
    const descriptionUpdate = new FormControl("", Validators.required);
    const costCenterUpdate = new FormControl("", Validators.required);

    this.myForm = new FormGroup({
      code: code,
      description: description,
      costCenter: costCenter,
    });

    this.myFormUpdate = new FormGroup({
      codeUpdate: codeUpdate,
      descriptionUpdate: descriptionUpdate,
      costCenterUpdate: costCenterUpdate,
    });
  }

  getRegionals() {
    this.restService.getRegional().then((data) => {
      const resp: any = data;
      console.log(resp);
      this.regionals = resp.data;
      swal.close();
    });
  }

  changeValue() {
    console.log("valor");
    console.log(this.selectedCostCenterUpdate);
    console.log("valor");
  }

  getCostCenter() {
    this.restService.getCostCenter().then((data) => {
      const resp: any = data;
      console.log(resp);
      this.costCenter = resp.data;
      swal.close();
    });
  }

  sendCostCenter() {
    console.log("Ole ole ole");
    console.log(this.code);
    console.log(this.description);
    console.log(this.selectedCostCenter);

    if (Number(this.selectedCostCenter) !== 0) {
      this.submitted = true;
      if (!this.myForm.invalid) {
        swal({
          title: "Validando información ...",
          allowOutsideClick: false,
        });
        swal.showLoading();
        this.restService
          .createSubCostCenter(
            this.myForm.get("description").value.toUpperCase(),
            this.myForm.get("code").value,
            this.selectedCostCenter.id
          )
          .then((data) => {
            const resp: any = data;
            console.log(resp);
            if (resp.success === false) {
              swal({
                title: "Este sub centro de costos ya esta registrado",
                text: "Este sub centro de costos no se pudo registrar",
                type: "error",
              });
            } else {
              this.idSubConstCenter = resp.data.id;
              console.log("Cambio");
              document.getElementById("createSubCostCenterHide").click();
              this.myForm.reset();
              this.loadingData();
              swal({
                title: "Sub centro de costos agregado",
                type: "success",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      swal({
        title: "Debe seleccionar todos los campos obligatorios",
        text: "Debe seleccionar todos los campos obligatorios",
        type: "error",
      });
    }
  }

  updateSubCostCenter(row) {
    console.log(row);
    this.currentSubCostCenter = row;
    console.log(this.currentSubCostCenter);
    this.myFormUpdate.get("descriptionUpdate").setValue(row.description);
    this.myFormUpdate.get("codeUpdate").setValue(row.code);

    document.getElementById("updateSubCostCenter").click();

    this.getCostCenter();
    this.selectedCostCenterUpdate = row.regional_id;
    console.log(this.selectedCostCenterUpdate);
  }

  updateSubCostCenters() {
    console.log("Ole ole ole kakaakkaka");
    console.log(this.codeUpdate);
    console.log(this.descriptionUpdate);
    console.log(this.selectedCostCenterUpdate);

    if (Number(this.selectedCostCenterUpdate) !== 0) {
      this.submittedUpdated = true;
      if (!this.myFormUpdate.invalid) {
        swal({
          title: "Validando información ...",
          allowOutsideClick: false,
        });
        swal.showLoading();
        console.log("kakakaka");
        this.restService
          .updatSubCostCenters(
            Number(this.currentSubCostCenter.id),
            this.myFormUpdate.get("descriptionUpdate").value.toUpperCase(),
            this.myFormUpdate.get("codeUpdate").value,
            this.selectedCostCenterUpdate
          )
          .then((data) => {
            const resp: any = data;
            console.log(JSON.stringify(resp));
            if (resp.success === false) {
              swal({
                title: "Falla en la actualizacion",
                text: "Este sub centro de costos no se pudo actualizar",
                type: "error",
              });
            } else {
              console.log("Cambio");
              document.getElementById("modalUpdateSubCostCenter").click();
              this.loadingData();
              swal({
                title: "Sub centro de costos actualizada.",
                type: "success",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      swal({
        title: "Debe seleccionar todos los campos obligatorios",
        text: "Debe seleccionar todos los campos obligatorios",
        type: "error",
      });
    }
  }

  deleteSubCostCenters(brand: any) {
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
        this.restService
          .deleteSubCostCenter(Number(this.elementDelete.id))
          .then((data) => {
            swal.showLoading();
            const resp: any = data;
            console.log(resp);

            if (resp.success === false) {
              swal({
                title: "Este sub centro de costos presenta problemas",
                text: "Este sub centro de costos no se puede eliminar",
                type: "error",
              });
            } else {
              this.loadingData();
              swal({
                title: "Centro de costos eliminado",
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

  filter(input: void) {
    this.restService
      .getSubCostCenterFilter(input)
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
    // filter our data

    if (val == "") {
      console.log("hola");
      this.rowsClient = this.rowStatic;
    } else {
      console.log("chao");
      this.filter(val);
    }

    // update the rows
  }

  loadingData() {
    swal({
      title: "Validando información ...",
      allowOutsideClick: false,
    });
    swal.showLoading();

    this.restService
      .getSubCostCenter()
      .then((data) => {
        const resp: any = data;
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

  ngOnInit() {}

  blockAgents(vadr: any) {
    console.log(vadr);
  }

  get checkForm() {
    return this.myForm.controls;
  }
  get checkFormUpdate() {
    return this.myFormUpdate.controls;
  }
}
