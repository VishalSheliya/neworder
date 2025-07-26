// src/components/OrderForm.js
import React, { useState, useEffect } from 'react';
import RingForm from './RingForm';
import EarringForm from './EarringForm';
import PendantForm from './PendantForm';
import BraceletForm from './BraceletForm';
import NecklaceForm from './NecklaceForm';

function generateOrderId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

const OrderForm = ({ onSubmit }) => {
  const [orderId, setOrderId] = useState('');
  const [clientName, setClientName] = useState('');
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [jewelryType, setJewelryType] = useState(null);
  const [jewelryDetails, setJewelryDetails] = useState({});
  
  // Initialize order ID on component mount
  useEffect(() => {
    setOrderId(generateOrderId());
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setPrice('');
      setProductName('');
    }
  };

  const handleJewelryTypeSelect = (type) => {
    setJewelryType(type);
    setJewelryDetails({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate quantity
    const qty = parseInt(quantity);
    if (isNaN(qty) || qty < 1) {
      alert('Please enter a valid quantity (minimum 1)');
      return;
    }
    
    const orderData = {
      orderId,
      clientName,
      file: file ? file.name : null,
      price,
      productName,
      quantity: qty,
      jewelryType,
      jewelryDetails
    };
    
    onSubmit(orderData);
  };

  const renderJewelryForm = () => {
    if (!jewelryType) return null;
    
    const commonProps = {
      details: jewelryDetails,
      setDetails: setJewelryDetails
    };
    
    switch (jewelryType) {
      case 'Ring': return <RingForm {...commonProps} />;
      case 'EarRing': return <EarringForm {...commonProps} />;
      case 'Pendant': return <PendantForm {...commonProps} />;
      case 'Bracletes': return <BraceletForm {...commonProps} />;
      case 'Necklace': return <NecklaceForm {...commonProps} />;
      default: return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order ID */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-2">Order ID</label>
          <div className="flex items-center">
            <div className="flex-1 p-3 bg-gray-100 rounded-lg border border-gray-300">
              {orderId}
            </div>
            <button 
              type="button" 
              onClick={() => setOrderId(generateOrderId())}
              className="ml-3 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
            >
              Regenerate
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">Automatically generated unique order ID</p>
        </div>
        
        {/* Client Name */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-2">Client Name</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter client name"
            required
          />
        </div>
        
        {/* File Upload or Product Info */}
        <div className="md:col-span-2">
          <div className="flex flex-col md:flex-row gap-6">
            {/* File Upload */}
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">Upload Design File</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-400 transition-colors relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-gray-600">
                    {file ? file.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                </div>
              </div>
            </div>
            
            {/* Or Divider */}
            <div className="flex items-center justify-center">
              <div className="h-px w-16 bg-gray-300 md:h-16 md:w-px"></div>
              <div className="px-4 py-2 bg-gray-100 rounded-full text-gray-500">OR</div>
              <div className="h-px w-16 bg-gray-300 md:h-16 md:w-px"></div>
            </div>
            
            {/* Manual Input */}
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">Enter Product Details</label>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Product Name</label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter product name"
                    disabled={!!file}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter price"
                    disabled={!!file}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quantity */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter quantity"
            required
          />
        </div>
        
        {/* Jewelry Type Selection */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-2">Select Jewelry Type</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {['Ring', 'EarRing', 'Pendant', 'Bracletes', 'Necklace'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleJewelryTypeSelect(type)}
                className={`p-4 rounded-lg border-2 font-medium transition-all ${
                  jewelryType === type 
                    ? 'bg-green-100 border-green-500 text-green-700' 
                    : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        
        {/* Dynamic Jewelry Form */}
        {jewelryType && (
          <div className="md:col-span-2 mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{jewelryType} Specifications</h3>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              {renderJewelryForm()}
            </div>
          </div>
        )}
        
        {/* Submit Button */}
        <div className="md:col-span-2 mt-6">
          <button
            type="submit"
            disabled={!jewelryType}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              jewelryType 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default OrderForm;