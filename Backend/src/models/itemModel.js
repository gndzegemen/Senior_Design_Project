import  mongoose  from "mongoose";

const ItemSchema = new mongoose.Schema({
  idd: { type: Number, required: true, unique: true },
  img: { type: String, required: true },
  img2: { type: String, required: false, default: "" },
  title: { type: String, required: true },
  isNeww: { type: Boolean, default: false },
  oldPrice: { type: Number, default: 50 },
  price: { type: Number, required: true },
  registerUrl: {type: String, required: false, default: "https://www.google.com/"},
  loginUrl: {type: String, required: false, default: "https://www.google.com/"}
});

const Item = mongoose.model("item", ItemSchema);

export default Item;
