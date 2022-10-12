"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.createUser = void 0;
// cntr snippet
const createUser = (req, res) => {
    res.status(200).json({
        msg: 'Success'
    });
};
exports.createUser = createUser;
const getUsers = (req, res) => {
    res.status(200).json({
        msg: 'Success'
    });
};
exports.getUsers = getUsers;
