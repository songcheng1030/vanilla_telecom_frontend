import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { ResidentialComponent } from './residential/residential.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { BusinessComponent } from './business/business.component';
import { SubjectComponent } from './subject/subject.component';
import { AuthComponent } from './auth.component';
import { TranslationModule } from '../i18n/translation.module';
import { DidModalComponent } from './components/did-modal/did-modal.component';
import { PackageModalComponent } from './components/package-modal/package-modal.component';
import { ProductModalComponent } from './components/product-modal/product-modal.component';
import { CreditModalComponent } from './components/credit-modal/credit-modal.component';
import { PaymentModalComponent } from './components/payment-modal/payment-modal.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTreeModule } from '@angular/material/tree';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoreModule } from '../../_metronic/core';
import { GeneralModule } from '../../_metronic/partials/content/general/general.module';
import {
  MatBottomSheetModule,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  MatRippleModule,
  MatNativeDateModule,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    ForgotPasswordComponent,
    AuthComponent,
    SubjectComponent,
    ResidentialComponent,
    BusinessComponent,
    DidModalComponent,
    PackageModalComponent,
    ProductModalComponent,
    CreditModalComponent,
    PaymentModalComponent
  ],
  imports: [
    CommonModule,
    TranslationModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // material modules
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatListModule,
    MatSliderModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTabsModule,
    MatTooltipModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTableModule,
    MatGridListModule,
    MatToolbarModule,
    MatBottomSheetModule,
    MatExpansionModule,
    MatDividerModule,
    MatSortModule,
    MatStepperModule,
    MatChipsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatRippleModule,
    CoreModule,
    MatRadioModule,
    MatTreeModule,
    MatButtonToggleModule,
    GeneralModule
  ]
})
export class AuthModule {}
