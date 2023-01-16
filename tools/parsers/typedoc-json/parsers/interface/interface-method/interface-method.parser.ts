import { ReflectionKind } from '../../../enums';
import { JSONOutput } from 'typedoc';
import { SignatureParser, SourceParser } from '../../misc-parsers';
import { Parser } from '../../parser';
import { InterfaceMethodParserData } from './interfaces/data.interface';
import { InterfaceMethodParserJson } from './interfaces/json.interface';

/**
 * Parses data from an interface method reflection.
 */
export class InterfaceMethodParser extends Parser {
    /**
     * The id of the parent interface parser.
     * @since 4.0.0
     */
    public readonly parentId: number;

    /**
     * The signature parsers of this method.
     */
    public readonly signatures: SignatureParser[];

    public constructor(data: InterfaceMethodParserData) {
        super(data);

        const { parentId, signatures } = data;

        this.parentId = parentId;
        this.signatures = signatures;
    }

    /**
     * Convert this parser to a Json compatible format.
     *
     * @returns The Json compatible format of this parser.
     */
    public override toJSON(): InterfaceMethodParserJson {
        return {
            ...super.toJSON(),
            parentId: this.parentId,
            signatures: this.signatures.map((signature) => signature.toJSON())
        };
    }

    /**
     * Generates a new {@link InterfaceMethodParser} instance from the given data.
     *
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    public static generateFromTypeDoc(
        reflection: JSONOutput.DeclarationReflection,
        parentId: number
    ): InterfaceMethodParser {
        const {
            kind,
            kindString = 'Unknown',
            id,
            name,
            sources = [],
            signatures = []
        } = reflection;

        if (kind !== ReflectionKind.Method)
            throw new Error(
                `Expected Method (${ReflectionKind.Method}), but received ${kindString} (${kind})`
            );

        return new InterfaceMethodParser({
            id,
            name,
            source: sources.length
                ? SourceParser.generateFromTypeDoc(sources[0])
                : null,
            parentId,
            signatures: signatures.map((signature) =>
                SignatureParser.generateFromTypeDoc(signature)
            )
        });
    }

    /**
     * Generates a new {@link InterfaceMethodParser} instance from the given data.
     *
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    public static generateFromJson(
        json: InterfaceMethodParserJson
    ): InterfaceMethodParser {
        const { id, name, source, parentId, signatures } = json;

        return new InterfaceMethodParser({
            id,
            name,
            source: source ? SourceParser.generateFromJson(source) : null,
            parentId,
            signatures: signatures.map((signature) =>
                SignatureParser.generateFromJson(signature)
            )
        });
    }
}
