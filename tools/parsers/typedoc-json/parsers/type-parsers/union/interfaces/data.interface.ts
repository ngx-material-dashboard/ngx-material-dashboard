import { TypeParser } from '../../type-parser';

export interface UnionTypeParserData {
    /**
     * The types of this union type in a Json compatible format.
     */
    types: TypeParser[];
}
