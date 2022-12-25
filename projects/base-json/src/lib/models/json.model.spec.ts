import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { parseISO } from 'date-fns';

import { Datastore } from '@ngx-material-dashboard/base-json/test/services/datastore.service';
import { Task } from '@ngx-material-dashboard/base-json/test/models/task.model';
import { TASK_DUE_DATE } from '@ngx-material-dashboard/base-json/test/fixtures/task.fixture';
import { NestedAttribute } from '../decorators/nested-attribute.decorator';
import { JsonModelConverter } from '../converters/json-model/json-model.converter';
import { JsonApiModelConfig } from '../decorators/json-api-model-config.decorator';

@JsonApiModelConfig({
    type: 'nested-tasks'
})
class NestedTask extends Task {
    @NestedAttribute({ converter: new JsonModelConverter(Task) })
    nestedTask?: Task;
}

describe('JsonModel', () => {
    let datastore: Datastore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
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
                name: 'A task',
                dueDate: new Date(2022, 4, 4)
            };
            const task: Task = new Task(datastore, DATA);
            expect(task).toBeDefined();
            expect(task.id).toBe('1');
            expect(task.name).toBe('A task');
            if (task.dueDate) {
                expect(task.dueDate.toUTCString()).toBe(
                    parseISO(TASK_DUE_DATE).toUTCString()
                );
            }
        });

        it('should be instantiated without attributes', () => {
            const task: Task = new Task(datastore);
            expect(task).toBeDefined();
            expect(task.id).toBeUndefined();
            expect(task.dueDate).toBeUndefined();
        });

        it('should be instantiated with nested attribute', () => {
            const nestedTask: Task = new Task(datastore, {
                name: 'Nested Task'
            });
            const DATA = {
                id: '1',
                name: 'A task',
                nestedTask: nestedTask
            };
            const task: NestedTask = new NestedTask(datastore, DATA);

            expect(task.name).toBeDefined();
            expect(task.nestedTask).toBeDefined();
        });
    });

    describe('hasDirtyAttributes', () => {
        it('should be instantiated with attributes', () => {
            const DATA = {
                id: '1',
                name: 'Test Dirty Attributes',
                description: 'Add unit tests for hasDirtyAttributes',
                isComplete: false
            };
            const task: Task = new Task(datastore, DATA);
            expect(task.hasDirtyAttributes).toBeFalsy();
        });

        it('should have dirty attributes after change', () => {
            const task: Task = new Task(datastore, {
                id: '1',
                isComplete: false
            });
            expect(task.hasDirtyAttributes).toBeFalsy();
            task.name = 'Test Dirty Attributes Updated';
            expect(task.hasDirtyAttributes).toBeTruthy();
        });

        it('should reset dirty attributes', () => {
            const DATA = {
                id: '1',
                name: 'Test Dirty Attributes',
                description: 'Add unit tests for hasDirtyAttributes'
            };
            const task: Task = new Task(datastore, DATA);
            task.name = 'Test rollback attributes';
            task.rollbackAttributes();
            expect(task.hasDirtyAttributes).toBeFalsy();
            expect(task.name).toContain(DATA.name);
        });
    });
});
