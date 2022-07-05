import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCaretDown, faFillDrip, faMinus } from '@fortawesome/free-solid-svg-icons';
import { AnchorService } from './shared/anchor/anchor.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    private readonly stickyClassName = 'mat-tab-nav-bar--sticky';
    faCaretDown: IconDefinition = faCaretDown;
    faDash: IconDefinition = faMinus;
    faGitHub: IconDefinition = faGithub;
    faFillDrip: IconDefinition = faFillDrip;
    date: Date = new Date();
    githubLink: string = 'http://localhost:8080/ngx-material-dashboard/ngx-material-dashboard'
    theme = 'light';
    nextTheme = 'dark';

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
        const hasStickyClass = tabHeader.classList.contains(this.stickyClassName);
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

    ngOnInit(): void {
        this.setTheme(localStorage.getItem('theme') || 'light');
    }

    redirectToGitHub(): void {
        this.document.location.href = this.githubLink;
    }

    setTheme(theme: string): void {
        this.nextTheme = theme === 'light' ? 'dark' : 'light';
        this.theme = theme;
        const bodyClassList = this.document.querySelector('body')!.classList;
        const removeClassList = /\w*-theme\b/.exec(bodyClassList.value);
        if (removeClassList) {
            bodyClassList.remove(...removeClassList);
        }
        bodyClassList.add(`${this.theme}-theme`);
        localStorage.setItem('theme', this.theme);
    }
}
