"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var RoleSchema = new mongoose_1.Schema({
    rol: {
        type: String,
        required: [true, 'El rol es requerido']
    }
});
exports["default"] = (0, mongoose_1.model)('Role', RoleSchema);
