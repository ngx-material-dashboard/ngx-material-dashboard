import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MarkdownModule } from 'ngx-markdown';

import { ScrollspyNavLayoutModule } from '../scrollspy-nav-layout/scrollspy-nav-layout.module';
import { TabbedDocumentComponent } from './tabbed-document/tabbed-document.component';
import { TabbedDocumentTabComponent } from './tabbed-document-tab/tabbed-document-tab.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        MarkdownModule.forChild(),
        MatButtonModule,
        MatTabsModule,
        ScrollspyNavLayoutModule,
        FontAwesomeModule
    ],
    declarations: [TabbedDocumentComponent, TabbedDocumentTabComponent],
    exports: [TabbedDocumentComponent, TabbedDocumentTabComponent]
})
export class TabbedDocumentModule {}
