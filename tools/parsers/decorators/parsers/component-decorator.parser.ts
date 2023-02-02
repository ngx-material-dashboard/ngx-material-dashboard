import { DecoratorParser } from './decorator.parser';

export class ComponentDecoratorParser extends DecoratorParser {
    constructor(pathString: string) {
        super(pathString, 'Component');
    }
}
