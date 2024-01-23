import mongoose from "mongoose";

export default async function konekdb() {
  try {
    await mongoose.connect("mongodb+srv://Portosangam:<password>@portosangam.vohfq6k.mongodb.net/");
    console.log("konek");
  } catch (e) {
    console.log(e);
  }
}
