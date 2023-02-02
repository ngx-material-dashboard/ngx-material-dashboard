import { DecoratorParser } from './decorator.parser';

export class DirectiveDecoratorParser extends DecoratorParser {
    constructor(pathString: string) {
        super(pathString, 'Directive');
    }
}
