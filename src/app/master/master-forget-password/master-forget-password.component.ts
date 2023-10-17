import { Component, OnInit, Input } from '@angular/core';
import { UserService } from "../../master-services/User/user.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-master-forget-password',
  templateUrl: './master-forget-password.component.html',
  styleUrls: ['./master-forget-password.component.scss']
})
export class MasterForgetPasswordComponent implements OnInit {
  isMobile: boolean;
  email:string;

  constructor(private userService:UserService) {
    this.isMobile = false;
    this.email="";
   }

  ngOnInit() {
    if (screen.width < 780) {
      this.isMobile = true;
    }
  }

  sendRecoveryEmail(email:string){
    Swal.fire({
      title: 'Procesando información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();
    this.email=email;
    this.userService.recoveryPassword(this.email).then(data => {
      const resp: any = data;
      if (resp.error) {
        Swal.fire({
          title:'Error',
          text: 'Ha ocurrido un error',
          icon: 'error'
         });
      } else {
        if(data=="No podemos encontrar un usuario con esa dirección de correo electrónico."){
          Swal.close();
          Swal.fire({
            title:'Correo no encontrado',
            text: 'No podemos encontrar un usuario con esa dirección de correo electrónico.!',
            icon: 'error'
           });
        }else{
          Swal.close();
          Swal.fire({
            title:'Realizado correctamente',
            text: 'Hemos enviado su enlace de restablecimiento de contraseña por correo electrónico!',
            icon: 'success'
           });
        }
    }
    }).catch(error => {
      Swal.close();
      Swal.fire({
        title:'Error',
        text: 'Ha ocurrido un error',
        icon: 'error'
       });
      console.log(error);
    });
  }

}
