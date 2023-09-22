const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  category: {
    type: String,
    enum: [
      "Storytelling",
      "Cinematography",
      "Production Value",
      "Performance",
      "Music"
    ],
    required: true
  },
  score: { type: Number, required: true }
});
