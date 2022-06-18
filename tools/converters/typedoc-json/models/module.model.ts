import { Clazz } from './clazz.model';
import { TypedocBase } from './typedoc-base.model';

export class Module extends TypedocBase {

    override kindString: string = 'Module';
    classes: Clazz[] = [];
}