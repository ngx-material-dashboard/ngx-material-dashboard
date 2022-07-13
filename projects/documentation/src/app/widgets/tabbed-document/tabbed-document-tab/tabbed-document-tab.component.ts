import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * A map of parent heading ids to their child heading elements.
 */
export interface NestedHeading {
    [headingId: string]: Element[]
}

/**
 * A map of URL strings that map to the markdown file that should be loaded for
 * that URL.
 */
export interface UrlDirectoryMap { 
    [url: string]: string[]
}

export interface UsageNoteMap {
    [url: string]: UsageNote;
}

interface UsageNote {
    [note: string]: string[];
}

const URL_DIRECTORY_MAP: UrlDirectoryMap = {"/base-json":["assets/docs/base-json/overview.md","assets/docs/base-json/install.md","assets/docs/shared/configuration.md","assets/docs/base-json/usage.md","assets/docs/shared/crud-capabilities.md","assets/docs/shared/custom-headers.md","assets/docs/shared/error-handling.md"],"/base-json/attribute-metadata/api":["assets/docs/base-json/attribute-metadata/api.md"],"/base-json/attribute-metadata/overview":["assets/docs/base-json/attribute-metadata/overview-0.md"],"/base-json/date-converter/api":["assets/docs/base-json/date-converter/api.md"],"/base-json/date-converter/overview":["assets/docs/base-json/date-converter/overview-0.md"],"/base-json/decorators/attribute/overview":[""],"/base-json/decorators/attribute/api":["assets/docs/base-json/decorators/attribute/api.md"],"/base-json/decorators/json-api-datastore-config/overview":[""],"/base-json/decorators/json-api-datastore-config/api":["assets/docs/base-json/decorators/json-api-datastore-config/api.md"],"/base-json/decorators/json-api-model-config/overview":[""],"/base-json/decorators/json-api-model-config/api":["assets/docs/base-json/decorators/json-api-model-config/api.md"],"/base-json/interfaces/attribute-decorator-options/api":["assets/docs/base-json/interfaces/attribute-decorator-options/api.md"],"/base-json/interfaces/attribute-decorator-options/overview":["assets/docs/base-json/interfaces/attribute-decorator-options/overview-0.md"],"/base-json/interfaces/datastore-config/api":["assets/docs/base-json/interfaces/datastore-config/api.md"],"/base-json/interfaces/datastore-config/overview":["assets/docs/base-json/interfaces/datastore-config/overview-0.md"],"/base-json/interfaces/json-api-error/api":["assets/docs/base-json/interfaces/json-api-error/api.md"],"/base-json/interfaces/json-api-error/overview":["assets/docs/base-json/interfaces/json-api-error/overview-0.md"],"/base-json/interfaces/model-config/api":["assets/docs/base-json/interfaces/model-config/api.md"],"/base-json/interfaces/model-config/overview":["assets/docs/base-json/interfaces/model-config/overview-0.md"],"/base-json/interfaces/model-type/api":["assets/docs/base-json/interfaces/model-type/api.md"],"/base-json/interfaces/model-type/overview":["assets/docs/base-json/interfaces/model-type/overview-0.md"],"/base-json/interfaces/overrides/api":["assets/docs/base-json/interfaces/overrides/api.md"],"/base-json/interfaces/overrides/overview":["assets/docs/base-json/interfaces/overrides/overview-0.md"],"/base-json/interfaces/property-converter/api":["assets/docs/base-json/interfaces/property-converter/api.md"],"/base-json/interfaces/property-converter/overview":["assets/docs/base-json/interfaces/property-converter/overview-0.md"],"/base-json/json-api-query-data/api":["assets/docs/base-json/json-api-query-data/api.md"],"/base-json/json-api-query-data/overview":["assets/docs/base-json/json-api-query-data/overview-0.md"],"/base-json/json-datastore/api":["assets/docs/base-json/json-datastore/api.md"],"/base-json/json-datastore/overview":["assets/docs/base-json/json-datastore/overview-0.md"],"/base-json/models/error-response/api":["assets/docs/base-json/models/error-response/api.md"],"/base-json/models/error-response/overview":["assets/docs/base-json/models/error-response/overview-0.md"],"/base-json/models/json-api-meta-model/api":["assets/docs/base-json/models/json-api-meta-model/api.md"],"/base-json/models/json-api-meta-model/overview":["assets/docs/base-json/models/json-api-meta-model/overview-0.md"],"/base-json/models/json-model/api":["assets/docs/base-json/models/json-model/api.md"],"/base-json/models/json-model/overview":["assets/docs/base-json/models/json-model/overview-0.md"],"/base-json/models/meta-model-type/api":["assets/docs/base-json/models/meta-model-type/api.md"],"/base-json/models/meta-model-type/overview":["assets/docs/base-json/models/meta-model-type/overview-0.md"],"/json":["assets/docs/json/overview.md","assets/docs/json/format.md","assets/docs/json/install.md","assets/docs/shared/configuration.md","assets/docs/json/usage.md","assets/docs/shared/crud-capabilities.md","assets/docs/shared/custom-headers.md","assets/docs/shared/error-handling.md"],"/json/json-datastore/api":["assets/docs/json/json-datastore/api.md"],"/json/json-datastore/overview":["assets/docs/json/json-datastore/overview-0.md"],"/json/models/json-model/api":["assets/docs/json/models/json-model/api.md"],"/json/models/json-model/overview":["assets/docs/json/models/json-model/overview-0.md"],"/json-api":["assets/docs/json-api/overview.md","assets/docs/json-api/install.md","assets/docs/shared/configuration.md","assets/docs/json-api/usage.md","assets/docs/shared/crud-capabilities.md","assets/docs/shared/custom-headers.md","assets/docs/shared/error-handling.md"],"/json-api/decorators/belongs-to/overview":[""],"/json-api/decorators/belongs-to/api":["assets/docs/json-api/decorators/belongs-to/api.md"],"/json-api/decorators/has-many/overview":[""],"/json-api/decorators/has-many/api":["assets/docs/json-api/decorators/has-many/api.md"],"/json-api/decorators/json-attribute/overview":[""],"/json-api/decorators/json-attribute/api":["assets/docs/json-api/decorators/json-attribute/api.md"],"/json-api/decorators/nested-attribute/overview":[""],"/json-api/decorators/nested-attribute/api":["assets/docs/json-api/decorators/nested-attribute/api.md"],"/json-api/json-api-datastore/api":["assets/docs/json-api/json-api-datastore/api.md"],"/json-api/json-api-datastore/overview":["assets/docs/json-api/json-api-datastore/overview-0.md"],"/json-api/models/json-api-model/api":["assets/docs/json-api/models/json-api-model/api.md"],"/json-api/models/json-api-model/overview":["assets/docs/json-api/models/json-api-model/overview-0.md"],"/json-api/models/json-api-nested-model/api":["assets/docs/json-api/models/json-api-nested-model/api.md"],"/json-api/models/json-api-nested-model/overview":["assets/docs/json-api/models/json-api-nested-model/overview-0.md"],"/json-overview":["assets/docs/json-overview.md","assets/docs/shared/crud-capabilities.md","assets/docs/shared/custom-headers.md","assets/docs/shared/error-handling.md"],"/overview":["assets/docs/overview.md"],"/shared/overview":["assets/docs/shared/configuration.md","assets/docs/shared/crud-capabilities.md","assets/docs/shared/custom-headers.md","assets/docs/shared/error-handling.md"],"/testing":["assets/docs/testing/overview.md"],"/testing/d-u-m-m-y-_-o-b-j-e-c-t-_-d-a-t-a/api":["assets/docs/testing/d-u-m-m-y-_-o-b-j-e-c-t-_-d-a-t-a/api.md"],"/testing/d-u-m-m-y-_-o-b-j-e-c-t-_-d-a-t-a/overview":["assets/docs/testing/d-u-m-m-y-_-o-b-j-e-c-t-_-d-a-t-a/overview-0.md"],"/testing/datastore/api":["assets/docs/testing/datastore/api.md"],"/testing/datastore/overview":["assets/docs/testing/datastore/overview-0.md"],"/testing/dummy-object/api":["assets/docs/testing/dummy-object/api.md"],"/testing/dummy-object/overview":["assets/docs/testing/dummy-object/overview-0.md"],"/testing/elements/button-element/api":["assets/docs/testing/elements/button-element/api.md"],"/testing/elements/button-element/overview":["assets/docs/testing/elements/button-element/overview-0.md"],"/testing/elements/checkbox-element/api":["assets/docs/testing/elements/checkbox-element/api.md"],"/testing/elements/checkbox-element/overview":["assets/docs/testing/elements/checkbox-element/overview-0.md"],"/testing/elements/page-element/api":["assets/docs/testing/elements/page-element/api.md"],"/testing/elements/page-element/overview":["assets/docs/testing/elements/page-element/overview-0.md"],"/testing/elements/paged-table-element/api":["assets/docs/testing/elements/paged-table-element/api.md"],"/testing/elements/paged-table-element/overview":["assets/docs/testing/elements/paged-table-element/overview-0.md"],"/testing/elements/paged-table-with-toolbar-element/api":["assets/docs/testing/elements/paged-table-with-toolbar-element/api.md"],"/testing/elements/paged-table-with-toolbar-element/overview":["assets/docs/testing/elements/paged-table-with-toolbar-element/overview-0.md"],"/testing/elements/sidenav-element/api":["assets/docs/testing/elements/sidenav-element/api.md"],"/testing/elements/sidenav-element/overview":["assets/docs/testing/elements/sidenav-element/overview-0.md"],"/testing/elements/toolbar-element/api":["assets/docs/testing/elements/toolbar-element/api.md"],"/testing/elements/toolbar-element/overview":["assets/docs/testing/elements/toolbar-element/overview-0.md"],"/testing/elements/toolbar-header-element/api":["assets/docs/testing/elements/toolbar-header-element/api.md"],"/testing/elements/toolbar-header-element/overview":["assets/docs/testing/elements/toolbar-header-element/overview-0.md"],"/testing/pages/default-layout-page/api":["assets/docs/testing/pages/default-layout-page/api.md"],"/testing/pages/default-layout-page/overview":["assets/docs/testing/pages/default-layout-page/overview-0.md"],"/testing/t-e-s-t-_-d-a-t-a/api":["assets/docs/testing/t-e-s-t-_-d-a-t-a/api.md"],"/testing/t-e-s-t-_-d-a-t-a/overview":["assets/docs/testing/t-e-s-t-_-d-a-t-a/overview-0.md"],"/widgets":["assets/docs/widgets/overview.md"],"/widgets/components/abstract-paged-table-with-toolbar/api":["assets/docs/widgets/components/abstract-paged-table-with-toolbar/api.md"],"/widgets/components/abstract-paged-table-with-toolbar/overview":["assets/docs/widgets/components/abstract-paged-table-with-toolbar/overview-0.md"],"/widgets/components/confirm-delete-dialog/api":["assets/docs/widgets/components/confirm-delete-dialog/api.md"],"/widgets/components/confirm-delete-dialog/overview":["assets/docs/widgets/components/confirm-delete-dialog/overview-0.md"],"/widgets/components/default-layout/api":["assets/docs/widgets/components/default-layout/api.md"],"/widgets/components/default-layout/overview":["assets/docs/widgets/components/default-layout/overview-0.md"],"/widgets/components/field-error/api":["assets/docs/widgets/components/field-error/api.md"],"/widgets/components/field-error/overview":["assets/docs/widgets/components/field-error/overview-0.md"],"/widgets/components/filter-drop-down/api":["assets/docs/widgets/components/filter-drop-down/api.md"],"/widgets/components/filter-drop-down/overview":["assets/docs/widgets/components/filter-drop-down/overview-0.md"],"/widgets/components/loading/api":["assets/docs/widgets/components/loading/api.md"],"/widgets/components/loading/overview":["assets/docs/widgets/components/loading/overview-0.md"],"/widgets/components/paged-grid/api":["assets/docs/widgets/components/paged-grid/api.md"],"/widgets/components/paged-grid/overview":["assets/docs/widgets/components/paged-grid/overview-0.md"],"/widgets/components/paged-list/api":["assets/docs/widgets/components/paged-list/api.md"],"/widgets/components/paged-list/overview":["assets/docs/widgets/components/paged-list/overview-0.md"],"/widgets/components/paged-table/api":["assets/docs/widgets/components/paged-table/api.md"],"/widgets/components/paged-table/overview":["assets/docs/widgets/components/paged-table/overview-0.md","assets/docs/widgets/components/paged-table/overview-1.md","assets/docs/widgets/components/paged-table/overview-2.md"],"/widgets/components/paged-table-with-toolbar/api":["assets/docs/widgets/components/paged-table-with-toolbar/api.md"],"/widgets/components/paged-table-with-toolbar/overview":["assets/docs/widgets/components/paged-table-with-toolbar/overview-0.md"],"/widgets/components/sidenav/api":["assets/docs/widgets/components/sidenav/api.md"],"/widgets/components/sidenav/overview":["assets/docs/widgets/components/sidenav/overview-0.md"],"/widgets/dialog-data/api":["assets/docs/widgets/dialog-data/api.md"],"/widgets/dialog-data/overview":["assets/docs/widgets/dialog-data/overview-0.md"],"/widgets/directives/click-stop-propagation-directive/api":["assets/docs/widgets/directives/click-stop-propagation-directive/api.md"],"/widgets/directives/click-stop-propagation-directive/overview":["assets/docs/widgets/directives/click-stop-propagation-directive/overview-0.md"],"/widgets/directives/tab-stop-propagation-directive/api":["assets/docs/widgets/directives/tab-stop-propagation-directive/api.md"],"/widgets/directives/tab-stop-propagation-directive/overview":["assets/docs/widgets/directives/tab-stop-propagation-directive/overview-0.md"],"/widgets/interfaces/paged-table-with-toolbar/api":["assets/docs/widgets/interfaces/paged-table-with-toolbar/api.md"],"/widgets/interfaces/paged-table-with-toolbar/overview":["assets/docs/widgets/interfaces/paged-table-with-toolbar/overview-0.md"],"/widgets/interfaces/sidenav-item/api":["assets/docs/widgets/interfaces/sidenav-item/api.md"],"/widgets/interfaces/sidenav-item/overview":["assets/docs/widgets/interfaces/sidenav-item/overview-0.md"],"/widgets/interfaces/validation-message/api":["assets/docs/widgets/interfaces/validation-message/api.md"],"/widgets/interfaces/validation-message/overview":["assets/docs/widgets/interfaces/validation-message/overview-0.md"],"/widgets/interfaces/validation-messages/api":["assets/docs/widgets/interfaces/validation-messages/api.md"],"/widgets/interfaces/validation-messages/overview":["assets/docs/widgets/interfaces/validation-messages/overview-0.md"],"/widgets/modules/dialog/api":["assets/docs/widgets/modules/dialog/api.md"],"/widgets/modules/dialog/overview":["assets/docs/widgets/modules/dialog/overview-0.md"],"/widgets/modules/form/api":["assets/docs/widgets/modules/form/api.md"],"/widgets/modules/form/overview":["assets/docs/widgets/modules/form/overview-0.md"],"/widgets/modules/grid/api":["assets/docs/widgets/modules/grid/api.md"],"/widgets/modules/grid/overview":["assets/docs/widgets/modules/grid/overview-0.md"],"/widgets/modules/layout/api":["assets/docs/widgets/modules/layout/api.md"],"/widgets/modules/layout/overview":["assets/docs/widgets/modules/layout/overview-0.md"],"/widgets/modules/list/api":["assets/docs/widgets/modules/list/api.md"],"/widgets/modules/list/overview":["assets/docs/widgets/modules/list/overview-0.md"],"/widgets/modules/table/api":["assets/docs/widgets/modules/table/api.md"],"/widgets/modules/table/overview":["assets/docs/widgets/modules/table/overview-0.md"],"/widgets/remote-data-source/api":["assets/docs/widgets/remote-data-source/api.md"],"/widgets/remote-data-source/overview":["assets/docs/widgets/remote-data-source/overview-0.md"],"/widgets/services/loading/api":["assets/docs/widgets/services/loading/api.md"],"/widgets/services/loading/overview":["assets/docs/widgets/services/loading/overview-0.md"]};

const USAGE_NOTES_MAP: UsageNoteMap = {"/widgets/components/paged-table/overview":{"## Basic Local Data Usage":["assets/docs/widgets/components/paged-table/usage-notes-1-html.md","assets/docs/widgets/components/paged-table/usage-notes-1-typescript.md"],"## Remote Data Usage Example":["assets/docs/widgets/components/paged-table/usage-notes-2-html.md","assets/docs/widgets/components/paged-table/usage-notes-2-typescript.md"]},"/widgets/components/paged-table-with-toolbar/overview":{"usage-notes":["assets/docs/widgets/components/paged-table-with-toolbar/usage-notes.md"]}};

@Component({
  selector: 'app-tabbed-document-tab',
  templateUrl: './tabbed-document-tab.component.html',
  styleUrls: ['./tabbed-document-tab.component.scss']
})
export class TabbedDocumentTabComponent implements OnInit {

    markdownSrcs!: string[];
    usageNotes!: UsageNote;
    usageNoteKeys!: string[];
    /** The main parent heading elements. */
    headings: Element[] = [];
    /** Contains a map of parent ids to their nested child heading elements. */
    nestedHeadings: NestedHeading = {};
    nestedGrandChildren: NestedHeading = {};

    constructor(
        private el: ElementRef,
        private router: Router 
    ) { }

    ngOnInit(): void {
        this.markdownSrcs = URL_DIRECTORY_MAP[this.router.url];
        this.usageNotes = USAGE_NOTES_MAP[this.router.url];
        if (this.usageNotes) {
            this.usageNoteKeys = Object.keys(this.usageNotes);
        }
    }

    onLoad(): void {
        this.setHeadings(this.el);
    }

    getUsageTabLabel(src: string) {
        if (src.includes('html')) {
            return 'HTML';
        } else {
            return 'Typescript'
        }
    }

    /**
     * Parses the given element to find all h2 and h3 headings from the loaded
     * markdwon file, and creates objects needed to render headings in scroll
     * spy nav components.
     *
     * @param el The HTML element to parse to find headings.
     */
    setHeadings(el: ElementRef): void {
        const headings: Element[] = [];
        el.nativeElement.querySelectorAll('h2')
            .forEach((x: Element) => {
                // add any h3 headings that are siblings of this element to
                // nested headings for this element; any h3 headings that
                // appear as siblings of this element are considered to be
                // nested headings
                const nestedHeadings: Element[] = [];
                let sibling: ChildNode | null = x.nextSibling;
                while(sibling && sibling.nodeName != 'H2') {
                    // nested headings stop when there are no more siblings or
                    // a h2 sibling is found
                    if (sibling.nodeName === 'H3') {
                        // only add h3 headings to nested headings
                        const child = sibling as Element;
                        child.id = this.reformatElementTextForId(child);
                        nestedHeadings.push(child);

                        // add any th nested grand child headings which should
                        // be names of methods (each method rendered in a table
                        // to control formatting)
                        const nestedGrandChildrenHeadings: Element[] = [];
                        let grandChildSibling: ChildNode | null = sibling.nextSibling;
                        while(grandChildSibling && grandChildSibling.nodeName != 'H3') {
                            // nested grand child headings stop when there are
                            // no more siblings or a h3 sibling is found
                            if (grandChildSibling.nodeName === 'TABLE') {
                                let grandChild = grandChildSibling as Element;
                                if (grandChild.classList.contains('method-name')) {
                                    grandChild = grandChild.querySelector('th.method-name-cell') as Element;
                                    grandChild.id = this.reformatElementTextForId(grandChild);
                                    nestedGrandChildrenHeadings.push(grandChild);
                                }
                            }
                            grandChildSibling = grandChildSibling.nextSibling;
                        }
                        this.nestedGrandChildren[child.id] = nestedGrandChildrenHeadings;
                    }
                    sibling = sibling.nextSibling;
                }

                x.id = this.reformatElementTextForId(x);
                this.nestedHeadings[x.id] = nestedHeadings;
                headings.push(x);
            });
        this.headings = headings;
    }

    /**
     * Reformats the given element's innerHTML, which should just be text, so
     * it can be used as an id value to link to with '#' fragments. This means
     * removing any spaces, turning all characters lower case, and inserting a
     * hyphen between any characters that might be upper case. So given
     * something like 'My Awesome Heading', this will return 
     * 'my-awesome-heading'.
     * 
     * @params x The HTML element with display value for links in page.
     * @returns a string that can be used as an id value for fragment link.
     */
    private reformatElementTextForId(x: Element): string {
        const text = x.innerHTML.replace(' ', '');
        let reformattedText = '';
        for(let i = 0; i < text.length; i++) {
            const character = text.charAt(i);
            if (character === character.toUpperCase()) {
                if (i > 0) {
                    reformattedText += '-';
                }
                reformattedText += character.toLowerCase();
            } else {
                reformattedText += character;
            }
        }

        return reformattedText;
    }

}
