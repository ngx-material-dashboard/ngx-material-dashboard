import * as path from 'path';

import { ModuleParser, Parser } from '../../parsers/typedoc-json';
import { ProjectParser } from '../../parsers/typedoc-json/parsers/project';
import { reformatText } from './helpers';
import { FileUtil } from '../../util/file.util';

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
 * The `RouteGenerator` creates a string representation of routes for the
 * documentation app based on each project defined in workspace that can be
 * added to app routing module. This must be a string in order to utilize
 * string replace in file. As such, writing this was a pain in the ass, and this
 * is my third iteration of this code. It has come a long way since the initial
 * version, and might finally be to a point that someone can actually follow
 * along with what the code is doing. There is probably still more that can be
 * done to clean up code and make it even easier to follow... Should probably
 * look at building the routes as an object and then converting to a literal
 * string representation that can be inserted directly into an app routing file
 * which is probably what I should have done to begin with, instead of building
 * string from scratch...
 */
export class RouteGenerator {
    homeRoute: string;
    projects: ProjectParser[];
    routes: string;
    urls: string[];

    constructor(projects: ProjectParser[], urls: string[]) {
        this.projects = projects;
        this.routes = '[]'; // default to empty array
        this.urls = urls;
        this.homeRoute = `${this.createLazyLoadedRoute(
            '',
            './routed-modules/home/home.module',
            'HomeModule'
        )}`;
    }

    /**
     * Generates the routes for the documentation for each project. The end
     * result is a string value that can be inserted into app routing module,
     * to update routes for documentation app.
     */
    generateRoutes() {
        // generate routes for all projects in workspace
        let workspaceRoutes = this.generateWorkspaceRoutes();

        // add a comma if routes exist (which they should) to separate existing
        // routes from additional ones added below
        if (workspaceRoutes != '[') {
            workspaceRoutes += ',';
        }

        // handle special case for json-overview since this is a standalone
        // overview markdown file that is for all JSON libraries
        workspaceRoutes += `${this.createBasicRoute('json-overview')}`;
        workspaceRoutes += `, ${this.createBasicRoute('overview')}]`;

        // add all routes to the main layout
        this.routes = this.createRouteWithChildrenAndComponent(
            '',
            workspaceRoutes,
            'LayoutComponent'
        );
    }

    /**
     * Generates a string representation of routes for all projects in
     * workspace to be inserted as children using string replace in routing
     * module.
     *
     * @returns A string array value of routes for all projects.
     */
    private generateWorkspaceRoutes() {
        let workspaceRoutes = '[';
        let projectIndex = 0;
        this.projects.forEach((p: ProjectParser) => {
            // generate project routes
            const projectRoutes = this.generateProjectRoutes(p);
            // add project routes to array of routes for all all projects
            const res = this.addChildrenToRoutes(
                projectRoutes,
                p.name,
                projectIndex,
                workspaceRoutes,
                this.createRouteWithChildren
            );
            workspaceRoutes = res.routeChildren;
            projectIndex = res.index;
        });

        return workspaceRoutes;
    }

    /**
     * Generates a string representation of routes for a project to be inserted
     * as children using string replace in routing module.
     *
     * @param p Modules to generate routes for.
     * @returns String array value of a single project's routes.
     */
    private generateProjectRoutes(p: ProjectParser) {
        let projectRoutes = '[';
        let moduleIndex = 0;

        if (p.modules && p.name === 'testing') {
            projectRoutes = this.generateTestingRoutes(
                p,
                p.modules[0],
                projectRoutes,
                moduleIndex++
            );
        } else {
            p.modules?.forEach((m: Parser) => {
                // generate module routes and add them to project routes
                projectRoutes = this.generateModuleRoutes(
                    p,
                    m,
                    moduleIndex++,
                    projectRoutes
                );
            });
        }

        // close out project routes if needed
        if (!projectRoutes.endsWith(']')) {
            projectRoutes += ']';
        }
        return projectRoutes;
    }

    private generateTestingRoutes(
        project: ProjectParser,
        m: ModuleParser,
        projectRoutes: string,
        moduleIndex: number
    ) {
        let index = 0;
        const routes = '[';
        projectRoutes = this.generateNestedRoutes(
            project,
            index++,
            m.elements,
            'elements',
            routes
        );

        // close out project routes if needed
        if (!projectRoutes.endsWith(']')) {
            projectRoutes += ']';
        }
        return projectRoutes;
    }

    private generateNestedRoutes(
        project: ProjectParser,
        moduleIndex: number,
        parsers: Parser[],
        symbolType: string,
        routes: string
    ) {
        let index = 0;
        let pRoutes = '[';
        parsers.forEach((p: Parser) => {
            // generate routes for parser
            const parserRoutes = this.generateModuleRoutes(
                project,
                p,
                index++,
                ''
            );
            pRoutes += parserRoutes;
        });

        if (!pRoutes.endsWith(']')) {
            pRoutes += ']';
        }

        // add parser routes to array of routes for all parsers
        const res = this.addChildrenToRoutes(
            pRoutes,
            symbolType,
            moduleIndex,
            routes,
            this.createRouteWithChildren
        );
        routes = res.routeChildren;
        moduleIndex = res.index;

        // close out project routes if needed
        if (!routes.endsWith(']')) {
            routes += ']';
        }
        return routes;
    }

    private generateModuleRoutes(
        p: ProjectParser,
        parser: Parser,
        moduleIndex: number,
        projectRoutes: string
    ) {
        // generate default routes for module (i.e. overview, api, and index)
        const defaultRoutes = this.generateChildrenRoutes([
            'overview',
            'api',
            ''
        ]);

        // add the module routes to the project routes
        const displayName = reformatText(parser.name);
        if (displayName !== p.name) {
            // if module is different, then add name of module to route
            const res = this.addChildrenToRoutes(
                defaultRoutes,
                displayName,
                moduleIndex,
                projectRoutes,
                this.createRouteWithChildrenAndComponent
            );
            projectRoutes = res.routeChildren;
        } else {
            // otherwise add default routes directly to project routes
            // since as of now these are projects with single module
            // that matches project name; it's possible that we would
            // want to add a module that matches the name of the project
            // along with other modules... this would not work then...
            projectRoutes = defaultRoutes;
        }

        return projectRoutes;
    }

    /**
     * Adds an array of child routes to an existing set of routes, if there are
     * children routes defined (i.e. if children !== '[]').
     *
     * @param children
     * @param routes
     * @param routeName
     * @param index
     * @param routeChildren
     * @param callback
     * @returns
     */
    private addChildrenToRoutes(
        children: string,
        routeName: string,
        index: number,
        routeChildren: string,
        callback: (route: string, children: string) => string
    ) {
        let routes = '';
        if (children !== '[]') {
            const route = callback(routeName, children);
            routes += route;

            if (index > 0) {
                routeChildren += ',';
            }
            routeChildren += routes;
            index++;
        }

        return { routeChildren, index };
    }

    /**
     * Generates string value that can be inserted as a children array in
     * Angular route using string replace. The resulting value will be
     * inserted into a route module file using string replace, so this must be
     * formatted properly as a string value because converting an actual array
     * of objects into a string doesn't seem to work properly (although it
     * would make it a hell of a lot easier if I could just build the array
     * instead of having to write it out as as string...).
     *
     * @param urls An array of URLs that should include URLs associated with name.
     * @returns A string value of children routes.
     */
    private generateChildrenRoutes(
        urls: string[],
        redirectRoute?: string
    ): string {
        let children: string = '[';
        urls.forEach((url: string, i: number) => {
            children += this.createBasicRoute(url);
            if (i + 1 < urls.length) {
                children += ',';
            }
        });

        // add a redirect route if requested AND children defined
        if (redirectRoute && children != '[') {
            children += `,${this.createRedirectRoute(redirectRoute)}`;
        }

        // close out the children array
        children += ']';
        return children;
    }

    /**
     * A route with children (that does not include a component with router outlet).
     *
     * @param path The path for the route.
     * @param children The children routes.
     * @returns A route with children.
     */
    private createRouteWithChildren(path: string, children: string) {
        return `{ path: '${path}', children: ${children}}`;
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
        children: string,
        component: string = 'TabbedDocumentComponent'
    ) {
        return `{ path: '${path}', component: ${component}, children: ${children}}`;
    }

    /**
     * A basic route to the TabbedDocumentTabComponent for the given path. This
     * is the most basic route that is being used in the documentation app.
     *
     * @param path The path for the route.
     * @returns A route to the TabbedDocumentTabComponent for the given path.
     */
    private createBasicRoute(path: string) {
        if (path === '') {
            return `{ path: '${path}', pathMatch: 'full', component: TabbedDocumentTabComponent }`;
        } else {
            return `{ path: '${path}', component: TabbedDocumentTabComponent }`;
        }
    }

    /**
     * Creates and returns a lazy loaded route. This will work for paths with values
     * or empty paths (i.e. path === '').
     *
     * @param path The path for the route.
     * @param importPath The path to the module to use in the import statement.
     * @param moduleName The name of the module to lazy load.
     * @returns A lazy loaded route.
     */
    private createLazyLoadedRoute(
        path: string,
        importPath: string,
        moduleName: string
    ) {
        if (path === '') {
            return `{ path: '${path}', pathMatch: 'full', loadChildren: () => import('${importPath}').then(m => m.${moduleName})}`;
        } else {
            return `{ path: '${path}', loadChildren: () => import('${importPath}').then(m => m.${moduleName})}`;
        }
    }

    /**
     * Creates and returns a route to redirect to the given path when no path is
     * provided (i.e. path === '').
     *
     * @param path The path to redirecto to.
     * @returns A route to redirect to given path when no path is provided.
     */
    private createRedirectRoute(path: string) {
        return `{ path: '', pathMatch: 'full', redirectTo: '${path}' }`;
    }

    /**
     * Updates the app routing with the routes generated from this generator.
     * The generateRoutes method should have been called before this is.
     * TODO throw error if routes are not defined?
     */
    public updateRouting() {
        const file = path.join(baseDocsSrcDir, 'app', 'app-routing.module.ts');
        FileUtil.replaceInFile(
            file,
            /(?<=const routes: Routes = \[)([\s\S]*)(?=];)/g,
            `${this.homeRoute}, ${this.routes}`
        );
    }
}
