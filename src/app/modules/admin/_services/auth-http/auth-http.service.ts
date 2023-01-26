import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../../../models/user.model';
import { ResidentialModel } from '../../../../models/residential.model';
import { BusinessModel } from '../../../../models/business.model';
import { environment } from '../../../../../environments/environment';
import { AuthModel } from '../../../../models/auth.model';

const API_USERS_URL = `${environment.apiUrl}/users`;
const API_Residential_URL = `${environment.apiUrl}/ResidentialUser`;
const baseUrl = `${environment.baseUrl}`;
const vanillaUrl = `${environment.vanillaUrl}`;
const test_login = `${environment.login}`;
const test_token = `${environment.token}`;

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  constructor(private http: HttpClient) { }

  // local methods
  // login(email: string, password: string): Observable<any> {
  //   return this.http.post<AuthModel>(`${baseUrl}/Auth/login`, { email, password });
  // }

  // vanilla methods
 
  login(email: string, password: string): Observable<any> {
    let data = {
      params: {
        login: test_login,
        enable_csrf_protection: 0,
        token: test_token
      }
    }

    return this.http.get<AuthModel>(baseUrl + '/Portaone/gettoken');
  }
  // CREATE =>  POST: add a new user to the server
  createResidential(residentialUser: ResidentialModel): Observable<ResidentialModel> {
    return this.http.post<ResidentialModel>(API_Residential_URL, residentialUser);
  }

  createBusiness(businessUser: BusinessModel): Observable<BusinessModel> {
    return this.http.post<BusinessModel>(API_Residential_URL, businessUser);
  }

  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_USERS_URL}/forgot-password`, {
      email,
    });
  }

  getUserByToken(token): Observable<User> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<User>(`${API_USERS_URL}`, {
      headers: httpHeaders,
    });
  }
}
