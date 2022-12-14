import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 4100;
let db = '';

if(process.env.NODE_ENV === 'development'){
    console.log('db qa');
    db = 'mongodb+srv://root:cKpK6NXC5rr6iy52@pakevadb.qgb7mnu.mongodb.net/test';
} else {
    console.log('db prod');
    db = 'mongodb+srv://root:cKpK6NXC5rr6iy52@pakevaprod.oseolpp.mongodb.net/?retryWrites=true&w=majority'
}

export {
    port,
    db
}
