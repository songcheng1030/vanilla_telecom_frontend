import { Component, Input, OnDestroy, OnInit,  HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'credit-modal',
  templateUrl: './credit-modal.component.html',
  styleUrls: ['./credit-modal.component.scss']
})
export class CreditModalComponent implements OnInit, OnDestroy {
  stripePublishKey = environment.stripePublishKey
  paymentHandler:any = null;
  amount:number = 0;
  constructor(
    public modal: NgbActiveModal,
  ) { 
  }

  ngOnInit() {
    this.invokeStripe();
  }

  ngOnDestroy(): void {
    
  }
  makePayment() {
    if (this.amount === 0){
      alert('Please input credit limit!');
      return
    }
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: this.stripePublishKey,
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken)
        alert('Stripe token generated!');
      }
    });
    
    paymentHandler.open({
      name: 'Vanilla Telecom',
      description: '30 DAYS CREDIT WITH A',
      amount: this.amount * 100
    });
  }
  
  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: this.stripePublishKey,
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
            alert('Payment has been successfull!');
          }
        });
      }
      window.document.body.appendChild(script);
    }
  }

}
