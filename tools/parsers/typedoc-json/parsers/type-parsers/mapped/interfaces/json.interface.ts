import { Kind } from '../../../../enums';
import { Json } from '../../type-parser';
import { Modifier } from '../enums/modifier.enum';

export interface MappedTypeParserJson extends Json {
    kind: Kind.Mapped;

    /**
     * The parameter name of this mapped type.
     */
    parameter: string;

    /**
     * The parameter type of this mapped type in a Json compatible format.
     */
    parameterType: Json;

    /**
     * The name type of this mapped type in a Json compatible format.
     */
    nameType: Json | null;

    /**
     * The template type of this mapped type in a Json compatible format.
     */
    templateType: Json;

    /**
     * The readonly modifier of this mapped type.
     */
    readonly: Modifier | null;

    /**
     * The optional modifier of this mapped type.
     */
    optional: Modifier | null;
}
