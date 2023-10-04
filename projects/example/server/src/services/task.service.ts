/* 3rd party libraries */
import * as moment from 'moment';
import { NotFound, BadRequest } from 'http-errors';
import { Brackets, Repository } from 'typeorm';

/* app classes */
import { Task } from '../entity/task';
import { AppDataSource } from '../conf/data-source';
import { TaskSearch } from '../interfaces/task-search.interface';

/**
 * Manages the connection manager for TypeORM. TODO separate out DAO and business logic like list method.
 */
export class TaskService {
    /**
     * Returns the database connection from the TypeORM connection manager.
     */
    private static db(): Repository<Task> {
        return AppDataSource.getRepository(Task);
    }

    /**
     * Returns true if the properties for a Task are valid. A Task is valid if it has a name, priority,
     * description, and due date. A BadRequest exception is thrown with a somewhat human readable error
     * message if there are any validation errors.
     *
     * @param properties The properties that represent a Task.
     * @returns true if the given properties are valid.
     */
    private static validate(
        properties: Partial<Task>,
        task?: Task,
        updateAll?: boolean
    ): boolean {
        // validate presence of required fields and track each invalid property in an array
        const validationErrors: string[] = [];
        if (!properties.name) validationErrors.push('name');
        if (!properties.priority) validationErrors.push('priority');
        // TODO uncomment and add repeats and endsAfter to all Tasks
        // if(!properties.repeats) validationErrors.push('repeats');
        // if(!properties.endsAfter) validationErrors.push('endsAfter');
        if (!properties.description) validationErrors.push('description');

        // validate that the due date is a valid ISO date
        const dueDate = moment(properties.dueDate, moment.ISO_8601, true);
        if (!properties.dueDate) validationErrors.push('due date');
        else if (!dueDate.isValid()) {
            validationErrors.push('valid due date in format YYYY-MM-DD');
        }

        // add a few special checks for when a Task is provided (to validate things when updating a Task)
        if (task) {
            // if a Task is complete then it doesn't really make sense to change the repeats or endsAfter properties
            if (task.isComplete) {
                if (properties.repeats != task.repeats) {
                    validationErrors.push(
                        'repeats to not change for complete Tasks'
                    );
                }
                if (properties.endsAfter != task.endsAfter) {
                    validationErrors.push(
                        'ends after to not change for complete Tasks'
                    );
                }
            } else if (
                properties.endsAfter &&
                properties.endsAfter < task.endsAfter
            ) {
                // validate that endsAfter is not less than task.endsAfter
                // effectively prevents a user from trying to delete any remaining Tasks when updating a repeating Task.
                validationErrors.push(
                    `ends after to be greater than or equal to '${task.endsAfter}'`
                );
            }
        }

        // build a human readable error message and throw a BadRequest if there are
        // any validation errors
        if (validationErrors.length > 0) {
            let errorMsg: string = 'Task requires';
            validationErrors.forEach((error: string, index: number) => {
                if (index > 0) {
                    errorMsg += ',';
                    if (index + 1 == validationErrors.length)
                        errorMsg += ' and';
                }
                errorMsg += ` ${error}`;
            });

            throw new BadRequest(errorMsg);
        } else if (updateAll && properties.dateCompleted) {
            throw new BadRequest(
                'Tasks must be marked complete individually (you cannot mark multiple Tasks as complete at the same time)'
            );
        }
        return true;
    }

    /**
     * Completes the Task with the given id.
     *
     * @param id The id of the Task to complete.
     * @param properties The properties containing the dateCompleted.
     */
    public static async complete(
        id: number,
        properties: Partial<Task>
    ): Promise<Task> {
        const task: Task = await this.getById(id);
        // validate that the date completed is a valid ISO date
        if (
            !moment(properties.dateCompleted, moment.ISO_8601, true).isValid()
        ) {
            throw new BadRequest(
                'Tasks must have valid date completed in format YYYY-MM-DD'
            );
        }

        task.isComplete = true;
        task.dateCompleted = moment(properties.dateCompleted, moment.ISO_8601)
            .utc()
            .format('YYYY-MM-DD');
        await this.db().save(task);
        return task;
    }

    /**
     * Completes the Tasks with the given ids. All Tasks completed will be marked
     * with the same dateCompleted property.
     *
     * @param ids The ids of the Tasks to complete.
     * @param properties The properties containing the dateCompleted.
     */
    public static async completeAll(
        ids: number[],
        properties: Partial<Task>
    ): Promise<Task[]> {
        const tasks: Task[] = [];
        for (let i: number = 0; i < ids.length; i++) {
            const task: Task = await this.complete(ids[i], properties);
            tasks.push(task);
        }
        return tasks;
    }

    /**
     * Delete a Task with the given 'id'.
     *
     * @param id The 'id' of the Task to delete.
     * @returns The Task that was deleted.
     */
    public static async delete(id: number): Promise<Task> {
        // find Task with given id (should throw NotFound if it doesn't exist),
        // which is good since delete method does not check if entity exists
        const task: Task = await this.getById(id);
        await this.db().delete(id);
        return task;
    }

    /**
     * Delete all Tasks in the database. TODO May want to take this out or limit its capability in production...
     *
     * @returns true if all Tasks are deleted from the database.
     */
    public static async deleteAll(): Promise<boolean> {
        const tasks: Task[] = await this.getAll();
        await this.db().remove(tasks);
        return true;
    }

    /**
     * Returns all Tasks in the database.
     *
     * @returns All Tasks in the database.
     */
    public static async getAll(): Promise<Task[]> {
        return await this.db().find();
    }

    /**
     * Returns the Task with the given 'id'. Throws a NotFound exception if no Task is found with the given 'id'.
     *
     * @param id The 'id' of the Task to get.
     * @returns The Task with the given 'id' if it exists.
     */
    public static async getById(id: number): Promise<Task> {
        const task: Task | null = await this.db().findOneBy({ id: id });
        if (!task) throw new NotFound();
        return task;
    }

    /**
     * Returns an array and a total count of Tasks that match the given isComplete and filter parameters. The
     * filter allows searching on name, priority, description, and dates. A special 'overDue' filter is included
     * to return pending Tasks that have a due date before today. If no filter is provided (either null,
     * or the empty string), then the results will include all pending or complete tasks (based on the isComplete
     * parameter. The results are sorted in the given order, and paginated as long as a valid pageSize is given.
     *
     * @param isComplete Set to false if searching pending tasks, true if searching complete tasks.
     * @param filter The filter to match Tasks with. Text, valid ISO date, null, or the empty string.
     * @param sort The column to sort the results by.
     * @param order The order for the results (ASC or DESC).
     * @param pageNumber The page number (0 returns the first page of results when pageSize included).
     * @param pageSize The number of results to return.
     * @returns A Promise containing an array and total count of Tasks that match the given isComplete and filter parameters.
     */
    public static async list(
        isComplete: boolean,
        filter: TaskSearch,
        sort: string,
        order: 'ASC' | 'DESC',
        pageNumber: number,
        pageSize: number
    ): Promise<[Task[], number]> {
        // create a query builder to search Tasks in the database
        const qb = this.db().createQueryBuilder('task');
        qb.where('task.isComplete = :isComplete', { isComplete: isComplete });

        if (filter.special) {
            if (filter.special.toLowerCase() == 'overdue' && !isComplete) {
                // otherwise add a special check for 'overDue' filter when searching pending Tasks
                const date = moment().startOf('day').utc().format('YYYY-MM-DD');
                qb.andWhere('task.dueDate < :dueDate', { dueDate: date });
            } else if (filter.special.toLowerCase() == 'today') {
                const date = moment().startOf('day').utc().format('YYYY-MM-DD');
                qb.andWhere(
                    new Brackets((subQb) => {
                        subQb.where('task.dueDate = :dueDate', {
                            dueDate: date
                        });
                        subQb.orWhere('task.dateCompleted = :dateCompleted', {
                            dateCompleted: date
                        });
                    })
                );
            } else if (filter.special.toLowerCase() == 'tomorrow') {
                const date = moment()
                    .startOf('day')
                    .add(1, 'days')
                    .utc()
                    .format('YYYY-MM-DD');
                qb.andWhere(
                    new Brackets((subQb) => {
                        subQb.where('task.dueDate = :dueDate', {
                            dueDate: date
                        });
                        subQb.orWhere('task.dateCompleted = :dateCompleted', {
                            dateCompleted: date
                        });
                    })
                );
            }
        } else {
            if (filter.name) {
                qb.andWhere('task.name LIKE :filter', {
                    filter: `%${filter.name}%`
                });
            }
            if (filter.description) {
                qb.andWhere('task.description LIKE :filter', {
                    filter: `%${filter.description}%`
                });
            }
            if (filter.priority) {
                qb.andWhere('task.priority LIKE :filter', {
                    filter: `%${filter.priority}%`
                });
            }
            if (filter.dueDate) {
                const date = moment(
                    filter.dueDate,
                    [
                        'MM/DD/YYYY',
                        'MM/D/YYYY',
                        'M/DD/YYYY',
                        'M/D/YYYY',
                        moment.ISO_8601
                    ],
                    true
                );
                if (date.isValid()) {
                    qb.andWhere('task.dueDate = :dueDate', {
                        dueDate: date.format('YYYY-MM-DD')
                    });
                }
            }
        }

        // page the results if the pageSize is greater than -1
        if (pageSize > -1) {
            qb.skip(pageNumber * pageSize).take(pageSize);
        }

        // add sort and order to query
        qb.orderBy(sort, order);
        // eager load disabled for createQueryBuilder according to docs, so
        // make sure we get priority for each task...
        qb.leftJoinAndSelect('task.priority', 'priority');

        // run the query and return an array and count of the results
        return await qb.getManyAndCount();
    }

    /**
     * Creates and returns a new Task if the given properties are valid.
     *
     * @param properties The properties for a Task.
     * @returns The created Task.
     */
    public static async save(properties: Partial<Task>): Promise<Task> {
        this.validate(properties); // validate the task properties
        let task: Task = new Task(); // create the task
        this.setProperties(task, properties); // set the properties for the task
        task = await this.db().save(task); // save the task in the database

        const currentTask: Task = task;
        if (
            properties.repeats != null &&
            properties.repeats !== 'noRepeat' &&
            properties.endsAfter
        ) {
            await this.createRepeatingTasks(
                1,
                properties.endsAfter,
                task,
                currentTask,
                properties
            );
        }

        return task;
    }

    /**
     * Updates the Task with the given 'id' if the given properties are valid. Throws a NotFound exception if
     * no Task is found with the given 'id'.
     *
     * @param id The 'id' of the Task to update.
     * @param properties The new properties for the Task.
     * @returns The updated Task.
     */
    public static async update(
        id: number,
        properties: Partial<Task>,
        updateAll: boolean
    ): Promise<Task> {
        const task: Task = await this.getById(id); // find the Task with the given 'id'
        this.validate(properties, task, updateAll); // validate the task properties
        this.setProperties(task, properties); // update the properties for the task
        await this.db().save(task); // update the task in the database

        if (!task.isComplete && updateAll) {
            let currentTask: Task = task;
            let i: number = 1;

            // update existing repeating Tasks
            while (currentTask.nextId) {
                const nextTask: Task = await this.getById(currentTask.nextId);
                currentTask = await this.setRepeatingTaskProperties(
                    i,
                    nextTask,
                    currentTask,
                    task,
                    properties
                );
                i++;
            }

            // add any additional repeating Tasks
            if (properties.endsAfter) {
                await this.createRepeatingTasks(
                    i,
                    properties.endsAfter,
                    task,
                    currentTask,
                    properties
                );
            }
        }

        return task;
    }

    /**
     * Sets the properties for a task.
     *
     * @param task The Task to set the properties for.
     * @param properties The properties for the Task.
     */
    private static setProperties(task: Task, properties: Partial<Task>): void {
        if (properties.name) {
            task.name = properties.name;
        }
        if (properties.priority) {
            task.priority = properties.priority;
        }
        if (properties.description) {
            task.description = properties.description;
        }
        console.log(task.priority);

        task.dueDate = moment(properties.dueDate).utc().format('YYYY-MM-DD');
        if (properties.dateCompleted) {
            task.dateCompleted = moment(properties.dateCompleted)
                .utc()
                .format('YYYY-MM-DD');
        }
        if (properties.repeats) {
            task.repeats = properties.repeats;
        }
        if (properties.endsAfter) {
            task.endsAfter = properties.endsAfter;
        }
        task.isComplete = task.isComplete == null ? false : task.isComplete;
    }

    /**
     * Creates a sequence of repeating Tasks. Can be used to create a new sequence or update an existing sequence.
     *
     * @param start The index in the sequence of repeating Tasks to start at.
     * @param end The total number of repeating Tasks.
     * @param task The first Task in a sequence of Tasks.
     * @param currentTask The current Task (same as the first Task if creating a new sequence).
     * @param properties The properties for a Task.
     */
    private static async createRepeatingTasks(
        start: number,
        end: number,
        task: Task,
        currentTask: Task,
        properties: Partial<Task>
    ): Promise<Task> {
        for (let i: number = start; i < end; i++) {
            const newTask: Task = new Task();
            currentTask = await this.setRepeatingTaskProperties(
                i,
                newTask,
                currentTask,
                task,
                properties
            );
        }

        return currentTask;
    }

    /**
     * Sets the properties for a repeating Task and updates the current Task's nextId reference in the sequence
     * of repeating Tasks to ensure the chain of Tasks is complete and updated properly.
     *
     * @param i The index in a sequence of repeating Tasks.
     * @param newTask The new repeating Task.
     * @param currentTask The current Task in a sequence of repeating Tasks.
     * @param task The first Task in a sequence of repeating Tasks.
     * @param properties The properties for a Task.
     */
    private static async setRepeatingTaskProperties(
        i: number,
        newTask: Task,
        currentTask: Task,
        task: Task,
        properties: Partial<Task>
    ): Promise<Task> {
        const date: moment.Moment = this.calculateNextRepeatingDueDate(task, i);
        this.setProperties(newTask, properties);
        newTask.dueDate = date.format('YYYY-MM-DD');
        newTask.endsAfter -= i;
        newTask = await this.db().save(newTask);
        currentTask.nextId = newTask.id;
        await this.db().save(currentTask);
        return newTask;
    }

    /**
     * Calculates and returns the next due date in a sequence of repeating Tasks.
     *
     * @param task The first Task in a sequence of repeating Tasks.
     * @param i The index in a sequence of repeating Tasks.
     */
    private static calculateNextRepeatingDueDate(
        task: Task,
        i: number
    ): moment.Moment {
        const date: moment.Moment = moment(task.dueDate, moment.ISO_8601, true)
            .startOf('day')
            .utc();

        if (task.repeats === 'daily') {
            date.add(i, 'days');
        } else if (task.repeats === 'weekly') {
            date.add(7 * i, 'days');
        } else if (task.repeats === 'monthly') {
            date.add(i, 'months');
        } else {
            date.add(i, 'years');
        }

        return date;
    }
}
