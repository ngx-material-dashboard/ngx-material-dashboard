import { CommentParserJson } from '../../../misc-parsers';
import { ParserJson } from '../../../parser';
import { Json } from '../../../type-parsers';
import { ClassParserAccessibility } from '../../enums/accessibility.enum';

export interface ClassPropertyParserJson extends ParserJson {
    /**
     * The comment parser of this property.
     */
    comment: CommentParserJson;

    /**
     * The id of the parent class parser.
     */
    parentId: number;

    /**
     * The accessibility of this property.
     */
    accessibility: ClassParserAccessibility;

    /**
     * Whether this property is abstract.
     */
    abstract: boolean;

    /**
     * Whether this property is static.
     */
    static: boolean;

    /**
     * Whether this property is readonly.
     */
    readonly: boolean;

    /**
     * Whether this property is optional.
     */
    optional: boolean;

    /**
     * The type parser of this property in a Json compatible format.
     */
    type: Json;
}
