import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { parseISO } from 'date-fns';

import { Datastore } from '@ngx-material-dashboard/base-json/test/services/datastore.service';
import { Task } from '@ngx-material-dashboard/base-json/test/models/task.model';
import { TASK_DUE_DATE } from '@ngx-material-dashboard/base-json/test/fixtures/task.fixture';

describe('JsonModel', () => {

    let datastore: Datastore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                {
                    provide: Datastore,
                    deps: [HttpClient]
                }
            ]
        });

        datastore = TestBed.inject(Datastore);
    });

    describe('constructor', () => {

        it('should be instantiated with attributes', () => {
            const DATA = {
                id: '1',
                name: 'Daniele',
                dueDate: new Date(2022, 4, 4)
            };
            const task: Task = new Task(datastore, DATA);
            expect(task).toBeDefined();
            expect(task.id).toBe('1');
            expect(task.name).toBe('Daniele');
            if (task.dueDate) {
                expect(task.dueDate.toUTCString()).toBe(parseISO(TASK_DUE_DATE).toUTCString());
            }
        });

        it('should be instantiated without attributes', () => {
            const task: Task = new Task(datastore);
            expect(task).toBeDefined();
            expect(task.id).toBeUndefined();
            expect(task.dueDate).toBeUndefined();
        });

    });
});
