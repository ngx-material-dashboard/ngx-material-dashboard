/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { Component, TemplateRef, ViewChild } from '@angular/core';
import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SkeletonListDirective } from './skeleton-list.directive';

// 1. Create a Mock Host Component to simulate standard and custom template use-cases
@Component({
    template: `
        <!-- Wrapped inside a native container block so parentNode is guaranteed to resolve -->
        <div class="test-container-context">
            <ng-template
                [ngxSkeletonList]="isLoading"
                [customSkeletonTemplate]="customTemplate"
            >
                <div class="real-data-list-layer">
                    <div class="real-row">Real Data Row</div>
                </div>
            </ng-template>
        </div>

        <!-- Custom Skeleton Template to test developer-supplied markup -->
        <ng-template #myCustomSkeleton>
            <div class="custom-skeleton-item">Custom Mock Shape</div>
        </ng-template>
    `
})
class TestHostComponent {
    isLoading = true;
    customTemplate: TemplateRef<any> | undefined = undefined;

    @ViewChild('myCustomSkeleton', { static: true })
    myCustomSkeleton!: TemplateRef<any>;
}

describe('SkeletonListDirective', () => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SkeletonListDirective, TestHostComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;
    });

    it('should render default fallback skeleton rows when customSkeletonTemplate remains undefined', () => {
        component.isLoading = true;
        component.customTemplate = undefined;
        fixture.detectChanges();

        const wrapper = fixture.debugElement.query(
            By.css('.list-layout-wrapper')
        );
        expect(wrapper).toBeTruthy();
        expect(
            wrapper.nativeElement.classList.contains('is-loading')
        ).toBeTrue();

        const defaultRows = fixture.debugElement.queryAll(
            By.css('.skeleton-row')
        );
        expect(defaultRows.length).toBe(6);
    });

    it('should dynamically hot-swap default rows for a custom template when it arrives late', () => {
        component.isLoading = true;
        component.customTemplate = undefined;
        fixture.detectChanges();

        let defaultRows = fixture.debugElement.queryAll(
            By.css('.skeleton-row')
        );
        expect(defaultRows.length).toBe(6);

        component.customTemplate = component.myCustomSkeleton;
        fixture.detectChanges();

        defaultRows = fixture.debugElement.queryAll(By.css('.skeleton-row'));
        expect(defaultRows.length).toBe(0);

        const customShapes = fixture.debugElement.queryAll(
            By.css('.custom-skeleton-item')
        );
        expect(customShapes.length).toBeGreaterThan(0);
        expect(customShapes[0].nativeElement.textContent).toContain(
            'Custom Mock Shape'
        );
    });

    it('should safely render actual content directly if local data skips loading phase entirely', fakeAsync(() => {
        component.isLoading = false;
        component.customTemplate = undefined;
        fixture.detectChanges();
        tick();

        const wrapper = fixture.debugElement.query(
            By.css('.list-layout-wrapper')
        );
        expect(wrapper).toBeTruthy();
        expect(
            wrapper.nativeElement.classList.contains('is-loading')
        ).toBeFalse();

        const defaultRows = fixture.debugElement.queryAll(
            By.css('.skeleton-row')
        );
        expect(defaultRows.length).toBe(0);

        const realDataRows = fixture.debugElement.queryAll(By.css('.real-row'));
        expect(realDataRows.length).toBe(1);
        expect(realDataRows[0].nativeElement.textContent).toContain(
            'Real Data Row'
        );
    }));

    it('should transition smoothly between states when loading resolves', fakeAsync(() => {
        component.isLoading = true;
        fixture.detectChanges();

        const wrapper = fixture.debugElement.query(
            By.css('.list-layout-wrapper')
        );
        expect(
            wrapper.nativeElement.classList.contains('is-loading')
        ).toBeTrue();

        component.isLoading = false;
        fixture.detectChanges();
        tick();

        expect(
            wrapper.nativeElement.classList.contains('is-loading')
        ).toBeFalse();
        expect(fixture.debugElement.queryAll(By.css('.real-row')).length).toBe(
            1
        );
    }));
});
