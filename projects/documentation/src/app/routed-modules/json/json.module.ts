import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JSONRoutingModule } from './json-routing.module';
import { JsonComponent } from './pages/json/json.component';
import { TabbedDocumentModule } from '../../widgets/tabbed-document/tabbed-document.module';
import { JsonApiComponent } from './pages/json-api/json-api.component';
import { BaseJsonComponent } from './pages/base-json/base-json.component';


@NgModule({
    declarations: [
        JsonComponent,
        JsonApiComponent,
        BaseJsonComponent
    ],
    imports: [
        CommonModule,
        TabbedDocumentModule,
        JSONRoutingModule
    ]
})
export class JSONModule { }
