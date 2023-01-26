import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, finalize, first, tap, takeUntil } from 'rxjs/operators';
import { ProductModalComponent } from '../product-modal/product-modal.component'
import { DidModalComponent } from '../did-modal/did-modal.component'
import { Subject } from 'rxjs';
import { PackageService } from '../../_services/package.service'
import { AuthService } from '../../_services/auth.service'
import * as _ from 'lodash';

@Component({
  selector: 'package-modal',
  templateUrl: './package-modal.component.html',
  styleUrls: ['./package-modal.component.scss']
})
export class PackageModalComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;
  packages: any[];
  changeText: boolean = false;
  selectPackage: any;

  constructor(
    public modal: NgbActiveModal,
    private modalService: NgbModal,
    private packageService: PackageService,
    private authService: AuthService
  ) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    let selectUser = localStorage.getItem('selectUser');
    let item: number;
    if ( selectUser == "residential" ){
      item = 0
    }else if( selectUser == "business" ){
      item = 1
    }
    this.packageService.getPackages(item).then((tempPageages)=>{
      this.packages = _.cloneDeep(tempPageages);
    })
  }
  ngOnDestroy(): void {
    
  }
  next() {
    this.modal.dismiss();
    const modalRef = this.modalService.open(ProductModalComponent, { size: 'lg' });
  }
  back() {
    this.modal.dismiss();
    const modalRef = this.modalService.open(DidModalComponent, { size: 'lg' });
  }
  onChangeText(id){
    this.changeText = id;
  }
  onClickPackage(item){
    this.selectPackage = item;
    this.authService.onSelectPackage.next(item);
  }
}
