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

const URL_DIRECTORY_MAP: UrlDirectoryMap = {"/base-json":[["assets/docs/base-json/overview.md"]],"/base-json/api":[["assets/docs/base-json/base-json/api-8.md"]],"/json-api":[["assets/docs/json-api/overview.md"]],"/json-api/api":[["assets/docs/json-api/json-api/api-2.md"]],"/json":[["assets/docs/json/overview.md"]],"/json/api":[["assets/docs/json/json/api-2.md"]],"/testing":[["assets/docs/testing/overview.md"]],"/testing/api":[["assets/docs/testing/testing/api-19.md"]],"/widgets":[["assets/docs/widgets/overview.md"]],"/widgets/collection/api":[["assets/docs/widgets/collection/api-6.md"]],"/widgets/dialog/api":[["assets/docs/widgets/dialog/api-0.md"]],"/widgets/form/api":[["assets/docs/widgets/form/api-3.md"]],"/widgets/grid/api":[["assets/docs/widgets/grid/api-3.md"]],"/widgets/layout/api":[["assets/docs/widgets/layout/api-3.md"]],"/widgets/list/api":[["assets/docs/widgets/list/api-3.md"]],"/widgets/table/api":[["assets/docs/widgets/table/api-3.md"]],"/widgets/toolbar/api":[["assets/docs/widgets/toolbar/api-6.md"]],"/overview":[["assets/docs/overview.md"]],"/json-overview":[["/assets/docs/json-overview.md"],["assets/docs/shared/crud-capabilities.md"],["assets/docs/shared/custom-headers.md"],["assets/docs/shared/error-handling.md"],["assets/docs/shared/end-overview.md"]]};

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
        const headings: Element[] = [];
        el.nativeElement.querySelectorAll('h2').forEach((x: Element) => {
            // add any h3 headings that are siblings of this element to
            // nested headings for this element; any h3 headings that
            // appear as siblings of this element are considered to be
            // nested headings
            const nestedHeadings: Element[] = [];
            let sibling: ChildNode | null = x.nextSibling;
            while (sibling && sibling.nodeName != 'H2') {
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
                    let grandChildSibling: ChildNode | null =
                        sibling.nextSibling;
                    while (
                        grandChildSibling &&
                        grandChildSibling.nodeName != 'H3'
                    ) {
                        // nested grand child headings stop when there are
                        // no more siblings or a h3 sibling is found
                        if (grandChildSibling.nodeName === 'TABLE') {
                            let grandChild = grandChildSibling as Element;
                            if (grandChild.classList.contains('method-name')) {
                                grandChild = grandChild.querySelector(
                                    'th.method-name-cell'
                                ) as Element;
                                grandChild.id =
                                    this.reformatElementTextForId(grandChild);
                                nestedGrandChildrenHeadings.push(grandChild);
                            }
                        }
                        grandChildSibling = grandChildSibling.nextSibling;
                    }
                    this.nestedGrandChildren[child.id] =
                        nestedGrandChildrenHeadings;
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
