import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription, BehaviorSubject } from 'rxjs';
import { PackageModalComponent } from '../package-modal/package-modal.component';
import { catchError, finalize, first, tap, takeUntil } from 'rxjs/operators';
import { AuthService } from '../../_services/auth.service'
import { PhoneService } from '../../_services/phone.service'
import { Subject } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'did-modal',
  templateUrl: './did-modal.component.html',
  styleUrls: ['./did-modal.component.scss'],
  // NOTE: For this example we are only providing current component, but probably
  // NOTE: you will w  ant to provide your main App Module
})
export class DidModalComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  phoneNumbers: any;
  changeText: boolean = false;
  selectPhonNumber: any;

  constructor(
    public modal: NgbActiveModal,
    private modalService: NgbModal,
    private authService: AuthService,
    private phoneService: PhoneService
  ) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.phoneService.onGetPhoneNumber
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(tempPhoneNumbers => {
      this.phoneNumbers = _.cloneDeep(tempPhoneNumbers);
    }); 

    this.phoneService.getPhoneNumberList();
  }

  ngOnDestroy(): void {
    
  }

  next() {
    this.modal.dismiss();
    const modalRef = this.modalService.open(PackageModalComponent, { size: 'md' });
  }
  onChangeText(id){
    this.changeText = id;
  }
  onClickNumber(phoneNumber){
    this.selectPhonNumber = phoneNumber;
    this.phoneService.onSelectPhoneNumber.next(phoneNumber);
  }
}
