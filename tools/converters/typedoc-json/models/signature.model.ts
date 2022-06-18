import { TypeModel } from './type.model';

export class Signature {
    id!: number;
    comment?: string;
    name!: string;
    kind!: number;
    kindString!: string;
    flags!: {};
    type!: TypeModel;

    constructor(data: Partial<Signature>) {
        Object.assign(this, data);
    }
}
