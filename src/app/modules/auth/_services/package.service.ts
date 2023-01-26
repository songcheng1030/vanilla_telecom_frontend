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
export class PackageService implements OnDestroy, OnInit {
  baseUrl = `${environment.baseUrl}`;

  httpOptions: any;

  onGetPackages: BehaviorSubject<any>;
  onGetSelectProducts: BehaviorSubject<any>;
  constructor(
    private _appService: AppService,
    private http: HttpClient,
    ) {
    this.httpOptions = this._appService.httpOptions;
    this.onGetPackages = new BehaviorSubject([]);
    this.onGetSelectProducts = new BehaviorSubject([]);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    
  }
  
  async getPackages(id: number): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + '/Channel/packageId/' + id, this.httpOptions)
        .subscribe((response: any) => {
            this.onGetPackages.next(response);
            resolve(response);
        }, reject);
    });
  }
}
