/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

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
