import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, NgZone, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import * as Gumshoe from 'gumshoejs';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-scrollspy-nav',
    templateUrl: './scrollspy-nav.component.html',
    styleUrls: ['./scrollspy-nav.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollspyNavComponent implements AfterViewInit, OnChanges, OnDestroy {

    @Input()headings: Element[] | undefined;
    private scrollSpy: Gumshoe | undefined;

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private zone: NgZone
    ) { }

    ngAfterViewInit(): void {
        this.removeHidden(this.elementRef.nativeElement.parentElement?.parentElement);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['headings']?.currentValue) {
            this.setScrollSpy();
        }
    }

    ngOnDestroy(): void {
        this.destroyScrollSpy();
    }

    destroyScrollSpy(): void {
        if (this.scrollSpy) {
            this.scrollSpy.destroy();
        }
    }

    setScrollSpy(): void {
        if (this.scrollSpy) {
            this.scrollSpy.setup();
            return;
        }
        this.zone.onStable
            .pipe(first())
            .subscribe(() => {
                const hostElement = this.elementRef.nativeElement;
                const linkSelector = `${hostElement.tagName}.${hostElement.className} a`;
                try {
                    this.scrollSpy = new Gumshoe(linkSelector, { offset: 0, reflow: true });
                    
                } catch(error: any) {
                    console.log(error);
                }
            });
    }

    removeHidden(el: HTMLElement | null | undefined): void {
        console.log(el);
        let parent = el?.querySelector('.sticky')?.parentElement;
        console.log(parent);

        while (parent) {
            const hasOverflow = getComputedStyle(parent).overflow;
            if (hasOverflow !== 'visible' && hasOverflow !== '') {
                console.log(hasOverflow, parent);
                parent.style.overflow = 'visible';
                // parent.style.overflowY = 'visible';
                // parent.style.overflowX = hasOverflow;
            }
            parent = parent.parentElement;
        }
    }
}
