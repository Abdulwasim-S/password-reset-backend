import express from "express";
import { productList } from "../Helper/mongooseValidator.js";

const router = express.Router();


router.post("/products", async (req, res) => {
    try {
      
      const product = await productList
        .findOne({ product: req.body.product })
        .catch((error) => console.log("Error---", error));
      if (product) {
        return res.status(400).json({ message: "Product already exist...." });
      }
      
      const newProduct = await new productList({
        product: req.body.product,
        price: req.body.price,
        quantity: req.body.quantity,
        id: req.body.id,
        image:req.body.image
      }).save();
      res.status(200).json({ message: "Added new product", newProduct});
    } catch (error) {
      console.log("Error in product----", error);
    }
  });
  router.put("/products", async (req, res) => {
    try {
      
      console.log(req)
      const product = await productList
        .updateOne(
          { _id: req.headers.id},
          {
            $set: {
              product: req.body.product,
              price: req.body.price,
              quantity: req.body.quantity,
            },
          }
        )
        .catch((error) => console.log("Error---", error));
      if (product) {
        return res.status(200).json({ message: "Product updated.....",product});
      }
      res.status(400).json({ message: "cant eidtied new product" });
    } catch (error) {
      console.log("Error in product----", error);
    }
  });
  router.delete("/products", async (req, res) => {
    try {
      const product = await productList
        .deleteOne({ _id: req.headers.id })
      if (product) {
        return res.status(200).json({ message: "Product deleted....." });
      }
      res.status(400).json({ message: "cant delete product", product });
    } catch (error) {
      console.log("Error in product----", error);
    }
  });
  router.get("/products", async (req, res) => {
    try {
      const products = await productList
        .find();
      if (products) {
        return res.status(200).json({ data : products });
      }
      res.status(400).json({ message: "cant find product" });
    } catch (error) {
      console.log("Error in product----", error);
    }
  });
 const ProductRoute = router;
  export {ProductRoute};