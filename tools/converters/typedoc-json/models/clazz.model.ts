import { reformatText } from '../../../generators/documentation/helpers';
import { Constructor } from './constructor.model';
import { Declaration } from './declaration.model';
import { Decorator } from './decorator.model';
import { FunctionModel } from './function.model';
import { MethodModel } from './method.model';
import { Property } from './property.model';
import { TypedocBase } from './typedoc-base.model';

export class Clazz extends TypedocBase {

    override kindString: string = 'Class';
    constructor$!: Constructor;
    components: Clazz[] = [];
    directives: Clazz[] = [];
    enums: Clazz[] = [];
    interfaces: Clazz[] = [];
    methods: MethodModel[] = [];
    ngModule?: Clazz;
    properties: Property[] = [];
    sortedProperties: Property[] = [];
    declarations: Clazz[] = [];
    exports: Clazz[] = []
    imports: Clazz[] = [];
    indexSignature?: Property;

    constructor(data: Partial<Clazz>) {
        super(data);

        if (data.decorators) {
            this.decorators = [];
            data.decorators.forEach((d: Partial<Decorator>) => {
                const decorator = new Decorator(d);
                this.decorators?.push(decorator);
            });
        }

        if (data.indexSignature) {
            // it seems if a clazz has a map defined it is added as indexSignature
            // property; TODO figure out what happens if multiple maps defined, or
            // if it's even possible to define multiple maps
            this.indexSignature = new Property(data.indexSignature);
            this.properties.push(this.indexSignature);
        }

        this.displayName = reformatText(this.name);
    }

    sortProperties(): void {
        this.sortedProperties = this.properties.sort(Property.sort);
    }
}
