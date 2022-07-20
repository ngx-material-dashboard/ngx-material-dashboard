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

            this.parameters = signature.parameters;
            this.returns = signature.comment?.returns;
            this.returnType = signature.type?.name;

            if (signature.comment) {
                this.comment = signature.comment;
                this.description = this.comment.shortText;
                this.usageNotes = this.comment.usageNotes;
                this.overviewDetails = this.comment.overviewDetails;
            }
        }
    }
}
