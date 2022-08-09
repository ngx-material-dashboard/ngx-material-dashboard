import * as path from 'path';

import { MODULE_TYPE_DIRECTORY_MAP } from '../helpers';
import { TypedocBase } from '../../../converters/typedoc-json/models/typedoc-base.model';
import { Clazz } from '../../../converters/typedoc-json/models/clazz.model';
import { Module } from '../../../converters/typedoc-json/models/module.model';
import { FunctionModel } from '../../../converters/typedoc-json/models/function.model';
import { TypeAlias } from '../../../converters/typedoc-json/models/type-alias.model';

// most URLs should have following format
// <library-name>/<module-name>/<type (i.e. components, directives, .etc)>/<class-name>/<overview or api>.md

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
        'assets/docs/shared/error-handling.md'
    ],
    'json': [
        'assets/docs/json/format.md',
        'assets/docs/json/install.md',
        'assets/docs/shared/configuration.md',
        'assets/docs/json/usage.md',
        'assets/docs/shared/crud-capabilities.md',
        'assets/docs/shared/custom-headers.md',
        'assets/docs/shared/error-handling.md'
    ],
    'json-api': [
        'assets/docs/json-api/install.md',
        'assets/docs/shared/configuration.md',
        'assets/docs/json-api/usage.md',
        'assets/docs/shared/crud-capabilities.md',
        'assets/docs/shared/custom-headers.md',
        'assets/docs/shared/error-handling.md'
    ],
    'json-overview': [
        'assets/docs/shared/crud-capabilities.md',
        'assets/docs/shared/custom-headers.md',
        'assets/docs/shared/error-handling.md'
    ]
}

export class UrlMarkdownFileMapGenerator {

    modules: Module[];
    urlFilesMap: { [url: string]: string[][] };

    constructor(
        modules: Module[]
    ) {
        this.modules = modules;
        this.urlFilesMap = {};
    }

    generateUrlFilesMap(): void {
        this.modules.forEach((m: Module) => {
            let url: string = `/${m.displayName}`;

            // add overviews for each main library
            this.urlFilesMap[url] = [[`assets/docs/${m.displayName}/overview.md`]];
            const key = Object.keys(SHARED_FILES).find((it: string) => m.displayName === it);
            if (key) {
                SHARED_FILES[key].forEach((dir: string) => {
                    this.urlFilesMap[url].push([dir]);
                });
            }

            // add overviews for each of the main functions in the library
            m.functions.forEach((f: FunctionModel) => {
                this.addToUrlFilesMap(m, f);
            });

            // add overviews for each of the main classes in the library
            m.classes.forEach((c: Clazz) => {
                if (!c.name.includes('Module') && !c.isConstant) {
                    // ignore classes with Module in name (for now...)
                    this.addToUrlFilesMap(m, c);
                }
            });

            m.typeAliases.forEach((ta: TypeAlias) => {
                this.addToUrlFilesMap(m, ta);
            });
        });

        // add special case for root overview URL
        this.urlFilesMap['/overview'] = [['assets/docs/overview.md']];
        // special case for main json overview (for all JSON libraries)
        this.urlFilesMap['/json-overview'] = [['/assets/docs/json-overview.md']];
        SHARED_FILES['json-overview'].forEach((file: string) => {
            this.urlFilesMap['/json-overview'].push([file]);
        })
    }

    private addToUrlFilesMap(m: Module, t: TypedocBase) {
        // build the URL for the clazzes documentation
        const url = this.buildUrl(`/${m.displayName}`, t);

        // add the api route for API markdown file
        this.urlFilesMap[`${url}/api`] = [[`${t.apiFile.directory}/${t.apiFile.fileName}`]];
        
        // get base directory (should be same for all overview files)
        const directory = t.overviewFiles[0][0].directory;

        // initialize array of arrays for overview files
        this.urlFilesMap[`${url}/overview`] = [];
        t.overviewFiles.forEach((f: { directory: string, fileName: string}[]) => {
            // get list of files from array of directory and file name objects
            // and append list to array of arrays of overview files
            const files: string[] = f.map(
                (it: {directory: string, fileName: string}) => {
                    return this.append(it.directory, it.fileName);
                }
            );
            this.urlFilesMap[`${url}/overview`].push(files);
        });
    }

    private buildUrl(outputPath: string, t: TypedocBase) {
        // add module type to directory hierarchy if it exists
        const moduleType = getModuleType(t);
        if (moduleType) {
            outputPath = this.append(outputPath, moduleType);
        }
    
        // add formatted class name to directory hierarchy
        return this.append(outputPath, reformatText(t.name));
    }

    private append(outputPath: string, text: string) {
        return path.join(
            outputPath,
            text
        );
    }
}

function getModuleType(t: TypedocBase): string | undefined {
    let moduleType;
    Object.keys(MODULE_TYPE_DIRECTORY_MAP).forEach((key: string) => {
        if (t.name.includes(key)) {
            moduleType = MODULE_TYPE_DIRECTORY_MAP[key];
        } else if (t.sources[0].fileName.includes(key)) {
            moduleType = MODULE_TYPE_DIRECTORY_MAP[key];
        }
    });

    return moduleType;
}

function reformatText(x: string): string {
    const text = x.replace(' ', '').replace('Component', '').replace('Module', '').replace('Service', '');
    let reformattedText = '';
    for(let i = 0; i < text.length; i++) {
        const character = text.charAt(i);
        if (character === character.toUpperCase()) {
            if (i > 0) {
                reformattedText += '-';
            }
            reformattedText += character.toLowerCase();
        } else {
            reformattedText += character;
        }
    }

    return reformattedText;
}
