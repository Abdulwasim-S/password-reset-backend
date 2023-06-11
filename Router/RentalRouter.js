import express from "express";
import { rentalList } from "../Helper/mongooseValidator.js";


const router = express.Router();


// router.post("/rentalProducts", async (req, res) => {
//     try {
      
//       const newUser = await new rentalList({
//         id:req.body.id,
//         product: req.body.product,
//         price: req.body.price,
//         quantity: req.body.quantity,
//         fromDate:req.body.fromDate,
//         toDate:req.body.toDate,
//         fromTime:req.body.fromTime,
//         toTime:req.body.toTime,
//         buyerName:req.body.buyerName,
//         address:req.body.address,
//         mobile:req.body.mobile,
//         image:req.body.image
//       }).save();
//       res.status(200).json({ message: "Added new product", newUser });
//     } catch (error) {
//       console.log("Error in product----", error);
//     }
//   });

  router.delete("/rentalProducts", async (req, res) => {
    try {
      const user = await rentalList
        .deleteOne({ id: req.headers.id })
      if (user) {
        return res.status(200).json({ message: "Product deleted....." });
      }
      res.status(400).json({ message: "cant delete product", user });
    } catch (error) {
      console.log("Error in product----", error);
    }
  });
  router.get("/rentalProducts", async (req, res) => {
    try {
      const products = await rentalList
        .find();
      if (products) {
        return res.status(200).json({ data : products });
      }
      res.status(400).json({ message: "cant find product" });
    } catch (error) {
      console.log("Error in product----", error);
    }
  });
 const RentalProductRoute = router;
  export {RentalProductRoute};