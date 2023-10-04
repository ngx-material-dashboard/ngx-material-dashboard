import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksPagedTableComponent } from './tasks-paged-table.component';

describe('TasksPagedTableComponent', () => {
    let component: TasksPagedTableComponent;
    let fixture: ComponentFixture<TasksPagedTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TasksPagedTableComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TasksPagedTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
