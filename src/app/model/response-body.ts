

export class ResponseBody {
    code?: string;
    success?: boolean;
    message?: string;
    values?: any;
    data?: any;

    constructor(values: object = {}) {
        this.code = "";
        this.success = false;
        this.data = [];
        this.message = "";
        this.values = [];
        Object.assign(this,values);
    }

}