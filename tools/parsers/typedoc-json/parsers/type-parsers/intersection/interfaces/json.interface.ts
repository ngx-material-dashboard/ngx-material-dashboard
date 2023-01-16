import { Kind } from '../../../../enums';
import { Json } from '../../type-parser';

export interface IntersectionTypeParserJson extends Json {
    kind: Kind.Intersection;

    /**
     * The types of this intersection type in a Json compatible format.
     */
    types: Json[];
}
