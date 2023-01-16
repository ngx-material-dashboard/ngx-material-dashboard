import { TypeParser } from '../../type-parser';

export interface NamedTupleMemberTypeParserData {
    /**
     * The name of this named tuple member.
     */
    name: string;

    /**
     * The type of this named tuple member.
     */
    type: TypeParser;

    /**
     * Whether this named tuple member is optional.
     */
    optional: boolean;
}
