import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class BatteryService {

  apiEndPoint = environment.apiBaseUrl;

  constructor(private http: HttpClient,) { }

  getBattery(id: number) {
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.get(this.apiEndPoint + 'api/get_battery/' + id, httpOptions)
        .map(res => res).subscribe(data => {

          resolve(data);
        }, error => {
          console.log("error en servicio");
          console.log(error);
          resolve(error);
        });
    });
  }

  updateConsecutive() {
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
      const postParams = {
      };
      this.http.patch(this.apiEndPoint + 'api/update_consecutive_battery', postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  storeBattery(regional: any, customer_id: number, brach_id: number, technician_id: any, consecutive: number, date: string,
    observation: string, type: number) {
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const postParams = {
        // forklift_id: forklift_id,
        customer_id: customer_id,
        branch_id: brach_id,
        // platforms: id_rutines,
        regional_id: regional,
        technicians_id: technician_id,
        consecutive: consecutive,
        date: date,
        observation: observation,
        type: type
      };

      this.http.post(this.apiEndPoint + 'api/store_rutine_battery', postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          console.log("error en servicio");
          resolve(error);
        });
    });
  }

  updateBattery(regional_id: number, forklift_id: number, customer_id: number, branch_id: number, consecutive: number, id_rutines: string, technician_id: any, date: string, newDate: string, type: number) {
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
        forklift_id: forklift_id,
        customer_id: customer_id,
        branch_id: branch_id,
        regional_id: regional_id,
        technicians_id: technician_id,
        consecutive: consecutive,
        observation: id_rutines,
        date: date,
        newDate: newDate,
        type: type
      };
      this.http.patch(this.apiEndPoint + 'api/update_battery', patchParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  getBatteryList() {
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.get(this.apiEndPoint + 'api/indexBatterry/', httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getCustomer() {
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
      this.http.get(this.apiEndPoint + 'api/get_customer', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }



  indexById(id: number) {
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.get(this.apiEndPoint + 'api/indexById/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  //Lista las baterías por clientes
  getBatteryCustomer() {
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.get(this.apiEndPoint + 'api/indexBatterry/', httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  deleteBattery(platform: string, technician: string) {

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
      const postParams = {
      };
      this.http.delete(this.apiEndPoint + 'api/delete_battery?batterys=' + platform + '&technicians_id=' + technician, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  strageBattery(
    id:any,
    brand: any,
    model: any,
    manufacturingDate: any,
    branchOfficesId: any,
    high: any,
    width: any,
    length: any,
    performance: any,
    connector: any,
    referenceColor: any,
    amperageCharger: any,
    voltage: any,
    charger: any,
    positiveCable: any,
    negativeCable: any,
    connections: any,
    stoppers: any,
    emptyVoltage: any,
  ) {
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
      const postParams = {
        id:id,
        brand: brand,
        model: model,
        manufacturingDate: manufacturingDate,
        branchOfficesId: branchOfficesId,
        high: high,
        width: width,
        length: length,
        performance: performance,
        connector: connector,
        referenceColor: referenceColor,
        amperageCharger: amperageCharger,
        voltage: voltage,
        charger: charger,
        positiveCable: positiveCable,
        negativeCable: negativeCable,
        connections: connections,
        stoppers: stoppers,
        emptyVoltage: emptyVoltage,
      };
      this.http.post(this.apiEndPoint + 'api/storeBatterry', postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }
}
