/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as path from 'path';

/**
 * Compiles and tracks templates used to render markdown files.
 */
export class TemplateConfig {
    moduleTemplate: HandlebarsTemplateDelegate<any>;
    classTemplate: HandlebarsTemplateDelegate<any>;
    componentTemplate: HandlebarsTemplateDelegate<any>;
    decoratorTemplate: HandlebarsTemplateDelegate<any>;
    directiveTemplate: HandlebarsTemplateDelegate<any>;
    overviewTemplate: HandlebarsTemplateDelegate<any>;
    usageNotesTemplate: HandlebarsTemplateDelegate<any>;

    constructor() {
        const TEMPLATE_PATH = path.join(
            __dirname,
            '..',
            '..',
            'generators',
            'markdown',
            'templates'
        );
        this.moduleTemplate = this.compileTemplate(TEMPLATE_PATH, 'module.hbs');
        this.classTemplate = this.compileTemplate(TEMPLATE_PATH, 'clazz.hbs');
        this.componentTemplate = this.compileTemplate(
            TEMPLATE_PATH,
            'component.hbs'
        );
        this.decoratorTemplate = this.compileTemplate(
            TEMPLATE_PATH,
            'decorator.hbs'
        );
        this.directiveTemplate = this.compileTemplate(
            TEMPLATE_PATH,
            'directive.hbs'
        );
        this.overviewTemplate = this.compileTemplate(
            TEMPLATE_PATH,
            'overview.hbs'
        );
        this.usageNotesTemplate = this.compileTemplate(
            TEMPLATE_PATH,
            'usage-notes.hbs'
        );
    }

    /**
     * Compiles the template at the given path with the given name.
     *
     * @param templatePath The full path to the template.
     * @param templateName The name of the template.
     * @returns The compiled template.
     */
    private compileTemplate(templatePath: string, templateName: string) {
        return Handlebars.compile(
            fs.readFileSync(path.join(templatePath, templateName)).toString()
        );
    }
}
