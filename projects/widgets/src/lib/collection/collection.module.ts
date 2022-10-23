import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

import { ToolbarModule } from '../toolbar/toolbar.module';
import { AbstractPagedCollectionComponent } from './pages/abstract-paged-collection/abstract-paged-collection.component';
import { AbstractPagedCollectionWithToolbarComponent } from './pages/abstract-paged-collection-with-toolbar/abstract-paged-collection-with-toolbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSortModule } from '@angular/material/sort';
import { CollectionButtonClickDirective } from './directives/collection-button-click.directive';
import { BasePagedCollectionWithToolbarComponent } from './components/base-paged-collection-with-toolbar/base-paged-collection-with-toolbar.component';
import { CompactPagedCollectionComponent } from './components/compact-paged-collection/compact-paged-collection.component';
import { AbstractCompactPagedCollectionComponent } from './pages/abstract-compact-paged-collection/abstract-compact-paged-collection.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CollectionComponent } from './components/collection/collection.component';
import { PagedCollectionWithToolbarComponent } from './components/paged-collection-with-toolbar/paged-collection-with-toolbar.component';
import { PagedCollectionComponent } from './components/paged-collection/paged-collection.component';
import { PagedCollectionWithIconToolbarComponent } from './components/paged-collection-with-icon-toolbar/paged-collection-with-icon-toolbar.component';
import { PagedCollectionWithRaisedButtonToolbarComponent } from './components/paged-collection-with-raised-button-toolbar/paged-collection-with-raised-button-toolbar.component';

@NgModule({
    declarations: [
        AbstractPagedCollectionComponent,
        AbstractPagedCollectionWithToolbarComponent,
        BasePagedCollectionWithToolbarComponent,
        CollectionButtonClickDirective,
        CompactPagedCollectionComponent,
        AbstractCompactPagedCollectionComponent,
        CollectionComponent,
        PagedCollectionWithToolbarComponent,
        PagedCollectionComponent,
        PagedCollectionWithIconToolbarComponent,
        PagedCollectionWithRaisedButtonToolbarComponent
    ],
    exports: [
        CollectionButtonClickDirective
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSortModule,
        FontAwesomeModule,
        ToolbarModule
    ]
})
export class CollectionModule { }
