import { Kind } from '../../../../enums';
import { Json } from '../../type-parser';

export interface TupleTypeParserJson extends Json {
    kind: Kind.Tuple;

    /**
     * The types of this tuple type in a Json compatible format.
     */
    types: Json[];
}
