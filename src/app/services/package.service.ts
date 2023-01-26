import { Injectable, OnDestroy, Inject, OnInit } from '@angular/core';
import {  HttpEventType, HttpClient } from '@angular/common/http';
import { forkJoin, Observable, BehaviorSubject } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { baseFilter } from '../_fake/fake-helpers/http-extenstions';
import { environment } from '../../environments/environment';
import { AppService } from '../app.service';
import { ResolveEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PackageService implements OnDestroy, OnInit {
  baseUrl = `${environment.baseUrl}`;

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
  
  async getProducts(): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + '/Products')
        .subscribe((response: any) => {
            console.log('this si httpOptions-------------------', response)
            this.onGetProducts.next(response);
        }, reject);
    });
  }

  async getSelectProducts(): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + '/Products/selected')
        .subscribe((response: any) => {
            console.log('this si httpOptions-------------------', response)
            this.onGetSelectProducts.next(response);
        }, reject);
    });
  }
}
