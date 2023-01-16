import { JSONOutput, ReflectionKind } from 'typedoc';
import {
    generateFromJson,
    generateFromTypeDoc,
    TypeParser
} from '../../type-parsers';
import { TypeParameterParserData } from './interfaces/data.interface';
import { TypeParameterParserJson } from './interfaces/json.interface';

/**
 * Parses data from a type parameter reflection.
 * @since 1.0.0
 */
export class TypeParameterParser {
    /**
     * The identifier of this parser.
     * @since 1.0.0
     */
    public readonly id: number;

    /**
     * The name of this type parameter.
     * @since 1.0.0
     */
    public readonly name: string;

    /**
     * The type of this type parameter.
     * @since 1.0.0
     */
    public readonly constraint: TypeParser | null;

    /**
     * The default value of this type parameter.
     * @since 1.0.0
     */
    public readonly default: TypeParser | null;

    public constructor(data: TypeParameterParserData) {
        const { id, name, constraint, default: defaultValue } = data;

        this.id = id;
        this.name = name;
        this.constraint = constraint;
        this.default = defaultValue;
    }

    /**
     * Converts this type parameter to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this type parameter.
     */
    public toJSON(): TypeParameterParserJson {
        return {
            id: this.id,
            name: this.name,
            constraint: this.constraint ? this.constraint.toJSON() : null,
            default: this.default ? this.default.toJSON() : null
        };
    }

    /**
     * Generates a new {@link TypeParameterParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @param project The project this parser belongs to.
     * @returns The generated parser.
     */
    public static generateFromTypeDoc(
        reflection: JSONOutput.TypeParameterReflection
    ): TypeParameterParser {
        const {
            kind,
            kindString = 'Unknown',
            id,
            name,
            type,
            default: _default
        } = reflection;

        if (kind !== ReflectionKind.TypeParameter) {
            throw new Error(
                `Expected TypeParameter (${ReflectionKind.TypeParameter}), but received ${kindString} (${kind})`
            );
        }

        return new TypeParameterParser({
            id,
            name,
            constraint: type ? generateFromTypeDoc(type) : null,
            default: _default ? generateFromTypeDoc(_default) : null
        });
    }

    /**
     * Generates a new {@link ClassConstructorParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    public static generateFromJson(
        json: TypeParameterParserJson
    ): TypeParameterParser {
        const { id, name, constraint, default: _default } = json;

        return new TypeParameterParser({
            id,
            name,
            constraint: constraint ? generateFromJson(constraint) : null,
            default: _default ? generateFromJson(_default) : null
        });
    }
}
