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

const MODULE_TYPE_DIRECTORY_MAP: { [moduleType: string]: string } = {
    'Component': 'components',
    'Directive': 'directives',
    'interface': 'interfaces',
    'Module': 'modules',
    'Service': 'services'
};

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
            // generate base outputPath
            let outputPath = path.join(
                __dirname,
                '..',
                '..',
                '..',
                'projects',
                'documentation',
                'src',
                'assets',
                'docs',
                baseDir
            );

            // add module type to directory hierarchy if it exists
            const moduleType = getModuleType(clazz);
            if (moduleType) {
                outputPath = path.join(
                    outputPath,
                    moduleType
                );
            }

            // add formatted class name  to directory hierarchy
            outputPath = path.join(
                outputPath,
                reformatText(clazz.name)
            )
            const output = classTemplate(clazz);
            writeFile(outputPath, 'api.md', output);
        });

        // const output = moduleTemplate(module);


        // TODO now do the stuff to render markdown...
    });
}

function writeFile(directory: string, filename: string, data: any): void {
    if (!fs.existsSync(directory)) {
        // create directory if it doesn't exist
        fs.mkdir(directory, { recursive: true }, (err) => {
            if (err) {
                throw err
            } else {
                writeFileUtil(directory, filename, data);
            }
        });
    } else {
        writeFileUtil(directory, filename, data);
    }
}

/**
 * flags:
 *  - w = Open file for reading and writing. File is created if not exists
 *  - a+ = Open file for reading and appending. The file is created if not exists
 */
function writeFileUtil(directory: string, filename: string, data: any) {
     fs.writeFile(`${directory}/${filename}`, data, { flag: 'w' }, function(err) {
        if (err) return console.error(err); 
    });
}

function getModuleType(clazz: Clazz): string | undefined {
    let moduleType;
    Object.keys(MODULE_TYPE_DIRECTORY_MAP).forEach((key: string) => {
        if (clazz.name.includes(key)) {
            moduleType = MODULE_TYPE_DIRECTORY_MAP[key];
        } else if (clazz.sources[0].fileName.includes(key)) {
            moduleType = MODULE_TYPE_DIRECTORY_MAP[key];
        }
    });

    return moduleType;
}

function reformatText(x: string): string {
    const text = x.replace(' ', '').replace('Component', '').replace('Module', '').replace('Service', '');
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
