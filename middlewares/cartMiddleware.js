import Product from '../models/productModel.js';

export const checkCartItemsForStock = async (req, res, next) => {
  try {
    const { cartItems } = req.body;

    const productId = cartItems.map((item) => item._id)
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is missing in the request' });
    }

    const product = await Product.findById(productId);

    if (!product || product.quantity === 0) {
      return res.status(400).json({ error: 'Some Products are out of stock , Remove them to Proceed' });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
