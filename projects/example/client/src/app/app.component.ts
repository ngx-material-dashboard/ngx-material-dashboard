import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
    faClipboardCheck,
    faClipboardList,
    faHourglassEnd,
    faHourglassHalf,
    faHourglassStart
} from '@fortawesome/free-solid-svg-icons';
import { FilterService, SidenavItem } from '@ngx-material-dashboard/widgets';
import { TaskService } from './domains/task/services/task.service';
import { Observable, filter } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    form!: FormGroup;
    isComplete: boolean = false;
    logo = 'My Tasks';
    /** Array of observables of number of tasks by status included in sidenav. */
    numTaskObservables: Observable<number>[];
    sidenavItems: SidenavItem[] = [
        {
            icon: faClipboardList,
            queryParams: { isComplete: false },
            route: ['tasks'],
            text: 'Pending',
            selector: 'pending'
        },
        {
            icon: faHourglassEnd,
            queryParams: { isComplete: false, filter: 'overdue' },
            route: ['tasks'],
            text: 'Over Due',
            selector: 'over-due'
        },
        {
            icon: faHourglassHalf,
            queryParams: { isComplete: false, filter: 'today' },
            route: ['tasks'],
            text: 'Due Today',
            selector: 'due-today'
        },
        {
            icon: faHourglassStart,
            queryParams: { isComplete: false, filter: 'tomorrow' },
            route: ['tasks'],
            text: 'Due Tomorrow',
            selector: 'due-tomorrow'
        },
        {
            icon: faClipboardCheck,
            queryParams: { isComplete: true },
            route: ['tasks'],
            text: 'Complete',
            selector: 'complete'
        }
    ];

    constructor(
        private formBuilder: FormBuilder,
        private filterService: FilterService,
        private taskService: TaskService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.numTaskObservables = [
            this.taskService.numPendingTasks,
            this.taskService.numTasksOverDue,
            this.taskService.numTasksDueToday,
            this.taskService.numTasksDueTomorrow
        ];
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({});

        // initialize observables for each task by status and set badge for
        // corresponding sidenavItem
        this.numTaskObservables.forEach((obs, i) => {
            // we only care about totals > 0 so filter any less
            obs.pipe(filter((it: number) => it > 0)).subscribe(
                (res) => (this.sidenavItems[i].badge = res)
            );
        });

        this.taskService.initNumTasks();

        this.route.queryParams.subscribe((params) => {
            this.isComplete = params['isComplete'];
        });
    }

    clearSearchForm(): void {
        this.form.get('searchFilter')?.reset();
        this.updateFilter();
    }

    onSearchClick(): void {
        this.updateFilter();

        // re-route to search results if needed (if we are on task page); we
        // are on task page if URL ends with a number...
        const url = this.router.routerState.snapshot.url;
        if (Number(url[url.length - 1].toString())) {
            this.router.navigate(['tasks'], {
                queryParams: { isComplete: this.isComplete }
            });
        }
    }

    private updateFilter(): void {
        const searchFilter = {
            isComplete: this.isComplete,
            name: this.form.get('searchFilter')?.get('name')?.value,
            description: this.form.get('searchFilter')?.get('description')?.value,
            priority: this.form.get('searchFilter')?.get('priority')?.value
        };
        this.filterService.filterSub.next(searchFilter);
    }
}
