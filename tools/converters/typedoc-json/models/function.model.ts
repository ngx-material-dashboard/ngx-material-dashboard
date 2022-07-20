import { Parameter } from './parameter.model';
import { Signature } from './signature.model';
import { TypedocBase } from './typedoc-base.model';

export class FunctionModel extends TypedocBase {

    override kindString: string = 'Function';
    returns: string | undefined;
    returnType: string | undefined;
    signatures: Signature[] = [];

    constructor(data: Partial<FunctionModel>) {
        super(data);

        if (data.signatures) {
            this.signatures = [];
            const signature = new Signature(data.signatures[0]);
            this.signatures.push(signature);

            this.description = signature.comment?.shortText;
            this.parameters = signature.parameters;
            this.returns = signature.comment?.returns;
            this.returnType = signature.type?.name;
        }
    }
}
