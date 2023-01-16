import { TypeParser } from '../../type-parser';

export interface ConditionTypeParserData {
    /**
     * The check type of this conditional type.
     * @since 5.0.0
     */
    checkType: TypeParser;

    /**
     * The extends type of this conditional type.
     * @since 5.0.0
     */
    extendsType: TypeParser;

    /**
     * The type of this conditional type when the check type is true.
     * @since 5.0.0
     */
    trueType: TypeParser;

    /**
     * The type of this conditional type when the check type is false.
     * @since 5.0.0
     */
    falseType: TypeParser;
}
