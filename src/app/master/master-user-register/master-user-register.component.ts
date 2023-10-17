import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CustomValidators } from "ng2-validation";
import { UserService } from "../../master-services/User/user.service";
import swal from "sweetalert2";
import { UserInternalInterface } from "../../master-models/user-internal";
import { Router } from "@angular/router";
import { RestService } from "../../master-services/Rest/rest.service";

@Component({
  selector: "app-master-user-register",
  templateUrl: "./master-user-register.component.html",
  styleUrls: [
    "./master-user-register.component.scss",
    "../../../assets/icon/icofont/css/icofont.scss",
  ],
})
export class MasterUserRegisterComponent implements OnInit {
  myForm: FormGroup;
  myUpdateForm: FormGroup;
  mynumberForm: FormGroup;
  mytooltipForm: FormGroup;
  checkdropForm: FormGroup;
  loading: boolean;
  name: string;
  a: "aaa";
  load = true;
  errorProfile = false;
  userInternal: UserInternalInterface;
  submitted = false;
  rowsUser: any;
  currentUser: any;
  elementDelete: any;
  enabledUpdated = false;
  userProfile: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private restService: RestService
  ) {
    this.userProfile = localStorage.getItem("profile");
    this.loading = true;
    if (this.userProfile == 3) {
      this.getUserTechnician();
    } else {
      this.getUser();
    }
    //this.getUserCustomer();
    const name = new FormControl("", Validators.required);
    const lastname = new FormControl("", Validators.required);
    const username = new FormControl("", Validators.required);
    const cellphone = new FormControl("");
    const telephone = new FormControl("");
    const password = new FormControl("", [
      Validators.required,
      Validators.minLength(6),
    ]);
    const identification = new FormControl("", Validators.required);
    const email = new FormControl("", [Validators.required, Validators.email]);
    const profile = new FormControl("", Validators.required);
    const rpassword = new FormControl("", [
      Validators.required,
      CustomValidators.equalTo(password),
    ]);
    this.myForm = new FormGroup({
      name: name,
      lastname: lastname,
      username: username,
      cellphone: cellphone,
      telephone: telephone,
      email: email,
      password: password,
      rpassword: rpassword,
      identification: identification,
      profile: profile,
    });

    const updatename = new FormControl("", Validators.required);
    const updatelastname = new FormControl("", Validators.required);
    const updateusername = new FormControl("", Validators.required);
    const updatecellphone = new FormControl("");
    const updatetelephone = new FormControl("");
    const updateemail = new FormControl("", [
      Validators.required,
      Validators.email,
    ]);
    const updateprofile = new FormControl("", Validators.required);
    this.myUpdateForm = new FormGroup({
      updatename: updatename,
      updatelastname: updatelastname,
      updateusername: updateusername,
      updatecellphone: updatecellphone,
      updatetelephone: updatetelephone,
      updateemail: updateemail,
      updateprofile: updateprofile,
    });

    /* if (this.load) {
      swal({
        title: 'Sweet!',
        allowOutsideClick: false
      });
      swal.showLoading();
    }

    setTimeout(() => {
      this.load = false;
      swal.close();
      }, 10000);
    console.log('Importante verificar ');

    this.userService.createUser().then(data => {
    const resp = data;
     console.log(resp);
    });

*/
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    if (val == "") {
      this.getUser();
    } else {
      this.filter(val);
    }
  }

  filter(description: any) {
    this.userService
      .filter(description)
      .then((data) => {
        const resp: any = data;
        swal.close();
        this.rowsUser = resp.data;
        console.log(resp.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  ngOnInit() {}

  getUser() {
    swal({
      title: "Obteniendo información ...",
      allowOutsideClick: false,
    });
    swal.showLoading();
    this.userService
      .getUsers()
      .then((data) => {
        const resp: any = data;
        if (resp.error) {
          swal({
            title: "Error",
            text: "Ha ocurrido un error",
            type: "error",
          });
        } else {
          console.log(data);
          swal.close();
          this.rowsUser = resp.data;
        }
      })
      .catch((error) => {
        swal.close();
        swal({
          title: "Error",
          text: "Ha ocurrido un error",
          type: "error",
        });
        console.log(error);
      });
  }

  getUserTechnician() {
    swal({
      title: "Obteniendo información ...",
      allowOutsideClick: false,
    });
    swal.showLoading();
    this.restService
      .getTechnician()
      .then((data) => {
        const resp: any = data;
        if (resp.error) {
          swal({
            title: "Error",
            text: "Ha ocurrido un error",
            type: "error",
          });
        } else {
          console.log(data);
          swal.close();
          this.rowsUser = resp.data;
          console.log(this.rowsUser);
        }
      })
      .catch((error) => {
        swal.close();
        swal({
          title: "Error",
          text: "Ha ocurrido un error",
          type: "error",
        });
        console.log(error);
      });
  }

  getUserCustomer() {
    swal({
      title: "Obteniendo información ...",
      allowOutsideClick: false,
    });
    swal.showLoading();
    this.userService
      .getUsersCustomer()
      .then((data) => {
        const resp: any = data;
        if (resp.error) {
          swal({
            title: "Error",
            text: "Ha ocurrido un error",
            type: "error",
          });
        } else {
          console.log(data);
          swal.close();
          this.rowsUser = resp.data;
          console.log(this.rowsUser);
        }
      })
      .catch((error) => {
        swal.close();
        swal({
          title: "Error",
          text: "Ha ocurrido un error",
          type: "error",
        });
        console.log(error);
      });
  }
  sendUser() {
    this.submitted = true;
    if (!this.myForm.invalid) {
      swal({
        title: "Validando información ...",
        allowOutsideClick: false,
      });
      swal.showLoading();
      this.errorProfile = false;
      this.userService
        .createUserInternal(
          this.myForm.get("name").value,
          this.myForm.get("lastname").value,
          this.myForm.get("name").value +
            " " +
            this.myForm.get("lastname").value,
          this.myForm.get("username").value,
          this.myForm.get("cellphone").value,
          this.myForm.get("telephone").value,
          this.myForm.get("password").value,
          this.myForm.get("rpassword").value,
          this.myForm.get("email").value,
          this.myForm.get("profile").value,
          0
        )
        .then((data) => {
          const resp: any = data;
          if (resp.error) {
            let msg = "";
            if (resp.error.message === "The username already exists.") {
              msg = "El usuario ya existe";
            } else {
              msg = "El correo electrónico ya existe";
            }
            swal({
              title: msg,
              text: "Este usuario no se puede registrar",
              type: "error",
            });
          } else {
            swal({
              title: "Usuario agregado",
              type: "success",
            }).then((data) => {
              this.getUser();
            });
            this.router.navigateByUrl("master");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.errorProfile = true;
    }
  }

  updateUser() {
    console.log("info");
    console.log(
      this.myUpdateForm.get("updatename").value,
      this.myUpdateForm.get("updatelastname").value,
      this.myUpdateForm.get("updatename").value +
        " " +
        this.myUpdateForm.get("updatelastname").value,
      this.myUpdateForm.get("updateusername").value,
      this.myUpdateForm.get("updatecellphone").value,
      this.myUpdateForm.get("updatetelephone").value,
      this.myUpdateForm.get("updateemail").value,
      this.currentUser.id,
      this.myUpdateForm.get("updateprofile").value
    );
    this.submitted = true;
    if (!this.myUpdateForm.invalid) {
      swal({
        title: "Validando información ...",
        allowOutsideClick: false,
      });
      swal.showLoading();
      this.errorProfile = false;

      this.userService
        .updateUser(
          this.myUpdateForm.get("updatename").value,
          this.myUpdateForm.get("updatelastname").value,
          this.myUpdateForm.get("updatename").value +
            " " +
            this.myUpdateForm.get("updatelastname").value,
          this.myUpdateForm.get("updateusername").value,
          this.myUpdateForm.get("updatecellphone").value,
          this.myUpdateForm.get("updatetelephone").value,
          this.myUpdateForm.get("updateemail").value,
          this.currentUser.id,
          this.myUpdateForm.get("updateprofile").value,
          0
        )
        .then((data) => {
          const resp: any = data;
          console.log(resp);
          if (resp.error) {
            let msg = "";
            console.log(resp.error);
            if (resp.error.message == "The username already exists.") {
              msg = "El usuario ya existe";
            }
            if (resp.error.message == "The email already exists.") {
              msg = "El correo electrónico ya existe";
            } else {
              msg = "ocurrio un error";
            }
            swal({
              title: msg,
              text: "Este usuario no se puede actualizar",
              type: "error",
            });
          } else {
            swal({
              title: "Usuario actualizado",
              type: "success",
            }).then((data) => {
              this.getUser();
            });
            this.router.navigateByUrl("master");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.errorProfile = true;
    }
  }

  get checkForm() {
    return this.myForm.controls;
  }

  get checkUpdateForm() {
    return this.myUpdateForm.controls;
  }

  public saveEmail(email: string): void {
    console.log("");
  }

  public handleRefusalToSetEmail(dismissMethod: string): void {
    // dismissMethod can be 'cancel', 'overlay', 'close', and 'timer'
    // ... do something
  }

  openAjaxSwal() {
    swal({
      title: "Estás seguro?",
      // text: 'Once deleted, you will not be able to recover this imaginary file!',
      type: "warning",
      showConfirmButton: true,
      showCancelButton: true,
    }).then((willDelete) => {
      if (willDelete.value) {
        swal(this.a);
        this.kilo();
      } else {
        swal("Fail");
      }
      console.log(willDelete);
    });
  }

  deleteUser(row: any) {
    swal({
      title: "Estás seguro de eliminar este elemento?",
      type: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Si",
    }).then((willDelete) => {
      swal.showLoading();
      if (willDelete.value) {
        this.elementDelete = row;
        console.log(row);
        console.log(this.elementDelete);
        this.userService
          .deleteUsers(Number(this.elementDelete.id))
          .then((data) => {
            swal.showLoading();
            const resp: any = data;
            console.log(resp);

            if (resp.success === false) {
              swal({
                title: "Este Usuario presenta problemas",
                text: "Este Usuario no se puede eliminar",
                type: "error",
              });
            } else {
              swal({
                title: "Usuario eliminada",
                type: "success",
              }).then((data) => {
                this.getUser();
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

  showUpdateUser(row) {
    /*  console.log(row);
    this.currentUser = row;
    console.log( this.currentUser );
    this.myUpdateForm.get('updatename').setValue(row.first_name);
    this.myUpdateForm.get('updatelastname').setValue(row.last_name);
    this.myUpdateForm.get('updateusername').setValue(row.username);
    this.myUpdateForm.get('updatecellphone').setValue(row.cellphone);
    this.myUpdateForm.get('updatetelephone').setValue(row.telephone);
    this.myUpdateForm.get('updateemail').setValue(row.email);
    this.myUpdateForm.get('updateprofile').setValue(row.profile_id);
    if (this.currentUser.status === '0') {
      this.enabledUpdated = true;
    } else {
      this.enabledUpdated = false;
    }

    document.getElementById( 'uploadUser').click();*/
    console.log(row);
    this.router.navigateByUrl("maintenance/externalUserUpdate/" + row.id);
  }

  createdUser() {
    this.router.navigateByUrl("maintenance/externalUser");
  }

  public kilo() {
    console.log("kilo");
  }
}
