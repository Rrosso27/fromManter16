import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../master-services/User/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'



@Component({
  selector: 'app-master-auth',
  templateUrl: './master-auth.component.html',
  styleUrls: ['./master-auth.component.scss'],
   //=> Basic usage (forRoot can also take options, see the wiki)

})
export class MasterAuthComponent implements OnInit {
  isMobile: boolean;
  myForm: FormGroup;
  submitted = false;



  constructor(private userService: UserService, private router: Router) {
    this.isMobile = false;
    const email = new FormControl('', Validators.required);
    const password = new FormControl('', Validators.required);
    this.myForm = new FormGroup({
      email: email,
      password: password
    });
    this.distrollerToken()
  }


  ngOnInit() {
    /*if (screen.width < 780) {
      this.isMobile = true;
    }*/
  }


  get checkForm() { return this.myForm.controls; }



  distrollerToken(){
    localStorage.removeItem("token_user");
  }

  //Inicio de sesión
  doLogin() {

    this.submitted = true;
    if (!this.myForm.invalid) {



      Swal.fire({
        // icon: 'error',
        title: 'Validando información ...',
        // text: 'Tercero agregado',
      })

      Swal.showLoading();



      this.userService.generateToken(this.myForm.get('email')?.value,
        this.myForm.get('password')?.value).then(data => {
          const resp: any = data;


          if (resp.error) {
            let msg = '';
            if (resp.error === 'The user credentials were incorrect.') {
              msg = 'Usuario/Correo electrónico o Contraseña incorrecta';
            }
            Swal.fire({
              title: msg,
              text: 'Oops problemas para ingresar',
              icon: 'error',
            });
          } else {

            localStorage.setItem('token_user', resp.access_token);
            Swal.close();
            this.userService.getUserInformation(this.myForm.get('email')?.value)
              .then(data => {
                const resp: any = data;
                localStorage.setItem('profile', resp.data[0].profile_id);
                localStorage.setItem('email', resp.data[0].email);
                localStorage.setItem('username', resp.data[0].username);
                localStorage.setItem('userid', resp.data[0].id);
                localStorage.setItem('name', resp.data[0].name);
                localStorage.setItem('user', resp.data[0]);
                localStorage.setItem('idel', resp.data[0].idel);

                if (Number(resp.data[0].profile_id) === 4) {
                  Swal.fire({
                    title: 'Importante',
                    text: 'Usted tiene perfil de técnico, no tiene permiso para entrar a la plataforma web, solo a la aplicación.',
                    icon: 'warning'
                  });
                } else if (Number(resp.data[0].idel) == 1) {
                  Swal.fire({
                    title: 'Importante',
                    text: 'No tiene permiso para entrar a la plataforma web',
                    icon: 'warning'
                  });
                } else {
                  if (Number(resp.data[0].status) === 0) {
                    this.router.navigateByUrl('resetPasswordLogin'); // es poner la pagina para cambiar la contraseña

                  } else {
                    this.router.navigateByUrl('master');
                  }
                }

              }).catch(error => {
                console.log(error);
              });
          }
        }).catch(error => {
          console.log(error);
        });
    } else {
      console.log('error');
    }
  }

  doLogin2() {
    this.router.navigateByUrl('master');
  }



}
