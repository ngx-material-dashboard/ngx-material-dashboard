import { ClassParser } from 'typedoc-json-parser';

import { DecoratorParser } from '../../../../decorators/parsers/decorator.parser';

export interface ClassParserJson extends ClassParser.Json {
    decorator?: DecoratorParser;
}
