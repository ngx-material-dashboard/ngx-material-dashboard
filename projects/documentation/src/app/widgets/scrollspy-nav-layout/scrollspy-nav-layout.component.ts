/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { Component, HostListener, Input } from '@angular/core';
import { faChevronUp, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NestedHeading } from '../tabbed-document/tabbed-document-tab/tabbed-document-tab.component';
import { ZOOM_ANIMATION } from './scrollspy-nav-layout.animation';

@Component({
    animations: [ZOOM_ANIMATION],
    selector: 'app-scrollspy-nav-layout',
    templateUrl: './scrollspy-nav-layout.component.html',
    styleUrls: ['./scrollspy-nav-layout.component.scss']
})
export class ScrollspyNavLayoutComponent {
    @Input() headings: Element[] | undefined;
    @Input() nestedHeadings: NestedHeading | undefined;
    @Input() nestedGrandChildren: NestedHeading | undefined;
    faChevronUp: IconDefinition = faChevronUp;

    showScrollUpButton = false;

    get contentWidth(): string {
        if (this.headings && this.headings.length > 0) {
            return '230';
        } else {
            return '30';
        }
    }

    get scrollspyNavWidth(): string {
        if (this.headings && this.headings.length > 0) {
            return '220';
        } else {
            return '20';
        }
    }

    @HostListener('window:scroll')
    onWindowScroll(): void {
        this.showScrollUpButton = Math.ceil(window.pageYOffset) > 10;
    }

    onScrollUp(): void {
        window.scrollTo(0, 0);
        location.hash = '';
    }
}
