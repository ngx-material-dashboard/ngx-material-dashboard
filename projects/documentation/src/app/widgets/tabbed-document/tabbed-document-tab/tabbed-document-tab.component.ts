import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnchorService } from '../../../shared/anchor/anchor.service';

/**
 * A map of parent heading ids to their child heading elements.
 */
export interface NestedHeading {
    [headingId: string]: Element[];
}

/**
 * A map of URL strings that map to the markdown file that should be loaded for
 * that URL.
 */
export interface UrlDirectoryMap {
    [url: string]: string[][];
}

export interface UsageNoteMap {
    [url: string]: UsageNote;
}

interface UsageNote {
    [note: string]: string[];
}

const URL_DIRECTORY_MAP: UrlDirectoryMap = {
    '/base-json': [['assets/docs/base-json/overview.md']],
    '/base-json/api': [
        ['assets/docs/base-json/api-0.md'],
        ['assets/docs/base-json/api-1.md'],
        ['assets/docs/base-json/api-2.md'],
        ['assets/docs/base-json/api-3.md'],
        ['assets/docs/base-json/api-4.md'],
        ['assets/docs/base-json/api-5.md'],
        ['assets/docs/base-json/api-6.md'],
        ['assets/docs/base-json/api-7.md'],
        ['assets/docs/base-json/api-8.md'],
        ['assets/docs/base-json/api-9.md'],
        ['assets/docs/base-json/api-10.md'],
        ['assets/docs/base-json/api-11.md']
    ],
    '/json-api': [['assets/docs/json-api/overview.md']],
    '/json-api/api': [
        ['assets/docs/json-api/api-0.md'],
        ['assets/docs/json-api/api-1.md']
    ],
    '/json': [['assets/docs/json/overview.md']],
    '/json/api': [['assets/docs/json/api-0.md'], ['assets/docs/json/api-1.md']],
    '/testing': [['assets/docs/testing/overview.md']],
    '/testing/elements/button': [['assets/docs/testing/elements/api-0.md']],
    '/testing/elements/checkbox': [['assets/docs/testing/elements/api-0.md']],
    '/testing/elements/collection': [['assets/docs/testing/elements/api-0.md']],
    '/testing/elements/icon-buttons-with-paginator-bar': [
        ['assets/docs/testing/elements/api-0.md']
    ],
    '/testing/elements/menu': [['assets/docs/testing/elements/api-0.md']],
    '/testing/elements/page': [['assets/docs/testing/elements/api-0.md']],
    '/testing/elements/paged-collection': [
        ['assets/docs/testing/elements/api-0.md']
    ],
    '/testing/elements/paged-collection-with-toolbar': [
        ['assets/docs/testing/elements/api-0.md']
    ],
    '/testing/elements/paged-table': [
        ['assets/docs/testing/elements/api-0.md']
    ],
    '/testing/elements/paged-table-with-toolbar': [
        ['assets/docs/testing/elements/api-0.md']
    ],
    '/testing/elements/paginator': [['assets/docs/testing/elements/api-0.md']],
    '/testing/elements/select': [['assets/docs/testing/elements/api-0.md']],
    '/testing/elements/sidenav': [['assets/docs/testing/elements/api-0.md']],
    '/testing/elements/table': [['assets/docs/testing/elements/api-0.md']],
    '/testing/elements/toolbar': [['assets/docs/testing/elements/api-0.md']],
    '/testing/elements/toolbar-header': [
        ['assets/docs/testing/elements/api-0.md']
    ],
    '/widgets': [['assets/docs/widgets/overview.md']],
    '/widgets/collection/api': [
        ['assets/docs/widgets/collection/api-0.md'],
        ['assets/docs/widgets/collection/api-1.md'],
        ['assets/docs/widgets/collection/api-2.md'],
        ['assets/docs/widgets/collection/api-3.md'],
        ['assets/docs/widgets/collection/api-4.md'],
        ['assets/docs/widgets/collection/api-5.md'],
        ['assets/docs/widgets/collection/api-6.md'],
        ['assets/docs/widgets/collection/api-7.md'],
        ['assets/docs/widgets/collection/api-8.md']
    ],
    '/widgets/dialog/api': [
        ['assets/docs/widgets/dialog/api-0.md'],
        ['assets/docs/widgets/dialog/api-1.md']
    ],
    '/widgets/form/api': [
        ['assets/docs/widgets/form/api-0.md'],
        ['assets/docs/widgets/form/api-1.md'],
        ['assets/docs/widgets/form/api-2.md'],
        ['assets/docs/widgets/form/api-3.md'],
        ['assets/docs/widgets/form/api-4.md'],
        ['assets/docs/widgets/form/api-5.md']
    ],
    '/widgets/grid/api': [
        ['assets/docs/widgets/grid/api-0.md'],
        ['assets/docs/widgets/grid/api-1.md'],
        ['assets/docs/widgets/grid/api-2.md'],
        ['assets/docs/widgets/grid/api-3.md']
    ],
    '/widgets/layout/api': [
        ['assets/docs/widgets/layout/api-0.md'],
        ['assets/docs/widgets/layout/api-1.md'],
        ['assets/docs/widgets/layout/api-2.md'],
        ['assets/docs/widgets/layout/api-3.md'],
        ['assets/docs/widgets/layout/api-4.md'],
        ['assets/docs/widgets/layout/api-5.md'],
        ['assets/docs/widgets/layout/api-6.md']
    ],
    '/widgets/list/api': [
        ['assets/docs/widgets/list/api-0.md'],
        ['assets/docs/widgets/list/api-1.md'],
        ['assets/docs/widgets/list/api-2.md'],
        ['assets/docs/widgets/list/api-3.md']
    ],
    '/widgets/table/api': [
        ['assets/docs/widgets/table/api-0.md'],
        ['assets/docs/widgets/table/api-1.md'],
        ['assets/docs/widgets/table/api-2.md'],
        ['assets/docs/widgets/table/api-3.md']
    ],
    '/widgets/toolbar/api': [
        ['assets/docs/widgets/toolbar/api-0.md'],
        ['assets/docs/widgets/toolbar/api-1.md'],
        ['assets/docs/widgets/toolbar/api-2.md'],
        ['assets/docs/widgets/toolbar/api-3.md'],
        ['assets/docs/widgets/toolbar/api-4.md'],
        ['assets/docs/widgets/toolbar/api-5.md'],
        ['assets/docs/widgets/toolbar/api-6.md'],
        ['assets/docs/widgets/toolbar/api-7.md'],
        ['assets/docs/widgets/toolbar/api-8.md'],
        ['assets/docs/widgets/toolbar/api-9.md'],
        ['assets/docs/widgets/toolbar/api-10.md']
    ],
    '/overview': [['assets/docs/overview.md']],
    '/json-overview': [
        ['/assets/docs/json-overview.md'],
        ['assets/docs/shared/crud-capabilities.md'],
        ['assets/docs/shared/custom-headers.md'],
        ['assets/docs/shared/error-handling.md'],
        ['assets/docs/shared/end-overview.md']
    ]
};

@Component({
    selector: 'app-tabbed-document-tab',
    templateUrl: './tabbed-document-tab.component.html',
    styleUrls: ['./tabbed-document-tab.component.scss']
})
export class TabbedDocumentTabComponent implements OnInit {
    anchor?: string;
    markdownSrcsList!: string[][];
    /** The main parent heading elements. */
    headings: Element[] = [];
    /** Contains a map of parent ids to their nested child heading elements. */
    nestedHeadings: NestedHeading = {};
    nestedGrandChildren: NestedHeading = {};

    constructor(
        private el: ElementRef,
        private router: Router,
        private anchorService: AnchorService
    ) {}

    ngOnInit(): void {
        const anchorIndex = this.router.url.indexOf('#');
        if (anchorIndex > 0) {
            // set anchor so we can scoll to it when markdown loads and load
            // markdownSrcsList using URL without anchor value (since map
            // doesn't include anchors, and nothing loads if anchor included)
            this.anchor = this.router.url.substring(anchorIndex);
            this.markdownSrcsList =
                URL_DIRECTORY_MAP[this.router.url.substring(0, anchorIndex)];
        } else {
            this.markdownSrcsList = URL_DIRECTORY_MAP[this.router.url];
        }
    }

    /**
     * Handler for when markdown file is loaded.
     */
    onLoad(): void {
        this.setHeadings(this.el);
        if (this.anchor) {
            // if anchor is set that means user either copy/pasted URL or
            // clicked on URL from another markdown page, so scroll to
            // anchor in route
            this.anchorService.scrollToAnchor();
        }
    }

    /**
     * Returns the tab label based on the given src value.
     *
     * @param src Either 'html' or 'typescript'.
     * @returns The tab label based on the given src value.
     */
    getUsageTabLabel(src: string) {
        if (src.includes('html')) {
            return 'HTML';
        } else {
            return 'Typescript';
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
        const allHeadings: Element[] = [];
        // find all h2 and h3 elements in each markdown element, which will
        // result in sorted order of array of headings on page; any h3 headings
        // will be nested under the closest h2 in the array of all headings
        // that has index less than h3 index
        el.nativeElement.querySelectorAll('markdown').forEach((x: Element) => {
            for (let i = 0; i < x.childNodes.length; i++) {
                const node = x.childNodes.item(i);
                if (node.nodeName === 'H2' || node.nodeName === 'H3') {
                    const el = node as Element;
                    el.id = this.reformatElementTextForId(el);
                    allHeadings.push(el);
                }
            }
        });

        // find nested headings and set values accordingly
        const headings: Element[] = [];
        for (let i = 0; i < allHeadings.length; i++) {
            const e = allHeadings[i];
            if (e.nodeName === 'H2') {
                headings.push(e);
                i++;
                const nestedHeadings: Element[] = [];
                while (
                    i < allHeadings.length &&
                    allHeadings[i].nodeName !== 'H2'
                ) {
                    nestedHeadings.push(allHeadings[i]);
                    i++;
                }
                this.nestedHeadings[e.id] = nestedHeadings;
                // reset index back one in case last element was h2; otherwise
                // we miss some headings
                i--;
            }
        }
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
        for (let i = 0; i < text.length; i++) {
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
