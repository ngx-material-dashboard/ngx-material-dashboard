import { Signature } from './signature.model';
import { Source } from './source.model';
import { TypedocBase } from './typedoc-base.model';

export class MethodModel extends TypedocBase {

    override kindString: string = 'Method';
    signatures!: Signature[];
}
