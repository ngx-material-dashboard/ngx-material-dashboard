/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
export class TabbedDocumentComponent implements OnDestroy, OnInit {
    links: Link[] = [];
    activeLink: Link = this.links[0];
    private sub: Subscription = new Subscription();

    constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngOnInit(): void {
        const routerSub = this.router.events.subscribe(() => {
            this.initActiveLink();
        });
        this.sub.add(routerSub);

        const parentSub = this.route.parent?.url.subscribe((urlSegment) => {
            this.links = tabs[urlSegment[0].toString()];
            this.initActiveLink();
        });
        this.sub.add(parentSub);
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
