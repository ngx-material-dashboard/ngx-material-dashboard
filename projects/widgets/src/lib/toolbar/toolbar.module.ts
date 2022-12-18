import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FormModule } from '../form/form.module';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { FilterDropDownComponent } from './components/filter-drop-down/filter-drop-down.component';
import { SearchFilterDirective } from './directives/search-filter.directive';
import { ButtonToolbarComponent } from './pages/button-toolbar/button-toolbar.component';
import { IconButtonsComponent } from './components/icon-buttons/icon-buttons.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SorterComponent } from './pages/sorter/sorter.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { RaisedButtonToolbarComponent } from './pages/raised-button-toolbar/raised-button-toolbar.component';
import { IconButtonsWithPaginatorComponent } from './pages/icon-buttons-with-paginator/icon-buttons-with-paginator.component';

@NgModule({
    declarations: [
        ButtonsComponent,
        ButtonToolbarComponent,
        FilterDropDownComponent,
        IconButtonsComponent,
        IconButtonsWithPaginatorComponent,
        RaisedButtonToolbarComponent,
        SearchFilterDirective,
        SorterComponent
    ],
    exports: [
        ButtonToolbarComponent,
        FilterDropDownComponent,
        IconButtonsWithPaginatorComponent,
        RaisedButtonToolbarComponent,
        SearchFilterDirective,
        SorterComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatCheckboxModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSortModule,
        MatToolbarModule,
        MatTooltipModule,
        FlexLayoutModule,
        FontAwesomeModule,
        FormModule
    ]
})
export class ToolbarModule {}
