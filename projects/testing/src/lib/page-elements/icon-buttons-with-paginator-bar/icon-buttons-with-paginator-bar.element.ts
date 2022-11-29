import { ComponentFixture } from '@angular/core/testing';
import { PaginatorElement } from '../paginator/paginator.element';
import { ToolbarElement } from '../toolbar/toolbar.element';

export class IconButtonsWithPaginatorBarElement extends ToolbarElement {

    paginator: PaginatorElement;

    constructor(fixture: ComponentFixture<any>, buttonSelectors?: string[]) {
        super(fixture, buttonSelectors);

        this.paginator = new PaginatorElement(fixture, this.fixture.nativeElement);
    }
}
