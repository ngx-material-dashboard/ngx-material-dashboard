/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SidenavUtilService {
    /** Tracks the state of the sidenav menu (Collapse or Expand). */
    protected sidenavMenuChanges$ = new Subject<boolean>();
    /** Observale for changes to the sidenav. */
    readonly sidenavMenuChanges: Observable<boolean> = this.sidenavMenuChanges$;

    /**
     * Updates the sidenav menu state.
     *
     * @param event The state to set the sidenav menu to.
     */
    toggleSidenavMenu(event: boolean) {
        this.sidenavMenuChanges$.next(event);
    }
}
