import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as S3 from 'aws-sdk/clients/s3';
import { UUID } from 'angular2-uuid';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SupportService {

  apiEndPoint = environment.apiBaseUrl;

  constructor(private http: HttpClient, private router: Router) { }

  getTicketsByUser(id){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };

      this.http.get(this.apiEndPoint+'api/show_tickets_user/'+id, httpOptions)
      .map(res => res).subscribe(data => {
        console.log("a mostrar data");
      console.log(data);
      resolve(data);
      }, error => {
        console.log("error en servicio");
        console.log(error);
                resolve(error);
        });
    });
  }
  getTicketsAll(){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };

      this.http.get(this.apiEndPoint+'api/show_tickets_all', httpOptions)
      .map(res => res).subscribe(data => {
        console.log("a mostrar data");
      console.log(data);
      resolve(data);
      }, error => {
        console.log("error en servicio");
        console.log(error);
                resolve(error);
        });
    });
  }

  getTicket(id:number){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };

      this.http.get(this.apiEndPoint+'api/show_tickets/'+id, httpOptions)
      .map(res => res).subscribe(data => {
        console.log("a mostrar data");
      console.log(data);
      resolve(data);
      }, error => {
        console.log("error en servicio");
        console.log(error);
                resolve(error);
        });
    });
  }

  getCountResponseTicket(id){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };

      this.http.get(this.apiEndPoint+'api/count_message_support/'+id, httpOptions)
      .map(res => res).subscribe(data => {
        console.log("a mostrar data");
      console.log(data);
      resolve(data);
      }, error => {
        console.log("error en servicio");
        console.log(error);
                resolve(error);
        });
    });
  }

  storeTicketSupport(description: string, subject: string, name:string, email: string, username:string, user_id:string, media_tickets: any, cellphone: number ){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json',
          'x-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MTI1NmM3NTYzODQ3ZjJhOGM1MDhlYTciLCJpYXQiOjE2MzA1OTQwNjIsImV4cCI6MTY2MjEzMDA2Mn0.KgNhT2yxfZKqN3_OIf-Y-lB03FO0WV2cWDadXxq2J7Q'
        })
      };
      const postParams = {
        description: description,
        subject : subject,
        name: name,
        email: email,
        username: username,
        user_id: user_id,
        cellphone: cellphone,
        status: 2,
        code: '493521',
        media_tickets:media_tickets
      }
      this.http.post('https://montacargasmasterbackdev.co/api/1.0/ticket', postParams,httpOptions)

      .map(res => res).subscribe(data => {
        console.log("a mostrar data");
      console.log(data);
      resolve(data);
      }, error => {
        console.log("error en servicio");
                resolve(error);
        });
    });
  }

  storeTicket(description: string, subject: string, name:string, email: string, username:string, user_id:string, cellphone: string){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const postParams = {
        description: description,
        subject: subject,
        name: name,
        email: email,
        username: username,
        user_id: user_id,
        cellphone: cellphone
      }
      this.http.post(this.apiEndPoint+'api/create_tickets', postParams,httpOptions)
      .map(res => res).subscribe(data => {
        console.log("a mostrar data");
      console.log(data);
      resolve(data);
      }, error => {
        console.log("error en servicio");
                resolve(error);
        });
    });
  }

  storeTicketImage(url: string, ticket: string, ){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const postParams = {
        ticket: ticket,
        url: url,
      }
      this.http.post(this.apiEndPoint+'api/create_tickets_image', postParams,httpOptions)
      .map(res => res).subscribe(data => {
        console.log("a mostrar data");
      console.log(data);
      resolve(data);
      }, error => {
        console.log("error en servicio");
                resolve(error);
        });
    });
  }

  deleteTicket(id:number){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };

      this.http.delete(this.apiEndPoint+'api/delete_tickets/'+id, httpOptions)
      .map(res => res).subscribe(data => {
        console.log("a mostrar data");
      console.log(data);
      resolve(data);
      }, error => {
        console.log("error en servicio");
                resolve(error);
        });
    });
  }

  updateStatusResponse(id:number){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };

      this.http.patch(this.apiEndPoint+'api/update_status_response_tickets/'+id, httpOptions)
      .map(res => res).subscribe(data => {
        console.log("a mostrar data");
      console.log(data);
      resolve(data);
      }, error => {
        console.log("error en servicio");
                resolve(error);
        });
    });
  }

  uploadFilesAll(file:any, fileName:string, tickets:string) {
    return new Promise(resolve =>{

      const contentType = file.type;

      console.log('tipo de archivo '+contentType);
      let ext = fileName.split('.').pop();
      let nameTemp = fileName.split('.');
      const bucket = new S3(
            {
                accessKeyId: 'AKIAQTIVBK67FU3N4ZPV',
                secretAccessKey: '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',
                region: 'us-east-1'
            }
        );
        const uuid = UUID.UUID();

        const extension = ext ;
        console.log(extension);
        let nameFile =nameTemp[0]+'.'+ extension;
        console.log(nameFile);
        const params = {
            Bucket: 'masterforklift/media-tickets',
            Key: nameFile,
            Body: file,
            ACL: 'public-read',
            ContentType: contentType
        };

        bucket.upload(params).promise().then(resp=>{
            console.log(resp);
          resolve(resp);
          // let nameFileFinal='https://masterforklift.s3.amazonaws.com/'+nameFile;

          let url='https://masterforklift.s3.amazonaws.com/media-tickets/'+nameFile;
          this.storeTicketImage(url,tickets).then(data => {
            const resp: any = data;
            console.log(data);
          }).catch(error => {
            console.log(error);
          });
        }).catch(error => {
          console.log(error);
        });

    })
  }
}
