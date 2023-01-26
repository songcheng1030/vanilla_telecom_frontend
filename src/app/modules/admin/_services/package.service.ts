import { Injectable, OnDestroy, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, BehaviorSubject } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { TableService, TableResponseModel, ITableState, BaseModel } from '../../../_metronic/shared/crud-table';
import { Product } from '../../../models/product.model';
import { baseFilter } from '../../../_fake/fake-helpers/http-extenstions';
import { environment } from '../../../../environments/environment';
import { AppService } from '../../../app.service';

@Injectable({
  providedIn: 'root'
})
export class PackageService extends TableService<Product> implements OnDestroy {
  API_URL = `${environment.apiUrl}/products`;
  baseUrl = `${environment.baseUrl}`;

  httpOptions: any;
  onGetAllChannels: BehaviorSubject<any>;

  constructor(
    @Inject(HttpClient) http,
    private _appService: AppService
    ) {
    super(http);
    this.httpOptions = this._appService.httpOptions;
    this.onGetAllChannels = new BehaviorSubject([]);
    // this.getAllChannels();
  }

  // READ
  async getAllChannels(): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + '/Channel/all', this.httpOptions)
        .subscribe((response: any) => {
            console.log('this si httpOptions-------------------', response)
            this.onGetAllChannels.next(response);
        }, reject);
    });
  }
  
  ngOnDestroy() {
  
  }
}
