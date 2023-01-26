import { Component, Input, OnDestroy, OnInit,  HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, finalize, first, tap, takeUntil } from 'rxjs/operators';
import { ProductService } from '../../../../services/product.service';
import { Subject } from 'rxjs';
import { Product } from '../../../../models/product.model';
import { P } from '@angular/cdk/keycodes';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';
import { PackageModalComponent } from '../package-modal/package-modal.component';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent implements OnInit, OnDestroy {
  arr: Product[] = [];
  totalCards: number;
  currentPage: number = 1;
  pagePosition: string = "0%";
  cardsPerPage: number;
  totalPages: number;
  overflowWidth: string;
  cardWidth: string;
  containerWidth: number;
  selectedId: number;
  private _unsubscribeAll: Subject<any>;

  constructor(
    public modal: NgbActiveModal,
    private modalService: NgbModal,
    private productService: ProductService,
    private authService: AuthService
  ) { 
    this._unsubscribeAll = new Subject();
  }


  @ViewChild("container", { static: true, read: ElementRef })
  container: ElementRef;
  @HostListener("window:resize") windowResize() {
    let newCardsPerPage = this.getCardsPerPage();
    if (newCardsPerPage != this.cardsPerPage) {
      this.cardsPerPage = newCardsPerPage;
      this.initializeSlider();
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
        this.populatePagePosition();
      }
    }
  }

  ngOnInit() {
    this.cardsPerPage = this.getCardsPerPage();
    this.productService.onGetSelectProducts
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(products => {
          products.map((item)=>{
            if (item.status === 1){
              this.arr.push(item);
            }
          })   
          this.totalCards = this.arr.length;
          console.log('thsi is products----------------', products, this.totalCards);
          this.initializeSlider();
      }); 
    this.productService.getSelectProducts();
  }

  initializeSlider() {
    this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);
    this.overflowWidth = `calc(${this.totalPages * 100}% + ${this.totalPages *
      10}px)`;   
    this.cardWidth = `calc((${100 / this.totalPages}% - ${this.cardsPerPage *
      10}px) / ${this.cardsPerPage})`;
  }

  getCardsPerPage() {
    return Math.floor(this.container.nativeElement.offsetWidth / 400);
  }

  changePage(incrementor) {
    this.currentPage += incrementor;
    this.populatePagePosition();
  }

  populatePagePosition() {
    this.pagePosition = `calc(${-100 * (this.currentPage - 1)}% - ${10 *
      (this.currentPage - 1)}px)`;
  }

  ngOnDestroy(): void {
    
  }
  next() {
    this.modal.dismiss();
    const modalRef = this.modalService.open(PaymentModalComponent, { size: 'md' });
  }
  back() {
    this.modal.dismiss();
    const modalRef = this.modalService.open(PackageModalComponent, { size: 'lg' });
  }
  onSelectProduct(product: Product){
    console.log('this is errorMessage', product);
    this.selectedId = product.id;
    this.authService.onSelectProduct.next(product);
  }
}
