import { Kind } from '../../../../enums';
import { ProjectParser } from '../../../project/project.parser';
import { Json } from './json.interface';

export interface TypeParser {
    /**
     * The kind of type this parser is for.
     * @since 1.0.0
     */
    kind: Kind;

    /**
     * The method to convert this type parser to a Json compatible format.
     * @since 1.0.0
     */
    toJSON(): Json;

    /**
     * The method to convert this type parser to a string.
     * @param project The optional project parser to use.
     * @since 1.0.0
     */
    toString(project?: ProjectParser): string;
}
