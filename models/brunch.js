var mongoose = require("mongoose");

// MONGOOSE/MODEL CONFIG
var brunchSchema = mongoose.Schema({
    name: String,
    image: String,
    url: String,
    mapurl: String,
    //  location: "NE",
    about: String,
    cost: String,
    wait: String,
    coffee: String,
    author: {
      id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      },
      username: String
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
    ]
    //  thought: "We like it!",
    //  created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Brunch", brunchSchema);
