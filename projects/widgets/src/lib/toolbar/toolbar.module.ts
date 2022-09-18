import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ButtonToolbarComponent } from './pages/button-toolbar/button-toolbar.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        ButtonsComponent,
        ButtonToolbarComponent
    ],
    exports: [
        ButtonToolbarComponent
    ],
    imports: [
        CommonModule,
        MatToolbarModule,
        FontAwesomeModule
    ]
})
export class ToolbarModule { }
