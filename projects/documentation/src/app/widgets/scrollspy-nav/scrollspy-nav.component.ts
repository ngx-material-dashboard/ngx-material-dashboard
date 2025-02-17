/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    SimpleChanges
} from '@angular/core';
import * as Gumshoe from 'gumshoejs';
import { NestedHeading } from '../tabbed-document/tabbed-document-tab/tabbed-document-tab.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-scrollspy-nav',
    templateUrl: './scrollspy-nav.component.html',
    styleUrls: ['./scrollspy-nav.component.scss']
})
export class ScrollspyNavComponent
    implements AfterViewInit, OnChanges, OnDestroy
{
    @Input() headings: Element[] | undefined;
    @Input() nestedHeadings: NestedHeading | undefined;
    @Input() nestedGrandChildren: NestedHeading | undefined;
    private scrollSpy: Gumshoe | undefined;
    private sub: Subscription = new Subscription();

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private zone: NgZone
    ) {}

    ngAfterViewInit(): void {
        this.removeHidden(
            this.elementRef.nativeElement.parentElement?.parentElement
        );
        const sub = this.zone.onStable
            // .pipe(first())
            // by continously listening for this we take a performance hit, but
            // links may not be defined when zone is initially stable since they
            // are generated dynamically after loading remote markdown files
            // TODO figure out a way to avoid this
            .subscribe(() => {
                const hostElement = this.elementRef.nativeElement;
                const linkSelector = `.${hostElement.className} a`;
                try {
                    if (this.scrollSpy) {
                        // destroy the existing scrollSpy before creating a new
                        // one; otherwise we end up with a ton of scrollSpys and
                        // browser just stops responding
                        this.scrollSpy.destroy();
                    }
                    this.scrollSpy = new Gumshoe(linkSelector, {
                        offset: 64,
                        reflow: true
                    });
                } catch (error: any) {
                    // console.log(error);
                }
            });
        this.sub.add(sub);

        this.setScrollSpy();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['headings']?.currentValue) {
            this.setScrollSpy();
        }
    }

    ngOnDestroy(): void {
        this.destroyScrollSpy();
        this.sub.unsubscribe();
    }

    destroyScrollSpy(): void {
        if (this.scrollSpy) {
            try {
                this.scrollSpy.destroy();
            } catch (error) {
                console.error(error);
            }
        }
    }

    setScrollSpy(): void {
        if (this.scrollSpy) {
            this.scrollSpy.setup();
            return;
        }
    }

    removeHidden(el: HTMLElement | null | undefined): void {
        let parent = el?.querySelector('.sticky')?.parentElement;

        while (parent) {
            const hasOverflow = getComputedStyle(parent).overflow;
            if (hasOverflow !== 'visible' && hasOverflow !== '') {
                parent.style.overflow = 'visible';
            }
            parent = parent.parentElement;
        }
    }
}
