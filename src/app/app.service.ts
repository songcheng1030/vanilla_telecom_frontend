import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';
import { BehaviorSubject, Observable } from 'rxjs';

import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn:  'root'
})
export class AppService {
    public httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'}) };

    // Private
    private _unsubscribeAll: Subject<any>;
    constructor(
        private _router: Router
    ) {
        // Set the default
    }
}
