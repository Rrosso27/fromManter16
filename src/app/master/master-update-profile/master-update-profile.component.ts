import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../../master-services/User/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { ModulesService } from '../../master-services/modules/modules.service';

interface itemSelectInterface {// item para mostrar selccionados
  funtion?: number;
  module?: number;
  description?: string;
  active?: boolean;
}

interface itemModule {// item para mostrar selccionados
  module?: string;
  part?: Array<itemSelectInterface>;
}


@Component({
  selector: 'app-master-update-profile',
  templateUrl: './master-update-profile.component.html',
  styleUrls: ['./master-update-profile.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterUpdateProfileComponent implements OnInit {

  itemsPart: Array<itemSelectInterface> = [];
  itemPart: itemSelectInterface;

  itemsModule: Array<itemModule> = [];
  itemModule: itemModule;

  profile: any
  rowsClient: any;

  updateComponentForm: FormGroup;

  currentProfile: any;
  profileId: any;
  selectedModule: any;
  modules: any;
  functionModule: any;
  checkAllPart= false;

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute,
    private moduleServices: ModulesService) {

    this.profileId = this.activatedRoute.snapshot.params.id;
    console.log(this.profileId);
    this.getProfileSpecific(this.profileId);
    this.getWorkDetails();

    const updateComponent = new FormControl('', Validators.required);

    this.updateComponentForm = new FormGroup({
      updateComponent: updateComponent
    });
  }


  getProfileSpecific(id: number) {
    this.userService.getprofileId(id).then(data => {
      const resp: any = data;
      console.log(data);
      if (resp.error) {
        swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error',
          icon: 'error'
        });
      } else {
        console.log(resp.data);
        this.profile = resp.data;

      }
    }).catch(error => {
      swal({
        title: 'Error',
        text: 'Ha ocurrido un error',
        type: 'error'
      });
      console.log(error);
    });
  }

  getWorkDetails() {
    this.moduleServices.getModuleFuntion().then(data => {
      const resp: any = data;
      if (resp.success == true) {
        this.modules = resp.data;
        console.log(this.modules)

        for (let item of this.modules) {
          console.log(item.funtion_modules);
          for (let value of item.funtion_modules) {
            this.itemPart = {
              funtion: value.id,
              description: value.description,
              module: value.module_id,
              active: false,
            }
            this.itemsPart.push(this.itemPart);

          }
          console.log(this.itemsPart);
          this.itemModule = {
            module: item.module.description,
            part: this.itemsPart,
          }
          this.itemsModule.push(this.itemModule);
          this.itemsPart = [];
        }
        this.getProfileFun(this.profileId);
        console.log(this.itemsModule);
      }
    }).catch(error => {
      console.log(error);
      this.generalAlert("ha ocurrido un error", "ha ocurrido un error al mostrar la informacion", "error");
    });
  }
  getProfileFun(id: any) {
    this.moduleServices.getProfileFunction(id).then(data => {
      const resp: any = data;
      if (resp.success == true) {
        this.functionModule = resp.data;
        console.log(this.functionModule)
        console.log('entro entro entro');
        for (let item of this.itemsModule) {
          for (let value of item.part) {
            for (let i of this.functionModule) {
              console.log('entro');
              console.log(value);
              console.log(i);
              if ((i.modules_id == value.module) && (i.function_module_id == value.funtion)) {
                console.log('entro al if');
                value.active = true;
                console.log(value);
              }
            }
          }
        }
      }
    }).catch(error => {
      console.log(error);
      this.generalAlert("ha ocurrido un error", "ha ocurrido un error al mostrar la informacion", "error");
    });
  }

  saveFunction() {
    swal.showLoading();
    let parts = [];
    for (let item of this.itemsModule) {
      for (let value of item.part) {
        if (value.active) {
          console.log(item);
          console.log('entro');
          let result = {
            id: value.funtion,
            module: value.module,
          }
          parts.push(result);
        }
      }
    }
    console.log(parts);
    if (parts.length >= 1) {
      console.log(parts);
      this.moduleServices.createFunctionProfile(this.profileId, parts).then(data => {
        const resp: any = data;
        console.log(resp.data);
        if (resp.success == false) {
          this.generalAlert("A ocurrido un error", "A ocurrido un error al guardar la información", "error");
        } else {
          this.modules = resp.data;
          console.log(this.modules)
          swal({
            title: 'Configuración realizada.',
            type: 'success'
          });
        }
      }).catch(error => {
        console.log(error);
        this.generalAlert("A ocurrido un error", "A ocurrido un error al guardar la información", "error");
      });
    } else {
      this.generalAlert("A ocurrido un error", "Seleccione al menos un submodulo.", "error");
    }
  }

  // partChangeActive(event: any, item: any) {

  //   console.log('valor para editar');
  //   console.log(event.target.checked);
  //   console.log(item);
  //   console.log(item.id);

  //   if (event.target.checked) {
  //     this.itemPart = {
  //       funtion: item.id,
  //       description: item.description,
  //       module: item.module_id,
  //     }
  //     this.itemsPart.push(this.itemPart);
  //   } else {
  //     for (let i = 0; i < this.itemsPart.length; i++) {
  //       if (this.itemsPart[i].funtion == item.id) {
  //         console.log(item);
  //         console.log('lo encontre' + i);
  //         this.itemsPart.splice(i, 1);
  //         console.log(this.itemsPart);
  //       }
  //     }
  //   }

  // }

  checkUncheckAllPart(event: any,part:any,){
    
    console.log(event.target);
    console.log(event.target.checked);
    for (let item of part) {
        console.log('lo encontre'+item);
        item.active=event.target.checked;
        console.log(item)
      }
    }

  

  updateComponent(components: any) {
    this.currentProfile = components;
    console.log(this.currentProfile);
    this.updateComponentForm.get('updateComponent').setValue(this.currentProfile.description);
    document.getElementById('showUpdateSystem').click();

  }


  sendUpdateComponent(system: any) {
    console.log(system);
    if ((system.updateComponent != null) && (system.updateComponent != "")) {
      swal({
        title: 'Obteniendo información ...',
        allowOutsideClick: false
      });
      swal.showLoading();
      this.userService.updateProfile(this.currentProfile.id, system.updateComponent).then(data => {
        const resp: any = data;
        // this.headerInfo=resp.data;
        // console.log("header information");
        // console.log(this.headerInfo);
        this.getWorkDetails();
        this.generalAlert("Proceso completado", "Proceso completado correctamente!", "success");
        document.getElementById('updateComponentHide').click();
      }).catch(err => {
        console.log(err);
        this.generalAlert("A ocurrido un error", "Ocurrio un error durante la ecucion", "error");
      });
    } else {
      this.generalAlert("A ocurrido un error", "Complete todos los campos obligatorios", "error");
    }
  }

  generalAlert(title: string, message: string, type: any) {
    swal({
      title: title,
      text: message,
      type: type
    });
  }

  ngOnInit() {
  }

}
