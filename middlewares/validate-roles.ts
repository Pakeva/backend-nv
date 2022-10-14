import {Next, TypesRequest, UserProps} from "../interfaces";

const isAdminRol = async (req: TypesRequest<UserProps>, res: Response, next: Next) => {
    //TODO

    next();
}

const hasRol = async (req: TypesRequest<any>, res: Response, next: Next) => {
    //TODO

    next();
}

export {
    isAdminRol,
    hasRol
}