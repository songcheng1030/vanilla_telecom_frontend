// tslint:disable:no-string-literal
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../_services';
import { PackageService } from '../_services';
import { catchError, finalize, first, tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ArrangePackageGroup } from '../../../models/package-group.model'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss'],
})
export class PackageComponent implements OnInit{

  allChannels: ArrangePackageGroup[];
  private _unsubscribeAll: Subject<any>;
  
  constructor(
    public packageService: PackageService,
    private router: Router
  ) { 
    this._unsubscribeAll = new Subject(); 
  }

  // angular lifecircle hooks
  ngOnInit(): void {
    this.packageService.getAllChannels();
    
    this.packageService.onGetAllChannels
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(channels => {
        console.log('thsi is packageService', channels)
          if ( channels.length != 0 ){
            this.allChannels = channels;
          }
      }); 
  }

  // actions
  getOddBackColor(key: number) {
    if( key % 2 === 0 ){
      return "sub-back-blue";
    }
    return ""
  }
  goback(){
    this.router.navigate(['/admin/select']);  
  }
}
