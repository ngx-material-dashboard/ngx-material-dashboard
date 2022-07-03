import { Module } from '../../../converters/typedoc-json/models/module.model';

// most URLs should have following format
// <library-name>/<module-name>/<type (i.e. components, directives, .etc)>/<class-name>/<overview or api>.md

export class UrlMarkdownFileMapGenerator {

    /**
     * A map of directories to files in those directories to be filled by the
     * readDirectoryRecursively function.
     */
     directoriesFilesMap: { [directory: string]: string[] };
     modules: Module[];
     urlFilesMap: { [url: string]: string[] };

    constructor(
        directoriesFilesMap: { [directory: string]: string[] },
        modules: Module[]
    ) {
        this.directoriesFilesMap = directoriesFilesMap;
        this.modules = modules;
        this.urlFilesMap = {};
    }

    generateUrlFilesMap(): void {
        const nonSharedDirectoriesFilesMap = Object.keys(this.directoriesFilesMap).filter((directory: string) => directory !== 'shared');
        nonSharedDirectoriesFilesMap.forEach((directory: string) => {
            const url = this.removeBaseDirectoryInfo(directory);
            const module = this.modules.find((it: Module) => `/${it.displayName}` === url)
            if (module) {
                // special case for overviews
                this.urlFilesMap[url] = [`${directory}/overview.md`];
                if (module.displayName.includes('json')) {
                    this.urlFilesMap[url].push('assets/docs/shared/crud-capabilities.md');
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
                            if (url === '' && file === 'json-overview.md') {
                                // handle special case for json-overview since this is
                                // a standalone overvew markdown file that is for all
                                // JSON libraries
                                this.urlFilesMap['/json-overview'] = [`${directory}/${file}`];
                            } else {
                                // markdown file should go on a component on it's own
                                // i.e. not on a tabbed component
                                this.urlFilesMap[url] = [`${directory}/${file}`];
                            }
                        }
                    } else {
                        this.urlFilesMap[`${url}/${this.removeFileExtension(file)}`] = [`${directory}/${file}`];
                    }
                });
            }
        });

        // add special case for root URL
        this.urlFilesMap['/'] = ['assets/docs/overview.md'];
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
}
