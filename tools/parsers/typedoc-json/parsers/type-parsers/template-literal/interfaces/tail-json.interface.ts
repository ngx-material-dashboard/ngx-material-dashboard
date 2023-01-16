import { Json as TypeParserJson } from '../../type-parser';

export interface TailJson {
    /**
     * The type of this template literal tail type in a Json compatible format.
     */
    type: TypeParserJson;

    /**
     * The text of this template literal tail type.
     */
    text: string;
}
