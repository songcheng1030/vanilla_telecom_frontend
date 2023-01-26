import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from './admin.component';
import {LoginComponent} from './login/login.component';
import {SelectComponent} from './select/select.component';
import {CustomersComponent} from './customers/customers.component';
import {ProductsComponent} from './products/products.component';
import {PackageComponent} from './package/package.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {returnUrl: window.location.pathname}
      },
      {
        path: 'select',
        component: SelectComponent,
        data: {returnUrl: window.location.pathname}
      },
      {
        path: 'users',
        component: CustomersComponent,
        data: {returnUrl: window.location.pathname}
      },
      {
        path: 'products',
        component: ProductsComponent,
        data: {returnUrl: window.location.pathname}
      },
      {
        path: 'package',
        component: PackageComponent,
        data: {returnUrl: window.location.pathname}
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: '**', redirectTo: 'login', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule {}
