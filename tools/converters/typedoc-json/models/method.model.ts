import { Parameter } from './parameter.model';
import { Signature } from './signature.model';
import { TypedocBase } from './typedoc-base.model';

export class MethodModel extends TypedocBase {

    override kindString: string = 'Method';
    signatures: Signature[];
    parameters: Parameter[];

    constructor(data: Partial<MethodModel>) {
        super(data);
        this.signatures = [];
        this.parameters = [];

        if (data.signatures) {
            data.signatures.forEach((s: Partial<Signature>) => {
                const signature = new Signature(s);
                this.signatures.push(signature);

                // the 'Call signature' contains parameters and description for
                // the method so set them if this is the 'Call signature'
                if (signature.kindString === 'Call signature') {
                    this.parameters = signature.parameters;
                    this.description = signature.description;
                }
            });
        }
    }
}
