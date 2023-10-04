import 'mocha';

import * as moment from 'moment';

import { SuperTest, Test } from 'supertest';

import { getTestApp } from '../../test/server';

import { Task } from '../entity/task';
import { TaskService as Tasks } from '../services/task.service';

import { TASKS } from '../../test/seed/tasks';
import { TasksHelper } from '../../test/util/tasks-helper';

describe('Tasks API', () => {
    let app: SuperTest<Test>;
    let tasksHelper: TasksHelper;
    const today = moment().utc();
    const tomorrow = moment().utc().add(1, 'days');

    before((done) => {
        tasksHelper = new TasksHelper(TASKS);
        getTestApp()
            .then((a) => {
                app = a;
                done();
            })
            .catch(done);
    });

    // Test listing Tasks
    describe('GET /api/tasks - List/Filter Tasks', () => {
        before(async () => {
            for (let i: number = 0; i < TASKS.length; i++) {
                let task: Task = await Tasks.save(TASKS[i]);
                if (TASKS[i].dateCompleted != null) {
                    task = await Tasks.complete(task.id, TASKS[i]);
                }
            }
        });

        after((done) => {
            Tasks.deleteAll()
                .then(() => done())
                .catch(done);
        });

        describe('Pending Tasks', () => {
            it('should return all pending Tasks when no isComplete parameter included', (done) => {
                app.get('/api/tasks')
                    .expect((res) => {
                        if (!res.body.data)
                            throw new Error('API: Expected data in response');
                        if (
                            res.body.data.length !=
                            tasksHelper.pendingTasks.length
                        )
                            throw new Error(
                                `API: Expected ${res.body.data.length} Tasks in response to be ${tasksHelper.pendingTasks.length}`
                            );
                    })
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            });

            it('should return all pending Tasks when isComplete=false', (done) => {
                app.get('/api/tasks?isComplete=false')
                    .expect((res) => {
                        if (!res.body.data)
                            throw new Error('API: Expected data in response');
                        if (
                            res.body.data.length !=
                            tasksHelper.pendingTasks.length
                        )
                            throw new Error(
                                `API: Expected ${res.body.data.length} Tasks in response to be ${tasksHelper.pendingTasks.length}`
                            );
                    })
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            });

            it('should filter pending Tasks by default when no isComplete parameter included and filter="overDue"', (done) => {
                app.get('/api/tasks?filter=overDue')
                    .expect((res) => {
                        if (!res.body.data)
                            throw new Error('API: Expected data in response');
                        if (
                            res.body.data.length !=
                            tasksHelper.tasksOverDue.length
                        )
                            throw new Error(
                                `API: Expected ${res.body.data.length} Tasks in response to be ${tasksHelper.tasksOverDue.length}`
                            );
                    })
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            });

            it('should filter pending Tasks by default when no isComplete parameter included and filter="TypeORM"', (done) => {
                app.get('/api/tasks?filter=TypeORM')
                    .expect((res) => {
                        if (!res.body.data)
                            throw new Error('API: Expected data in response');
                        if (
                            res.body.data.length !=
                            tasksHelper.filterTasks(false, 'TypeORM').length
                        )
                            throw new Error(
                                `API: Expected ${
                                    res.body.data.length
                                } Tasks in response to be ${
                                    tasksHelper.filterTasks(false, 'TypeORM')
                                        .length
                                }`
                            );
                    })
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            });

            it('should filter pending Tasks by default when no isComplete parameter included and ignore case for name/description fields when filter="typeorm"', (done) => {
                app.get('/api/tasks?filter=typeorm')
                    .expect((res) => {
                        if (!res.body.data)
                            throw new Error('API: Expected data in response');
                        if (
                            res.body.data.length !=
                            tasksHelper.filterTasks(false, 'typeorm').length
                        )
                            throw new Error(
                                `API: Expected ${
                                    res.body.data.length
                                } Tasks in response to be ${
                                    tasksHelper.filterTasks(false, 'typeorm')
                                        .length
                                }`
                            );
                    })
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            });

            it(`should filter pending Tasks by default when no isComplete parameter included and filter="${today.format(
                'MM/DD/YYYY'
            )}"`, (done) => {
                app.get(`/api/tasks?filter=${today.format('MM/DD/YYYY')}`)
                    .expect((res) => {
                        if (!res.body.data)
                            throw new Error('API: Expected data in response');
                        if (
                            res.body.data.length !=
                            tasksHelper.filterTasks(
                                false,
                                today.format('MM/DD/YYYY')
                            ).length
                        )
                            throw new Error(
                                `API: Expected ${
                                    res.body.data.length
                                } Tasks in response to be ${
                                    tasksHelper.filterTasks(
                                        false,
                                        today.format('MM/DD/YYYY')
                                    ).length
                                }`
                            );
                    })
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            });
        });

        describe('Complete Tasks', () => {
            it('should return all complete Tasks when isComplete=true', (done) => {
                app.get('/api/tasks?isComplete=true')
                    .expect((res) => {
                        if (!res.body.data)
                            throw new Error('API: Expected data in response');
                        if (
                            res.body.data.length !=
                            tasksHelper.completeTasks.length
                        )
                            throw new Error(
                                `API: Expected ${res.body.data.length} Tasks in response to be ${tasksHelper.completeTasks.length}`
                            );
                    })
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            });

            it('should return 0 Tasks when isComplete=true and filter="overDue"', (done) => {
                app.get('/api/tasks?isComplete=true&filter=overDue')
                    .expect((res) => {
                        if (!res.body.data)
                            throw new Error('API: Expected data in response');
                        if (res.body.data.length != 0)
                            throw new Error(
                                `API: Expected ${
                                    res.body.data.length
                                } Tasks in response to be ${0}`
                            );
                    })
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            });

            it('should filter complete Tasks when isComplete=true and filter="Server"', (done) => {
                app.get('/api/tasks?isComplete=true&filter=Server')
                    .expect((res) => {
                        if (!res.body.data)
                            throw new Error('API: Expected data in response');
                        if (
                            res.body.data.length !=
                            tasksHelper.filterTasks(true, 'Server').length
                        )
                            throw new Error(
                                `API: Expected ${
                                    res.body.data.length
                                } Tasks in response to be ${
                                    tasksHelper.filterTasks(true, 'Server')
                                        .length
                                }`
                            );
                    })
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            });

            it('should filter complete Tasks when isComplete=true and ignore case for name/description fields when filter="server"', (done) => {
                app.get('/api/tasks?isComplete=true&filter=server')
                    .expect((res) => {
                        if (!res.body.data)
                            throw new Error('API: Expected data in response');
                        if (
                            res.body.data.length !=
                            tasksHelper.filterTasks(true, 'server').length
                        )
                            throw new Error(
                                `API: Expected ${
                                    res.body.data.length
                                } Tasks in response to be ${
                                    tasksHelper.filterTasks(true, 'server')
                                        .length
                                }`
                            );
                    })
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            });

            it(`should filter complete Tasks when isComplete=true and filter="${today.format(
                'MM/DD/YYYY'
            )}"`, (done) => {
                app.get(
                    `/api/tasks?isComplete=true&filter=${today.format(
                        'MM/DD/YYYY'
                    )}`
                )
                    .expect((res) => {
                        if (!res.body.data)
                            throw new Error('API: Expected data in response');
                        if (
                            res.body.data.length !=
                            tasksHelper.filterTasks(
                                true,
                                today.format('MM/DD/YYYY')
                            ).length
                        )
                            throw new Error(
                                `API: Expected ${
                                    res.body.data.length
                                } Tasks in response to be ${
                                    tasksHelper.filterTasks(
                                        true,
                                        today.format('MM/DD/YYYY')
                                    ).length
                                }`
                            );
                    })
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            });
        });
    });

    // Test creating Tasks
    describe('POST /api/tasks - Create Tasks', () => {
        // Task partial data to use when creating a valid Task
        const taskPartial: Partial<Task> = {
            name: 'Add Unit Test to Create Task',
            priority: 'High',
            description: 'Add unit test to create task through API',
            dueDate: today.format('YYYY-MM-DD')
        };

        // Cleanup any tasks created during tests
        after((done) => {
            Tasks.deleteAll()
                .then(() => done())
                .catch(done);
        });

        it('should fail with a 400 response if no properties are included in request', (done) => {
            app.post('/api/tasks')
                .send()
                .expect('Content-Type', /json/)
                .expect(
                    400,
                    {
                        error: {
                            message:
                                'Task requires name, priority, description, and due date'
                        }
                    },
                    done
                );
        });

        it('should fail with a 400 response if no name included in request', (done) => {
            app.post('/api/tasks')
                .send({
                    priority: 'High',
                    description: 'Add unit test to create task through API',
                    dueDate: today.format('YYYY-MM-DD')
                })
                .expect('Content-Type', /json/)
                .expect(
                    400,
                    { error: { message: 'Task requires name' } },
                    done
                );
        });

        it('should fail with a 400 response if no priority included in request', (done) => {
            app.post('/api/tasks')
                .send({
                    name: 'Add Unit Test to Create Task',
                    description: 'Add unit test to create task through API',
                    dueDate: today.format('YYYY-MM-DD')
                })
                .expect('Content-Type', /json/)
                .expect(
                    400,
                    { error: { message: 'Task requires priority' } },
                    done
                );
        });

        it('should fail with a 400 response if no description included in request', (done) => {
            app.post('/api/tasks')
                .send({
                    name: 'Add Unit Test to Create Task',
                    priority: 'High',
                    dueDate: today.format('YYYY-MM-DD')
                })
                .expect('Content-Type', /json/)
                .expect(
                    400,
                    { error: { message: 'Task requires description' } },
                    done
                );
        });

        it('should fail with a 400 response if no due date included in request', (done) => {
            app.post('/api/tasks')
                .send({
                    name: 'Add Unit Test to Create Task',
                    priority: 'High',
                    description: 'Add unit test to create task through API'
                })
                .expect('Content-Type', /json/)
                .expect(
                    400,
                    { error: { message: 'Task requires due date' } },
                    done
                );
        });

        it('should create and return a new Task when valid properties included in request', (done) => {
            // when: the '/api/tasks' route is hit with a POST
            app.post('/api/tasks')
                .send(taskPartial)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    // then: the API response should include the Task that was just created
                    if (!res.body)
                        throw new Error('API: Expected data in response');
                    if (!res.body.id)
                        throw new Error('API: Expected Task to have id');
                    if (!res.body.name)
                        throw new Error('API: Expected Task to have a name');
                    if (res.body.name !== taskPartial.name)
                        throw new Error(
                            `API: Expected Task name to be '${taskPartial.name}' but was '${res.body.name}'`
                        );
                })
                .then(async (res) => {
                    // and: the DB should contain the Task that was just created
                    const task = await Tasks.getById(res.body.id);
                    if (!task)
                        throw new Error('DB: Expected Task to exist in DB');
                    if (task.name !== taskPartial.name)
                        throw new Error(
                            `DB: Expected Task name to be '${taskPartial.name}' but was '${task.name}'`
                        );
                })
                .then(done, done);
        });
    });

    // Test deleting Tasks
    describe('DELETE /api/tasks/:id - Delete Tasks', () => {
        let completeTask: Task;
        let pendingTask: Task;

        before(async () => {
            completeTask = await Tasks.save({
                name: 'Add Unit Test to delete a complete Task',
                priority: 'Medium',
                description:
                    'Add unit test to delete a complete task through API',
                dueDate: today.format('YYYY-MM-DD')
            });
            completeTask = await Tasks.complete(completeTask.id, {
                dateCompleted: today.format('YYYY-MM-DD')
            });
            pendingTask = await Tasks.save({
                name: 'Add Unit Test to delete a pending Task',
                priority: 'Medium',
                description:
                    'Add unit test to delete a pending task through API',
                dueDate: today.format('YYYY-MM-DD')
            });
        });

        // Cleanup any tasks created during tests
        after((done) => {
            Tasks.deleteAll()
                .then(() => done())
                .catch(done);
        });

        it("should fail with a 404 response with an invalid 'id'", (done) => {
            app.delete('/api/tasks/9999')
                .expect('Content-Type', /json/)
                .expect(404, { error: { message: 'Not Found' } }, done);
        });

        it("should delete pending Task with 'id'", (done) => {
            app.delete(`/api/tasks/${pendingTask.id}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .then((res) => {
                    return Tasks.getById(pendingTask.id)
                        .then((_task) => {
                            throw new Error(
                                'DB: Expected record not to exist in DB'
                            );
                        })
                        .catch((e) => null);
                })
                .then(done, done);
        });

        it("should delete complete Task with 'id'", (done) => {
            app.delete(`/api/tasks/${completeTask.id}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .then((res) => {
                    return Tasks.getById(completeTask.id)
                        .then((_task) => {
                            throw new Error(
                                'DB: Expected record not to exist in DB'
                            );
                        })
                        .catch((e) => null);
                })
                .then(done, done);
        });
    });

    // Test getting Tasks
    describe('GET /api/tasks/:id - Get Tasks', () => {
        let completeTask: Task;
        let pendingTask: Task;

        before(async () => {
            completeTask = await Tasks.save({
                name: 'Add Unit Test to delete a complete Task',
                priority: 'Medium',
                description:
                    'Add unit test to delete a complete task through API',
                dueDate: today.format('YYYY-MM-DD')
            });
            completeTask = await Tasks.complete(completeTask.id, {
                dateCompleted: today.format('YYYY-MM-DD')
            });
            pendingTask = await Tasks.save({
                name: 'Add Unit Test to delete a pending Task',
                priority: 'Medium',
                description:
                    'Add unit test to delete a pending task through API',
                dueDate: today.format('YYYY-MM-DD')
            });
        });

        // Cleanup any tasks created during tests
        after((done) => {
            Tasks.deleteAll()
                .then(() => done())
                .catch(done);
        });

        it("should fail with a 404 response with an invalid 'id'", (done) => {
            app.get('/api/tasks/9999')
                .expect('Content-Type', /json/)
                .expect(404, { error: { message: 'Not Found' } }, done);
        });

        it("should return pending Task with 'id'", (done) => {
            app.get(`/api/tasks/${pendingTask.id}`)
                .expect('Content-Type', /json/)
                .expect(200, pendingTask, done);
        });

        it("should return complete Task with 'id'", (done) => {
            app.get(`/api/tasks/${completeTask.id}`)
                .expect('Content-Type', /json/)
                .expect(200, completeTask, done);
        });
    });

    // Test updating Tasks (non-repeating)
    describe('PATCH /api/tasks/:id - Update Tasks (non-repeating)', () => {
        let task: Task;
        const taskUpdateProperties: Partial<Task> = {
            name: 'Add Unit Test to Update Task',
            priority: 'High',
            description:
                'Update description for unit test to update task through API',
            dueDate: tomorrow.format('YYYY-MM-DD')
        };
        const updateProperties: any = {
            meta: {
                transition: 'update'
            },
            data: {
                properties: taskUpdateProperties
            }
        };

        // Add a Task to update in the tests
        before((done) => {
            Tasks.save({
                name: 'Add Unit Test to Update Task',
                priority: 'Medium',
                description: 'Add unit test to update task through API',
                dueDate: today.format('YYYY-MM-DD')
            })
                .then((_task: Task) => {
                    task = _task;
                    done();
                })
                .catch(done);
        });

        // Cleanup any tasks created during tests
        after((done) => {
            Tasks.deleteAll()
                .then(() => done())
                .catch(done);
        });

        it("should fail with a 404 response with an invalid 'id'", (done) => {
            // when: a patch request is made with a valid id
            app.patch('/api/tasks/9999')
                .send(updateProperties)
                .expect('Content-Type', /json/)
                .expect(404, { error: { message: 'Not Found' } }, done);
        });

        it("should fail with a 400 response with a valid 'id' but no properties included in request", (done) => {
            // when: a patch request is made with a valid id
            app.patch(`/api/tasks/${task.id}`)
                .send()
                .expect('Content-Type', /json/)
                .expect(
                    400,
                    {
                        error: {
                            message:
                                'Task requires name, priority, description, and due date'
                        }
                    },
                    done
                );
        });

        it("should update task with a valid 'id' and valid properties", (done) => {
            // when: a patch request is made with a valid id
            app.patch(`/api/tasks/${task.id}`)
                .send(updateProperties)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    // then: the API response should include the Task that was updated
                    if (!res.body)
                        throw new Error('API: Expected data in response');
                    if (!res.body.id)
                        throw new Error('API: Expected Task to have id');
                    if (!res.body.name)
                        throw new Error('API: Expected Task to have name');
                    if (res.body.name !== taskUpdateProperties.name)
                        throw new Error(
                            `API: Expected Task name to be ${taskUpdateProperties.name} but was ${res.body.name}`
                        );
                    if (!res.body.description)
                        throw new Error('API: Expected Task to have name');
                    if (
                        res.body.description !==
                        taskUpdateProperties.description
                    )
                        throw new Error(
                            `API: Expected Task description to be ${taskUpdateProperties.description} but was ${res.body.description}`
                        );
                })
                .then(async (res) => {
                    // and: the DB should contain the Task that was updated
                    const _task = await Tasks.getById(res.body.id);
                    if (!_task)
                        throw new Error('DB: Expected record to exist in DB');
                    if (_task.name !== taskUpdateProperties.name)
                        throw new Error(
                            `DB: Expected Task name to be ${taskUpdateProperties.name} but was ${_task.name}`
                        );
                    if (_task.description !== taskUpdateProperties.description)
                        throw new Error(
                            `DB: Expected Task description to be ${taskUpdateProperties.description} but was ${_task.description}`
                        );
                })
                .then(done, done);
        });
    });

    // Test updating Tasks (repeating)
    describe('PATCH /api/tasks/:id - Update Tasks (repeating)', () => {
        let task: Task;
        const taskUpdateProperties: Partial<Task> = {
            name: 'Add Unit Test to Update Task',
            priority: 'High',
            description:
                'Update description for unit test to update task through API',
            dueDate: tomorrow.format('YYYY-MM-DD'),
            repeats: 'daily',
            endsAfter: 5
        };
        const updateProperties: any = {
            meta: {
                transition: 'update'
            },
            data: {
                properties: taskUpdateProperties
            }
        };

        // Add a Task to update in the tests
        beforeEach((done) => {
            Tasks.save({
                name: 'Add Unit Test to Update Task',
                priority: 'Medium',
                description: 'Add unit test to update task through API',
                dueDate: today.format('YYYY-MM-DD'),
                repeats: 'daily',
                endsAfter: 5
            })
                .then((_task: Task) => {
                    task = _task;
                    done();
                })
                .catch(done);
        });

        // Cleanup any tasks created during tests
        afterEach((done) => {
            Tasks.deleteAll()
                .then(() => done())
                .catch(done);
        });

        it("should update task with a valid 'id' and valid properties", (done) => {
            // when: a patch request is made with a valid id
            app.patch(`/api/tasks/${task.id}`)
                .send(updateProperties)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    // then: the API response should include the Task that was updated
                    if (!res.body)
                        throw new Error('API: Expected data in response');
                    if (!res.body.id)
                        throw new Error('API: Expected Task to have id');
                    if (!res.body.name)
                        throw new Error('API: Expected Task to have name');
                    if (res.body.name !== taskUpdateProperties.name)
                        throw new Error(
                            `API: Expected Task name to be ${taskUpdateProperties.name} but was ${res.body.name}`
                        );
                    if (!res.body.description)
                        throw new Error('API: Expected Task to have name');
                    if (
                        res.body.description !==
                        taskUpdateProperties.description
                    )
                        throw new Error(
                            `API: Expected Task description to be ${taskUpdateProperties.description} but was ${res.body.description}`
                        );
                })
                .then(async (res) => {
                    // and: the DB should contain the Task that was updated
                    const _task = await Tasks.getById(res.body.id);
                    if (!_task)
                        throw new Error('DB: Expected record to exist in DB');
                    if (_task.name !== taskUpdateProperties.name)
                        throw new Error(
                            `DB: Expected Task name to be ${taskUpdateProperties.name} but was ${_task.name}`
                        );
                    if (_task.description !== taskUpdateProperties.description)
                        throw new Error(
                            `DB: Expected Task description to be ${taskUpdateProperties.description} but was ${_task.description}`
                        );
                    if (_task.repeats !== 'daily')
                        throw new Error('DB: Expected Task to repeat daily');

                    let nextId = _task.nextId;
                    while (nextId != null) {
                        const nextTask = await Tasks.getById(nextId);
                        if (nextTask.name != task.name)
                            throw new Error(
                                `DB: Expected repeating Task to have original name ${task.name} but was ${nextTask.name}`
                            );
                        nextId = nextTask.nextId;
                    }
                })
                .then(done, done);
        });

        it("should update task and all remaining Tasks in sequence with a valid 'id', valid properties, and updateAll=true", (done) => {
            // when: a patch request is made with a valid id and updateAll=true
            app.patch(`/api/tasks/${task.id}?updateAll=true`)
                .send(updateProperties)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    // then: the API response should include the Task that was updated
                    if (!res.body)
                        throw new Error('API: Expected data in response');
                    if (!res.body.id)
                        throw new Error('API: Expected Task to have id');
                    if (!res.body.name)
                        throw new Error('API: Expected Task to have name');
                    if (res.body.name !== taskUpdateProperties.name)
                        throw new Error(
                            `API: Expected Task name to be ${taskUpdateProperties.name} but was ${res.body.name}`
                        );
                    if (!res.body.description)
                        throw new Error('API: Expected Task to have name');
                    if (
                        res.body.description !==
                        taskUpdateProperties.description
                    )
                        throw new Error(
                            `API: Expected Task description to be ${taskUpdateProperties.description} but was ${res.body.description}`
                        );
                })
                .then(async (res) => {
                    // and: the DB should contain the Task that was updated
                    const _task = await Tasks.getById(res.body.id);
                    if (!_task)
                        throw new Error('DB: Expected record to exist in DB');
                    if (_task.name !== taskUpdateProperties.name)
                        throw new Error(
                            `DB: Expected Task name to be ${taskUpdateProperties.name} but was ${_task.name}`
                        );
                    if (_task.description !== taskUpdateProperties.description)
                        throw new Error(
                            `DB: Expected Task description to be ${taskUpdateProperties.description} but was ${_task.description}`
                        );
                    if (_task.repeats !== 'daily')
                        throw new Error('DB: Expected Task to repeat daily');

                    let nextId = _task.nextId;
                    while (nextId != null) {
                        const nextTask = await Tasks.getById(nextId);
                        if (nextTask.name != taskUpdateProperties.name)
                            throw new Error(
                                `DB: Expected repeating Task to have original name ${task.name} but was ${nextTask.name}`
                            );
                        nextId = nextTask.nextId;
                    }
                })
                .then(done, done);
        });
    });

    // Test updating Tasks with "complete transition"
    describe('PATCH /api/tasks/:id - Update Tasks with "complete" transition', () => {
        let task: Task;
        const updateProperties: Partial<Task> = {
            name: 'Add Unit Test to Update Task',
            priority: 'High',
            description:
                'Update description for unit test to update task through API',
            dueDate: tomorrow.format('YYYY-MM-DD')
        };

        // Add a Task to update in the tests
        beforeEach(async () => {
            task = await Tasks.save(updateProperties);
        });

        afterEach((done) => {
            Tasks.deleteAll()
                .then(() => done())
                .catch(done);
        });

        it("should fail with a 404 response with an invalid 'id'", (done) => {
            app.patch('/api/tasks/9999')
                .send({
                    meta: {
                        transition: 'complete'
                    },
                    data: {
                        properties: {
                            dateCompleted: today.format('YYYY-MM-DD')
                        }
                    }
                })
                .expect('Content-Type', /json/)
                .expect(404, { error: { message: 'Not Found' } }, done);
        });

        it('should fail with a 400 response with valid ids but no dateCompleted in properties', (done) => {
            app.patch(`/api/tasks/${task.id}`)
                .send({
                    meta: {
                        transition: 'complete'
                    },
                    data: {
                        properties: {}
                    }
                })
                .expect('Content-Type', /json/)
                .expect(
                    400,
                    {
                        error: {
                            message:
                                'Tasks must have valid date completed in format YYYY-MM-DD'
                        }
                    },
                    done
                );
        });

        it('should fail with a 400 response with valid ids but dateCompleted not a valid ISO date', (done) => {
            app.patch(`/api/tasks/${task.id}`)
                .send({
                    meta: {
                        transition: 'complete'
                    },
                    data: {
                        properties: {
                            dateCompleted: `I am not a valid date ${today.format(
                                'YYYY-MM-DD'
                            )}`
                        }
                    }
                })
                .expect('Content-Type', /json/)
                .expect(
                    400,
                    {
                        error: {
                            message:
                                'Tasks must have valid date completed in format YYYY-MM-DD'
                        }
                    },
                    done
                );
        });

        it('should complete task with the given "id"', (done) => {
            app.patch(`/api/tasks/${task.id}`)
                .send({
                    meta: {
                        transition: 'complete'
                    },
                    data: {
                        properties: {
                            dateCompleted: today.format('YYYY-MM-DD')
                        }
                    }
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .expect((res) => {
                    // then: the API response should include the Task that was completed
                    if (!res.body)
                        throw new Error('API: Expected data in response');
                    if (!res.body.id)
                        throw new Error('API: Expected Task to have id');
                    if (!res.body.name)
                        throw new Error('API: Expected Task to have name');
                    if (res.body.name !== task.name)
                        throw new Error(
                            `API: Expected Task name to be ${task.name} but was ${res.body.name}`
                        );
                    if (!res.body.description)
                        throw new Error('API: Expected Task to have name');
                    if (res.body.description !== task.description)
                        throw new Error(
                            `API: Expected Task description to be ${task.description} but was ${res.body.description}`
                        );
                    if (!res.body.dateCompleted)
                        throw new Error('API: Expected Task to have name');
                    if (res.body.dateCompleted !== today.format('YYYY-MM-DD'))
                        throw new Error(
                            `API: Expected Task description to be ${task.dateCompleted} but was ${res.body.dateCompleted}`
                        );
                    if (!res.body.isComplete)
                        throw new Error(
                            'API: Expected Task to have isComplete'
                        );
                    if (res.body.isComplete !== true)
                        throw new Error(
                            'API: Expected Task to have isComplete=true'
                        );
                })
                .then(async (res) => {
                    // and: the Task should be marked complete in the DB
                    const _task = await Tasks.getById(res.body.id);
                    if (!_task)
                        throw new Error('DB: Expected record to exist in DB');
                    if (_task.id !== task.id)
                        throw new Error(
                            `DB: Expected Task id to be ${task.id} but was ${_task.id}`
                        );
                    if (_task.isComplete !== true)
                        throw new Error(
                            'DB: Expected reocrd to have isComplete=true'
                        );
                    if (_task.dateCompleted !== today.format('YYYY-MM-DD'))
                        throw new Error(
                            `DB: Expected Task dateCompleted to be ${today.format(
                                'YYYY-MM-DD'
                            )} but was ${_task.dateCompleted}`
                        );
                })
                .then(done, done);
        });
    });

    describe('PATCH /api/tasks - Update multiple Tasks with "complete" transition (completeAll)', () => {
        let tasks: Task[];
        let taskIds: string[];
        const taskPartial: Partial<Task> = {
            name: 'Task',
            priority: 'Medium',
            description:
                'Add unit test to complete all pending tasks through API',
            dueDate: today.format('YYYY-MM-DD')
        };

        beforeEach(async () => {
            tasks = [];
            taskIds = [];

            for (let i: number = 0; i < 5; i++) {
                const task: Task = await Tasks.save(taskPartial);
                tasks.push(task);
                taskIds.push(task.id.toString());
            }
        });

        afterEach((done) => {
            Tasks.deleteAll()
                .then(() => done())
                .catch(done);
        });

        it('should fail with a 404 response with invalid ids in body', (done) => {
            app.patch('/api/tasks')
                .send({
                    meta: {
                        transition: 'complete'
                    },
                    data: {
                        ids: ['9999', '10000'],
                        properties: {
                            dateCompleted: today.format('YYYY-MM-DD')
                        }
                    }
                })
                .expect('Content-Type', /json/)
                .expect(404, { error: { message: 'Not Found' } }, done);
        });

        it('should fail with a 400 response with valid ids but no dateCompleted in properties', (done) => {
            app.patch('/api/tasks')
                .send({
                    meta: {
                        transition: 'complete'
                    },
                    data: {
                        ids: taskIds,
                        properties: {}
                    }
                })
                .expect('Content-Type', /json/)
                .expect(
                    400,
                    {
                        error: {
                            message:
                                'Tasks must have valid date completed in format YYYY-MM-DD'
                        }
                    },
                    done
                );
        });

        it('should fail with a 400 response with valid ids but dateCompleted not a valid ISO date', (done) => {
            app.patch('/api/tasks')
                .send({
                    meta: {
                        transition: 'complete'
                    },
                    data: {
                        ids: taskIds,
                        properties: {
                            dateCompleted: `I am not a valid date ${today.format(
                                'YYYY-MM-DD'
                            )}`
                        }
                    }
                })
                .expect('Content-Type', /json/)
                .expect(
                    400,
                    {
                        error: {
                            message:
                                'Tasks must have valid date completed in format YYYY-MM-DD'
                        }
                    },
                    done
                );
        });

        it('should complete all tasks with the given ids', (done) => {
            app.patch(`/api/tasks`)
                .send({
                    meta: {
                        transition: 'complete'
                    },
                    data: {
                        ids: taskIds,
                        properties: {
                            dateCompleted: today.format('YYYY-MM-DD')
                        }
                    }
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .expect((res) => {
                    // then: the API response should include the Tasks that were completed
                    if (!res.body)
                        throw new Error('API: Expected data in response');
                    for (let i: number = 0; i < res.body.length; i++) {
                        const _task: Task = res.body[i];
                        if (
                            tasks.filter((task: Task) => {
                                return task.id == _task.id;
                            }).length != 1
                        )
                            throw new Error(
                                `API: Unexpected Task in results ${_task.id}`
                            );
                        if (!_task.dateCompleted)
                            throw new Error('API: Expected Task to have name');
                        if (_task.dateCompleted !== today.format('YYYY-MM-DD'))
                            throw new Error(
                                `API: Expected Task dateCompleted to be ${today.format(
                                    'YYYY-MM-DD'
                                )} but was ${_task.dateCompleted}`
                            );
                        if (!_task.isComplete)
                            throw new Error(
                                'API: Expected Task to have isComplete'
                            );
                        if (_task.isComplete !== true)
                            throw new Error(
                                'API: Expected Task to have isComplete=true'
                            );
                    }
                })
                .then(async () => {
                    // and: the Tasks should be marked complete in the DB
                    for (let i: number = 0; i < tasks.length; i++) {
                        const _task = await Tasks.getById(tasks[i].id);
                        if (!_task)
                            throw new Error(
                                'DB: Expected record to exist in DB'
                            );
                        if (_task.id !== tasks[i].id)
                            throw new Error(
                                `DB: Expected Task id to be ${tasks[i].id} but was ${_task.id}`
                            );
                        if (_task.isComplete !== true)
                            throw new Error(
                                'DB: Expected reocrd to have isComplete=true'
                            );
                        if (_task.dateCompleted !== today.format('YYYY-MM-DD'))
                            throw new Error(
                                `DB: Expected Task dateCompleted to be ${today.format(
                                    'YYYY-MM-DD'
                                )} but was ${_task.dateCompleted}`
                            );
                    }
                })
                .then(done, done);
        });
    });
});
