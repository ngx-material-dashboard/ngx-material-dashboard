import { TypeParser } from '../../type-parser';

export interface IntersectionTypeParserData {
    /**
     * The types of this intersection type.
     */
    types: TypeParser[];
}
