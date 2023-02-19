import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

    constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.router.events.subscribe(() => {
            this.initActiveLink();
        });

        this.route.parent?.url.subscribe((urlSegment) => {
            const url = urlSegment.join('/');
            if (
                !this.links.find((it) => it.display === 'ReadMe') &&
                (url.includes('base-json') ||
                    url.includes('json') ||
                    url.includes('json-api'))
            ) {
                // add readme tab if not already included
                this.links = [
                    { display: 'ReadMe', link: ['readme'] },
                    ...this.links
                ];

                // and update active link
                this.activeLink = this.links[0];
            }

            if (
                !this.links.find((it) => it.display === 'Examples') &&
                !url.includes('json')
            ) {
                this.links = [
                    ...this.links,
                    { display: 'Examples', link: ['examples'] }
                ];
            }

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
