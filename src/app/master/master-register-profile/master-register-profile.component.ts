import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../../master-services/User/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-master-register-profile',
  templateUrl: './master-register-profile.component.html',
  styleUrls: ['./master-register-profile.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterRegisterProfileComponent implements OnInit {


  myForm: any;
  description: any;
  submitted: boolean = true;
  rowsClient: any;

  constructor(private userService:UserService,  private router:Router) {

    const description = new FormControl('', Validators.required);

    this.myForm = new FormGroup({

     description: description,

    });
   }


 sendWarehouses() {
  console.log('Ole ole ole');

    this.submitted = true;
   if ( !this.myForm.invalid) {
    Swal.fire({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();
    this.userService.createProfile(this.myForm.get('description').value)
    .then(data => {
      const resp: any = data;
      console.log(resp);
      if (resp.success === false) {
        Swal.fire({
          title: 'Esta perfil ya esta registrada',
          text: 'Esta perfil no se pudo registrar',
          icon: 'error'
         });
      } else {
        console.log('Cambio');
        console.log(resp.data.id);
        Swal.fire({
          title: 'Perfil agregado',
          icon: 'success'
        });
        this.router.navigateByUrl('maintenance/profileUpdate/'+resp.data.id);
    }
    }).catch(error => {
      console.log(error);
    });
    }
}

get checkForm() { return this.myForm.controls; }

  ngOnInit() {
  }

}
