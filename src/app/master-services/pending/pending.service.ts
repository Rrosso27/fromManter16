import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class PendingService {

  apiEndPoint = environment.apiBaseUrl;

  constructor(private http: HttpClient, ) { }

  getPending() {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user'))); // 'Bearer ' +
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };

      this.http.get(this.apiEndPoint+'api/get_pending_all', httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getPendingAll(params:string){
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user'))); // 'Bearer ' +
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      console.log('datos->'+params);
      this.http.get(this.apiEndPoint+'api/get_pending_general?'+params, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

 
  updatePreventivePending(id: number,consecutive: any, observation:string, status:any) {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user'))); // 'Bearer ' +
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const patchParams = {
        consecutive:consecutive,
        observation:observation,
        status:status,
        user_name:localStorage.getItem('username'),
        user_id:localStorage.getItem('userid'),

      };
      console.log(patchParams);
      this.http.patch(this.apiEndPoint+'api/update_pending_preventive_general/'+id,patchParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }
 
  updateCorrectivePending(id: number,consecutive: any, observation:string, status:any) {
    console.log(id)
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user'))); // 'Bearer ' +
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const patchParams = {
        consecutive:consecutive,
        observation:observation,
        status:status,
        user_name:localStorage.getItem('username'),
        user_id:localStorage.getItem('userid'),

      };
      console.log(patchParams);
      this.http.patch(this.apiEndPoint+'api/update_pending_corrective_general/'+id,patchParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }
 
  updateChecklistPending(id: number,consecutive: any, observation:string, status:any) {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user'))); // 'Bearer ' +
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const patchParams = {
        consecutive:consecutive,
        observation:observation,
        status:status,
        user_name:localStorage.getItem('username'),
        user_id:localStorage.getItem('userid'),

      };
      console.log(patchParams);
      this.http.patch(this.apiEndPoint+'api/update_pending_checklist_general/'+id,patchParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }
 
  updateStevedorePending(id: number,consecutive: any, observation:string, status:any) {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user'))); // 'Bearer ' +
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const patchParams = {
        consecutive:consecutive,
        observation:observation,
        status:status,
        user_name:localStorage.getItem('username'),
        user_id:localStorage.getItem('userid'),

      };
      console.log(patchParams);
      this.http.patch(this.apiEndPoint+'api/update_pending_stevedore_general/'+id,patchParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }
 
  updatePlatformpending(id: number,consecutive: any, observation:string, status:any) {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user'))); // 'Bearer ' +
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const patchParams = {
        consecutive:consecutive,
        observation:observation,
        status:status,
        user_name:localStorage.getItem('username'),
        user_id:localStorage.getItem('userid'),

      };
      console.log(patchParams);
      this.http.patch(this.apiEndPoint+'api/update_pending_platform_general/'+id,patchParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }
 
  updateBatteryPending(id: number,consecutive: any, observation:string, status:any) {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user'))); // 'Bearer ' +
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const patchParams = {
        consecutive:consecutive,
        observation:observation,
        status:status,
        user_name:localStorage.getItem('username'),
        user_id:localStorage.getItem('userid'),

      };
      console.log(patchParams);
      this.http.patch(this.apiEndPoint+'api/update_pending_battery_general/'+id,patchParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }
 
}
