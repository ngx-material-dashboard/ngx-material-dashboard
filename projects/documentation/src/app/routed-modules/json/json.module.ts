import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JSONRoutingModule } from './json-routing.module';
import { TabbedDocumentModule } from '../../widgets/tabbed-document/tabbed-document.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        TabbedDocumentModule,
        JSONRoutingModule
    ]
})
export class JSONModule { }
