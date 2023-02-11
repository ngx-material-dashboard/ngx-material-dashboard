import * as path from 'path';

import { ProjectParser } from '../../parsers/typedoc-json/parsers/project';
import { reformatText } from './helpers';
import { FileUtil } from '../../util/file.util';
import { Parser } from '../../parsers/typedoc-json/parsers/parser';

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
 * Generates an object that can be inserted into an angular routing module as
 * routes.
 */
export class RouteGenerator {
    homeRoute: any;
    projects: ProjectParser[];
    urls: string[];
    workspaceRoute: any;

    constructor(projects: ProjectParser[], urls: string[]) {
        this.projects = projects;
        this.urls = urls;
    }

    generateRoutes() {
        // generate routes for all projects in workspace
        const workspaceRoutes = this.generateWorkspaceRoutes();

        // handle special case for json-overview since this is a standalone
        // overview markdown file that is for all JSON libraries
        workspaceRoutes.push(this.createBasicRoute('json-overview'));
        workspaceRoutes.push(this.createBasicRoute('overview'));

        // keeping these separate makes easier to stringify
        this.homeRoute = this.createLazyLoadedRoute(
            '',
            './routed-modules/home/home.module',
            'HomeModule'
        );
        this.workspaceRoute = this.createRouteWithChildrenAndComponent(
            '',
            workspaceRoutes,
            'LayoutComponent'
        );
    }

    private generateWorkspaceRoutes(): any[] {
        const routes: any[] = [];
        this.projects.forEach((p: ProjectParser) => {
            routes.push(this.generateProjectRoutes(p));
        });
        return routes;
    }

    private generateProjectRoutes(p: ProjectParser): any[] {
        const routes: any[] = [];

        if (p.modules && p.name === 'testing') {
            // handle testing lib different from rest...
            const defaultRoutes = this.createRoutesFromUrls(
                ['overview', 'api', 'examples'],
                'overview'
            );
            routes.push(
                this.createRouteWithChildrenAndComponent(
                    'elements',
                    defaultRoutes
                )
            );
            routes.push(this.createBasicRoute('models'));
        } else {
            // add routes for each of modules defined in project
            p.modules?.forEach((m) => {
                routes.push(this.generateModuleRoutes(p, m));
            });
        }

        // add a basic route for the project
        routes.push(this.createBasicRoute(''));

        return this.createRouteWithChildren(p.name, routes);
    }

    private generateModuleRoutes(p: ProjectParser, parser: Parser): any {
        let defaultRoutes: any;
        if (['base-json', 'json', 'json-api'].includes(p.name)) {
            defaultRoutes = this.createRoutesFromUrls(
                ['readme', 'overview', 'api', 'examples'],
                'readme'
            );
        } else {
            defaultRoutes = this.createRoutesFromUrls(
                ['overview', 'api', 'examples'],
                'overview'
            );
        }

        // add the module routes to the project routes
        const displayName = reformatText(parser.name);
        if (displayName !== p.name) {
            // if module is different, then add name of module to route
            return this.createRouteWithChildrenAndComponent(
                displayName,
                defaultRoutes
            );
        } else {
            // otherwise add default routes to project routes with empty path
            // so we don't end up with duplicate text in url i.e. "/json/json/.."
            return this.createRouteWithChildrenAndComponent('', defaultRoutes);
        }
    }

    /**
     * A basic route to the TabbedDocumentTabComponent for the given path. This
     * is the most basic route that is being used in the documentation app.
     *
     * @param path The path for the route.
     * @returns A route to the TabbedDocumentTabComponent for the given path.
     */
    private createBasicRoute(path: string): any {
        if (path === '') {
            return {
                path,
                pathMatch: 'full',
                component: 'TabbedDocumentTabComponent'
            };
        } else {
            return {
                path,
                component: 'TabbedDocumentTabComponent'
            };
        }
    }

    /**
     * Create a lazy loaded route at the given path to the given module name.
     * If the path is '' and pathMatchFull is true (which it defaults to), then
     * "pathMatch: 'full'" is included. Kept as an option if for some reason we
     * would want to create without pathMatch.
     *
     * @param path The path for the route.
     * @param pathToModule String path to module (from root of app).
     * @param moduleName String representation of module name.
     * @param pathMatchFull Optional boolean to indicate if pathMatch full should be added.
     * @route A lazy loaded route.
     */
    private createLazyLoadedRoute(
        path: string,
        pathToModule: string,
        moduleName: string,
        pathMatchFull: boolean = true
    ): any {
        if (path === '' && pathMatchFull) {
            return {
                path,
                pathMatch: 'full',
                loadChildren: `() => import('${pathToModule}').then((m) => m.${moduleName})`
            };
        } else {
            return {
                path,
                loadChildren: `() => import('${pathToModule}').then((m) => m.${moduleName})`
            };
        }
    }

    /**
     * Creates and returns a route to redirect to the given path when no path is
     * provided (i.e. path === '').
     *
     * @param path The path to redirecto to.
     * @returns A route to redirect to given path when no path is provided.
     */
    private createRedirectRoute(path: string): any {
        return {
            path: '',
            pathMatch: 'full',
            redirectTo: path
        };
    }

    private createRoutesFromUrls(urls: string[], redirectRoute?: string) {
        const routes: any[] = [];
        urls.forEach((url: string) => {
            routes.push(this.createBasicRoute(url));
        });

        if (redirectRoute) {
            routes.push(this.createRedirectRoute(redirectRoute));
        }

        return routes;
    }

    /**
     * A route with children (that does not include a component with router outlet).
     *
     * @param path The path for the route.
     * @param children The children routes.
     * @returns A route with children.
     */
    private createRouteWithChildren(path: string, children: any[]): any {
        return {
            path,
            children
        };
    }

    /**
     * A route with children and a component (that should include a router outlet).
     *
     * @param path The path for the route.
     * @param children The children routes.
     * @param component The component to render at the base of the route.
     * @returns A route with children and a component.
     */
    private createRouteWithChildrenAndComponent(
        path: string,
        children: any[],
        component: string = 'TabbedDocumentComponent'
    ): any {
        return {
            path,
            component,
            children
        };
    }

    /**
     * Updates the app routing with the routes generated from this generator.
     * The generateRoutes method should have been called before this is.
     * TODO throw error if routes are not defined?
     */
    public updateRouting() {
        const homeRoute = JSON.stringify(this.homeRoute);
        const workspaceRoute = JSON.stringify(this.workspaceRoute);
        // remove quotes around component names so angular Route object is
        // formatted
        let string = `${homeRoute}, ${workspaceRoute}`;
        string = this.removeDoubleQuotes(string, 'component');
        string = this.removeDoubleQuotes(string, 'children');
        string = this.removeDoubleQuotes(string, 'loadChildren');
        string = this.removeDoubleQuotes(string, 'path');
        string = this.removeDoubleQuotes(string, 'pathMatch');
        string = this.removeDoubleQuotes(string, 'LayoutComponent');
        string = this.removeDoubleQuotes(string, 'TabbedDocumentComponent');
        string = this.removeDoubleQuotes(string, 'TabbedDocumentTabComponent');
        string = this.removeDoubleQuotes(
            string,
            "() => import('./routed-modules/home/home.module').then((m) => m.HomeModule)"
        );
        string = string.replaceAll('"', "'");

        const file = path.join(baseDocsSrcDir, 'app', 'app-routing.module.ts');
        FileUtil.replaceInFile(
            file,
            /(?<=const routes: Routes = \[)([\s\S]*)(?=];)/g,
            string
        );
    }

    private removeDoubleQuotes(heystack: string, needle: string) {
        return heystack.replaceAll(`"${needle}"`, needle);
    }
}
