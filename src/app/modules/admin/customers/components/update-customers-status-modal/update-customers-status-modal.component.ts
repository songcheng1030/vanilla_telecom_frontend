import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, delay, finalize, first, tap } from 'rxjs/operators';
import { User } from '../../../../../models/user.model';
import { CustomersService } from '../../../_services';

@Component({
  selector: 'app-update-customers-status-modal',
  templateUrl: './update-customers-status-modal.component.html',
  styleUrls: ['./update-customers-status-modal.component.scss']
})
export class UpdateCustomersStatusModalComponent implements OnInit, OnDestroy {
  @Input() ids: number[];
  status = 2;
  users: User[] = [];
  isLoading = false;
  subscriptions: Subscription[] = [];

  constructor(private customersService: CustomersService, public modal: NgbActiveModal) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    const sb = this.customersService.items$.pipe(
      first()
    ).subscribe((res: User[]) => {
      this.users = res.filter(c => this.ids.indexOf(c.id) > -1);
    });
    this.subscriptions.push(sb);
  }

  updateCustomersStatus() {
    this.isLoading = true;
    const sb = this.customersService.updateStatusForItems(this.ids, +this.status).pipe(
      delay(1000), // Remove it from your code (just for showing loading)
      tap(() => this.modal.close()),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(undefined);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe();
    this.subscriptions.push(sb);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
