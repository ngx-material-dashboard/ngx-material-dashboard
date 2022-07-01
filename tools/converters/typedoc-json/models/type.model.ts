export class TypeModel {
    displayType: string;
    id?: number;
    name!: string;
    /** Defines whether this type is an array or not. */
    type!: string;
    types?: TypeModel[];
    /** Any included type arguments (i.e. "<T>" for type). */
    typeArguments?: { type: string, id: number, name: string }[];
    /** 
     * Type information for arrays (there may be more this includes, but that's
     * what I've determined so far).
     */
    elementType?: { type: string, name: string };

    constructor(data: Partial<TypeModel>) {
        Object.assign(this, data);
        if (data.type === 'union') {
            this.types = [];
            data.types?.forEach((t: Partial<TypeModel>) => {
                this.types?.push(new TypeModel(t));
            });
        }

        this.displayType = this.getDisplayType();
    }

    private getDisplayType(): string {
        let type: string;
        if (this.type === 'array') {
            // if the type is array, then elementType.name should
            // contain type of array
            type = `${this.elementType?.name}`;
            if (this.typeArguments) {
                type += `<${this.typeArguments[0].name}>`;
            }

            type += '[]';
        } else if (this.type === 'union') {
            type = '';
            this.types?.forEach((t: TypeModel, index: number) => {
                if (index > 0) {
                    type += ' | ';
                }

                type += t.displayType;
            });
        } else {
            // if type is not an array, then name should contain
            // name of property type whether they are primitive or Objects
            type = this.name;
            if (this.typeArguments) {
                type += `<${this.typeArguments[0].name}>`;
            }
        }

        return type;
    }
}
