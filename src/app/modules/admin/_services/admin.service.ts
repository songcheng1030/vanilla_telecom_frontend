import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TableService } from '../../../_metronic/shared/crud-table';
import { User } from '../../../models/user.model';
import { environment } from '../../../../environments/environment';
import { AuthModel } from '../../../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  private authLocalStoragetoken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  private baseUrl = `${environment.baseUrl}`;
  private vanillaUrl = `${environment.vanillaUrl}`;
  
  getApiUri(): string{
    return this.baseUrl;
  }
  getVanillaUri(): string{
    return this.vanillaUrl;
  }

  getHttpHeader(): any{
    let token = JSON.parse(localStorage.getItem(`${this.authLocalStoragetoken}`));
    console.log('this is token', token)
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
}
