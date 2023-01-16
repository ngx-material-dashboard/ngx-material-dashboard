import { Kind } from '../../../../enums';
import { Json } from '../../type-parser';

export interface ArrayTypeParserJson extends Json {
    kind: Kind.Array;

    /**
     * The type of this array in a Json compatible format.
     */
    type: Json;
}
