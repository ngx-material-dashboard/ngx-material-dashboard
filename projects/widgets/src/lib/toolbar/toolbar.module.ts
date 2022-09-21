import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ButtonsComponent } from './components/buttons/buttons.component';
import { FilterDropDownComponent } from './components/filter-drop-down/filter-drop-down.component';
import { ButtonToolbarComponent } from './pages/button-toolbar/button-toolbar.component';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
    declarations: [
        ButtonsComponent,
        ButtonToolbarComponent,
        FilterDropDownComponent
    ],
    exports: [
        ButtonToolbarComponent,
        FilterDropDownComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        FlexLayoutModule,
        FontAwesomeModule
    ]
})
export class ToolbarModule { }
