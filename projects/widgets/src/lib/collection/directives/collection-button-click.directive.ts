import { AfterViewInit, Directive, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { Subscription } from 'rxjs';

import { ButtonClick } from '../../toolbar/interfaces/button-click.interface';
import { PagedCollectionComponent } from '../components/paged-collection/paged-collection.component';

@Directive({
  selector: '[ngxMaterialDashboardCollectionButtonClick]'
})
export class CollectionButtonClickDirective<T extends JsonModel>
    implements AfterViewInit, OnDestroy {

    @Input() collection!: PagedCollectionComponent<T>;
    @Output() buttonClick: EventEmitter<ButtonClick>;
    sub: Subscription;

    constructor() {
        this.buttonClick = new EventEmitter<ButtonClick>();
        this.sub = new Subscription();
    }

    ngAfterViewInit(): void {
        const sub = this.collection.buttonClick.subscribe((buttonClick: ButtonClick) => {
            this.buttonClick.emit(buttonClick);
        });
        this.sub.add(sub);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
