import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Link {
    display: string;
    link: any[];
}

@Component({
    selector: 'app-tabbed-document',
    templateUrl: './tabbed-document.component.html',
    styleUrls: ['./tabbed-document.component.scss']
})
export class TabbedDocumentComponent implements OnInit {
    links: Link[] = [
        { display: 'Overview', link: ['overview'] },
        { display: 'API', link: ['api'] }
    ];
    activeLink: Link = this.links[0];

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.router.events.subscribe(() => {
            this.initActiveLink();
        });

        this.initActiveLink();
    }

    initActiveLink(): void {
        const activeLink = this.links.find((link: Link) => {
            return this.router.url.endsWith(link.link[0]);
        });
        if (activeLink) {
            this.activeLink = activeLink;
        }
    }
}
