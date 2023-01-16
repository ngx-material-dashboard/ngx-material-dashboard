import { TypeParser } from '../../type-parser';
import { Operator } from '../enums/operator.enum';

export interface TypeOperatorTypeParserData {
    /**
     * The operator of this type operator type.
     */
    operator: Operator;

    /**
     * The type of this type operator type.
     */
    type: TypeParser;
}
