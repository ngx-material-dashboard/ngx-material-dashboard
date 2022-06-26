import { Component, ElementRef, Input, OnInit } from '@angular/core';

/**
 * A map of parent heading ids to their child heading elements.
 */
export interface NestedHeading {
    [headingId: string]: Element[]
};

@Component({
  selector: 'app-tabbed-document-tab',
  templateUrl: './tabbed-document-tab.component.html',
  styleUrls: ['./tabbed-document-tab.component.scss']
})
export class TabbedDocumentTabComponent implements OnInit {

    @Input() markdownSrc!: string;
    /** The main parent heading elements. */
    headings: Element[] = [];
    /** Contains a map of parent ids to their nested child heading elements. */
    nestedHeadings: NestedHeading = {};

    constructor(
        private el: ElementRef
    ) { }

    ngOnInit(): void {
    }

    onLoad(): void {
        this.setHeadings(this.el);
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
