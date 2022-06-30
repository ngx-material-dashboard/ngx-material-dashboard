import * as path from 'path';
import { Module } from '../../../converters/typedoc-json/models/module.model';
import { ReplaceInFile } from '../../../files/replace-in-file';
import { MarkdownDirectoryParser } from './markdown-directory.parser';
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

const assetsDocsDir = path.join(
    baseDocsSrcDir,
    'assets',
    'docs'
)

export function updateMarkdownRoutes(modules: Module[]) {
    // initialize MarkdownDirectoryParser, read directories starting from baseDir
    // defined above, and get map of directories to their respective files
    const markdownDirectoryParser: MarkdownDirectoryParser = new MarkdownDirectoryParser();
    markdownDirectoryParser.readDirectoryRecursively(assetsDocsDir);

    // initialize UrlMarkdownFileMapGenerator and generate map of URLs to their
    // corresponding markdown files (with path from documentation assets directory)
    const urlMarkdownFileMapGenerator: UrlMarkdownFileMapGenerator =
        new UrlMarkdownFileMapGenerator(
            markdownDirectoryParser.directoriesFilesMap,
            modules
        );
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
    )
    const replaceInFile: ReplaceInFile = new ReplaceInFile(file);
    replaceInFile.replace(
        /const URL_DIRECTORY_MAP: UrlDirectoryMap = {.*};/g,
        `const URL_DIRECTORY_MAP: UrlDirectoryMap = ${JSON.stringify(urlMarkdownFileMapGenerator.urlFilesMap)};`
    );

    return urlMarkdownFileMapGenerator.urlFilesMap;
}
