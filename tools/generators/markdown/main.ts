import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as path from 'path';
import { Clazz } from 'tools/converters/typedoc-json/models/clazz.model';

import { Module } from 'tools/converters/typedoc-json/models/module.model';
import { registerHelpers } from './utils/register-helpers';
import { registerPartials } from './utils/register-partials';

const DOCS_DIRECTORY_MAP: { [module: string]: string } = {
    'base-json': 'json/base-json',
    'json': 'json/json',
    'json-api': 'json/json-api',
    'widgets': 'widgets',
    'testing': 'testing'
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
                'projects',
                'documentation',
                'src',
                'assets',
                'docs',
                baseDir,
                reformatText(clazz.name)
            );
            const output = classTemplate(clazz);
            writeFile(outputPath, 'api.md', output);
        });

        // const output = moduleTemplate(module);


        // TODO now do the stuff to render markdown...
    });
}

function writeFile(directory: string, filename: string, data: any): void {
    // create directory if it doesn't exist
    if (!fs.existsSync(directory)) {
        fs.mkdir(directory, { recursive: true }, (err) => {
            if (err) throw err;
        });
    }
    /**
     * flags:
     *  - w = Open file for reading and writing. File is created if not exists
     *  - a+ = Open file for reading and appending. The file is created if not exists
     */
    fs.writeFile(`${directory}/${filename}`, data, { flag: 'w' }, function(err) {
        if (err) return console.error(err); 
    });
}

function reformatText(x: string): string {
    const text = x.replace(' ', '').replace('Component', '');
    let reformattedText = '';
    for(let i = 0; i < text.length; i++) {
        const character = text.charAt(i);
        if (character === character.toUpperCase()) {
            if (i > 0) {
                reformattedText += '-';
            }
            reformattedText += character.toLowerCase();
        } else {
            reformattedText += character;
        }
    }

    return reformattedText;
}
