import { ComponentFixture } from '@angular/core/testing';
import { CheckboxElement } from '../checkbox/checkbox.element';
import { PaginatorElement } from '../paginator/paginator.element';
import { ToolbarElement } from '../toolbar/toolbar.element';

export class IconButtonsWithPaginatorBarElement extends ToolbarElement {
    paginator: PaginatorElement;

    constructor(fixture: ComponentFixture<any>, buttonSelectors?: string[]) {
        super(fixture, buttonSelectors);

        this.paginator = new PaginatorElement(
            fixture,
            this.fixture.nativeElement
        );
    }

    /**
     * Returns the checkbox for selecting all items.
     */
    get selectAllCheckbox(): CheckboxElement | undefined {
        try {
            const element: HTMLElement = this.query<HTMLElement>(
                '.marker-checkbox-select-all',
                this.fixture.nativeElement
            );
            return new CheckboxElement(this.fixture, element);
        } catch (error) {
            return undefined;
        }
    }

    /**
     * Returns true if select all checkbox is checked.
     *
     * @returns True if select all checkbox is checked.
     */
    isAllSelected(): boolean {
        if (this.selectAllCheckbox) {
            return this.selectAllCheckbox.checked;
        } else {
            throw Error('Select all checkbox undefined');
        }
    }
}
