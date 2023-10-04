import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSearchFormComponent } from './task-search-form.component';

describe('TaskSearchFormComponent', () => {
    let component: TaskSearchFormComponent;
    let fixture: ComponentFixture<TaskSearchFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TaskSearchFormComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskSearchFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
