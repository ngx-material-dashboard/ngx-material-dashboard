import * as path from 'path';
import { ModuleParser } from '../../parsers/typedoc-json';
import { ProjectParser } from '../../parsers/typedoc-json/parsers/project';
import { FileUtil } from '../../util/file.util';

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
        let urlFilesMap: { [url: string]: string[][] } = {};
        this.projects.forEach((p: ProjectParser) => {
            const url = `/${p.name}`;

            // add readme overviews for each project library
            // TODO probably rename files to readme instead of overview to
            // prevent confusion with generated overview files which should
            // contain comments parsed by typedoc from source
            urlFilesMap[url] = [[`assets/docs/${p.name}/overview.md`]];
            urlFilesMap[`${url}/readme`] = [
                [`assets/docs/${p.name}/overview.md`]
            ];
            // add additional shared files to readme map (if any...)
            const key = Object.keys(SHARED_FILES).find(
                (it: string) => p.name === it
            );
            if (key) {
                SHARED_FILES[key].forEach((dir: string) => {
                    urlFilesMap[url].push([dir]);
                    urlFilesMap[`${url}/readme`].push([dir]);
                });
            }

            // add urlFilesMap for each module to urlFilesMap
            p.modules?.forEach((m: ModuleParser) => {
                urlFilesMap = { ...urlFilesMap, ...m.urlFilesMap };
            });
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
