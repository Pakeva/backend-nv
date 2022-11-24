import * as mongoose from "mongoose";

const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};


const connectDb = async (db:string) => {
    console.log(process.env)
    try {
        await mongoose.connect(db , options);
        console.log('DB connected successfully')
    } catch (e) {
        console.log(e)
        console.log('cant connect with db')
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