import { Declaration } from './declaration.model';

export class TypeModel {
    declaration?: Declaration;
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
    elementType?: { type: string, name?: string, declaration?: Declaration };

    constructor(data: Partial<TypeModel>) {
        Object.assign(this, data);
        if (data.type === 'array' && data.elementType && data.elementType.declaration) {
            // if the type is array and elementType defined, then array should
            // be JSON object literal and that should be defined in
            // elementType.declaration
            this.declaration = new Declaration(data.elementType.declaration);
        } else if (data.type === 'reflection' && data.declaration) {
            this.declaration = new Declaration(data.declaration);
        } else if (data.type === 'union') {
            this.types = [];
            data.types?.forEach((t: Partial<TypeModel>) => {
                this.types?.push(new TypeModel(t));
            });

            // sort types by displayType value, keeping "undefined" displayType
            // at the end
            this.types = this.types.sort((a: TypeModel, b: TypeModel) => {
                if (a.displayType === 'undefined' || a.displayType === undefined) {
                    return 1;
                } else if (b.displayType === 'undefined' || b.displayType === undefined) {
                    return -1;
                } else {
                    return a.displayType.localeCompare(b.displayType);
                }
            });
        }

        this.displayType = this.getDisplayType();
    }

    private getDisplayType(): string {
        let type: string;
        if (this.type === 'array') {
            if (this.elementType?.type === 'reflection') {
                // render type as reflection (JSON object literal)
                type = this.declaration ? this.declaration.displayName : '';
            } else {
                // elementType.name should contain type of array for objects
                type = `${this.elementType?.name}`;
                if (this.typeArguments) {
                    type += `<${this.typeArguments[0].name}>`;
                }
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
        } else if (this.type === 'reflection') {
            // this is a JSON object literal so render that
            type = this.declaration ? this.declaration.displayName : '';
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
