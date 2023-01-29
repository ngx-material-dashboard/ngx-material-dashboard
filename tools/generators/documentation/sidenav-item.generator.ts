import * as path from 'path';

import { Parser } from '../../parsers/typedoc-json';
import { ProjectParser } from '../../parsers/typedoc-json/parsers/project';
import { SidenavItem } from '../../../projects/widgets/src/lib/layout/interfaces/sidenav.interface';
import { FileUtil } from '../../util/file.util';
import {
    convertUrlToRoute,
    convertSelectorToText,
    reformatText
} from './helpers';

/**
 * Path to the documentation app's src directory relative to this file.
 */
const baseDocsSrcDir = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'projects',
    'documentation',
    'src'
);

/**
 * The `SidenavItemGenerator` generates and updates sidenav items for the
 * documentation app based on the projects defined in the workspace.
 */
export class SidenavItemGenerator {
    /** The project parsers to use to generate the sidenavItems. */
    projectParsers: ProjectParser[];
    /** The generated sidenavItems. */
    sidenavItems: { [route: string]: SidenavItem[] };

    constructor(projectParsers: ProjectParser[]) {
        this.projectParsers = projectParsers;
        this.sidenavItems = {};
    }

    /**
     * Generates all sidenav items for documentation project.
     */
    generateSidenavItems() {
        const jsonProjects = ['base-json', 'json', 'json-api'];
        let jsonSidenavItems: SidenavItem[] = [];
        this.projectParsers.forEach((p: ProjectParser) => {
            // generate sidenavItems for each project
            let projectSidenavItems: SidenavItem[] = [];
            if (p.modules && p.name === 'testing') {
                // testing project has it's own sidenav structure...
                // elements, fixtures, mocks, models, page-objects, services
                projectSidenavItems = [
                    {
                        route: ['testing', 'elements'],
                        selector: 'elements',
                        text: 'elements'
                    },
                    {
                        route: ['testing', 'fixtures'],
                        selector: 'fixtures',
                        text: 'fixtures'
                    },
                    {
                        route: ['testing', 'mocks'],
                        selector: 'mocks',
                        text: 'mocks'
                    }
                ];
            } else if (p.modules && jsonProjects.includes(p.name)) {
                // json project libs are all rendered together in documentation, so
                // another special case for these projects
                jsonSidenavItems = [
                    ...jsonSidenavItems,
                    ...this.generateSidenavItemsFromParsers(p.modules, '')
                ];
            } else if (p.modules) {
                // default project sidenavItems to list of module names in project
                projectSidenavItems = this.generateSidenavItemsFromParsers(
                    p.modules,
                    p.name
                );
            }
            this.sidenavItems[p.name] = projectSidenavItems;
        });

        // add jsonSidenavItems for each of the json projects; this ensures the
        // same sidenav for each json library in documentation
        jsonProjects.forEach((p: string) => {
            this.sidenavItems[p] = jsonSidenavItems;
        });
    }

    /**
     * Generates list of nested sidenav items based on given configuration
     * data. Configuration data should be a list of details that can be used to
     * generate a single nested sidenavitem.
     *
     * @param itemsConfig Array of data to use to create nested sidenavitems.
     * @returns List of nested sidenav items based on given configuration.
     */
    private generateNestedSidenavItems(
        itemsConfig: {
            p: ProjectParser;
            parsers: Parser[];
            text: string;
            selector: string;
            symbolType?: string;
            baseUrl?: string;
        }[]
    ) {
        const sidenavItems: SidenavItem[] = [];
        itemsConfig.forEach((c) => {
            const items = this.generateNestedSidenavItemFromParser(
                c.parsers,
                c.text,
                c.selector,
                `${c.p.name}${c.baseUrl}`,
                c.symbolType
            );
            if (items) {
                // only add items to result if they exist
                sidenavItems.push(items);
            }
        });
        return sidenavItems;
    }

    /**
     * Generates a single nested sidenav item from the list of given parsers.
     * The list of parsers are what is nested inside a sidenav item with the
     * given text. It is possible to filter the list of parsers by passing in a
     * symbolType, which should correspond with the expected text the files of
     * the given symbolType should end with (i.e. '.component.ts'). If no
     * symbolType is included, then the entire list of parsers is included in
     * the sidenav item. This is done because some symbol types are found in
     * module classes and separated out like components, directives, etc. NOTE:
     * if list of parsers is empty not sidenav item is returned.
     *
     * @param parsers List of parsers to render in sidenav item.
     * @param text The text for the top level of the nested sidenav item.
     * @param selector The selector for the top level of the nested sidenav item.
     * @param symbolType Optional filter value to filter list of parsers.
     * @returns A single nested sidenav item from list of given parsers.
     */
    private generateNestedSidenavItemFromParser(
        parsers: Parser[],
        text: string,
        selector: string,
        baseUrl: string,
        symbolType?: string
    ): SidenavItem | undefined {
        if (symbolType) {
            // filter given list of parsers by symbolType if it exists
            parsers = parsers.filter((it) =>
                it.source?.file.endsWith(symbolType)
            );
        }

        // only return a sidenav item if there are things to include
        if (parsers.length > 0) {
            const sidenavItems = this.generateSidenavItemsFromParsers(
                parsers,
                baseUrl
            );
            return this.createNestedSidenavItem(text, selector, sidenavItems);
        } else {
            return undefined;
        }
    }

    /**
     * Generates list of basic sidenavItems from given parsers. The items
     * default to the reformatted text representation of their name.
     *
     * @param parsers The parsers to use for sidenav items.
     * @returns List of basic sidenavItems based on list of parsers.
     */
    private generateSidenavItemsFromParsers(
        parsers: Parser[],
        baseUrl: string
    ): SidenavItem[] {
        const sidenavItems: SidenavItem[] = [];
        parsers.forEach((p: Parser) => {
            sidenavItems.push(
                this.createSidenavItem(p, `${baseUrl}/${reformatText(p.name)}`)
            );
        });

        return sidenavItems;
    }

    /**
     * Creates a sidenav item with child sidenav items.
     *
     * @param text The text for the sidenav item.
     * @param selector The CSS selector for the sidenav item.
     * @param children The children to include for the sidenav item.
     * @returns The sidenav item with children sidenav items.
     */
    private createNestedSidenavItem(
        text: string,
        selector: string,
        children: SidenavItem[]
    ): SidenavItem {
        return {
            text,
            selector,
            children
        };
    }

    /**
     * Creates a basic sidenav item that should contain a single route.
     *
     * @param parser The parser to use for the text of the sidenavItem.
     * @param url The url to set for the sidenavItem.
     * @returns A basic sidenav item that contains a single route.
     */
    private createSidenavItem(parser: Parser, url: string): SidenavItem {
        let route;
        let selector;
        let text;
        if (`${reformatText(parser.name)}/` !== url) {
            // convert the URL to an array of string values to be used for the route
            route = convertUrlToRoute(url);
            // get the last value in the route which should match a selector format
            selector = route[route.length - 1];

            if (!['base-json', 'json', 'json-api'].includes(selector)) {
                // convert selector format to camel case for anything other than json
                text = convertSelectorToText(selector);
            } else {
                // set text to selector if json so it matches library name
                text = selector;
            }
        } else {
            // special case for when displayName and URL match, just include
            // the url for the route
            route = [`./${url}`];
            selector = url;
            text = url;
        }

        return {
            route,
            selector,
            text
        };
    }

    /**
     * Updates the sidenavitems in the layout for the documentation app.
     */
    updateSidenavItems() {
        const file = path.join(
            baseDocsSrcDir,
            'app',
            'widgets',
            'layout',
            'layout',
            'layout.component.ts'
        );

        let sidenavItemsString = JSON.stringify(this.sidenavItems).replace(
            '{',
            ''
        );
        sidenavItemsString = sidenavItemsString.substring(
            0,
            sidenavItemsString.lastIndexOf('}')
        );
        FileUtil.replaceInFile(
            file,
            /(?<=const routeSidenavItems: any = {)([\s\S]*)(?=};)/g,
            sidenavItemsString
        );
    }
}
