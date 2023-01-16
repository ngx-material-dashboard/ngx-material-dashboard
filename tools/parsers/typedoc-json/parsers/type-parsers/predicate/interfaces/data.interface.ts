import { TypeParser } from '../../type-parser';

export interface PredicateTypeParserData {
    /**
     * Whether this predicate type asserts a value.
     */
    asserts: boolean;

    /**
     * The name of this predicate type.
     */
    name: string;

    /**
     * The type of this predicate type.
     *
     * If this {@link PredicateTypeParser.asserts} is `false` this will not be `null`
     */
    type: TypeParser | null;
}
