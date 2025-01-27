/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { MatButtonModule } from '@angular/material/button';
import {
    MatDialogModule,
    MatDialogRef,
    MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { sandboxOf } from 'angular-playground';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';

// TODO figure out "right" way to sandbox dialog component
export default sandboxOf(ConfirmDeleteDialogComponent, {
    imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatDialogModule,
        FontAwesomeModule
    ],
    providers: [
        {
            provide: MatDialogRef,
            useValue: { close: (dialogResult: any) => {} }
        },
        {
            provide: MAT_DIALOG_DATA,
            useValue: {
                title: 'Delete Thing',
                content: 'Are you sure you want to delete the thing?'
            }
        }
    ]
}).add('default', {
    template: `<ngx-mat-confirm-delete-dialog></ngx-mat-confirm-delete-dialog>`
});
