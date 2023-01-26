import { Injectable, OnDestroy, Inject } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { User } from '../models/user.model';
import { ResidentialModel } from '../models/residential.model';
import { BusinessModel } from '../models/business.model';
import { AuthModel } from '../models/auth.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { TableService, TableResponseModel, ITableState, BaseModel } from '../_metronic/shared/crud-table';

@Injectable({
  providedIn: 'root',
})

export class AuthService extends TableService<User>{
  // private fields
  private authLocalStoragetoken = `autologin-${environment.USERDATA_KEY}`;
  private baseUrl = `${environment.baseUrl}`;
  private vanillaUrl = `${environment.vanillaUrl}`;
  private test_login = `${environment.login}`;
  private test_token = `${environment.token}`;

  constructor(
    @Inject(HttpClient) http,
    ) {
   super(http);
   this.autoLogin();
  }

  getApiUri(): string{
    return this.baseUrl;
  }
  getVanillaUri(): string{
    return this.vanillaUrl;
  }
  
  getHttpHeader(): any{
    let token = JSON.parse(localStorage.getItem(`${this.authLocalStoragetoken}`));
    let httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.access_token}`
      })
    }
    return httpHeaders;
  }

  public getAuthFromLocalStorage(): AuthModel {
    try {
      const authData = JSON.parse(
        localStorage.getItem(this.authLocalStoragetoken)
      );
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
  
  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth accesstoken/refreshtoken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.access_token) {
      localStorage.setItem(this.authLocalStoragetoken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  async autoLogin(): Promise<any>{

    console.log('this is autoLogin', this.authLocalStoragetoken);
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + '/Portaone/gettoken')
        .subscribe((auth: AuthModel) => {
          console.log('this is autoLogin', auth);
          const result = this.setAuthFromLocalStorage(auth);
          resolve(auth);
        }, reject);
    });
  }
}
