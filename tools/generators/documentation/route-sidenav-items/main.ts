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

// const routeSidenavItems: { [route: string]: SidenavItem[] } = {
//     'json': [
//         { route: ['./json', 'base-json'], text: 'base-json', selector: 'base-json'},
//         { route: ['./json', 'json'], text: 'json', selector: 'json' },
//         { route: ['./json', 'json-api'], text: 'json-api', selector: 'json-api'}
//     ],
//     'widgets': [
//         { route: ['./widgets', 'abstract-paged-table-with-toolbar'], text: 'AbstractPagedTableWithToolbar', selector: 'abstract-paged-table-with-toolbar'},
//         { route: ['./widgets', 'paged-table'], text: 'PagedTable', selector: 'paged-table' },
//         { route: ['./widgets', 'paged-table-with-toolbar'], text: 'PagedTableWithToolbar', selector: 'paged-table-with-toolbar' }
//     ]
// };

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

function createNestedSidenavItem(text: string, selector: string, children: SidenavItem[]): SidenavItem {
    return {
        text,
        selector,
        children
    };
}

function createSidenavItem(module: Module, url: string): SidenavItem {
    let route;
    let selector;
    let text;
    if (module.displayName !== url) {
        route = convertUrlToRoute(url);
        selector = route[route.length - 1];
        text = convertSelectorToText(selector)
    } else {
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
