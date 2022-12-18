import { Signature } from './signature.model';
import { TypedocBase } from './typedoc-base.model';

export class MethodModel extends TypedocBase {
    override kindString: string = 'Method';
    signatures: Signature[];
    returns?: string;
    returnType?: string;

    constructor(data: Partial<MethodModel>) {
        super(data);
        this.signatures = [];

        if (data.signatures) {
            data.signatures.forEach((s: Partial<Signature>) => {
                const signature = new Signature(s);
                this.signatures.push(signature);

                // the 'Call signature' contains parameters and description for
                // the method so set them if this is the 'Call signature'
                if (signature.kindString === 'Call signature') {
                    if (signature.parameters.length > 0) {
                        this.parameters = signature.parameters;
                    }

                    this.description = signature.description;
                    this.returns = signature.comment?.returns;
                    this.returnType = signature.type?.displayType;
                }
            });
        }
    }
}
