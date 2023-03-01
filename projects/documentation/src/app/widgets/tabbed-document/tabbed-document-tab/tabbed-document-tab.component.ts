/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

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
    '/base-json': [
        ['assets/docs/base-json/overview.md'],
        ['assets/docs/base-json/install.md'],
        ['assets/docs/shared/configuration.md'],
        ['assets/docs/base-json/usage.md'],
        ['assets/docs/shared/crud-capabilities.md'],
        ['assets/docs/shared/custom-headers.md'],
        ['assets/docs/shared/error-handling.md'],
        ['assets/docs/shared/end-overview.md']
    ],
    '/base-json/readme': [
        ['assets/docs/base-json/overview.md'],
        ['assets/docs/base-json/install.md'],
        ['assets/docs/shared/configuration.md'],
        ['assets/docs/base-json/usage.md'],
        ['assets/docs/shared/crud-capabilities.md'],
        ['assets/docs/shared/custom-headers.md'],
        ['assets/docs/shared/error-handling.md'],
        ['assets/docs/shared/end-overview.md']
    ],
    '/base-json/api': [
        ['assets/docs/base-json/api-0.md'],
        ['assets/docs/base-json/api-1.md'],
        ['assets/docs/base-json/api-2.md'],
        ['assets/docs/base-json/api-3.md'],
        ['assets/docs/base-json/api-4.md'],
        ['assets/docs/base-json/api-5.md']
    ],
    '/base-json/overview': [
        ['assets/docs/base-json/overview-0.md'],
        ['assets/docs/base-json/overview-1.md'],
        ['assets/docs/base-json/overview-2.md'],
        ['assets/docs/base-json/overview-3.md'],
        ['assets/docs/base-json/overview-4.md'],
        ['assets/docs/base-json/overview-5.md']
    ],
    '/json-api': [
        ['assets/docs/json-api/overview.md'],
        ['assets/docs/json-api/install.md'],
        ['assets/docs/shared/configuration.md'],
        ['assets/docs/json-api/usage.md'],
        ['assets/docs/shared/crud-capabilities.md'],
        ['assets/docs/shared/custom-headers.md'],
        ['assets/docs/shared/error-handling.md'],
        ['assets/docs/shared/end-overview.md']
    ],
    '/json-api/readme': [
        ['assets/docs/json-api/overview.md'],
        ['assets/docs/json-api/install.md'],
        ['assets/docs/shared/configuration.md'],
        ['assets/docs/json-api/usage.md'],
        ['assets/docs/shared/crud-capabilities.md'],
        ['assets/docs/shared/custom-headers.md'],
        ['assets/docs/shared/error-handling.md'],
        ['assets/docs/shared/end-overview.md']
    ],
    '/json-api/api': [
        ['assets/docs/json-api/api-0.md'],
        ['assets/docs/json-api/api-1.md'],
        ['assets/docs/json-api/api-2.md']
    ],
    '/json-api/overview': [
        ['assets/docs/json-api/overview-0.md'],
        ['assets/docs/json-api/overview-1.md'],
        ['assets/docs/json-api/overview-2.md']
    ],
    '/json': [
        ['assets/docs/json/overview.md'],
        ['assets/docs/json/format.md'],
        ['assets/docs/json/install.md'],
        ['assets/docs/shared/configuration.md'],
        ['assets/docs/json/usage.md'],
        ['assets/docs/shared/crud-capabilities.md'],
        ['assets/docs/shared/custom-headers.md'],
        ['assets/docs/shared/error-handling.md'],
        ['assets/docs/shared/end-overview.md']
    ],
    '/json/readme': [
        ['assets/docs/json/overview.md'],
        ['assets/docs/json/format.md'],
        ['assets/docs/json/install.md'],
        ['assets/docs/shared/configuration.md'],
        ['assets/docs/json/usage.md'],
        ['assets/docs/shared/crud-capabilities.md'],
        ['assets/docs/shared/custom-headers.md'],
        ['assets/docs/shared/error-handling.md'],
        ['assets/docs/shared/end-overview.md']
    ],
    '/json/api': [['assets/docs/json/api-0.md'], ['assets/docs/json/api-1.md']],
    '/json/overview': [
        ['assets/docs/json/overview-0.md'],
        ['assets/docs/json/overview-1.md']
    ],
    '/testing': [['assets/docs/testing/overview.md']],
    '/testing/readme': [['assets/docs/testing/overview.md']],
    '/testing/elements/examples': [
        ['assets/docs/testing/elements/example-0.md'],
        ['assets/docs/testing/elements/example-2.md'],
        ['assets/docs/testing/elements/example-typescript-1.md'],
        ['assets/docs/testing/elements/example-3.md'],
        ['assets/docs/testing/elements/example-5.md'],
        ['assets/docs/testing/elements/example-typescript-4.md'],
        ['assets/docs/testing/elements/example-6.md'],
        ['assets/docs/testing/elements/example-8.md'],
        ['assets/docs/testing/elements/example-typescript-7.md'],
        ['assets/docs/testing/elements/example-9.md'],
        ['assets/docs/testing/elements/example-11.md'],
        ['assets/docs/testing/elements/example-typescript-10.md'],
        ['assets/docs/testing/elements/example-12.md'],
        ['assets/docs/testing/elements/example-14.md'],
        ['assets/docs/testing/elements/example-typescript-13.md']
    ],
    '/testing/elements/api': [['assets/docs/testing/elements/api-0.md']],
    '/testing/elements/overview': [
        ['assets/docs/testing/elements/overview-0.md']
    ],
    '/testing/fixtures/api': [['assets/docs/testing/fixtures/api-1.md']],
    '/testing/fixtures/overview': [
        ['assets/docs/testing/fixtures/overview-1.md']
    ],
    '/testing/models/api': [['assets/docs/testing/models/api-2.md']],
    '/testing/models/overview': [['assets/docs/testing/models/overview-2.md']],
    '/testing/mocks/examples': [
        ['assets/docs/testing/mocks/example-15.md'],
        ['assets/docs/testing/mocks/example-17.md'],
        ['assets/docs/testing/mocks/example-typescript-16.md']
    ],
    '/testing/mocks/api': [['assets/docs/testing/mocks/api-3.md']],
    '/testing/mocks/overview': [['assets/docs/testing/mocks/overview-3.md']],
    '/widgets': [['assets/docs/widgets/overview.md']],
    '/widgets/readme': [['assets/docs/widgets/overview.md']],
    '/widgets/alert/api': [
        ['assets/docs/widgets/alert/api-0.md'],
        ['assets/docs/widgets/alert/api-1.md'],
        ['assets/docs/widgets/alert/api-2.md'],
        ['assets/docs/widgets/alert/api-3.md'],
        ['assets/docs/widgets/alert/api-4.md']
    ],
    '/widgets/alert/overview': [
        ['assets/docs/widgets/alert/overview-0.md'],
        ['assets/docs/widgets/alert/overview-1.md'],
        ['assets/docs/widgets/alert/overview-2.md'],
        ['assets/docs/widgets/alert/overview-3.md'],
        ['assets/docs/widgets/alert/overview-4.md']
    ],
    '/widgets/collection/api': [
        ['assets/docs/widgets/collection/api-0.md'],
        ['assets/docs/widgets/collection/api-1.md'],
        ['assets/docs/widgets/collection/api-2.md'],
        ['assets/docs/widgets/collection/api-3.md']
    ],
    '/widgets/collection/overview': [
        ['assets/docs/widgets/collection/overview-0.md'],
        ['assets/docs/widgets/collection/overview-1.md'],
        ['assets/docs/widgets/collection/overview-2.md'],
        ['assets/docs/widgets/collection/overview-3.md']
    ],
    '/widgets/collection/examples': [
        ['assets/docs/widgets/collection/example-0.md'],
        ['assets/docs/widgets/collection/example-3.md'],
        [
            'assets/docs/widgets/collection/example-html-1.md',
            'assets/docs/widgets/collection/example-typescript-2.md'
        ]
    ],
    '/widgets/dialog/api': [
        ['assets/docs/widgets/dialog/api-0.md'],
        ['assets/docs/widgets/dialog/api-1.md']
    ],
    '/widgets/dialog/overview': [
        ['assets/docs/widgets/dialog/overview-0.md'],
        ['assets/docs/widgets/dialog/overview-1.md']
    ],
    '/widgets/form/examples': [
        ['assets/docs/widgets/form/example-0.md'],
        ['assets/docs/widgets/form/example-3.md'],
        [
            'assets/docs/widgets/form/example-html-1.md',
            'assets/docs/widgets/form/example-typescript-2.md'
        ]
    ],
    '/widgets/form/api': [
        ['assets/docs/widgets/form/api-0.md'],
        ['assets/docs/widgets/form/api-1.md'],
        ['assets/docs/widgets/form/api-2.md'],
        ['assets/docs/widgets/form/api-3.md']
    ],
    '/widgets/form/overview': [
        ['assets/docs/widgets/form/overview-0.md'],
        ['assets/docs/widgets/form/overview-1.md'],
        ['assets/docs/widgets/form/overview-2.md'],
        ['assets/docs/widgets/form/overview-3.md']
    ],
    '/widgets/grid/examples': [
        ['assets/docs/widgets/grid/example-0.md'],
        ['assets/docs/widgets/grid/example-3.md'],
        [
            'assets/docs/widgets/grid/example-html-1.md',
            'assets/docs/widgets/grid/example-typescript-2.md'
        ],
        ['assets/docs/widgets/grid/example-4.md'],
        ['assets/docs/widgets/grid/example-7.md'],
        [
            'assets/docs/widgets/grid/example-html-5.md',
            'assets/docs/widgets/grid/example-typescript-6.md'
        ],
        ['assets/docs/widgets/grid/example-8.md'],
        ['assets/docs/widgets/grid/example-11.md'],
        [
            'assets/docs/widgets/grid/example-html-9.md',
            'assets/docs/widgets/grid/example-typescript-10.md'
        ],
        ['assets/docs/widgets/grid/example-12.md'],
        ['assets/docs/widgets/grid/example-15.md'],
        [
            'assets/docs/widgets/grid/example-html-13.md',
            'assets/docs/widgets/grid/example-typescript-14.md'
        ]
    ],
    '/widgets/grid/api': [['assets/docs/widgets/grid/api-0.md']],
    '/widgets/grid/overview': [['assets/docs/widgets/grid/overview-0.md']],
    '/widgets/layout/examples': [
        ['assets/docs/widgets/layout/example-0.md'],
        ['assets/docs/widgets/layout/example-3.md'],
        [
            'assets/docs/widgets/layout/example-html-1.md',
            'assets/docs/widgets/layout/example-typescript-2.md'
        ],
        ['assets/docs/widgets/layout/example-4.md'],
        ['assets/docs/widgets/layout/example-7.md'],
        [
            'assets/docs/widgets/layout/example-html-5.md',
            'assets/docs/widgets/layout/example-typescript-6.md'
        ],
        ['assets/docs/widgets/layout/example-8.md'],
        ['assets/docs/widgets/layout/example-11.md'],
        [
            'assets/docs/widgets/layout/example-html-9.md',
            'assets/docs/widgets/layout/example-typescript-10.md'
        ],
        ['assets/docs/widgets/layout/example-12.md'],
        ['assets/docs/widgets/layout/example-15.md'],
        [
            'assets/docs/widgets/layout/example-html-13.md',
            'assets/docs/widgets/layout/example-typescript-14.md'
        ]
    ],
    '/widgets/layout/api': [
        ['assets/docs/widgets/layout/api-0.md'],
        ['assets/docs/widgets/layout/api-1.md'],
        ['assets/docs/widgets/layout/api-2.md'],
        ['assets/docs/widgets/layout/api-3.md'],
        ['assets/docs/widgets/layout/api-4.md']
    ],
    '/widgets/layout/overview': [
        ['assets/docs/widgets/layout/overview-0.md'],
        ['assets/docs/widgets/layout/overview-1.md'],
        ['assets/docs/widgets/layout/overview-2.md'],
        ['assets/docs/widgets/layout/overview-3.md'],
        ['assets/docs/widgets/layout/overview-4.md']
    ],
    '/widgets/list/examples': [
        ['assets/docs/widgets/list/example-0.md'],
        ['assets/docs/widgets/list/example-3.md'],
        [
            'assets/docs/widgets/list/example-html-1.md',
            'assets/docs/widgets/list/example-typescript-2.md'
        ],
        ['assets/docs/widgets/list/example-4.md'],
        ['assets/docs/widgets/list/example-7.md'],
        [
            'assets/docs/widgets/list/example-html-5.md',
            'assets/docs/widgets/list/example-typescript-6.md'
        ],
        ['assets/docs/widgets/list/example-8.md'],
        ['assets/docs/widgets/list/example-11.md'],
        [
            'assets/docs/widgets/list/example-html-9.md',
            'assets/docs/widgets/list/example-typescript-10.md'
        ],
        ['assets/docs/widgets/list/example-12.md'],
        ['assets/docs/widgets/list/example-15.md'],
        [
            'assets/docs/widgets/list/example-html-13.md',
            'assets/docs/widgets/list/example-typescript-14.md'
        ]
    ],
    '/widgets/list/api': [['assets/docs/widgets/list/api-0.md']],
    '/widgets/list/overview': [['assets/docs/widgets/list/overview-0.md']],
    '/widgets/table/examples': [
        ['assets/docs/widgets/table/example-0.md'],
        ['assets/docs/widgets/table/example-3.md'],
        [
            'assets/docs/widgets/table/example-html-1.md',
            'assets/docs/widgets/table/example-typescript-2.md'
        ],
        ['assets/docs/widgets/table/example-6.md'],
        [
            'assets/docs/widgets/table/example-html-4.md',
            'assets/docs/widgets/table/example-typescript-5.md'
        ],
        ['assets/docs/widgets/table/example-7.md'],
        ['assets/docs/widgets/table/example-10.md'],
        [
            'assets/docs/widgets/table/example-html-8.md',
            'assets/docs/widgets/table/example-typescript-9.md'
        ],
        ['assets/docs/widgets/table/example-11.md'],
        ['assets/docs/widgets/table/example-14.md'],
        [
            'assets/docs/widgets/table/example-html-12.md',
            'assets/docs/widgets/table/example-typescript-13.md'
        ],
        ['assets/docs/widgets/table/example-15.md'],
        ['assets/docs/widgets/table/example-18.md'],
        [
            'assets/docs/widgets/table/example-html-16.md',
            'assets/docs/widgets/table/example-typescript-17.md'
        ]
    ],
    '/widgets/table/api': [['assets/docs/widgets/table/api-0.md']],
    '/widgets/table/overview': [['assets/docs/widgets/table/overview-0.md']],
    '/widgets/toolbar/api': [
        ['assets/docs/widgets/toolbar/api-0.md'],
        ['assets/docs/widgets/toolbar/api-1.md'],
        ['assets/docs/widgets/toolbar/api-2.md'],
        ['assets/docs/widgets/toolbar/api-3.md']
    ],
    '/widgets/toolbar/overview': [
        ['assets/docs/widgets/toolbar/overview-0.md'],
        ['assets/docs/widgets/toolbar/overview-1.md'],
        ['assets/docs/widgets/toolbar/overview-2.md'],
        ['assets/docs/widgets/toolbar/overview-3.md']
    ],
    '/widgets/toolbar/examples': [
        ['assets/docs/widgets/toolbar/example-0.md'],
        ['assets/docs/widgets/toolbar/example-3.md'],
        [
            'assets/docs/widgets/toolbar/example-html-1.md',
            'assets/docs/widgets/toolbar/example-typescript-2.md'
        ]
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
