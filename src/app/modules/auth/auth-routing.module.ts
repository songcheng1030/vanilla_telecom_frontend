import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './auth.component';
import {SubjectComponent} from './subject/subject.component';
import {ResidentialComponent} from './residential/residential.component';
import {BusinessComponent} from './business/business.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';


const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'subject',
        pathMatch: 'full'
      },
      {
        path: 'subject',
        component: SubjectComponent,
        data: {returnUrl: window.location.pathname}                     
      },
      {
        path: 'residential',
        component: ResidentialComponent,
        data: {returnUrl: window.location.pathname}
      },
      {
        path: 'business',
        component: BusinessComponent,
        data: {returnUrl: window.location.pathname}
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {path: '', redirectTo: 'subject', pathMatch: 'full'},
      {path: '**', redirectTo: 'subject', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule {}
