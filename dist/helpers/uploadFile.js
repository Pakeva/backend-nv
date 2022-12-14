"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const uploadFile = (files) => {
    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const cutName = archivo.name.split('.');
        const extension = cutName[cutName.length - 1];
        const validExtensions = ['png', 'jpeg', 'jpg'];
        if (!validExtensions.includes(extension)) {
            reject('El formato no es valido');
        }
        const uploadPath = __dirname + '/uploads' + archivo.name;
        archivo.mv(uploadPath, (err) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve(uploadPath);
        });
    });
};
exports.uploadFile = uploadFile;
