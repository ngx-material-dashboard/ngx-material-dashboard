import { Kind } from '../../../../enums';
import { Json } from '../../type-parser';

export interface OptionalTypeParserJson extends Json {
    kind: Kind.Optional;

    /**
     * The type of this optional type in a Json compatible format.
     */
    type: Json;
}
