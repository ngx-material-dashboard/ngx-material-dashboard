/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import {
    Directive,
    Input,
    Renderer2,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';

/**
 * Renders list of skeleton items or actual content based on provided isLoading
 * parameter.
 */
@Directive({
    selector: '[ngxSkeletonList]'
})
export class SkeletonListDirective {
    private wrapper: HTMLElement | null = null;
    private skeletonLayer: HTMLElement | null = null;
    private hasRenderedContent = false;

    #isLoading = true;
    @Input() set ngxSkeletonList(isLoading: boolean) {
        this.#isLoading = isLoading;
        this.updateView();
    }
    /**
     * Boolean to switch between rendering skeleton or actual content.
     */
    get isLoading(): boolean {
        return this.#isLoading;
    }

    #customSkeletonTemplate?: TemplateRef<any>;
    @Input() set customSkeletonTemplate(
        template: TemplateRef<any> | undefined
    ) {
        const templateChanged = this.#customSkeletonTemplate !== template;
        this.#customSkeletonTemplate = template;

        if (this.#isLoading && templateChanged && this.wrapper) {
            this.clearSkeletonLayer();
            this.buildSkeletonContent();
        }
    }
    /** Optional custom skeleton template. */
    get customSkeletonTemplate(): TemplateRef<any> | undefined {
        return this.#customSkeletonTemplate;
    }

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private renderer: Renderer2
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['customSkeletonTemplate'] || changes['ngxSkeletonList']) {
            this.updateView();
        }
    }

    private updateView() {
        if (this.#isLoading) {
            this.renderSkeleton();
        } else {
            this.renderActualContent();
        }
    }

    private renderSkeleton() {
        if (this.wrapper) return;

        this.viewContainer.clear();
        this.hasRenderedContent = false;

        // Create the persistent list context wrapper
        this.wrapper = this.renderer.createElement('div');
        this.renderer.addClass(this.wrapper, 'list-layout-wrapper');
        this.renderer.addClass(this.wrapper, 'is-loading');

        // Create the inner list skeleton container
        this.skeletonLayer = this.renderer.createElement('div');
        this.renderer.addClass(this.skeletonLayer, 'skeleton-list-layer');
        this.renderer.appendChild(this.wrapper, this.skeletonLayer);

        this.buildSkeletonContent();

        // mount to the view
        // FIX: Fallback safely if running inside an isolated Karma unit test environment
        const containerElement = this.viewContainer.element.nativeElement;
        const parentNode = containerElement.parentNode;

        if (parentNode) {
            this.renderer.insertBefore(
                parentNode,
                this.wrapper,
                containerElement
            );
        } else {
            // In isolated tests where parentNode is null, mount directly to the view container element
            this.renderer.appendChild(containerElement, this.wrapper);
        }
    }

    private buildSkeletonContent() {
        if (!this.skeletonLayer) return;

        console.log(this.customSkeletonTemplate);
        if (this.customSkeletonTemplate) {
            this.viewContainer.clear();
            const embeddedView = this.viewContainer.createEmbeddedView(
                this.customSkeletonTemplate
            );
            embeddedView.rootNodes.forEach((node) => {
                this.renderer.appendChild(this.skeletonLayer, node);
            });
        } else {
            for (let i = 0; i < 6; i++) {
                const row = this.createSkeletonRowMarkup();
                this.renderer.appendChild(this.skeletonLayer, row);
            }
        }
    }

    private clearSkeletonLayer() {
        if (this.skeletonLayer) {
            this.skeletonLayer.innerHTML = '';
        }
    }

    private renderActualContent() {
        // SAFETY FALLBACK: If local data loaded instantly, this.wrapper was never built.
        // We build it here so the real data has its layout container context.
        if (!this.wrapper) {
            this.wrapper = this.renderer.createElement('div');
            this.renderer.addClass(this.wrapper, 'list-layout-wrapper');

            const containerElement = this.viewContainer.element.nativeElement;
            this.renderer.insertBefore(
                containerElement.parentNode,
                this.wrapper,
                containerElement
            );
        }
        this.renderer.removeClass(this.wrapper, 'is-loading');

        if (!this.hasRenderedContent) {
            const embeddedView = this.viewContainer.createEmbeddedView(
                this.templateRef
            );

            embeddedView.rootNodes.forEach((node) => {
                console.log(node);
                console.log(this.wrapper);
                this.renderer.addClass(node, 'real-data-list-layer');
                this.renderer.appendChild(this.wrapper, node);
            });

            this.hasRenderedContent = true;
        }
    }

    // Generates row layout: [Checkbox Box] [Text Block] -------- [Icon Box]
    private createSkeletonRowMarkup(): HTMLElement {
        const row = this.renderer.createElement('div');
        this.renderer.addClass(row, 'skeleton-row');

        row.innerHTML = `
          <div class="skeleton-checkbox"></div>
          <div class="skeleton-text-block">
              <div class="skeleton-line title"></div>
          </div>
          <div class="skeleton-btn-icon delete-btn"></div>
        `;
        return row;
    }
}
