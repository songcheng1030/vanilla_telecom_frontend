import { Injectable, OnDestroy, Inject, OnInit } from '@angular/core';
import {  HttpEventType, HttpClient } from '@angular/common/http';
import { forkJoin, Observable, BehaviorSubject } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { TableService, TableResponseModel, ITableState, BaseModel } from '../../../_metronic/shared/crud-table';
import { baseFilter } from '../../../_fake/fake-helpers/http-extenstions';
import { environment } from '../../../../environments/environment';
import { AppService } from '../../../app.service';
import { ResolveEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmailService implements OnDestroy, OnInit {
  baseUrl = `${environment.baseUrl}`;
  hubspotEmail = environment.hubspotEmail;
  hubspotApiKey = environment.hubspotApiKey;
  httpOptions: any;

  onGetProducts: BehaviorSubject<any>;
  onGetSelectProducts: BehaviorSubject<any>;
  constructor(
    private _appService: AppService,
    private http: HttpClient,
    ) {
    this.httpOptions = this._appService.httpOptions;
    this.onGetProducts = new BehaviorSubject([]);
    this.onGetSelectProducts = new BehaviorSubject([]);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    
  }
  
  async emailSend(data): Promise<any>{
    console.log('thsi is aaaaaaaaaa', data);
    return new Promise((resolve, reject) => {
      this.http.post(`${this.hubspotEmail}\?hapikey=${this.hubspotApiKey}`, data)
        .subscribe((res: any) => {
          console.log('this is __additionalProp1', res);
          // let message: string;
          // if (res?.status == "error"){
          //   message = res.message;
          // }else{
          //   message = "Successful registration of new contract";
          // }
          // resolve(message);
        }, reject);
    });
  }
}
