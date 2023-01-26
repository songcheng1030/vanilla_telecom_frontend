// tslint:disable:no-string-literal
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../_services';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, first, tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Product } from '../../../models/product.model'
import * as _ from 'lodash';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;
  products: any;
  productsFlag: boolean;

  constructor(
    public productsService: ProductsService,
    private router: Router
  ) { 
    this._unsubscribeAll = new Subject();
    this.products = [];
    this.productsFlag = true;
  }

  ngOnInit(): void {
    // this.productsService.getProducts();

    this.productsService.onGetProducts
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(tempproducts => {
      this.products = tempproducts;
      if (this.products.length > 0){
        this.productsFlag = true;
        this.products = _.cloneDeep(this.products);
        console.log('-----------------', this.productsFlag)
      }
    }); 
  }

  ngOnDestroy() {
  }

  goback(){
    this.router.navigate(['/admin/select']);  
  }
  onSelectProduct(item:any): void{
    this.productsService.updateStatus(item)
  }
}
