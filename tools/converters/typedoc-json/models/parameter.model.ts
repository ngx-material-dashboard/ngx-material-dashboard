import { TypedocBase } from './typedoc-base.model';
import { TypeModel } from './type.model';

export class Parameter extends TypedocBase {

    override kindString: string = 'Parameter';
    displayType: string = 'any';

    constructor(data: Partial<Parameter>) {
        super(data);

        if (data.type) {
            this.type = new TypeModel(data.type);
            this.displayType = this.type.displayType;
        }
    }
}
