import { ContentSource } from "./source-content";

export class SourceContentResponseBody {
    success?: boolean;
    message?: string;
    data?: ContentSource;

    constructor(values: object = {}) {
        this.success = false;
        Object.assign(this,values);
    }
}