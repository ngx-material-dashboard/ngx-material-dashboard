import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ButtonToolbarComponent } from './pages/button-toolbar/button-toolbar.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

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
        MatButtonModule,
        MatToolbarModule,
        FlexLayoutModule,
        FontAwesomeModule
    ]
})
export class ToolbarModule { }
