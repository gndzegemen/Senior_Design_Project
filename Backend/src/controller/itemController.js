import Item from "../models/itemModel.js";

export const fetchItems = async (req, res) => {
  try {
    const items = await Item.find();

    if (!items) {
      return res.status(404).json({ message: "No items found" });
    }

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchItem = async (req, res) => {
  try {
    const id = req.params.id;
    const i = await Item.findOne({ idd: id});

    if (!i) {
      return res.status(404).json({ message: "No item found with given id" });
    }

    res.status(200).json(i);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
