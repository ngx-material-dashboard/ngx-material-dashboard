import { basename, dirname } from 'path';
import { JSONOutput } from 'typedoc';
import { SourceParserData } from './interfaces/data.interface';
import { SourceParserJson } from './interfaces/json.interface';

/**
 * Parses data from a source reflection.
 * @since 1.0.0
 */
export class SourceParser {
    /**
     * The line number of this source.
     * @since 1.0.0
     */
    public readonly line: number;

    /**
     * The file name of this source.
     * @since 1.0.0
     */
    public readonly file: string;

    /**
     * The path of this source.
     * @since 1.0.0
     */
    public readonly path: string;

    /**
     * The url of this source.
     * @since 2.4.0
     */
    public readonly url: string | null;

    public constructor(data: SourceParserData) {
        const { line, file, path, url } = data;

        this.line = line;
        this.file = file;
        this.path = path;
        this.url = url;
    }

    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    public toJSON(): SourceParserJson {
        return {
            line: this.line,
            file: this.file,
            path: this.path,
            url: this.url
        };
    }

    /**
     * Generates a new {@link SourceParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    public static generateFromTypeDoc(
        reflection: JSONOutput.SourceReference
    ): SourceParser {
        const { line, fileName } = reflection;

        return new SourceParser({
            line,
            file: basename(fileName),
            path: dirname(fileName),
            url: null // ?
        });
    }

    /**
     * Generates a new {@link ClassConstructorParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    public static generateFromJson(json: SourceParserJson): SourceParser {
        const { line, file, path, url } = json;

        return new SourceParser({
            line,
            file,
            path,
            url
        });
    }
}
