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
import "rxjs/add/operator/map";
import { environment } from "./../../../environments/environment";

@Injectable()
export class UserService {
  apiEndPoint = environment.apiBaseUrl;
  apiClientId = environment.clientId;
  apiClientSecret = environment.clientSecret;

  constructor(private http: HttpClient, private router: Router) {}

  createUserInternal(
    firstName: string,
    lastName: string,
    name: string,
    username: string,
    cellphone: string,
    telephone: string,
    password: string,
    rpassword: string,
    email: string,
    profileId: number,
    active: number
  ) {
    return new Promise((resolve) => {
      const headers = new HttpHeaders();
      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/json");

      const postParams = {
        first_name: firstName,
        last_name: lastName,
        name: name,
        cellphone: cellphone,
        telephone: telephone,
        email: email,
        password: password,
        c_password: rpassword,
        username: username,
        profile_id: profileId,
        active: active,
      };
      this.http
        .post(this.apiEndPoint + "api/auth/signup_technician", postParams)
        .map((res) => res)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            resolve(error);
          }
        );
    });
  }

  updateUser(
    firstName: string,
    lastName: string,
    name: string,
    username: string,
    cellphone: string,
    telephone: string,
    email: string,
    id: number,
    profileId: number,
    active: number
  ) {
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

      const patchParams = {
        first_name: firstName,
        last_name: lastName,
        name: name,
        cellphone: cellphone,
        telephone: telephone,
        email: email,
        username: username,
        profile_id: profileId,
        active: active,
      };
      this.http
        .patch(this.apiEndPoint + "api/users/" + id, patchParams, httpOptions)
        .map((res) => res)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            resolve(error);
          }
        );
    });
  }

  findToken(token: any) {
    return new Promise((resolve) => {
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      };

      this.http
        .get(this.apiEndPoint + "api/auth/password/find/" + token, httpOptions)
        .map((res) => res)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            if (
              error.error.message ==
              "Este token de restablecimiento de contraseña no es válido."
            ) {
              resolve(
                "Este token de restablecimiento de contraseña no es válido."
              );
            } else {
              resolve(error);
            }
          }
        );
    });
  }

  getUserCustomer(id: any) {
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
        .get(this.apiEndPoint + "api/get_customer_user/" + id, httpOptions)
        .map((res) => res)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            resolve(error);
          }
        );
    });
  }

  getBranchUser(customer: any, user: any) {
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
        .get(
          this.apiEndPoint +
            "api/get_brach_office_user?customer=" +
            customer +
            "&user=" +
            user,
          httpOptions
        )
        .map((res) => res)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            resolve(error);
          }
        );
    });
  }

  filter(input: any) {
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
        .post(
          this.apiEndPoint + "api/filterByFirstNAndLastN?input=" + input,
          httpOptions
        )
        .map((res) => res)

        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            resolve(error);
          }
        );
    });
  }
  getUsers() {
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
        .get(this.apiEndPoint + "api/users", httpOptions)
        .map((res) => res)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            resolve(error);
          }
        );
    });
  }

  getUser(id: number) {
    localStorage.setItem("aid", "aid");
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
        .get(this.apiEndPoint + "api/users/" + id, httpOptions)
        .map((res) => res)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            resolve(error);
          }
        );
    });
  }

  inactivateUser(id: number) {
    localStorage.setItem("aid", "aid");
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
        .get(this.apiEndPoint + "api/inactivateUser/" + id, httpOptions)
        .map((res) => res)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            resolve(error);
          }
        );
    });
  }

  ActivateateUser(id: number) {
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
        .get(this.apiEndPoint + "api/ActivateateUser/" + id, httpOptions)
        .map((res) => res)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            resolve(error);
          }
        );
    });
  }

  getUsesr(id: number) {}

  getUserInformation(email: string) {
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
        .get(
          this.apiEndPoint + "api/user_information?email=" + email,
          httpOptions
        )
        .map((res) => res)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            resolve(error);
          }
        );
    });
  }

  changePassword(
    email: string,
    password: string,
    token: string,
    rpassword: string
  ) {
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

      const postParams = {
        email: email,
        status: 1,
        password: password,
        c_password: rpassword,
        token: token,
      };
      this.http
        .post(
          this.apiEndPoint + "api/auth/password/reset",
          postParams,
          httpOptions
        )
        .map((res) => res)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            resolve(error);
          }
        );
    });
  }

  changePasswordLogin(idUser: number, password: string) {
    return new Promise((resolve) => {
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token_user"),
          Accept: "application/json",
        }),
      };

      const patchParams = {
        password: password,
      };
      this.http
        .patch(
          this.apiEndPoint + "api/change_password/changePassword/" + idUser,
          patchParams,
          httpOptions
        )
        .map((res) => res)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            resolve(error);
          }
        );
    });
  }

  getUsersCustomer() {
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
        .get(this.apiEndPoint + "api/all_branch_offices_users", httpOptions)
        .map((res) => res)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            resolve(error);
          }
        );
    });
  }

  getUsersCustomerUpdate(idUser: number) {
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
        .get(
          this.apiEndPoint + "api/branch_offices_users?id_user=" + idUser,
          httpOptions
        )
        .map((res) => res)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            resolve(error);
          }
        );
    });
  }

  createUserCustomer(
    id_user: number,
    id_customer: number,
    ids_branch_offices: Array<number>
  ) {
    return new Promise((resolve) => {
      const headers = new HttpHeaders();
      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/json");
      const postParams = {
        id_user: id_user,
        ids_branch_offices: ids_branch_offices,
      };
      this.http
        .post(this.apiEndPoint + "api/branch_offices_users", postParams)
        .map((res) => res)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            resolve(error);
          }
        );
    });
  }

  recoveryPassword(email: string) {
    return new Promise((resolve) => {
      const headers = new HttpHeaders();
      // headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user'))); // 'Bearer ' +
      headers.append("Content-Type", "application/json");
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      };
      const postParams = {
        email: email,
      };
      this.http
        .post(
          this.apiEndPoint + "api/auth/password/create",
          postParams,
          httpOptions
        )
        .map((res) => res)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            if (
              error.error.message ==
              "No podemos encontrar un usuario con esa dirección de correo electrónico."
            ) {
              resolve(
                "No podemos encontrar un usuario con esa dirección de correo electrónico."
              );
            } else {
              console.log(error);
              resolve(error);
            }
          }
        );
    });
  }

  deleteUsers(id: number) {
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
        .delete(this.apiEndPoint + "api/users/" + id, httpOptions)
        .map((res) => res)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            resolve(error);
          }
        );
    });
  }

  //valida el estado del usuario
  login(email: string, password: string) {
    return new Promise((resolve) => {
      const headers = new HttpHeaders();
      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/json");

      const postParams = {
        grant_type: "password",
        client_id: this.apiClientId,
        client_secret: this.apiClientSecret,
        username: email,
        password: password,
        scope: "*",
      };

      this.http
        .post(this.apiEndPoint + "/userIdel", postParams)
        .map((res) => res)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            console.log("este es el error");
            console.log(error);

            resolve(error);
          }
        );
    });
  }

  generateToken(email: string, password: string) {
    return new Promise((resolve) => {
      const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "*");
      // const headers = new HttpHeaders();
      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/json");

      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      };
      //  let options = new RequestOptions({ headers: headers });

      const postParams = {
        grant_type: "password",
        client_id: this.apiClientId,
        client_secret: this.apiClientSecret,
        username: email,
        password: password,
        scope: "*",
      };
      //  alert (postParams.toString());
       this.http.post(this.apiEndPoint + 'oauth/token', postParams , {headers})

      // this.http.post(this.apiEndPoint + "api/login", postParams, { headers })
        .map((res) => res)
        .subscribe(
          (data) => {
            const ole = data;

            resolve(data);
          },
          (error) => {
            resolve(error);
          }
        );
    });
  }

  deleteOfficesBranchUser(idUser: number, idCustomer: number) {
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
            "api/delete_all_branch_offices_users?id_user=" +
            idUser +
            "&id_customer=" +
            idCustomer,
          httpOptions
        )
        .map((res) => res)
        .subscribe(
          (data) => {
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

  technicianRegionalSelect(details: string) {
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
      const postParams = {
        regional: details,
      };
      this.http
        .post(
          this.apiEndPoint + "api/create_technician_regionals",
          postParams,
          httpOptions
        )
        .map((res) => res)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            resolve(error);
          }
        );
    });
  }

  getRegionalId(id: number) {
    localStorage.setItem("userid", "id");

    return new Promise((resolve) => {
      const headers = new HttpHeaders();
      headers.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token_user")
      );
      headers.append("Content-Type", "application/json");
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token_user"),
          Accept: "application/json",
        }),
      };
      const postParams = {};
      this.http
        .get(this.apiEndPoint + "api/show_user_regionals/" + id, httpOptions)
        .map((res) => res)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            resolve(error);
          }
        );
    });
  }

  activateUsers(id: number) {
    localStorage.setItem("userid", "id");

    return new Promise((resolve) => {
      const headers = new HttpHeaders();
      headers.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token_user")
      );
      headers.append("Content-Type", "application/json");
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token_user"),
          Accept: "application/json",
        }),
      };
      const postParams = {};
      this.http
        .delete(this.apiEndPoint + "api/getUsesr/" + id, httpOptions)
        .map((res) => res)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            resolve(error);
          }
        );
    });
  }

  showProfile() {
    return new Promise((resolve) => {
      const headers = new HttpHeaders();
      headers.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token_user")
      );
      headers.append("Content-Type", "application/json");
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token_user"),
          Accept: "application/json",
        }),
      };
      const postParams = {};
      this.http
        .get(this.apiEndPoint + "api/profiles", httpOptions)
        .map((res) => res)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            resolve(error);
          }
        );
    });
  }

  getprofileId(id: number) {
    return new Promise((resolve) => {
      const headers = new HttpHeaders();
      headers.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token_user")
      );
      headers.append("Content-Type", "application/json");
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token_user"),
          Accept: "application/json",
        }),
      };
      const postParams = {};
      this.http
        .get(this.apiEndPoint + "api/profiles/" + id, httpOptions)
        .map((res) => res)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            resolve(error);
          }
        );
    });
  }

  createProfile(details: string) {
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
      const postParams = {
        description: details,
      };
      this.http
        .post(this.apiEndPoint + "api/profiles", postParams, httpOptions)
        .map((res) => res)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            resolve(error);
          }
        );
    });
  }

  updateProfile(idUser: number, password: string) {
    return new Promise((resolve) => {
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token_user"),
          Accept: "application/json",
        }),
      };

      const patchParams = {
        description: password,
      };
      this.http
        .patch(
          this.apiEndPoint + "api/profiles/" + idUser,
          patchParams,
          httpOptions
        )
        .map((res) => res)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            resolve(error);
          }
        );
    });
  }

  deleteProfile(id: number) {
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
        .delete(this.apiEndPoint + "api/profiles/" + id, httpOptions)
        .map((res) => res)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            resolve(error);
          }
        );
    });
  }
}
