import { Kind } from '../../../../enums';
import { Json } from '../../type-parser';
import { Operator } from '../enums/operator.enum';

export interface TypeOperatorTypeParserJson extends Json {
    kind: Kind.TypeOperator;

    /**
     * The operator of this type operator type.
     */
    operator: Operator;

    /**
     * The type of this type operator type in a Json compatible format.
     */
    type: Json;
}
