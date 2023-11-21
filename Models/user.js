const mongoose = require("mongoose"); //mongoose 패키지를 불러옴

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must type name"], //필수
    unique: true, //고유
  },
  token: {
    type: String,
  },
}); //저장할 스키마 정의

module.exports = mongoose.model("User", userSchema);
