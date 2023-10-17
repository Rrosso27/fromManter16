import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpHeaderResponse,
} from "@angular/common/http";
import { RequestOptions } from "@angular/http";
import { map, catchError, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { environment } from "./../../../environments/environment";
import "rxjs/add/operator/map";

@Injectable()
export class ForkliftService {
  apiEndPoint = environment.apiBaseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  getForklifts() {
    return new Promise((resolve) => {
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token_user"),
          Accept: "application/json",
        }),
      };
      this.http
        .get(this.apiEndPoint + "api/forklifts", httpOptions)
        .map((res) => res)
        .subscribe(
          (data) => {
            console.log("a mostrar data");
            console.log(data);
            resolve(data);
          },
          (error) => {
            console.log("error en servicio");
            resolve(error);
          }
        );
    });
  }

  filter(input: void) {
    return new Promise((resolve) => {
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token_user"),
          Accept: "application/json",
        }),
      };
      this.http
        .post(this.apiEndPoint + "api/forkliftFilter?input="+input, httpOptions)
        .map((res) => res)
        .subscribe(
          (data) => {
            console.log("a mostrar data");
            console.log(data);
            resolve(data);
          },
          (error) => {
            console.log("error en servicio");
            resolve(error);
          }
        );
    });
  }

  getForkliftsCustomer(idCustomer: number) {
    return new Promise((resolve) => {
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token_user"),
          Accept: "application/json",
        }),
      };
      this.http
        .get(
          this.apiEndPoint + "api/forklifts_customer/" + idCustomer,
          httpOptions
        )
        .map((res) => res)
        .subscribe(
          (data) => {
            console.log("a mostrar data");
            console.log(data);
            resolve(data);
          },
          (error) => {
            console.log("error en servicio");
            resolve(error);
          }
        );
    });
  }

  getForkliftsCustomerFull(idCustomer: number) {
    return new Promise((resolve) => {
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token_user"),
          Accept: "application/json",
        }),
      };
      this.http
        .get(
          this.apiEndPoint + "api/forklifts_customer_full/" + idCustomer,
          httpOptions
        )
        .map((res) => res)
        .subscribe(
          (data) => {
            console.log("a mostrar data");
            console.log(data);
            resolve(data);
          },
          (error) => {
            console.log("error en servicio");
            resolve(error);
          }
        );
    });
  }

  getForkliftBranchOfficesFull(idCustomer: number) {
    return new Promise((resolve) => {
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token_user"),
          Accept: "application/json",
        }),
      };
      this.http
        .get(
          this.apiEndPoint + "api/forklifts_branch_office_full/" + idCustomer,
          httpOptions
        )
        .map((res) => res)
        .subscribe(
          (data) => {
            console.log("a mostrar data");
            console.log(data);
            resolve(data);
          },
          (error) => {
            console.log("error en servicio");
            resolve(error);
          }
        );
    });
  }

  getForkliftsBranch(idBranch: number) {
    return new Promise((resolve) => {
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token_user"),
          Accept: "application/json",
        }),
      };
      this.http
        .get(this.apiEndPoint + "api/forklifts_branch/" + idBranch, httpOptions)
        .map((res) => res)
        .subscribe(
          (data) => {
            console.log("a mostrar data");
            console.log(data);
            resolve(data);
          },
          (error) => {
            console.log("error en servicio");
            resolve(error);
          }
        );
    });
  }

  getForkliftStatus() {
    return new Promise((resolve) => {
      const headers = new HttpHeaders();
      headers.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token_user")
      ); // 'Bearer ' +
      headers.append("Content-Type", "application/json");
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token_user"),
          Accept: "application/json",
        }),
      };
      this.http
        .get(this.apiEndPoint + "api/get_status_forklift")
        .map((res) => res)
        .subscribe(
          (data) => {
            console.log(data);
            resolve(data);
          },
          (error) => {
            resolve(error);
          }
        );
    });
  }

  getForklift(id: number) {
    console.log("este es el id: " + id);
    return new Promise((resolve) => {
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token_user"),
          Accept: "application/json",
        }),
      };
      this.http
        .get(this.apiEndPoint + "api/forklifts/" + id, httpOptions)
        .map((res) => res)
        .subscribe(
          (data) => {
            console.log("a mostrar data");
            console.log(data);
            resolve(data);
          },
          (error) => {
            console.log("error en servicio");
            resolve(error);
          }
        );
    });
  }

  getDetailsForkliftRoutine(id: number) {
    console.log("este es el id: " + id);
    return new Promise((resolve) => {
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token_user"),
          Accept: "application/json",
        }),
      };
      this.http
        .get(
          this.apiEndPoint + "api/forklift_routine_details/" + id,
          httpOptions
        )
        .map((res) => res)
        .subscribe(
          (data) => {
            console.log("a mostrar data");
            console.log(data);
            resolve(data);
          },
          (error) => {
            console.log("error en servicio");
            resolve(error);
          }
        );
    });
  }

  getForkliftImage(id: number) {
    console.log("este es el id: " + id);
    return new Promise((resolve) => {
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token_user"),
          Accept: "application/json",
        }),
      };
      this.http
        .get(this.apiEndPoint + "api/forklift_images/" + id, httpOptions)
        .map((res) => res)
        .subscribe(
          (data) => {
            console.log("a mostrar data");
            console.log(data);
            resolve(data);
          },
          (error) => {
            console.log("error en servicio");
            resolve(error);
          }
        );
    });
  }

  getLogForklift(params: string) {
    console.log(params);
    return new Promise((resolve) => {
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token_user"),
          Accept: "application/json",
        }),
      };
      this.http
        .get(this.apiEndPoint + "api/get_log_forklift?" + params, httpOptions)
        .map((res) => res)
        .subscribe(
          (data) => {
            console.log("a mostrar data");
            console.log(data);
            resolve(data);
          },
          (error) => {
            console.log("error en servicio");
            resolve(error);
          }
        );
    });
  }

  getPendingForklift(params: string) {
    console.log(params);
    return new Promise((resolve) => {
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token_user"),
          Accept: "application/json",
        }),
      };
      this.http
        .get(
          this.apiEndPoint + "api/get_pending_forklift?" + params,
          httpOptions
        )
        .map((res) => res)
        .subscribe(
          (data) => {
            console.log("a mostrar data");
            console.log(data);
            resolve(data);
          },
          (error) => {
            console.log("error en servicio");
            resolve(error);
          }
        );
    });
  }

  deleteImagesForklift(forklift_id: number) {
    console.log("data to send");
    return new Promise((resolve) => {
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token_user"),
          Accept: "application/json",
        }),
      };
      this.http
        .delete(
          this.apiEndPoint +
            "api/delete_all_forklift_images?fork_lift_id=" +
            forklift_id,
          httpOptions
        )
        .map((res) => res)
        .subscribe(
          (data) => {
            console.log("a mostrar data");
            console.log(data);
            resolve(data);
          },
          (error) => {
            console.log("error en servicio");
            console.log(error);
            resolve(error);
          }
        );
    });
  }

  deleteForklift(forklift_id: number) {
    console.log("data to send");
    return new Promise((resolve) => {
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token_user"),
          Accept: "application/json",
        }),
      };
      this.http
        .delete(this.apiEndPoint + "api/forklifts/" + forklift_id, httpOptions)
        .map((res) => res)
        .subscribe(
          (data) => {
            console.log("a mostrar data");
            console.log(data);
            resolve(data);
          },
          (error) => {
            console.log("error en servicio");
            console.log(error);
            resolve(error);
          }
        );
    });
  }

  deleteRoutinesForklift(forklift_id: number) {
    console.log("data to send");
    return new Promise((resolve) => {
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token_user"),
          Accept: "application/json",
        }),
      };
      this.http
        .delete(
          this.apiEndPoint +
            "api/forklift_routine_details?fork_lift_id=" +
            forklift_id,
          httpOptions
        )
        .map((res) => res)
        .subscribe(
          (data) => {
            console.log("a mostrar data");
            console.log(data);
            resolve(data);
          },
          (error) => {
            console.log("error en servicio");
            console.log(error);
            resolve(error);
          }
        );
    });
  }

  saveStatusForklift(params: string) {
    console.log("data to send");
    return new Promise((resolve) => {
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token_user"),
          Accept: "application/json",
        }),
      };
      this.http
        .post(
          this.apiEndPoint + "api/save_status_forklift?" + params,
          httpOptions
        )
        .map((res) => res)
        .subscribe(
          (data) => {
            console.log(data);
            resolve(data);
          },
          (error) => {
            console.log(error);
            resolve(error);
          }
        );
    });
  }

  saveStatusForkliftTime(params: string) {
    console.log("data to send");
    return new Promise((resolve) => {
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token_user"),
          Accept: "application/json",
        }),
      };
      this.http
        .get(
          this.apiEndPoint + "api/change_status_maintenance_forklift?" + params,
          httpOptions
        )
        .map((res) => res)
        .subscribe(
          (data) => {
            console.log(data);
            resolve(data);
          },
          (error) => {
            console.log(error);
            resolve(error);
          }
        );
    });
  }
}
