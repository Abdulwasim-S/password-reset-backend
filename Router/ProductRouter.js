import express from "express";
import { productList } from "../Helper/mongooseValidator.js";

const router = express.Router();
//CRUD for products....

router.post("/products", async (req, res) => {
    try {
      //checking the user is present or not....
      const user = await productList
        .findOne({ product: req.body.product })
        .catch((error) => console.log("Error---", error));
      if (user) {
        return res.status(400).json({ message: "Product already exist...." });
      }
      //Adding new user....
      const newUser = await new productList({
        product: req.body.product,
        price: req.body.price,
        quantity: req.body.quantity,
        id: req.body.id,
        image:req.body.image
      }).save();
      res.status(200).json({ message: "Added new product", newUser });
    } catch (error) {
      console.log("Error in product----", error);
    }
  });
  router.put("/products", async (req, res) => {
    try {
      //checking the user is present or not....
      console.log(req)
      const user = await productList
        .updateOne(
          { id: req.headers.id},
          {
            $set: {
              product: req.body.product,
              price: req.body.price,
              quantity: req.body.quantity,
            },
          }
        )
        .catch((error) => console.log("Error---", error));
      if (user) {
        return res.status(200).json({ message: "Product updated....." });
      }
      res.status(400).json({ message: "cant eidtied new product", user });
    } catch (error) {
      console.log("Error in product----", error);
    }
  });
  router.delete("/products", async (req, res) => {
    try {
      const user = await productList
        .deleteOne({ id: req.headers.id })
      if (user) {
        return res.status(200).json({ message: "Product deleted....." });
      }
      res.status(400).json({ message: "cant delete product", user });
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