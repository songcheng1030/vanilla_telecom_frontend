import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { SelectComponent } from './select/select.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminComponent } from './admin.component';
import {TranslationModule} from '../i18n/translation.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';
import { PackageComponent } from './package/package.component';
import { CRUDTableModule } from '../../_metronic/shared/crud-table';
import { DeleteCustomerModalComponent } from './customers/components/delete-customer-modal/delete-customer-modal.component';
import { DeleteCustomersModalComponent } from './customers/components/delete-customers-modal/delete-customers-modal.component';
import { FetchCustomersModalComponent } from './customers/components/fetch-customers-modal/fetch-customers-modal.component';
import { UpdateCustomersStatusModalComponent } from './customers/components/update-customers-status-modal/update-customers-status-modal.component';
import { EditCustomerModalComponent } from './customers/components/edit-customer-modal/edit-customer-modal.component';
import { NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ForgotPasswordComponent,
    AdminComponent,
    LoginComponent,
    CustomersComponent,
    ProductsComponent,
    DeleteCustomerModalComponent,
    DeleteCustomersModalComponent,
    FetchCustomersModalComponent,
    UpdateCustomersStatusModalComponent,
    EditCustomerModalComponent,
    PackageComponent
  ],
  imports: [
    CommonModule,
    TranslationModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InlineSVGModule,
    CRUDTableModule,
    NgbModalModule,
    NgbDatepickerModule
  ],
  entryComponents: [
    DeleteCustomerModalComponent,
    DeleteCustomersModalComponent,
    UpdateCustomersStatusModalComponent,
    FetchCustomersModalComponent,
    EditCustomerModalComponent
  ]
})
export class AdminModule {}
