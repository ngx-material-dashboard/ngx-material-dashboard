/**
 * Kinds of JSON objects as defined by typedoc.
 */
export enum Kind {
    Array = 'array',
    Conditional = 'conditional',
    IndexedAccess = 'indexedAccess',
    Inferred = 'inferred',
    Intersection = 'intersection',
    Intrinsic = 'intrinsic',
    Literal = 'literal',
    Mapped = 'mapped',
    NamedTupleMember = 'namedTupleMember',
    Optional = 'optional',
    Predicate = 'predicate',
    Query = 'query',
    Reference = 'reference',
    Reflection = 'reflection',
    Rest = 'rest',
    TemplateLiteral = 'templateLiteral',
    Tuple = 'tuple',
    TypeOperator = 'typeOperator',
    Union = 'union',
    Unknown = 'unknown'
}
