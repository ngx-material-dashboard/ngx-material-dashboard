import * as replace from 'replace-in-file';

/**
 * The ReplaceInFile is a simple wrapper around the replace-in-file module that
 * generates options and just calls replace.sync on any given files.
 */
export class ReplaceInFile {

    files: string;

    constructor(files: string) {
        this.files = files;      
    }

    replace(from: RegExp, to: string): void {
        const options = {
            files: this.files,
            from,
            to
        }

        try {
            const results = replace.sync(options);
            console.log(results);
        } catch(err) {
            console.log(err);
        }
    }
}
