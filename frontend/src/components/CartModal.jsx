import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import { X, Trash2, Plus, Minus } from 'lucide-react';

export default function CartModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { items, total } = useSelector(state => state.cart);

  if (!isOpen) return null;

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ productId, quantity: newQuantity }));
    }
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart({ productId }));
  };

  const handleCheckout = () => {
    // TODO: Implement checkout in Phase 4
    alert('Checkout functionality coming soon!');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed right-0 top-0 h-screen w-full max-w-md bg-white shadow-lg z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-serif font-bold">Shopping Cart</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">Your cart is empty</p>
              <p className="text-sm mt-2">Start shopping to add items</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="ml-auto p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <p className="text-sm font-semibold text-gray-900 mt-2">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span className="text-luxury-600">${total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-luxury-600 text-white rounded font-semibold hover:bg-luxury-700 transition"
            >
              Checkout
            </button>

            <button
              onClick={() => dispatch(clearCart())}
              className="w-full py-2 border border-gray-300 text-gray-700 rounded font-semibold hover:bg-gray-50 transition"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
