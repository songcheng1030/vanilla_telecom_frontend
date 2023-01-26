import { Injectable, OnDestroy, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { TableService, TableResponseModel, ITableState, BaseModel, PaginatorState, SortState, GroupingState } from '../../../_metronic/shared/crud-table';
import { User } from '../../../models/user.model';
import { baseFilter } from '../../../_fake/fake-helpers/http-extenstions';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import 'rxjs/add/observable/of';
  
const DEFAULT_STATE: ITableState = {
  filter: {},
  paginator: new PaginatorState(),
  sorting: new SortState(),
  searchTerm: '',
  grouping: new GroupingState(),
  entityId: undefined
};

@Injectable({
  providedIn: 'root'
})
export class CustomersService extends TableService<User> implements OnDestroy {
  API_URL = `${environment.apiUrl}/customers`;
  baseUrl = `${environment.baseUrl}`;

  constructor(@Inject(HttpClient) http) {
    super(http);
  }

  // READ
  find(tableState: ITableState): Observable<TableResponseModel<User>> {
    return this.http.get<User[]>(this.baseUrl+'/AdminUser').pipe(
      map((response: User[]) => {
        const filteredResult = baseFilter(response, tableState);
        const result: TableResponseModel<User> = {
          items: filteredResult.items,
          total: filteredResult.total
        };
        return result;
      })
    );
  }

  deleteItems(ids: number[] = []): Observable<any> {
    const tasks$ = [];
    ids.forEach(id => {
      tasks$.push(this.delete(id));
    });
    return forkJoin(tasks$);
  }

  updateStatusForItems(ids: number[], status: number): Observable<any> {
    return this.http.get<User[]>(this.API_URL).pipe(
      map((customers: User[]) => {
        return customers.filter(c => ids.indexOf(c.id) > -1).map(c => {
          c.status = status;
          return c;
        });
      }),
      exhaustMap((customers: User[]) => {
        const tasks$ = [];
        customers.forEach(customer => {
          tasks$.push(this.update(customer));
        });
        return forkJoin(tasks$);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
