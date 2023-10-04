/* 3rd party libraries. */
import { Application } from 'express';

/* app controllers */
import { TaskController } from '../controllers/task.controller';
import { PriorityController } from '../controllers/priority.controller';

/**
 * Router Middleware.
 */
export class Routes {
    /* The controller for managing Priorities. */
    priorityController: PriorityController = new PriorityController();
    /* The controller for managing Tasks. */
    taskController: TaskController = new TaskController();

    /**
     * Defines the main HTTP routes and request handlers for the application.
     *
     * @param app The Express application to add the routes to.
     */
    constructor(app: Application) {
        // priority routes
        app.route('/api/priorities').get(this.priorityController.findAll);
        app.route('/api/priorities').post(this.priorityController.save);

        // task routes
        app.route('/api/tasks').get(this.taskController.list);
        app.route('/api/tasks').patch(this.taskController.update);
        app.route('/api/tasks').post(this.taskController.save);
        app.route('/api/tasks/:id').delete(this.taskController.delete);
        app.route('/api/tasks/:id').get(this.taskController.show);
        app.route('/api/tasks/:id').patch(this.taskController.update);
    }
}
