import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext.jsx';

const CartContext = createContext();

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  loading: false,
  error: null
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_CART':
      return {
        ...state,
        items: action.payload.items || [],
        totalItems: action.payload.totalItems || 0,
        totalPrice: action.payload.totalPrice || 0,
        loading: false,
        error: null
      };
    case 'ADD_TO_CART':
      const existingItemIndex = state.items.findIndex(
        item => item.product._id === action.payload.product._id
      );
      
      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + action.payload.quantity,
          totalPrice: state.totalPrice + (action.payload.product.price * action.payload.quantity)
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload],
          totalItems: state.totalItems + action.payload.quantity,
          totalPrice: state.totalPrice + (action.payload.product.price * action.payload.quantity)
        };
      }
    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item => {
        if (item.product._id === action.payload.productId) {
          const quantityDiff = action.payload.quantity - item.quantity;
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
      
      const item = state.items.find(item => item.product._id === action.payload.productId);
      const quantityDiff = action.payload.quantity - item.quantity;
      
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDiff,
        totalPrice: state.totalPrice + (item.product.price * quantityDiff)
      };
    case 'REMOVE_FROM_CART':
      const itemToRemove = state.items.find(item => item.product._id === action.payload);
      const filteredItems = state.items.filter(item => item.product._id !== action.payload);
      
      return {
        ...state,
        items: filteredItems,
        totalItems: state.totalItems - itemToRemove.quantity,
        totalPrice: state.totalPrice - (itemToRemove.product.price * itemToRemove.quantity)
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { isAuthenticated, user } = useAuth();

  // Load cart when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadCart();
    } else {
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [isAuthenticated, user]);

  // Load cart from server
  const loadCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const res = await axios.get('/api/users/cart');
      dispatch({ type: 'SET_CART', payload: res.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load cart' });
    }
  };

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const res = await axios.post('/api/users/cart/add', { productId, quantity });
      dispatch({ type: 'SET_CART', payload: res.data.cart });
      return { success: true, message: res.data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add item to cart';
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, message };
    }
  };

  // Update item quantity
  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await axios.put('/api/users/cart/update', { productId, quantity });
      dispatch({ type: 'SET_CART', payload: res.data.cart });
      return { success: true, message: res.data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update quantity';
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, message };
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete(`/api/users/cart/remove/${productId}`);
      dispatch({ type: 'SET_CART', payload: res.data.cart });
      return { success: true, message: res.data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to remove item';
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, message };
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    try {
      await axios.delete('/api/users/cart/clear');
      dispatch({ type: 'CLEAR_CART' });
      return { success: true, message: 'Cart cleared' };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to clear cart';
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, message };
    }
  };

  // Get cart item count
  const getItemCount = (productId) => {
    const item = state.items.find(item => item.product._id === productId);
    return item ? item.quantity : 0;
  };

  // Check if item is in cart
  const isInCart = (productId) => {
    return state.items.some(item => item.product._id === productId);
  };

  // Calculate shipping
  const calculateShipping = () => {
    return state.totalPrice > 500 ? 0 : 50;
  };

  // Calculate tax
  const calculateTax = () => {
    return state.totalPrice * 0.1;
  };

  // Calculate total with shipping and tax
  const calculateTotal = () => {
    const shipping = calculateShipping();
    const tax = calculateTax();
    return state.totalPrice + shipping + tax;
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getItemCount,
    isInCart,
    calculateShipping,
    calculateTax,
    calculateTotal,
    clearError,
    loadCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};