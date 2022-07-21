import { Clazz } from './clazz.model';
import { FunctionModel } from './function.model';
import { TypedocBase } from './typedoc-base.model';

export class Module extends TypedocBase {

    override kindString: string = 'Module';
    classes: Clazz[] = [];
    functions: FunctionModel[] = [];
    /** These are classes that are not specific (i.e. not component, interface, etc.). */
    nonSpecificClasses: Clazz[] = [];

    constructor(data: Partial<Module>) {
        super(data);

        this.displayName = this.name.replace('/src/lib', '');
    }
}
