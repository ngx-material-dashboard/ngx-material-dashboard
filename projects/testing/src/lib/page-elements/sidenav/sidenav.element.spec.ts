import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavElement } from './sidenav.element';

@Component({
    template: `
        <mat-nav-list>
            <mat-list-item
                class="marker-list-item-button-activeItem selected-list-item"
                (click)="click()"
            >
                <span fxFlex="0 0 auto" class="marker-list-item">
                    <span class="pl-2 marker-list-item-text">Active Item</span>
                </span>
            </mat-list-item>
            <mat-list-item
                class="marker-list-item-button-inactiveItem"
                (click)="click()"
            >
                <span fxFlex="0 0 auto" class="marker-list-item pl-4">
                    <span class="pl-2 marker-list-item-text"
                        >Inactive Item</span
                    >
                </span>
            </mat-list-item>
        </mat-nav-list>
    `
})
class SidenavComponent {
    click(): void {}
}

@Component({
    template: `<mat-nav-list></mat-nav-list>`
})
class SidenavEmptyComponent {}

@Component({
    template: `
        <mat-nav-list>
            <mat-list-item
                class="marker-list-item-button-activeParent"
                (click)="click()"
            >
                <span class="marker-angle-down"></span>
                <span fxFlex="0 0 auto" class="marker-list-item">
                    <span class="pl-2 marker-list-item-text"
                        >Active Item With Children</span
                    >
                </span>
            </mat-list-item>
            <mat-list-item
                class="marker-list-item-button-activeChild selected-list-item"
                (click)="click()"
            >
                <span fxFlex="0 0 auto" class="marker-list-item pl-4">
                    <span class="pl-2 marker-list-item-text">Active Child</span>
                </span>
            </mat-list-item>
            <mat-list-item
                class="marker-list-item-button-inactiveItem"
                (click)="click()"
            >
                <span class="marker-angle-right"></span>
                <span fxFlex="0 0 auto" class="marker-list-item pl-4">
                    <span class="pl-2 marker-list-item-text"
                        >Inactive Item</span
                    >
                </span>
            </mat-list-item>
        </mat-nav-list>
    `
})
class SidenavWithChildrenComponent {
    click(): void {}
}

@Component({
    template: `
        <mat-nav-list>
            <mat-list-item
                class="marker-list-item-button-activeParent"
                (click)="click()"
            >
                <span class="marker-angle-down"></span>
                <span fxFlex="0 0 auto" class="marker-list-item">
                    <span class="pl-2 marker-list-item-text"
                        >Active Item With Children</span
                    >
                </span>
            </mat-list-item>
            <mat-list-item
                class="marker-list-item-button-activeChild selected-list-item"
                (click)="click()"
            >
                <span class="marker-angle-down"></span>
                <span fxFlex="0 0 auto" class="marker-list-item pl-4">
                    <span class="pl-2 marker-list-item-text"
                        >Active Child With Grand Children</span
                    >
                </span>
            </mat-list-item>
            <mat-list-item
                class="marker-list-item-button-activeGrandChild selected-list-item"
                (click)="click()"
            >
                <span fxFlex="0 0 auto" class="marker-list-item pl-4">
                    <span class="pl-2 marker-list-item-text"
                        >Active Grand Child</span
                    >
                </span>
            </mat-list-item>
            <mat-list-item
                class="marker-list-item-button-inactiveItem"
                (click)="click()"
            >
                <span class="marker-angle-right"></span>
                <span fxFlex="0 0 auto" class="marker-list-item pl-4">
                    <span class="pl-2 marker-list-item-text"
                        >Inactive Item</span
                    >
                </span>
            </mat-list-item>
        </mat-nav-list>
    `
})
class SidenavWithGrandChildrenComponent {
    click(): void {}
}

describe('SidenavElement', () => {
    let buttonClickSpy: jasmine.Spy;
    let sidenavElement: SidenavElement;

    describe('Basic Sidenav', () => {
        beforeEach(() => {
            sidenavElement = init(
                SidenavComponent,
                ['activeItem', 'inactiveItem'],
                []
            );
            buttonClickSpy = spyOn(
                sidenavElement.fixture.componentInstance,
                'click'
            );
        });

        it('should have 2 main sidenav elements', () => {
            expect(sidenavElement.listItemsLength).toEqual(2);
        });

        it('should return true when isListItemActive called with activeItem', () => {
            expect(sidenavElement.isListItemActive('activeItem')).toBeTrue();
        });

        it('should return false when isListItemActive called with inactiveItem', () => {
            expect(sidenavElement.isListItemActive('inactiveItem')).toBeFalse();
        });

        it('should emit click when list item clicked', () => {
            // when: the inactiveItem is clicked
            sidenavElement.clickListItem('inactiveItem');

            // expect: the click event should have been called
            expect(buttonClickSpy).toHaveBeenCalled();
        });
    });

    describe('Empty Sidenav', () => {
        // while it doesn't really make sense to test an empty sidenav, the element
        // does allow for defining a sidenav without any elements, so test(s) are
        // included here for that case
        beforeEach(() => {
            sidenavElement = init(SidenavEmptyComponent);
        });

        it('should create the sidenavElement', () => {
            expect(sidenavElement).toBeDefined();
        });
    });

    describe('Sidenav with Children', () => {
        beforeEach(() => {
            sidenavElement = init(
                SidenavWithChildrenComponent,
                ['activeParent', 'inactiveItem'],
                ['activeChild']
            );
            buttonClickSpy = spyOn(
                sidenavElement.fixture.componentInstance,
                'click'
            );
        });

        it('should have 2 main sidenav elements', () => {
            expect(sidenavElement.listItemsLength).toEqual(2);
        });

        it('should return true when isListItemExpanded is called with activeParent', () => {
            expect(
                sidenavElement.isListItemExpanded('activeParent')
            ).toBeTrue();
        });

        it('should return false when isListItemExpanded is called with inactiveItem', () => {
            expect(
                sidenavElement.isListItemExpanded('inactiveItem')
            ).toBeFalse();
        });

        it('should return true when isListItemActive is called for activeChild', () => {
            expect(sidenavElement.isListItemActive('activeChild')).toBeTrue();
        });
    });

    describe('SidenavItem with Grand Children', () => {
        beforeEach(() => {
            sidenavElement = init(
                SidenavWithGrandChildrenComponent,
                ['activeParent', 'inactiveItem'],
                ['activeChild'],
                ['activeGrandChild']
            );
            buttonClickSpy = spyOn(
                sidenavElement.fixture.componentInstance,
                'click'
            );
        });

        it('should have 2 main sidenav elements', () => {
            expect(sidenavElement.listItemsLength).toEqual(2);
        });

        it('should return true when isListItemExpanded is called with activeParent', () => {
            expect(
                sidenavElement.isListItemExpanded('activeParent')
            ).toBeTrue();
        });

        it('should return false when isListItemExpanded is called with inactiveItem', () => {
            expect(
                sidenavElement.isListItemExpanded('inactiveItem')
            ).toBeFalse();
        });

        it('should return true when isListItemExpanded is called for activeChild', () => {
            expect(sidenavElement.isListItemExpanded('activeChild')).toBeTrue();
        });

        it('should return true when isListItemActive is called for activeGrandChild', () => {
            expect(
                sidenavElement.isListItemActive('activeGrandChild')
            ).toBeTrue();
        });
    });
});

function init(
    component: any,
    listItemSelectors?: string[],
    listItemChildSelectors?: string[],
    listItemGrandChildrenSelectors?: string[]
): SidenavElement {
    TestBed.configureTestingModule({
        declarations: [component],
        imports: [MatListModule, MatSidenavModule]
    });

    const fixture = TestBed.createComponent(component);
    if (listItemSelectors && listItemChildSelectors) {
        return new SidenavElement(
            fixture,
            listItemSelectors,
            listItemChildSelectors,
            listItemGrandChildrenSelectors
        );
    } else {
        return new SidenavElement(fixture);
    }
}
