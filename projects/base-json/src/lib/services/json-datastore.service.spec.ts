import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { parseISO } from 'date-fns';

import { API_VERSION, BASE_URL, Datastore } from '../../../test/services/datastore.service';
import { API_VERSION_FROM_CONFIG, BASE_URL_FROM_CONFIG, DatastoreWithConfig } from '../../../test/services/datastore-with-config.service';
import { Task } from '../../../test/models/task.model';
import { getTaskData, TASK_DESCRIPTION, TASK_DUE_DATE, TASK_ID, TASK_NAME } from '../../../test/fixtures/task.fixture';
import { CustomTask, TASK_API_VERSION, TASK_MODEL_ENDPOINT_URL } from '../../../test/models/custom-task.model';
import { ModelConfig } from '../interfaces/model-config.interface';
import { ErrorResponse, JsonApiQueryData } from '../models';

describe('JsonDatastoreService', () => {

    let datastore: Datastore;
    let datastoreWithConfig: DatastoreWithConfig;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                {
                    provide: Datastore,
                    deps: [HttpClient]
                },
                {
                    provide: DatastoreWithConfig,
                    deps: [HttpClient]
                }
            ]
        });

        datastore = TestBed.inject(Datastore);
        datastoreWithConfig = TestBed.inject(DatastoreWithConfig);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('query', () => {

        it('should build basic url and apiVersion from the config variable if exists', () => {
            const taskModelConfig: ModelConfig = Reflect.getMetadata('JsonApiModelConfig', Task);
            const expectedUrl = `${BASE_URL_FROM_CONFIG}/${API_VERSION_FROM_CONFIG}/${taskModelConfig.type}`;
    
            datastoreWithConfig.findAll(Task).subscribe();
    
            const queryRequest = httpMock.expectOne({method: 'GET', url: expectedUrl});
            queryRequest.flush({data: []});
            expect(queryRequest.request.url).toBe(expectedUrl);
            httpMock.verify();
        });

        // tslint:disable-next-line:max-line-length
        it('should use apiVersion and modelEnpointUrl from the model instead of datastore if model has apiVersion and/or modelEndpointUrl specified', () => {
            // const taskModelConfig: ModelConfig = Reflect.getMetadata('JsonApiModelConfig', CustomTask);
            const expectedUrl = `${BASE_URL_FROM_CONFIG}/${TASK_API_VERSION}/${TASK_MODEL_ENDPOINT_URL}`;
    
            datastoreWithConfig.findAll(CustomTask).subscribe();
    
            const queryRequest = httpMock.expectOne({method: 'GET', url: expectedUrl});
            queryRequest.flush({data: []});
            expect(queryRequest.request.url).toBe(expectedUrl);
            httpMock.verify();
        });

        it('should build basic url from the data from datastore decorator', () => {
            const taskModelConfig: ModelConfig = Reflect.getMetadata('JsonApiModelConfig', Task);
            const expectedUrl = `${BASE_URL}/${API_VERSION}/${taskModelConfig.type}`;

            datastore.findAll(Task).subscribe();

            const queryRequest = httpMock.expectOne({method: 'GET', url: expectedUrl});
            queryRequest.flush({data: []});
            expect(queryRequest.request.url).toBe(expectedUrl);
            httpMock.verify();
        });

        it('should set JSON API headers', () => {
            const expectedUrl = `${BASE_URL}/${API_VERSION}/tasks`;
    
            datastore.findAll(Task).subscribe();
    
            const queryRequest = httpMock.expectOne({method: 'GET', url: expectedUrl});
            expect(queryRequest.request.headers.get('Content-Type')).toEqual('application/json');
            expect(queryRequest.request.headers.get('Accept')).toEqual('application/json');
            queryRequest.flush({data: []});
            expect(queryRequest.request.url).toBe(expectedUrl);
            httpMock.verify();
        });

        it('should build url with nested params', () => {
            const queryData = {
                page: {
                    size: 10, number: 1
                },
                include: 'comments',
                filter: {
                    title: {
                        keyword: 'Tolkien'
                    }
                }
            };

            // tslint:disable-next-line:prefer-template
            const expectedUrl = `${BASE_URL}/${API_VERSION}/` + 'tasks?' +
                encodeURIComponent('page[size]') + '=10&' +
                encodeURIComponent('page[number]') + '=1&' +
                encodeURIComponent('include') + '=comments&' +
                encodeURIComponent('filter[title][keyword]') + '=Tolkien';

            datastore.findAll(Task, queryData).subscribe();

            httpMock.expectNone(`${BASE_URL}/${API_VERSION}`);
            const queryRequest = httpMock.expectOne({method: 'GET', url: expectedUrl});
            queryRequest.flush({data: []});
            expect(queryRequest.request.url).toBe(expectedUrl);
            httpMock.verify();
        });

        it('should have custom headers', () => {
            const expectedUrl = `${BASE_URL}/${API_VERSION}/tasks`;

            datastore.findAll(Task, null, new HttpHeaders({Authorization: 'Bearer'})).subscribe();

            const queryRequest = httpMock.expectOne({method: 'GET', url: expectedUrl});
            expect(queryRequest.request.headers.get('Authorization')).toEqual('Bearer');
            queryRequest.flush({data: []});
            httpMock.verify();
        });

        it('should override base headers', () => {
            const expectedUrl = `${BASE_URL}/${API_VERSION}/tasks`;

            datastore.headers = new HttpHeaders({Authorization: 'Bearer'});
            datastore.findAll(Task, null, new HttpHeaders({Authorization: 'Basic'})).subscribe();

            const queryRequest = httpMock.expectOne({method: 'GET', url: expectedUrl});
            expect(queryRequest.request.headers.get('Authorization')).toEqual('Basic');
            queryRequest.flush({data: []});
            httpMock.verify();
        });

        it('should get tasks', () => {
            const expectedUrl = `${BASE_URL}/${API_VERSION}/tasks`;

            datastore.findAll(Task).subscribe((data: JsonApiQueryData<Task>) => {
                const tasks = data.getModels();
                expect(tasks).toBeDefined();
                expect(tasks.length).toEqual(1);
                expect(tasks[0].id).toEqual(TASK_ID);
                expect(tasks[0].name).toEqual(TASK_NAME);
                expect(tasks[1]).toBeUndefined();
            });

            const queryRequest = httpMock.expectOne(expectedUrl);
            queryRequest.flush({data: [getTaskData()]});
            httpMock.verify();
        });

        it('should get tasks with custom metadata', () => {
            const expectedUrl = `${BASE_URL}/${TASK_API_VERSION}/${TASK_MODEL_ENDPOINT_URL}`;

            datastore.findAll(CustomTask).subscribe((document) => {
                expect(document).toBeDefined();
                expect(document.getModels().length).toEqual(1);
                expect(document.getMeta().meta.page.number).toEqual(1);
            });

            const findAllRequest = httpMock.expectOne(expectedUrl);
            findAllRequest.flush({
                data: [getTaskData()],
                meta: {
                    page: {
                        number: 1,
                        size: 1,
                        total: 1,
                        last: 1
                    }
                }
            });
            httpMock.verify();
        });

        // it('should get data with default metadata', () => {
        //     const expectedUrl = `${BASE_URL}/${API_VERSION}/books`;

        //     datastore.findAll(Book).subscribe((document) => {
        //         expect(document).toBeDefined();
        //         expect(document.getModels().length).toEqual(1);
        //         expect(document.getMeta().links[0]).toEqual('http://www.example.org');
        //     });

        //     const findAllRequest = httpMock.expectOne(expectedUrl);
        //     findAllRequest.flush({
        //         data: [getSampleBook(1, '1')],
        //         links: ['http://www.example.org']
        //     });
        // });

        it('should fire error', () => {
            const expectedUrl = `${BASE_URL}/${API_VERSION}/tasks`;
            const dummyResponse = {
                errors: [
                    {
                        code: '100',
                        title: 'Example error',
                        detail: 'detailed error Message'
                    }
                ]
            };

            datastore.findAll(Task).subscribe({
                next: (tasks) => fail('onNext has been called'),
                error: (response) => {
                    expect(response).toEqual(jasmine.any(ErrorResponse));
                    expect(response.errors.length).toEqual(1);
                    expect(response.errors[0].code).toEqual(dummyResponse.errors[0].code);
                    expect(response.errors[0].title).toEqual(dummyResponse.errors[0].title);
                    expect(response.errors[0].detail).toEqual(dummyResponse.errors[0].detail);
                },
                complete: () => fail('onCompleted has been called')
            });

            const queryRequest = httpMock.expectOne(expectedUrl);
            queryRequest.flush(dummyResponse, {status: 500, statusText: 'Internal Server Error'});
            httpMock.verify();
        });

        it('should generate correct query string for array params with findAll', () => {
            const expectedQueryString = 'arrayParam[]=4&arrayParam[]=5&arrayParam[]=6';
            const expectedUrl = encodeURI(`${BASE_URL}/${API_VERSION}/tasks?${expectedQueryString}`);

            datastore.findAll(Task, {arrayParam: [4, 5, 6]}).subscribe();

            const findAllRequest = httpMock.expectOne(expectedUrl);
            findAllRequest.flush({data: []});
            expect(findAllRequest.request.url).toBe(expectedUrl);
            httpMock.verify();
        });

        it('should generate correct query string for array params with query', () => {
            const expectedQueryString = 'arrayParam[]=4&arrayParam[]=5&arrayParam[]=6';
            const expectedUrl = encodeURI(`${BASE_URL}/${API_VERSION}/tasks?${expectedQueryString}`);

            datastore.findAll(Task, {arrayParam: [4, 5, 6]}).subscribe();

            const queryRequest = httpMock.expectOne(expectedUrl);
            queryRequest.flush({data: []});
            expect(queryRequest.request.url).toBe(expectedUrl);
            httpMock.verify();
        });

        it('should generate correct query string for nested params with findAll', () => {
            const expectedQueryString = 'filter[text]=test123';
            const expectedUrl = encodeURI(`${BASE_URL}/${API_VERSION}/tasks?${expectedQueryString}`);

            datastore.findAll(Task, {filter: {text: 'test123'}}).subscribe();

            const findAllRequest = httpMock.expectOne(expectedUrl);
            findAllRequest.flush({data: []});
            expect(findAllRequest.request.url).toBe(expectedUrl);
            httpMock.verify();
        });

        it('should generate correct query string for nested array params with findAll', () => {
            const expectedQueryString = 'filter[text][]=1&filter[text][]=2';
            const expectedUrl = encodeURI(`${BASE_URL}/${API_VERSION}/tasks?${expectedQueryString}`);

            datastore.findAll(Task, {filter: {text: [1, 2]}}).subscribe();

            const findAllRequest = httpMock.expectOne(expectedUrl);
            findAllRequest.flush({data: []});
            expect(findAllRequest.request.url).toBe(expectedUrl);
            httpMock.verify();
        });
    });

    describe('findRecord', () => {

        // beforeEach(() => {
        //     datastore = new Datastore(TestBed.inject(HttpClient));
        //     httpMock = TestBed.inject(HttpTestingController);
        // });

        it('should get task', () => {
            const expectedUrl = `${BASE_URL}/${API_VERSION}/tasks/${TASK_ID}`;

            datastore.findRecord(Task, TASK_ID).subscribe((task) => {
                expect(task).toBeDefined();
                expect(task.id).toBe(TASK_ID);
                expect(task.dueDate).toEqual(parseISO(TASK_DUE_DATE));
            });

            const findRecordRequest = httpMock.expectOne(expectedUrl);
            findRecordRequest.flush(getTaskData());
            expect(findRecordRequest.request.url).toBe(expectedUrl);
            httpMock.verify();
        });

        it('should generate correct query string for array params with findRecord', () => {
            const expectedQueryString = 'arrayParam[]=4&arrayParam[]=5&arrayParam[]=6';
            const expectedUrl = encodeURI(`${BASE_URL}/${API_VERSION}/tasks/1?${expectedQueryString}`);

            datastore.findRecord(Task, '1', {arrayParam: [4, 5, 6]}).subscribe();

            const findRecordRequest = httpMock.expectOne(expectedUrl);
            findRecordRequest.flush(getTaskData());
            expect(findRecordRequest.request.url).toBe(expectedUrl);
            httpMock.verify();
        });
    });

    describe('saveRecord', () => {

        it('should create new task', () => {
            const expectedUrl = `${BASE_URL}/${API_VERSION}/tasks`;
            const task = datastore.createRecord(Task, {
                name: TASK_NAME,
                description: TASK_DESCRIPTION,
                dueDate: parseISO(TASK_DUE_DATE)
            });

            task.save().subscribe((val) => {
                expect(val.id).toBeDefined();
                expect(val.id).toEqual(TASK_ID);
            });

            httpMock.expectNone(`${BASE_URL}/${API_VERSION}`);
            const saveRequest = httpMock.expectOne({method: 'POST', url: expectedUrl});
            const obj = saveRequest.request.body;
            expect(obj.name).toEqual(TASK_NAME);
            expect(obj.description).toEqual(TASK_DESCRIPTION);
            expect(obj.dueDate).toEqual(parseISO(TASK_DUE_DATE).toISOString());
            expect(obj.id).toBeUndefined();

            saveRequest.flush({
                id: TASK_ID,
                name: TASK_NAME,
                description: TASK_DESCRIPTION,
                dueDate: TASK_DUE_DATE
            }, {status: 201, statusText: 'Created'});
            httpMock.verify();
        });

        it('should throw error on new task with 201 response but no body', () => {
            const expectedUrl = `${BASE_URL}/${API_VERSION}/tasks`;
            const task = datastore.createRecord(Task, {
                name: TASK_NAME
            });

            task.save().subscribe({
                next: () => fail('should throw error'),
                error: (error) => expect(error).toEqual(new Error('no body in response'))
            });

            const saveRequest = httpMock.expectOne({method: 'POST', url: expectedUrl});
            saveRequest.flush(null, {status: 201, statusText: 'Created'});
            httpMock.verify();
        });

        it('should create new task with 204 response', () => {
            const expectedUrl = `${BASE_URL}/${API_VERSION}/tasks`;
            const task = datastore.createRecord(Task, {
                name: TASK_NAME
            });

            task.save().subscribe((val) => {
                expect(val).toBeDefined();
            });

            const saveRequest = httpMock.expectOne({method: 'POST', url: expectedUrl});
            saveRequest.flush(null, {status: 204, statusText: 'No Content'});
            httpMock.verify();
        });
    });

    describe('updateRecord', () => {

        it('should update task with 200 response (no data)', () => {
            const expectedUrl = `${BASE_URL}/${API_VERSION}/tasks/${TASK_ID}`;
            const task = new Task(datastore, {
                id: TASK_ID,
                // date_of_birth: parseISO(TASK_BIRTH),
                name: TASK_NAME
            });
            task.name = 'Rowling';
            // task.date_of_birth = parseISO('1965-07-31');

            task.save().subscribe((val) => {
                expect(val.name).toEqual(task.name);
            });

            httpMock.expectNone(`${BASE_URL}/${API_VERSION}/tasks`);
            const saveRequest = httpMock.expectOne({method: 'PATCH', url: expectedUrl});
            const obj = saveRequest.request.body;
            expect(obj.name).toEqual('Rowling');
            // expect(obj.dob).toEqual(parseISO('1965-07-31').toISOString());
            expect(obj.id).toBe(TASK_ID);
            // expect(obj.relationships).toBeUndefined();

            saveRequest.flush({});
            httpMock.verify();
        });

        it('should update task with 204 response', () => {
            const expectedUrl = `${BASE_URL}/${API_VERSION}/tasks/${TASK_ID}`;
            const task = new Task(datastore, {
                id: TASK_ID,
                // date_of_birth: parseISO(TASK_BIRTH),
                name: TASK_NAME
            });
            task.name = 'Rowling';
            // task.date_of_birth = parseISO('1965-07-31');

            task.save().subscribe((val) => {
                expect(val.name).toEqual(task.name);
            });

            httpMock.expectNone(`${BASE_URL}/${API_VERSION}/tasks`);
            const saveRequest = httpMock.expectOne({method: 'PATCH', url: expectedUrl});
            const obj = saveRequest.request.body;
            expect(obj.name).toEqual('Rowling');
            // expect(obj.dob).toEqual(parseISO('1965-07-31').toISOString());
            expect(obj.id).toBe(TASK_ID);
            // expect(obj.relationships).toBeUndefined();

            saveRequest.flush(null, {status: 204, statusText: 'No Content'});
            httpMock.verify();
        });

        it('should integrate server updates on 200 response', () => {
            const expectedUrl = `${BASE_URL}/${API_VERSION}/tasks/${TASK_ID}`;
            const task = new Task(datastore, {
                id: TASK_ID,
                //date_of_birth: parseISO(TASK_BIRTH),
                name: TASK_NAME
            });
            task.name = 'Rowling';
            //task.date_of_birth = parseISO('1965-07-31');

            task.save().subscribe((val) => {
                expect(val.name).toEqual('Potter');
            });

            httpMock.expectNone(`${BASE_URL}/${API_VERSION}/tasks`);
            const saveRequest = httpMock.expectOne({method: 'PATCH', url: expectedUrl});
            const obj = saveRequest.request.body;
            expect(obj.name).toEqual('Rowling');
            //expect(obj.dob).toEqual(parseISO('1965-07-31').toISOString());
            expect(obj.id).toBe(TASK_ID);
            // expect(obj.relationships).toBeUndefined();

            saveRequest.flush({
                id: obj.id,
                name: 'Potter'
            });
            httpMock.verify();
        });
    });
});
