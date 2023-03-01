/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import * as path from 'path';
import { FileUtil } from '../../util/file.util';
import { ProjectParser } from '../../parsers/typedoc-json';
import { projectUrlMap } from './route.generator';

const baseDocsSrcDir = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'projects',
    'documentation',
    'src'
);

/** Map of URLs to text that should be used on tabs. */
const urlTabMap: { [url: string]: string } = {
    api: 'API',
    examples: 'Examples',
    overview: 'Overview',
    readme: 'ReadMe'
};

/**
 * Generates the tabs to render for each project.
 */
export class TabGenerator {
    projects: ProjectParser[];
    tabs: any;

    constructor(projects: ProjectParser[]) {
        this.projects = projects;
        this.tabs = {};
    }

    /**
     * Generates the tabs to render for each project.
     */
    generateTabs() {
        this.projects.forEach((p: ProjectParser) => {
            this.tabs[p.name] = [];
            projectUrlMap[p.name].forEach((url) => {
                this.tabs[p.name].push({
                    display: urlTabMap[url],
                    link: [url]
                });
            });
        });

        this.updateTabs();
    }

    /**
     * Updates the tabs to render based on current base URL.
     */
    public updateTabs() {
        const file = path.join(
            baseDocsSrcDir,
            'app',
            'widgets',
            'tabbed-document',
            'tabbed-document',
            'tabbed-document.component.ts'
        );

        let string = JSON.stringify(this.tabs);
        string = string.replace('{', '');
        string = string.substring(0, string.lastIndexOf('}'));
        FileUtil.replaceInFile(
            file,
            /(?<=const tabs: Links = {)([\s\S]*)(?=};)/g,
            string
        );
    }
}
