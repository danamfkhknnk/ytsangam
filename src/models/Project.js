import mongoose from "mongoose";

const HomeSchema = new mongoose.Schema(
  {
    name: String,
    website: String,
    technologies: String,
    github: String,
  },
  { timestamps: true }
);

const Home = mongoose.models.Home || mongoose.model("Home", HomeSchema);

export default Home;
