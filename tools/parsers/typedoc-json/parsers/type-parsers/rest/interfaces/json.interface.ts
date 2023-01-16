import { Kind } from '../../../../enums';
import { Json } from '../../type-parser';

export interface RestTypeParserJson extends Json {
    kind: Kind.Rest;

    /**
     * The type of this rest type in a Json compatible format.
     */
    type: Json;
}
