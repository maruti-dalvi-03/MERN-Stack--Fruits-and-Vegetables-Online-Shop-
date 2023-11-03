import userModel from '../models/userModel.js';
import orderModel from './../models/orderModel.js';
import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import JWT from 'jsonwebtoken';

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    // Validation
    if (!name || !email || !password || !phone || !address || !answer) {
      return res.status(200).send({
        success: false, 
        message: 'All fields are required' 
      });
    }
    const nameRegex = /^[A-Za-z]+$/; 
    if (!nameRegex.test(name)) {
      return res.status(200).send({
        success: false,
        message: 'Name must contain only alphabetic characters',
      });
    }
    // Validate name length (e.g., at least 3 characters)
    if (name.length < 3 || name.length > 20) {
      return res
        .status(200).send({ 
          success: false,
          message: 'Name must be at least 3 characters and no longer than 20 character' 
        });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(200).send({ 
        success: false,
        message: 'Invalid email format' 
      });
    }

    // Validate password strength (e.g., at least 6 characters)
    if (password.length < 6) {
      return res.status(200).send({ 
          success: false,
          message: 'Password must be at least 6 characters long' 
        });
    }
     // Phone number validation
     const phoneRegex = /^\d{10}$/;
     if (!phoneRegex.test(phone)) {
       return res.status(200).json({ message: 'Invalid phone number format' });
     }

    // Validate address length (e.g., at most 40 characters)
    if ( address.length > 40) {
      return res
        .status(200).send({ 
          success: false,
          message: 'Address no longer than 40 character' 
        });
    }

    // Check if the email is already registered
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: 'Email is already registered. Please login.',
      });
    }

    // Hash the password before saving it
    const hashedPassword = await hashPassword(password);

    // Create and save the user
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: 'User registered successfully',
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error in registration',
      error,
    });
  }
};


//POST || LOGIN
export const loginController = async (req,res) => {
    try {
        const {email,password} = req.body;
        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid Email or Password'
            });
        }
        //check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(200).send({
                success:false,
                message:'Email is not registered'
            });
        }
        const match = await comparePassword(password,user.password);
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid Password'
            });
        }

        //token
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET,{ expiresIn: "7d",});
        res.status(201).send({
            success:true,
            message:'Login Successfully',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Login',
            error,
        });
    }
};

//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
    try {
      const { email, answer, newPassword } = req.body;
      if (!email) {
        res.status(200).send({ message: "Emai is required" });
      }
      if (!answer) {
        res.status(200).send({ message: "Answer is required" });
      }
      if (!newPassword) {
        res.status(200).send({ message: "New Password is required" });
      }
      //check
      const user = await userModel.findOne({ email, answer });
      //validation
      if (!user) {
        return res.status(200).send({
          success: false,
          message: "Wrong Email Or Answer",
        });
      }
      if (newPassword.length < 6) {
        return res.status(200).send({ 
            success: false,
            message: 'Password must be at least 6 characters long' 
          });
      }
  
      const hashed = await hashPassword(newPassword);
      await userModel.findByIdAndUpdate(user._id, { password: hashed });
      res.status(201).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };

//test controller
export const testController = () =>{
    res.send("Protected Route");
}

//Get All Users List
export const getAllUsersController = async (req, res) => {
    try {
      const users = await userModel.find({}).collation({ locale: 'en', strength: 2 }).sort({ name:1 });
      res.status(200).send({
        success: true,
        message: "All Users List",
        users,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all users list",
      });
    }
  };


  //update profile controller
  export const updateProfileController = async (req, res) => {
    try {
      const {name, email, password, address, phone} = req.body
      const user = await userModel.findById(req.user._id)
      //password
      if (password && password.length < 6)  {
        return res.json({error: "Password is Required and greater thab 6 character"})
      }

      const hashedPassword = password ? await hashPassword(password) : undefined
      const updatedUser = await userModel.findByIdAndUpdate(req.user._id,{
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },{new:true})
      res.status(200).send({
        success:true,
        message:"Profile Update Succefully",
        updatedUser,
      })
    } catch (error) {
      console.log(error)
      res.status(400).send({
        success:false,
        message:"Error in Update Profile API",
        error
      })
    }
  }


  //orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel.find({ buyer:req.user._id }).populate("products", "-photo").populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Geting Orders API",
      error,
    });
  }
};

 // get all orders in admin panel
 export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel.find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({createdAt: "-1"});
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Geting Orders",
      error,
    });
  }
};