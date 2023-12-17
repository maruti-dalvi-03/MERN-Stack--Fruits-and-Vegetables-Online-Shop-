import React from 'react';
import toast from 'react-hot-toast';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { useAuth } from '../../context/auth';

const ProductCard = ({ product, addToCart, navigate }) => {
    // eslint-disable-next-line
    const [auth, setAuth] = useAuth()
    return (
        <div className="item-container">
            {/* Top section with quantity and discount information */}
            <div className="item-top">
                <div className="top-left-logo" style={{ color: product.quantity < 15 ? "red" : "black", fontSize: "14px" }}>
                    <small>{product.quantity < 1 ? "OutOfStock" : (product.quantity < 15 ? `Left ${product.quantity}` : "In Stock")}</small>
                </div>
                <div className="top-right-cart">
                    {product.discount > 0 ? (
                        <p style={{ fontFamily: "cursive", fontSize: "12px", borderBottomLeftRadius: "25%", borderTopRightRadius: "25%", marginRight: "-21px", marginBottom: "0", marginTop: "-10px", padding: "4px", background: "pink" }}>
                            Get {product.discount}% OFF
                        </p>
                    ) : null}
                </div>
            </div>

            {/* Main product image */}
            <div className="main-item text-center">
                <img
                    src={`/api/v1/product/product-photo/${product._id}`}
                    alt="pic"
                    width="200px"
                    onError={(e) => {
                        e.target.src = '/img/default-photo.jpg';
                    }}
                />
            </div>

            {/* Product details */}
            <h2 className="item-heading mt-0">{product.name}</h2>
            <p className="item-description">{product.description.substring(0, 35)}...</p>
            <p className="item-price m-0">
                <span style={{ fontSize: "12px" }}><del>&#8377;{product.price}</del></span>
                <sup>&#8377;</sup>{!product.discountedPrice ? product.price : product.discountedPrice}
            </p>

            {/* Card buttons */}
            <div className="card-btns">
                <button className="blue-btn" style={{ borderRadius: "32px", fontSize: "12px" }} onClick={() => navigate(`/product/${product.slug}`)}>
                    View More
                </button>
                <button className="item-cart-btn"
                    onClick={() => {
                        addToCart(product);
                        toast.success("Item Added to Cart");
                    }}>
                    <MdOutlineAddShoppingCart />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
