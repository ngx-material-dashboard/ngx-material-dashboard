import * as cors from 'cors';
import * as express from 'express';
import * as BodyParser from 'body-parser';

import { HttpError, InternalServerError } from 'http-errors';
import { Express, Request, Response, NextFunction } from 'express';

import { Routes } from './routes';
import { AppDataSource } from './data-source';
import { PriorityService } from '../services/priority.service';
import { Priority } from '../entity/priority';

/* The options available for the Server. */
export interface ServerOptions {
    connectionName: string;
    port: number;
}

/**
 * Creates the Express Server, sets up any middleware, and configures TypeORM
 * connection pools.
 */
export class Server {
    /* The database connection name (the name from the ormconfig.json file). */
    public static connectionName: string;
    /* The Express application. */
    private static app: Express;
    /* The port the Server is set up to listen on. */
    private static port: number;

    /**
     * Initializes the server with the given options.
     *
     * @param options The options for the Server.
     */
    public static async init(options: ServerOptions): Promise<Express> {
        if (this.app) return Promise.resolve(this.app);

        this.config();
        // const ormConfig = require(join("..", "..", "ormconfig.json")).find(con => con.name === options.connectionName);

        // create TypeORM connection pools to database
        // return createConnection(ormConfig).then(() => {
        //     this.connectionName = options.connectionName;
        //     return this.app;
        // });
        await AppDataSource.initialize();
        // seed data after datasource initialized
        await this.seed();
        return this.app;
    }

    private static async seed(): Promise<void> {
        console.log('Seed data...');
        const res: any[] = await PriorityService.findAll();
        console.log(res);
        let priorities = res[0];
        console.log(priorities);
        if (priorities.length === 0) {
            // if there aren't any priorities, then add some
            const priorityStrings: string[] = [
                'Low',
                'Medium',
                'High',
                'Urgent'
            ];
            for (let i = 0; i < priorityStrings.length; i++) {
                await PriorityService.save({ value: priorityStrings[i] });
            }

            priorities = (await PriorityService.findAll()).map((res) => res[1]);
            console.log(priorities);
            console.log('Priorities seeded');
        } else {
            console.log('Priorities exist, skipping seed');
        }
    }

    /**
     * Create the Express application, configure the middleware, and set up
     * the routes for the API.
     */
    private static config(): void {
        this.app = express();

        // options for cors midddleware
        const options: cors.CorsOptions = {
            allowedHeaders: [
                'Origin',
                'X-Requested-With',
                'Content-Type',
                'Accept'
            ],
            methods: 'PUT,POST,PATCH,GET,DELETE,OPTIONS',
            origin: ['http://localhost:4200', 'http://localhost:4100'],
            preflightContinue: false
        };

        // use cors middleware
        this.app.use(cors(options));

        // enable pre-flight
        this.app.options('*', cors(options));

        // parse application/json
        this.app.use(BodyParser.json());

        // configure the routes
        const routes: Routes = new Routes(this.app);

        // Handle server errors and return JSON response
        this.app.use(
            (err: any, req: Request, res: Response, next: NextFunction) => {
                if (!res.headersSent) {
                    if (!(err instanceof HttpError)) {
                        // this.logger.error(err);
                        err = new InternalServerError();
                    }
                    res.status(err.statusCode);
                    res.jsonp({ error: err });
                }
                next();
            }
        );
    }
}
