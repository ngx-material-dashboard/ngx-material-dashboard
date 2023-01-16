import { Kind } from '../../../../enums';
import { ReferenceTypeParserJson } from '../../reference';
import { Json } from '../../type-parser';

export interface QueryTypeParserJson extends Json {
    kind: Kind.Query;

    /**
     * The query of this query type in a Json compatible format.
     */
    query: ReferenceTypeParserJson;
}
