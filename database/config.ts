import * as mongoose from "mongoose";

const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

const dbCred = 'mongodb+srv://root:cKpK6NXC5rr6iy52@pakevadb.qgb7mnu.mongodb.net/test'

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_BD || dbCred , options);
        console.log('DB connected successfully')
    } catch (e) {
        throw new Error("Can't connect with de DB")
    }
}

const disconnectDb = async () => {
    try {
        await mongoose.disconnect();
        console.log('DB disconnected successfully')
    } catch (e) {
        throw new Error("Can't disconnect with de DB")
    }
}



export {
    connectDb,
    disconnectDb
}