import { TypeParser } from '../../type-parser';

export interface ReferenceTypeParserData {
    /**
     * The id of this reference type.
     */
    id: number | null;

    /**
     * The name of this reference type.
     */
    name: string;

    /**
     * The package name of this reference type.
     */
    packageName: string | null;

    /**
     * The type arguments of this reference type.
     */
    typeArguments: TypeParser[];
}
