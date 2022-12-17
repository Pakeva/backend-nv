"use strict";
exports.__esModule = true;
exports.getShipping = void 0;
var getShipping = function (req, res) {
    console.log(req.user);
    return res.status(200).json({
        msg: 'hello world'
    });
};
exports.getShipping = getShipping;
