import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksPagedListComponent } from './tasks-paged-list.component';

describe('TasksPagedListComponent', () => {
    let component: TasksPagedListComponent;
    let fixture: ComponentFixture<TasksPagedListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TasksPagedListComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TasksPagedListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
