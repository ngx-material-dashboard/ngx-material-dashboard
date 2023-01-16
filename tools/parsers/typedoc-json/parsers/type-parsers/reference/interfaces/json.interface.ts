import { Kind } from '../../../../enums';
import { Json } from '../../type-parser';

export interface ReferenceTypeParserJson extends Json {
    kind: Kind.Reference;

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
     * The type arguments of this reference type in a Json compatible format.
     */
    typeArguments: Json[];
}
