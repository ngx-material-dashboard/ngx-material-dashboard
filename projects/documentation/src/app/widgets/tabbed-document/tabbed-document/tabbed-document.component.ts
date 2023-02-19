import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Link {
    display: string;
    link: any[];
}

interface Links {
    [project: string]: Link[];
}

const tabs: Links = {
    'base-json': [
        { display: 'ReadMe', link: ['readme'] },
        { display: 'Overview', link: ['overview'] },
        { display: 'API', link: ['api'] }
    ],
    'json-api': [
        { display: 'ReadMe', link: ['readme'] },
        { display: 'Overview', link: ['overview'] },
        { display: 'API', link: ['api'] }
    ],
    json: [
        { display: 'ReadMe', link: ['readme'] },
        { display: 'Overview', link: ['overview'] },
        { display: 'API', link: ['api'] }
    ],
    testing: [
        { display: 'Overview', link: ['overview'] },
        { display: 'API', link: ['api'] },
        { display: 'Examples', link: ['examples'] }
    ],
    widgets: [
        { display: 'Overview', link: ['overview'] },
        { display: 'API', link: ['api'] },
        { display: 'Examples', link: ['examples'] }
    ]
};

@Component({
    selector: 'app-tabbed-document',
    templateUrl: './tabbed-document.component.html',
    styleUrls: ['./tabbed-document.component.scss']
})
export class TabbedDocumentComponent implements OnInit {
    links: Link[] = [];
    activeLink: Link = this.links[0];

    constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.router.events.subscribe(() => {
            this.initActiveLink();
        });

        this.route.parent?.url.subscribe((urlSegment) => {
            this.links = tabs[urlSegment[0].toString()];
            this.initActiveLink();
        });
    }

    initActiveLink(): void {
        const activeLink = this.links.find((link: Link) => {
            return this.router.url.endsWith(`/${link.link[0]}`);
        });
        if (activeLink) {
            this.activeLink = activeLink;
        }
    }
}
