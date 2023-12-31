import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
import dotenv from "dotenv";
import orderModel from "../models/orderModel.js";

dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
    try {
      const { name, description, price, discount, discountedPrice, category, quantity, shipping } = req.fields;
      const { photo } = req.files;
      //validation
      switch (true) {
        case !name:
          return res.status(200).send({success: false, message: "Name is Required" });
        case !description:
          return res.status(200).send({ success: false, message: "Description is Required" });
        case !price:
          return res.status(200).send({ success: false, message: "Price is Required" });
        case !discount:
          return res.status(200).send({ success: false, message: "Discount % is Required" });
        case !discountedPrice:
          return res.status(200).send({success: false, message: "Discounted Price is Required" });
        case !category:
          return res.status(200).send({ success: false, message:"Category is Required " });
        case !quantity:
          return res.status(200).send({ success: false, message: "Quantity is Required" });
        case photo && photo.size > 1000000:
          return res
            .status(500)
            .send({ success: false, message: "photo is Required and should be less then 1mb" });
      }
      // Validate name length 
      if (name.length < 3 || name.length > 30) {
        return res.status(200).send({ 
            success: false,
            message: 'Name must be at least 3 characters and no longer than 30 character' 
          });
      }
      // validate discount between 0 to 99
      if (discount < 0 || discount > 99) {
        return res.status(200).send({ success: false, message: "Discount must be between 0 and 99" });
      }
      // Validate the "quantity" field (must be at least 1)
        if (quantity < 1) {
          return res.status(200).send({ success: false, message: "Quantity must be at least 1" });
        }
      const products = new productModel({ ...req.fields, slug:slugify(name) });
      if (photo) {
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
      }
      await products.save();
      res.status(200).send({
        success: true,
        message: "Product Created Successfully",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in creating product",
      });
    }
  };
  
  //get all products
  export const getProductController = async (req, res) => {
    try {
      const products = await productModel
        .find({})
        .populate("category")
        .select("-photo")
        .limit()
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        counTotal: products.length,
        message: "AllProducts ",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr in getting products",
        error: error.message,
      });
    }
  };
  // get single product
  export const getSingleProductController = async (req, res) => {
    try {
      const product = await productModel
        .findOne({ slug: req.params.slug })
        .select("-photo")
        .populate("category");
      res.status(200).send({
        success: true,
        message: "Single Product Fetched",
        product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Eror while getitng single product",
        error,
      });
    }
  };
  
  // get photo
  export const productPhotoController = async (req, res) => {
    try {
      const product = await productModel.findById(req.params.pid).select("photo");
      if (product.photo.data) {
        res.set("Content-type", product.photo.contentType);
        return res.status(200).send(product.photo.data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr while getting photo",
        error,
      });
    }
  };
  
  //delete product controller
  export const deleteProductController = async (req, res) => {
    try {
      await productModel.findByIdAndDelete(req.params.pid).select("-photo");
      res.status(200).send({
        success: true,
        message: "Product Deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while deleting product",
        error,
      });
    }
  };
  
  //update product
  export const updateProductController = async (req, res) => {
    try {
      const { name, description, price, discount, discountedPrice, category, quantity, shipping } =
        req.fields;
      const { photo } = req.files;
      //validation
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !price:
          return res.status(500).send({ error: "Price is Required" });
        case !discount:
          return res.status(200).send({ success: false, message: "Discount % is Required and should be range 1 to 99" });
        case !discountedPrice:
          return res.status(200).send({success: false, message: "Discounted Price is Required" });
        case !category:
          return res.status(500).send({ error: "Category is Required" });
        case !quantity:
          return res.status(500).send({ error: "Quantity is Required" });
        case photo && photo.size > 1000000:
          return res
            .status(200)
            .send({ success:false,message: "photo is Required and should be less then 1mb" });
      }

    // Validate name length 
    if (name.length < 3 || name.length > 30) {
      return res
        .status(200).send({ 
          success: false,
          message: 'Name must be at least 3 characters and no longer than 30 character' 
        });
    }
  
      const products = await productModel.findByIdAndUpdate( req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true }
      );
      if (photo) {
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
      }
      await products.save();
      res.status(201).send({
        success: true,
        message: "Product Updated Successfully",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in Update product",
      });
    }
  };

  
  //filter
  export const productFiltersController = async (req, res) => {
    try {
      const { checked, radio } = req.body;
      let args = {};
      if (checked.length > 0) args.category = checked;
      if (radio.length) args.discountedPrice = { $gte: radio[0], $lte: radio[1] };
      const products = await productModel.find(args);
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(404).send({
        success: false,
        message: "Error While Filtering Products",
        error,
      });
    }
  };


  //product count
  export const productCountController = async (req,res) => {
    try {
      const total = await productModel.find({}).estimatedDocumentCount();
      res.status(200).send({
        success: true,
        total,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error in product count",
        error,
       
      });
    }

  }


  // product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 10;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

//search Product
export const searchProductController = async (req, res) => {
  try {
    const {keyword} = req.params
    const results = await productModel.find({
      $or: [
        {name: {$regex: keyword, $options: "i"}},
        {description: {$regex: keyword, $options: "i"}}
      ]
    })
    .select("-photo")
    res.json(results);
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success:false,
      message:"Error in search product api"
    })
  }
}


//Similar Products
export const relatedProductController = async (req, res) => {
  try {
    const {pid,cid} = req.params
    const products = await productModel.find({
      category:cid,
      _id:{$ne:pid},
    }).select("-photo").limit(3).populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status:false,
      message:"Error in Similar Product Api",
      error,
    })
  }
}


//Get Products by category menu
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

//payment gateway API

//token
export const braintreeTokenController = async(req, res) =>{
  try {
    gateway.clientToken.generate({}, function(err,response){
      if (err) {
        res.status(500).send(err);
      }else{
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error)
  }
}

//payment trasanction
export const braintreePaymentController = async(req,res) =>{
  try {
    const {cartItems, nonce} = req.body
    let total = 0
    // Calculate the total price of the order
    
    for (const item of cartItems) {
      const product = await productModel.findById(item._id);

      if (!product) {
        return res.status(400).json({ error: 'Product not found' });
      }

      if (product.quantity < item.quantity) {
        return res.status(200).send({
          success: false,
          message: `${product.name} has Insufficient quantity`,
          item,
        });
      }

      total += product.discountedPrice * item.quantity;

      // Reduce the product quantity
      product.quantity -= item.quantity;
      await product.save();
    }
    let newTransaction = gateway.transaction.sale({
      amount:total,
      paymentMethodNonce:nonce,
      options:{
        submitForSettlement:true
      }
    },
    function(error, result){
      if (result) {
        const order = new orderModel({
          products:cartItems,
          payment:result,
          buyer:req.user._id,
        }).save()
        res.json({ok:true})
      }else{
        res.status(500).send(error)
      }
    });
  } catch (error) {
    console.log(error)
  }
}

//order status update
export const orderStatusController = async(req, res) =>{
  try {
    const {orderId } = req.params
    const {status} = req.body
    const orders = await orderModel.findByIdAndUpdate(orderId, {status}, {new:true})
    res.json(orders)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error While Updating Order API",
      error,
    });
  }
}

//Latest Products
export const latestProductController = async (req, res) => {
  try {
    const products = await productModel
        .find({})
        .populate("category")
        .select("-photo")
        .limit(4)
        .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status:false,
      message:"Error in latest Product Api",
      error,
    })
  }
}

export const checkCartItemsStockController = async (req, res) => {
  try {
    const { cartItems } = req.body;

    const productId = cartItems.map((item) => item._id)
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is missing in the request' });
    }

    const productInCart = await productModel.findById(productId);

    if (!productInCart || productInCart.quantity === 0) {
      return res.status(400).json({ error: 'Some Products are out of stock , Remove them to Proceed' });
    }

    res.status(200).send({
      success: true,
      productInCart,
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
