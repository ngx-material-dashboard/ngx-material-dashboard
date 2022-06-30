export const moduleTypes: string[] = [
    'components',
    'decorators',
    'directives',
    'interfaces',
    'models',
    'modules',
    'services'
]

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

export function filterModuleTypeUrls(moduleName: string, moduleUrls: string[], includes: boolean, notIncludes: boolean) {
    return moduleUrls.filter((it: string) => {
        for(const moduleType of moduleTypes) {
            if (it.includes(`/${moduleName}/${moduleType}/`)) {
                return includes;
            }
        }
        return notIncludes;
    });
}

export function reformatText(text: string): string {
    let reformattedText = '';
    text = text.replace(' ', '').replace('Component', '').replace('Module', '').replace('Service', '');
    for(let i = 0; i < text.length; i++) {
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

    return reformattedText;
}
