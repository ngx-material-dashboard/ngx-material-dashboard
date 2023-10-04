import { DataSource } from 'typeorm';
import { Priority } from '../entity/priority';
import { Task } from '../entity/task';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: '../data/tasks.sq3',
    synchronize: true,
    logging: true,
    entities: [Priority, Task],
    subscribers: []
});
