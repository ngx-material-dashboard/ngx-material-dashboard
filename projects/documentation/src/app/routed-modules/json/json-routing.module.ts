import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseJsonComponent } from './pages/base-json/base-json.component';
import { JsonApiComponent } from './pages/json-api/json-api.component';
import { JsonComponent } from './pages/json/json.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: '',
        component: JsonComponent
    },
    {
        path: 'base-json',
        component: BaseJsonComponent
    },
    {
        path: 'json-api',
        component: JsonApiComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JSONRoutingModule { }
