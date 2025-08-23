import Combo from "../models/comboModel";
import { CreateComboPayload, GetComboPayload } from "../schemas/foodSchema/request";

export const foodRepo = {
  /**
   * Create a new combo
   */
  createCombo: async (params: {
    payload: CreateComboPayload;
    creator: string;
  }) => {
    const combo = await Combo.create({
      ...params.payload,
      creator: params.creator,
    });
    return combo;
  },

  /**
   * Get combos
   */

  getCombos: async (params: GetComboPayload) => {
    const query: any = {}
    const {name, price, search} = params
    if (name) query.name = name
    if (price) query.price = price
    if (search) {
    query.name = { $regex: search, $options: "i" }; // case-insensitive search
  }
    const combos = await Combo.find(query);
    return combos;
  },
};
