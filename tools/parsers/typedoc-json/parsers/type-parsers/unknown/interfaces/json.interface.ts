import { Kind } from '../../../../enums';
import { Json } from '../../type-parser';

export interface UnknownTypeParserJson extends Json {
    kind: Kind.Unknown;

    /**
     * The name of this unknown type.
     */
    name: string;
}
