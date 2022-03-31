import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ConfirmDeleteDialogComponent } from './components/confirm-delete-dialog/confirm-delete-dialog.component';

@NgModule({
    declarations: [ConfirmDeleteDialogComponent],
    exports: [ConfirmDeleteDialogComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        FontAwesomeModule
    ]
})
export class DialogModule { }
