import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { SidenavItem } from '@ngx-material-dashboard/widgets';

const routeSidenavItems: any = {"base-json":[{"text":"Interfaces","selector":"interfaces","children":[{"route":["./","base-json","interfaces","attribute-decorator-options"],"selector":"attribute-decorator-options","text":"AttributeDecoratorOptions"},{"route":["./","base-json","interfaces","datastore-config"],"selector":"datastore-config","text":"DatastoreConfig"},{"route":["./","base-json","interfaces","json-api-error"],"selector":"json-api-error","text":"JsonApiError"},{"route":["./","base-json","interfaces","model-config"],"selector":"model-config","text":"ModelConfig"},{"route":["./","base-json","interfaces","model-type"],"selector":"model-type","text":"ModelType"},{"route":["./","base-json","interfaces","overrides"],"selector":"overrides","text":"Overrides"},{"route":["./","base-json","interfaces","property-converter"],"selector":"property-converter","text":"PropertyConverter"}]},{"route":["./","base-json"],"selector":"base-json","text":"BaseJson"},{"route":["./","base-json","attribute"],"selector":"attribute","text":"Attribute"},{"route":["./","base-json","attribute-metadata"],"selector":"attribute-metadata","text":"AttributeMetadata"},{"route":["./","base-json","date-converter"],"selector":"date-converter","text":"DateConverter"},{"route":["./","base-json","error-response"],"selector":"error-response","text":"ErrorResponse"},{"route":["./","base-json","json-api-datastore-config"],"selector":"json-api-datastore-config","text":"JsonApiDatastoreConfig"},{"route":["./","base-json","json-api-meta-model"],"selector":"json-api-meta-model","text":"JsonApiMetaModel"},{"route":["./","base-json","json-api-model-config"],"selector":"json-api-model-config","text":"JsonApiModelConfig"},{"route":["./","base-json","json-api-query-data"],"selector":"json-api-query-data","text":"JsonApiQueryData"},{"route":["./","base-json","json-datastore"],"selector":"json-datastore","text":"JsonDatastore"},{"route":["./","base-json","json-model"],"selector":"json-model","text":"JsonModel"},{"route":["./","base-json","meta-model-type"],"selector":"meta-model-type","text":"MetaModelType"}],"widgets":[{"text":"Components","selector":"components","children":[{"route":["./","widgets","components","abstract-paged-table-with-toolbar"],"selector":"abstract-paged-table-with-toolbar","text":"AbstractPagedTableWithToolbar"},{"route":["./","widgets","components","confirm-delete-dialog"],"selector":"confirm-delete-dialog","text":"ConfirmDeleteDialog"},{"route":["./","widgets","components","default-layout"],"selector":"default-layout","text":"DefaultLayout"},{"route":["./","widgets","components","field-error"],"selector":"field-error","text":"FieldError"},{"route":["./","widgets","components","filter-drop-down"],"selector":"filter-drop-down","text":"FilterDropDown"},{"route":["./","widgets","components","paged-grid"],"selector":"paged-grid","text":"PagedGrid"},{"route":["./","widgets","components","paged-list"],"selector":"paged-list","text":"PagedList"},{"route":["./","widgets","components","paged-table"],"selector":"paged-table","text":"PagedTable"},{"route":["./","widgets","components","paged-table"],"selector":"paged-table","text":"PagedTable"},{"route":["./","widgets","components","paged-table-with-toolbar"],"selector":"paged-table-with-toolbar","text":"PagedTableWithToolbar"}]},{"text":"Directives","selector":"directives","children":[{"route":["./","widgets","directives","click-stop-propagation-directive"],"selector":"click-stop-propagation-directive","text":"ClickStopPropagationDirective"},{"route":["./","widgets","directives","tab-stop-propagation-directive"],"selector":"tab-stop-propagation-directive","text":"TabStopPropagationDirective"}]},{"text":"Interfaces","selector":"interfaces","children":[{"route":["./","widgets","interfaces","paged-table-with-toolbar"],"selector":"paged-table-with-toolbar","text":"PagedTableWithToolbar"},{"route":["./","widgets","interfaces","sidenav-item"],"selector":"sidenav-item","text":"SidenavItem"},{"route":["./","widgets","interfaces","validation-message"],"selector":"validation-message","text":"ValidationMessage"},{"route":["./","widgets","interfaces","validation-messages"],"selector":"validation-messages","text":"ValidationMessages"}]},{"text":"Modules","selector":"modules","children":[{"route":["./","widgets","modules","dialog"],"selector":"dialog","text":"Dialog"},{"route":["./","widgets","modules","form"],"selector":"form","text":"Form"},{"route":["./","widgets","modules","grid"],"selector":"grid","text":"Grid"},{"route":["./","widgets","modules","layout"],"selector":"layout","text":"Layout"},{"route":["./","widgets","modules","list"],"selector":"list","text":"List"},{"route":["./","widgets","modules","table"],"selector":"table","text":"Table"}]},{"text":"Services","selector":"services","children":[{"route":["./","widgets","services","loading"],"selector":"loading","text":"Loading"}]},{"route":["./","widgets"],"selector":"widgets","text":"Widgets"},{"route":["./","widgets","dialog-data"],"selector":"dialog-data","text":"DialogData"},{"route":["./","widgets","remote-data-source"],"selector":"remote-data-source","text":"RemoteDataSource"}]};

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    @ViewChild(MatSidenavContainer) sidenav!: MatSidenavContainer; 
    sidenavItems: SidenavItem[] = [];

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.setSidenavItems();
        this.router.events.subscribe((e) => {
           this.setSidenavItems();
        });
    }

    setSidenavItems() {
        if (this.router.url.includes('widgets')) {
            this.sidenavItems = routeSidenavItems['widgets'];
        } else if (this.router.url.includes('base-json')) {
            this.sidenavItems = routeSidenavItems['base-json'];
        }
    }
}
