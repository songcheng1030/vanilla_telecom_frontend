import { Injectable, OnDestroy, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, BehaviorSubject } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { TableService, TableResponseModel, ITableState, BaseModel } from '../../../_metronic/shared/crud-table';
import { Product } from '../../../models/product.model';
import { baseFilter } from '../../../_fake/fake-helpers/http-extenstions';
import { environment } from '../../../../environments/environment';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends TableService<Product> implements OnDestroy {

  onGetProducts: BehaviorSubject<any>;

  constructor(
    @Inject(HttpClient) http,
      private adminService: AdminService
    ) {
      super(http);
      this.onGetProducts = new BehaviorSubject([]);
      this.getProducts()
    }

  async getProducts(): Promise<any>{

    return new Promise((resolve, reject) => {
      this.http.get(this.adminService.getApiUri() + '/Products')
        .subscribe((response: any) => {
          console.log('this is getHttpHeader', response)
          let products = response ?  response : [];
          console.log('----products:', products)  
          this.onGetProducts.next(products);
          // resolve(products);
        }, reject);
    });
  }

  deleteItems(ids: number[] = []): Observable<any> {
    const tasks$ = [];
    ids.forEach(id => {
      tasks$.push(this.delete(id));
    });
    return forkJoin(tasks$);
  }
  
  async updateStatus(item: Product): Promise<any>{
    const data = {
        id: item.id,
        name: item.name,
        stock: item.stock,
        status: item.status === 1?0:1,
        image_url: item.image_url
    };
    // this._progressBarService.beginLoading2();   
    return new Promise((resolve, reject) => {
        this.http.put(this.adminService.getApiUri() + '/Products/' + item.id, data)
            .subscribe((response: any) => {

                console.log('this is httpOptions-----------', response)
                    // resolve();
                    // this._progressBarService.endLoading2();
            }, reject);
    });    
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
