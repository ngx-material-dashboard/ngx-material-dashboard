import { TypedocBase } from './typedoc-base.model';
import { TypeModel } from './type.model';

export class Parameter extends TypedocBase {

    override kindString: string = 'Parameter';
    type!: TypeModel;
}
