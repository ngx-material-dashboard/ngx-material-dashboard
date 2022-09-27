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

@NgModule({
    declarations: [
        ButtonsComponent,
        ButtonToolbarComponent,
        FilterDropDownComponent,
        SearchFilterDirective,
    ],
    exports: [
        ButtonToolbarComponent,
        FilterDropDownComponent,
        SearchFilterDirective,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        FlexLayoutModule,
        FontAwesomeModule,
        FormModule
    ]
})
export class ToolbarModule { }
