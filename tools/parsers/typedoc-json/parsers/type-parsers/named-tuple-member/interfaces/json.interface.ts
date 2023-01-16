import { Kind } from '../../../../enums';
import { Json } from '../../type-parser';

export interface NamedTupleMemberTypeParserJson extends Json {
    kind: Kind.NamedTupleMember;

    /**
     * The name of this named tuple member.
     */
    name: string;

    /**
     * The type of this named tuple member in a Json compatible format.
     */
    type: Json;

    /**
     * Whether this named tuple member is optional.
     */
    optional: boolean;
}
