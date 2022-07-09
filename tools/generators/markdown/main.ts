import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as path from 'path';

import { Clazz } from '../../converters/typedoc-json/models/clazz.model';
import { FunctionModel } from '../../converters/typedoc-json/models/function.model';
import { Module } from '../../converters/typedoc-json/models/module.model';
import { TypedocBase } from '../../converters/typedoc-json/models/typedoc-base.model';
import { UsageNote, USAGE_TYPES } from '../../converters/typedoc-json/models/usage-note.model';
import { registerHelpers } from './utils/register-helpers';
import { registerPartials } from './utils/register-partials';

const DOCS_DIRECTORY_MAP: { [module: string]: string } = {
    'base-json': 'base-json',
    'json': 'json',
    'json-api': 'json-api',
    'widgets': 'widgets',
    'testing': 'testing'
}

const MODULE_TYPE_DIRECTORY_MAP: { [moduleType: string]: string } = {
    'Component': 'components',
    'Directive': 'directives',
    'decorator': 'decorators',
    '.element.': 'elements',
    'interface': 'interfaces',
    '.model.': 'models',
    'Module': 'modules',
    '.page.': 'pages',
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

    const componentTemplate = Handlebars.compile(
        fs.readFileSync(path.join(TEMPLATE_PATH, 'component.hbs')).toString()
    );

    const decoratorTemplate = Handlebars.compile(
        fs.readFileSync(path.join(TEMPLATE_PATH, 'decorator.hbs')).toString()
    );

    const directiveTemplate = Handlebars.compile(
        fs.readFileSync(path.join(TEMPLATE_PATH, 'directive.hbs')).toString()
    )

    const usageNotesTemplaet = Handlebars.compile(
        fs.readFileSync(path.join(TEMPLATE_PATH, 'usage-notes.hbs')).toString()
    )

    modules.forEach((module: Module) => {
        const baseDir = DOCS_DIRECTORY_MAP[module.displayName];
        // generate base outputPath
        let baseOutputPath = path.join(
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

        module.classes.forEach((clazz: Clazz) => {
            const outputPath = buildOutputPath(baseOutputPath, clazz);
            let output 
            if (clazz.name.endsWith('Component')) {
                output = componentTemplate(clazz);
            } else if (clazz.name.endsWith('Directive')) {
                output = directiveTemplate(clazz);
            } else if (clazz.name.endsWith('Module')) {
                output = moduleTemplate(clazz);
            } else {
                output = classTemplate(clazz);
            }
            writeFile(outputPath, 'api.md', output);

            if (clazz.usageNotes.length > 0) {
                const oneNote = clazz.usageNotes.length === 1;
                clazz.usageNotes.forEach((usageNote: UsageNote, index: number) => {
                    let fileName = 'usage-notes';
                    if (!oneNote) {
                        fileName += `-${index + 1}`
                    }

                    const types = usageNote.types;
                    if (types) {
                        if (Object.keys(types).length > 1) {
                            for(const type of USAGE_TYPES) {
                                if (types[type]) {
                                    const usageNotes = usageNotesTemplaet(types[type]);
                                    writeFile(outputPath, `${fileName}-${type}.md`, usageNotes);
                                }
                            }
                        } else {
                            const usageNotes = usageNotesTemplaet(usageNote.text);
                            writeFile(outputPath, `${fileName}.md`, usageNotes);
                        }
                    } else {
                        const usageNotes = usageNotesTemplaet(usageNote.text);
                        writeFile(outputPath, `${fileName}.md`, usageNotes);
                    }
                });
                
            }
        });

        module.functions.forEach((f: FunctionModel) => {
            const outputPath = buildOutputPath(baseOutputPath, f);
            const output = decoratorTemplate(f);
            writeFile(outputPath, 'api.md', output);
        });
    });
}

function buildOutputPath(outputPath: string, t: TypedocBase) {
    // add module type to directory hierarchy if it exists
    const moduleType = getModuleType(t);
    if (moduleType) {
        outputPath = append(outputPath, moduleType);
    }

    // add formatted class name to directory hierarchy
    return append(outputPath, reformatText(t.name));
}

function append(outputPath: string, text: string) {
    return path.join(
        outputPath,
        text
    );
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

function getModuleType(t: TypedocBase): string | undefined {
    let moduleType;
    Object.keys(MODULE_TYPE_DIRECTORY_MAP).forEach((key: string) => {
        if (t.name.includes(key)) {
            moduleType = MODULE_TYPE_DIRECTORY_MAP[key];
        } else if (t.sources[0].fileName.includes(key)) {
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
