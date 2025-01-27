/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { sandboxOf } from 'angular-playground';
import { IconButtonsWithPaginatorComponent } from './icon-buttons-with-paginator.component';
import { IconButtonsComponent } from '../../components/icon-buttons/icon-buttons.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SorterComponent } from '../sorter/sorter.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    CREATE_TOOLBAR_BUTTON,
    DELETE_TOOLBAR_BUTTON,
    EDIT_TOOLBAR_BUTTON
} from '../../shared/toolbar-buttons';

export default sandboxOf(IconButtonsWithPaginatorComponent, {
    declarations: [IconButtonsComponent, SorterComponent],
    imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatSelectModule,
        FontAwesomeModule
    ]
})
    .add('default with no page data', {
        template: `<ngx-mat-icon-buttons-with-paginator>
        </ngx-mat-icon-buttons-with-paginator>`
    })
    .add('default with page data', {
        template: `<ngx-mat-icon-buttons-with-paginator [length]="length">
        </ngx-mat-icon-buttons-with-paginator>`,
        context: {
            length: 25
        }
    })
    .add('hide all the things...', {
        template: `<ngx-mat-icon-buttons-with-paginator
            [displaySelectAll]="displaySelectAll"
            [displaySort]="displaySort"
            [hidePageSize]="hidePageSize"
            [length]="length"
            [rangeLabelPrefix]="rangeLabelPrefix"
            [showFirstLastButtons]="showFirstLastButtons"
            [buttons]="buttons">
        </ngx-mat-icon-buttons-with-paginator>`,
        context: {
            buttons: [
                CREATE_TOOLBAR_BUTTON,
                EDIT_TOOLBAR_BUTTON,
                DELETE_TOOLBAR_BUTTON
            ],
            displaySelectAll: false,
            displaySort: false,
            hidePageSize: true,
            length: 25,
            showFirstLastButtons: false
        }
    });
