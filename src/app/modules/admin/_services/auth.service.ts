import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { User } from '../../../models/user.model';
import { ResidentialModel } from '../../../models/residential.model';
import { BusinessModel } from '../../../models/business.model';
import { AuthModel } from '../../../models/auth.model';
import { AuthHTTPService } from './auth-http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AdminService } from '../_services/admin.service'
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private authLocalStoragetoken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  // public fields
  currentUser$: Observable<User>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<User>;
  isLoadingSubject: BehaviorSubject<boolean>;


  get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: User) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private authHttpService: AuthHTTPService,
    private adminService: AdminService,
    private router: Router
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<User>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserBytoken().subscribe();
    this.unsubscribe.push(subscr);
  }

  // public methods
  login(email: string, password: string): Observable<User> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.login(email, password).pipe(
      map((auth: AuthModel) => {
        console.log('this is login', auth);
        const result = this.setAuthFromLocalStorage(auth);
        return result;
      }),
      switchMap(() => this.getUserBytoken()),
      catchError((err) => {
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  logout() {
    localStorage.removeItem(this.authLocalStoragetoken);
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  getUserBytoken(): Observable<User> {
    const auth = this.adminService.getAuthFromLocalStorage();
    if (!auth || !auth.access_token) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.authHttpService.getUserByToken(auth.access_token).pipe(
      map((user: User) => {
        if (user) {
          this.currentUserSubject = new BehaviorSubject<User>(user);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  // need create new residential then login
  registrationResidential(residentialUser: ResidentialModel): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.createResidential(residentialUser).pipe(
      map(() => {
        this.isLoadingSubject.next(false);
      }),
      // switchMap(() => this.login(residentialUser.email, residentialUser.password)),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

   // need create new business then login
  registrationBusiness(businessUser: BusinessModel): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.createBusiness(businessUser).pipe(
      map(() => {
        this.isLoadingSubject.next(false);
      }),
      // switchMap(() => this.login(residentialUser.email, residentialUser.password)),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  // private methods
  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth accesstoken/refreshtoken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.access_token) {
      localStorage.setItem(this.authLocalStoragetoken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  // private getAuthFromLocalStorage(): AuthModel {
  //   try {
  //     const authData = JSON.parse(
  //       localStorage.getItem(this.authLocalStoragetoken)
  //     );
  //     return authData;
  //   } catch (error) {
  //     console.error(error);
  //     return undefined;
  //   }
  // }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
