import { TypeParser } from '../../type-parser';

export interface IndexedAccessTypeParserData {
    /**
     * The object type of this indexed access type.
     */
    objectType: TypeParser;

    /**
     * The index type of this indexed access type.
     */
    indexType: TypeParser;
}
