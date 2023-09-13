export class Category {

    _id?: string;
    name?: string;
    title?: string;

    constructor(values: object = {})
    {
        Object.assign(this,values);
    }

}