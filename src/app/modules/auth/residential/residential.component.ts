import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { LayoutService } from '../../../_metronic/core/';
import { Subscription, Observable } from 'rxjs';
import { FileService } from '../_services/file.service';
import { Router } from '@angular/router';
import KTLayoutExamples from '../../../../assets/js/layout/extended/examples';
import { ResidentialModel } from '../../../models/residential.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { DidModalComponent } from '../components/did-modal/did-modal.component';
import { AuthService } from '../_services/auth.service';
import {
  NgbModal,
  NgbActiveModal,
  ModalDismissReasons,
  NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-residential',
  templateUrl: './residential.component.html',
  styleUrls: ['./residential.component.scss'],
})
export class ResidentialComponent implements OnInit, AfterViewInit {

  formGroup: FormGroup;
  residential: ResidentialModel
  model: any;
  hasError: boolean;
  closeResult: string;

  isLoading$: Observable<boolean>;

  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  @ViewChild('form', { static: true }) form: NgForm;
  activeTabId = 1;
  constructor(
    private fb: FormBuilder,
    private layout: LayoutService, 
    private el: ElementRef,
    private router: Router,
    private modalService: NgbModal,
    private fileService: FileService,
    private authService: AuthService
  ) {
    // redirect to home if already logged in
  }

  ngOnInit(): void {
    this.model = this.layout.getConfig();
    this.loadForm();
  }

  loadForm() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      postcode: ['', Validators.required],
      passport: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      attachFile: ['', Validators.required]
    });
  }

  changedAvatarFile(file: any): void{
    this.model.originalFileName = file[0].name;
    this.fileService.uploadFile(file).then((res)=>{  
      this.model.uploadFileName = res;
    });
  }

  get f() {
    return this.formGroup.controls;
  }

  setActiveTab(tabId: number) {
    this.activeTabId = tabId;
  }

  getActiveTabCSSClass(tabId: number) {
    if (tabId !== this.activeTabId) {
      return '';
    }
    return 'active';
  }

  ngAfterViewInit() {
    const elements = this.el.nativeElement.querySelectorAll('.example');
    KTLayoutExamples.init(elements);
  }

  next() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      return;
    }
    this.residential = new ResidentialModel;
    this.residential.name = this.formGroup.value.name;
    this.residential.email = this.formGroup.value.email;
    this.residential.address1 = this.formGroup.value.address1;
    this.residential.address2 =  this.formGroup.value.address2;
    this.residential.postcode = this.formGroup.value.postcode;
    this.residential.passport = this.formGroup.value.passport;
    this.residential.contactNumber = this.formGroup.value.contactNumber;
    this.residential.identityCard = this.model.uploadFileName;

    this.authService.onResidential.next(this.residential);

    const modalRef = this.modalService.open(DidModalComponent, { size: 'md' });
  }

  goback(): void{
    this.router.navigate(['/']);  
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
}
