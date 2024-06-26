import mongoose, { connection } from "mongoose";


export async function connectDB() {
    try {
        mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected');
        })
        connection.on('error', (err) => {
            console.log('MnogoDB connection error' + err);
            process.exit()
        })

    } catch (error) {
        console.log('Something went wrong in connectin to DB :'+error );
    }
}



// error
