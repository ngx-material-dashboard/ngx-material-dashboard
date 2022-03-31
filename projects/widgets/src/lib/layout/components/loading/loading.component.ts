import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoadingService } from '../../services/loading.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

    loading: boolean;
    sub: Subscription;

    constructor(private loadingService: LoadingService) {
        this.loading = false;
        this.sub = new Subscription();
    }

    ngOnInit() {
        const sub = this.loadingService.loadingSub.subscribe(loadingState => {
            this.loading = loadingState;
        });
        sub.add(sub);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
