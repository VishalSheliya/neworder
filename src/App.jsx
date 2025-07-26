// src/App.js
import React, { useState } from 'react';
import OrderForm from './components/OrderForm.jsx';
import PreviewModal from './components/PreviewModal.jsx';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

function App() {
  const [showPreview, setShowPreview] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const handleSubmit = (data) => {
    setOrderData(data);
    setShowPreview(true);
  };

  const handleConfirm = async () => {
    try {
      // Add timestamp to order data
      const orderWithTimestamp = {
        ...orderData,
        createdAt: new Date().toISOString()
      };
      
      await addDoc(collection(db, 'orders'), orderWithTimestamp);
      
      alert('Order saved successfully!');
      setShowPreview(false);
    } catch (error) {
      console.error('Error saving order:', error);
      alert(`Failed to save order: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-2">
            Jewelry Order Management
          </h1>
          <p className="text-gray-600">Create and manage custom jewelry orders</p>
        </header>
        
        <OrderForm onSubmit={handleSubmit} />
        
        {showPreview && (
          <PreviewModal 
            data={orderData} 
            onConfirm={handleConfirm} 
            onCancel={() => setShowPreview(false)}
          />
        )}
        
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Jewelry Order System. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
