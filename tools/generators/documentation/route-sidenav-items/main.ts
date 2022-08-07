import * as path from 'path';
import { ReplaceInFile } from '../../../files/replace-in-file';
import { SidenavItem } from '@ngx-material-dashboard/widgets';
import { Module } from '../../../converters/typedoc-json/models/module.model';
import {
    capitalizeFirstLetter,
    convertSelectorToText,
    convertUrlToRoute,
    filterModuleTypeUrls,
    moduleTypes,
    reformatText
} from '../helpers';

const baseDocsSrcDir = path.join(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'projects',
    'documentation',
    'src'
);

const jsonModuleStrings: string[] = [
    'base-json',
    'json',
    'json-api'
]

export function generateSidenavItems(modules: Module[], urls: string[]) {
    let sidenavItems: { [route: string]: SidenavItem[] } = {};
    
    // create JSON sidenav items separately since these work a little different
    // from the rest of the modules; the sidenav for JSON modules includes info
    // from multiple libraries as opposed to the widgets or testing
    const jsonModules = modules.filter((it: Module) => jsonModuleStrings.includes(it.displayName));
    const jsonSidenavItems: SidenavItem[] = [];
    jsonModules.forEach((module: Module) => {
        const nestedSidenavItem: SidenavItem = createNestedSidenavItem(
            module.displayName,
            module.displayName,
            getSidenavItems(module, urls)
        );
        jsonSidenavItems.push(nestedSidenavItem);
    });

    // now initialize sidenav items for all modules
    modules.forEach((module: Module) => {
        if (!jsonModuleStrings.includes(module.displayName)) {
            sidenavItems[module.displayName] = getSidenavItems(module, urls);
        } else {
            sidenavItems[module.displayName] = jsonSidenavItems;
        }
    });

    const file = path.join(
        baseDocsSrcDir,
        'app',
        'widgets',
        'layout',
        'layout',
        'layout.component.ts'
    );
    const replaceInFile: ReplaceInFile = new ReplaceInFile(file);
    replaceInFile.replace(
        /const routeSidenavItems: any = {.*};/g,
        `const routeSidenavItems: any = ${JSON.stringify(sidenavItems)};`
    );
}

function getSidenavItems(module: Module, urls: string[]) {
    const sidenavItems: SidenavItem[] = [];
    const moduleUrls: string[] = urls.filter((it: string) => it.includes(`/${module.displayName}/`));
    const addedUrls: string[] = [];

    // handle different module/class types (i.e. components vs directives vs
    // services etc.) as the URLs for these classes will be nested under their
    // respective type
    moduleTypes.forEach((moduleType: string) => {
        const children: SidenavItem[] = [];
        const moduleTypeUrls: string[] = moduleUrls.filter((it: string) => it.includes(`/${module.displayName}/${moduleType}`));
        moduleTypeUrls.forEach((url: string) => {
            url = url.replace('/api', '').replace('/overview', '');
            if (!addedUrls.includes(url)) {
                children.push(createSidenavItem(module, url));
                addedUrls.push(url);
            }
        });

        if (children.length > 0) {
            const nestedSidenavItem: SidenavItem = createNestedSidenavItem(
                capitalizeFirstLetter(moduleType),
                moduleType,
                children
            );

            sidenavItems.push(nestedSidenavItem);
        }
    });
    
    // handle classes that reside directly at the root of the library, i.e.
    // those classes that do not have a specific type (component, service, etc)
    const nonModuleTypeUrls: string[] = filterModuleTypeUrls(module.displayName, moduleUrls, false, true);
    nonModuleTypeUrls.forEach((url: string) => {
        if (url !== `/${module.displayName}/`) {
            // do not add sidenav items for root urls
            url = url.replace('/api', '').replace('/overview', '');
            if (!addedUrls.includes(url)) {
                sidenavItems.push(createSidenavItem(module, url));
                addedUrls.push(url);
            }
        }
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
function createNestedSidenavItem(text: string, selector: string, children: SidenavItem[]): SidenavItem {
    return {
        text,
        selector,
        children
    };
}

/**
 * Creates a basic sidenav item that should contain a single route.
 *
 * @param module 
 * @param url 
 * @returns 
 */
function createSidenavItem(module: Module, url: string): SidenavItem {
    let route;
    let selector;
    let text;
    if (module.displayName !== url) {
        // convert the URL to an array of string values to be used for the route
        route = convertUrlToRoute(url);
        // get the last value in the route which should match a selector format
        selector = route[route.length - 1];
        // convert the selector format to camel case text for pretty display
        text = convertSelectorToText(selector)
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
    }
}
