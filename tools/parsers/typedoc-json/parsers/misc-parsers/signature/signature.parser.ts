import { JSONOutput, ReflectionKind } from 'typedoc';
import {
    ParameterParser,
    SignatureParser as TypedocSignatureParser,
    TypeParameterParser,
    TypeParser
} from 'typedoc-json-parser';
import { generateFromJson, generateFromTypeDoc } from '../../type-parsers';
import { CommentParser } from '../comment';
import { SignatureParserData } from './interfaces/data.interface';
import { SignatureParserJson } from './interfaces/json.interface';

/**
 * Parses data from a signature reflection.
 * @since 1.0.0
 */
export class SignatureParser {
    /**
     * The identifier of this parser.
     * @since 1.0.0
     */
    public readonly id: number;

    /**
     * The name of this signature.
     * @since 1.0.0
     */
    public readonly name: string;

    /**
     * The comment parser of this signature.
     * @since 2.3.0
     */
    public readonly comment: CommentParser;

    /**
     * The type parameters of this signature.
     * @since 1.0.0
     */
    public readonly typeParameters: TypeParameterParser[];

    /**
     * The parameters of this signature.
     * @since 1.0.0
     */
    public readonly parameters: ParameterParser[];

    /**
     * The return type of this signature.
     * @since 1.0.0
     */
    public readonly returnType: TypeParser;

    public constructor(data: SignatureParserData) {
        const { id, name, comment, typeParameters, parameters, returnType } =
            data;

        this.id = id;
        this.name = name;
        this.comment = comment;
        this.typeParameters = typeParameters;
        this.parameters = parameters;
        this.returnType = returnType;
    }

    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    public toJSON(): SignatureParserJson {
        return {
            id: this.id,
            name: this.name,
            comment: this.comment.toJSON(),
            typeParameters: this.typeParameters.map((typeParameter) =>
                typeParameter.toJSON()
            ),
            parameters: this.parameters.map((parameter) => parameter.toJSON()),
            returnType: this.returnType.toJSON()
        };
    }

    /**
     * Generates a new {@link SignatureParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    public static generateFromTypeDoc(
        reflection: JSONOutput.SignatureReflection
    ): SignatureParser {
        const {
            kind,
            kindString = 'Unknown',
            id,
            name,
            comment = { summary: [] },
            typeParameter: typeParameters = [],
            parameters = [],
            type
        } = reflection;

        if (kind !== ReflectionKind.CallSignature) {
            throw new Error(
                `Expected Call Signature (${ReflectionKind.CallSignature}), but received ${kindString} (${kind})`
            );
        }

        return new SignatureParser({
            id,
            name,
            comment: CommentParser.generateFromTypeDoc(comment),
            typeParameters: typeParameters.map((typeParameter) =>
                TypeParameterParser.generateFromTypeDoc(typeParameter)
            ),
            parameters: parameters.map((parameter) =>
                ParameterParser.generateFromTypeDoc(parameter)
            ),
            returnType: generateFromTypeDoc(type!)
        });
    }

    /**
     * Generates a new {@link ClassConstructorParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    public static generateFromJson(
        json: TypedocSignatureParser.Json
    ): SignatureParser {
        const { id, name, comment, typeParameters, parameters, returnType } =
            json;

        return new SignatureParser({
            id,
            name,
            comment: CommentParser.generateFromJson(comment),
            typeParameters: typeParameters.map((typeParameter) =>
                TypeParameterParser.generateFromJson(typeParameter)
            ),
            parameters: parameters.map((parameter) =>
                ParameterParser.generateFromJson(parameter)
            ),
            returnType: generateFromJson(returnType)
        });
    }
}
