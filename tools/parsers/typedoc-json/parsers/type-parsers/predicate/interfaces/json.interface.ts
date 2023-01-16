import { Kind } from '../../../../enums';
import { Json } from '../../type-parser';

export interface PredicateTypeParserJson extends Json {
    kind: Kind.Predicate;

    /**
     * Whether this predicate type asserts a value.
     */
    asserts: boolean;

    /**
     * The name of this predicate type.
     */
    name: string;

    /**
     * The type of this predicate type in a Json compatible format.
     *
     * If this {@link Predicate.asserts} is `false` this will not be `null`
     */
    type: Json | null;
}
