/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
// import { AuthService } from '@app-core/services/auth.service';

@Component({
    selector: 'ngx-mat-header-user-menu',
    templateUrl: './header-user-menu.component.html',
    styleUrls: ['./header-user-menu.component.scss']
})
export class HeaderUserMenuComponent {
    @Input() username = '';
    @Output() logoutClick: EventEmitter<boolean> = new EventEmitter();
    caretDown = faCaretDown;

    logout(): void {
        this.logoutClick.emit(true);
    }
}
