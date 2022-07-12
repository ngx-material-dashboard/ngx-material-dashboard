import { Clazz } from 'tools/converters/typedoc-json/models/clazz.model';
import { Module } from '../../../converters/typedoc-json/models/module.model';
import { USAGE_TYPES } from '../../../converters/typedoc-json/models/usage-note.model';

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

    classes: Clazz[];
    /**
     * A map of directories to files in those directories to be filled by the
     * readDirectoryRecursively function.
     */
     directoriesFilesMap: { [directory: string]: string[] };
     modules: Module[];
     urlFilesMap: { [url: string]: string[] };
     usageNotesMap: { [url: string]: { [note: string]: string[] } };

    constructor(
        directoriesFilesMap: { [directory: string]: string[] },
        modules: Module[]
    ) {
        this.directoriesFilesMap = directoriesFilesMap;
        this.modules = modules;
        this.urlFilesMap = {};
        this.usageNotesMap = {};

        this.classes = [];
        this.modules.forEach((it: Module) => {
            this.classes.push(...it.classes);
        });
    }

    generateUrlFilesMap(): void {
        const nonSharedDirectoriesFilesMap = Object.keys(this.directoriesFilesMap).filter((directory: string) => directory !== 'shared');
        nonSharedDirectoriesFilesMap.forEach((directory: string) => {
            const url = this.removeBaseDirectoryInfo(directory);
            const module = this.modules.find((it: Module) => `/${it.displayName}` === url)
            if (module) {
                // special case for overviews
                this.urlFilesMap[url] = [`${directory}/overview.md`];
                const key = Object.keys(SHARED_FILES).find((it: string) => module.displayName === it);
                if (key) {
                    SHARED_FILES[key].forEach((dir: string) => {
                        this.urlFilesMap[url].push(dir);
                    });
                }
            } else {
                this.directoriesFilesMap[directory].forEach((file: string) => {
                    if (this.directoriesFilesMap[directory].length === 1) {
                        if (this.directoriesFilesMap[directory][0] === 'api.md') {
                            // markdown file will go on a tabbed component (we're
                            // just missing the overview.md for this directory for
                            // some reason); TODO raise error?
                            this.urlFilesMap[`${url}/overview`] = [``];
                            this.urlFilesMap[`${url}/api`] = [`${directory}/${file}`];
                        } else {
                            // console.log(url);
                            // if (url === 'json-overview' && file === 'json-overview.md') {
                            //     // handle special case for json-overview since this is
                            //     // a standalone overvew markdown file that is for all
                            //     // JSON libraries
                            //     console.log(SHARED_FILES[url]);
                            //     this.urlFilesMap[`/${url}`] = [`${directory}/${file}`, ...SHARED_FILES[url]];
                            // } else {
                            //     // markdown file should go on a component on it's own
                            //     // i.e. not on a tabbed component
                            //     this.urlFilesMap[url] = [`${directory}/${file}`];
                            // }
                        }
                    } else {
                        if (url === '' && file === 'json-overview.md') {
                            // handle special case for json-overview since this is
                            // a standalone overvew markdown file that is for all
                            // JSON libraries
                            this.urlFilesMap['/json-overview'] = [`${directory}/${file}`, ...SHARED_FILES['json-overview']];
                        } else {
                            if (file === 'api.md') {
                                this.urlFilesMap[`${url}/${this.removeFileExtension(file)}`] = [`${directory}/${file}`];
                            } else if (!file.includes('usage-note')){
                                if (!this.urlFilesMap[`${url}/overview`]) {
                                    this.urlFilesMap[`${url}/overview`] = [];
                                }

                                this.urlFilesMap[`${url}/overview`].push(`${directory}/${file}`);
                            } else {
                                if (!this.urlFilesMap[`${url}/overview`]) {
                                    this.urlFilesMap[`${url}/overview`] = [];
                                }

                                let usageFile;
                                const clazz = this.classes.find((it: Clazz) => { 
                                    return Object.keys(it.fileUsageNoteMap).find((it: string) => it === `${url}/${file}`);
                                });
                                if (clazz) {
                                    const usageNote = clazz.fileUsageNoteMap[`${url}/${file}`];
                                    usageFile = usageNote.header
                                }
                                
                                if (!usageFile) {
                                    usageFile = this.removeFileExtension(file)
                                    usageFile = this.removeUsageNoteTypeValue(usageFile);
                                }  

                                if (!this.usageNotesMap[`${url}/overview`]) {
                                    this.usageNotesMap[`${url}/overview`] = {};
                                }

                                if (!this.usageNotesMap[`${url}/overview`][usageFile]) {
                                    this.usageNotesMap[`${url}/overview`][usageFile] = [];
                                }

                                this.usageNotesMap[`${url}/overview`][usageFile].push(`${directory}/${file}`);
                            }
                        }
                    }
                });
            }
        });

        // add special case for root overview URL
        this.urlFilesMap['/overview'] = ['assets/docs/overview.md'];
    }

    /**
     * Removes the base 'assets/docs' directory information from the given
     * directory path string since those are not needed for the URL when
     * mapping to the location of the markdown file.
     *
     * @param directory The directory to remove 'assets/docs' from.
     * @returns The directory without 'assets/docs' at the beginning.
     */
    private removeBaseDirectoryInfo(directory: string) {
        return directory.replace('assets/docs', '');
    }

    /**
     * Removes the '.md' file extension from the given file name string.
     *
     * @param file The string to remove the '.md' extension from. 
     * @returns The name of the file without the '.md' extension.
     */
    private removeFileExtension(file: string) {
        return file.replace('.md', '');
    }

    private removeUsageNoteTypeValue(file: string) {
        USAGE_TYPES.forEach((type: string) => {
            file = file.replace(`-${type}`, '');
        });

        return file;
    }
}
