export class ImplementationOf {
    id?: number;
    name!: string;
    type!: string;

    constructor(data: Partial<ImplementationOf>) {
        Object.assign(this, data);
    }
}
