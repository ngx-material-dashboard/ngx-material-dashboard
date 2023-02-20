import { Parser } from '../../../parsers/typedoc-json';

export interface MarkdownConfig {
    modelType: any;
    parsers: Parser[];
    subDirectory?: string;
    symbol: string;
    template: any;
}
