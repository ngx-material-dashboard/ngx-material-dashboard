import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskFilter } from '../../../../shared/interfaces/task-filter.interface';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
    filter: TaskFilter;

    constructor(private route: ActivatedRoute) {
        this.filter = {
            special: null,
            isComplete: false
        };
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: Params) => {
            let filter = params['filter'];
            if (!filter) {
                filter = {};
            }
            const isComplete = params['isComplete'] === 'true';

            this.filter = {
                special: filter,
                isComplete
            };
        });
    }
}
