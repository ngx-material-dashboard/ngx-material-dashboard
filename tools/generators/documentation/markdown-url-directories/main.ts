import * as path from 'path';
import { Module } from '../../../converters/typedoc-json/models/module.model';
import { FileUtil } from '../../../util/file.util';
import { UrlMarkdownFileMapGenerator } from './url-markdown-file-map.generator';

// define base directory from where to start scanning for documentation
// directory structure and markdown files relative to directory where
// this file is located
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

export function updateMarkdownRoutes(modules: Module[]) {
    // initialize UrlMarkdownFileMapGenerator and generate map of URLs to their
    // corresponding markdown files (with path from documentation assets directory)
    const urlMarkdownFileMapGenerator: UrlMarkdownFileMapGenerator =
        new UrlMarkdownFileMapGenerator(modules);
    urlMarkdownFileMapGenerator.generateUrlFilesMap();

    // initialize UrlDirectoryMapWriter and update component where URL files map
    // needs to be written to (directly in file)
    const file = path.join(
        baseDocsSrcDir,
        'app',
        'widgets',
        'tabbed-document',
        'tabbed-document-tab',
        'tabbed-document-tab.component.ts'
    );

    // stringify the URL files map and remove the enclosing brackets since
    // below regex matches characters between the brackets (so only those
    // characters are replaced in the file; otherwise we end up with {{}}
    // as structure of JSON and that doesn't work so well)
    let urlFilesMap = JSON.stringify(
        urlMarkdownFileMapGenerator.urlFilesMap
    ).replace('{', '');
    urlFilesMap = urlFilesMap.substring(0, urlFilesMap.lastIndexOf('}'));
    FileUtil.replaceInFile(
        file,
        /(?<=const URL_DIRECTORY_MAP: UrlDirectoryMap = {)([\s\S][^};]*)(?=};)/g,
        urlFilesMap
    );

    return urlMarkdownFileMapGenerator.urlFilesMap;
}
