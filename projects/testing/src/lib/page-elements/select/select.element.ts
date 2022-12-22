import { OverlayContainer } from '@angular/cdk/overlay';
import { DebugElement } from '@angular/core';
import { ComponentFixture, flush, inject, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PageElement } from '../page/page.element';

/**
 * The `Select` class defines properties and functions useful for testing
 * components with one or more select fields. NOTE: you must use fakeAsync in
 * your tests when calling `initOptions` and `select` methods. Mostly based on
 * code provided at following gist:
 * https://gist.github.com/glendaviesnz/fc8e99b41f0dda8b1c0dc4d397e0d152
 */
export class SelectElement extends PageElement {
    private container!: OverlayContainer;
    private containerElement!: HTMLElement;
    private options$!: HTMLElement[];
    private parentElement?: HTMLElement;
    private selectElement!: HTMLSelectElement;
    private selectDebugElement!: DebugElement;

    constructor(fixture: ComponentFixture<any>, parentElement?: HTMLElement) {
        super(fixture);
        inject([OverlayContainer], (oc: OverlayContainer) => {
            this.container = oc;
            this.containerElement = oc.getContainerElement();
        })();
        this.parentElement = parentElement;
        this.selectDebugElement = this.fixture.debugElement.query(
            By.css(`mat-select`)
        );
        this.selectElement = this.selectDebugElement.nativeElement;
        this.options$ = [];
    }

    get options(): HTMLElement[] {
        return this.options$;
    }

    get trigger(): HTMLElement {
        return this.query<HTMLElement>(
            '.mat-select-trigger',
            this.parentElement
        );
    }

    initOptions(): void {
        this.open();
        this.options$ = Array.from(
            this.containerElement.querySelectorAll(
                'mat-option'
            ) as NodeListOf<HTMLElement>
        );
    }

    /**
     * Returns the selected value. Note that the ngOnInit() must be called before the correct value can be returned, otherwise
     * the placeholder is returned. See answer in following stackoverflow: https://stackoverflow.com/a/53724641.
     */
    get value(): string | undefined {
        const matSelectValueDebugElement = this.selectDebugElement.query(
            By.css('.mat-select-trigger .mat-select-value')
        ).nativeElement;
        const value = matSelectValueDebugElement.children[0].children[0];
        return value ? value.innerText : undefined;
    }

    /**
     * Select the given option in the select menu.
     *
     * @param option the 'mat-option' to select
     */
    selectOption(option: HTMLElement) {
        this.open();
        option.click();
        this.fixture.detectChanges();

        this.selectElement.dispatchEvent(new Event('change'));
        this.fixture.detectChanges();

        flush();
        this.cleanup();
    }

    select(index: number) {
        this.open();
        this.options[index].click();
        this.fixture.detectChanges();

        this.selectElement.dispatchEvent(new Event('change'));
        this.fixture.detectChanges();

        flush();
        this.cleanup();
    }

    /**
     * Select an option in the select menu by key.
     *
     * @param options the array of options available in the select menu
     * @param key the key of the 'mat-option' to select
     */
    selectOptionByKey(key: string) {
        this.options.forEach((option: HTMLElement) => {
            if (option.innerText.trim() === key) {
                this.selectOption(option);
            }
        });
    }

    /**
     * Destroy the OverlayContainer.
     */
    cleanup() {
        this.container.ngOnDestroy();
    }

    /**
     * Open the select menu.
     */
    open() {
        this.fixture.detectChanges();
        this.trigger.click();
        this.fixture.detectChanges();
    }
}
