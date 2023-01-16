import { JSONOutput } from 'typedoc';
import { Kind } from '../../../../enums';
import { Json } from '../../type-parser';

export interface ReflectionTypeParserJson extends Json {
    kind: Kind.Reflection;

    /**
     * The reflection of this reflection type.
     */
    reflection: JSONOutput.DeclarationReflection | null;
}
