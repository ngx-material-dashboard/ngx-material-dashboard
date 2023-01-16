import { Kind } from '../../../../enums';
import { Json } from '../../type-parser';

export interface IndexedAccessTypeParserJson extends Json {
    kind: Kind.IndexedAccess;

    /**
     * The object type of this indexed access type in a Json compatible format.
     */
    objectType: Json;

    /**
     * The index type of this indexed access type in a Json compatible format.
     */
    indexType: Json;
}
