import { Kind } from '../../../../enums';
import { Json } from '../../type-parser';

export interface ConditionalTypeParserJson extends Json {
    kind: Kind.Conditional;

    /**
     * The check type of this conditional type in a Json compatible format.
     */
    checkType: Json;

    /**
     * The extends type of this conditional type in a Json compatible format.
     */
    extendsType: Json;

    /**
     * The type of this conditional type when the check type is true in a Json compatible format.
     */
    trueType: Json;

    /**
     * The type of this conditional type when the check type is false in a Json compatible format.
     */
    falseType: Json;
}
