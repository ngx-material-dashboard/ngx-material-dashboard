import { Tail } from './tail.interface';

export interface TemplateLiteralTypeParserData {
    /**
     * The head of this template literal type.
     */
    head: string;

    /**
     * The tail of this template literal type.
     */
    tail: Tail[];
}
