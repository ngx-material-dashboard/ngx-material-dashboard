import { Kind } from '../../../../enums';
import { Json } from '../../type-parser';

export interface LiteralTypeParserJson extends Json {
    kind: Kind.Literal;

    /**
     * The value of this literal type.
     */
    value: string;
}
