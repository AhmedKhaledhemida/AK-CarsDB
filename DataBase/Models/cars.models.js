import { model, Schema, Types } from "mongoose";

const schema = new Schema({
  name: String,
  model: String,
  price: Number,
  Horsepower: String,
  image: String,
  brand: {
    type: Types.ObjectId,
    ref: "Brand",
  },

  soldTo: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
  soldNumber: Number,
});

schema.post("init", function (docs) {
  if (docs.image) docs.image = process.env.BASE_URL + "cars/" + docs.image;
});

export const Cars = model("Cars", schema);
