import { Kind } from '../../../../enums';
import { Json } from '../../type-parser';

export interface UnionTypeParserJson extends Json {
    kind: Kind.Union;

    /**
     * The types of this union type in a Json compatible format.
     */
    types: Json[];
}
