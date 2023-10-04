import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteTaskDialogComponent } from './complete-task-dialog.component';

describe('CompleteTaskDialogComponent', () => {
    let component: CompleteTaskDialogComponent;
    let fixture: ComponentFixture<CompleteTaskDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CompleteTaskDialogComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CompleteTaskDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
