import { Injectable } from '@angular/core';
import { Task } from '../../../shared/models/task.model';
import { JsonApiService } from '../../../shared/services/json-api.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    readonly pendingTasks: Observable<Array<Task>>;
    /** An Observable for the number of pending Tasks. */
    readonly numPendingTasks: Observable<number>;
    /** An Observable for the number of Tasks due today (updates when corresponding source changes). */
    readonly numTasksDueToday: Observable<number>;
    /** An Observable for the number of Tasks due tomorrow (updates when corresponding source changes). */
    readonly numTasksDueTomorrow: Observable<number>;
    /** An Observable for the number of over due Tasks (updates when corresponding source changes). */
    readonly numTasksOverDue: Observable<number>;
    protected pendingTasksSource: BehaviorSubject<Array<Task>>;
    /** Tracks the number of pending Tasks. */
    protected numPendingTasksSource: BehaviorSubject<number>;
    /** Tracks the number of Tasks due today. */
    protected numTasksDueTodaySource: BehaviorSubject<number>;
    /** Tracks the number of Tasks due tomorrow. */
    protected numTasksDueTomorrowSource: BehaviorSubject<number>;
    /** Tracks the number of Tasks over due. */
    protected numTasksOverDueSource: BehaviorSubject<number>;

    constructor(private jsonDatastore: JsonApiService) {
        this.numPendingTasksSource = new BehaviorSubject(0);
        this.numTasksDueTodaySource = new BehaviorSubject(0);
        this.numTasksDueTomorrowSource = new BehaviorSubject(0);
        this.numTasksOverDueSource = new BehaviorSubject(0);

        this.numPendingTasks = this.numPendingTasksSource.asObservable();
        this.numTasksDueToday = this.numTasksDueTodaySource.asObservable();
        this.numTasksDueTomorrow =
            this.numTasksDueTomorrowSource.asObservable();
        this.numTasksOverDue = this.numTasksOverDueSource.asObservable();

        this.pendingTasksSource = new BehaviorSubject(new Array<Task>());
        this.pendingTasks = this.pendingTasksSource.asObservable();
    }

    setPendingTasks(tasks: Task[]) {
        this.pendingTasksSource.next(tasks);
    }

    initNumTasks(): void {
        this.initNumPendingTasks();
        this.initNumTasksDueToday();
        this.initNumTasksDueTomorrow();
        this.initNumTasksOverDue();
    }

    initNumPendingTasks(): void {
        this.loadTasks({ isComplete: false }).subscribe((res) => {
            this.numPendingTasksSource.next(res.getMeta().meta.total);
        });
    }

    initNumTasksOverDue(): void {
        this.loadTasks({ isComplete: false, special: 'overdue' }).subscribe(
            (res) => {
                this.numTasksOverDueSource.next(res.getMeta().meta.total);
            }
        );
    }

    initNumTasksDueToday(): void {
        this.loadTasks({ isComplete: false, special: 'today' }).subscribe(
            (res) => {
                this.numTasksDueTodaySource.next(res.getMeta().meta.total);
            }
        );
    }

    initNumTasksDueTomorrow(): void {
        this.loadTasks({ isComplete: false, special: 'tomorrow' }).subscribe(
            (res) => {
                this.numTasksDueTomorrowSource.next(res.getMeta().meta.total);
            }
        );
    }

    private loadTasks(filter: any) {
        return this.jsonDatastore.findAll(Task, { filter, page_size: 0 });
    }
}
