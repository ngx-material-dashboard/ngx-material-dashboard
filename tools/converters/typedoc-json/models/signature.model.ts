import { Parameter } from './parameter.model';
import { TypeModel } from './type.model';
import { TypedocBase } from './typedoc-base.model';

export class Signature extends TypedocBase {

    constructor(data: Partial<Signature>) {
        super(data);
        this.parameters = [];

        if (data.parameters) {
            data.parameters.forEach((p: Partial<Parameter>) => {
                this.parameters?.push(new Parameter(p));
            });
        }

        if (data.type) {
            this.type = new TypeModel(data.type);
        }
    }
}
