/* type definitions */
import * as moment from 'moment';

/* Today's date. */
const today: moment.Moment = moment().startOf('day').utc();
/* Tomorrow's date. */
const tomorrow: moment.Moment = moment().startOf('day').add(1, 'days').utc();
/* Two days from today. */
const twoDaysFromToday: moment.Moment = moment()
    .startOf('day')
    .add(2, 'days')
    .utc();
/* Yesterday's date. */
const yesterday: moment.Moment = moment()
    .startOf('day')
    .subtract(1, 'days')
    .utc();

/**
 * An array of Tasks which can be used as seed data for tests.
 */
export const TASKS: any[] = [
    {
        name: 'Design DB',
        description: 'Design the database schema',
        dueDate: yesterday.toDate(),
        dateCompleted: yesterday.toDate(),
        isComplete: true,
        priority: 'High'
    },
    {
        name: 'Design UI',
        description: 'Design layout and features',
        dueDate: today.toDate(),
        dateCompleted: today.toDate(),
        isComplete: true,
        priority: 'High'
    },
    {
        name: 'Design API',
        description: 'Design server side API',
        dueDate: tomorrow.toDate(),
        dateCompleted: today.toDate(),
        isComplete: true,
        priority: 'High'
    },
    {
        name: 'Create Angular CLI client',
        description:
            'Create a client side angular application for managing tasks',
        dueDate: twoDaysFromToday.toDate(),
        dateCompleted: today.toDate(),
        isComplete: true,
        priority: 'High'
    },
    {
        name: 'Create Components',
        description: 'Create the UI components and modules for angular app',
        dueDate: twoDaysFromToday.toDate(),
        dateCompleted: today.toDate(),
        isComplete: true,
        priority: 'High'
    },
    {
        name: 'Create Component Unit Tests',
        description: 'Create unit tests with components',
        dueDate: today.toDate(),
        dateCompleted: today.toDate(),
        isComplete: true,
        priority: 'High'
    },
    {
        name: 'Add mocks for data and services',
        description: 'Add mocked data and services for use in karma tests',
        dueDate: today.toDate(),
        dateCompleted: today.toDate(),
        isComplete: true,
        priority: 'High'
    },
    {
        name: 'Create Services',
        description:
            'Create the services required to share data between components',
        dueDate: today.toDate(),
        dateCompleted: today.toDate(),
        isComplete: true,
        priority: 'High'
    },
    {
        name: 'Create Service Unit Tests',
        description: 'Create unit tests with services',
        dueDate: today.toDate(),
        dateCompleted: today.toDate(),
        isComplete: true,
        priority: 'High'
    },
    {
        name: 'Create Express API Server',
        description: 'Create a server side API for managing tasks in the DB',
        dueDate: today.toDate(),
        dateCompleted: today.toDate(),
        isComplete: true,
        priority: 'Medium'
    },
    {
        name: 'Create Controllers',
        description: 'Create controllers for handling API requests',
        dueDate: today.toDate(),
        dateCompleted: today.toDate(),
        isComplete: true,
        priority: 'Medium'
    },
    {
        name: 'Create Controller Unit Tests',
        description: 'Create unit tests with controllers',
        dueDate: today.toDate(),
        dateCompleted: today.toDate(),
        isComplete: true,
        priority: 'Medium'
    },
    {
        name: 'Add Routes',
        description: 'Add routes to API controllers',
        dueDate: today.toDate(),
        dateCompleted: today.toDate(),
        isComplete: true,
        priority: 'Medium'
    },
    {
        name: 'Create Services',
        description:
            'Create services for handling business logic with API requests',
        dueDate: today.toDate(),
        dateCompleted: today.toDate(),
        isComplete: true,
        priority: 'Medium'
    },
    {
        name: 'Add TypeORM',
        description: 'Add TypeORM library to handle connecting to database',
        dueDate: yesterday.toDate(),
        dateCompleted: null,
        isComplete: false,
        priority: 'Low'
    },
    {
        name: 'Create Service Unit Tests',
        description: 'Create unit tests with services',
        dueDate: today.toDate(),
        dateCompleted: null,
        isComplete: false,
        priority: 'Medium'
    },
    {
        name: 'Add Bootstrap',
        description:
            'Add class to bootstrap the server and all required middleware',
        dueDate: today.toDate(),
        dateCompleted: null,
        isComplete: false,
        priority: 'Medium'
    },
    {
        name: 'Full Stack Scripts',
        description: 'Add package to run multiple scripts at the same time',
        dueDate: tomorrow.toDate(),
        dateCompleted: null,
        isComplete: false,
        priority: 'Medium'
    },
    {
        name: 'All unit tests script',
        description: 'Add script to run server and client unit tests',
        dueDate: tomorrow.toDate(),
        dateCompleted: null,
        isComplete: false,
        priority: 'High'
    },
    {
        name: 'Add mocks for data',
        description: 'Add mocked data for use in mocha tests',
        dueDate: tomorrow.toDate(),
        dateCompleted: null,
        isComplete: false,
        priority: 'High'
    },
    {
        name: 'e2e tests',
        description: 'Add e2e tests',
        dueDate: twoDaysFromToday.toDate(),
        dateCompleted: null,
        isComplete: false,
        priority: 'High'
    },
    {
        name: 'Compodoc',
        description:
            'Add compodoc to generate documentation for angular client',
        dueDate: twoDaysFromToday.toDate(),
        dateCompleted: null,
        isComplete: false,
        priority: 'Low'
    },
    {
        name: 'apiDoc',
        description: 'Add apiDoc to generate documentation for web API',
        dueDate: twoDaysFromToday.toDate(),
        dateCompleted: null,
        isComplete: false,
        priority: 'Low'
    },
    {
        name: 'Docker',
        description:
            'Add Docker files to generate images for client and server containers',
        dueDate: twoDaysFromToday.toDate(),
        dateCompleted: null,
        isComplete: false,
        priority: 'Low'
    },
    {
        name: 'Compose Files',
        description:
            'Add compose file to define services, networks, and volumes for client and server containers',
        dueDate: twoDaysFromToday.toDate(),
        dateCompleted: null,
        isComplete: false,
        priority: 'Low'
    },
    {
        name: 'Date format MM/D/YYYY',
        description: 'Add task with valid due date in format MM/D/YYYY',
        dueDate: moment('10/1/2018', 'MM/D/YYYY', true)
            .startOf('day')
            .utc()
            .toDate(),
        dateCompleted: null,
        isComplete: false,
        priority: 'Medium'
    },
    {
        name: 'Date format M/DD/YYYY',
        description: 'Add task with valid due date in format M/DD/YYYY',
        dueDate: moment('1/10/2019', 'M/DD/YYYY', true)
            .startOf('day')
            .utc()
            .toDate(),
        dateCompleted: null,
        isComplete: false,
        priority: 'Medium'
    },
    {
        name: 'Date format M/D/YYYY',
        description: 'Add task with valid due date in format M/D/YYYY',
        dueDate: moment('1/1/2019', 'M/D/YYYY', true)
            .startOf('day')
            .utc()
            .toDate(),
        dateCompleted: null,
        isComplete: false,
        priority: 'Medium'
    }
];
