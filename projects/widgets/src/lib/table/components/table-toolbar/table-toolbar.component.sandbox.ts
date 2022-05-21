import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { sandboxOf } from 'angular-playground';
import { CREATE_TOOLBAR_BUTTON, DELETE_TOOLBAR_BUTTON, EDIT_TOOLBAR_BUTTON } from '../../shared/table-toolbar-buttons';
import { FilterDropDownComponent } from '../filter-drop-down/filter-drop-down.component';
import { TableToolbarComponent } from './table-toolbar.component';

export default sandboxOf(TableToolbarComponent, {
    declarations: [FilterDropDownComponent],
    imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatToolbarModule,
        FlexLayoutModule,
        FontAwesomeModule
    ]
})
.add('toolbar with default alignment', {
    template: `
    <ngx-material-dashboard-table-toolbar [buttons]="buttons">
        <ngx-material-dashboard-filter-drop-down filter>
            <!-- filter form goes here -->
        </ngx-material-dashboard-filter-drop-down>
    </ngx-material-dashboard-table-toolbar>`,
    context: {
        buttons: [CREATE_TOOLBAR_BUTTON, EDIT_TOOLBAR_BUTTON, DELETE_TOOLBAR_BUTTON]
    }
})
.add('toolbar with left alignment', {
    template: `
    <ngx-material-dashboard-table-toolbar [buttons]="buttons" [buttonAlign]="buttonAlign" >
        <ngx-material-dashboard-filter-drop-down filter>
            <!-- filter form goes here -->
        </ngx-material-dashboard-filter-drop-down>
    </ngx-material-dashboard-table-toolbar>`,
    context: {
        buttons: [CREATE_TOOLBAR_BUTTON, EDIT_TOOLBAR_BUTTON, DELETE_TOOLBAR_BUTTON],
        buttonAlign: 'left'
    }
});
