import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { LayoutService } from '../../../_metronic/core/';
import KTLayoutExamples from '../../../../assets/js/layout/extended/examples';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NgbModal,
  NgbActiveModal,
  ModalDismissReasons,
  NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap';
import { CreditModalComponent } from '../components/credit-modal/credit-modal.component'
import { ActivatedRoute, Router } from '@angular/router';
import { DidModalComponent } from '../components/did-modal/did-modal.component';
import { FileService } from '../_services/file.service';
import { BusinessModel } from '../../../models/business.model';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
})
export class BusinessComponent implements OnInit {
  
  formGroup: FormGroup;
  model: any;
  loginForm: FormGroup;
  business: BusinessModel;
  phoneState = '';

  @ViewChild('form', { static: true }) form: NgForm;
  activeTabId = 1;
  constructor(
    private fb: FormBuilder,
    private layout: LayoutService, 
    private modalService: NgbModal,
    private router: Router,
    private fileService: FileService,
    private el: ElementRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.model = this.layout.getConfig();
    this.loadForm();
  }

  loadForm() {
    this.formGroup = this.fb.group({
      companyName: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      installationAddress1: ['', Validators.required],
      installationAddress2: [''],
      postcode: ['', Validators.required],
      passport: ['', Validators.required],
      contactNumber: ['', Validators.required],
      companyEntity: ['', Validators.required],
      cReg: ['', Validators.required],
      vatNo: ['', Validators.required],
      invoiceEmail: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      attachFile: ['', Validators.required],
      selectedPhoneState: ['',  Validators.required]
    });
  }

  next() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      return;
    }

    this.business = new BusinessModel;

    this.business.companyName = this.formGroup.value.companyName
    this.business.email = this.formGroup.value.email
    this.business.billingAddress1 = this.formGroup.value.address1
    this.business.billingAddress2 = this.formGroup.value.address2
    this.business.postcode = this.formGroup.value.postcode
    this.business.passport = this.formGroup.value.passport
    this.business.contactNumber = this.formGroup.value.contactNumber
    this.business.installationAddress = this.formGroup.value.installationAddress
    this.business.companyEntity = this.formGroup.value.companyEntity
    this.business.vatNo = this.formGroup.value.vatNo
    this.business.companyRegCertificate = this.formGroup.value.cReg
    this.business.invoiceEmail = this.formGroup.value.invoiceEmail
    this.business.phoneNumber = this.formGroup.value.phoneNumber
    this.business.certificateFile = this.model.uploadFileName

    this.authService.onBusiness.next(this.business);
    const modalRef = this.modalService.open(DidModalComponent, { size: 'md' });
  }

  requestCredit(): void {
    const modalRef = this.modalService.open(CreditModalComponent, { size: 'md' });
  }

  goback(): void{
    this.router.navigate(['/']);  
  }

  changedAvatarFile(file: any): void{
    this.model.originalFileName = file[0].name;
    this.fileService.uploadFile(file).then((res)=>{  
      this.model.uploadFileName = res;
    });
  }

  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }

  changePhoneState() {
    console.log('this is  this.phoneState',  this.phoneState,  this.formGroup.value.selectedPhoneState)
    this.phoneState = this.formGroup.value.selectedPhoneState;
  }
}
