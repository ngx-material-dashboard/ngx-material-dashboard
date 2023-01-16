import { TypeParser } from '../../type-parser';
import { Modifier } from '../enums/modifier.enum';

export interface MappedTypeParserData {
    /**
     * The parameter name of this mapped type.
     */
    parameter: string;

    /**
     * The parameter type of this mapped type.
     */
    parameterType: TypeParser;

    /**
     * The name type of this mapped type.
     */
    nameType: TypeParser | null;

    /**
     * The template type of this mapped type.
     */
    templateType: TypeParser;

    /**
     * The readonly modifier of this mapped type.
     */
    readonly: Modifier | null;

    /**
     * The optional modifier of this mapped type.
     */
    optional: Modifier | null;
}
