import { Signature } from './signature.model';
import { TypedocBase } from './typedoc-base.model';

export class Constructor extends TypedocBase {

    override kindString: string = 'Constructor';
    signatures!: Signature[];
}
