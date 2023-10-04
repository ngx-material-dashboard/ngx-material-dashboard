import 'reflect-metadata';
import * as supertest from 'supertest';
import { SuperTest, Test } from 'supertest';

import { Server, ServerOptions } from '../src/conf/bootstrap';

// Application options for test environment
const options: ServerOptions = {
    connectionName: 'in-memory-db',
    port: 3000
};

export function getTestApp(): Promise<SuperTest<Test>> {
    return Server.init(options)
        .then((app) => {
            return supertest(app);
        })
        .catch((exception) => {
            console.log('Server(test): Error starting test app');
            console.log('Server(test): ' + exception);
            return null;
        });
}
