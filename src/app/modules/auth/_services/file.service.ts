import { Injectable, OnDestroy, Inject } from '@angular/core';
import {  HttpEventType, HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { TableService, TableResponseModel, ITableState, BaseModel } from '../../../_metronic/shared/crud-table';
import { baseFilter } from '../../../_fake/fake-helpers/http-extenstions';
import { environment } from '../../../../environments/environment';
import { AppService } from '../../../app.service';
import { ResolveEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FileService implements OnDestroy {
  baseUrl = `${environment.baseUrl}`;

  httpOptions: any;

  constructor(
    private _appService: AppService,
    private http: HttpClient,
    ) {
    this.httpOptions = this._appService.httpOptions;
  }

  // READ
  
  ngOnDestroy() {
    
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/Upload', formData, {reportProgress: true, observe: 'events'})
        .subscribe(res => {
          if (res.type === HttpEventType.Response){
            console.log('this si dbPath', res.body)
            resolve(res.body )
          }
        });
    });
  }
}
