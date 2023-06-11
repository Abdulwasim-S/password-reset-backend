import express from "express";
import { Users, logInUser, productList } from "../Helper/mongooseValidator.js";
import { passwordComparing, passwordHashing } from "../Helper/passwordHashing.js";
import { generateToken } from "../Helper/jwtToken.js";

const router = express.Router();

router.post("/signUp", async (req, res) => {
  try {
    //checking the admin is present or not....
    const user = await Users.findOne({ email: req.body.email }).catch((error) =>
      console.log("Error---", error)
    );
    if (user) {
      return res.status(400).json({ message: "Email already exist...." });
    }
    //Hashing the password with salt....
    const password = await passwordHashing(req.body.password)
    //Adding new admin....
    const newUser = await new Users({
      name: req.body.name,
      email: req.body.email,
      password: password,
    }).save();
    res.status(200).json({ message: "Added new user", newUser });
  } catch (error) {
    console.log("Error in signUp----", error);
  }
});
router.post("/logIn", async (req, res) => {
  try {
    //checking the user is present or not....
    const user = await logInUser
      .findOne({ email: req.body.email })
    if (!user) {
      return res.status(400).json({ message: "Invalid credential..." });
    }
    const password = req.body.password;
    const hashedPassword = user.password;
    const result = await passwordComparing(password,hashedPassword);

    //Is user present....
    if(!result){
        res.status(400).json({message:"Invalid credential..."})
    }
    const token = await generateToken(user.id)
    return res.status(201).json({ message: "Successfully Logged in", token });
    

    
  } catch (error) {
    console.log("Error in signUp----", error);
  }
});

router.get("/products", async (req, res) => {
    try {
      const products = await productList.find();
      if (products) {
        return res.status(200).json({ message:"products list....",products_list : products });
      }
      res.status(400).json({ message: "cant find product" });
    } catch (error) {
      console.log("Error in product----", error);
    }
  });
  router.post("/rentalProducts", async (req, res) => {
    try {
      
      const newUser = await new rentalList({
        id:req.body.id,
        product: req.body.product,
        price: req.body.price,
        quantity: req.body.quantity,
        fromDate:req.body.fromDate,
        toDate:req.body.toDate,
        fromTime:req.body.fromTime,
        toTime:req.body.toTime,
        buyerName:req.body.buyerName,
        address:req.body.address,
        mobile:req.body.mobile,
        image:req.body.image
      }).save();
      res.status(200).json({ message: "Added new product", newUser });
    } catch (error) {
      res.status(4000).json({message:"Error in product----",error_message:error});
    }
  });


const RouterList = router;
export { RouterList };
