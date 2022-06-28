import * as path from 'path';
import { ReplaceInFile } from '../../../files/replace-in-file';
import { SidenavItem } from '@ngx-material-dashboard/widgets';
import { Module } from '../../../converters/typedoc-json/models/module.model';
import {
    capitalizeFirstLetter,
    convertSelectorToText,
    convertUrlToRoute,
    filterModuleTypeUrls,
    moduleTypes
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

export function generateSidenavItems(modules: Module[], urls: string[]) {
    const sidenavItems: { [route: string]: SidenavItem[] } = {};
    modules.forEach((module: Module) => {
        sidenavItems[module.displayName] = [];

        const moduleUrls: string[] = urls.filter((it: string) => it.includes(module.displayName));        
        moduleTypes.forEach((moduleType: string) => {
            const children: SidenavItem[] = [];
            const moduleTypeUrls: string[] = moduleUrls.filter((it: string) => it.includes(moduleType));
            moduleTypeUrls.forEach((url: string) => {
                children.push(createSidenavItem(module, url));
            });

            if (children.length > 0) {
                const nestedSidenavItem: SidenavItem = createNestedSidenavItem(
                    capitalizeFirstLetter(moduleType),
                    moduleType,
                    children
                );

                sidenavItems[module.displayName].push(nestedSidenavItem);
            }
        });
        
        const nonModuleTypeUrls: string[] = filterModuleTypeUrls(moduleUrls, false, true);
        nonModuleTypeUrls.forEach((url: string) => {
            sidenavItems[module.displayName].push(createSidenavItem(module, url));
        });
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
