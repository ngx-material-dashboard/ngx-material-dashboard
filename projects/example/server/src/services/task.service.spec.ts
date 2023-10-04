import 'mocha';

import * as moment from 'moment';

import { expect } from 'chai';

import { getTestApp } from '../../test/server';

import { Task } from '../entity/task';
import { TaskService } from '../services/task.service';

import { TASKS } from '../../test/seed/tasks';
import { TasksHelper } from '../../test/util/tasks-helper';

describe('TaskService', () => {
    let tasksHelper: TasksHelper;
    const today = moment().startOf('day').utc();
    const yesterday = moment().utc().subtract(1, 'days');

    before((done) => {
        tasksHelper = new TasksHelper(TASKS);
        getTestApp()
            .then((a) => {
                done();
            })
            .catch(done);
    });

    describe('Complete by id', () => {
        let task: Task;
        const taskPartial: Partial<Task> = { name: 'Task', priority: 'Medium', description: 'Add unit test to complete a pending task through API', dueDate: today.format('YYYY-MM-DD') };

        beforeEach(async () => {
            task = await TaskService.save(taskPartial);
        });

        afterEach((done) => {
            TaskService.deleteAll()
                .then(() => done())
                .catch(done);
        });

        it('should throw a BadRequest exception if properties does not contain dateCompleted', async () => {
            try {
                await TaskService.complete(task.id, {});
            } catch (e) {
                expect(e.message).to.equal(
                    'Tasks must have valid date completed in format YYYY-MM-DD'
                );
            }
        });

        it('should throw a BadRequest exception if dateCompleted is null', async () => {
            try {
                await TaskService.complete(task.id, { dateCompleted: null });
            } catch (e) {
                expect(e.message).to.equal(
                    'Tasks must have valid date completed in format YYYY-MM-DD'
                );
            }
        });

        it('should throw a BadRequest exception if dateCompleted is not a valid ISO date', async () => {
            try {
                await TaskService.complete(task.id, {
                    dateCompleted: `I am not a valid date ${today.format(
                        'YYYY-MM-DD'
                    )}`
                });
            } catch (e) {
                expect(e.message).to.equal(
                    'Tasks must have valid date completed in format YYYY-MM-DD'
                );
            }
        });

        it("should throw a 'Not Found' error with an invalid 'id'", async () => {
            try {
                await TaskService.complete(9999, {
                    dateCompleted: today.format('YYYY-MM-DD')
                });
            } catch (e) {
                expect(e.message).to.equal('Not Found');
            }
        });

        it('should complete task with the given "id"', async () => {
            // when: the complete method is called with a valid id and parameters
            const completeTask = await TaskService.complete(task.id, { dateCompleted: today.format('YYYY-MM-DD') });

            // then: the returned Task should match the Task created for test and it should be marked as complete
            expect(completeTask.id).to.equal(task.id);
            expect(completeTask.isComplete).to.equal(true);
            expect(completeTask.dateCompleted).to.equal(
                today.format('YYYY-MM-DD')
            );
        });
    });

    describe('Complete all', () => {
        let tasks: Task[];
        let taskIds: string[];
        const taskPartial: Partial<Task> = { name: 'Task', priority: 'Medium', description: 'Add unit test to complete all pending tasks through API', dueDate: today.format('YYYY-MM-DD') };

        beforeEach(async () => {
            tasks = [];
            taskIds = [];

            for (let i: number = 0; i < 5; i++) {
                const task: Task = await TaskService.save(taskPartial);
                tasks.push(task);
                taskIds.push(task.id.toString());
            }
        });

        afterEach((done) => {
            TaskService.deleteAll()
                .then(() => done())
                .catch(done);
        });

        it('should throw a BadRequest exception if properties does not contain dateCompleted', async () => {
            try {
                await TaskService.completeAll(taskIds, {});
            } catch (e) {
                expect(e.message).to.equal(
                    'Tasks must have valid date completed in format YYYY-MM-DD'
                );
            }
        });

        it('should throw a BadRequest exception if dateCompleted is null', async () => {
            try {
                await TaskService.completeAll(taskIds, { dateCompleted: null });
            } catch (e) {
                expect(e.message).to.equal(
                    'Tasks must have valid date completed in format YYYY-MM-DD'
                );
            }
        });

        it('should throw a BadRequest exception if dateCompleted is not a valid ISO date', async () => {
            try {
                await TaskService.completeAll(taskIds, {
                    dateCompleted: `I am not a valid date ${today.format(
                        'YYYY-MM-DD'
                    )}`
                });
            } catch (e) {
                expect(e.message).to.equal(
                    'Tasks must have valid date completed in format YYYY-MM-DD'
                );
            }
        });

        it("should throw a 'Not Found' error with an invalid 'id'", async () => {
            try {
                await TaskService.completeAll(['9999', '10000'], {
                    dateCompleted: today.format('YYYY-MM-DD')
                });
            } catch (e) {
                expect(e.message).to.equal('Not Found');
            }
        });

        it('should complete all Tasks with the given ids', async () => {
            // when: the complete method is called with a valid id and parameters
            const completeTasks: Task[] = await TaskService.completeAll(taskIds, { dateCompleted: today.format('YYYY-MM-DD') });

            // then: the returned Tasks should match the Tasks created for test and they should be marked as complete
            for (let i: number = 0; i < completeTasks.length; i++) {
                expect(
                    tasks.filter((task: Task) => {
                        return task.id == completeTasks[i].id;
                    })
                );
                expect(completeTasks[i].isComplete).to.equal(true);
                expect(completeTasks[i].dateCompleted).to.equal(
                    today.format('YYYY-MM-DD')
                );
            }
        });
    });

    describe('Delete all', () => {
        before(async () => {
            for (let i: number = 0; i < TASKS.length; i++) {
                let task: Task = await TaskService.save(TASKS[i]);
                if (TASKS[i].dateCompleted != null) {
                    task = await TaskService.complete(task.id, TASKS[i]);
                }
            }
        });

        it('should delete all Tasks', (done) => {
            // when: the deleteAll() method is called
            TaskService.deleteAll()
                .then((res) => {
                    // then: the result should be true
                    expect(res).to.equal(true);

                    // and: there shouldn't be any Tasks in the database
                    TaskService.getAll().then((tasks: Task[]) => {
                        expect(tasks.length).to.equal(0);
                    });
                })
                .then(done);
        });
    });

    // Test delete task by id
    describe('Delete by id', () => {
        let completeTask: Task;
        let pendingTask: Task;

        before(async () => {
            completeTask = await TaskService.save({
                name: 'Add Unit Test to delete a complete Task',
                priority: 'Medium',
                description:
                    'Add unit test to delete a complete task through API',
                dueDate: today.format('YYYY-MM-DD')
            });
            completeTask = await TaskService.complete(completeTask.id, {
                dateCompleted: today.format('YYYY-MM-DD')
            });
            pendingTask = await TaskService.save({
                name: 'Add Unit Test to delete a pending Task',
                priority: 'Medium',
                description:
                    'Add unit test to delete a pending task through API',
                dueDate: today.format('YYYY-MM-DD')
            });
        });

        // Cleanup any tasks created during tests
        after((done) => {
            TaskService.deleteAll()
                .then(() => done())
                .catch(done);
        });

        it("should throw a 'Not Found' error with an invalid 'id'", async () => {
            try {
                await TaskService.delete(9999);
            } catch (e) {
                expect(e.message).to.equal('Not Found');
            }
        });

        it("should delete pending Task with 'id'", (done) => {
            // when: the delete method is called with a valid id
            TaskService.delete(pendingTask.id);

            // then: the task should be removed from the database
            TaskService.getById(pendingTask.id)
                .then((_task) => {
                    throw new Error('DB: Expected record not to exist in DB');
                })
                .catch((e) => null)
                .then(done);
        });

        it("should delete complete Task with 'id'", (done) => {
            // when: the delete method is called with a valid id
            TaskService.delete(completeTask.id);

            // then: the task should be removed from the database
            TaskService.getById(completeTask.id)
                .then((_task) => {
                    throw new Error('DB: Expected record not to exist in DB');
                })
                .catch((e) => null)
                .then(done);
        });
    });

    describe('getAll()', () => {
        before(async () => {
            for (let i: number = 0; i < TASKS.length; i++) {
                const task:Task = await TaskService.save(TASKS[i]);
                if (TASKS[i].dateCompleted != null) {
                    await TaskService.complete(task.id, TASKS[i]);
                }
            }
        });

        // Cleanup any tasks created during tests
        after(async () => {
            await TaskService.deleteAll();
        });

        it('should get all Tasks', async () => {
            // when: the getAll() method is called
            const tasks: Task[] = await TaskService.getAll();

            // then: all tasks should be returned
            expect(tasks.length).to.equal(TASKS.length);
        });
    });

    describe('getById()', () => {
        let completeTask: Task;
        let pendingTask: Task;

        before(async () => {
            completeTask = await TaskService.save({
                name: 'Add Unit Test to delete a complete Task',
                priority: 'Medium',
                description:
                    'Add unit test to delete a complete task through API',
                dueDate: today.format('YYYY-MM-DD')
            });
            completeTask = await TaskService.complete(completeTask.id, {
                dateCompleted: today.format('YYYY-MM-DD')
            });
            pendingTask = await TaskService.save({
                name: 'Add Unit Test to delete a pending Task',
                priority: 'Medium',
                description:
                    'Add unit test to delete a pending task through API',
                dueDate: today.format('YYYY-MM-DD')
            });
        });

        // Cleanup any tasks created during tests
        after((done) => {
            TaskService.deleteAll()
                .then(() => done())
                .catch(done);
        });

        it("should throw a 'Not Found' error with an invalid 'id'", async () => {
            try {
                // when: the getById method is called with an invalid id
                await TaskService.getById(9999);
            } catch (e) {
                // then: a Not Found error should be thrown
                expect(e.message).to.equal('Not Found');
            }
        });

        it("should get pending Task with 'id'", async () => {
            // when: the getById method is called with a valid id
            const task: Task = await TaskService.getById(pendingTask.id);

            // then: the task returned should be the expected task
            expect(task.id).to.equal(pendingTask.id);
        });

        it("should get complete Task with 'id'", async () => {
            // when: the getById method is called with a valid id
            const task: Task = await TaskService.getById(completeTask.id);

            // then: the task returned should be the expected task
            expect(task.id).to.equal(completeTask.id);
        });
    });

    describe('list()', () => {
        before(async () => {
            for (let i: number = 0; i < TASKS.length; i++) {
                let task: Task = await TaskService.save(TASKS[i]);
                if (TASKS[i].dateCompleted != null) {
                    task = await TaskService.complete(task.id, TASKS[i]);
                }
            }
        });

        // Cleanup any tasks created during tests
        after((done) => {
            TaskService.deleteAll()
                .then(() => done())
                .catch(done);
        });

        describe('isComplete=false', () => {
            it("should return all pending tasks when filter='' and pageSize=-1", async () => {
                // setup: define the variables needed for the test
                let tasks: Task[];
                let total: number;

                // when: the list() method is called
                [tasks, total] = await TaskService.list(
                    false,
                    '',
                    'id',
                    'ASC',
                    0,
                    -1
                );

                // then: the tasks array should contain all pending tasks
                expect(tasks.length).to.equal(tasksHelper.pendingTasks.length);
                tasks.forEach((task: Task) => {
                    expect(
                        tasksHelper.pendingTasks.filter((_task: Task) => {
                            return task.name == _task.name;
                        })
                    ).to.exist;
                });

                // and: the total should match the number of pending tasks
                expect(total).to.equal(tasksHelper.pendingTasks.length);
            });

            it("should return 5 pending tasks when filter='' and pageSize=5", async () => {
                // setup: define the variables needed for the test
                let tasks: Task[];
                let total: number;

                // when: the list() method is called
                [tasks, total] = await TaskService.list(
                    false,
                    '',
                    'id',
                    'ASC',
                    0,
                    5
                );

                // then: the tasks array should contain the first 5 pending tasks
                expect(tasks.length).to.equal(5);
                tasks.forEach((task: Task) => {
                    expect(
                        tasksHelper.pendingTasks.filter((_task: Task) => {
                            return task.name == _task.name;
                        })
                    ).to.exist;
                });

                // and: the total should match the total number of pending tasks
                expect(total).to.equal(tasksHelper.pendingTasks.length);
            });

            it("should return all over due tasks when filter='overdue' and pageSize=-1", async () => {
                // setup: define the variables needed for the test
                let tasks: Task[];
                let total: number;

                // when: the list() method is called
                [tasks, total] = await TaskService.list(
                    false,
                    'overdue',
                    'id',
                    'ASC',
                    0,
                    -1
                );

                // then: the tasks array should contain the number of over due tasks
                expect(tasks.length).to.equal(tasksHelper.tasksOverDue.length);

                // and: the total should match the total number of tasks over due
                expect(total).to.equal(tasksHelper.tasksOverDue.length);
            });

            it(`should return all tasks due today when filter='today' and pageSize=-1`, async () => {
                // setup: define the variables needed for the test
                let tasks: Task[];
                let total: number;

                // when: the list() method is called
                [tasks, total] = await TaskService.list(
                    false,
                    'today',
                    'id',
                    'ASC',
                    0,
                    -1
                );

                // then: the tasks array should contain the number of tasks due today
                expect(tasks.length).to.equal(tasksHelper.tasksDueToday.length);

                // and: the total should match the total number of tasks due today
                expect(total).to.equal(tasksHelper.tasksDueToday.length);
            });

            it(`should return all tasks due today when filter='tomorrow' and pageSize=-1`, async () => {
                // setup: define the variables needed for the test
                let tasks: Task[];
                let total: number;

                // when: the list() method is called
                [tasks, total] = await TaskService.list(
                    false,
                    'tomorrow',
                    'id',
                    'ASC',
                    0,
                    -1
                );

                // then: the tasks array should contain the number of tasks due tomorrow
                expect(tasks.length).to.equal(
                    tasksHelper.tasksDueTomorrow.length
                );

                // and: the total should match the total number of tasks due tomorrow
                expect(total).to.equal(tasksHelper.tasksDueTomorrow.length);
            });

            it(`should return all tasks due today when filter='${today.format(
                'MM/DD/YYYY'
            )}' and pageSize=-1`, async () => {
                // setup: define the variables needed for the test
                let tasks: Task[];
                let total: number;

                // when: the list() method is called
                [tasks, total] = await TaskService.list(
                    false,
                    today.format('MM/DD/YYYY'),
                    'id',
                    'ASC',
                    0,
                    -1
                );

                // then: the tasks array should contain the number of tasks due today
                expect(tasks.length).to.equal(tasksHelper.tasksDueToday.length);

                // and: the total should match the total number of tasks due today
                expect(total).to.equal(tasksHelper.tasksDueToday.length);
            });

            it('should return all tasks due 10/1/2018 when filter="10/1/2018" and pageSize="-1"', async () => {
                // setup: define the variables needed for the test
                let tasks: Task[];
                let total: number;

                // when: the list() method is called
                [tasks, total] = await TaskService.list(
                    false,
                    '10/1/2018',
                    'id',
                    'ASC',
                    0,
                    -1
                );

                // then: the tasks array should contain the number of tasks due today
                expect(tasks.length).to.equal(1);

                // and: the total should match the total number of tasks due today
                expect(total).to.equal(1);
            });

            it('should return all tasks due 1/10/2019 when filter="1/10/2019" and pageSize="-1"', async () => {
                // setup: define the variables needed for the test
                let tasks: Task[];
                let total: number;

                // when: the list() method is called
                [tasks, total] = await TaskService.list(
                    false,
                    '1/10/2019',
                    'id',
                    'ASC',
                    0,
                    -1
                );

                // then: the tasks array should contain the number of tasks due today
                expect(tasks.length).to.equal(1);

                // and: the total should match the total number of tasks due today
                expect(total).to.equal(1);
            });

            it('should return all tasks due 1/1/2019 when filter="1/1/2019" and pageSize="-1"', async () => {
                // setup: define the variables needed for the test
                let tasks: Task[];
                let total: number;

                // when: the list() method is called
                [tasks, total] = await TaskService.list(
                    false,
                    '1/1/2019',
                    'id',
                    'ASC',
                    0,
                    -1
                );

                // then: the tasks array should contain the number of tasks due today
                expect(tasks.length).to.equal(1);

                // and: the total should match the total number of tasks due today
                expect(total).to.equal(1);
            });
        });

        describe('isComplete=true', () => {
            it("should return all complete tasks when filter='' and pageSize=-1", async () => {
                // setup: define the variables needed for the test
                let tasks: Task[];
                let total: number;

                // when: the list() method is called
                [tasks, total] = await TaskService.list(
                    true,
                    '',
                    'id',
                    'ASC',
                    0,
                    -1
                );

                // then: the tasks array should contain all pending tasks
                expect(tasks.length).to.equal(tasksHelper.completeTasks.length);
                tasks.forEach((task: Task) => {
                    expect(
                        tasksHelper.completeTasks.filter((_task: Task) => {
                            return task.name == _task.name;
                        })
                    ).to.exist;
                });

                // and: the total should match the number of pending tasks
                expect(total).to.equal(tasksHelper.completeTasks.length);
            });

            it("should return 5 complete tasks when filter='' and pageSize=5", async () => {
                // setup: define the variables needed for the test
                let tasks: Task[];
                let total: number;

                // when: the list() method is called
                [tasks, total] = await TaskService.list(
                    true,
                    '',
                    'id',
                    'ASC',
                    0,
                    5
                );

                // then: the tasks array should contain the first 5 complete tasks
                expect(tasks.length).to.equal(5);
                tasks.forEach((task: Task) => {
                    expect(
                        tasksHelper.completeTasks.filter((_task: Task) => {
                            return task.name == _task.name;
                        })
                    ).to.exist;
                });

                // and: the total should match the total number of pending tasks
                expect(total).to.equal(tasksHelper.completeTasks.length);
            });

            it("should return 0 complete tasks when filter='overDue' and pageSize=-1", async () => {
                // setup: define the variables needed for the test
                let tasks: Task[];
                let total: number;

                // when: the list() method is called
                [tasks, total] = await TaskService.list(
                    true,
                    'overDue',
                    'id',
                    'ASC',
                    0,
                    -1
                );

                // then: the tasks array should contain 0 tasks
                expect(tasks.length).to.equal(0);

                // and: the total should be 0
                expect(total).to.equal(0);
            });
        });
    });

    describe('save()', () => {
        // Cleanup any tasks created during tests
        after((done) => {
            TaskService.deleteAll()
                .then(() => done())
                .catch(done);
        });

        describe('non-repeating Task', () => {
            const taskPartial: Partial<Task> = { name: 'Add Unit Test to create a non-repeating pending Task', priority: 'Medium', description: 'Add unit test to create a non-repeating pending task through API', dueDate: today.format('YYYY-MM-DD') };

            // Cleanup any tasks created during tests
            after((done) => {
                TaskService.deleteAll()
                    .then(() => done())
                    .catch(done);
            });

            it('should throw a BadRequest error if no properties are included in partial parameter', async () => {
                try {
                    // when: the getById method is called with an invalid id
                    await TaskService.save({});
                } catch (e) {
                    // then: a BadRequest error should be thrown
                    expect(e.message).to.equal(
                        'Task requires name, priority, description, and due date'
                    );
                }
            });

            it('should throw a BadRequest error if no name is included in partial parameter', async () => {
                try {
                    // when: the getById method is called with an invalid id
                    await TaskService.save({
                        priority: 'Medium',
                        description:
                            'Add unit test to create a non-repeating pending task through API',
                        dueDate: today.format('YYYY-MM-DD')
                    });
                } catch (e) {
                    // then: a BadRequest error should be thrown
                    expect(e.message).to.equal('Task requires name');
                }
            });

            it('should throw a BadRequest error if no priority is included in partial parameter', async () => {
                try {
                    // when: the getById method is called with an invalid id
                    await TaskService.save({
                        name: 'Add Unit Test to create a non-repeating pending Task',
                        description:
                            'Add unit test to create a non-repeating pending task through API',
                        dueDate: today.format('YYYY-MM-DD')
                    });
                } catch (e) {
                    // then: a BadRequest error should be thrown
                    expect(e.message).to.equal('Task requires priority');
                }
            });

            it('should throw a BadRequest error if invalid due date is included in partial parameter', async () => {
                try {
                    // when: the getById method is called with an invalid id
                    await TaskService.save({
                        name: 'Add Unit Test to create a non-repeating pending Task',
                        priority: 'Low',
                        description:
                            'Add unit test to create a non-repeating pending task through API',
                        dueDate: 'invalid date'
                    });
                } catch (e) {
                    // then: a BadRequest error should be thrown
                    expect(e.message).to.equal(
                        'Task requires valid due date in format YYYY-MM-DD'
                    );
                }
            });

            it('should create a single Task with valid properties', async () => {
                // when: a single non-repeating Task is created
                const task: Task = await TaskService.save(taskPartial);

                // then: the Task properties should match the partial defined above
                expect(task.name).to.equal(taskPartial.name);
                expect(task.priority).to.equal(taskPartial.priority);
                expect(task.description).to.equal(taskPartial.description);
                expect(task.dueDate).to.equal(taskPartial.dueDate);

                // and: there should be one Task in the database
                const tasks: Task[] = await TaskService.getAll();
                expect(tasks.length).to.equal(1);
            });
        });

        describe('repeating Task', () => {
            const taskPartial: Partial<Task> = { name: 'Add Unit Test to create a repeating pending Task', priority: 'Medium', description: 'Add unit test to create a repeating a pending task through API', dueDate: today.format('YYYY-MM-DD'), repeats: 'daily', endsAfter: 5 };

            // Cleanup any tasks created during tests
            afterEach((done) => {
                TaskService.deleteAll()
                    .then(() => done())
                    .catch(done);
            });

            it('should create 5 daily Tasks when valid properties are included in the partial parameter', async () => {
                // when: a repeating Task is created
                const task: Task = await TaskService.save(taskPartial);

                // then: the Task properties should match the partial defined above
                expect(task.name).to.equal(taskPartial.name);
                expect(task.priority).to.equal(taskPartial.priority);
                expect(task.repeats).to.equal(taskPartial.repeats);
                expect(task.endsAfter).to.equal(taskPartial.endsAfter);
                expect(task.description).to.equal(taskPartial.description);
                expect(task.dueDate).to.equal(taskPartial.dueDate);

                // and: there should be 5 Tasks in the database
                const tasks: Task[] = await TaskService.getAll();
                expect(tasks.length).to.equal(5);

                // and: each Task should have properties that match the partial defined above
                tasks.forEach((task: Task, i: number) => {
                    // expect: the main properties should match
                    expect(task.name).to.equal(taskPartial.name);
                    expect(task.priority).to.equal(taskPartial.priority);
                    expect(task.repeats).to.equal(taskPartial.repeats);
                    expect(task.description).to.equal(taskPartial.description);

                    // and: the dueDate should be incremented by i days
                    expect(task.dueDate).to.equal(
                        moment(taskPartial.dueDate, moment.ISO_8601, true)
                            .startOf('day')
                            .add(i, 'days')
                            .format('YYYY-MM-DD')
                    );

                    // and: the endsAfter should be decremented by i
                    expect(task.endsAfter).to.equal(taskPartial.endsAfter - i);
                });
            });

            it('should create 5 weekly Tasks when valid properties are included in the partial parameter', async () => {
                // when: a repeating Task is created
                const taskPartial: Partial<Task> = { name: 'Add Unit Test to create a repeating pending Task', priority: 'Medium', description: 'Add unit test to create a repeating a pending task through API', dueDate: today.format('YYYY-MM-DD'), repeats: 'weekly', endsAfter: 5 }
                const task: Task = await TaskService.save(taskPartial);

                // then: the Task properties should match the partial defined above
                expect(task.name).to.equal(taskPartial.name);
                expect(task.priority).to.equal(taskPartial.priority);
                expect(task.repeats).to.equal(taskPartial.repeats);
                expect(task.endsAfter).to.equal(taskPartial.endsAfter);
                expect(task.description).to.equal(taskPartial.description);
                expect(task.dueDate).to.equal(taskPartial.dueDate);

                // and: there should be 5 Tasks in the database
                const tasks: Task[] = await TaskService.getAll();
                expect(tasks.length).to.equal(5);

                // and: each Task should have properties that match the partial defined above
                tasks.forEach((task: Task, i: number) => {
                    // expect: the main properties should match
                    expect(task.name).to.equal(taskPartial.name);
                    expect(task.priority).to.equal(taskPartial.priority);
                    expect(task.repeats).to.equal(taskPartial.repeats);
                    expect(task.description).to.equal(taskPartial.description);

                    // and: the dueDate should be incremented by 7*i days
                    expect(task.dueDate).to.equal(
                        moment(taskPartial.dueDate, moment.ISO_8601, true)
                            .startOf('day')
                            .add(7 * i, 'days')
                            .format('YYYY-MM-DD')
                    );

                    // and: the endsAfter should be decremented by i
                    expect(task.endsAfter).to.equal(taskPartial.endsAfter - i);
                });
            });

            it('should create 5 monthly Tasks when valid properties are included in the partial parameter', async () => {
                // when: a repeating Task is created
                const taskPartial: Partial<Task> = { name: 'Add Unit Test to create a repeating pending Task', priority: 'Medium', description: 'Add unit test to create a repeating a pending task through API', dueDate: today.format('YYYY-MM-DD'), repeats: 'monthly', endsAfter: 5 };
                const task: Task = await TaskService.save(taskPartial);

                // then: the Task properties should match the partial defined above
                expect(task.name).to.equal(taskPartial.name);
                expect(task.priority).to.equal(taskPartial.priority);
                expect(task.repeats).to.equal(taskPartial.repeats);
                expect(task.endsAfter).to.equal(taskPartial.endsAfter);
                expect(task.description).to.equal(taskPartial.description);
                expect(task.dueDate).to.equal(taskPartial.dueDate);

                // and: there should be 5 Tasks in the database
                const tasks: Task[] = await TaskService.getAll();
                expect(tasks.length).to.equal(5);

                // and: each Task should have properties that match the partial defined above
                tasks.forEach((task: Task, i: number) => {
                    // expect: the main properties should match
                    expect(task.name).to.equal(taskPartial.name);
                    expect(task.priority).to.equal(taskPartial.priority);
                    expect(task.repeats).to.equal(taskPartial.repeats);
                    expect(task.description).to.equal(taskPartial.description);

                    // and: the dueDate should be incremented by i months
                    expect(task.dueDate).to.equal(
                        moment(taskPartial.dueDate, moment.ISO_8601, true)
                            .startOf('day')
                            .add(i, 'months')
                            .format('YYYY-MM-DD')
                    );

                    // and: the endsAfter should be decremented by i
                    expect(task.endsAfter).to.equal(taskPartial.endsAfter - i);
                });
            });

            it('should create 5 yearly Tasks when valid properties are included in the partial parameter', async () => {
                // when: a repeating Task is created
                const taskPartial: Partial<Task> = { name: 'Add Unit Test to create a repeating pending Task', priority: 'Medium', description: 'Add unit test to create a repeating a pending task through API', dueDate: today.format('YYYY-MM-DD'), repeats: 'yearly', endsAfter: 5 };
                const task: Task = await TaskService.save(taskPartial);

                // then: the Task properties should match the partial defined above
                expect(task.name).to.equal(taskPartial.name);
                expect(task.priority).to.equal(taskPartial.priority);
                expect(task.repeats).to.equal(taskPartial.repeats);
                expect(task.endsAfter).to.equal(taskPartial.endsAfter);
                expect(task.description).to.equal(taskPartial.description);
                expect(task.dueDate).to.equal(taskPartial.dueDate);

                // and: there should be 5 Tasks in the database
                const tasks: Task[] = await TaskService.getAll();
                expect(tasks.length).to.equal(5);

                // and: each Task should have properties that match the partial defined above
                tasks.forEach((task: Task, i: number) => {
                    // expect: the main properties should match
                    expect(task.name).to.equal(taskPartial.name);
                    expect(task.priority).to.equal(taskPartial.priority);
                    expect(task.repeats).to.equal(taskPartial.repeats);
                    expect(task.description).to.equal(taskPartial.description);

                    // and: the dueDate should be incremented by i years
                    expect(task.dueDate).to.equal(
                        moment(taskPartial.dueDate, moment.ISO_8601, true)
                            .startOf('day')
                            .add(i, 'years')
                            .format('YYYY-MM-DD')
                    );

                    // and: the endsAfter should be decremented by i
                    expect(task.endsAfter).to.equal(taskPartial.endsAfter - i);
                });
            });
        });
    });

    describe('update()', () => {
        describe('non-repeating Task', () => {
            let task: Task;
            const taskPartial: Partial<Task> = { name: 'Update Pending Task', priority: 'Medium', description: 'Add unit test to update a pending task through API', dueDate: yesterday.format('YYYY-MM-DD'), repeats: 'noRepeat' };

            beforeEach(async () => {
                // create a non-repeating Task
                task = await TaskService.save(taskPartial);
            });

            afterEach((done) => {
                TaskService.deleteAll()
                    .then(() => done())
                    .catch(done);
            });

            it('should throw a BadRequest error if no properties are included in partial parameter', async () => {
                try {
                    // when: the update method is called without properties
                    await TaskService.update(task.id, {}, false);
                } catch (e) {
                    // then: a BadRequest error should be thrown
                    expect(e.message).to.equal(
                        'Task requires name, priority, description, and due date'
                    );
                }
            });

            it('should throw a BadRequest error if no name is included in partial parameter', async () => {
                try {
                    // when: the getById method is called with an invalid id
                    await TaskService.update(
                        task.id,
                        {
                            priority: 'Medium',
                            description:
                                'Add unit test to update a pending task through API',
                            dueDate: today.format('YYYY-MM-DD')
                        },
                        false
                    );
                } catch (e) {
                    // then: a BadRequest error should be thrown
                    expect(e.message).to.equal('Task requires name');
                }
            });

            it('should throw a BadRequest error if no priority is included in partial parameter', async () => {
                try {
                    // when: the getById method is called with an invalid id
                    await TaskService.update(
                        task.id,
                        {
                            name: 'Update pending Task',
                            description:
                                'Add unit test to update a pending task through API',
                            dueDate: today.format('YYYY-MM-DD')
                        },
                        false
                    );
                } catch (e) {
                    // then: a BadRequest error should be thrown
                    expect(e.message).to.equal('Task requires priority');
                }
            });

            it('should update a Task with valid properties', async () => {
                // when: a single non-repeating Task is created
                const updatedTask: Task = await TaskService.update(task.id, { name: 'Update Pending Task Name', priority: 'High', description: 'Add updated description to pending task through API', dueDate: today.format('YYYY-MM-DD') }, false);
                );

                // then: the Task properties should match the properties defined above
                expect(updatedTask.id).to.equal(task.id);
                expect(updatedTask.name).to.equal('Update Pending Task Name');
                expect(updatedTask.priority).to.equal('High');
                expect(updatedTask.description).to.equal(
                    'Add updated description to pending task through API'
                );
                expect(updatedTask.dueDate).to.equal(
                    today.format('YYYY-MM-DD')
                );

                // and: there should be one Task in the database
                const tasks: Task[] = await TaskService.getAll();
                expect(tasks.length).to.equal(1);
            });
        });

        describe('repeating Task (isComplete=true)', () => {
            let task: Task;
            const taskPartial: Partial<Task> = { name: 'Add Unit Test to update a repeating complete Task', priority: 'Medium', description: 'Add unit test to update a repeating a complete task through API', dueDate: yesterday.format('YYYY-MM-DD'), repeats: 'daily', endsAfter: 5 };

            before(async () => {
                // create a repeating Task
                task = await TaskService.save(taskPartial);

                // mark the first Task in the sequence as complete
                task = await TaskService.complete(task.id, {
                    dateCompleted: today.format('YYYY-MM-DD')
                });
            });

            // Cleanup any tasks created during tests
            after((done) => {
                TaskService.deleteAll()
                    .then(() => done())
                    .catch(done);
            });

            it('should throw a BadRequest exception if the repeats is different from "daily"', async () => {
                try {
                    // when: the Task is updated from daily to weekly
                    await TaskService.update(
                        task.id.toString(),
                        {
                            name: 'Add Unit Test to update a repeating complete Task',
                            priority: 'Medium',
                            description:
                                'Add unit test to update a repeating a complete task through API',
                            dueDate: yesterday.format('YYYY-MM-DD'),
                            repeats: 'weekly',
                            endsAfter: 5
                        },
                        true
                    );
                } catch (e) {
                    // then: a BadRequest exception should be thrown and the message should match the expected text
                    expect(e.message).to.equal(
                        'Task requires repeats to not change for complete Tasks'
                    );
                }
            });

            it('should throw a BadRequest exception if the endsAfter is greater than "5"', async () => {
                try {
                    // when: the Task is updated from daily to weekly
                    await TaskService.update(
                        task.id.toString(),
                        {
                            name: 'Add Unit Test to update a repeating complete Task',
                            priority: 'Medium',
                            description:
                                'Add unit test to update a repeating a complete task through API',
                            dueDate: yesterday.format('YYYY-MM-DD'),
                            repeats: 'daily',
                            endsAfter: 6
                        },
                        true
                    );
                } catch (e) {
                    // then: a BadRequest exception should be thrown and the message should match the expected text
                    expect(e.message).to.equal(
                        'Task requires ends after to not change for complete Tasks'
                    );
                }
            });

            it('should throw a BadRequest exception if the endsAfter is less than "5"', async () => {
                try {
                    // when: the Task is updated from daily to weekly
                    await TaskService.update(
                        task.id.toString(),
                        {
                            name: 'Add Unit Test to update a repeating complete Task',
                            priority: 'Medium',
                            description:
                                'Add unit test to update a repeating a complete task through API',
                            dueDate: yesterday.format('YYYY-MM-DD'),
                            repeats: 'daily',
                            endsAfter: 4
                        },
                        true
                    );
                } catch (e) {
                    // then: a BadRequest exception should be thrown and the message should match the expected text
                    expect(e.message).to.equal(
                        'Task requires ends after to not change for complete Tasks'
                    );
                }
            });

            it('should throw a BadRequest exception if updateAll=true', async () => {
                try {
                    await TaskService.update(
                        task.id.toString(),
                        {
                            name: 'Add Unit Test to update a repeating complete Task',
                            priority: 'Medium',
                            description:
                                'Add unit test to update a repeating a complete task through API',
                            dueDate: yesterday.format('YYYY-MM-DD'),
                            dateCompleted: today.format('YYYY-MM-DD'),
                            repeats: 'daily',
                            endsAfter: 5
                        },
                        true
                    );
                } catch (e) {
                    expect(e.message).to.equal(
                        'Tasks must be marked complete individually (you cannot mark multiple Tasks as complete at the same time)'
                    );
                }
            });
        });

        describe('repeating Task', () => {
            let task: Task;
            const taskPartial: Partial<Task> = { name: 'Add Unit Test to create a repeating pending Task', priority: 'Medium', description: 'Add unit test to create a repeating a pending task through API', dueDate: yesterday.format('YYYY-MM-DD'), repeats: 'daily', endsAfter: 5 };

            before(async () => {
                task = await TaskService.save(taskPartial);
            });

            // Cleanup any tasks created during tests
            after((done) => {
                TaskService.deleteAll()
                    .then(() => done())
                    .catch(done);
            });

            it('should throw a BadRequest exception if the endsAfter is less than number of remaining Tasks', async () => {
                // given: the second Task in a repeating Task sequence
                let secondTask: Task = await TaskService.getById(task.nextId);

                try {
                    // when: the Task is updated
                    secondTask = await TaskService.update(
                        secondTask.id.toString(),
                        {
                            name: 'Add Unit Test to update a repeating pending Task',
                            priority: 'Medium',
                            description:
                                'Add unit test to update a repeating a pending task through API',
                            dueDate: today.format('YYYY-MM-DD'),
                            repeats: 'daily',
                            endsAfter: 3
                        },
                        true
                    );
                } catch (e) {
                    // then: a BadRequest exception should be thrown and the message should match the expected text
                    expect(e.message).to.equal(
                        "Task requires ends after to be greater than or equal to '4'"
                    );
                }
            });

            it('should update remaining Tasks when second Task in repeating Task sequence is updated', async () => {
                // given: the second Task in a repeating Task sequence
                let secondTask: Task = await TaskService.getById(task.nextId);

                // when: the Task is updated
                secondTask = await TaskService.update(
                    secondTask.id.toString(),
                    {
                        name: 'Add Unit Test to update a repeating pending Task',
                        priority: 'Medium',
                        description:
                            'Add unit test to update a repeating a pending task through API',
                        dueDate: today.format('YYYY-MM-DD'),
                        repeats: 'daily',
                        endsAfter: 4
                    },
                    true
                );

                // then: there should still be 5 Tasks in the database
                const tasks: Task[] = await TaskService.getAll();
                expect(tasks.length).to.equal(5);
            });

            it('should update remaining Tasks and add new Tasks when second Task in repeating Task sequence is updated with more endsAfter', async () => {
                // given: the second Task in a repeating Task sequence
                let secondTask: Task = await TaskService.getById(task.nextId);

                // when: the Task is updated
                secondTask = await TaskService.update(
                    secondTask.id.toString(),
                    {
                        name: 'Add Unit Test to update a repeating pending Task',
                        priority: 'Medium',
                        description:
                            'Add unit test to update a repeating a pending task through API',
                        dueDate: today.format('YYYY-MM-DD'),
                        repeats: 'daily',
                        endsAfter: 6
                    },
                    true
                );

                // then: there should be 7 Tasks in the database
                const tasks: Task[] = await TaskService.getAll();
                expect(tasks.length).to.equal(7);
            });
        });
    });
});
