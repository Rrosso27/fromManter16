import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionService } from '../../master-services/question/question.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-master-question',
  templateUrl: './master-question.component.html',
  styleUrls: ['./master-question.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterQuestionComponent implements OnInit {

  active = false;
  inactive = false;
  filterIndicatorText = false;
  change = true;

  rowsTemp: any;
  rowStatic: any;
  rowsAnswer: any;
  rowsClient: any;

  myForm: FormGroup;
  myFormAnswer: FormGroup;
  myFormUpdate: FormGroup;
  myFormUpdateAnswer: FormGroup;

  submitted = false;
  enabledCreated= true;
  switchUpdate = false;
  showButtonUpdated = 0;
  enabledUpdated: any;

  submittedUpdated = false;
  enabledCreatedOfficeUpdate:boolean=true;

  elementDelete: any;
  idAnswer: any;
  idQuestion: any;
  currentAnswer: any;
  currentQuestion: any;
  filterIndicatorCheck = false;

  rowsTempCheck: any;
  rowsTempText: any;

  constructor(private questionService: QuestionService, private router: Router) {
    this.loadingData();

 //Questions
   const description = new FormControl('', Validators.required);

   const descriptionUpdate  = new FormControl('', Validators.required);

   this.myForm = new FormGroup({

     description: description,

   });

   this.myFormUpdate = new FormGroup({

    descriptionUpdate: descriptionUpdate
  });
//Answers
   const descriptionAnswers = new FormControl('', Validators.required);

   const descriptionUpdateAnswers  = new FormControl('', Validators.required);

   this.myFormAnswer = new FormGroup({

     descriptionAnswers: descriptionAnswers,

   });

   this.myFormUpdateAnswer = new FormGroup({

    descriptionUpdateAnswers: descriptionUpdateAnswers
  });
  }

  loadingData() {
    Swal.fire({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.questionService.showQuestion().then(data => {
      const resp: any = data;
      console.log(data);
      Swal.close();
      this.rowsClient = resp.data;
      this.rowStatic =  resp.data;
      this.rowsTemp = resp.data;
      console.log( this.rowsClient);
    }).catch(error => {
      console.log(error);
    });
   }

   sendQuestion(){

     if ( !this.myForm.invalid) {
      this.submitted = true;
      Swal.fire({
        title: 'Validando información ...',
        allowOutsideClick: false
      });
      Swal.showLoading();

      this.questionService.createQuestion(this.myForm.get('description')?.value.toUpperCase())
      .then(data => {
        const resp: any = data;
        console.log(resp);
        if (resp.success === false) {
          Swal.fire({
            title: 'Esta pregunta ya esta registrada',
            text: 'Esta pregunta no se pudo registrar',
            icon: 'error'
           });
        } else {
          this.idQuestion = resp.data.id;
          this.switchUpdate = true;
          console.log('Cambio');
          this.currentQuestion = resp.data;
          document.getElementById('createAnswerHide')?.click();
           document.getElementById('createQuestionHide')?.click();
           this.myFormUpdate.get('descriptionUpdate')?.setValue(this.currentQuestion.description);
           this.getAnswer(this.idQuestion);
           document.getElementById('updateReg')?.click();
           this.myForm.reset();

     Swal.fire({
      title: 'Pregunta agregada',
      icon: 'success'
     });

      }
      }).catch(error => {
        console.log(error);
      });

    } else {
      Swal.fire({
        title: 'Debe seleccionar todos los campos obligatorios',
        text: 'Debe seleccionar todos los campos obligatorios',
        icon: 'error'
       });
    }
  }


  updateQue(row: any){
    console.log(row);
    this.currentQuestion = row;
    this.myFormUpdate.get('descriptionUpdate')?.setValue(this.currentQuestion.description);
    this.getAnswer(this.currentQuestion.id);
    document.getElementById('updateReg')?.click();
  }

  updateQuestion(){
    console.log('Ole ole ole kakaakkaka');
    if ( !this.myFormUpdate.invalid) {
      this.submittedUpdated = true;
      Swal.fire({
        title: 'Validando información ...',
        allowOutsideClick: false
      });
      Swal.showLoading();
      console.log('kakakaka');
      this.questionService.updateQuestion(Number(this.currentQuestion.id), this.myFormUpdate.get('descriptionUpdate')?.value.toUpperCase())
      .then(data => {
        const resp: any = data;
        console.log(JSON.stringify(resp));
        if (resp.success === false) {
          Swal.fire({
            title: 'Falla en la actualizacion',
            text: 'Esta pregunta no se pudo actualizar',
            icon: 'error'
           });
        } else {
          console.log('Cambio');
     Swal.fire({
      title: 'Pregunta actualizada.',
      icon: 'success'
     });
      }
      }).catch(error => {
        console.log(error);
      });

    } else {
      Swal.fire({
        title: 'Debe seleccionar todos los campos obligatorios',
        text: 'Debe seleccionar todos los campos obligatorios',
        icon: 'error'
       });
    }
  }


  deleteQuestion(row: any){
    Swal.fire({
      title: 'Estás seguro de eliminar este elemento?',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si'

    })
    .then((willDelete) => {
        if (willDelete.value) {
          this.elementDelete = row;
          console.log(row);
          console.log(    this.elementDelete);
          Swal.showLoading();
          this.questionService.deleteQuestion(Number(this.elementDelete.id))
          .then(data => {
            Swal.showLoading();
            const resp: any = data;
            console.log(resp);

            if (resp.success === false) {
              Swal.fire({
                title: 'Esta pregunta presenta problemas',
                text: 'Esta pregunta no se puede eliminar',
                icon: 'error'
               });
            } else {
           this.loadingData();
           Swal.fire({
            title: 'Pregunta eliminada',
            icon: 'success'
           });
          }
          }).catch(error => {
            console.log(error);
          });
          console.log(this.elementDelete.id);
        } else {
         // Swal('Fail');
        }
      console.log(willDelete);
    });
  }

  cancelRegisterAnswer(){
    document.getElementById('updateReg')?.click();
    this.getAnswer(this.idQuestion);
  }

  getAnswer(id: any){
    Swal.fire({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.questionService.getAnswerId(id).then(data => {
      const resp: any = data;
      console.log(data);
      Swal.close();
      this.rowsAnswer = resp.data;
      console.log( this.rowsClient);
    }).catch(error => {
      console.log(error);
    });
  }

  sendAnswer(){

      if ( !this.myFormAnswer.invalid) {
       this.submitted = true;
       Swal.fire({
         title: 'Validando información ...',
         allowOutsideClick: false
       });
       Swal.showLoading();

       this.questionService.createAnswer(this.currentQuestion.id,this.myFormAnswer.get('descriptionAnswers')?.value.toUpperCase())
       .then(data => {
         const resp: any = data;
         console.log(resp);
         if (resp.success === false) {
           Swal.fire({
             title: 'Esta respuesta ya esta registrada',
             text: 'Esta respuesta no se pudo registrar',
             icon: 'error'
            });
         } else {
           this.idAnswer = resp.data.id;
           this.myFormAnswer.reset();
           console.log('Cambio');
           this.getAnswer(this.currentQuestion.id);
           document.getElementById('createAnswerHide')?.click();
      Swal.fire({
       title: 'Respuesta agregada',
       icon: 'success'
      });

       }
       }).catch(error => {
         console.log(error);
       });

     } else {
       Swal.fire({
         title: 'Debe seleccionar todos los campos obligatorios',
         text: 'Debe seleccionar todos los campos obligatorios',
         icon: 'error'
        });
     }
  }

   updateAns(row: any){
     console.log(row);
     this.currentAnswer = row;
     this.myFormUpdateAnswer.get('descriptionUpdateAnswers')?.setValue(this.currentAnswer.description);
     document.getElementById('updateRes')?.click();
   }

   updateAnswer(){

    console.log('Ole ole ole kakaakkaka');
    if ( !this.myFormUpdateAnswer.invalid) {
      this.submittedUpdated = true;
      Swal.fire({
        title: 'Validando información ...',
        allowOutsideClick: false
      });
      Swal.showLoading();
      console.log('kakakaka');
      this.questionService.updateAnswer(Number(this.currentAnswer.id), this.myFormUpdateAnswer.get('descriptionUpdateAnswers')?.value.toUpperCase())
      .then(data => {
        const resp: any = data;
        console.log(JSON.stringify(resp));
        if (resp.success === false) {
          Swal.fire({
            title: 'Falla en la actualizacion',
            text: 'Esta respuesta no se pudo actualizar',
            icon: 'error'
           });
        } else {
          console.log('Cambio');
          document.getElementById('updateAnswerHide')?.click();
          this.getAnswer(resp.data.questions_id);
     Swal.fire({
      title: 'Respuesta actualizada.',
      icon: 'success'
     });
      }
      }).catch(error => {
        console.log(error);
      });

    } else {
      Swal.fire({
        title: 'Debe seleccionar todos los campos obligatorios',
        text: 'Debe seleccionar todos los campos obligatorios',
        icon: 'error'
       });
    }
  }



   deleteAns(row:any){Swal.fire({
    title: 'Estás seguro de eliminar este elemento?',
    icon: 'warning',
    showCancelButton: true,
    showConfirmButton: true,
    cancelButtonText: 'No',
    confirmButtonText: 'Si'

  })
  .then((willDelete) => {
      if (willDelete.value) {
        this.elementDelete = row;
        console.log(row);
        console.log(    this.elementDelete);
        Swal.showLoading();
        this.questionService.deleteAnswer(Number(this.elementDelete.id))
        .then(data => {
          Swal.showLoading();
          const resp: any = data;
          console.log(resp);

          if (resp.success === false) {
            Swal.fire({
              title: 'Esta respuesta presenta problemas',
              text: 'Esta respuesta no se puede eliminar',
              icon: 'error'
             });
          } else {
            this.getAnswer(this.elementDelete.questions_id)
         Swal.fire({
          title: 'Respuesta eliminada',
          icon: 'success'
         });
        }
        }).catch(error => {
          console.log(error);
        });
        console.log(this.elementDelete.id);
      } else {
       // Swal('Fail');
      }
    console.log(willDelete);
  });
}

  updateFilter(event:any) {
    const val = event.target.value.toLowerCase();
    // filter our data

    if (val === '') {
      console.log('vacio');
      this.filterIndicatorText = false;
      this.rowsTemp = this.rowStatic;
    }


    if (this.inactive === true ||  this.active === true) {
      this.rowsTemp = this.rowsTempCheck;
    }
    const temp = this.rowsTemp.filter(function(d:any) {
      return d.description.toLowerCase().indexOf(val) !== -1 || !val;
    });

    if (val !== '') {
      this.filterIndicatorText = true;
      this.rowsTempText = temp;
    }
    this.rowsClient = temp;

  }


  ngOnInit() {
  }

  blockAgents( vadr: any) {
    console.log(vadr);
   }

  get checkForm() { return this.myForm.controls; }
  get checkFormAnswer() { return this.myFormAnswer.controls; }
  get checkFormUpdate() { return this.myFormUpdate.controls; }
  get checkFormUpdateAnswer() { return this.myFormUpdateAnswer.controls; }
}
