import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { SupportService } from '../../master-services/support/support.service';
import { UUID } from 'angular2-uuid';
import { stringify } from 'querystring';

@Component({
  selector: 'app-master-support-register',
  templateUrl: './master-support-register.component.html',
  styleUrls: ['./master-support-register.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterSupportRegisterComponent implements OnInit {

  selectedFilesImages: Array<File> = [];
  selectedFiles: Array<File> = [];
  urlsImages = [];
  showSaveFile = false;


  subject: any = '';
  description: any = '';
  s3info: any;
  cellphone:any;

  constructor(private supportService: SupportService, private router:Router) { }

  uploadAll() {
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    if ((this.description!='') || (this.subject!='')) {

      this.registerheader();
    }else{

      this.generalAlert("Ha ocurrido un error","Complete todos los campos obligatorios","error");
    }

  }

  registerheader(){
    console.log(this.description);
     /* swal({
        title: 'Obteniendo información ...',
        allowOutsideClick: false
      });
      swal.showLoading();*/
      const params = 'description='+this.description+'&subject='+this.subject+'&name='+localStorage.getItem('name')+'&email='+localStorage.getItem('email')+'&username='+localStorage.getItem('username');
      this.supportService.storeTicket(this.description, this.subject, localStorage.getItem('name'), localStorage.getItem('email'), localStorage.getItem('username'),localStorage.getItem('userid'), this.cellphone).then(data=>{
        const resp:any=data;

        if(resp.success){
          console.log('ingreso en la parte de las imagenes');
         // if(this.selectedFilesImages.length>0){
            this.uploadFilesImages(resp.data.id);
          /*}else{

            swal({
              title: 'Ticket registrado',
              type: 'success'
            });

              this.goAdminRoutines();
          }*/

        }else{
          this.generalAlert("Error","Ha ocurrido un error","error");
        }
      }).catch(err=>{

        console.log(err);
        this.generalAlert("Ha ocurrido un error","Ocurrio un error durante la ejecución","error");
      });
  }

  registerHeaderSupport(url: any){
    console.log(this.description);
      swal({
        title: 'Obteniendo información ...',
        allowOutsideClick: false
      });
      swal.showLoading();
      const params = 'description='+this.description+'&subject='+this.subject+'&name='+localStorage.getItem('name')+'&email='+localStorage.getItem('email')+'&username='+localStorage.getItem('username');
      this.supportService.storeTicketSupport(this.description, this.subject, localStorage.getItem('name'), localStorage.getItem('email'), localStorage.getItem('username'),localStorage.getItem('userid'), url, this.cellphone).then(data=>{
        const resp:any=data;
        console.log(JSON.stringify(resp));

        if(resp.status){
          swal({
            title: 'Ticket registrado',
            type: 'success'
          });
            this.goAdminRoutines();
        }else{
          swal({
            title: 'Ticket registrado',
            type: 'success'
          });
          this.goAdminRoutines()
        }
      }).catch(err=>{

        console.log(err);
        this.generalAlert("Ha ocurrido un error","Ocurrio un error durante la ejecución","error");
      });
  }

  uploadFilesImages(ticket) {
    let count = 1;
    console.log(this.selectedFilesImages);

    if(this.selectedFilesImages.length>0){

    let location = [];
    for (let fileCurrent of this.selectedFilesImages) {
      const file = fileCurrent[0];
      console.log(file);
      var img = new Image();
      img = file;
      console.log(img);
      img.width = 30;
      img.height = 300;

      const uuid = UUID.UUID();

      const extension = (file.name.substring(file.name.lastIndexOf('.'))).toLowerCase();
      console.log(extension);
      // 1 son las imagenes
      let nameTemp = this.removeAccents( this.normalizes(file.name.replace(/\s/g, "")));
      this.supportService.uploadFilesAll(img,  nameTemp, ticket).then(res => {
        console.log('s3info' + JSON.stringify(res));
        this.s3info = res;
        console.log(this.s3info);
        location.push(this.s3info.Location);
        console.log(count);
        console.log(this.selectedFilesImages.length);
        if(count == this.selectedFilesImages.length){
          console.log(location);
          swal.close();
          // this.goAdminRoutines();
          this.registerHeaderSupport(location)
        }
        count ++;

      }).catch(error => {
        console.log(error);
        swal({
          type: 'error',
          title: 'Oops a currido un error',
          text: 'Se ha presentado un error al subir la imagen',
          allowOutsideClick: false
        });
      });

    /*swal({
      title: 'Ticket registrado',
      type: 'success'
    });

      this.goAdminRoutines();*/
    }
  }else{
    this.registerHeaderSupport(location);
  }

  }


  normalizes = (function () {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç$#+*%&!¡¿?|¬",
      to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};

    for (var i = 0, j = from.length; i < j; i++)
      mapping[from.charAt(i)] = to.charAt(i);

    return function (str) {
      var ret = [];
      for (var i = 0, j = str.length; i < j; i++) {
        var c = str.charAt(i);
        if (mapping.hasOwnProperty(str.charAt(i)))
          ret.push(mapping[c]);
        else
          ret.push(c);
      }
      return ret.join('');
    }

  })();

  onSelectFileImage(event) {

    console.log('tamaño de la imagen: ' + event.target.files.length);

    var filesAmount = event.target.files.length;
    var filename = event.target.files[event.target.files.length - 1].name;
    console.log('Importante');

    var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
    console.log(allowedExtensions.exec(filename));
    var extFilename = filename.split('.').pop();

    if (extFilename === 'jpg' || extFilename === 'jpeg' || extFilename === 'png') {

      console.log(filename);
      console.log(this.urlsImages);
      console.log('que es esto ' + filesAmount);
      console.log('tamaño de vector:' + this.urlsImages.length);
      console.log(event.target.files + '---' + event.target.files[0]);
      // if (this.urlsImages.length < 1) {
        if (event.target.files && event.target.files[0]) {
          this.selectedFilesImages.push(event.target.files);
          for (let i = 0; i < filesAmount; i++) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
              console.log(event.target.result);

              this.urlsImages.push(event.target.result);

            }
            reader.readAsDataURL(event.target.files[i]);
          }
        }
      // } else {
      //   swal({
      //     title: 'El numero maximo de imagenes son 1',
      //     text: 'No se pueden cargar mas de 1 imagenes',
      //     type: 'error'
      //   });
      // }
      console.log(this.urlsImages);
    } else {
      swal({
        title: 'El formato del archivo, no es correcto',
        text: 'Se permiten solo estas extensiones jpg, jpeg, png',
        type: 'error'
      });
    }
  }


  removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  deleteImage(i: number) {
      console.log('Este es el valor de i ' + i);
      console.log(i);
      this.urlsImages.splice(i, 1);
      this.selectedFilesImages.splice(i, 1);
  }



  generalAlert(title:string,message:string,type:any){
    swal({
      title:title,
      text: message,
      type: type
     });
  }

  goAdminRoutines(){

    this.router.navigateByUrl('support/supportMain');
  }

  ngOnInit() {
  }

}
