/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { JSONOutput } from 'typedoc';
import { ProjectParserJson } from './json.interface';

export interface Options {
    /**
     * The data for this project.
     */
    data: ProjectParserJson | JSONOutput.ProjectReflection;

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
