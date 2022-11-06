export class Source {
    character!: number;
    fileName!: string;
    line!: number;
    path: string;

    constructor(data: Partial<Source>) {
        Object.assign(this, data);
        this.path = this.fileName.substring(0, this.fileName.lastIndexOf('/') + 1);
    }
}
