export class Source {
    character!: number;
    fileName!: string;
    line!: number;

    constructor(data: Partial<Source>) {
        Object.assign(this, data);
    }
}
