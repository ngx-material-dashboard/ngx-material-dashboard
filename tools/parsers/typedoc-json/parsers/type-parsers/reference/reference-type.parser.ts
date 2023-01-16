import { Kind } from '../../../enums';
import { ProjectParser } from '../../project/project.parser';
import { FormatToStringOptions, TypeParser } from '../type-parser';
import { ReferenceTypeParserData } from './interfaces/data.interface';
import { ReferenceTypeParserJson } from './interfaces/json.interface';

/**
 * Parses data for a reference type.
 */
export class ReferenceTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     */
    public readonly kind = Kind.Reference;

    /**
     * The id of this reference type.
     */
    public readonly id: number | null;

    /**
     * The name of this reference type.
     */
    public readonly name: string;

    /**
     * The package name of this reference type.
     */
    public readonly packageName: string | null;

    /**
     * The type arguments of this reference type.
     */
    public readonly typeArguments: TypeParser[];

    public constructor(data: ReferenceTypeParserData) {
        const { id, name, packageName, typeArguments } = data;

        this.id = id;
        this.name = name;
        this.packageName = packageName;
        this.typeArguments = typeArguments;
    }

    /**
     * Whether this reference type is from a package.
     *
     * @returns True if reference type is from a package.
     */
    public isPackage(): boolean {
        return this.packageName !== null;
    }

    /**
     * Converts this parser to a Json compatible format.
     *
     * @returns The Json compatible format of this parser.
     */
    public toJSON(): ReferenceTypeParserJson {
        return {
            kind: this.kind,
            id: this.id,
            name: this.name,
            packageName: this.packageName,
            typeArguments: this.typeArguments.map((type) => type.toJSON())
        };
    }

    /**
     * Converts this parser to a string.
     *
     * @param project The project to convert this parser to a string.
     * @returns The string representation of this parser.
     */
    public toString(project?: ProjectParser): string {
        return ReferenceTypeParser.formatToString({ parser: this, project });
    }

    /**
     * Formats this type parser to a string.
     *
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    public static formatToString(
        options: FormatToStringOptions<ReferenceTypeParser>
    ): string {
        const { parser, project } = options;
        const typeArguments =
            parser.typeArguments.length > 0
                ? `<${parser.typeArguments
                      .map((type) => type.toString(project))
                      .join(', ')}>`
                : '';

        return `${parser.packageName ? `${parser.packageName}.` : ''}${
            parser.name
        }${typeArguments}`;
    }
}
