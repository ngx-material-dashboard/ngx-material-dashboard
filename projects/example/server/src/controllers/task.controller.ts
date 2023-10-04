/* 3rd party libraries */
import { NextFunction, Request, Response } from 'express';

/* app classes */
import { Task } from '../entity/task';
import { TaskSearch } from '../interfaces/task-search.interface';
import { TaskService } from '../services/task.service';

/**
 * API Controller to handle HTTP requests for Tasks.
 */
export class TaskController {
    constructor() {}

    /**
     * @apiDefine TaskNotFoundResponse
     *
     * @apiError (Error 404) error
     * @apiError (Error 404) error.message "NotFound" when the id(s) included in request are not found.
     *
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 404 NotFound
     *      {
     *          "error": {
     *              "message": "NotFound"
     *          }
     *      }
     */

    /**
     * @apiDefine TaskBadRequestResponse
     *
     * @apiError (Error 400) error
     * @apiError (Error 400) error.message The error message.
     *
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 400 BadRequest
     *      {
     *          "error": {
     *              "message": "..."
     *          }
     *      }
     */

    /**
     * @apiDefine TaskSuccessExample
     * 
     * @apiSuccess {Number} id          The Tasks unique ID.
     * @apiSuccess {String} name        The name of the Task.
     * @apiSuccess {String} description The description of the Task.

     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *      {
     *          "id": 1,
     *          "name": "Task",
     *          "description": "A description"
     *      } 
     */

    /**
     * @apiDefine TaskRequestExample
     *
     * @apiParamExample {json} Request-Example:
     *      {
     *          "name": "Task",
     *          "description": "A description"
     *      }
     */

    /**
     * @api {delete} /api/tasks/:id Delete Task
     * @apiVersion 0.0.1
     * @apiName Delete
     * @apiDescription Delete a task with the given id
     * @apiGroup Task
     * @apiParam {Number} id The Tasks unique ID.
     * @apiUse TaskSuccessExample
     * @apiUse TaskNotFoundResponse
     *
     * @param req The HTTP request object.
     * @param res The HTTP response object.
     * @param next The next middleware function in the applications request-response cycle.
     */
    delete(req: Request, res: Response, next: NextFunction) {
        return TaskService.delete(parseInt(req.params['id'], 10))
            .then((task: Task) => {
                return res.json();
            })
            .then(next, next);
    }

    /**
     * @api {get} /api/tasks List Tasks
     * @apiVersion 0.0.1
     * @apiDescription Gets an array and count of Tasks that match the
     * isComplete and filter query parameters. The results can be paged
     * through when using pageNumber and pageSize parameters. The full results
     * can be returned if pageSize parameter of -1 is used.
     * @apiGroup Task
     *
     * @apiParam {Boolean}  [filter][isComplete=false]  Boolean to query for complete or incomplete Tasks with default false or incomplete.
     * @apiParam {String}   [filter][filter=""]         Filter to query Tasks on with default "" (can filter on any Task property other than isComplete).
     * @apiParam {String}   [sort="dueDate"]    Column of Task to sort on with default "dueDate".
     * @apiParam {String}   [order="ASC"]       Order for results with default "ASC".
     * @apiParam {Number}   [pageNumber=0]      Page of results to return with default 0.
     * @apiParam {Number}   [pageSize=20]       Number of results to return with default 20.
     *
     * @apiExample {curl} Example usage:
     *      curl -i http://localhost:3000/api/tasks
     *      curl -i http://localhost:3000/api/tasks?isComplete=false
     *      curl -i http://localhost:3000/api/tasks?isComplete=false&filter=overdue
     *      curl -i http://localhost:3000/api/tasks?isComplete=false&filter=overdue&sort=name
     *      curl -i http://localhost:3000/api/tasks?isComplete=false&filter=overdue&sort=name&order=DESC
     *      curl -i http://localhost:3000/api/tasks?isComplete=false&filter=overdue&sort=name&order=DESC&pageNumber=1
     *      curl -i http://localhost:3000/api/tasks?isComplete=false&filter=overdue&sort=name&order=DESC&pageNumber=1&pageSize=10
     *
     * @apiSuccess {Object} meta            The meta information.
     * @apiSuccess {Number} meta.total      The total number of results.
     * @apiSuccess {Number} meta.totalPages The total number of pages of results.
     * @apiSuccess {Task[]} data            List of Tasks.
     *
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *      {
     *          "meta": {
     *              "total": 10
     *              "totalPages": "1"
     *          },
     *          "data": [
     *              {
     *                  "id": 1,
     *                  "name": "Task",
     *                  "description": "A description",
     *                  "dueDate": "2018-06-23"
     *              }
     *              ...
     *          ]
     *      }
     *
     * @param req The HTTP request object.
     * @param res The HTTP response object.
     * @param next The next middleware function in the applications request-response cycle.
     */
    list(req: Request, res: Response, next: NextFunction) {
        try {
            // parse the pageNumber and size from the query parameters
            const pageNumber: number = req.query['page']
                ? parseInt(req.query['page']?.toString(), 10)
                : 0;
            const pageSize: number = req.query['page_size']
                ? parseInt(req.query['page_size']?.toString(), 10)
                : 25;

            // define the boolean value that will be used to filter the Tasks
            let isComplete: boolean;
            if (
                req.query['filter'] &&
                req.query['filter']['isComplete'] == 'true'
            ) {
                // set isComplete to true if the query parameter is true
                isComplete = true;
            } else {
                // otherwise default to false
                isComplete = false;
            }

            // create the TaskSearch filter based on query parameters; got to be a
            // better way to do this...
            let filter: TaskSearch;
            if (req.query['filter']) {
                filter = {
                    name: req.query['filter']['name'],
                    description: req.query['filter']['description'],
                    dueDate: req.query['filter']['dueDate'],
                    dateCompleted: req.query['filter']['dateCompleted'],
                    priority: req.query['filter']['priority'],
                    special: req.query['filter']['special']
                };
            } else {
                filter = {
                    name: undefined,
                    description: undefined,
                    dueDate: undefined,
                    dateCompleted: undefined,
                    priority: undefined,
                    special: undefined
                };
            }

            // run the filter and return the results as JSON
            const order =
                req.query['order']?.toString().toUpperCase() === 'DESC'
                    ? 'DESC'
                    : 'ASC';
            return TaskService.list(
                isComplete,
                filter,
                req.query['sort']?.toString(),
                order,
                pageNumber,
                pageSize
            ).then(([tasks, total]) => {
                return res.json({
                    meta: {
                        total: total,
                        totalPages: Math.ceil(total / pageSize)
                    },
                    data: tasks
                });
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    /**
     * @api {post} /api/tasks Save Task
     * @apiVersion 0.0.1
     * @apiDescription Creates a Task and returns the resulting JSON.
     * @apiGroup Task
     * @apiUse TaskRequestExample
     * @apiUse TaskSuccessExample
     *
     * @param req The HTTP request object.
     * @param res The HTTP response object.
     * @param next The next middleware function in the applications request-response cycle.
     */
    save(req: Request, res: Response, next: NextFunction) {
        return TaskService.save(req.body)
            .then((task: Task) => {
                return res.json(task);
            })
            .then(next, next);
    }

    /**
     * @api {get} /api/tasks/:id Get Task
     * @apiVersion 0.0.1
     * @apiDescription Gets the Task with the given 'id' and returns the resulting JSON.
     * @apiGroup Task
     * @apiParam {Number} id The Tasks unique ID.
     * @apiUse TaskSuccessExample
     * @apiUse TaskNotFoundResponse
     *
     * @param req The HTTP request object.
     * @param res The HTTP response object.
     * @param next The next middleware function in the applications request-response cycle.
     */
    show(req: Request, res: Response, next: NextFunction) {
        return TaskService.getById(parseInt(req.params['id']))
            .then((task: Task) => {
                return res.json(task);
            })
            .then(next, next);
    }

    /**
     * @api {patch} /api/tasks/:id Update Task
     * @apiVersion 0.0.1
     * @apiDescription Updates the Task with the given 'id' and returns the resulting JSON.
     * If a Task is a repeating Task, then it and all remaining Tasks can be updated
     * when the updateAll=true query param is included in the request.
     *
     * @apiGroup Task
     * @apiParam {Number} id The Tasks unique ID.
     * @apiParam {String} [updateAll] Boolean to indicate if all remaining Tasks in repeating sequence should be updated.
     *
     * @apiParamExample {json} Request-Example:
     *      {
     *          "meta": {
     *              "transition": "update"
     *          },
     *          "data": {
     *              "properties": {
     *                  "id": 1,
     *                  "name": "Task",
     *                  "description": "A description",
     *                  "dueDate": "2018-06-23"
     *              }
     *          }
     *      }
     * @apiUse TaskSuccessExample
     * @apiUse TaskNotFoundResponse
     */
    /**
     * @api {patch} /api/tasks/:id Complete Task
     * @apiName Complete Task
     * @apiVersion 0.0.1
     * @apiDescription Completes the Task with the given 'id' and returns the resulting JSON.
     *
     * @apiGroup Task
     * @apiParam {Number} id The Tasks unique ID. Not required when completing list of Tasks.
     *
     * @apiParamExample {json} Request-Example:
     *      {
     *          "meta": {
     *              "transition": "complete"
     *          },
     *          "data": {
     *              "properties": {
     *                  "dateCompleted": "2018-06-23"
     *              }
     *          }
     *      }
     *
     * @apiUse TaskNotFoundResponse
     */
    /**
     * @api {patch} /api/tasks/:id Complete Tasks
     * @apiName Complete Tasks
     * @apiVersion 0.0.1
     * @apiDescription Completes the Tasks with the given 'ids' in the
     * body and returns the resulting JSON. Allows for bulk completion.
     * @apiGroup Task
     * @apiParamExample {json} Request-Example:
     *      {
     *          "meta": {
     *              "transition": "complete"
     *          },
     *          "data": {
     *              "properties": {
     *                  "dateCompleted": "2018-06-23"
     *              },
     *              "ids": [1, 2, 3]
     *          }
     *      }
     *
     * @apiSuccess {Task[]} task             A Task.
     * @apiSuccess {Number} task.id          The Tasks unique ID.
     * @apiSuccess {String} task.name        The name of the Task.
     * @apiSuccess {String} task.description The description of the Task.
     *
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *      [{
     *          "id": 1,
     *          "name": "Task",
     *          "description": "A description"
     *      },{
     *          "id": 2,
     *          "name": "Task",
     *          "description": "A description"
     *      },{
     *          "id": 1,
     *          "name": "Task",
     *          "description": "A description"
     *      }]
     *
     * @apiUse TaskNotFoundResponse
     *
     * @param req The HTTP request object.
     * @param res The HTTP response object.
     * @param next The next middleware function in the applications request-response cycle.
     */
    update(req: Request, res: Response, next: NextFunction) {
        if (req.body.meta && req.body.meta.transition == 'complete') {
            if (req.params.id == null) {
                return TaskService.completeAll(req.body.data.ids, req.body.data)
                    .then((tasks: Task[]) => {
                        return res.json(tasks);
                    })
                    .then(next, next);
            } else {
                return TaskService.complete(
                    parseInt(req.params['id']),
                    req.body.data
                )
                    .then((task: Task) => {
                        return res.json(task);
                    })
                    .then(next, next);
            }
        } else {
            const properties: Partial<Task> = req.body.data
                ? req.body.data
                : {};
            let updateAll: boolean;
            if (req.query.updateAll === 'true') {
                updateAll = true;
            } else {
                updateAll = false;
            }

            return TaskService.update(
                parseInt(req.params['id']),
                properties,
                updateAll
            )
                .then((task: Task) => {
                    return res.json(task);
                })
                .then(next, next);
        }
    }
}
