export class TypeModel {
    id?: number;
    name!: string;
    type!: string;

    constructor(data: Partial<TypeModel>) {
        Object.assign(this, data);
    }
}
