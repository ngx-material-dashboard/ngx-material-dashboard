import { DecoratorType } from './decorator-type.model';
import { TypedocBase } from './typedoc-base.model';

export class Decorator extends TypedocBase {

    type!: DecoratorType;
    arguments?: {};

    constructor(data: Partial<Decorator>) {
        super(data);

        if (data.type) {
            this.type = new DecoratorType(data.type);
        }
    }
}
