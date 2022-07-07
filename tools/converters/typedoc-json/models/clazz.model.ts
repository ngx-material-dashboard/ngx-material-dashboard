import { reformatText } from '../../../generators/documentation/helpers';
import { Constructor } from './constructor.model';
import { Decorator } from './decorator.model';
import { FunctionModel } from './function.model';
import { MethodModel } from './method.model';
import { Property } from './property.model';
import { TypedocBase } from './typedoc-base.model';

export class Clazz extends TypedocBase {

    override kindString: string = 'Class';
    constructor$!: Constructor;
    methods: MethodModel[] = [];
    ngModule?: Clazz;
    properties: Property[] = [];
    declarations: Clazz[] = [];
    exports: Clazz[] = []
    imports: Clazz[] = [];

    constructor(data: Partial<Clazz>) {
        super(data);

        if (data.decorators) {
            this.decorators = [];
            data.decorators.forEach((d: Partial<Decorator>) => {
                const decorator = new Decorator(d);
                this.decorators?.push(decorator);
            });
        }

        this.displayName = reformatText(this.name);
    }
}
