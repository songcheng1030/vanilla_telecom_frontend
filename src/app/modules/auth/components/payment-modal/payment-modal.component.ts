import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription, BehaviorSubject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { catchError, finalize, first, tap, takeUntil } from 'rxjs/operators';
import { AuthService } from '../../_services/auth.service';
import { EmailService } from '../../_services/email.service';
import { PhoneService } from '../../_services/phone.service';
import { Subject } from 'rxjs';
import { LayoutService } from '../../../../_metronic/core/';
import { environment } from '../../../../../environments/environment';
import { ResidentialModel } from '../../../../models/residential.model';
import { BusinessModel } from '../../../../models/business.model';
import * as _ from 'lodash';

@Component({
  selector: 'payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
  // NOTE: For this example we are only providing current component, but probably
  // NOTE: you will w  ant to provide your main App Module
})
export class PaymentModalComponent implements OnInit {

  stripePublishKey = environment.stripePublishKey;
  cardNumber: string = "";
  expMonth: string = "";
  expYear: string = "";
  cardName: string = "";
  cvv: string = "";
  checked: string;
  submitted: boolean;
  message: string;
  errorMessage: string = "";
  phoneNumber: string = "";
  residential: ResidentialModel;
  business: BusinessModel;
  registorMessage: string = "";
  private _unsubscribeAll: Subject<any>;

  @ViewChild('form', { static: true }) form: NgForm;
  activeTabId = 1;
  
  constructor(
    public modal: NgbActiveModal,
    private layout: LayoutService, 
    private modalService: NgbModal,
    private authService: AuthService,
    private emailService: EmailService,
    private phoneService: PhoneService
  ) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.loadStripe();
  }
  ngOnDestroy(): void {
    
  }

  back() {
    this.modal.dismiss();
    const modalRef = this.modalService.open(ProductModalComponent, { size: 'md' });
  }

  loadStripe() {
   
    if(!window.document.getElementById('stripe-custom-form-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-custom-form-script";
      s.type = "text/javascript";
      s.src = "https://js.stripe.com/v2/";
      s.onload = () => {
        window['Stripe'].setPublishableKey(this.stripePublishKey);
      }
       
      window.document.body.appendChild(s);
    }
  }

  validation(){
    console.log('this is validation', this.cardNumber, this.expMonth )
    if (this.cardNumber == ""){
      this.errorMessage = "Card Number is required";
      return true;
    }
    if (this.expMonth == ""){
      this.errorMessage = "Expiry Month is required";
      return true;
    }
    if (this.expYear == ""){
      this.errorMessage = "Expiry Year is required";
      return true;
    }
    if (this.cardName == ""){
      this.errorMessage = "Card Name is required";
      return true;
    }
    if (this.cvv == ""){
      this.errorMessage = "CVV is required";
      return true;
    }
    return false;
  }

  pay() {
 
    if(!window['Stripe']) {
      alert('Oops! Stripe did not initialize properly.');
      return;
    }
    if (this.validation()){
      return
    }
    this.submitted = true;

    if(!window['Stripe']) {
      alert('Oops! Stripe did not initialize properly.');
      return;
    }
    (<any>window).Stripe.card.createToken({
      number: this.cardNumber,
      exp_month: this.expMonth,
      exp_year: this.expYear,
      cvc: this.cvv
    }, (status: number, response: any) => {
      this.submitted = false;
      if (status === 200) {
        this.message = `Success Payment!`;
        let selectUser = localStorage.getItem('selectUser');
        if ( selectUser == "residential" ){
          this.registorContact();
        }else if( selectUser == "business" ){
          this.registorBusiness();
        }
      } else {
        this.message = response.error.message;
      }
    });
  }

  registorContact(){
    this.authService.onResidential
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(item => {
      this.residential = new ResidentialModel;
      this.residential = item;
    });

    this.phoneService.onSelectPhoneNumber
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(item => {
      this.phoneNumber = item;
    });

    let data: any;
    data = {
      properties:[
        {
          property: "email",
          value: this.residential.email
        },
        {
          property: "firstname",
          value:  this.residential.name.split(" ")[0]
        },
        {
          property: "lastname",
          value: this.residential.name.split(" ")[1]
        },
        {
          property: "phone",
          value: this.residential.contactNumber
        },
        {
          property: "address",
          value: this.residential.address1 + this.residential.address2
        },
        {
          property: "city",
          value: this.residential.address1
        },
        {
          property: "zip",
          value: this.residential.postcode
        }
      ]
    }
    this.authService.contractRegister(data).then((message)=>{
      this.registorMessage = message;
      alert(this.registorMessage);
      let data = {
        message: {
          from: 'accounts@vanilla.net.mt',
          to: this.residential.email,
          sendId: 'string',
          replyTo: ['string__replayTO'],
          cc: ['string___CC'],
          bcc: ['string___BCC']
        },
        contactProperties: {
          additionalProp1: 'string__additionalProp1',
          additionalProp2: 'string__additionalProp2',
          additionalProp3: 'string__additionalProp3'
        },
      }
      this.emailService.emailSend(data);
      this.modal.dismiss();
    })
  }

  registorBusiness(){
    this.authService.onBusiness
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(item => {
      this.business = new BusinessModel;
      this.business = item;
    });

    this.phoneService.onSelectPhoneNumber
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(item => {
      this.phoneNumber = item;
    });

    let data: any;
    data = {
      properties:[
        {
          property: "name",
          value: this.business.companyName
        },
        {
          property: "country",
          value:  this.business.billingAddress1.split(" ")[0]
        },
        {
          property: "city",
          value: this.business.billingAddress1.split(" ")[1]
        },
        {
          property: "invoicing_email",
          value: this.business.invoiceEmail
        },
        {
          property: "phone",
          value: this.business.phoneNumber
        },
        {
          property: "zip",
          value: this.business.postcode
        },
        {
          property: "industry",
          value: this.business.companyEntity
        }
      ]
    }
    this.authService.businessRegister(data).then((message)=>{
      this.registorMessage = message;
      alert(this.registorMessage);
      this.modal.dismiss();
    })
  }
}


// 0: "city"
// 1: "country"
// 2: "createdate"
// 3: "domain"
// 4: "hs_all_accessible_team_ids"
// 5: "hs_all_owner_ids"
// 6: "hs_all_team_ids"
// 7: "hs_analytics_source"
// 8: "hs_analytics_source_data_1"
// 9: "hs_lastactivitydate"
// 10: "hs_latest_source"
// 11: "hs_latest_source_data_1"
// 12: "hs_object_id"
// 13: "hs_pipeline"
// 14: "hubspot_owner_id"
// 15: "hubspot_team_id"
// 16: "industry"
// 17: "invoicing_email"
// 18: "lifecyclestage"
// 19: "name"
// 20: "notes_last_created"
// 21: "notes_last_updated"
// 22: "phone"
// 23: "website"
// 24: "zip"