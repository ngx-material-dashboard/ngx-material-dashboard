import { Constructor } from './constructor.model';
import { MethodModel } from './method.model';
import { Property } from './property.model';
import { TypedocBase } from './typedoc-base.model';

export class Clazz extends TypedocBase {

    override kindString: string = 'Class';
    constructor$!: Constructor;
    methods: MethodModel[] = [];
    properties: Property[] = [];
}
