import { Component, OnInit } from '@angular/core';
import { UserService } from "../../master-services/User/user.service";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-master-change-password',
  templateUrl: './master-change-password.component.html',
  styleUrls: ['./master-change-password.component.scss']
})
export class MasterChangePasswordComponent implements OnInit {
  tokeninfo: any;
  constructor(private userService: UserService,
    private activatedroute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
  }

  changePassword(password: string, confirmpassword: string) {
    alert(localStorage.getItem('email'));
    Swal.fire({
      title: 'Procesando información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();
    if (password != confirmpassword) {
      Swal.close();
      Swal.fire({
        title: "error",
        text: "las contraseñas no coinciden.",
        icon: "error",
        allowOutsideClick: false
      })
    } else {
      this.userService.changePassword( String(localStorage.getItem('email')), password, confirmpassword, "").then(data => {
        const resp: any = data;
        if (resp.error) {
          Swal.close();
          Swal.fire({
            title: 'Error',
            text: 'Ha ocurrido un error',
            icon: 'error'
          });
        } else {
          Swal.close();
          Swal.fire({
            title: 'Realizado correctamente',
            text: 'Se ha cambiado sucontraseña correctamente!',
            icon: 'success'
          });
        }
      }).catch(error => {
        Swal.close();
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error',
          icon: 'error'
        });
        console.log(error);
      })

    }
  }

}
