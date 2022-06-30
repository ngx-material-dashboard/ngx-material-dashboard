export class TypeModel {
    id?: number;
    name!: string;
    /** Defines whether this type is an array or not. */
    type!: string;
    /** Any included type arguments (i.e. "<T>" for type). */
    typeArguments?: { type: string, id: number, name: string };
    /** 
     * Type information for arrays (there may be more this includes, but that's
     * what I've determined so far).
     */
    elementType?: { type: string, name: string };

    constructor(data: Partial<TypeModel>) {
        Object.assign(this, data);
    }
}
