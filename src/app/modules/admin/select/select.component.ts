import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { PackageService } from '../_services/package.service';
import { ProductsService } from '../_services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private packageService: PackageService,
    private productsService: ProductsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
  }

  ngOnInit(): void {

  }

  // convenience getter for easy access to form fields

  products(){
    // this.productsService.getProducts();
    this.router.navigate(['/admin/products']);  
  }

  packages(){
    // this.packageService.getAllChannels();
    this.router.navigate(['/admin/package']);  
  }

  adminUsers(){
    this.router.navigate(['/admin/users']);  
  }
  
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
} 
