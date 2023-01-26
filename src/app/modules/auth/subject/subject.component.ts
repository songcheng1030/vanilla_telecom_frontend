import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service'
import { PhoneService } from '../_services/phone.service'
@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
})
export class SubjectComponent implements OnInit, OnDestroy {
  // KeenThemes mock, change it to:
  // defaultAuth = {
  //   email: '',
  //   password: '',
  // };
  defaultAuth: any = {
    email: 'admin@demo.com',
    password: 'demo',
  };
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private phoneService: PhoneService
  ) {
  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl =
        this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  residential() {
    localStorage.setItem('selectUser', 'residential');
    this.authService.onGetSelectedUser.next(0);
    this.router.navigate(['/auth/residential']);  
  }

  business() {
    localStorage.setItem('selectUser', 'business');
    this.authService.onGetSelectedUser.next(1);
    this.router.navigate(['/auth/business']); 
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
