import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpHeaderResponse} from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';
import { environment } from './../../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class HorometroService {

apiEndPoint = environment.apiBaseUrl;

  constructor(private http: HttpClient, private router: Router) { }

  getForklift(){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };

      this.http.get(this.apiEndPoint+'api/forklifts', httpOptions)
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

  updateForklift(id:number,serie:number,customer_id:string,branch_offices_id:number,description:string,
    brand_id:string,model_id:string,machine_id:number,tyre_id:number,fuel_id:number,h_current:number){
    console.log("data to send");
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const patchParams={
        serie:serie,
        customer_id:customer_id,
        branch_offices_id:branch_offices_id,
        description:description,
        brand_id:brand_id,
        model_id:model_id,
        machine_id:machine_id,
        tyre_id:tyre_id,
        fuel_id:fuel_id,
        h_current:h_current
      }

      this.http.patch(this.apiEndPoint+'api/forklifts/'+id, patchParams,httpOptions)
      .map(res => res).subscribe(data => {
        console.log("a mostrar data");
        console.log(data);
        resolve(data);
      }, error => {
        console.log("error en servicio");
        console.log(error)
                resolve(error);
        });
    });
  }

  updateHorometer(id:number,h_current,user_id:any){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const patchParams={
        h_current:h_current,
        user_id:user_id
      }
      this.http.patch(this.apiEndPoint+'api/updateHorometer/'+id, patchParams,httpOptions)
      .map(res => res).subscribe(data => {
        console.log("a mostrar data");
      console.log(JSON.stringify(data));
      resolve(data);
      }, error => {
        console.log("error en servicio");
        console.log(JSON.stringify(error));
                resolve(error);
        });
    });
  }

}
