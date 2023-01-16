import { TypeParser } from '../../type-parser';

export interface Tail {
    /**
     * The type of this template literal tail type.
     */
    type: TypeParser;

    /**
     * The text of this template literal tail type.
     */
    text: string;
}
