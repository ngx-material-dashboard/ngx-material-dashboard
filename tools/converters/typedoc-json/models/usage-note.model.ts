export const USAGE_TYPES: string[] = ['html', 'typescript'];

export class UsageNote {
    header?: string;
    text: string[];
    types?: { [type: string]: string[] };

    constructor(text: string[]) {
        this.text = text;
        if (this.text[0].includes('## ')) {
            this.header = this.text[0];
            this.text = this.text.slice(1);
        }
        USAGE_TYPES.forEach((type: string) => {
            const typeStrings = this.getType(type);
            if (typeStrings.length > 0) {
                if (!this.types) {
                    this.types = {};
                }

                this.types[type] = typeStrings;
            }
        });
    }

    private getType(type: string): string[] {
        const typeStrings: string[] = [];
        const start = this.text.findIndex(
            (it: string) => it === `\`\`\`${type}`
        );
        if (start >= 0) {
            for (let i = start; i < this.text.length; i++) {
                typeStrings.push(this.text[i]);
                if (this.text[i] === '```') {
                    break;
                }
            }
        }
        return typeStrings;
    }
}
