import { ProjectParser } from '../../../project/project.parser';
import { TypeParser } from './type-parser.interface';

export interface FormatToStringOptions<P extends TypeParser> {
    /**
     * The type parser to format.
     */
    parser: P;

    /**
     * The project this type parser belongs to.
     */
    project?: ProjectParser;
}
