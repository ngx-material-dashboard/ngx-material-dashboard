import * as path from 'path';
import {
    ClassParser,
    FunctionParser,
    ModuleParser,
    Parser
} from '../../parsers/typedoc-json';
import { ProjectParser } from '../../parsers/typedoc-json/parsers/project';
import { FileUtil } from '../../util/file.util';
import { reformatText } from './helpers';

const baseDocsSrcDir = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'projects',
    'documentation',
    'src'
);

/**
 * Map of library names to "shared" files and other markdown files to be
 * rendered on the libraries main overview page. Files need to be placed in
 * order of how they should be displayed on page.
 */
const SHARED_FILES: { [lib: string]: string[] } = {
    'base-json': [
        'assets/docs/base-json/install.md',
        'assets/docs/shared/configuration.md',
        'assets/docs/base-json/usage.md',
        'assets/docs/shared/crud-capabilities.md',
        'assets/docs/shared/custom-headers.md',
        'assets/docs/shared/error-handling.md',
        'assets/docs/shared/end-overview.md'
    ],
    json: [
        'assets/docs/json/format.md',
        'assets/docs/json/install.md',
        'assets/docs/shared/configuration.md',
        'assets/docs/json/usage.md',
        'assets/docs/shared/crud-capabilities.md',
        'assets/docs/shared/custom-headers.md',
        'assets/docs/shared/error-handling.md',
        'assets/docs/shared/end-overview.md'
    ],
    'json-api': [
        'assets/docs/json-api/install.md',
        'assets/docs/shared/configuration.md',
        'assets/docs/json-api/usage.md',
        'assets/docs/shared/crud-capabilities.md',
        'assets/docs/shared/custom-headers.md',
        'assets/docs/shared/error-handling.md',
        'assets/docs/shared/end-overview.md'
    ],
    'json-overview': [
        'assets/docs/shared/crud-capabilities.md',
        'assets/docs/shared/custom-headers.md',
        'assets/docs/shared/error-handling.md',
        'assets/docs/shared/end-overview.md'
    ]
};

export class MarkdownUrlGenerator {
    projects: ProjectParser[];

    constructor(projects: ProjectParser[]) {
        this.projects = projects;
    }

    /**
     * Generate and return map of URLs to their corresponding markdown files
     * (with path from documentation assets directory)
     */
    getUrlFilesMap(): { [url: string]: string[][] } {
        const urlFilesMap: { [url: string]: string[][] } = {};
        this.projects.forEach((p: ProjectParser) => {
            let url = `/${p.name}`;

            // add overviews for each project library
            urlFilesMap[url] = [[`assets/docs/${p.name}/overview.md`]];
            urlFilesMap[`${url}/readme`] = [
                [`assets/docs/${p.name}/overview.md`]
            ];
            // add additional shared files to overview map (if any...)
            const key = Object.keys(SHARED_FILES).find(
                (it: string) => p.name === it
            );
            if (key) {
                SHARED_FILES[key].forEach((dir: string) => {
                    urlFilesMap[url].push([dir]);
                    urlFilesMap[`${url}/readme`].push([dir]);
                });
            }

            if (p.name === 'testing' && p.modules) {
                const apiUrl = `/${p.name}`;
                const basePath = `assets/docs/${p.name}`;
                const m = p.modules[0];
                urlFilesMap[`${apiUrl}/elements/api`] = [];
                urlFilesMap[`${apiUrl}/elements/overview`] = [];
                m.elements.forEach((e, i) => {
                    urlFilesMap[`${apiUrl}/elements/api`].push([
                        `${basePath}/elements/api-${i}.md`
                    ]);
                    urlFilesMap[`${apiUrl}/elements/overview`].push([
                        `${basePath}/elements/overview-${i}.md`,
                        `${basePath}/elements/overview-${i + 1}.md`
                    ]);
                });
            } else {
                p.modules?.forEach((m: ModuleParser) => {
                    const moduleDisplayName = reformatText(m.name);
                    let basePath: string;
                    if (moduleDisplayName !== p.name) {
                        url = `/${p.name}/${moduleDisplayName}`;
                        basePath = `assets/docs/${p.name}/${moduleDisplayName}`;
                    } else {
                        basePath = `assets/docs/${p.name}`;
                    }

                    // add routes for example markdown files for classes
                    const exampleUrls: string[][] = [];
                    let i = 0;
                    // this.addToRoutes(urls, `${basePath}/api`, m.components, i);
                    this.addToExampleRoutes(
                        exampleUrls,
                        `${basePath}`,
                        url,
                        urlFilesMap,
                        m.components,
                        i
                    );
                    i += m.components.length;
                    // this.addToRoutes(urls, `${basePath}/api`, m.decorators, i);
                    this.addToExampleRoutes(
                        exampleUrls,
                        `${basePath}`,
                        url,
                        urlFilesMap,
                        m.decorators,
                        i
                    );
                    i += m.decorators.length;
                    // this.addToRoutes(urls, `${basePath}/api`, m.directives, i);
                    this.addToExampleRoutes(
                        exampleUrls,
                        `${basePath}`,
                        url,
                        urlFilesMap,
                        m.directives,
                        i
                    );
                    i += m.directives.length;
                    // this.addToRoutes(urls, `${basePath}/api`, m.enums, i);
                    i += m.enums.length;
                    // this.addToRoutes(urls, `${basePath}/api`, m.interfaces, i);
                    i += m.interfaces.length;
                    // this.addToRoutes(urls, `${basePath}/api`, m.models, i);
                    this.addToExampleRoutes(
                        exampleUrls,
                        `${basePath}`,
                        url,
                        urlFilesMap,
                        m.models,
                        i
                    );
                    i += m.models.length;
                    // this.addToRoutes(urls, `${basePath}/api`, m.services, i);
                    this.addToExampleRoutes(
                        exampleUrls,
                        `${basePath}`,
                        url,
                        urlFilesMap,
                        m.services,
                        i
                    );

                    // add API URLs to /api
                    const apiUrls: string[][] = [];
                    for (let i = 0; i < m.apiFiles; i++) {
                        apiUrls.push([`${basePath}/api-${i}.md`]);
                    }
                    urlFilesMap[`${url}/api`] = apiUrls;

                    // add routes for overview details
                    const overviewUrls: string[][] = [];
                    for (let i = 0; i < m.overviewDetails; i++) {
                        overviewUrls.push([`${basePath}/overview-${i}.md`]);
                    }
                    // add overview URLs to /overview
                    urlFilesMap[`${url}/overview`] = overviewUrls;
                });
            }
        });

        // add special case for root overview URL
        urlFilesMap['/overview'] = [['assets/docs/overview.md']];
        // special case for main json overview (for all JSON libraries)
        urlFilesMap['/json-overview'] = [['/assets/docs/json-overview.md']];
        SHARED_FILES['json-overview'].forEach((file: string) => {
            urlFilesMap['/json-overview'].push([file]);
        });
        return urlFilesMap;
    }

    private addToExampleRoutes(
        exampleUrls: string[][] = [],
        basePath: string,
        url: string,
        urlFilesMap: any,
        parsers: ClassParser[] | FunctionParser[],
        baseIndex: number = 0
    ) {
        const res: string[][] = [];
        let index = 0;
        parsers.forEach((c) => {
            const urls: string[] = [];
            if (c.comment) {
                // math is weird here because of order in which things are added, urls
                // before header; so add 1 to URLs
                c.comment.usageNoteTypes.forEach((t) => {
                    urls.push(
                        `${basePath}/example-${t}-${baseIndex + index++ + 1}.md`
                    );
                });

                if (urls.length > 0) {
                    // only add to examples if there are URLs to add; include url for
                    // header for example; and subtract number of URLs from calculated
                    // index
                    res.push([
                        `${basePath}/example-${
                            baseIndex + index++ - urls.length
                        }.md`
                    ]);
                    res.push(urls);
                }
            }
        });

        if (res.length > 0) {
            res.forEach((it) => exampleUrls.push(it));
            // this is repeated for the same url ending up in overwritting
            // existing values with potential empty ones; this seems to fix
            // that, BUT need to track down why this is repeated for same URL
            urlFilesMap[`${url}/examples`] = exampleUrls;
        }
    }

    private addToRoutes(
        urls: string[][],
        url: string,
        parsers: any,
        i: number = 0
    ) {
        const res = this.generateRoutesForParsers(url, parsers, i);
        res.forEach((r) => {
            urls.push(r);
        });
    }

    private generateRoutesForParsers(
        path: string,
        parsers: any[],
        baseIndex: number = 0
    ) {
        const urls: string[][] = [];
        for (let i = 0; i < parsers.length; i++) {
            urls.push([`${path}-${i + baseIndex}.md`]);
        }
        return urls;
    }

    private generateRoutesForParsersWithName(
        url: string,
        path: string,
        parsers: any[],
        urlFilesMap: { [url: string]: string[][] },
        baseIndex: number = 0
    ) {
        parsers.forEach((p: Parser, i: number) => {
            urlFilesMap[`${url}/${reformatText(p.name)}/api`] = [
                [`${path}-${baseIndex + i}.md`],
                [`${path}-${baseIndex + i + 1}.md`]
            ];
            baseIndex++;
        });
        return urlFilesMap;
    }

    /**
     * Update routes to markdown files in component where markdown is rendered
     */
    updateUrlsInDocumentation(urlFilesMap: { [url: string]: string[][] }) {
        const file = path.join(
            baseDocsSrcDir,
            'app',
            'widgets',
            'tabbed-document',
            'tabbed-document-tab',
            'tabbed-document-tab.component.ts'
        );

        // stringify the URL files map and remove the enclosing brackets since
        // below regex matches characters between the brackets (so only those
        // characters are replaced in the file; otherwise we end up with {{}}
        // as structure of JSON and that doesn't work so well)
        let urlFilesMapString = JSON.stringify(urlFilesMap).replace('{', '');
        urlFilesMapString = urlFilesMapString.substring(
            0,
            urlFilesMapString.lastIndexOf('}')
        );
        FileUtil.replaceInFile(
            file,
            /(?<=const URL_DIRECTORY_MAP: UrlDirectoryMap = {)([\s\S][^};]*)(?=};)/g,
            urlFilesMapString
        );
    }
}
