/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { DOCUMENT } from '@angular/common';
import {
    Component,
    ElementRef,
    HostListener,
    Inject,
    ViewChild
} from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { AnchorService } from './shared/anchor/anchor.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    private readonly stickyClassName = 'mat-tab-nav-bar--sticky';
    faCaretDown: IconDefinition = faCaretDown;
    faGitHub: IconDefinition = faGithub;
    date: Date = new Date();
    githubLink: string = 'https://github.com/ngx-material-dashboard';

    @ViewChild('header', { read: ElementRef, static: true })
    header: ElementRef | undefined;

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event): void {
        this.anchorService.interceptClick(event);
    }

    @HostListener('window:scroll')
    onWindowScroll(): void {
        if (this.header == null) {
            return;
        }
        const tabHeader = this.header.nativeElement as HTMLElement;
        const tabHeaderOffset = Math.ceil(tabHeader.offsetTop);
        const windowOffset = Math.ceil(window.pageYOffset);
        const hasStickyClass = tabHeader.classList.contains(
            this.stickyClassName
        );
        if (!hasStickyClass && windowOffset >= tabHeaderOffset) {
            tabHeader.classList.add(this.stickyClassName);
        }
        if (hasStickyClass && windowOffset < tabHeaderOffset) {
            tabHeader.classList.remove(this.stickyClassName);
        }
    }

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private anchorService: AnchorService
    ) {}

    redirectToGitHub(): void {
        this.document.location.href = this.githubLink;
    }
}
