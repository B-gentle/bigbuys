import Combo from "../models/comboModel";
import {
  CreateComboPayload,
  GetComboPayload,
} from "../schemas/foodSchema/request";

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
    return combo.toObject();
  },

  /**
   * Get combos
   */

  getCombos: async (params: GetComboPayload) => {
    const query: any = {};
    const { skip = 0, limit = 10, sortBy, name, price, search } = params;
    if (name) query.name = name;
    if (price) query.price = price;
    if (search) {
      query.name = { $regex: search, $options: "i" }; // case-insensitive search
    }
    const combos = await Combo.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: sortBy === "asc" ? 1 : -1 })
      .lean();

    const total = await Combo.countDocuments(query);
    const page = Math.floor(skip / limit) + 1;
    return { total, page, limit, pages: Math.ceil(total / limit), combos };
  },

  /**
   * Get a combo by ID
   */
  getComboById: async (id: string) => {
    const combo = await Combo.findById(id).lean();
    return combo;
  },

  /**
   * Update a combo
   */
  updateCombo: async (id: string, payload: Partial<CreateComboPayload>) => {
    const combo = await Combo.findByIdAndUpdate(id, payload, { new: true }).lean();
    return combo;
  },
};
