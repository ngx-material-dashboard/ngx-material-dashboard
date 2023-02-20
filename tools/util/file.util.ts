import { existsSync, mkdir, readFileSync, writeFile } from 'fs';
import { join } from 'path';
import * as replace from 'replace-in-file';

/**
 * The `FileUtil` defines useful methods for working with files.
 */
export class FileUtil {
    /**
     * Reads and returns the string content of the file at the given path.
     *
     * @param paths Paths to join to file.
     * @returns String content of file at given path.
     */
    public static read(...paths: string[]) {
        return readFileSync(join(...paths), 'utf-8');
    }

    /**
     * A simple wrapper around the replace-in-file module that generates
     * options and calls replace.sync on any given files.
     */
    public static replaceInFile(files: string, from: RegExp, to: string): void {
        const options = {
            files: files,
            from,
            to
        };

        try {
            replace.sync(options);
            // in case you want to see results of replacing content...
            // const results = replace.sync(options);
            // console.log(results);
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Writes the given data to the given filename at the given directory. This
     * will create the directory if it does not exist.
     *
     * @param directory The path where file should be written to.
     * @param filename The name of the file.
     * @param data The data to write to the file.
     */
    public static write(directory: string, filename: string, data: any): void {
        if (!existsSync(directory)) {
            // create directory if it doesn't exist
            mkdir(directory, { recursive: true }, (err) => {
                if (err) {
                    throw err;
                } else {
                    FileUtil.writeFileUtil(directory, filename, data);
                }
            });
        } else {
            FileUtil.writeFileUtil(directory, filename, data);
        }
    }

    /**
     * A wrapper for the fs writeFile method.
     *
     * flags from fs library:
     *  - w = Open file for reading and writing. File is created if not exists
     *  - a+ = Open file for reading and appending. The file is created if not exists
     */
    private static writeFileUtil(
        directory: string,
        filename: string,
        data: any
    ) {
        writeFile(
            `${directory}/${filename}`,
            data,
            { flag: 'w' },
            function (err) {
                if (err) return console.error(err);
            }
        );
    }
}
