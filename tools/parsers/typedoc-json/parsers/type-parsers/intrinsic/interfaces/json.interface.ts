import { Kind } from '../../../../enums';
import { Json } from '../../type-parser';

export interface IntrinsicTypeParserJson extends Json {
    kind: Kind.Intrinsic;

    /**
     * The type of this intrinsic type.
     */
    type: string;
}
