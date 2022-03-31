import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Page } from '../../../../../test/helpers/page.helper';
import { MockModule } from 'ng-mocks';

import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';

describe('ConfirmDeleteDialogComponent', () => {
    let component: ConfirmDeleteDialogComponent;
    let closeSpy: jasmine.Spy;
    let dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>;
    let fixture: ComponentFixture<ConfirmDeleteDialogComponent>;
    let page: Page<ConfirmDeleteDialogComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ ConfirmDeleteDialogComponent],
            imports: [
                NoopAnimationsModule,
                MatDialogModule,
                MockModule(FontAwesomeModule)
            ],
            providers: [
                { provide: MatDialogRef, useValue: { close: (dialogResult: any) => { } }},
                { provide: MAT_DIALOG_DATA, useValue: {} }
            ]
        });

        dialogRef = TestBed.inject(MatDialogRef);
        closeSpy = spyOn(dialogRef, 'close');
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmDeleteDialogComponent);
        component = fixture.componentInstance;
        component.title = 'Delete';
        component.content = 'Are you sure you want to delete?';
        fixture.detectChanges();
        page = new Page(fixture);
    });

    it('should close dialog without any data when cancel button clicked', () => {
        // given: the cancel button
        const button: HTMLElement = page.query('.marker-action-cancel');
        
        // when: the button is clicked
        button.click();
        fixture.detectChanges();

        // then: the dialogData should not be defined
        expect(closeSpy).toHaveBeenCalledWith();
    });

    it('should close dialog with true when delete button clicked', () => {
        // given: the delete button
        const button: HTMLElement = page.query('.marker-action-delete');
        
        // when: the button is clicked
        button.click();
        fixture.detectChanges();

        // then: the dialogData should be true
        expect(closeSpy).toHaveBeenCalledWith(true);
    });
});
