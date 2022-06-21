export class DecoratorType {
    type!: string;
    qualifiedName!: string;
    package!: string;
    name!: string;

    constructor(data: Partial<DecoratorType>) {
        Object.assign(this, data);
    }
}
