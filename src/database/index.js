import mongoose from "mongoose";

export default async function connectToDB() {
  try {
    await mongoose.connect("mongodb+srv://Dana:portosangam@cluster0.trx63pj.mongodb.net/PKL?retryWrites=true&w=majority");
    console.log("konek");
  } catch (e) {
    console.log(e);
  }
}
