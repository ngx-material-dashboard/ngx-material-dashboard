import { JSONOutput } from 'typedoc';
import { ReflectionKind } from '../../enums';
import { CommentParser, SignatureParser, SourceParser } from '../misc-parsers';
import { Parser } from '../parser';
import { FunctionParserData } from './interfaces/data.interface';
import { FunctionParserJson } from './interfaces/json.interface';

/**
 * Parses data from a function reflection.
 */
export class FunctionParser extends Parser {
    /**
     * The comment parser of this function.
     */
    public readonly comment: CommentParser;

    /**
     * Whether this function is external.
     */
    public readonly external: boolean;

    /**
     * The signature parsers of this function.
     */
    public readonly signatures: SignatureParser[];

    public constructor(data: FunctionParserData) {
        super(data);

        const { comment, external, signatures } = data;

        this.comment = comment;
        this.external = external;
        this.signatures = signatures;
    }

    /**
     * Converts this parser to a Json compatible format.
     *
     * @returns The Json compatible format of this parser.
     */
    public override toJSON(): FunctionParserJson {
        return {
            ...super.toJSON(),
            comment: this.comment.toJSON(),
            external: this.external,
            signatures: this.signatures.map((signature) => signature.toJSON())
        };
    }

    /**
     * Generates a new {@link FunctionParser} instance from the given data.
     *
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    public static generateFromTypeDoc(
        reflection: JSONOutput.DeclarationReflection
    ): FunctionParser {
        const {
            kind,
            kindString = 'Unknown',
            id,
            name,
            comment = { summary: [] },
            sources = [],
            flags,
            signatures = []
        } = reflection;

        if (kind !== ReflectionKind.Function)
            throw new Error(
                `Expected Function (${ReflectionKind.Function}), but received ${kindString} (${kind})`
            );

        return new FunctionParser({
            id,
            name,
            comment: CommentParser.generateFromTypeDoc(comment),
            source: sources.length
                ? SourceParser.generateFromTypeDoc(sources[0])
                : null,
            external: Boolean(flags.isExternal),
            signatures: signatures.map((signature) =>
                SignatureParser.generateFromTypeDoc(signature)
            )
        });
    }

    /**
     * Generates a new {@link FunctionParser} instance from the given data.
     *
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    public static generateFromJson(json: FunctionParserJson): FunctionParser {
        const { id, name, comment, source, external, signatures } = json;

        return new FunctionParser({
            id,
            name,
            comment: CommentParser.generateFromJson(comment),
            source: source ? SourceParser.generateFromJson(source) : null,
            external,
            signatures: signatures.map((signature) =>
                SignatureParser.generateFromJson(signature)
            )
        });
    }
}
