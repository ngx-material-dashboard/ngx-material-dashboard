import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

import { ToolbarModule } from '../toolbar/toolbar.module';
import { AbstractPagedCollectionComponent } from './pages/abstract-paged-collection/abstract-paged-collection.component';
import { AbstractPagedCollectionWithToolbarComponent } from './pages/abstract-paged-collection-with-toolbar/abstract-paged-collection-with-toolbar.component';
import { SorterComponent } from './pages/sorter/sorter.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSortModule } from '@angular/material/sort';
import { CollectionButtonClickDirective } from './directives/collection-button-click.directive';

@NgModule({
    declarations: [
        AbstractPagedCollectionComponent,
        AbstractPagedCollectionWithToolbarComponent,
        CollectionButtonClickDirective,
        SorterComponent
    ],
    exports: [
        CollectionButtonClickDirective,
        SorterComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatSelectModule,
        MatSortModule,
        FontAwesomeModule,
        ToolbarModule
    ]
})
export class CollectionModule { }
