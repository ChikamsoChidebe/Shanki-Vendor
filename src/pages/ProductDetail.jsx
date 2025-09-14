import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import { Star, ShoppingCart, Plus, Minus, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import LoadingSpinner from '../components/Common/LoadingSpinner.jsx';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const { addToCart, isInCart, getItemCount } = useCart();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      toast.error('Product not found');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    if (user?.role !== 'customer') {
      toast.error('Only customers can add items to cart');
      return;
    }

    const result = await addToCart(product._id, quantity);
    if (result.success) {
      toast.success(`${quantity} item(s) added to cart!`);
      setQuantity(1);
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" className="py-20" />;
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-secondary-900 mb-4">Product Not Found</h2>
        <Link to="/products" className="btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-secondary-600">
          <li><Link to="/" className="hover:text-primary-600">Home</Link></li>
          <li>/</li>
          <li><Link to="/products" className="hover:text-primary-600">Products</Link></li>
          <li>/</li>
          <li><Link to={`/products?category=${product.category}`} className="hover:text-primary-600">{product.category}</Link></li>
          <li>/</li>
          <li className="text-secondary-900 truncate">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 bg-secondary-200 rounded-lg overflow-hidden">
            <img
              src={product.images[selectedImage] || '/placeholder-product.jpg'}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
            {product.discount?.percentage > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                -{product.discount.percentage}% OFF
              </div>
            )}
          </div>
          
          {product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary-600' : 'border-secondary-200'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating?.average || 0)
                        ? 'text-yellow-400 fill-current'
                        : 'text-secondary-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-secondary-600">
                  {product.rating?.average?.toFixed(1) || '0.0'} ({product.rating?.count || 0} reviews)
                </span>
              </div>
              <span className="text-sm text-secondary-500">SKU: {product._id.slice(-8)}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-primary-600">${product.price}</span>
            {product.discount?.percentage > 0 && (
              <span className="text-xl text-secondary-500 line-through">
                ${(product.price / (1 - product.discount.percentage / 100)).toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              product.stock > 10 ? 'bg-green-100 text-green-800' :
              product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {product.stock > 10 ? 'In Stock' :
               product.stock > 0 ? `Only ${product.stock} left` :
               'Out of Stock'}
            </span>
          </div>

          {/* Vendor Info */}
          <div className="bg-secondary-50 p-4 rounded-lg">
            <h3 className="font-medium text-secondary-900 mb-2">Sold by</h3>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {product.vendor?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium text-secondary-900">{product.vendor?.name}</p>
                <p className="text-sm text-secondary-600">{product.vendor?.businessInfo?.businessName}</p>
              </div>
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          {isAuthenticated && user?.role === 'customer' && product.stock > 0 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-secondary-900">Quantity:</span>
                <div className="flex items-center border border-secondary-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-secondary-100 disabled:opacity-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="p-2 hover:bg-secondary-100 disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn-primary flex items-center justify-center"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
                <button className="btn-outline flex items-center justify-center px-4">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="btn-outline flex items-center justify-center px-4">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-secondary-200">
            <div className="text-center">
              <Truck className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-secondary-900">Free Shipping</p>
              <p className="text-xs text-secondary-600">On orders over $500</p>
            </div>
            <div className="text-center">
              <Shield className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-secondary-900">Secure Payment</p>
              <p className="text-xs text-secondary-600">100% secure</p>
            </div>
            <div className="text-center">
              <RotateCcw className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-secondary-900">Easy Returns</p>
              <p className="text-xs text-secondary-600">30-day return</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <div className="border-b border-secondary-200">
          <nav className="flex space-x-8">
            {['description', 'specifications', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="py-8">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-secondary-700 leading-relaxed">{product.description}</p>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-secondary-900 mb-4">Product Details</h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-secondary-600">Brand:</dt>
                    <dd className="font-medium">{product.brand || 'N/A'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-secondary-600">Category:</dt>
                    <dd className="font-medium">{product.category}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-secondary-600">Weight:</dt>
                    <dd className="font-medium">{product.weight ? `${product.weight} kg` : 'N/A'}</dd>
                  </div>
                </dl>
              </div>
              
              {product.specifications && (
                <div>
                  <h3 className="font-semibold text-secondary-900 mb-4">Specifications</h3>
                  <dl className="space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <dt className="text-secondary-600">{key}:</dt>
                        <dd className="font-medium">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {product.reviews?.length > 0 ? (
                product.reviews.map((review, index) => (
                  <div key={index} className="border-b border-secondary-200 pb-6">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? 'text-yellow-400 fill-current' : 'text-secondary-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium text-secondary-900">{review.user?.name}</span>
                      <span className="text-sm text-secondary-500">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-secondary-700">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-secondary-600">No reviews yet. Be the first to review this product!</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;