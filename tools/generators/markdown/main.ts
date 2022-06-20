import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as path from 'path';
import { Clazz } from 'tools/converters/typedoc-json/models/clazz.model';

import { Module } from 'tools/converters/typedoc-json/models/module.model';
import { registerHelpers } from './utils/register-helpers';
import { registerPartials } from './utils/register-partials';

export function generateMarkdown(modules: Module[]) {
    registerHelpers();
    registerPartials();

    const TEMPLATE_PATH = path.join(__dirname, 'templates');
    const moduleTemplate = Handlebars.compile(
        fs.readFileSync(path.join(TEMPLATE_PATH, 'module.hbs')).toString()
    );

    modules.forEach((module: Module) => {
        // module.classes.forEach((clazz: Clazz) => {
        //     console.log(clazz.properties);
        // });
        const output = moduleTemplate(module);
        console.log(output);
        // TODO now do the stuff to render markdown...
    });
}
