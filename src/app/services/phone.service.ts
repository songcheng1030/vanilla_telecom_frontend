import { Injectable, OnDestroy, Inject, OnInit } from '@angular/core';
import {  HttpEventType, HttpClient } from '@angular/common/http';
import { forkJoin, Observable, BehaviorSubject } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { baseFilter } from '../_fake/fake-helpers/http-extenstions';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { ResolveEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PhoneService implements OnDestroy, OnInit {
  baseUrl = `${environment.baseUrl}`;

  httpOptions: any;

  onGetPhoneNumber: BehaviorSubject<any>;
  onSelectPhoneNumber: BehaviorSubject<any>;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    ) {
    this.httpOptions = this.authService.getHttpHeader();
    this.onGetPhoneNumber = new BehaviorSubject([]);
    this.onSelectPhoneNumber = new BehaviorSubject([]);
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    
  }
  
  async getPhoneNumberList(): Promise<any>{
    const data = {
      params: {
     
      }
    };
    return new Promise((resolve, reject) => {
      this.http.post(this.authService.getVanillaUri() + '/DID/get_number_list', data, this.httpOptions)
        .subscribe((response: any) => {
            let phoneNumber = response.number_list ?  response.number_list : [];
            console.log('this si numberList-------------------', phoneNumber)
            this.onGetPhoneNumber.next(phoneNumber);
        }, reject);
    });
  }
}
