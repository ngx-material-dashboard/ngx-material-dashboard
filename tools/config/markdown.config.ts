/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

/**
 * Map of library names to "shared" files and other markdown files to be
 * rendered on the libraries main overview page. Files need to be placed in
 * order of how they should be displayed on page.
 */
export const SHARED_FILES: { [lib: string]: string[] } = {
    'base-json': [
        'assets/docs/base-json/install.md',
        'assets/docs/shared/configuration.md',
        'assets/docs/base-json/usage.md',
        'assets/docs/shared/crud-capabilities.md',
        'assets/docs/shared/custom-headers.md',
        'assets/docs/shared/error-handling.md',
        'assets/docs/shared/end-overview.md'
    ],
    json: [
        'assets/docs/json/format.md',
        'assets/docs/json/install.md',
        'assets/docs/shared/configuration.md',
        'assets/docs/json/usage.md',
        'assets/docs/shared/crud-capabilities.md',
        'assets/docs/shared/custom-headers.md',
        'assets/docs/shared/error-handling.md',
        'assets/docs/shared/end-overview.md'
    ],
    'json-api': [
        'assets/docs/json-api/install.md',
        'assets/docs/shared/configuration.md',
        'assets/docs/json-api/usage.md',
        'assets/docs/shared/crud-capabilities.md',
        'assets/docs/shared/custom-headers.md',
        'assets/docs/shared/error-handling.md',
        'assets/docs/shared/end-overview.md'
    ],
    'json-overview': [
        'assets/docs/shared/crud-capabilities.md',
        'assets/docs/shared/custom-headers.md',
        'assets/docs/shared/error-handling.md',
        'assets/docs/shared/end-overview.md'
    ]
};
