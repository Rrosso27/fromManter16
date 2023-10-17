import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment';
import 'rxjs/add/operator/map';
import { integer } from 'aws-sdk/clients/cloudfront';
@Injectable()

export class EstimateService {

  apiEndPoint = environment.apiBaseUrl;

  constructor(private http: HttpClient, private router: Router) { }

  getEstimateCountries() {
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
      this.http.get(this.apiEndPoint+'api/estimateCountries', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  getRejectionsEstimate() {
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
      this.http.get(this.apiEndPoint+'api/get_all_type_rejection', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getPriceDhl() {
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
      this.http.get(this.apiEndPoint+'api/priceCountriesDhl', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getPriceDhlCountry(idCountry: number) { // Falta implementar desde el backend
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
      this.http.get(this.apiEndPoint+'api/priceCountriesDhl/showPriceCountriesDhl/'+idCountry, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  createEstimateCountries(name: string, money: string) {
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
        name: name,
        money: money
      };
      this.http.post(this.apiEndPoint+'api/estimateCountries', postParams, httpOptions)
        .map(res => res).subscribe(data => {

          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  copyEstimate(idEstimate:integer,trm:any,price_margin:any) {
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
        estimate:idEstimate,
        trm:trm,
        price_margin:price_margin
      };
      console.log(postParams);
      this.http.get(this.apiEndPoint+'api/copy_estimate_trm?estimate='+idEstimate+'&trm='+trm+'&price_margin='+price_margin, httpOptions)
      // this.http.post(this.apiEndPoint+'api/copy_estimate_trm', postParams, httpOptions)
        .map(res => res).subscribe(data => {

          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  updateEstimateCountries(id: number, name: string, money: string) {
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
        name: name,
        money: money
      };
      this.http.patch(this.apiEndPoint+'api/estimateCountries/' + id, postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }



  deleteEstimateCountries(id: number) {
    console.log('ole ole ole');
    console.log(status);
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
      this.http.delete(this.apiEndPoint+'api/estimateCountries/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
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
      this.http.patch(this.apiEndPoint+'api/update_estimate_consecutive',postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  createPriceCountries(estimate_countries_id: number, weight: number, price: number) {
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
        weight: weight,
        price: price,
        estimate_countries_id: estimate_countries_id
      };
      this.http.post(this.apiEndPoint+'api/priceCountriesDhl', postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  sendEstimateEmail(idEstimate: number, emails: string, idCustomer: number, emailBody: string, emailSubject: string) {
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
        id_estimate: 156,
        emails: emails,
        id_customer: idCustomer,
        email_body: emailBody,
        email_subject:emailSubject,
        estimate_filename:'Cotizacion191258.pdf'
      };

      this.http.post(this.apiEndPoint+'api/estimate/pdf', postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  sendEstimateEmailAmazon(idUser: number, idCustomer: number, idEstimate:number, info:string,  comment: string, subject: string) {
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
      console.log('id_user='+ idUser+'&id_customer='+idCustomer
      +'&id_estimate='+idEstimate+'&info='+info+'&comment='+comment+'&subject='+subject);

     console.log(' ingreso al correo sobre el info'+info);

      const postParams = {
        id_user: idUser,
        id_estimate: idEstimate,
        info: info,
        id_customer: idCustomer,
        subject:subject,
        comment:comment
      };

     this.http.get(this.apiEndPoint+'api/send_amazon_mail?id_user='+ idUser+'&id_customer='+idCustomer
      +'&id_estimate='+idEstimate+'&info='+info+'&comment='+comment+'&subject='+subject,httpOptions)
     // this.http.get(this.apiEndPoint+'api/send_amazon_mail?id_user=197&subject="Buen dia"&id_customer= 118&id_estimate= 277&info=jasoncv0294@gmail.com|eee|ycastrillon0294@gmail.com|lll&comment= "Oiga pues"',httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }



  updatePriceCountries(id: number, weight: number, price: number) {
    console.log(id +','+weight +','+price);
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
        weight: weight,
        price: price
      };
      this.http.patch(this.apiEndPoint+'api/priceCountriesDhl/' + id, postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  updateEstimateStatus(id:number, status:number) {
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
        status: status
      };
      this.http.patch(this.apiEndPoint+'api/update_estimates_status/' + id, postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  deletePriceCountries(id: number) {
    console.log('ole ole ole');
    console.log(status);
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
      this.http.delete(this.apiEndPoint+'api/priceCountriesDhl/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  deleteEstimateDetail(id: number) {
    console.log('ole ole ole');
    console.log(status);
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
      this.http.delete(this.apiEndPoint+'api/delete_estimate_details/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  showShippingCountriesFPE(){
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
      this.http.get(this.apiEndPoint+'api/shippingPriceRanges/showShippingCountriesFPE', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  showShippingCountriesDhl() { // Falta implementar desde el backend
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
      this.http.get(this.apiEndPoint+'api/shippingPriceRanges/showShippingCountriesDhl', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }



  getConfigEstimates() { // Falta implementar desde el backend
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
      this.http.get(this.apiEndPoint+'api/config_estimates', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  getEstimateSpecific(id:number) { // Falta implementar desde el backend
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
      this.http.get(this.apiEndPoint+'api/estimates/'+ id, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getConfigTrm() { // Falta implementar desde el backend
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
      this.http.get(this.apiEndPoint+'api/config_trms_active?active=1', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  showShippingCountriesDhlConfig(countryId:number) { // Falta implementar desde el backend
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
      this.http.get(this.apiEndPoint+'api/shippingPriceRanges/showShippingCountriesDhlConfig?estimate_countries_id='+countryId, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  showVariableEstimateConfig() { // Falta implementar desde el backend
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
      this.http.get(this.apiEndPoint+'api/config_estimates', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  tbeIndexConOne() { // Falta implementar desde el backend
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
      this.http.get(this.apiEndPoint+'api/tbeIndexConOne', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  tbeIndexConTow() { // Falta implementar desde el backend
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
      this.http.get(this.apiEndPoint+'api/tbeIndexConTow', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }



  tbeIndexConThre() { // Falta implementar desde el backend
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
      this.http.get(this.apiEndPoint+'api/tbeIndexConThre', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }






  storeFpe(extraPercentage:any,price:any,managementVariables:any,tariff:any,usaSecondPrice: any, formulaUsaSecondManagementVariablesFPE:any, formulaUsaSecondTariffFPE:any,formulaUsaThirdPriceFPE:any,formulaUsaThirdManagementVariablesFPE:any,formulaUsaThirdTariffFPE:any){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const postParams = {
        extraPercentage: extraPercentage,
        price: price,
        managementVariables: managementVariables,
        tariff: tariff,
        usaSecondPrice: usaSecondPrice,
        formulaUsaSecondManagementVariablesFPE: formulaUsaSecondManagementVariablesFPE,
        formulaUsaSecondTariffFPE: formulaUsaSecondTariffFPE,
        formulaUsaThirdPriceFPE:formulaUsaThirdPriceFPE,
        formulaUsaThirdManagementVariablesFPE:formulaUsaThirdManagementVariablesFPE,
        formulaUsaThirdTariffFPE:formulaUsaThirdTariffFPE

      };
      console.log(postParams);

      this.http.post(this.apiEndPoint+'api/sebtbe', postParams, httpOptions)
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


  storetrm(id_forklift:number,customer_id:number,brach_id:number,id_rutines:string,technician_id: any, consecutive:number, date:string){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const postParams = {
        forklift_id: id_forklift,
        customer_id: customer_id,
        branch_id: brach_id,
        routines: id_rutines,
        technicians_id: technician_id,
        consecutive: consecutive,
        date: date
      };
      console.log(postParams);

      this.http.post(this.apiEndPoint+'api/create_preventive', postParams, httpOptions)
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




  showCountryWeight(idCountry: number, weight: number) { // Falta implementar desde el backend
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
      this.http.get(this.apiEndPoint+'api/showCountryWeight/showCountryWeight?' + 'country=' + idCountry + '&weight=' + weight, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  // -------------------------------- APIS ESTIMATE

  showEstimateFilter(paramsFilter: string) { // Falta implementar desde el backend
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
      this.http.get(this.apiEndPoint+'api/show_estimates?' + paramsFilter, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  showEstimateConsecutive() { // Falta implementar desde el backend
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
      this.http.get(this.apiEndPoint+'api/estimate_consecutive', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  showTrmCurrent() { // Falta implementar desde el backend
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user'))); // 'Bearer ' +
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        })
      };
      var date = new Date();



    var day = (date.getDate() < 10 ? '0' : '') + date.getDate();
    // 01, 02, 03, ... 10, 11, 12
    let month = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    // 1970, 1971, ... 2015, 2016, ...
    var year = date.getFullYear();

    let now = year+'-'+ month+'-'+day;

      this.http.get('https://trm-colombia.makaw-dev.now.sh/?date='+now)
        .map(res => res).subscribe(data => {
          console.log('TRM TRM TRM');
          console.log(data);
          resolve(data);
        }, error => {

          this.http.get('https://api.cambio.today/v1/quotes/USD/COP/json?quantity=1&key=4328|zZQ~p4JZcXA0MPPYJNAeqpJKD*7E5wcj')
          .map(res => res).subscribe(data => {
            console.log('TRM TRM TRM');
            console.log(data);
            resolve(data);
          }, error => {
            resolve(error);
          });

        });
    });
  }

  showConfigTrm(estimate_countries_id: number) { // Falta implementar desde el backend
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
      this.http.get(this.apiEndPoint+'api/config_trms?estimate_countries_id='+ estimate_countries_id, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  createEstimate(estimate_consecutive: number, customer_id: number, customer_document: string,
                 department_id: number, city_id: number, forklift_id: number, contact: string,
                 payment_method: number, guaranty: number, validity: number, telephone: string,
                 observation: string, total: number, email:string, status:number, forklift_text:string, branch_office_id:number) {
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

      console.log( localStorage.getItem('userid'));
      const postParams = {
        elaborate_user_id:  localStorage.getItem('userid'),
        estimate_consecutive: estimate_consecutive,
        customer_id: customer_id,
        customer_document: customer_document,
        department_id: department_id,
        city_id: city_id,
        forklift_id: forklift_id,
        branch_office_id: branch_office_id,
        contact: contact,
        payment_method: payment_method,
        guaranty: guaranty,
        validity: validity,
        telephone: telephone,
        observation: observation,
        total: total,
        email:email,
        status:status,
        forklift_text:forklift_text
      };

      console.log(postParams);
      this.http.post(this.apiEndPoint+'api/create_estimate', postParams, httpOptions)
        .map(res => res).subscribe(data => {

          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  updateEstimate(id:number, customer_id: number, customer_document: string,
    department_id: number, city_id: number, forklift_id: number, contact: string,
    payment_method: number, guaranty: number, validity: number, telephone: string,
    observation: string, forklift_text:string, branch_office_id:number) {
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
      customer_id: customer_id,
      customer_document: customer_document,
      department_id: department_id,
      city_id: city_id,
      forklift_id: forklift_id,
      branch_office_id: branch_office_id,
      contact: contact,
      payment_method: payment_method,
      guaranty: guaranty,
      validity: validity,
      telephone: telephone,
      observation: observation,
      email:'',
      forklift_text:forklift_text,
      };


this.http.patch(this.apiEndPoint+'api/update_estimates/'+id, postParams, httpOptions)
.map(res => res).subscribe(data => {

resolve(data);
}, error => {
resolve(error);
});
});
}

createEstimateDetailsPending(estimate_id: number, description: string,
          status: number, type_service: number) {
          console.log('info de detalle');

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
      estimate_id:estimate_id,
      description: description,
      status:status,
      type_service:type_service,
      };
      console.log(postParams);
      this.http.post(this.apiEndPoint+'api/create_estimate_detail_pending', postParams, httpOptions)
      .map(res => res).subscribe(data => {
      resolve(data);
      }, error => {
      resolve(error);
      });
      });
      }

createEstimateDetails(estimate_id: number, code: string, description: string,
          quantity: number, unit_cost: number, price_list: number, price_suggest: number, weight: number,
          price: number, subtotal: number, priceIva1:number  = 0, delivery: number, total: string, preceIvaTol1:number = 0 ,
          status: number, type_service: number, weight_type: number) {
          console.log('info de detalle');
          console.log(estimate_id+'-'+ code+'-'+ description+'-'+
            quantity+'-'+ unit_cost+'-'+ price_list+'-'+ price_suggest+'-'+
            price+'-'+ delivery+'-'+ total+'-'+
            status)
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
      estimate_id:estimate_id,
      code: code,
      description: description,
      quantity: quantity,
      unit_cost: unit_cost,
      price_list: price_list,
      price_suggest: price_suggest,
      weight:weight,
      price: price,
      subtotal: subtotal,
      iva:priceIva1,
      delivery: delivery,
      total: total,
      total_iva:preceIvaTol1,
      status:status,
      type_service:type_service,
      weight_type:weight_type
      };
      console.log(postParams);
      this.http.post(this.apiEndPoint+'api/create_estimate_detail', postParams, httpOptions)
      .map(res => res).subscribe(data => {
      resolve(data);
      }, error => {
      resolve(error);
      });
      });
      }
// Organizar api de actualizacion;
     updateEstimateDetails(estimate_detail_id: number, code: string, description: string,
        quantity: number, unit_cost: number, price_list: number, price_suggest: number, weight: number,
        price: number, subtotal: number, delivery: number, total: string,
        status: number, type_service: number, weight_type: number) {
        console.log('info de detalle');
        console.log(estimate_detail_id+'-'+ code+'-'+ description+'-'+
          quantity+'-'+ unit_cost+'-'+ price_list+'-'+ price_suggest+'-'+
          price+'-'+ delivery+'-'+ total+'-'+
          status)
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
    code: code,
    description: description,
    quantity: quantity,
    unit_cost: unit_cost,
    price_list: price_list,
    price_suggest: price_suggest,
    weight:weight,
    price: price,
    subtotal: subtotal,
    delivery: delivery,
    total: total,
    status:status,
    type_service:type_service,
    weight_type:weight_type
    };
    this.http.patch(this.apiEndPoint+'api/update_estimate_details/'+estimate_detail_id, postParams, httpOptions)
    .map(res => res).subscribe(data => {
    console.log('respuesta');
    resolve(data);
    }, error => {
    resolve(error);
    });
    });
    }
      createEstimateDetailWorkforce(estimate_id: number, code: string, service: string,
        quantity: number, hour_value: number, subtotal: number, delivery: number, total: string,
        status: number, type_service: number) {
        console.log('info de detalle');
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
    estimate_id:estimate_id,
    code: code,
    quantity: quantity,
    service:service,
    hour_value: hour_value,
    subtotal: subtotal,
    delivery: delivery,
    total: total,
    status:status,
    type_service:type_service
    };
    console.log(postParams);
    this.http.post(this.apiEndPoint+'api/create_estimate_detail', postParams, httpOptions)
    .map(res => res).subscribe(data => {
    resolve(data);
    }, error => {
    resolve(error);
    });
    });
    }
      createEstimateDetailWorkforceForPending(estimate_id: number,service: string,
      status: number, type_service: number) {
        console.log('info de detalle');
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
    estimate_id:estimate_id,
    service:service,
    status:status,
    type_service:type_service
    };
    console.log(postParams);
    this.http.post(this.apiEndPoint+'api/create_estimate_detail_pending', postParams, httpOptions)
    .map(res => res).subscribe(data => {
    resolve(data);
    }, error => {
    resolve(error);
    });
    });
    }


   updateEstimateDetailWorkforce(estimate_detail_id: number, code: string, service: string,
      quantity: number, hour_value: number, subtotal: number, delivery: number, total: string,
      status: number, type_service: number) {
      console.log('info de detalle');
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
  code: code,
  quantity: quantity,
  service:service,
  hour_value: hour_value,
  subtotal: subtotal,
  delivery: delivery,
  total: total,
  status:status,
  type_service:type_service
  };
  this.http.patch(this.apiEndPoint+'api/update_estimate_details/'+estimate_detail_id, postParams, httpOptions)
  .map(res => res).subscribe(data => {
  resolve(data);
  }, error => {
  resolve(error);
  });
  });
  }
      updateConfigTrmFull(params:string) {
        console.log(params);
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
            params: params
          };
          this.http.patch(this.apiEndPoint+'api/update_config_estimate_trm', postParams, httpOptions)
            .map(res => res).subscribe(data => {
              resolve(data);
            }, error => {
              resolve(error);
            });
        });
      }


      updateConfigVariablesFull(params:string) {
        console.log(params);
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
            params: params
          };
          this.http.patch(this.apiEndPoint+'api/update_config_estimate_variables', postParams, httpOptions)
            .map(res => res).subscribe(data => {
              resolve(data);
            }, error => {
              resolve(error);
            });
        });
      }

      updateConfigFormulasFull(params:string) {
        console.log(params);
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
            params: params
          };
          this.http.patch(this.apiEndPoint+'api/update_config_estimate_formulas', postParams, httpOptions)
            .map(res => res).subscribe(data => {
              resolve(data);
            }, error => {
              resolve(error);
            });
        });
      }

      getEstimateDetails(idEstimate:number) {
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
          this.http.get(this.apiEndPoint+'api/estimate_details_general/'+idEstimate, httpOptions)
            .map(res => res).subscribe(data => {
              console.log(data);
              resolve(data);
            }, error => {
              resolve(error);
            });
        });
      }


      getEstimateDetailsWorkforce(idEstimate:number) {
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
          this.http.get(this.apiEndPoint+'api/estimate_details_general_workforce/'+idEstimate, httpOptions)
            .map(res => res).subscribe(data => {
              console.log(data);
              resolve(data);
            }, error => {
              resolve(error);
            });
        });
      }


      getEstimateDetailsParts(idEstimate:number) {
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
          this.http.get(this.apiEndPoint+'api/estimate_details_general_parts/'+idEstimate, httpOptions)
            .map(res => res).subscribe(data => {
              console.log(data);
              resolve(data);
            }, error => {
              resolve(error);
            });
        });
      }

      getEmailsCustomer(customer_id: any){
        return new Promise (resolve=>{
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
            customer_id: customer_id
            };
          this.http.post(this.apiEndPoint+'api/show_email', postParams,httpOptions)
            .map(res => res).subscribe(data => {
              console.log(data);
              resolve(data);
            }, error => {
              resolve(error);
            });
        });
        }

      createEstimateFile(estimate_id: number, bucket: string, url: string, type: number, nameFile:string) {
        console.log('info de detalle');
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
        estimate_id: estimate_id,
        bucket: bucket,
        url:url,
        type: type,
        name: nameFile
        };
        this.http.post(this.apiEndPoint+'api/create_estimate_file', postParams, httpOptions)
        .map(res => res).subscribe(data => {
        resolve(data);
        }, error => {
        resolve(error);
       });
      });
    }


    getEstimateDetailFilesImages(idEstimate:number) {
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
        this.http.get(this.apiEndPoint+'api/get_idestimate_files?estimate_id='+idEstimate+'&type=1', httpOptions)
          .map(res => res).subscribe(data => {
            console.log(data);
            resolve(data);
          }, error => {
            resolve(error);
          });
      });
    }

    getEstimateDetailFiles(idEstimate:number) {
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
        this.http.get(this.apiEndPoint+'api/get_idestimate_files?estimate_id='+idEstimate+'&type=0', httpOptions)
          .map(res => res).subscribe(data => {
            console.log(data);
            resolve(data);
          }, error => {
            resolve(error);
          });
      });
    }

    deleteEstimateFile(id: number) {
      console.log('ole ole ole');
      console.log(status);
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
        this.http.delete(this.apiEndPoint+'api/delete_estimate_file/' + id, httpOptions)
          .map(res => res).subscribe(data => {
            resolve(data);
          }, error => {
            resolve(error);
          });
      });
    }

    approveEstimateDetails(details: string) {

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
          items: details
        };
        this.http.patch(this.apiEndPoint+'api/approve_estimate', postParams, httpOptions)
          .map(res => res).subscribe(data => {
            resolve(data);
          }, error => {
            resolve(error);
          });
      });
    }

    getEstimateId(id: any){
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
        console.log(id)
        this.http.get(this.apiEndPoint+'api/get_estimate_id/'+id, httpOptions)
          .map(res => res).subscribe(data => {
            console.log(data);
            resolve(data);
          }, error => {
            resolve(error);
          });
      });
    }

}





