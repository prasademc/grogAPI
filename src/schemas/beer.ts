import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

let BeerSchema = new Schema({
  name: { type: String, unique: true },
  style: { type: String, unique: true },
  alcoholContent: { type: String, unique: true },
  description: { type: String, unique: true },
}, { collection: "beer" });

const BeerModel = mongoose.model("beer", BeerSchema);

export { BeerModel };
