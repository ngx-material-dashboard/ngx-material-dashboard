import { Kind } from '../../../../enums';
import { Json } from '../../type-parser';

export interface InferredTypeParserJson extends Json {
    kind: Kind.Inferred;

    /**
     * The type of this inferred type.
     */
    type: string;
}
