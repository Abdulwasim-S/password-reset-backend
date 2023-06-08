import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true,
        min:8
    }
})

const logInSchema = new mongoose.Schema({
    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true,
        min:8
    },
})
const productSchema = new mongoose.Schema({
    product:{
        type : String,
        required : true
    },
    price:{
        type : String,
        required : true
    },
    quantity:{
        type : Number,
        required : true,
        default : 1
    },
    id:{
        type : String,
        default : new ObjectId
    },
    image:{
        type : String,
        required : true,
        default : ""
    }
})

const rentalSchema = new mongoose.Schema({
    id:{
        type : String,
        required : true
    },
    price:{
        type : String,
        required : true
    },
    product:{
        type : String,
        required : true
    },
    quantity:{
        type : String,
        required : true
    },
    fromDate:{
        type : String,
        required : true
    },
    toDate:{
        type : String,
        required : true
    },
    fromTime:{
        type : String,
        required : true
    },
    toTime:{
        type : String,
        required : true
    },
    buyerName:{
        type : String,
        required : true
    },
    address:{
        type : String,
        required : true
    },
    mobile:{
        type : Number,
        required : true
    },
    imageURL:{
        type : String,
        required : true
    }
    
})
const rentalList = mongoose.model('rentalList',rentalSchema)

const Users = mongoose.model('users',userSchema);

const logInUser = mongoose.model('user',logInSchema)

const productList = mongoose.model('products',productSchema)

export {Users,logInUser,productList,rentalList};