"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.createUser = void 0;
const createUser = (req, res) => {
    console.log(req);
    const { zip } = req.body;
    console.log({ zip });
    //TODO VALIDATIONS TO DE DB, CREATE THE USER ETC
    res.status(200).json({
        msg: 'Success nopu'
    });
};
exports.createUser = createUser;
const getUsers = (req, res) => {
    res.status(200).json({
        msg: 'Success'
    });
};
exports.getUsers = getUsers;
