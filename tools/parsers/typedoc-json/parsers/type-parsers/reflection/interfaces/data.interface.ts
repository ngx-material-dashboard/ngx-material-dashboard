import { JSONOutput } from 'typedoc';

export interface ReflectionTypeParserData {
    /**
     * The reflection of this reflection type.
     */
    reflection: JSONOutput.DeclarationReflection | null;
}
