export const moduleTypes: string[] = [
    'components',
    'converters',
    'decorators',
    'elements',
    'enums',
    'directives',
    'interfaces',
    'models',
    //'modules',
    'pages',
    'services'
];

/**
 * These are specific types of classes that should be grouped together under
 * a common URL. TODO update wording of moduleTypes to use this `clazz specific`
 * type wording because this is confusing.
 */
export const CLAZZ_SPECIFIC_TYPES: string[] = [
    'component',
    'converter',
    'directive',
    'decorator',
    'element',
    'enum',
    'interface',
    'model',
    'module',
    'page',
    'service'
];

export const MODULE_TYPE_DIRECTORY_MAP: { [moduleType: string]: string } = {
    Component: 'components',
    Converter: 'converters',
    Directive: 'directives',
    '.decorator.': 'decorators',
    '.element.': 'elements',
    '.enum.': 'enums',
    interface: 'interfaces',
    '.model.': 'models',
    Module: 'modules',
    '.page.': 'pages',
    '.service.': 'services'
};

export function convertUrlToRoute(url: string) {
    const route = url.split('/');
    route[0] = `./${route[0]}`;
    return route.filter((it: string) => it !== 'api' && it !== 'overview');
}

export function convertSelectorToText(selector: string) {
    let text = '';
    const vals = selector.split('-');
    vals.forEach((val: string) => {
        text += capitalizeFirstLetter(val);
    });
    return text;
}

export function capitalizeFirstLetter(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export function filterModuleTypeUrls(
    moduleName: string,
    moduleUrls: string[],
    includes: boolean,
    notIncludes: boolean
) {
    return moduleUrls.filter((it: string) => {
        for (const moduleType of moduleTypes) {
            if (it.includes(`/${moduleName}/${moduleType}/`)) {
                return includes;
            }
        }
        return notIncludes;
    });
}

export function removeSymbol(text: string): string {
    return text
        .replace(' ', '')
        .replace('Component', '')
        .replace('Directive', '')
        .replace('Element', '')
        .replace('Module', '')
        .replace('Service', '');
}

export function reformatText(text: string): string {
    let reformattedText = '';
    text = removeSymbol(text);
    if (text !== 'Dialog') {
        // only remove Dialog if it is part of text (not all of it); we have
        // DialogModule which should render as "Dialog", but also components
        // with Dialog at end which can be removed
        text = text.replace('Dialog', '');
    }
    if (text === text.toUpperCase()) {
        // if text is all uppercase then it should be a constant, so make all
        // lowercase and replace any "_" with "-" since it should be SNAKE_CASE
        reformattedText = text.toLowerCase();
        reformattedText = reformattedText.replaceAll('_', '-');
    } else {
        // reformat camelCase text to lowercase with hyphens
        for (let i = 0; i < text.length; i++) {
            const character = text.charAt(i);
            if (character === character.toUpperCase()) {
                if (i > 0) {
                    reformattedText += '-';
                }
                reformattedText += character.toLowerCase();
            } else {
                reformattedText += character;
            }
        }
    }

    return reformattedText;
}
