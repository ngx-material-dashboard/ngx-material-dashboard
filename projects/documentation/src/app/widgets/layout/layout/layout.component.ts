import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { SidenavItem } from '@ngx-material-dashboard/widgets';

const routeSidenavItems: any = {"base-json":[{"text":"base-json","selector":"base-json","children":[{"text":"Decorators","selector":"decorators","children":[{"route":["./","base-json","decorators","attribute"],"selector":"attribute","text":"Attribute"},{"route":["./","base-json","decorators","json-api-datastore-config"],"selector":"json-api-datastore-config","text":"JsonApiDatastoreConfig"},{"route":["./","base-json","decorators","json-api-model-config"],"selector":"json-api-model-config","text":"JsonApiModelConfig"}]},{"text":"Interfaces","selector":"interfaces","children":[{"route":["./","base-json","interfaces","attribute-decorator-options"],"selector":"attribute-decorator-options","text":"AttributeDecoratorOptions"},{"route":["./","base-json","interfaces","datastore-config"],"selector":"datastore-config","text":"DatastoreConfig"},{"route":["./","base-json","interfaces","json-api-error"],"selector":"json-api-error","text":"JsonApiError"},{"route":["./","base-json","interfaces","model-config"],"selector":"model-config","text":"ModelConfig"},{"route":["./","base-json","interfaces","model-type"],"selector":"model-type","text":"ModelType"},{"route":["./","base-json","interfaces","overrides"],"selector":"overrides","text":"Overrides"},{"route":["./","base-json","interfaces","property-converter"],"selector":"property-converter","text":"PropertyConverter"}]},{"text":"Models","selector":"models","children":[{"route":["./","base-json","models","error-response"],"selector":"error-response","text":"ErrorResponse"},{"route":["./","base-json","models","json-api-meta-model"],"selector":"json-api-meta-model","text":"JsonApiMetaModel"},{"route":["./","base-json","models","json-model"],"selector":"json-model","text":"JsonModel"},{"route":["./","base-json","models","meta-model-type"],"selector":"meta-model-type","text":"MetaModelType"}]},{"route":["./","base-json","attribute-metadata"],"selector":"attribute-metadata","text":"AttributeMetadata"},{"route":["./","base-json","date-converter"],"selector":"date-converter","text":"DateConverter"},{"route":["./","base-json","json-api-query-data"],"selector":"json-api-query-data","text":"JsonApiQueryData"},{"route":["./","base-json","json-datastore"],"selector":"json-datastore","text":"JsonDatastore"}]},{"text":"json-api","selector":"json-api","children":[{"text":"Decorators","selector":"decorators","children":[{"route":["./","json-api","decorators","belongs-to"],"selector":"belongs-to","text":"BelongsTo"},{"route":["./","json-api","decorators","has-many"],"selector":"has-many","text":"HasMany"},{"route":["./","json-api","decorators","json-attribute"],"selector":"json-attribute","text":"JsonAttribute"},{"route":["./","json-api","decorators","nested-attribute"],"selector":"nested-attribute","text":"NestedAttribute"}]},{"text":"Models","selector":"models","children":[{"route":["./","json-api","models","json-api-model"],"selector":"json-api-model","text":"JsonApiModel"},{"route":["./","json-api","models","json-api-nested-model"],"selector":"json-api-nested-model","text":"JsonApiNestedModel"}]},{"route":["./","json-api","json-api-datastore"],"selector":"json-api-datastore","text":"JsonApiDatastore"}]},{"text":"json","selector":"json","children":[{"text":"Models","selector":"models","children":[{"route":["./","json","models","json-model"],"selector":"json-model","text":"JsonModel"}]},{"route":["./","json","json-datastore"],"selector":"json-datastore","text":"JsonDatastore"}]}],"json-api":[{"text":"base-json","selector":"base-json","children":[{"text":"Decorators","selector":"decorators","children":[{"route":["./","base-json","decorators","attribute"],"selector":"attribute","text":"Attribute"},{"route":["./","base-json","decorators","json-api-datastore-config"],"selector":"json-api-datastore-config","text":"JsonApiDatastoreConfig"},{"route":["./","base-json","decorators","json-api-model-config"],"selector":"json-api-model-config","text":"JsonApiModelConfig"}]},{"text":"Interfaces","selector":"interfaces","children":[{"route":["./","base-json","interfaces","attribute-decorator-options"],"selector":"attribute-decorator-options","text":"AttributeDecoratorOptions"},{"route":["./","base-json","interfaces","datastore-config"],"selector":"datastore-config","text":"DatastoreConfig"},{"route":["./","base-json","interfaces","json-api-error"],"selector":"json-api-error","text":"JsonApiError"},{"route":["./","base-json","interfaces","model-config"],"selector":"model-config","text":"ModelConfig"},{"route":["./","base-json","interfaces","model-type"],"selector":"model-type","text":"ModelType"},{"route":["./","base-json","interfaces","overrides"],"selector":"overrides","text":"Overrides"},{"route":["./","base-json","interfaces","property-converter"],"selector":"property-converter","text":"PropertyConverter"}]},{"text":"Models","selector":"models","children":[{"route":["./","base-json","models","error-response"],"selector":"error-response","text":"ErrorResponse"},{"route":["./","base-json","models","json-api-meta-model"],"selector":"json-api-meta-model","text":"JsonApiMetaModel"},{"route":["./","base-json","models","json-model"],"selector":"json-model","text":"JsonModel"},{"route":["./","base-json","models","meta-model-type"],"selector":"meta-model-type","text":"MetaModelType"}]},{"route":["./","base-json","attribute-metadata"],"selector":"attribute-metadata","text":"AttributeMetadata"},{"route":["./","base-json","date-converter"],"selector":"date-converter","text":"DateConverter"},{"route":["./","base-json","json-api-query-data"],"selector":"json-api-query-data","text":"JsonApiQueryData"},{"route":["./","base-json","json-datastore"],"selector":"json-datastore","text":"JsonDatastore"}]},{"text":"json-api","selector":"json-api","children":[{"text":"Decorators","selector":"decorators","children":[{"route":["./","json-api","decorators","belongs-to"],"selector":"belongs-to","text":"BelongsTo"},{"route":["./","json-api","decorators","has-many"],"selector":"has-many","text":"HasMany"},{"route":["./","json-api","decorators","json-attribute"],"selector":"json-attribute","text":"JsonAttribute"},{"route":["./","json-api","decorators","nested-attribute"],"selector":"nested-attribute","text":"NestedAttribute"}]},{"text":"Models","selector":"models","children":[{"route":["./","json-api","models","json-api-model"],"selector":"json-api-model","text":"JsonApiModel"},{"route":["./","json-api","models","json-api-nested-model"],"selector":"json-api-nested-model","text":"JsonApiNestedModel"}]},{"route":["./","json-api","json-api-datastore"],"selector":"json-api-datastore","text":"JsonApiDatastore"}]},{"text":"json","selector":"json","children":[{"text":"Models","selector":"models","children":[{"route":["./","json","models","json-model"],"selector":"json-model","text":"JsonModel"}]},{"route":["./","json","json-datastore"],"selector":"json-datastore","text":"JsonDatastore"}]}],"json":[{"text":"base-json","selector":"base-json","children":[{"text":"Decorators","selector":"decorators","children":[{"route":["./","base-json","decorators","attribute"],"selector":"attribute","text":"Attribute"},{"route":["./","base-json","decorators","json-api-datastore-config"],"selector":"json-api-datastore-config","text":"JsonApiDatastoreConfig"},{"route":["./","base-json","decorators","json-api-model-config"],"selector":"json-api-model-config","text":"JsonApiModelConfig"}]},{"text":"Interfaces","selector":"interfaces","children":[{"route":["./","base-json","interfaces","attribute-decorator-options"],"selector":"attribute-decorator-options","text":"AttributeDecoratorOptions"},{"route":["./","base-json","interfaces","datastore-config"],"selector":"datastore-config","text":"DatastoreConfig"},{"route":["./","base-json","interfaces","json-api-error"],"selector":"json-api-error","text":"JsonApiError"},{"route":["./","base-json","interfaces","model-config"],"selector":"model-config","text":"ModelConfig"},{"route":["./","base-json","interfaces","model-type"],"selector":"model-type","text":"ModelType"},{"route":["./","base-json","interfaces","overrides"],"selector":"overrides","text":"Overrides"},{"route":["./","base-json","interfaces","property-converter"],"selector":"property-converter","text":"PropertyConverter"}]},{"text":"Models","selector":"models","children":[{"route":["./","base-json","models","error-response"],"selector":"error-response","text":"ErrorResponse"},{"route":["./","base-json","models","json-api-meta-model"],"selector":"json-api-meta-model","text":"JsonApiMetaModel"},{"route":["./","base-json","models","json-model"],"selector":"json-model","text":"JsonModel"},{"route":["./","base-json","models","meta-model-type"],"selector":"meta-model-type","text":"MetaModelType"}]},{"route":["./","base-json","attribute-metadata"],"selector":"attribute-metadata","text":"AttributeMetadata"},{"route":["./","base-json","date-converter"],"selector":"date-converter","text":"DateConverter"},{"route":["./","base-json","json-api-query-data"],"selector":"json-api-query-data","text":"JsonApiQueryData"},{"route":["./","base-json","json-datastore"],"selector":"json-datastore","text":"JsonDatastore"}]},{"text":"json-api","selector":"json-api","children":[{"text":"Decorators","selector":"decorators","children":[{"route":["./","json-api","decorators","belongs-to"],"selector":"belongs-to","text":"BelongsTo"},{"route":["./","json-api","decorators","has-many"],"selector":"has-many","text":"HasMany"},{"route":["./","json-api","decorators","json-attribute"],"selector":"json-attribute","text":"JsonAttribute"},{"route":["./","json-api","decorators","nested-attribute"],"selector":"nested-attribute","text":"NestedAttribute"}]},{"text":"Models","selector":"models","children":[{"route":["./","json-api","models","json-api-model"],"selector":"json-api-model","text":"JsonApiModel"},{"route":["./","json-api","models","json-api-nested-model"],"selector":"json-api-nested-model","text":"JsonApiNestedModel"}]},{"route":["./","json-api","json-api-datastore"],"selector":"json-api-datastore","text":"JsonApiDatastore"}]},{"text":"json","selector":"json","children":[{"text":"Models","selector":"models","children":[{"route":["./","json","models","json-model"],"selector":"json-model","text":"JsonModel"}]},{"route":["./","json","json-datastore"],"selector":"json-datastore","text":"JsonDatastore"}]}],"testing":[{"route":["./","testing","button-element"],"selector":"button-element","text":"ButtonElement"},{"route":["./","testing","checkbox-element"],"selector":"checkbox-element","text":"CheckboxElement"},{"route":["./","testing","d-u-m-m-y-_-o-b-j-e-c-t-_-d-a-t-a"],"selector":"d-u-m-m-y-_-o-b-j-e-c-t-_-d-a-t-a","text":"DUMMY_OBJECT_DATA"},{"route":["./","testing","datastore"],"selector":"datastore","text":"Datastore"},{"route":["./","testing","default-layout-page"],"selector":"default-layout-page","text":"DefaultLayoutPage"},{"route":["./","testing","dummy-object"],"selector":"dummy-object","text":"DummyObject"},{"route":["./","testing","page-element"],"selector":"page-element","text":"PageElement"},{"route":["./","testing","paged-table-element"],"selector":"paged-table-element","text":"PagedTableElement"},{"route":["./","testing","paged-table-with-toolbar-element"],"selector":"paged-table-with-toolbar-element","text":"PagedTableWithToolbarElement"},{"route":["./","testing","sidenav-element"],"selector":"sidenav-element","text":"SidenavElement"},{"route":["./","testing","t-e-s-t-_-d-a-t-a"],"selector":"t-e-s-t-_-d-a-t-a","text":"TEST_DATA"},{"route":["./","testing","toolbar-element"],"selector":"toolbar-element","text":"ToolbarElement"},{"route":["./","testing","toolbar-header-element"],"selector":"toolbar-header-element","text":"ToolbarHeaderElement"}],"widgets":[{"text":"Components","selector":"components","children":[{"route":["./","widgets","components","abstract-paged-table-with-toolbar"],"selector":"abstract-paged-table-with-toolbar","text":"AbstractPagedTableWithToolbar"},{"route":["./","widgets","components","confirm-delete-dialog"],"selector":"confirm-delete-dialog","text":"ConfirmDeleteDialog"},{"route":["./","widgets","components","default-layout"],"selector":"default-layout","text":"DefaultLayout"},{"route":["./","widgets","components","field-error"],"selector":"field-error","text":"FieldError"},{"route":["./","widgets","components","filter-drop-down"],"selector":"filter-drop-down","text":"FilterDropDown"},{"route":["./","widgets","components","loading"],"selector":"loading","text":"Loading"},{"route":["./","widgets","components","paged-grid"],"selector":"paged-grid","text":"PagedGrid"},{"route":["./","widgets","components","paged-list"],"selector":"paged-list","text":"PagedList"},{"route":["./","widgets","components","paged-table"],"selector":"paged-table","text":"PagedTable"},{"route":["./","widgets","components","paged-table"],"selector":"paged-table","text":"PagedTable"},{"route":["./","widgets","components","paged-table-with-toolbar"],"selector":"paged-table-with-toolbar","text":"PagedTableWithToolbar"},{"route":["./","widgets","components","sidenav"],"selector":"sidenav","text":"Sidenav"}]},{"text":"Directives","selector":"directives","children":[{"route":["./","widgets","directives","click-stop-propagation-directive"],"selector":"click-stop-propagation-directive","text":"ClickStopPropagationDirective"},{"route":["./","widgets","directives","tab-stop-propagation-directive"],"selector":"tab-stop-propagation-directive","text":"TabStopPropagationDirective"}]},{"text":"Interfaces","selector":"interfaces","children":[{"route":["./","widgets","interfaces","paged-table-with-toolbar"],"selector":"paged-table-with-toolbar","text":"PagedTableWithToolbar"},{"route":["./","widgets","interfaces","sidenav-item"],"selector":"sidenav-item","text":"SidenavItem"},{"route":["./","widgets","interfaces","validation-message"],"selector":"validation-message","text":"ValidationMessage"},{"route":["./","widgets","interfaces","validation-messages"],"selector":"validation-messages","text":"ValidationMessages"}]},{"text":"Modules","selector":"modules","children":[{"route":["./","widgets","modules","dialog"],"selector":"dialog","text":"Dialog"},{"route":["./","widgets","modules","form"],"selector":"form","text":"Form"},{"route":["./","widgets","modules","grid"],"selector":"grid","text":"Grid"},{"route":["./","widgets","modules","layout"],"selector":"layout","text":"Layout"},{"route":["./","widgets","modules","list"],"selector":"list","text":"List"},{"route":["./","widgets","modules","table"],"selector":"table","text":"Table"}]},{"text":"Services","selector":"services","children":[{"route":["./","widgets","services","loading"],"selector":"loading","text":"Loading"}]},{"route":["./","widgets","dialog-data"],"selector":"dialog-data","text":"DialogData"},{"route":["./","widgets","remote-data-source"],"selector":"remote-data-source","text":"RemoteDataSource"}]};

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
        Object.keys(routeSidenavItems).forEach((key: string) => {
            if (this.router.url.includes(`/${key}`)) {
                this.sidenavItems = routeSidenavItems[key];
            }
        })
    }
}