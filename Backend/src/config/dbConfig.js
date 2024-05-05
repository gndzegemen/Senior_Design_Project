import mongoose from "mongoose";

mongoose.set("strictQuery", false);
 const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongodb connected");
  } catch (error) {
    console.log(error, "no connect");
  }
};
export { connectDb };
