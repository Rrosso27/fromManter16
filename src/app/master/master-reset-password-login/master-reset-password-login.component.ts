
import { UserService } from "../../master-services/User/user.service";
import { NgModel } from "@angular/forms";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-master-reset-password-login',
  templateUrl: './master-reset-password-login.component.html',
  styleUrls: ['./master-reset-password-login.component.scss']
})
export class MasterResetPasswordLoginComponent implements OnInit {

  tokeninfo:any;
  user:any;
  userId:any;
  username:any;
  email:string;
  isMobile: boolean;
  info:any;
  cansend:boolean;
  constructor(private userService:UserService,
    private router:Router) {
    this.isMobile = false;
    this.email="";
    this.cansend=false;
  }

  ngOnInit() {
    this.user = localStorage.getItem('user');
    this.userId = localStorage.getItem('userid');
    this.username = localStorage.getItem('username');
   /* Swal({
      title: 'Procesando información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();*/
    if (screen.width < 780) {
      this.isMobile = true;
    }

  /*  this.activatedroute.paramMap.subscribe(data=>{
      this.tokeninfo=data.get('token');
      console.log(this.tokeninfo);
    });
    this.userService.findToken(this.tokeninfo).then(data=>{
      Swal.close();
      if(data=="Este token de restablecimiento de contraseña no es válido."){
        Swal({
          title:'Token no valido',
          text: 'Este token de restablecimiento de contraseña no es válido.!',
          type: 'error'
         });
      }else{
        this.info=data;
        console.log(this.info.email);
        this.cansend=true;
      }
    }).catch(err=>{
      console.log('error en consumo servicio');
      Swal.close();
      Swal({
        title:'Error',
        text: 'Ha ocurrido un error',
        type: 'error'
       });
    });*/
  }

  restartPassword(){

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
        console.log(data);
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

  changePassword(password:string,confirmpassword:string){
    this.user = localStorage.getItem('user');
  //  if (this.cansend==true) {
          Swal.fire({
            title: 'Procesando información ...',
            allowOutsideClick: false
          });
          Swal.showLoading();

          console.log(password+'-'+confirmpassword);
          if (password!=confirmpassword) {
            Swal.close();
            Swal.fire({
              title:"error",
              text:"las contraseñas no coinciden.",
              icon:"error",
              allowOutsideClick:false
            })
          } else {
            // email:string,password:string,token:string,rpassword:string
            this.userService.changePasswordLogin(this.userId, password).then(data=>{
              const resp:any=data;
              if (resp.error) {
                Swal.close();
                Swal.fire({
                  title:'Error',
                  text: 'Ha ocurrido un error',
                  icon: 'error'
                });
              } else {
                Swal.close();
                Swal.fire({
                  title:'Realizado correctamente',
                  text: 'Se ha cambiado sucontraseña correctamente!',
                  icon: 'success'
                });
             this.router.navigateByUrl('masterauth');
              }
              console.log(resp);
            }).catch(error=>{
              Swal.close();
              Swal.fire({
                title:'Error',
                text: 'Ha ocurrido un error',
                icon: 'error'
              });
              console.log(error);
            })

          }
    /*} else {
      Swal({
        title:'Token no valido',
        text: 'Este token de restablecimiento de contraseña no es válido.!',
        type: 'error'
       });
    }*/
  }

}
