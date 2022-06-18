import { TypedocBase } from './typedoc-base.model';

export class Property extends TypedocBase {

    defaultValue?: string;
    override kindString: string = 'Property';
}
