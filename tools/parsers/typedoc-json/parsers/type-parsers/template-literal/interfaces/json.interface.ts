import { Kind } from '../../../../enums';
import { Json } from '../../type-parser';
import { TailJson } from './tail-json.interface';

export interface TemplateLiteralTypeParserJson extends Json {
    kind: Kind.TemplateLiteral;

    /**
     * The head of this template literal type.
     */
    head: string;

    /**
     * The tail of this template literal type.
     */
    tail: TailJson[];
}
