import { model, Schema } from "mongoose";

const schema = Schema({
  name: String,
  image: String,
});

schema.post("init", function (doc) {
  if (doc.image) doc.image = process.env.BASE_URL + "brands/" + doc.image;
});

export const Brand = model("Brand", schema);
