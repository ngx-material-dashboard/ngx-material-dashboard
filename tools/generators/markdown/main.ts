import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as path from 'path';
import { Clazz } from 'tools/converters/typedoc-json/models/clazz.model';

import { Module } from 'tools/converters/typedoc-json/models/module.model';
import { registerHelpers } from './utils/register-helpers';
import { registerPartials } from './utils/register-partials';

const DOCS_DIRECTORY_MAP: { [module: string]: string } = {
    'base-json': 'services-libraries',
    'json': 'services-libraries',
    'json-api': 'services-libraries',
    'widgets': 'component-libraries',
    'testing': 'testing-libraries'
}

export function generateMarkdown(modules: Module[]) {
    registerHelpers();
    registerPartials();

    const TEMPLATE_PATH = path.join(__dirname, 'templates');
    const moduleTemplate = Handlebars.compile(
        fs.readFileSync(path.join(TEMPLATE_PATH, 'module.hbs')).toString()
    );

    const classTemplate = Handlebars.compile(
        fs.readFileSync(path.join(TEMPLATE_PATH, 'clazz.hbs')).toString()
    );

    modules.forEach((module: Module) => {
        const baseDir = DOCS_DIRECTORY_MAP[module.displayName];
        module.classes.forEach((clazz: Clazz) => {
            const outputPath = path.join(
                __dirname,
                '..',
                '..',
                '..',
                'documentation',
                'docs',
                baseDir,
                module.displayName,
                'api-docs',
                '_' + clazz.name + '.md'
            );
            const output = classTemplate(clazz);
            writeFile(outputPath, output);
        });

        // const output = moduleTemplate(module);


        // TODO now do the stuff to render markdown...
    });
}

function writeFile(filename: string, data: any): void {
    /**
     * flags:
     *  - w = Open file for reading and writing. File is created if not exists
     *  - a+ = Open file for reading and appending. The file is created if not exists
     */
    fs.writeFile(filename, data, function(err) {
        if (err) return console.error(err); 
    });
}
