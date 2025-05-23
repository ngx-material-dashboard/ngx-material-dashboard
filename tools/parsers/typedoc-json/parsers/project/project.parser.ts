/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { bold, red, yellow } from 'colorette';
import {
    NamespaceParser,
    ReflectionKind,
    SearchResult,
    VariableParser
} from 'typedoc-json-parser';
import { reformatText } from '../../../../generators/documentation/helpers';
import { ClassParser } from '../class';
import { EnumParser } from '../enum';
import { FunctionParser } from '../function';
import { InterfaceParser } from '../interface';
import { ModuleParser } from '../module';
import { TypeAliasParser } from '../type-alias';
import { ProjectParserJson } from './interfaces/json.interface';
import { Options } from './interfaces/options.interface';

export class ProjectParser {
    /**
     * The version of `typedoc-json-parser` that generated this Json object.
     * @since 2.1.0
     */
    public readonly typeDocJsonParserVersion: string = ProjectParser.version;

    /**
     * The identifier of this project. This is usually `0`
     * @since 1.0.0
     */
    public readonly id: number;

    /**
     * The name of your project.
     *
     * Corresponds to the `name` property in your TypeDoc configuration or the `name` property of your `package.json` file.
     * @since 1.0.0
     */
    public readonly name: string;

    /**
     * The version of the project being parsed.
     *
     * Corresponds to the `version` property in your `package.json`
     * @since 2.2.0
     */
    public readonly version: string | null;

    /**
     * The readme content of this project.
     * @since 3.0.0
     */
    public readonly readme: string | null;

    /**
     * The changelog of this project.
     * @since 3.2.0
     */
    public changelog: string | null;

    /**
     * An array of class parsers for this project.
     * @since 1.0.0
     */
    public readonly classes: ClassParser[];

    public readonly modules: ModuleParser[];

    /**
     * An array of enum parsers for this project.
     * @since 1.0.0
     */
    public readonly enums: EnumParser[];

    /**
     * An array of function parsers for this project.
     * @since 1.0.0
     */
    public readonly functions: FunctionParser[];

    /**
     * An array of interface parsers for this project.
     * @since 1.0.0
     */
    public readonly interfaces: InterfaceParser[];

    /**
     * An array of namespace parsers for this project.
     * @since 1.0.0
     */
    public readonly namespaces: NamespaceParser[];

    /**
     * An array of type alias parsers for this project.
     * @since 1.0.0
     */
    public readonly typeAliases: TypeAliasParser[];

    /**
     * An array of variable parsers for this project.
     * @since 1.0.0
     */
    public readonly variables: VariableParser[];

    baseMarkdownDirectory?: string;

    public constructor(options: Options) {
        const { data, version, readme, changelog } = options;
        const { id, name } = data;

        this.id = id;
        // modules will have '/src/lib' appended to name at least when getting
        // names from a workspace (this will probably be different for apps;
        // most likely '/src/app'); so remove extra text...
        this.name = name.replace('/src/lib', '');

        if ('classes' in data) {
            const {
                typeDocJsonParserVersion,
                classes,
                enums,
                functions,
                interfaces,
                namespaces,
                typeAliases,
                variables
            } = data;
            const incomingTypeDocVersion = typeDocJsonParserVersion
                .split('.')
                .map(Number) as [number, number, number];
            const currentTypeDocVersion = this.typeDocJsonParserVersion
                .split('.')
                .map(Number) as [number, number, number];

            if (incomingTypeDocVersion[0] !== currentTypeDocVersion[0]) {
                console.warn(
                    red(
                        `${bold(
                            '[WARNING]'
                        )} typedoc-json-parser major version mismatch. Expected ${
                            currentTypeDocVersion[0]
                        }, but received ${incomingTypeDocVersion[0]}`
                    )
                );
            } else if (incomingTypeDocVersion[1] !== currentTypeDocVersion[1]) {
                console.warn(
                    yellow(
                        `${bold(
                            '[WARNING]'
                        )} typedoc-json-parser minor version mismatch. Expected ${
                            currentTypeDocVersion[1]
                        }, but received ${incomingTypeDocVersion[1]}`
                    )
                );
            } else if (incomingTypeDocVersion[2] !== currentTypeDocVersion[2]) {
                console.warn(
                    yellow(
                        `${bold(
                            '[WARNING]'
                        )} typedoc-json-parser patch version mismatch. Expected ${
                            currentTypeDocVersion[2]
                        }, but received ${incomingTypeDocVersion[2]}`
                    )
                );
            }

            this.typeDocJsonParserVersion = typeDocJsonParserVersion;
            this.version = version ?? data.version;
            this.readme = readme ?? data.readme;
            this.changelog = changelog ?? data.changelog;
            this.classes = classes.map((json) =>
                ClassParser.generateFromJson(json)
            );
            this.enums = enums.map((json) => EnumParser.generateFromJson(json));
            this.functions = functions.map((json) =>
                FunctionParser.generateFromJson(json)
            );
            this.interfaces = interfaces.map((json) =>
                InterfaceParser.generateFromJson(json)
            );
            this.namespaces = namespaces.map((json) =>
                NamespaceParser.generateFromJson(json)
            );
            this.typeAliases = typeAliases.map((json) =>
                TypeAliasParser.generateFromJson(json)
            );
            this.variables = variables.map((json) =>
                VariableParser.generateFromJson(json)
            );
        } else {
            const { kind, kindString = 'Unknown', children = [] } = data;

            // this workspace consists of modules, which are hopefully similar
            // enough in structure to projects, so add in additional check if
            // kind is 'Module' (otherwise error is thrown); hopefully this
            // doesn't have any unintended consequences...
            if (
                kind !== ReflectionKind.Project &&
                kind !== ReflectionKind.Module
            )
                throw new Error(
                    `Expected Project | Module (${ReflectionKind.Project}), but received ${kindString} (${kind})`
                );

            this.version = version ?? null;
            this.readme = readme ?? null;
            this.changelog = changelog ?? null;
            this.classes = children
                .filter((child) => child.kind === ReflectionKind.Class)
                .map((child) => ClassParser.generateFromTypeDoc(child));

            this.enums = children
                .filter((child) => child.kind === ReflectionKind.Enum)
                .map((child) => EnumParser.generateFromTypeDoc(child));
            this.functions = children
                .filter((child) => child.kind === ReflectionKind.Function)
                .map((child) => FunctionParser.generateFromTypeDoc(child));

            this.interfaces = children
                .filter((child) => child.kind === ReflectionKind.Interface)
                .map((child) => InterfaceParser.generateFromTypeDoc(child));

            this.namespaces = children
                .filter((child) => child.kind === ReflectionKind.Namespace)
                .map((child) => NamespaceParser.generateFromTypeDoc(child));

            this.typeAliases = children
                .filter((child) => child.kind === ReflectionKind.TypeAlias)
                .map((child) => TypeAliasParser.generateFromTypeDoc(child));

            this.variables = children
                .filter((child) => child.kind === ReflectionKind.Variable)
                .map((child) => VariableParser.generateFromTypeDoc(child));
        }

        // initialize ModuleParsers for project
        this.modules = [];
        const moduleClasses = this.classes.filter((c: ClassParser) => {
            return c.name.endsWith('Module');
        });
        moduleClasses.forEach((m: ClassParser) => {
            // find classes, enums, and interfaces that have module name in
            // source files (remember to include '/src/lib' in check as this
            // gives more accurate results for source files)
            const reformattedName = reformatText(m.name);
            let path = `/${this.name}/src/lib`;
            if (this.name !== reformattedName) {
                // add the module name to path if different from project name
                // since these should be in sub folders, while those that
                // match project name should not
                path = `${path}/${reformattedName}/`;
            }
            const classes = this.classes.filter((c: ClassParser) => {
                return c.source?.path.includes(path);
            });
            const enums = this.enums.filter((e: EnumParser) => {
                return e.source?.path.includes(path);
            });
            const functions = this.functions.filter((f: FunctionParser) => {
                return f.source?.path.includes(path);
            });
            const interfaces = this.interfaces.filter((i: InterfaceParser) => {
                return i.source?.path.includes(path);
            });
            const typeAliases = this.typeAliases.filter(
                (t: TypeAliasParser) => {
                    return t.source?.path.includes(path);
                }
            );
            this.modules.push(
                new ModuleParser({
                    id: m.id,
                    name: m.name,
                    source: m.source,
                    classes: classes,
                    enums: enums,
                    functions: functions,
                    interfaces: interfaces,
                    typeAliases: typeAliases
                })
            );
        });
    }

    /**
     * Find a parser by id.
     * @since 3.0.0
     * @param id The id of the parser to find.
     * @returns The parser with the given id, or `null` if none was found.
     */
    public find(id: number): SearchResult | null {
        for (const classParser of this.classes) {
            if (classParser.id === id) return classParser;
            if (classParser.construct.id === id) return classParser.construct;

            for (const methodParser of classParser.methods) {
                if (methodParser.id === id) return methodParser;

                for (const signature of methodParser.signatures) {
                    if (signature.id === id) return signature;

                    for (const typeParameter of signature.typeParameters)
                        if (typeParameter.id === id) return typeParameter;
                    for (const parameter of signature.parameters)
                        if (parameter.id === id) return parameter;
                }
            }

            for (const propertyParser of classParser.properties)
                if (propertyParser.id === id) return propertyParser;
        }

        for (const enumParser of this.enums) {
            if (enumParser.id === id) return enumParser;

            for (const propertyParser of enumParser.members)
                if (propertyParser.id === id) return propertyParser;
        }

        for (const functionParser of this.functions)
            if (functionParser.id === id) return functionParser;
        for (const interfaceParser of this.interfaces) {
            if (interfaceParser.id === id) return interfaceParser;

            for (const propertyParser of interfaceParser.properties)
                if (propertyParser.id === id) return propertyParser;
        }

        for (const namespaceParser of this.namespaces) {
            if (namespaceParser.id === id) return namespaceParser;

            const found = namespaceParser.find(id);

            if (found) return found;
        }

        for (const typeAliasParser of this.typeAliases)
            if (typeAliasParser.id === id) return typeAliasParser;
        for (const variableParser of this.variables)
            if (variableParser.id === id) return variableParser;

        return null;
    }

    /**
     * Search for a parser with a given query.
     * @since 3.0.0
     * @param query The query to search with.
     * @returns An array of search results.
     */
    public search(query: string): SearchResult[] {
        const results: SearchResult[] = [];
        const words = query
            .toLowerCase()
            .split(/(#|\.)/g)
            .filter((word) => word !== '.' && word !== '#');

        for (const classParser of this.classes) {
            if (classParser.name.toLowerCase().includes(words[0])) {
                if (words.length === 1) {
                    results.push(classParser);

                    continue;
                }

                for (const methodParser of classParser.methods) {
                    if (methodParser.name.toLowerCase().includes(words[1])) {
                        if (words.length === 2) {
                            results.push(methodParser);

                            continue;
                        }
                    }
                }

                for (const propertyParser of classParser.properties) {
                    if (propertyParser.name.toLowerCase().includes(words[1])) {
                        results.push(propertyParser);

                        continue;
                    }
                }
            }
        }

        for (const enumParser of this.enums) {
            if (enumParser.name.toLowerCase().includes(words[0])) {
                if (words.length === 1) {
                    results.push(enumParser);

                    continue;
                }

                for (const enumMemberParser of enumParser.members) {
                    if (
                        enumMemberParser.name.toLowerCase().includes(words[1])
                    ) {
                        results.push(enumMemberParser);

                        continue;
                    }
                }
            }
        }

        for (const functionParser of this.functions) {
            if (functionParser.name.toLowerCase().includes(words[0])) {
                results.push(functionParser);

                continue;
            }
        }

        for (const interfaceParser of this.interfaces) {
            if (interfaceParser.name.toLowerCase().includes(words[0])) {
                if (words.length === 1) {
                    results.push(interfaceParser);

                    continue;
                }

                for (const propertyParser of interfaceParser.properties) {
                    if (propertyParser.name.toLowerCase().includes(words[1])) {
                        results.push(propertyParser);

                        continue;
                    }
                }
            }
        }

        for (const namespaceParser of this.namespaces) {
            if (namespaceParser.name.toLowerCase().includes(words[0])) {
                if (words.length === 1) {
                    results.push(namespaceParser);

                    continue;
                }

                const subResults = namespaceParser.search(
                    query.substring(words[0].length)
                );

                for (const subResult of subResults) results.push(subResult);
            }
        }

        for (const typeAliasParser of this.typeAliases) {
            if (typeAliasParser.name.toLowerCase().includes(words[0])) {
                results.push(typeAliasParser);

                continue;
            }
        }

        for (const variableParser of this.variables) {
            if (variableParser.name.toLowerCase().includes(words[0])) {
                results.push(variableParser);

                continue;
            }
        }

        return results;
    }

    /**
     * Converts this project to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this project.
     */
    public toJSON(): ProjectParserJson {
        return {
            typeDocJsonParserVersion: this.typeDocJsonParserVersion,
            id: this.id,
            name: this.name,
            version: this.version,
            readme: this.readme,
            changelog: this.changelog,
            classes: this.classes.map((parser) => parser.toJSON()),
            enums: this.enums.map((parser) => parser.toJSON()),
            functions: this.functions.map((parser) => parser.toJSON()),
            interfaces: this.interfaces.map((parser) => parser.toJSON()),
            namespaces: this.namespaces.map((parser) => parser.toJSON()),
            typeAliases: this.typeAliases.map((parser) => parser.toJSON()),
            variables: this.variables.map((parser) => parser.toJSON()),
            modules: this.modules.map((parser) => parser.toJSON())
        };
    }

    public static version = '[@versionInjector]';
}
