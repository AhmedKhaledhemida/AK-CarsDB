import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const schema = Schema({
  name: String,
  email: String,
  password: String,
  phone:Number,
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
});

schema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 8);
});

schema.pre("findOneAndUpdate", function () {
  if (this._update.password)
    this._update.password = bcrypt.hashSync(this._update.password, 8);
});
export const User = model("User", schema);
