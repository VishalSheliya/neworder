import React, { useState } from 'react';

const PreviewModal = ({ data, onConfirm, onCancel }) => {
  const [isSending, setIsSending] = useState(false);

  const handleSendEmail = async () => {
    setIsSending(true);
    const maxRetries = 3;
    let attempts = 0;

    while (attempts < maxRetries) {
      try {
        const response = await fetch('https://neworder-tau.vercel.app/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        alert('Email sent successfully!');
        setIsSending(false);
        return;
      } catch (error) {
        console.error(`Attempt ${attempts + 1} failed:`, error);
        attempts++;
        if (attempts === maxRetries) {
          alert('Failed to send email after multiple attempts');
          setIsSending(false);
          return;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  };

  const renderJewelryDetails = () => {
    if (!data.jewelryDetails) return null;

    const details = data.jewelryDetails;
    const typeSpecificDetails = [];

    const commonDetails = [
      { label: 'Gold Type', value: details.goldType },
      { label: 'Gold Color', value: details.goldColor },
      { label: 'Diamond Type', value: details.diamondType },
      { label: 'Diamond Colors', value: details.diamondColors?.join(', ') || 'None' },
      { label: 'Certification', value: details.diamondCertification },
      { label: 'Clarities', value: details.clarities?.join(', ') || 'None' },
      { label: 'Diamond Size', value: details.diamondSize },
      { label: 'Shapes', value: details.shapes?.join(', ') || 'None' },
      { label: 'Notes', value: details.notes },
    ];

    switch (data.jewelryType) {
      case 'Ring':
        typeSpecificDetails.push({ label: 'Ring Size', value: `${details.ringSize} (${details.sizeUnit})` });
        break;
      case 'EarRing':
        typeSpecificDetails.push({ label: 'Fitting Type', value: details.fittingType });
        break;
      case 'Bracletes':
        typeSpecificDetails.push({ label: 'Bracelet Size', value: `${details.braceletSize} inches` });
        break;
      case 'Necklace':
        typeSpecificDetails.push({ label: 'Necklace Size', value: `${details.necklaceSize} inches` });
        break;
      case 'Pendant':
        if (details.chainOption === 'With Chain') {
          typeSpecificDetails.push(
            { label: 'Chain Option', value: details.chainOption },
            { label: 'Jumping', value: details.jumping ? 'Yes' : 'No' },
            { label: 'Chain Length', value: `${details.chainLength} mm` }
          );
        } else {
          typeSpecificDetails.push({ label: 'Chain Option', value: details.chainOption });
        }
        break;
      default:
        break;
    }

    return [...commonDetails, ...typeSpecificDetails].map((item, index) => (
      item.value && (
        <div key={index} className="flex border-b border-gray-100 py-2.5">
          <div className="w-1/3 font-medium text-gray-700">{item.label}:</div>
          <div className="w-2/3 text-gray-800">{item.value}</div>
        </div>
      )
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Order Preview</h2>
          <p className="text-gray-600">Review your order before confirming</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-indigo-50 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-indigo-800 mb-3">Order Information</h3>
              <div className="space-y-2">
                <div className="flex">
                  <div className="w-1/3 font-medium text-gray-700">Order ID:</div>
                  <div className="w-2/3 text-gray-800">{data.orderId}</div>
                </div>
                <div className="flex">
                  <div className="w-1/3 font-medium text-gray-700">Client Name:</div>
                  <div className="w-2/3 text-gray-800">{data.clientName}</div>
                </div>
                <div className="flex">
                  <div className="w-1/3 font-medium text-gray-700">Quantity:</div>
                  <div className="w-2/3 text-gray-800">{data.quantity}</div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-purple-800 mb-3">Product Information</h3>
              <div className="space-y-2">
                {data.file ? (
                  <div className="flex">
                    <div className="w-1/3 font-medium text-gray-700">Design File:</div>
                    <div className="w-2/3 text-gray-800">{data.file}</div>
                  </div>
                ) : (
                  <>
                    <div className="flex">
                      <div className="w-1/3 font-medium text-gray-700">Product Name:</div>
                      <div className="w-2/3 text-gray-800">{data.productName}</div>
                    </div>
                    <div className="flex">
                      <div className="w-1/3 font-medium text-gray-700">Price:</div>
                      <div className="w-2/3 text-gray-800">₹{data.price}</div>
                    </div>
                  </>
                )}
                <div className="flex">
                  <div className="w-1/3 font-medium text-gray-700">Jewelry Type:</div>
                  <div className="w-2/3 text-gray-800">{data.jewelryType}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Jewelry Specifications</h3>
            <div className="divide-y divide-gray-100">
              {renderJewelryDetails()}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back to Edit
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Confirm Order
          </button>
          <button
            onClick={handleSendEmail}
            disabled={isSending}
            className={`px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSending ? 'Sending...' : 'Send via Email'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;