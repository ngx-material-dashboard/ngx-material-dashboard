import { JSONOutput } from 'typedoc';
import { WorkspaceParserJson } from './json.interface';

export interface Options {
    /**
     * The data for this project.
     */
    data: WorkspaceParserJson | JSONOutput.ProjectReflection;

    /**
     * The version of the project being parsed.
     * @since 3.0.0
     */
    version?: string;

    /**
     * The readme content of this project.
     * @since 3.0.0
     */
    readme?: string;

    /**
     * The changelog content of this project.
     */
    changelog?: string;
}
