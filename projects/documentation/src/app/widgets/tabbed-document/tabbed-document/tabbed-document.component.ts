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
        { display: 'API', link: ['api'] },
        { display: 'Examples', link: ['examples'] }
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
                url.includes('base-json') ||
                url.includes('json') ||
                (url.includes('json-api') &&
                    !this.links.includes({
                        display: 'ReadMe',
                        link: ['readme']
                    }))
            ) {
                // add readme tab if not already included
                this.links = [
                    { display: 'ReadMe', link: ['readme'] },
                    ...this.links
                ];

                // and update active link
                this.activeLink = this.links[0];
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
