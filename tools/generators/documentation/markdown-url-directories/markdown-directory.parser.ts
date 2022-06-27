import * as fs from 'fs';
import * as path from 'path';

/**
 * The MarkdownDirectoryParser class is a helper class designed to read through
 * a series of directories recursively (starting at some given root directory),
 * and generate a map of directories to files in those directories. This map is
 * then processed further to generate a map of URLs to markdown files for use
 * in the documentation project. This is an attempt to "simplify" managing URLs
 * and associated markdown files so I don't have to manually manage them as
 * the library changes over time.
 */
export class MarkdownDirectoryParser {

    /**
     * A map of directories to files in those directories to be filled by the
     * readDirectoryRecursively function.
     */
    directoriesFilesMap: { [directory: string]: string[] } = {};

    /**
     * Reads the given directory recursively, adding each directory as a key to the
     * directories_files_map, and adding each file located in those directories to
     * the list of files associated with that directory's key in the
     * directories_files_map.
     *  
     * @param directory The directory to read recursively.
     */
    readDirectoryRecursively(directory: string) {
        fs.readdirSync(directory).forEach((file: string) => {
            const absolutePath = path.join(directory, file);
            if (fs.statSync(absolutePath).isDirectory()) {
                this.directoriesFilesMap[this.makeRelativeDirectory(absolutePath)] = [];
                return this.readDirectoryRecursively(absolutePath);
            } else {
                if (!this.directoriesFilesMap[this.makeRelativeDirectory(directory)]) {
                    this.directoriesFilesMap[this.makeRelativeDirectory(directory)] = [];
                }
                return this.directoriesFilesMap[this.makeRelativeDirectory(directory)].push(file);
            }
        });
    }

    /**
     * Returns a "relative" directory starting at the 'assets' level, since we don't
     * need the full path to the directories when generating paths to markdown files
     * in the documentation's assets directory.
     *
     * @param directory The full path directory to make "relative".
     * @returns A "relative" directory starting at the assets level.
     */
    private makeRelativeDirectory(directory: string) {
        return directory.substring(directory.indexOf('assets'));
    }
}
