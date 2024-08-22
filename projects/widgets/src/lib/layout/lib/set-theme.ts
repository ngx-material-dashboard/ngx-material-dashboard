/**
 * Shareable utility function for changing the theme on the given document and
 * updating the localStorage with the given theme.
 *
 * @param theme The name of the theme to set.
 * @param document The document to set the theme on.
 */
export function setTheme(theme: string, document: Document) {
    const bodyClassList = document.querySelector('body')?.classList;
    if (bodyClassList) {
        const removeClassList = /\w*-theme\b/.exec(bodyClassList.value);
        if (removeClassList) {
            bodyClassList.remove(...removeClassList);
        }
        bodyClassList.add(`${theme}-theme`);
        localStorage.setItem('theme', theme);
    }
}
