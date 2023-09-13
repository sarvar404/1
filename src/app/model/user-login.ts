export class UserLogin {
    username?: string;
    password?: string;

    constructor(values: object = {})
    {
        Object.assign(this,values);
    }
}