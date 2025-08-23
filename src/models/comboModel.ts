import mongoose, { Schema } from "mongoose";
import { required } from "zod/mini";

const comboSchema = new Schema(
  {
    name: { type: String, required: true },
    // items: [{ type: Schema.Types.ObjectId, ref: "FoodItem", required: true }],
    price: { type: Number, required: true },
    image: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    available: {type: Boolean, default: true, required: true}
  },
  {
    timestamps: true,
  }
);

const Combo = mongoose.model("Combo", comboSchema);

export default Combo;
