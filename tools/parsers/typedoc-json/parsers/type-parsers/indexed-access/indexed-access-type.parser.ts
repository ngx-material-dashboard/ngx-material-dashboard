import { Kind } from '../../../enums';
import { ProjectParser } from '../../project/project.parser';
import { FormatToStringOptions, TypeParser } from '../type-parser';
import { IndexedAccessTypeParserData } from './interfaces/data.interfaces';
import { IndexedAccessTypeParserJson } from './interfaces/json.interface';

/**
 * Parses data for an indexed access type.
 */
export class IndexedAccessTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     */
    public readonly kind = Kind.IndexedAccess;

    /**
     * The object type of this indexed access type.
     */
    public readonly objectType: TypeParser;

    /**
     * The index type of this indexed access type.
     */
    public readonly indexType: TypeParser;

    public constructor(data: IndexedAccessTypeParserData) {
        const { objectType, indexType } = data;

        this.objectType = objectType;
        this.indexType = indexType;
    }

    /**
     * Converts this parser to a Json compatible format.
     *
     * @returns The Json compatible format of this parser.
     */
    public toJSON(): IndexedAccessTypeParserJson {
        return {
            kind: this.kind,
            objectType: this.objectType.toJSON(),
            indexType: this.indexType.toJSON()
        };
    }

    /**
     * Converts this parser to a string.
     *
     * @returns The string representation of this parser.
     */
    public toString(project?: ProjectParser): string {
        return IndexedAccessTypeParser.formatToString({
            parser: this,
            project
        });
    }

    /**
     * Formats this type parser to a string.
     *
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    public static formatToString(
        options: FormatToStringOptions<IndexedAccessTypeParser>
    ): string {
        const { parser, project } = options;

        return `${parser.objectType.toString(
            project
        )}[${parser.indexType.toString(project)}]`;
    }
}
